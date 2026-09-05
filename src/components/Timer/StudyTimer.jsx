import React, { useState } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Maximize2, Timer as TimerIcon, Coffee, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTimer } from '../../hooks/useTimer';
import { formatSecondsToHHMMSS, formatSecondsToMMSS } from '../../utils/timeUtils';

export function StudyTimer() {
  const { setFocusMode, setActiveFocusSlot, markSessionComplete, pomodoroMode, setPomodoroMode, userProfile } = useApp();

  const [selectedDuration, setSelectedDuration] = useState(120); // 120 minutes default (2 hrs)
  const { 
    timeLeft, 
    isRunning, 
    startTimer, 
    pauseTimer, 
    resetTimer, 
    setDuration, 
    pomodoroState, 
    setPomodoroState 
  } = useTimer(selectedDuration * 60);

  const handleSelectPreset = (mins) => {
    setSelectedDuration(mins);
    resetTimer(mins * 60);
  };

  const handleTogglePomodoro = () => {
    const nextState = !pomodoroMode;
    setPomodoroMode(nextState);
    if (nextState) {
      // Set to 50 min pomodoro work
      resetTimer(userProfile.pomodoroWork * 60);
    } else {
      resetTimer(selectedDuration * 60);
    }
  };

  const handleFocusClick = () => {
    setActiveFocusSlot({
      title: pomodoroMode ? `Pomodoro ${pomodoroState.toUpperCase()}` : "Custom Study Session",
      subjectName: "Deep Focus",
      currentTopic: "Problem Solving & Revision",
      timeLeft
    });
    setFocusMode(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
            <TimerIcon className="w-4 h-4" />
            <span>Built-in JEE Study Timer</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Focus & Time Tracker</h2>
          <p className="text-xs text-slate-400 mt-1">
            Eliminate distractions, build deep study momentum, and track your active study hours.
          </p>
        </div>

        {/* Pomodoro Toggle */}
        <button
          onClick={handleTogglePomodoro}
          className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition flex items-center space-x-2 ${
            pomodoroMode
              ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/20'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>{pomodoroMode ? "Pomodoro Active (50m study + 10m break)" : "Enable Pomodoro Mode"}</span>
        </button>
      </div>

      {/* Main Timer Display Box */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Preset Selector */}
        {!pomodoroMode && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[25, 45, 60, 90, 120].map((mins) => (
              <button
                key={mins}
                onClick={() => handleSelectPreset(mins)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                  selectedDuration === mins
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                {mins} Mins
              </button>
            ))}
          </div>
        )}

        {/* Pomodoro Status Pill */}
        {pomodoroMode && (
          <div className="flex items-center space-x-2 bg-indigo-950/60 border border-indigo-500/30 px-4 py-1.5 rounded-full text-xs font-bold text-indigo-300">
            <Coffee className="w-4 h-4" />
            <span>{pomodoroState === 'work' ? "50 MIN STUDY FOCUS" : "10 MIN BREAK TIME"}</span>
          </div>
        )}

        {/* Countdown Timer */}
        <div className="font-mono text-6xl sm:text-7xl md:text-8xl font-black bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent tracking-tight drop-shadow-xl">
          {formatSecondsToHHMMSS(timeLeft)}
        </div>

        {/* Primary Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition flex items-center space-x-2"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>START TIMER</span>
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="px-8 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-sm shadow-xl transition flex items-center space-x-2"
            >
              <Pause className="w-5 h-5 fill-white" />
              <span>PAUSE</span>
            </button>
          )}

          <button
            onClick={() => resetTimer(selectedDuration * 60)}
            className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handleFocusClick}
            className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white font-bold text-sm border border-slate-700 transition flex items-center space-x-2"
          >
            <Maximize2 className="w-4 h-4" />
            <span>FULLSCREEN FOCUS</span>
          </button>
        </div>

      </div>

    </div>
  );
}
