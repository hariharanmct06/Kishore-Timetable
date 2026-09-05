import React, { useState } from 'react';
import { CalendarDays, BookOpen, Target, CheckCircle2, ChevronRight } from 'lucide-react';
import { WEEKLY_SUBJECT_ROTATION, DAILY_TIMETABLE_SLOTS } from '../../data/schedule';
import { formatTime24To12 } from '../../utils/timeUtils';

export function WeeklyCalendar() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(new Date().getDay());

  const daysOrder = [1, 2, 3, 4, 5, 6, 0]; // Mon -> Sun
  const selectedDayInfo = WEEKLY_SUBJECT_ROTATION[selectedDayIndex];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
            <CalendarDays className="w-4 h-4" />
            <span>Weekly Master Plan</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">7-Day Timetable & Rotation</h2>
          <p className="text-xs text-slate-400 mt-1">
            Click any day of the week to inspect its subject priorities and routine schedule.
          </p>
        </div>
      </div>

      {/* Days Tabs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {daysOrder.map((dayIdx) => {
          const info = WEEKLY_SUBJECT_ROTATION[dayIdx];
          const isSelected = selectedDayIndex === dayIdx;
          const isToday = new Date().getDay() === dayIdx;

          return (
            <button
              key={dayIdx}
              onClick={() => setSelectedDayIndex(dayIdx)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-gradient-to-br from-indigo-900 to-blue-900 border-indigo-500/80 text-white shadow-xl shadow-indigo-500/20 scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">{info.dayName}</span>
                {isToday && (
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-blue-500 text-white">
                    TODAY
                  </span>
                )}
              </div>

              <div>
                <div className="text-xs font-semibold text-indigo-300 truncate">{info.primarySubject}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{info.focus}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Timetable Drawer */}
      <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-3xl space-y-4">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white">{selectedDayInfo.dayName} Timetable Blueprint</h3>
            <p className="text-xs text-indigo-300 font-medium mt-0.5">
              Subjects: {selectedDayInfo.subjects.join(' → ')}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {selectedDayInfo.focus}
          </span>
        </div>

        <p className="text-xs text-slate-400 italic">"{selectedDayInfo.customNotes}"</p>

        {/* Schedule List preview */}
        <div className="space-y-2 pt-2">
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
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-slate-400 font-bold min-w-[110px]">
                    {formatTime24To12(slot.startTime)} - {formatTime24To12(slot.endTime)}
                  </span>
                  <span className="font-bold text-slate-200">{slot.title}</span>
                </div>
                {slotSubject && (
                  <span className="font-semibold text-indigo-300 px-2 py-0.5 rounded-md bg-indigo-500/10">
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
