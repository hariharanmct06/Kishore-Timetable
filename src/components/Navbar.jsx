import React from 'react';
import { 
  Zap, 
  Moon, 
  Sun, 
  Bell, 
  Settings as SettingsIcon, 
  Trophy, 
  LayoutDashboard, 
  Calendar, 
  Timer, 
  TestTube, 
  BookX, 
  TrendingUp,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Navbar({ onOpenSettings }) {
  const { 
    userProfile, 
    theme, 
    setTheme, 
    levelInfo, 
    streak, 
    activeTab, 
    setActiveTab, 
    setShowDailySummary,
    todayStudyProgressPercentage
  } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'timer', label: 'Study Timer', icon: Timer },
    { id: 'mock', label: 'Saturday Mock', icon: TestTube },
    { id: 'mistakes', label: 'Mistakes', icon: BookX },
    { id: 'analytics', label: 'Progress', icon: TrendingUp },
    { id: 'weekly', label: 'Weekly Plan', icon: Calendar },
  ];

  return (
    <>
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-slate-900/80 dark:bg-slate-950/80 border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Zap className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent leading-tight">
                Kishore JEE
              </h1>
              <p className="text-[10px] text-slate-400 tracking-wider font-semibold uppercase">Command Center OS</p>
            </div>
          </div>

          {/* Level & XP Quick Badge */}
          <div className="hidden sm:flex items-center space-x-4 bg-slate-800/60 dark:bg-slate-900/80 border border-slate-700/50 rounded-full px-4 py-1.5 text-xs">
            <div className="flex items-center space-x-1.5 text-amber-400 font-semibold">
              <Trophy className="w-4 h-4" />
              <span>Lvl {levelInfo.level}: {levelInfo.title}</span>
            </div>
            <div className="w-20 bg-slate-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full transition-all duration-500" 
                style={{ width: `${levelInfo.percentage}%` }} 
              />
            </div>
            <span className="text-slate-400 font-mono text-[11px]">{levelInfo.currentXP} XP</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Streak Counter */}
            <div className="flex items-center space-x-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 px-3 py-1 rounded-full text-xs font-bold">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span>{streak}d Streak</span>
            </div>

            {/* Daily Summary Button */}
            <button
              onClick={() => setShowDailySummary(true)}
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white transition border border-slate-700/50 text-xs flex items-center space-x-1"
              title="Good Night Daily Summary"
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              <span className="hidden lg:inline text-xs font-medium">Night Summary</span>
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white transition border border-slate-700/50"
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            {/* Settings Modal Button */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white transition border border-slate-700/50"
              title="Settings"
            >
              <SettingsIcon className="w-4 h-4 text-slate-400" />
            </button>

          </div>

        </div>
      </header>

      {/* Bottom Navigation Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 md:hidden">
        <div className="grid grid-cols-6 h-16">
          {navItems.slice(0, 6).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center space-y-1 transition ${
                  isActive ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] truncate max-w-[55px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
