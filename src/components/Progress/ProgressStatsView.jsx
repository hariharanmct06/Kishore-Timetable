import React from 'react';
import { Flame, BookOpen, CheckCircle2, TestTube, Target, Clock, Trophy, Zap, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ProgressStatsView() {
  const { streak, xp, levelInfo, completedSessions, mockTests, mistakes } = useApp();

  const mockAvg = mockTests.length > 0
    ? Math.round(mockTests.reduce((acc, m) => acc + m.totalScore, 0) / mockTests.length)
    : 0;

  const totalStudyHours = Math.round((completedSessions.length * 2) * 10) / 10;
  const pyqsSolved = completedSessions.length * 20;

  return (
    <div className="space-y-4">
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl backdrop-blur-md flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>PROGRESS TRACKER</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">Overall Performance</h2>
        </div>

        <div className="flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full text-amber-400 font-bold text-xs">
          <Trophy className="w-3.5 h-3.5" />
          <span>Lvl {levelInfo.level}</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/40 p-5 rounded-3xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Level Rank</div>
            <h3 className="text-lg font-black text-white">{levelInfo.title}</h3>
          </div>
          <span className="text-xl font-mono font-black text-amber-400">{xp} XP</span>
        </div>

        <div className="space-y-1">
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700/60 p-0.5">
            <div 
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 h-full rounded-full transition-all duration-700" 
              style={{ width: `${levelInfo.percentage}%` }} 
            />
          </div>
          <div className="text-[10px] text-slate-400 text-right font-mono">{levelInfo.percentage}% to Level {levelInfo.level + 1}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center space-x-1.5 text-orange-400 text-xs font-bold uppercase">
            <Flame className="w-4 h-4 fill-orange-500" />
            <span>Streak</span>
          </div>
          <div className="text-xl font-black text-white">{streak} Days 🔥</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center space-x-1.5 text-blue-400 text-xs font-bold uppercase">
            <Clock className="w-4 h-4" />
            <span>Study Time</span>
          </div>
          <div className="text-xl font-black text-white">{totalStudyHours}h ⏱️</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center space-x-1.5 text-indigo-400 text-xs font-bold uppercase">
            <BookOpen className="w-4 h-4" />
            <span>PYQs Solved</span>
          </div>
          <div className="text-xl font-black text-white">~{pyqsSolved} 📝</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center space-x-1.5 text-purple-400 text-xs font-bold uppercase">
            <TestTube className="w-4 h-4" />
            <span>Mock Tests</span>
          </div>
          <div className="text-xl font-black text-white">{mockTests.length} Mocks 🧪</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center space-x-1.5 text-cyan-400 text-xs font-bold uppercase">
            <Target className="w-4 h-4" />
            <span>Avg Mock Score</span>
          </div>
          <div className="text-xl font-black text-white">{mockAvg} / 300 🎯</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center space-x-1.5 text-red-400 text-xs font-bold uppercase">
            <Zap className="w-4 h-4" />
            <span>Mistakes</span>
          </div>
          <div className="text-xl font-black text-white">{mistakes.length} Logged ❌</div>
        </div>
      </div>
    </div>
  );
}
