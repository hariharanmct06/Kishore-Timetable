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
    <div className="space-y-4">
      
      {/* Mobile-First Header */}
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl backdrop-blur-md space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>DAILY TIMELINE</span>
          </div>
          <span className="text-xs font-bold text-emerald-400">
            {completedSlotsCount} / {totalSlotsCount} Done
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white">
          TODAY • {todaySubjectRotation?.dayName?.toUpperCase()}
        </h2>

        <p className="text-xs text-indigo-300 font-medium">
          Focus: {todaySubjectRotation?.focus}
        </p>
      </div>

      {/* Spaced Vertical Timeline Container */}
      <div className="py-2">
        {DAILY_TIMETABLE_SLOTS.map((slot, index) => {
          const isActive = activeSlot?.id === slot.id;
          const isCompleted = completedSessions.includes(slot.id);
          const isLast = index === DAILY_TIMETABLE_SLOTS.length - 1;

          return (
            <TimetableItem
              key={slot.id}
              slot={slot}
              isActive={isActive}
              isCompleted={isCompleted}
              isLast={isLast}
            />
          );
        })}
      </div>

    </div>
  );
}
