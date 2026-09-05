import React from 'react';
import { Target, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EXACT_DAILY_SLOTS } from '../../data/timeSchedule';

export function ProgressSummaryCard() {
  const { todayProgressPercent, completedSessions } = useApp();

  const studySlotsCount = EXACT_DAILY_SLOTS.filter(s => s.type === 'study').length;
  const completedCount = completedSessions.length;
  const totalHours = Math.floor(completedCount * 2);
  const totalMins = Math.round((completedCount * 2 - totalHours) * 60);

  return (
    <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl backdrop-blur-md space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Target className="w-4 h-4 text-indigo-400" />
          <span>TODAY'S PROGRESS</span>
        </h3>
        <span className="font-mono text-xl font-black text-emerald-400">
          {todayProgressPercent}%
        </span>
      </div>

      {/* Dynamic Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700/60 p-0.5">
        <div 
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-700" 
          style={{ width: `${todayProgressPercent}%` }} 
        />
      </div>

      {/* Compact Metrics Row */}
      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
        <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400 font-medium">Sessions</span>
          <span className="font-bold text-slate-200">{completedCount} / {studySlotsCount}</span>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400 font-medium">Studied</span>
          <span className="font-bold text-indigo-300">{totalHours}h {totalMins}m</span>
        </div>
      </div>
    </div>
  );
}
