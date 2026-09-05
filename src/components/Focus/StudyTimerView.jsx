import React, { useState } from 'react';
import { Target, Play, Pause, RotateCcw, Maximize2, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatSecondsToHHMMSS } from '../../utils/timeEngine';

export function StudyTimerView() {
  const { timeState, setFocusMode, setActiveFocusSlot } = useApp();
  const [isRunning, setIsRunning] = useState(true);

  const remainingSeconds = timeState.remainingSeconds || 7200;

  const handleOpenFocus = () => {
    setActiveFocusSlot({
      title: timeState.activeSlot?.title || "Deep Study Session",
      subjectName: "PHYSICS",
      currentTopic: "Electrostatics & PYQs",
      remainingSeconds
    });
    setFocusMode(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl backdrop-blur-md space-y-1">
        <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
          <Target className="w-4 h-4" />
          <span>ACCURATE TIME ENGINE</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">Study Timer & Focus Controller</h2>
        <p className="text-xs text-slate-400">Timestamp-driven countdown synchronized with your system clock.</p>
      </div>

      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-1">
          <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold uppercase tracking-wider">
            {timeState.activeSlot?.title || "Active Study Session"}
          </span>
        </div>

        <div className="font-mono text-5xl sm:text-7xl font-black bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent tracking-tight">
          {formatSecondsToHHMMSS(remainingSeconds)}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {!isRunning ? (
            <button
              onClick={() => setIsRunning(true)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xs shadow-lg flex items-center space-x-2 min-h-[48px]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>START</span>
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(false)}
              className="px-6 py-3 rounded-2xl bg-amber-600 text-white font-extrabold text-xs shadow-lg flex items-center space-x-2 min-h-[48px]"
            >
              <Pause className="w-4 h-4 fill-white" />
              <span>PAUSE</span>
            </button>
          )}

          <button
            onClick={handleOpenFocus}
            className="px-6 py-3 rounded-2xl bg-slate-800 text-indigo-300 font-bold text-xs border border-slate-700 flex items-center space-x-2 min-h-[48px]"
          >
            <Maximize2 className="w-4 h-4" />
            <span>FULLSCREEN FOCUS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
