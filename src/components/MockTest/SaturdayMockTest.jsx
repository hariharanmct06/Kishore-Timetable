import React, { useState } from 'react';
import { TestTube, Trophy, Play, Pause, CheckCircle2, TrendingUp, Clock, Plus, Award, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTimer } from '../../hooks/useTimer';
import { formatSecondsToHHMMSS } from '../../utils/timeUtils';
import { MockTestChart } from './MockTestChart';

export function SaturdayMockTest() {
  const { mockTests, addMockTest } = useApp();

  // 3-hour timer (10,800 seconds)
  const { timeLeft, isRunning, startTimer, pauseTimer, resetTimer } = useTimer(10800);

  const [formData, setFormData] = useState({
    testName: '',
    physicsScore: 75,
    chemistryScore: 80,
    mathsScore: 65,
    questionsAttempted: 65,
    correct: 55,
    incorrect: 10,
    notes: ''
  });

  const [showLogForm, setShowLogForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMockTest(formData);
    setShowLogForm(false);
  };

  // Latest mock test stats
  const latestTest = mockTests[mockTests.length - 1];
  const previousTest = mockTests[mockTests.length - 2];
  
  let scoreImprovement = 0;
  if (latestTest && previousTest) {
    scoreImprovement = latestTest.totalScore - previousTest.totalScore;
  }

  const avgScore = mockTests.length > 0
    ? Math.round(mockTests.reduce((acc, t) => acc + t.totalScore, 0) / mockTests.length)
    : 0;

  return (
    <div className="space-y-6">
      
      {/* Saturday Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 border border-purple-500/40 p-6 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div>
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-1">
              <TestTube className="w-4 h-4" />
              <span>Saturday Special Simulation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">FULL JEE MAIN MOCK TEST</h2>
            <p className="text-xs text-purple-200 mt-1 max-w-lg">
              Simulate true exam pressure with 75 questions across Physics, Chemistry, and Maths. Master speed, accuracy, and time allocation.
            </p>
          </div>

          {/* 3-Hour Mock Timer */}
          <div className="bg-slate-950/80 border border-purple-500/30 p-4 rounded-2xl flex flex-col items-center justify-center shrink-0">
            <div className="text-[10px] text-purple-300 uppercase font-bold tracking-wider mb-1">3-Hour Exam Timer</div>
            <div className="font-mono text-3xl font-extrabold text-purple-200">
              ⏱️ {formatSecondsToHHMMSS(timeLeft)}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              {!isRunning ? (
                <button
                  onClick={startTimer}
                  className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center space-x-1"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Start Test</span>
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition flex items-center space-x-1"
                >
                  <Pause className="w-3.5 h-3.5 fill-white" />
                  <span>Pause</span>
                </button>
              )}
              <button
                onClick={() => resetTimer(10800)}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
              >
                Reset
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mock Stats Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs text-slate-400 font-medium">Completed Mocks</div>
          <div className="text-xl font-extrabold text-white mt-1">{mockTests.length} Tests</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs text-slate-400 font-medium">Average Score</div>
          <div className="text-xl font-extrabold text-indigo-400 mt-1">{avgScore} / 300</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs text-slate-400 font-medium">Latest Test Score</div>
          <div className="text-xl font-extrabold text-emerald-400 mt-1">
            {latestTest ? `${latestTest.totalScore} / 300` : 'N/A'}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs text-slate-400 font-medium">Latest Accuracy</div>
          <div className="text-xl font-extrabold text-cyan-400 mt-1">
            {latestTest ? `${latestTest.accuracy}%` : 'N/A'}
          </div>
        </div>

      </div>

      {/* Mock Score Trend Chart */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Mock Test Performance Progression</h3>
          </div>
          <button
            onClick={() => setShowLogForm(!showLogForm)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Log Mock Test Score</span>
          </button>
        </div>

        <MockTestChart mockTests={mockTests} />
      </div>

      {/* Mock Test Log Entry Form */}
      {showLogForm && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-indigo-500/40 p-6 rounded-3xl space-y-4 animate-fadeIn">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Saturday Mock Test Analysis Entry</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Physics Score (Out of 100)</label>
              <input
                type="number"
                name="physicsScore"
                min="0"
                max="100"
                value={formData.physicsScore}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Chemistry Score (Out of 100)</label>
              <input
                type="number"
                name="chemistryScore"
                min="0"
                max="100"
                value={formData.chemistryScore}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Maths Score (Out of 100)</label>
              <input
                type="number"
                name="mathsScore"
                min="0"
                max="100"
                value={formData.mathsScore}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Questions Attempted</label>
              <input
                type="number"
                name="questionsAttempted"
                min="0"
                max="75"
                value={formData.questionsAttempted}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Correct Questions</label>
              <input
                type="number"
                name="correct"
                min="0"
                max="75"
                value={formData.correct}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Incorrect Questions</label>
              <input
                type="number"
                name="incorrect"
                min="0"
                max="75"
                value={formData.incorrect}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Analysis & Takeaways Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="What went well? Which chapters caused silly mistakes?"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 h-20"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowLogForm(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg"
            >
              Save Mock Test Analysis
            </button>
          </div>
        </form>
      )}

      {/* Mock Test History Log Table */}
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-4">
        <h3 className="text-base font-bold text-white">Previous Mock Test Records</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
                <th className="py-3 px-3">Date & Test</th>
                <th className="py-3 px-3">Physics</th>
                <th className="py-3 px-3">Chemistry</th>
                <th className="py-3 px-3">Maths</th>
                <th className="py-3 px-3">Total Score</th>
                <th className="py-3 px-3">Accuracy</th>
                <th className="py-3 px-3">Attempted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {mockTests.slice().reverse().map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-semibold text-white">
                    {t.testName}
                    <div className="text-[10px] text-slate-400 font-normal">{t.date}</div>
                  </td>
                  <td className="py-3 px-3 text-blue-400 font-mono font-bold">{t.physicsScore} / 100</td>
                  <td className="py-3 px-3 text-emerald-400 font-mono font-bold">{t.chemistryScore} / 100</td>
                  <td className="py-3 px-3 text-amber-400 font-mono font-bold">{t.mathsScore} / 100</td>
                  <td className="py-3 px-3 text-indigo-300 font-mono font-bold text-sm">{t.totalScore} / 300</td>
                  <td className="py-3 px-3 text-cyan-300 font-mono font-bold">{t.accuracy}%</td>
                  <td className="py-3 px-3 font-mono">{t.questionsAttempted} / 75</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
