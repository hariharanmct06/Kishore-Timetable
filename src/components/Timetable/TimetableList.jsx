import React from 'react';
import { DAILY_TIMETABLE_SLOTS } from '../../data/schedule';
import { TimetableItem } from './TimetableItem';
import { useApp } from '../../context/AppContext';
import { findActiveAndNextSlot } from '../../utils/timeUtils';
import { Clock, Calendar, CheckCircle2 } from 'lucide-react';

export function TimetableList() {
  const { completedSessions, todaySubjectRotation } = useApp();
  const { activeSlot } = findActiveAndNextSlot(DAILY_TIMETABLE_SLOTS);

  const totalSlotsCount = DAILY_TIMETABLE_SLOTS.length;
  const completedSlotsCount = completedSessions.length;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-md">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" />
            <span>Kishore's Daily Routine Engine</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Smart 5:00 AM – 11:00 PM Timetable</h2>
          <p className="text-xs text-slate-400 mt-1">
            Today is <span className="text-indigo-300 font-semibold">{todaySubjectRotation?.dayName}</span> • Focus: <span className="text-emerald-300 font-semibold">{todaySubjectRotation?.focus}</span>
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700/60 self-start sm:self-auto">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-slate-200">{completedSlotsCount} / {totalSlotsCount} Routine Slots Done</span>
        </div>
      </div>

      {/* Slots List */}
      <div className="space-y-3">
        {DAILY_TIMETABLE_SLOTS.map((slot) => {
          const isActive = activeSlot?.id === slot.id;
          const isCompleted = completedSessions.includes(slot.id);
          return (
            <TimetableItem
              key={slot.id}
              slot={slot}
              isActive={isActive}
              isCompleted={isCompleted}
            />
          );
        })}
      </div>

    </div>
  );
}
