import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Timer, 
  TestTube, 
  BookX, 
  TrendingUp, 
  CalendarDays,
  Settings as SettingsIcon,
  Award,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Sidebar({ onOpenSettings }) {
  const { activeTab, setActiveTab, levelInfo, todayStudyProgressPercentage } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Home Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'timetable', label: 'Smart Timetable', icon: Calendar, badge: '5AM-11PM' },
    { id: 'timer', label: 'Study Timer', icon: Timer, badge: 'Focus' },
    { id: 'mock', label: 'Saturday Mock Test', icon: TestTube, badge: 'Sat' },
    { id: 'mistakes', label: 'Mistake Notebook', icon: BookX, badge: 'Log' },
    { id: 'analytics', label: 'Progress Dashboard', icon: TrendingUp, badge: 'Stats' },
    { id: 'weekly', label: 'Weekly Plan', icon: CalendarDays, badge: '7-Days' },
  ];

  return (
    <aside className="hidden md:flex md:w-64 flex-col fixed left-0 top-16 bottom-0 z-20 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md border-r border-slate-800/80 p-4 justify-between">
      <div className="space-y-6">
        
        {/* Navigation Section Title */}
        <div>
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Navigation</p>
          <nav className="mt-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Level & Rank Widget */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/60 shadow-lg">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Current Rank</div>
              <div className="text-sm font-bold text-slate-100">{levelInfo.title}</div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>Progress to Lvl {levelInfo.level + 1}</span>
              <span className="font-mono text-amber-400 font-bold">{levelInfo.percentage}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${levelInfo.percentage}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Footer Settings Link */}
      <div className="pt-4 border-t border-slate-800/80">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition"
        >
          <SettingsIcon className="w-4 h-4 text-slate-400" />
          <span>System Settings</span>
        </button>
      </div>

    </aside>
  );
}
