import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HeaderStats } from './components/Dashboard/HeaderStats';
import { CurrentSession } from './components/Dashboard/CurrentSession';
import { QuoteCard } from './components/Dashboard/QuoteCard';
import { WellnessCard } from './components/Dashboard/WellnessCard';
import { TimetableList } from './components/Timetable/TimetableList';
import { StudyTimer } from './components/Timer/StudyTimer';
import { FocusMode } from './components/Timer/FocusMode';
import { TaskTracker } from './components/Tasks/TaskTracker';
import { SaturdayMockTest } from './components/MockTest/SaturdayMockTest';
import { MistakeNotebook } from './components/MistakeNotebook/MistakeNotebook';
import { ProgressDashboard } from './components/Analytics/ProgressDashboard';
import { WeeklyCalendar } from './components/Weekly/WeeklyCalendar';
import { DailySummaryModal } from './components/Summary/DailySummaryModal';
import { SettingsModal } from './components/Settings/SettingsModal';

function MainContent() {
  const { activeTab, focusMode } = useApp();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white pb-20 md:pb-12">
      
      {/* Navigation Header */}
      <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* Main Layout Container */}
      <div className="flex">
        
        {/* Desktop Sidebar Navigation */}
        <Sidebar onOpenSettings={() => setIsSettingsOpen(true)} />

        {/* Page Content Body */}
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              <HeaderStats />
              <CurrentSession />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <QuoteCard />
                <WellnessCard />
              </div>

              <TaskTracker />
            </div>
          )}

          {activeTab === 'timetable' && (
            <div className="animate-fadeIn">
              <TimetableList />
            </div>
          )}

          {activeTab === 'timer' && (
            <div className="animate-fadeIn">
              <StudyTimer />
            </div>
          )}

          {activeTab === 'mock' && (
            <div className="animate-fadeIn">
              <SaturdayMockTest />
            </div>
          )}

          {activeTab === 'mistakes' && (
            <div className="animate-fadeIn">
              <MistakeNotebook />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="animate-fadeIn">
              <ProgressDashboard />
            </div>
          )}

          {activeTab === 'weekly' && (
            <div className="animate-fadeIn">
              <WeeklyCalendar />
            </div>
          )}

        </main>
      </div>

      {/* Fullscreen Distraction-Free Focus Overlay */}
      {focusMode && <FocusMode />}

      {/* End-of-Day Summary Modal */}
      <DailySummaryModal />

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
