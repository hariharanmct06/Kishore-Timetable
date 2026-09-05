import React from 'react';
import { Flame, BookOpen, CheckCircle2, TestTube, Target, Clock, Trophy, Award, Zap, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ProgressDashboard() {
  const { streak, xp, levelInfo, completedSessions, mockTests, mistakes } = useApp();

  const mockAvg = mockTests.length > 0
    ? Math.round(mockTests.reduce((acc, m) => acc + m.totalScore, 0) / mockTests.length)
    : 0;

  // Estimated metrics
  const totalStudyHours = Math.round((completedSessions.length * 2) * 10) / 10; // ~2 hrs per session
  const pyqsSolved = completedSessions.length * 20; // ~20 PYQs per completed session

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Kishore's JEE Master Stats</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Overall Preparation Analytics</h2>
          <p className="text-xs text-slate-400 mt-1">
            Track your study consistency, total study hours, rank leveling, and PYQ targets.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-2xl text-amber-400 font-bold text-xs">
          <Trophy className="w-4 h-4" />
          <span>Level {levelInfo.level}: {levelInfo.title}</span>
        </div>
      </div>

      {/* Primary Level & XP Hero Card */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/40 p-6 rounded-3xl shadow-2xl relative overflow-hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-indigo-300 font-bold uppercase tracking-wider">Current Gamification Level</div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">Level {levelInfo.level} — {levelInfo.title}</h3>
          </div>
          <div className="text-right">
            <span className="text-2xl font-mono font-black text-amber-400">{xp} XP</span>
            <div className="text-xs text-slate-400">Total Experience Points</div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Level Progress ({levelInfo.percentage}%)</span>
            <span>Next Level at {levelInfo.nextLevelXP} XP</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700/60 p-0.5">
            <div 
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 h-full rounded-full transition-all duration-700" 
              style={{ width: `${levelInfo.percentage}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Grid of Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Study Streak */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-orange-400 text-xs font-bold uppercase">
            <Flame className="w-4 h-4 fill-orange-500" />
            <span>Study Streak</span>
          </div>
          <div className="text-2xl font-extrabold text-white">{streak} Days 🔥</div>
          <p className="text-[10px] text-slate-400">Consecutive daily study targets met</p>
        </div>

        {/* Total Study Hours */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase">
            <Clock className="w-4 h-4" />
            <span>Total Study Hours</span>
          </div>
          <div className="text-2xl font-extrabold text-white">{totalStudyHours} Hours ⏱️</div>
          <p className="text-[10px] text-slate-400">Logged across study sessions</p>
        </div>

        {/* Sessions Completed */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase">
            <CheckCircle2 className="w-4 h-4" />
            <span>Sessions Completed</span>
          </div>
          <div className="text-2xl font-extrabold text-white">{completedSessions.length} Sessions ✅</div>
          <p className="text-[10px] text-slate-400">Deep study slots finished</p>
        </div>

        {/* PYQs Solved */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase">
            <BookOpen className="w-4 h-4" />
            <span>PYQs Solved</span>
          </div>
          <div className="text-2xl font-extrabold text-white">~{pyqsSolved} PYQs 📝</div>
          <p className="text-[10px] text-slate-400">Estimated questions solved</p>
        </div>

        {/* Mock Tests Completed */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-bold uppercase">
            <TestTube className="w-4 h-4" />
            <span>Mock Tests Completed</span>
          </div>
          <div className="text-2xl font-extrabold text-white">{mockTests.length} Tests 🧪</div>
          <p className="text-[10px] text-slate-400">3-Hour full mock simulations</p>
        </div>

        {/* Average Mock Score */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase">
            <Target className="w-4 h-4" />
            <span>Average Mock Score</span>
          </div>
          <div className="text-2xl font-extrabold text-white">{mockAvg} / 300 🎯</div>
          <p className="text-[10px] text-slate-400">Across all Saturday mock tests</p>
        </div>

        {/* Mistake Notebook Count */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-red-400 text-xs font-bold uppercase">
            <Zap className="w-4 h-4" />
            <span>Mistakes Documented</span>
          </div>
          <div className="text-2xl font-extrabold text-white">{mistakes.length} Logged ❌</div>
          <p className="text-[10px] text-slate-400">Mistakes tagged & analyzed</p>
        </div>

        {/* Target JEE Score */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase">
            <Award className="w-4 h-4" />
            <span>Target JEE Score</span>
          </div>
          <div className="text-2xl font-extrabold text-white">240+ / 300 🏆</div>
          <p className="text-[10px] text-slate-400">Goal for JEE Main 2026</p>
        </div>

      </div>

    </div>
  );
}
