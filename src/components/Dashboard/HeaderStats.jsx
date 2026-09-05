import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle2, ListTodo, Flame, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getGreeting, formatDateHeader } from '../../utils/timeUtils';

export function HeaderStats() {
  const { todayStudyProgressPercentage, completedTasksCount, totalTasksCount, streak, todaySubjectRotation } = useApp();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const greeting = getGreeting(time);
  const timeString = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const remainingTasks = Math.max(0, totalTasksCount - completedTasksCount);

  return (
    <div className="space-y-6">
      
      {/* Main Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-indigo-950/60 border border-slate-800/80 p-6 rounded-3xl shadow-xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div>
          <div className="flex items-center space-x-2 text-blue-400 font-semibold text-sm mb-1">
            <Sparkles className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>JEE Main Preparation Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {greeting}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Today's Focus: <span className="text-indigo-300 font-semibold">{todaySubjectRotation?.focus || "JEE Main Prep"}</span> ({todaySubjectRotation?.dayName})
          </p>
        </div>

        {/* Live Clock Card */}
        <div className="flex items-center space-x-3 bg-slate-800/80 border border-slate-700/60 px-5 py-3 rounded-2xl shadow-inner backdrop-blur-md self-start md:self-auto">
          <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Current Time</div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-slate-100 tracking-wider">
              {timeString}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Date & Day */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center space-x-3 backdrop-blur-sm">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Date & Day</div>
            <div className="text-sm font-bold text-slate-200 mt-0.5 truncate">{formatDateHeader(time)}</div>
          </div>
        </div>

        {/* Study Progress % */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl backdrop-blur-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Study Progress</span>
            <span className="text-xs font-mono font-bold text-emerald-400">{todayStudyProgressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500" 
              style={{ width: `${todayStudyProgressPercentage}%` }} 
            />
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center space-x-3 backdrop-blur-sm">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Completed Tasks</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">{completedTasksCount} Tasks</div>
          </div>
        </div>

        {/* Remaining Tasks */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center space-x-3 backdrop-blur-sm">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ListTodo className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Remaining Tasks</div>
            <div className="text-lg font-bold text-amber-400 mt-0.5">{remainingTasks} Tasks</div>
          </div>
        </div>

      </div>

    </div>
  );
}
