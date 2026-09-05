import React, { useState } from 'react';
import { CalendarDays, BookOpen, Clock } from 'lucide-react';
import { WEEKLY_SUBJECT_ROTATION, DAILY_TIMETABLE_SLOTS } from '../../data/schedule';
import { formatTime24To12 } from '../../utils/timeUtils';

export function WeeklyCalendar() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(new Date().getDay());

  const daysOrder = [1, 2, 3, 4, 5, 6, 0]; // Mon -> Sun
  const selectedDayInfo = WEEKLY_SUBJECT_ROTATION[selectedDayIndex];

  return (
    <div className="space-y-4">
      
      {/* Mobile-First Header */}
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl backdrop-blur-md">
        <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
          <CalendarDays className="w-4 h-4" />
          <span>WEEKLY MASTER PLAN</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">Subject Rotation & Strategy</h2>
      </div>

      {/* Horizontal Scrollable Day Selector (MON | TUE | WED | THU | FRI | SAT | SUN) */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
        {daysOrder.map((dayIdx) => {
          const info = WEEKLY_SUBJECT_ROTATION[dayIdx];
          const isSelected = selectedDayIndex === dayIdx;
          const isToday = new Date().getDay() === dayIdx;

          const shortLabel = info.dayName.substring(0, 3).toUpperCase();

          return (
            <button
              key={dayIdx}
              onClick={() => setSelectedDayIndex(dayIdx)}
              className={`px-4 py-3 rounded-2xl font-extrabold text-xs transition-all shrink-0 min-h-[44px] flex flex-col items-center justify-center min-w-[58px] ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-[1.03]'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>{shortLabel}</span>
              {isToday && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Timetable Drawer */}
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-extrabold text-white">{selectedDayInfo.dayName} Blueprint</h3>
            <p className="text-xs text-indigo-300 font-semibold">{selectedDayInfo.focus}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {selectedDayInfo.primarySubject}
          </span>
        </div>

        <p className="text-xs text-slate-400 italic">"{selectedDayInfo.customNotes}"</p>

        {/* Schedule List */}
        <div className="space-y-2">
          {DAILY_TIMETABLE_SLOTS.map((slot) => {
            let slotSubject = "";
            if (slot.type === 'study') {
              if (slot.sessionIndex === 1) slotSubject = selectedDayInfo.subjects[0] || "Physics";
              else if (slot.sessionIndex === 2) slotSubject = selectedDayInfo.subjects[1] || "Maths";
              else if (slot.sessionIndex === 3) slotSubject = selectedDayInfo.subjects[2] || "Chemistry";
              else if (slot.sessionIndex === 4) slotSubject = selectedDayInfo.subjects[0] || "Physics";
              else if (slot.sessionIndex === 5) slotSubject = selectedDayInfo.subjects[1] || "PYQs";
              else if (slot.sessionIndex === 6) slotSubject = "Revision";
              else if (slot.sessionIndex === 7) slotSubject = "Formula Review";
            }

            return (
              <div key={slot.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                <div className="flex items-center space-x-2.5 truncate">
                  <span className="font-mono text-slate-400 font-bold shrink-0">
                    {formatTime24To12(slot.startTime)}
                  </span>
                  <span className="font-bold text-slate-200 truncate">{slot.title}</span>
                </div>
                {slotSubject && (
                  <span className="font-semibold text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/10 shrink-0 text-[10px]">
                    {slotSubject}
                  </span>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
