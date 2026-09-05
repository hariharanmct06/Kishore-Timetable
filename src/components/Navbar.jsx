import React from 'react';
import { 
  Zap, 
  Moon, 
  Sun, 
  Settings as SettingsIcon, 
  Trophy, 
  Home, 
  Calendar, 
  Timer, 
  TrendingUp,
  Flame,
  MoreHorizontal
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
    setShowDailySummary
  } = useApp();

  const mobileNavItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'timetable', label: 'Plan', icon: Calendar },
    { id: 'timer', label: 'Focus', icon: Timer },
    { id: 'analytics', label: 'Progress', icon: TrendingUp },
    { id: 'settings', label: 'More', icon: MoreHorizontal, isAction: true },
  ];

  return (
    <>
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-30 w-full backdrop-blur-lg bg-slate-950/85 border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent leading-tight">
                Kishore JEE
              </h1>
              <p className="text-[9px] sm:text-[10px] text-slate-400 tracking-wider font-semibold uppercase">Command Center OS</p>
            </div>
          </div>

          {/* Level & XP Quick Badge (Desktop/Tablet) */}
          <div className="hidden sm:flex items-center space-x-3 bg-slate-900/90 border border-slate-800 rounded-full px-3.5 py-1.5 text-xs">
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
            
            {/* Streak Counter */}
            <div className="flex items-center space-x-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 px-2.5 py-1 rounded-full text-xs font-bold">
              <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              <span>{streak}d</span>
            </div>

            {/* Daily Summary Button (Desktop) */}
            <button
              onClick={() => setShowDailySummary(true)}
              className="hidden sm:flex p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition border border-slate-800 text-xs items-center space-x-1.5 min-h-[38px]"
              title="Good Night Summary"
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-medium">Night Summary</span>
            </button>

            {/* Dark / Light Theme Toggle */}
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

            {/* Settings Modal Button (Desktop) */}
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

      {/* Mobile Fixed Bottom Navigation Bar (5 Items Only) */}
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
