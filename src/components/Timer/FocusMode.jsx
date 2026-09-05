import React, { useState, useEffect } from 'react';
import { Minimize2, Play, Pause, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatSecondsToHHMMSS } from '../../utils/timeUtils';
import { useAudioAlert } from '../../hooks/useAudioAlert';

export function FocusMode() {
  const { setFocusMode, activeFocusSlot, markSessionComplete, todayTopics } = useApp();
  const { playChime } = useAudioAlert();

  const [timeLeft, setTimeLeft] = useState(activeFocusSlot?.timeLeft || 7200);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const subject = activeFocusSlot?.subjectName || "PHYSICS";
  const topic = activeFocusSlot?.currentTopic || todayTopics[subject] || "Electrostatics";

  const handleComplete = () => {
    if (activeFocusSlot?.id) markSessionComplete(activeFocusSlot.id);
    playChime('complete');
    setFocusMode(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none animate-fadeIn">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar Exit Button */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase">DEEP FOCUS</span>
        </div>

        <button
          onClick={() => setFocusMode(false)}
          className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Exit Focus Mode"
        >
          <Minimize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Central Calm Focus Display */}
      <div className="flex flex-col items-center justify-center text-center z-10 space-y-6">
        
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-wider">{subject}</h1>
          <p className="text-sm sm:text-lg font-semibold text-indigo-300">{topic}</p>
        </div>

        {/* Large Countdown Timer */}
        <div className="font-mono text-5xl sm:text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-400 via-indigo-200 to-cyan-300 bg-clip-text text-transparent tracking-tight drop-shadow-2xl">
          {formatSecondsToHHMMSS(timeLeft)}
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs pt-4">
          {!isRunning ? (
            <button
              onClick={() => setIsRunning(true)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-base shadow-xl shadow-blue-500/25 transition flex items-center justify-center space-x-2 min-h-[52px]"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>RESUME</span>
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(false)}
              className="w-full py-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-base shadow-xl transition flex items-center justify-center space-x-2 min-h-[52px]"
            >
              <Pause className="w-5 h-5 fill-white" />
              <span>PAUSE</span>
            </button>
          )}

          <button
            onClick={handleComplete}
            className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base shadow-xl shadow-emerald-600/25 transition flex items-center justify-center space-x-2 min-h-[52px]"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>COMPLETE</span>
          </button>
        </div>

      </div>

      <div className="text-center z-10 text-xs text-slate-500 font-medium">
        Stay focused. One step closer to JEE Main.
      </div>

    </div>
  );
}
