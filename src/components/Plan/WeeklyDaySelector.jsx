import React, { useState } from 'react';
import { DAY_SUBJECT_BLUEPRINT } from '../../data/timeSchedule';

export function WeeklyDaySelector() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(new Date().getDay());

  const daysOrder = [1, 2, 3, 4, 5, 6, 0]; // Mon -> Sun
  const selectedDayInfo = DAY_SUBJECT_BLUEPRINT[selectedDayIndex];

  return (
    <div className="space-y-4">
      {/* Day Bar MON | TUE | WED | THU | FRI | SAT | SUN */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
        {daysOrder.map((dayIdx) => {
          const info = DAY_SUBJECT_BLUEPRINT[dayIdx];
          const isSelected = selectedDayIndex === dayIdx;
          const isToday = new Date().getDay() === dayIdx;
          const label = info.dayName.substring(0, 3).toUpperCase();

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
              <span>{label}</span>
              {isToday && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Details */}
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-extrabold text-white">{selectedDayInfo.dayName} Focus Blueprint</h3>
            <p className="text-xs text-indigo-300 font-semibold">{selectedDayInfo.mainFocus}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {selectedDayInfo.pyqFocus}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">{selectedDayInfo.description}</p>

        <div className="grid grid-cols-3 gap-2 text-xs pt-1">
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block font-bold">Main Focus</span>
            <span className="font-bold text-blue-400">{selectedDayInfo.mainFocus}</span>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block font-bold">Secondary</span>
            <span className="font-bold text-amber-400">{selectedDayInfo.secondary}</span>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block font-bold">Revision</span>
            <span className="font-bold text-emerald-400">{selectedDayInfo.revision}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
