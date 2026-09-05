import React, { useState } from 'react';
import { Moon, Sparkles, CheckCircle2, BookOpen, Clock, Calendar, X, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function DailySummaryModal() {
  const { 
    showDailySummary, 
    setShowDailySummary, 
    completedSessions, 
    todayStudyProgressPercentage, 
    completedTasksCount,
    todayTopics,
    setTodayTopics
  } = useApp();

  const [tomorrowTopics, setTomorrowTopics] = useState({
    Physics: todayTopics.Physics || 'Electrostatics & Capacitance',
    Maths: todayTopics.Maths || 'Definite Integration & Differential Equations',
    Chemistry: todayTopics.Chemistry || 'Organic Mechanisms & Aldehydes'
  });

  const [isPlanning, setIsPlanning] = useState(false);

  if (!showDailySummary) return null;

  const handleSaveTomorrowPlan = (e) => {
    e.preventDefault();
    setTodayTopics(tomorrowTopics);
    setIsPlanning(false);
    setShowDailySummary(false);
  };

  const estimatedHours = Math.round(completedSessions.length * 2 * 10) / 10;
  const estimatedPYQs = completedSessions.length * 20;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/90 to-slate-900 border border-indigo-500/40 p-6 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => setShowDailySummary(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider">
            <Moon className="w-4 h-4 text-indigo-400" />
            <span>End-of-Day Review</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">GOOD NIGHT, KISHORE 🌙</h2>
          <p className="text-xs text-slate-300">
            Great work today! Here is your daily performance breakdown:
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Study Hours</div>
            <div className="text-xl font-extrabold text-blue-400">{estimatedHours}h Logged</div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Sessions Completed</div>
            <div className="text-xl font-extrabold text-emerald-400">{completedSessions.length} / 7 Completed</div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 font-bold uppercase">PYQs Solved</div>
            <div className="text-xl font-extrabold text-amber-400">~{estimatedPYQs} Solved</div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Tasks Completed</div>
            <div className="text-xl font-extrabold text-indigo-300">{todayStudyProgressPercentage}% Target</div>
          </div>
        </div>

        {/* Tomorrow Preview / Form */}
        {!isPlanning ? (
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Tomorrow's Priority Topics</h3>
            <div className="space-y-1.5 text-xs text-slate-200">
              <div className="flex justify-between">
                <span className="text-blue-400 font-bold">Physics:</span>
                <span className="font-medium text-slate-300">{tomorrowTopics.Physics}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-400 font-bold">Maths:</span>
                <span className="font-medium text-slate-300">{tomorrowTopics.Maths}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-400 font-bold">Chemistry:</span>
                <span className="font-medium text-slate-300">{tomorrowTopics.Chemistry}</span>
              </div>
            </div>

            <button
              onClick={() => setIsPlanning(true)}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>PLAN TOMORROW</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSaveTomorrowPlan} className="bg-slate-950/80 p-4 rounded-2xl border border-indigo-500/40 space-y-3">
            <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Set Tomorrow's Priorities</h3>

            <div>
              <label className="text-[10px] text-slate-400 block mb-0.5">Physics Topic</label>
              <input
                type="text"
                value={tomorrowTopics.Physics}
                onChange={(e) => setTomorrowTopics({ ...tomorrowTopics, Physics: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-0.5">Maths Topic</label>
              <input
                type="text"
                value={tomorrowTopics.Maths}
                onChange={(e) => setTomorrowTopics({ ...tomorrowTopics, Maths: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-0.5">Chemistry Topic</label>
              <input
                type="text"
                value={tomorrowTopics.Chemistry}
                onChange={(e) => setTomorrowTopics({ ...tomorrowTopics, Chemistry: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg"
            >
              Save Tomorrow's Blueprint
            </button>
          </form>
        )}

      </div>

    </div>
  );
}
