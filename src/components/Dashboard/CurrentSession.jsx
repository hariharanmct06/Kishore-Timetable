import React, { useState, useEffect } from 'react';
import { Play, Pause, CheckCircle2, Maximize2, Clock, Zap, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DAILY_TIMETABLE_SLOTS } from '../../data/schedule';
import { findActiveAndNextSlot, formatSecondsToHHMMSS, formatTime24To12 } from '../../utils/timeUtils';
import { useTimer } from '../../hooks/useTimer';

export function CurrentSession() {
  const { 
    completedSessions, 
    markSessionComplete, 
    todayTopics, 
    todaySubjectRotation, 
    setFocusMode, 
    setActiveFocusSlot 
  } = useApp();

  const [activeInfo, setActiveInfo] = useState(() => findActiveAndNextSlot(DAILY_TIMETABLE_SLOTS));

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

  useEffect(() => {
    if (activeSlot) {
      setDuration(remainingSecondsInActive);
    }
  }, [activeSlot?.id]);

  if (!activeSlot) return null;

  const isCompleted = completedSessions.includes(activeSlot.id);

  // Subject mapping
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
    <div className="space-y-3">
      
      {/* Hero Card (Mobile-First spacious layout) */}
      <div className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 shadow-xl relative overflow-hidden ${
        isCompleted
          ? 'bg-emerald-950/40 border-emerald-500/40'
          : activeSlot.type === 'study'
          ? 'bg-gradient-to-br from-slate-900 via-indigo-950/90 to-slate-900 border-indigo-500/50 shadow-indigo-950/30'
          : 'bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-900 border-amber-500/40'
      }`}>
        
        {/* Mobile View (Spacious, Minimal, Large Touch Targets) */}
        <div className="flex flex-col space-y-4">
          
          {/* Header Badge */}
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
            }`}>
              <Zap className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
              <span>{isCompleted ? "✓ COMPLETED" : "⚡ NOW"}</span>
            </span>

            <span className="text-xs font-mono text-slate-400">
              {formatTime24To12(activeSlot.startTime)} - {formatTime24To12(activeSlot.endTime)}
            </span>
          </div>

          {/* Subject & Subtitle */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{subjectName}</h2>
            <p className="text-xs font-semibold text-indigo-300 mt-0.5">{activeSlot.title}</p>
          </div>

          {/* Large Countdown Timer */}
          <div className="py-2 text-center bg-slate-950/60 rounded-2xl border border-slate-800/80">
            <div className="font-mono text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-400 via-indigo-200 to-cyan-300 bg-clip-text text-transparent tracking-tight">
              {formatSecondsToHHMMSS(timeLeft)}
            </div>
          </div>

          {/* Touch-friendly Primary Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {!isRunning ? (
              <button
                onClick={startTimer}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 transition flex items-center justify-center space-x-2 min-h-[48px]"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>START SESSION</span>
              </button>
            ) : (
              <button
                onClick={pauseTimer}
                className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-sm shadow-lg transition flex items-center justify-center space-x-2 min-h-[48px]"
              >
                <Pause className="w-4 h-4 fill-white" />
                <span>PAUSE</span>
              </button>
            )}

            <button
              onClick={() => markSessionComplete(activeSlot.id)}
              disabled={isCompleted}
              className={`w-full py-3.5 rounded-2xl font-bold text-sm transition flex items-center justify-center space-x-2 min-h-[48px] ${
                isCompleted
                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? "COMPLETED" : "COMPLETE"}</span>
            </button>

            <button
              onClick={handleOpenFocusMode}
              className="w-full sm:w-auto py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-indigo-300 font-semibold text-xs border border-slate-700/60 transition flex items-center justify-center space-x-1.5 min-h-[44px]"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>FOCUS MODE</span>
            </button>
          </div>

        </div>

      </div>

      {/* Clean Next Session Preview Bar */}
      {nextSlot && (
        <div className="bg-slate-900/70 border border-slate-800 px-4 py-3 rounded-2xl flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">NEXT</span>
            <span className="text-slate-500 text-xs">•</span>
            <span className="text-xs font-bold text-slate-200">{nextSlot.title}</span>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-400">
            {formatTime24To12(nextSlot.startTime)}
          </span>
        </div>
      )}

    </div>
  );
}
