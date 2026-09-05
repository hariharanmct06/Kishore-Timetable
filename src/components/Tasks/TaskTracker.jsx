import React from 'react';
import { CheckCircle2, ListTodo, BookOpen, Clock, Target } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DAILY_TIMETABLE_SLOTS } from '../../data/schedule';

export function TaskTracker() {
  const { 
    tasks, 
    toggleTask, 
    todayStudyProgressPercentage, 
    completedTasksCount, 
    totalTasksCount,
    completedSessions,
    todaySubjectRotation
  } = useApp();

  const studySlots = DAILY_TIMETABLE_SLOTS.filter(s => s.type === 'study');
  const completedSessionsCount = completedSessions.length;
  const totalStudySlotsCount = studySlots.length;
  const estimatedHours = Math.round(completedSessionsCount * 2 * 10) / 10;

  return (
    <div className="space-y-4">
      
      {/* Compact Today's Progress Card */}
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl backdrop-blur-md space-y-3">
        
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2">
            <Target className="w-4 h-4 text-indigo-400" />
            <span>Today's Progress</span>
          </h2>
          <span className="font-mono text-xl font-black text-emerald-400">
            {todayStudyProgressPercentage}%
          </span>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700/60 p-0.5">
          <div 
            className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-700" 
            style={{ width: `${todayStudyProgressPercentage}%` }} 
          />
        </div>

        {/* Compact Metrics Row */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <span className="text-slate-400 font-medium">Sessions</span>
            <span className="font-bold text-slate-200">{completedSessionsCount} / {totalStudySlotsCount} Done</span>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <span className="text-slate-400 font-medium">Studied</span>
            <span className="font-bold text-indigo-300">{estimatedHours}h Total</span>
          </div>
        </div>

      </div>

      {/* Task Checklist Grouped by Study Session */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Session Target Checklists</p>
        
        {studySlots.map((slot) => {
          const slotTasks = tasks[slot.id] || [];
          if (slotTasks.length === 0) return null;

          let subjectName = "Physics / Chemistry / Maths";
          if (slot.sessionIndex === 1) subjectName = todaySubjectRotation?.subjects[0] || "Physics";
          else if (slot.sessionIndex === 2) subjectName = todaySubjectRotation?.subjects[1] || "Maths";
          else if (slot.sessionIndex === 3) subjectName = todaySubjectRotation?.subjects[2] || "Chemistry";
          else if (slot.sessionIndex === 4) subjectName = todaySubjectRotation?.subjects[0] || "Physics";
          else if (slot.sessionIndex === 5) subjectName = todaySubjectRotation?.subjects[1] || "PYQs";
          else if (slot.sessionIndex === 6) subjectName = "Revision";
          else if (slot.sessionIndex === 7) subjectName = "Formula Mastery";

          return (
            <div key={slot.id} className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 truncate max-w-[200px]">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <h3 className="text-xs sm:text-sm font-bold text-slate-100 truncate">{slot.title}</h3>
                </div>
                <span className="text-[10px] font-semibold text-indigo-300 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 shrink-0">
                  {subjectName}
                </span>
              </div>

              <div className="space-y-1.5">
                {slotTasks.map((t, idx) => (
                  <label
                    key={idx}
                    className="flex items-center space-x-3 p-2 rounded-xl bg-slate-800/40 border border-slate-700/40 cursor-pointer text-xs text-slate-200 transition min-h-[38px]"
                  >
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => toggleTask(slot.id, idx)}
                      className="rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <span className={t.completed ? 'line-through text-slate-400' : 'font-medium'}>
                      {t.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
