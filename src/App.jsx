import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { CurrentActivityCard } from './components/Home/CurrentActivityCard';
import { ProgressSummaryCard } from './components/Home/ProgressSummaryCard';
import { QuickChecklistCard } from './components/Home/QuickChecklistCard';
import { VerticalTimeline } from './components/Plan/VerticalTimeline';
import { WeeklyDaySelector } from './components/Plan/WeeklyDaySelector';
import { FocusModeOverlay } from './components/Focus/FocusModeOverlay';
import { StudyTimerView } from './components/Focus/StudyTimerView';
import { SaturdayMockView } from './components/MockTest/SaturdayMockView';
import { MistakeNotebookView } from './components/Mistakes/MistakeNotebookView';
import { ProgressStatsView } from './components/Progress/ProgressStatsView';
import { DailySummaryModal } from './components/Summary/DailySummaryModal';
import { SettingsModalView } from './components/Settings/SettingsModalView';

function MainContent() {
  const { activeTab, focusMode } = useApp();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white pb-20 md:pb-12">
      <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />

      <div className="flex">
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
          
          {activeTab === 'home' && (
            <div className="space-y-6 animate-fadeIn">
              <CurrentActivityCard />
              <ProgressSummaryCard />
              <QuickChecklistCard />
            </div>
          )}

          {activeTab === 'plan' && (
            <div className="space-y-6 animate-fadeIn">
              <WeeklyDaySelector />
              <VerticalTimeline />
            </div>
          )}

          {activeTab === 'focus' && (
            <div className="animate-fadeIn">
              <StudyTimerView />
            </div>
          )}

          {activeTab === 'mock' && (
            <div className="animate-fadeIn">
              <SaturdayMockView />
            </div>
          )}

          {activeTab === 'mistakes' && (
            <div className="animate-fadeIn">
              <MistakeNotebookView />
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="animate-fadeIn">
              <ProgressStatsView />
            </div>
          )}

        </main>
      </div>

      {focusMode && <FocusModeOverlay />}
      <DailySummaryModal />
      <SettingsModalView isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
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
