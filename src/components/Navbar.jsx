import React from 'react';
import { 
  Zap, 
  Moon, 
  Sun, 
  Settings as SettingsIcon, 
  Trophy, 
  Home, 
  Calendar, 
  Target, 
  TrendingUp,
  Flame,
  MoreHorizontal,
  BookX,
  TestTube
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatClockTime, formatHeaderDate } from '../utils/timeEngine';

export function Navbar({ onOpenSettings }) {
  const { 
    timeState, 
    theme, 
    setTheme, 
    levelInfo, 
    streak, 
    activeTab, 
    setActiveTab, 
    setShowDailySummary
  } = useApp();

  const mobileNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'plan', label: 'Plan', icon: Calendar },
    { id: 'focus', label: 'Focus', icon: Target },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'more', label: 'More', icon: MoreHorizontal, isAction: true },
  ];

  const desktopMenuItems = [
    { id: 'home', label: 'Home Dashboard', icon: Home },
    { id: 'plan', label: 'Daily Timetable', icon: Calendar },
    { id: 'focus', label: 'Focus Study Mode', icon: Target },
    { id: 'mock', label: 'Saturday Mock Test', icon: TestTube },
    { id: 'mistakes', label: 'Mistake Notebook', icon: BookX },
    { id: 'progress', label: 'Progress Dashboard', icon: TrendingUp },
  ];

  return (
    <>
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent leading-tight">
                KISHORE JEE
              </h1>
              <p className="text-[9px] sm:text-[10px] text-slate-400 tracking-wider font-semibold uppercase">Command Center OS</p>
            </div>
          </div>

          {/* Live System Clock & Date (Desktop/Tablet) */}
          <div className="hidden md:flex items-center space-x-3 bg-slate-900/90 border border-slate-800 rounded-full px-4 py-1.5 text-xs">
            <span className="text-slate-400 font-medium">{formatHeaderDate(timeState.now)}</span>
            <span className="text-slate-600">•</span>
            <span className="font-mono text-indigo-300 font-bold text-sm tracking-wider">
              {formatClockTime(timeState.now)}
            </span>
          </div>

          {/* Level & XP Quick Badge (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3 bg-slate-900/90 border border-slate-800 rounded-full px-3.5 py-1.5 text-xs">
            <div className="flex items-center space-x-1.5 text-amber-400 font-semibold">
              <Trophy className="w-3.5 h-3.5" />
              <span>Lvl {levelInfo.level}: {levelInfo.title}</span>
            </div>
            <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full transition-all duration-500" 
                style={{ width: `${levelInfo.percentage}%` }} 
              />
            </div>
            <span className="text-slate-400 font-mono text-[11px]">{levelInfo.currentXP} XP</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            
            {/* Streak Pill */}
            <div className="flex items-center space-x-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 px-2.5 py-1 rounded-full text-xs font-bold">
              <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              <span>{streak}d</span>
            </div>

            {/* Night Summary Button */}
            <button
              onClick={() => setShowDailySummary(true)}
              className="hidden sm:flex p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition border border-slate-800 text-xs items-center space-x-1.5 min-h-[38px]"
              title="Good Night Summary"
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-medium">Night Summary</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition border border-slate-800 min-h-[38px] min-w-[38px] flex items-center justify-center"
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            {/* Settings Button (Desktop) */}
            <button
              onClick={onOpenSettings}
              className="hidden sm:flex p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition border border-slate-800 min-h-[38px] min-w-[38px] items-center justify-center"
              title="Settings"
            >
              <SettingsIcon className="w-4 h-4 text-slate-400" />
            </button>

          </div>

        </div>
      </header>

      {/* Desktop Side Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col fixed left-0 top-16 bottom-0 z-20 bg-slate-950/80 backdrop-blur-md border-r border-slate-800/80 p-4 justify-between">
        <div className="space-y-6">
          <div>
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Navigation</p>
            <nav className="mt-3 space-y-1">
              {desktopMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-medium">Rank Level</div>
            <div className="text-sm font-bold text-white">{levelInfo.title}</div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-amber-400 h-full rounded-full transition-all" 
                style={{ width: `${levelInfo.percentage}%` }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={onOpenSettings}
          className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition"
        >
          <SettingsIcon className="w-4 h-4 text-slate-400" />
          <span>Settings</span>
        </button>
      </aside>

      {/* Mobile Fixed Bottom Navigation Bar (5 Main Items) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 md:hidden pb-safe">
        <div className="grid grid-cols-5 h-14 items-center max-w-md mx-auto">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isAction) {
                    onOpenSettings();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`flex flex-col items-center justify-center space-y-0.5 py-1 transition-all min-h-[48px] ${
                  isActive ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`p-1 rounded-xl transition ${isActive ? 'bg-blue-500/15 text-blue-400' : ''}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                </div>
                <span className="text-[10px] tracking-tight truncate font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
