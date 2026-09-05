import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { DAILY_TIMETABLE_SLOTS, WEEKLY_SUBJECT_ROTATION } from '../data/schedule';
import { INITIAL_MISTAKES, INITIAL_MOCK_TESTS, INITIAL_TODAY_SUBJECT_TOPICS, INITIAL_USER_PROFILE, calculateLevel } from '../data/defaultData';
import { useAudioAlert } from '../hooks/useAudioAlert';
import { useNotifications } from '../hooks/useNotifications';

const AppContext = createContext();

const STORAGE_KEY = 'kishore_jee_command_center_v1';

export function AppProvider({ children }) {
  const { playChime } = useAudioAlert();
  const { sendNotification } = useNotifications();

  // Get today's date key YYYY-MM-DD
  const getTodayKey = () => new Date().toISOString().split('T')[0];
  const [todayKey, setTodayKey] = useState(getTodayKey());

  // Load stored state or fallback to defaults
  const loadInitialState = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Error loading state from localStorage", e);
    }
    return null;
  };

  const initial = loadInitialState();

  const [userProfile, setUserProfile] = useState(initial?.userProfile || INITIAL_USER_PROFILE);
  const [theme, setTheme] = useState(initial?.theme || 'dark');
  const [xp, setXp] = useState(initial?.xp || 240);
  const [streak, setStreak] = useState(initial?.streak || 5);
  const [completedSessions, setCompletedSessions] = useState(initial?.completedSessions || { [getTodayKey()]: ["slot-01", "slot-02"] });
  const [todayTopics, setTodayTopics] = useState(initial?.todayTopics || INITIAL_TODAY_SUBJECT_TOPICS);
  const [tasks, setTasks] = useState(initial?.tasks || {});
  const [mistakes, setMistakes] = useState(initial?.mistakes || INITIAL_MISTAKES);
  const [mockTests, setMockTests] = useState(initial?.mockTests || INITIAL_MOCK_TESTS);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [focusMode, setFocusMode] = useState(false);
  const [activeFocusSlot, setActiveFocusSlot] = useState(null);
  const [showDailySummary, setShowDailySummary] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState(false);

  // Initialize tasks for today if not present
  useEffect(() => {
    const today = getTodayKey();
    setTodayKey(today);

    setTasks((prevTasks) => {
      if (!prevTasks[today]) {
        const initialTasksForToday = {};
        DAILY_TIMETABLE_SLOTS.forEach((slot) => {
          initialTasksForToday[slot.id] = slot.defaultTasks.map((text) => ({
            text,
            completed: false
          }));
        });
        return { ...prevTasks, [today]: initialTasksForToday };
      }
      return prevTasks;
    });
  }, []);

  // Save to localStorage on state changes
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
      console.error("Failed to save to localStorage", e);
    }
  }, [userProfile, theme, xp, streak, completedSessions, todayTopics, tasks, mistakes, mockTests]);

  // Sync dark/light theme class on document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  // Award XP and trigger celebration effects
  const addXP = (amount, reason = "") => {
    setXp((prevXP) => {
      const newXP = prevXP + amount;
      const prevLevel = calculateLevel(prevXP).level;
      const newLevel = calculateLevel(newXP).level;

      if (newLevel > prevLevel) {
        try {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}
        playChime('complete');
        if (userProfile.notificationsEnabled) {
          sendNotification("🎉 LEVEL UP!", `Awesome work Kishore! You reached Level ${newLevel}: ${calculateLevel(newXP).title}!`);
        }
      }
      return newXP;
    });
  };

  // Toggle subtask completion
  const toggleTask = (slotId, taskIndex) => {
    const today = getTodayKey();
    setTasks((prev) => {
      const todayTasks = prev[today] || {};
      const slotTasks = todayTasks[slotId] || [];
      const updatedSlotTasks = slotTasks.map((t, idx) => {
        if (idx === taskIndex) {
          const nextState = !t.completed;
          if (nextState) {
            addXP(5, "Task completed");
          }
          return { ...t, completed: nextState };
        }
        return t;
      });

      return {
        ...prev,
        [today]: {
          ...todayTasks,
          [slotId]: updatedSlotTasks
        }
      };
    });
  };

  // Add custom task to a session
  const addCustomTask = (slotId, taskText) => {
    if (!taskText.trim()) return;
    const today = getTodayKey();
    setTasks((prev) => {
      const todayTasks = prev[today] || {};
      const slotTasks = todayTasks[slotId] || [];
      return {
        ...prev,
        [today]: {
          ...todayTasks,
          [slotId]: [...slotTasks, { text: taskText.trim(), completed: false }]
        }
      };
    });
  };

  // Mark session as complete
  const markSessionComplete = (slotId) => {
    const today = getTodayKey();
    setCompletedSessions((prev) => {
      const currentToday = prev[today] || [];
      if (!currentToday.includes(slotId)) {
        addXP(20, "Session completed");
        playChime('complete');
        if (userProfile.notificationsEnabled) {
          sendNotification("✅ Session Completed!", "Great work, Kishore! Target session marked as completed.");
        }
        return {
          ...prev,
          [today]: [...currentToday, slotId]
        };
      }
      return prev;
    });
  };

  // Add mistake entry
  const addMistake = (newMistake) => {
    const entry = {
      id: `m-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...newMistake
    };
    setMistakes((prev) => [entry, ...prev]);
    addXP(10, "Mistake logged");
  };

  // Delete mistake entry
  const deleteMistake = (id) => {
    setMistakes((prev) => prev.filter((m) => m.id !== id));
  };

  // Add Saturday Mock Test
  const addMockTest = (testData) => {
    const totalScore = Number(testData.physicsScore) + Number(testData.chemistryScore) + Number(testData.mathsScore);
    const attempted = Number(testData.questionsAttempted);
    const correct = Number(testData.correct);
    const accuracy = attempted > 0 ? Number(((correct / attempted) * 100).toFixed(2)) : 0;

    const entry = {
      id: `mock-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      testName: testData.testName || `Saturday JEE Main Mock #${mockTests.length + 1}`,
      physicsScore: Number(testData.physicsScore),
      chemistryScore: Number(testData.chemistryScore),
      mathsScore: Number(testData.mathsScore),
      totalScore,
      maxScore: 300,
      questionsAttempted: attempted,
      correct,
      incorrect: Number(testData.incorrect),
      unattempted: 75 - attempted,
      accuracy,
      notes: testData.notes || ""
    };

    setMockTests((prev) => [...prev, entry]);
    addXP(100, "Mock test completed");
    playChime('complete');
    try {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
    } catch (e) {}
  };

  // Compute stats for today
  const today = getTodayKey();
  const todayCompletedSlots = completedSessions[today] || [];
  const todayTasksObject = tasks[today] || {};
  
  let totalTasksCount = 0;
  let completedTasksCount = 0;
  Object.values(todayTasksObject).forEach((slotTasks) => {
    slotTasks.forEach((t) => {
      totalTasksCount++;
      if (t.completed) completedTasksCount++;
    });
  });

  const todayStudyProgressPercentage = totalTasksCount > 0
    ? Math.round((completedTasksCount / totalTasksCount) * 100)
    : 0;

  const userLevel = calculateLevel(xp);

  // Subject rotation for current day
  const currentDayIndex = new Date().getDay();
  const todaySubjectRotation = WEEKLY_SUBJECT_ROTATION[currentDayIndex];

  return (
    <AppContext.Provider
      value={{
        userProfile,
        setUserProfile,
        theme,
        setTheme,
        xp,
        streak,
        levelInfo: userLevel,
        todayKey,
        completedSessions: todayCompletedSlots,
        markSessionComplete,
        todayTopics,
        setTodayTopics,
        tasks: todayTasksObject,
        toggleTask,
        addCustomTask,
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
        pomodoroMode,
        setPomodoroMode,
        todayStudyProgressPercentage,
        completedTasksCount,
        totalTasksCount,
        todaySubjectRotation,
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
