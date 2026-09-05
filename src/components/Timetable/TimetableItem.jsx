import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp, Plus, Clock, BookOpen, Coffee, Sun, Moon, Activity, Dumbbell, Utensils, Music, Zap, RotateCcw, Target, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatTime24To12 } from '../../utils/timeUtils';

const ICON_MAP = {
  Sun, Activity, BookOpen, Coffee, Smile: Coffee, Utensils, Moon, Target, CheckCircle2, Dumbbell, RotateCcw, Music, Zap, Calendar
};

export function TimetableItem({ slot, isActive, isCompleted }) {
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
    <div className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
      isActive
        ? 'bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border-blue-500/60 shadow-lg shadow-blue-500/10'
        : isCompleted
        ? 'bg-slate-900/40 border-slate-800/60 opacity-90'
        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700/80'
    }`}>
      
      <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        
        {/* Left Side: Time, Icon, Title */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Time Badge */}
          <div className="flex flex-col items-center justify-center bg-slate-800/80 border border-slate-700/50 rounded-xl px-3 py-2 shrink-0 min-w-[90px]">
            <span className="text-xs font-mono font-bold text-slate-200">{formatTime24To12(slot.startTime)}</span>
            <span className="text-[10px] text-slate-400 font-mono">{formatTime24To12(slot.endTime)}</span>
          </div>

          {/* Type Icon */}
          <div className={`p-2.5 rounded-xl border shrink-0 ${
            slot.type === 'study' ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' :
            slot.type === 'break' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
            slot.type === 'sleep' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' :
            'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          }`}>
            <IconComponent className="w-5 h-5" />
          </div>

          {/* Title & Subject */}
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-100">{slot.title}</h3>
              {isActive && (
                <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/30 animate-pulse">
                  NOW ACTIVE
                </span>
              )}
            </div>
            <div className="text-xs text-slate-400 mt-0.5 flex items-center space-x-2">
              {subjectName && <span className="text-indigo-300 font-semibold">{subjectName} • </span>}
              <span>{slot.category}</span>
            </div>
          </div>

        </div>

        {/* Right Side: Completion Action & Expand Button */}
        <div className="flex items-center justify-between sm:justify-end space-x-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
          
          <button
            onClick={(e) => { e.stopPropagation(); markSessionComplete(slot.id); }}
            disabled={isCompleted}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white border border-slate-700/60'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? "Done" : "Mark Complete"}</span>
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

        </div>

      </div>

      {/* Expanded Task Checklist Drawer */}
      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-slate-950/40 space-y-3">
          <p className="text-xs text-slate-400">{slot.description}</p>

          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Session Task Checklist</div>
            {slotTasks.map((task, idx) => (
              <label
                key={idx}
                className="flex items-center space-x-3 p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 cursor-pointer text-xs text-slate-200 transition"
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

          {/* Add custom task */}
          <form onSubmit={handleAddTask} className="flex items-center space-x-2 pt-1">
            <input
              type="text"
              placeholder="Add custom session subtask..."
              value={newTaskInput}
              onChange={(e) => setNewTaskInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition"
              title="Add task"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
