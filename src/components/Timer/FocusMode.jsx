import React, { useState, useEffect } from 'react';
import { Minimize2, Play, Pause, CheckCircle2, Volume2, VolumeX, Sparkles, Target } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatSecondsToHHMMSS } from '../../utils/timeUtils';
import { useAudioAlert } from '../../hooks/useAudioAlert';
import { getRandomQuote } from '../../data/quotes';

export function FocusMode() {
  const { setFocusMode, activeFocusSlot, markSessionComplete, todayTopics } = useApp();
  const { playChime } = useAudioAlert();

  const [timeLeft, setTimeLeft] = useState(activeFocusSlot?.timeLeft || 7200);
  const [isRunning, setIsRunning] = useState(true);
  const [ambientSound, setAmbientSound] = useState(false);
  const quote = getRandomQuote();

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

  const subject = activeFocusSlot?.subjectName || "JEE Deep Focus";
  const topic = activeFocusSlot?.currentTopic || todayTopics[subject] || "Target Concepts & Problems";

  const handleComplete = () => {
    if (activeFocusSlot?.id) markSessionComplete(activeFocusSlot.id);
    playChime('complete');
    setFocusMode(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none animate-fadeIn">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header controls */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Deep Focus Mode • Kishore JEE OS</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setAmbientSound(!ambientSound)}
            className={`p-3 rounded-2xl border transition ${
              ambientSound ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
            title="Toggle Ambient Audio Tone"
          >
            {ambientSound ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setFocusMode(false)}
            className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition"
            title="Exit Focus Mode"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Central High-Contrast Clock */}
      <div className="flex flex-col items-center justify-center text-center z-10 space-y-6">
        
        <div className="space-y-2">
          <span className="px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold uppercase tracking-widest">
            {subject}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-200">{topic}</h2>
        </div>

        {/* Display Timer */}
        <div className="font-mono text-6xl sm:text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-200 to-cyan-300 bg-clip-text text-transparent tracking-tighter drop-shadow-2xl">
          {formatSecondsToHHMMSS(timeLeft)}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-4 pt-4">
          {!isRunning ? (
            <button
              onClick={() => setIsRunning(true)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-lg shadow-2xl shadow-blue-500/30 transition flex items-center space-x-3"
            >
              <Play className="w-6 h-6 fill-white" />
              <span>RESUME</span>
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(false)}
              className="px-8 py-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-lg shadow-2xl transition flex items-center space-x-3"
            >
              <Pause className="w-6 h-6 fill-white" />
              <span>PAUSE</span>
            </button>
          )}

          <button
            onClick={handleComplete}
            className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-lg shadow-2xl shadow-emerald-600/30 transition flex items-center space-x-3"
          >
            <CheckCircle2 className="w-6 h-6" />
            <span>COMPLETE SESSION</span>
          </button>
        </div>

      </div>

      {/* Footer Motivation */}
      <div className="text-center max-w-xl mx-auto z-10">
        <blockquote className="text-xs sm:text-sm text-slate-400 italic">
          "{quote.quote}"
        </blockquote>
      </div>

    </div>
  );
}
