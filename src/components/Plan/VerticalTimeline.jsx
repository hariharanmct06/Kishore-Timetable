import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp, Plus, BookOpen, Coffee, Sun, Moon, Activity, Dumbbell, Utensils, Music, Zap, RotateCcw, Target, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EXACT_DAILY_SLOTS } from '../../data/timeSchedule';
import { formatTime24To12 } from '../../utils/timeEngine';

const ICON_MAP = {
  Sun, Activity, BookOpen, Coffee, Smile: Coffee, Utensils, Moon, Target, CheckCircle2, Dumbbell, RotateCcw, Music, Zap, Calendar
};

export function VerticalTimeline() {
  const { timeState, completedSessions, markSessionComplete, tasks, toggleTask } = useApp();
  const [expandedSlotId, setExpandedSlotId] = useState(null);

  const { activeSlot } = timeState;

  return (
    <div className="space-y-4">
      
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">DAILY TIMELINE</span>
          <span className="text-xs font-bold text-emerald-400">
            {completedSessions.length} / {EXACT_DAILY_SLOTS.length} Done
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
          {timeState.dayBlueprint?.dayName?.toUpperCase()} ROUTINE
        </h2>
        <p className="text-xs text-indigo-300 font-medium">
          Focus: {timeState.dayBlueprint?.mainFocus}
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="py-2">
        {EXACT_DAILY_SLOTS.map((slot, idx) => {
          const isActive = activeSlot?.id === slot.id;
          const isCompleted = completedSessions.includes(slot.id);
          const isLast = idx === EXACT_DAILY_SLOTS.length - 1;
          const isExpanded = expandedSlotId === slot.id;
          const slotTasks = tasks[slot.id] || [];

          let subjectName = "";
          if (slot.type === 'study') {
            if (slot.sessionIndex === 1) subjectName = timeState.dayBlueprint?.subjects[0] || "Physics";
            else if (slot.sessionIndex === 2) subjectName = timeState.dayBlueprint?.subjects[1] || "Maths";
            else if (slot.sessionIndex === 3) subjectName = timeState.dayBlueprint?.subjects[2] || "Chemistry";
            else if (slot.sessionIndex === 4) subjectName = timeState.dayBlueprint?.subjects[0] || "Physics";
            else if (slot.sessionIndex === 5) subjectName = timeState.dayBlueprint?.subjects[1] || "PYQs";
            else if (slot.sessionIndex === 6) subjectName = "Revision";
            else if (slot.sessionIndex === 7) subjectName = "Formula Review";
          }

          return (
            <div key={slot.id} className="relative pl-6 sm:pl-8 pb-4">
              
              {/* Connector Line */}
              {!isLast && (
                <div className={`absolute left-2.5 sm:left-3.5 top-8 bottom-0 w-0.5 ${
                  isCompleted ? 'bg-emerald-500/40' : isActive ? 'bg-blue-500/40' : 'bg-slate-800'
                }`} />
              )}

              {/* Node Bullet */}
              <div className={`absolute left-0 top-1.5 w-5 h-5 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/40 scale-110'
                  : isCompleted
                  ? 'bg-emerald-600 border-emerald-400 text-white'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}>
                {isCompleted ? (
                  <span className="text-[10px] font-bold">✓</span>
                ) : (
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white animate-ping' : 'bg-slate-400'}`} />
                )}
              </div>

              {/* Slot Card */}
              <div className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/90 border-blue-500/60 shadow-lg shadow-blue-500/10'
                  : isCompleted
                  ? 'bg-slate-900/40 border-slate-800/60 opacity-80'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}>
                
                <div 
                  className="p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer"
                  onClick={() => setExpandedSlotId(isExpanded ? null : slot.id)}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-slate-300">
                          {formatTime24To12(slot.startTime)} - {formatTime24To12(slot.endTime)}
                        </span>
                        {isActive && (
                          <span className="bg-blue-500/20 text-blue-300 text-[9px] font-black px-2 py-0.5 rounded-full border border-blue-500/30 animate-pulse">
                            NOW
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-emerald-400 text-xs font-semibold">✓ Completed</span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-slate-100 mt-0.5 truncate">{slot.title}</h3>
                      {subjectName && <p className="text-xs text-indigo-300 font-medium">{subjectName}</p>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); markSessionComplete(slot.id); }}
                      disabled={isCompleted}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center space-x-1 min-h-[36px] ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white border border-slate-700/60'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{isCompleted ? "Done" : "Complete"}</span>
                    </button>

                    <button
                      onClick={() => setExpandedSlotId(isExpanded ? null : slot.id)}
                      className="p-1 text-slate-400 hover:text-white transition"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-slate-950/50 space-y-2 text-xs">
                    <p className="text-slate-400">{slot.description}</p>
                    <div className="space-y-1.5 pt-1">
                      {slotTasks.map((t, idx) => (
                        <label
                          key={idx}
                          className="flex items-center space-x-3 p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer text-slate-200"
                        >
                          <input
                            type="checkbox"
                            checked={t.completed}
                            onChange={() => toggleTask(slot.id, idx)}
                            className="rounded border-slate-700 bg-slate-800 text-blue-600 h-4 w-4"
                          />
                          <span className={t.completed ? 'line-through text-slate-400' : 'font-medium'}>
                            {t.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
