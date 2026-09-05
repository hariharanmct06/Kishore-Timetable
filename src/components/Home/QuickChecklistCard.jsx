import React from 'react';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EXACT_DAILY_SLOTS } from '../../data/timeSchedule';

export function QuickChecklistCard() {
  const { tasks, toggleTask, timeState } = useApp();
  const studySlots = EXACT_DAILY_SLOTS.filter(s => s.type === 'study');

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Session Checklists</h3>

      <div className="space-y-3">
        {studySlots.map((slot) => {
          const slotTasks = tasks[slot.id] || [];
          if (slotTasks.length === 0) return null;

          let subjectName = "Physics / Chemistry / Maths";
          if (slot.sessionIndex === 1) subjectName = timeState.dayBlueprint?.subjects[0] || "Physics";
          else if (slot.sessionIndex === 2) subjectName = timeState.dayBlueprint?.subjects[1] || "Maths";
          else if (slot.sessionIndex === 3) subjectName = timeState.dayBlueprint?.subjects[2] || "Chemistry";
          else if (slot.sessionIndex === 4) subjectName = timeState.dayBlueprint?.subjects[0] || "Physics";
          else if (slot.sessionIndex === 5) subjectName = timeState.dayBlueprint?.subjects[1] || "PYQs";
          else if (slot.sessionIndex === 6) subjectName = "Revision";
          else if (slot.sessionIndex === 7) subjectName = "Formula Mastery";

          return (
            <div key={slot.id} className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 truncate">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <h4 className="text-xs font-bold text-slate-100 truncate">{slot.title}</h4>
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
