import React, { useState, useEffect } from 'react';
import { Play, Pause, CheckCircle2, Maximize2, BookOpen, Coffee, Sun, Moon, Activity, ArrowRight, Clock, Target, Edit3 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DAILY_TIMETABLE_SLOTS } from '../../data/schedule';
import { findActiveAndNextSlot, formatSecondsToHHMMSS, formatTime24To12 } from '../../utils/timeUtils';
import { useTimer } from '../../hooks/useTimer';

export function CurrentSession() {
  const { 
    completedSessions, 
    markSessionComplete, 
    todayTopics, 
    setTodayTopics, 
    todaySubjectRotation, 
    setFocusMode, 
    setActiveFocusSlot 
  } = useApp();

  const [activeInfo, setActiveInfo] = useState(() => findActiveAndNextSlot(DAILY_TIMETABLE_SLOTS));
  const [editingTopic, setEditingTopic] = useState(false);
  const [topicInput, setTopicInput] = useState('');

  // Update active slot every 10 seconds to follow wall-clock time dynamically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInfo(findActiveAndNextSlot(DAILY_TIMETABLE_SLOTS));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const { activeSlot, nextSlot, remainingSecondsInActive } = activeInfo;

  // Study timer setup
  const { timeLeft, isRunning, startTimer, pauseTimer, resetTimer, setDuration } = useTimer(
    remainingSecondsInActive,
    () => {
      if (activeSlot) markSessionComplete(activeSlot.id);
    }
  );

  // Sync remaining seconds when activeSlot changes
  useEffect(() => {
    if (activeSlot) {
      setDuration(remainingSecondsInActive);
    }
  }, [activeSlot?.id]);

  if (!activeSlot) return null;

  const isCompleted = completedSessions.includes(activeSlot.id);

  // Determine current subject based on session & weekly rotation
  let subjectName = "General Study";
  if (activeSlot.type === 'study') {
    if (activeSlot.sessionIndex === 1) subjectName = todaySubjectRotation?.subjects[0] || "Physics";
    else if (activeSlot.sessionIndex === 2) subjectName = todaySubjectRotation?.subjects[1] || "Maths";
    else if (activeSlot.sessionIndex === 3) subjectName = todaySubjectRotation?.subjects[2] || "Chemistry";
    else if (activeSlot.sessionIndex === 4) subjectName = todaySubjectRotation?.subjects[0] || "Physics";
    else if (activeSlot.sessionIndex === 5) subjectName = todaySubjectRotation?.subjects[1] || "PYQs";
    else if (activeSlot.sessionIndex === 6) subjectName = "Revision";
    else if (activeSlot.sessionIndex === 7) subjectName = "Formula Review";
  } else if (activeSlot.type === 'break') {
    subjectName = "Break & Rest";
  } else if (activeSlot.type === 'sleep') {
    subjectName = "Sleep & Recovery";
  } else {
    subjectName = "Routine & Wellness";
  }

  const currentTopic = todayTopics[subjectName] || activeSlot.description || "General Practice";

  const handleSaveTopic = () => {
    if (topicInput.trim()) {
      setTodayTopics((prev) => ({ ...prev, [subjectName]: topicInput.trim() }));
    }
    setEditingTopic(false);
  };

  const handleOpenFocusMode = () => {
    setActiveFocusSlot({
      ...activeSlot,
      subjectName,
      currentTopic,
      timeLeft
    });
    setFocusMode(true);
  };

  return (
    <div className="space-y-4">
      
      {/* Hero Now Studying Card */}
      <div className={`p-6 rounded-3xl border transition-all duration-300 shadow-2xl relative overflow-hidden ${
        isCompleted
          ? 'bg-emerald-950/40 border-emerald-500/40 shadow-emerald-950/20'
          : activeSlot.type === 'study'
          ? 'bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-900 border-indigo-500/50 shadow-indigo-950/40'
          : activeSlot.type === 'break'
          ? 'bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-900 border-amber-500/40'
          : 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-slate-700/60'
      }`}>
        
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* Main Info Header */}
          <div className="space-y-3 flex-1">
            
            {/* Status Pill */}
            <div className="flex items-center space-x-3">
              <span className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${
                isCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : activeSlot.type === 'study'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 animate-pulse'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                <span>{isCompleted ? "✅ COMPLETED" : "NOW STUDYING"}</span>
              </span>

              <span className="text-xs font-mono text-slate-400">
                {formatTime24To12(activeSlot.startTime)} – {formatTime24To12(activeSlot.endTime)}
              </span>
            </div>

            {/* Subject Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center space-x-3">
                <span>{subjectName}</span>
                <span className="text-sm font-semibold text-indigo-300 px-3 py-1 bg-slate-800/80 rounded-xl border border-slate-700/50">
                  {activeSlot.title}
                </span>
              </h2>
            </div>

            {/* Topic Specification */}
            <div className="flex items-center space-x-2 text-slate-300 text-sm">
              <Target className="w-4 h-4 text-indigo-400 shrink-0" />
              {editingTopic ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    placeholder="Enter today's topic..."
                    className="bg-slate-800 border border-indigo-500 text-white text-xs px-3 py-1 rounded-lg focus:outline-none"
                    autoFocus
                  />
                  <button onClick={handleSaveTopic} className="text-xs text-emerald-400 font-bold hover:underline">Save</button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-slate-200">Topic: <span className="text-indigo-200">{currentTopic}</span></span>
                  <button 
                    onClick={() => { setTopicInput(currentTopic); setEditingTopic(true); }}
                    className="text-slate-400 hover:text-white p-1 rounded transition"
                    title="Edit topic"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Timer Display & Controls */}
          <div className="flex flex-col items-center lg:items-end space-y-4">
            
            {/* Real-time countdown timer display */}
            <div className="bg-slate-950/80 border border-slate-800/90 px-6 py-3 rounded-2xl shadow-inner text-center">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Time Remaining</div>
              <div className="font-mono text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                ⏱️ {formatSecondsToHHMMSS(timeLeft)}
              </div>
            </div>

            {/* Button Controls */}
            <div className="flex flex-wrap items-center gap-2">
              
              {!isRunning ? (
                <button
                  onClick={startTimer}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition flex items-center space-x-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>START</span>
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="px-4 py-2 rounded-xl bg-amber-600/80 hover:bg-amber-600 text-white font-bold text-sm shadow-lg transition flex items-center space-x-2"
                >
                  <Pause className="w-4 h-4 fill-white" />
                  <span>PAUSE</span>
                </button>
              )}

              <button
                onClick={() => markSessionComplete(activeSlot.id)}
                disabled={isCompleted}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition flex items-center space-x-2 ${
                  isCompleted
                    ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/30 cursor-default'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? "COMPLETED" : "COMPLETE"}</span>
              </button>

              <button
                onClick={handleOpenFocusMode}
                className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-indigo-300 hover:text-white font-semibold text-sm border border-slate-700/60 transition flex items-center space-x-1.5"
                title="Fullscreen Focus Mode"
              >
                <Maximize2 className="w-4 h-4" />
                <span className="hidden sm:inline">FOCUS MODE</span>
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Next Session Card */}
      {nextSlot && (
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-indigo-400 border border-slate-700/60">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Next Session</div>
              <div className="text-sm font-bold text-slate-200">
                {nextSlot.title} <span className="text-xs text-slate-400 font-normal">({formatTime24To12(nextSlot.startTime)})</span>
              </div>
            </div>
          </div>
          <div className="flex items-center text-xs font-semibold text-indigo-400">
            <span>{nextSlot.category}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      )}

    </div>
  );
}
