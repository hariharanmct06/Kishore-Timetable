import React from 'react';
import { CheckCircle2, ListTodo, Plus, Sparkles, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DAILY_TIMETABLE_SLOTS } from '../../data/schedule';

export function TaskTracker() {
  const { 
    tasks, 
    toggleTask, 
    addCustomTask, 
    todayStudyProgressPercentage, 
    completedTasksCount, 
    totalTasksCount,
    todaySubjectRotation
  } = useApp();

  const studySlots = DAILY_TIMETABLE_SLOTS.filter(s => s.type === 'study');

  return (
    <div className="space-y-6">
      
      {/* Today's Progress Card */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/50 to-slate-900 border border-slate-800 p-6 rounded-3xl backdrop-blur-md space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ListTodo className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Today's Study Targets & Checklist</h2>
          </div>
          <span className="font-mono text-2xl font-black text-emerald-400">
            {todayStudyProgressPercentage}%
          </span>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden border border-slate-700/60 p-0.5">
          <div 
            className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-700" 
            style={{ width: `${todayStudyProgressPercentage}%` }} 
          />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{completedTasksCount} Completed</span>
          <span>{totalTasksCount - completedTasksCount} Remaining</span>
        </div>

      </div>

      {/* Task Checklist Grouped by Study Session */}
      <div className="space-y-4">
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
            <div key={slot.id} className="bg-slate-900/60 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-100">{slot.title}</h3>
                </div>
                <span className="text-xs font-semibold text-indigo-300 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  {subjectName}
                </span>
              </div>

              <div className="space-y-2">
                {slotTasks.map((t, idx) => (
                  <label
                    key={idx}
                    className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 cursor-pointer text-xs sm:text-sm text-slate-200 transition"
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
