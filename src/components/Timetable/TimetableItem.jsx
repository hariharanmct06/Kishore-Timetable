import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp, Plus, BookOpen, Coffee, Sun, Moon, Activity, Dumbbell, Utensils, Music, Zap, RotateCcw, Target, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatTime24To12 } from '../../utils/timeUtils';

const ICON_MAP = {
  Sun, Activity, BookOpen, Coffee, Smile: Coffee, Utensils, Moon, Target, CheckCircle2, Dumbbell, RotateCcw, Music, Zap, Calendar
};

export function TimetableItem({ slot, isActive, isCompleted, isLast }) {
  const { markSessionComplete, tasks, toggleTask, addCustomTask, todaySubjectRotation } = useApp();
  const [expanded, setExpanded] = useState(false);
  const [newTaskInput, setNewTaskInput] = useState('');

  const IconComponent = ICON_MAP[slot.icon] || BookOpen;
  const slotTasks = tasks[slot.id] || [];

  // Subject mapping
  let subjectName = "";
  if (slot.type === 'study') {
    if (slot.sessionIndex === 1) subjectName = todaySubjectRotation?.subjects[0] || "Physics";
    else if (slot.sessionIndex === 2) subjectName = todaySubjectRotation?.subjects[1] || "Maths";
    else if (slot.sessionIndex === 3) subjectName = todaySubjectRotation?.subjects[2] || "Chemistry";
    else if (slot.sessionIndex === 4) subjectName = todaySubjectRotation?.subjects[0] || "Physics";
    else if (slot.sessionIndex === 5) subjectName = todaySubjectRotation?.subjects[1] || "PYQs";
    else if (slot.sessionIndex === 6) subjectName = "Revision";
    else if (slot.sessionIndex === 7) subjectName = "Formula Review";
  }

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskInput.trim()) {
      addCustomTask(slot.id, newTaskInput);
      setNewTaskInput('');
    }
  };

  return (
    <div className="relative pl-6 sm:pl-8 pb-4">
      
      {/* Timeline Vertical Connector Line */}
      {!isLast && (
        <div className={`absolute left-2.5 sm:left-3.5 top-8 bottom-0 w-0.5 ${
          isCompleted ? 'bg-emerald-500/40' : isActive ? 'bg-blue-500/40' : 'bg-slate-800'
        }`} />
      )}

      {/* Timeline Bullet Node Icon */}
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

      {/* Card Content */}
      <div className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        isActive
          ? 'bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/90 border-blue-500/60 shadow-lg shadow-blue-500/10'
          : isCompleted
          ? 'bg-slate-900/40 border-slate-800/60 opacity-80'
          : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
      }`}>
        
        <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
          
          <div className="flex items-center space-x-3 truncate">
            {/* Time & Title */}
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
              onClick={() => setExpanded(!expanded)}
              className="p-1 text-slate-400 hover:text-white rounded-lg transition"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Expanded Tasks Drawer */}
        {expanded && (
          <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-slate-950/50 space-y-2.5">
            <p className="text-xs text-slate-400">{slot.description}</p>

            <div className="space-y-1.5">
              {slotTasks.map((task, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-3 p-2 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer text-xs text-slate-200 transition min-h-[38px]"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(slot.id, idx)}
                    className="rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className={task.completed ? 'line-through text-slate-400' : 'font-medium'}>
                    {task.text}
                  </span>
                </label>
              ))}
            </div>

            <form onSubmit={handleAddTask} className="flex items-center space-x-2 pt-1">
              <input
                type="text"
                placeholder="Add subtask..."
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="p-1.5 bg-indigo-600 text-white rounded-xl transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

      </div>

    </div>
  );
}
