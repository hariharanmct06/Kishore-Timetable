import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { EXACT_DAILY_SLOTS, DAY_SUBJECT_BLUEPRINT } from '../data/timeSchedule';
import { INITIAL_USER_PROFILE, INITIAL_TODAY_TOPICS, SAMPLE_MISTAKES, SAMPLE_MOCK_TESTS, getLevelFromXP } from '../data/defaultState';
import { useTimeEngine } from '../hooks/useTimeEngine';
import { useAudio } from '../hooks/useAudio';
import { useNotifications } from '../hooks/useNotifications';

const AppContext = createContext();
const STORAGE_KEY = 'kishore_jee_os_groundup_v2';

export function AppProvider({ children }) {
  const timeState = useTimeEngine();
  const { playChime } = useAudio();
  const { sendNotification } = useNotifications();

  // Load initial state from LocalStorage or fallbacks
  const loadState = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Storage load error:", e);
    }
    return null;
  };

  const initial = loadState();

  const [userProfile, setUserProfile] = useState(initial?.userProfile || INITIAL_USER_PROFILE);
  const [theme, setTheme] = useState(initial?.theme || 'dark');
  const [xp, setXp] = useState(initial?.xp || 280);
  const [streak, setStreak] = useState(initial?.streak || 6);
  const [completedSessions, setCompletedSessions] = useState(initial?.completedSessions || { [timeState.todayDateStr]: ["slot-01", "slot-02"] });
  const [todayTopics, setTodayTopics] = useState(initial?.todayTopics || INITIAL_TODAY_TOPICS);
  const [tasks, setTasks] = useState(initial?.tasks || {});
  const [mistakes, setMistakes] = useState(initial?.mistakes || SAMPLE_MISTAKES);
  const [mockTests, setMockTests] = useState(initial?.mockTests || SAMPLE_MOCK_TESTS);

  const [activeTab, setActiveTab] = useState('home');
  const [focusMode, setFocusMode] = useState(false);
  const [activeFocusSlot, setActiveFocusSlot] = useState(null);
  const [showDailySummary, setShowDailySummary] = useState(false);

  const lastNotifiedSlotRef = useRef(null);
  const lastWarnedSlotRef = useRef(null);

  // Initialize tasks for today if missing
  useEffect(() => {
    const today = timeState.todayDateStr;
    setTasks((prev) => {
      if (!prev[today]) {
        const initialTodayTasks = {};
        EXACT_DAILY_SLOTS.forEach((slot) => {
          initialTodayTasks[slot.id] = slot.defaultTasks.map((t) => ({
            text: t,
            completed: false
          }));
        });
        return { ...prev, [today]: initialTodayTasks };
      }
      return prev;
    });
  }, [timeState.todayDateStr]);

  // Handle Automatic Session Start & Lead-time Notifications
  useEffect(() => {
    const activeSlot = timeState.activeSlot;
    if (!activeSlot) return;

    // Trigger exact session start notification once per slot
    if (lastNotifiedSlotRef.current !== activeSlot.id) {
      lastNotifiedSlotRef.current = activeSlot.id;
      if (userProfile.notificationsEnabled) {
        if (activeSlot.type === 'study') {
          sendNotification("🚀 Session Started!", `${activeSlot.title} has started (${activeSlot.startTime} to ${activeSlot.endTime})`);
        } else if (activeSlot.type === 'break') {
          sendNotification("☕ Break Time!", `Recharge before your next session. Next activity at ${timeState.nextSlot?.startTime || 'upcoming'}`);
        } else if (activeSlot.type === 'sleep') {
          sendNotification("🌙 Sleep & Wind Down", "Time to wind down, Kishore. Tomorrow starts at 5:00 AM.");
        }
      }
      if (userProfile.audioAlertsEnabled) {
        playChime(activeSlot.type === 'study' ? 'start' : 'break');
      }
    }

    // 5-minute warning alert before session end
    if (timeState.remainingSeconds <= 300 && timeState.remainingSeconds > 290 && lastWarnedSlotRef.current !== activeSlot.id) {
      lastWarnedSlotRef.current = activeSlot.id;
      if (userProfile.notificationsEnabled) {
        sendNotification("⚡ 5 Minutes Left!", "5 minutes remaining. Finish strong, Kishore!");
      }
      if (userProfile.audioAlertsEnabled) {
        playChime('warning');
      }
    }
  }, [timeState.activeSlot?.id, timeState.remainingSeconds]);

  // Persist state to localStorage
  useEffect(() => {
    const stateToSave = {
      userProfile,
      theme,
      xp,
      streak,
      completedSessions,
      todayTopics,
      tasks,
      mistakes,
      mockTests
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Storage save error:", e);
    }
  }, [userProfile, theme, xp, streak, completedSessions, todayTopics, tasks, mistakes, mockTests]);

  // Apply dark/light theme class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  // XP & Level calculations
  const addXP = (amount, reason = "") => {
    setXp((prevXP) => {
      const newXP = prevXP + amount;
      const prevLevel = getLevelFromXP(prevXP).level;
      const newLevel = getLevelFromXP(newXP).level;

      if (newLevel > prevLevel) {
        try {
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}
        playChime('complete');
        if (userProfile.notificationsEnabled) {
          sendNotification("🎉 LEVEL UP!", `Awesome work Kishore! You reached Level ${newLevel}: ${getLevelFromXP(newXP).title}!`);
        }
      }
      return newXP;
    });
  };

  // Toggle task completed state
  const toggleTask = (slotId, taskIndex) => {
    const today = timeState.todayDateStr;
    setTasks((prev) => {
      const todayTasks = prev[today] || {};
      const slotTasks = todayTasks[slotId] || [];
      const updated = slotTasks.map((t, idx) => {
        if (idx === taskIndex) {
          const nextState = !t.completed;
          if (nextState) addXP(5, "Subtask finished");
          return { ...t, completed: nextState };
        }
        return t;
      });

      return {
        ...prev,
        [today]: {
          ...todayTasks,
          [slotId]: updated
        }
      };
    });
  };

  // Mark session completed
  const markSessionComplete = (slotId) => {
    const today = timeState.todayDateStr;
    setCompletedSessions((prev) => {
      const currentToday = prev[today] || [];
      if (!currentToday.includes(slotId)) {
        addXP(20, "Session completed");
        playChime('complete');
        return {
          ...prev,
          [today]: [...currentToday, slotId]
        };
      }
      return prev;
    });
  };

  // Add mistake entry
  const addMistake = (entryData) => {
    const newEntry = {
      id: `m-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...entryData
    };
    setMistakes((prev) => [newEntry, ...prev]);
    addXP(10, "Mistake logged");
  };

  // Delete mistake entry
  const deleteMistake = (id) => {
    setMistakes((prev) => prev.filter((m) => m.id !== id));
  };

  // Add Saturday Mock Test
  const addMockTest = (mockData) => {
    const totalScore = Number(mockData.physicsScore) + Number(mockData.chemistryScore) + Number(mockData.mathsScore);
    const attempted = Number(mockData.questionsAttempted);
    const correct = Number(mockData.correct);
    const accuracy = attempted > 0 ? Number(((correct / attempted) * 100).toFixed(2)) : 0;

    const newTest = {
      id: `mock-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      testName: mockData.testName || `Saturday JEE Main Mock #${mockTests.length + 1}`,
      physicsScore: Number(mockData.physicsScore),
      chemistryScore: Number(mockData.chemistryScore),
      mathsScore: Number(mockData.mathsScore),
      totalScore,
      maxScore: 300,
      questionsAttempted: attempted,
      correct,
      incorrect: Number(mockData.incorrect),
      unattempted: 75 - attempted,
      accuracy,
      notes: mockData.notes || ""
    };

    setMockTests((prev) => [...prev, newTest]);
    addXP(100, "Mock test completed");
    playChime('complete');
    try {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
    } catch (e) {}
  };

  // Compute today's progress percentage
  const today = timeState.todayDateStr;
  const todayCompletedSlots = completedSessions[today] || [];
  const todayTasksObj = tasks[today] || {};

  let totalTasksCount = 0;
  let completedTasksCount = 0;
  Object.values(todayTasksObj).forEach((slotTasks) => {
    slotTasks.forEach((t) => {
      totalTasksCount++;
      if (t.completed) completedTasksCount++;
    });
  });

  const todayProgressPercent = totalTasksCount > 0
    ? Math.round((completedTasksCount / totalTasksCount) * 100)
    : 0;

  const levelInfo = getLevelFromXP(xp);

  return (
    <AppContext.Provider
      value={{
        timeState,
        userProfile,
        setUserProfile,
        theme,
        setTheme,
        xp,
        streak,
        levelInfo,
        completedSessions: todayCompletedSlots,
        markSessionComplete,
        todayTopics,
        setTodayTopics,
        tasks: todayTasksObj,
        toggleTask,
        mistakes,
        addMistake,
        deleteMistake,
        mockTests,
        addMockTest,
        activeTab,
        setActiveTab,
        focusMode,
        setFocusMode,
        activeFocusSlot,
        setActiveFocusSlot,
        showDailySummary,
        setShowDailySummary,
        todayProgressPercent,
        completedTasksCount,
        totalTasksCount,
        addXP
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
