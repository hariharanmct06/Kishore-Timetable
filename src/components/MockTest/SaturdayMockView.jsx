import React, { useState } from 'react';
import { TestTube, Trophy, Play, Pause, TrendingUp, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatSecondsToHHMMSS } from '../../utils/timeEngine';
import { MockTestChart } from './MockTestChart';

export function SaturdayMockView() {
  const { mockTests, addMockTest } = useApp();

  const [mockTimerLeft, setMockTimerLeft] = useState(10800); // 3 Hours
  const [isRunning, setIsRunning] = useState(false);

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

  const latestTest = mockTests[mockTests.length - 1];

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-slate-900 border border-purple-500/40 p-5 rounded-3xl backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
            <TestTube className="w-4 h-4" />
            <span>SATURDAY MOCK MODE</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
            3 Hours Simulation
          </span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">FULL JEE MAIN MOCK TEST</h2>
          <p className="text-xs text-purple-200 mt-0.5">Physics • Chemistry • Maths</p>
        </div>

        <div className="py-3 text-center bg-slate-950/80 rounded-2xl border border-purple-500/30">
          <div className="text-[10px] text-purple-300 uppercase font-bold tracking-wider mb-0.5">3-Hour Exam Timer</div>
          <div className="font-mono text-3xl sm:text-4xl font-extrabold text-purple-200">
            ⏱️ {formatSecondsToHHMMSS(mockTimerLeft)}
          </div>
          <div className="flex items-center justify-center space-x-2 mt-2">
            {!isRunning ? (
              <button
                onClick={() => setIsRunning(true)}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold transition flex items-center space-x-1 min-h-[38px]"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Start Mock Test</span>
              </button>
            ) : (
              <button
                onClick={() => setIsRunning(false)}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold transition flex items-center space-x-1 min-h-[38px]"
              >
                <Pause className="w-3.5 h-3.5 fill-white" />
                <span>Pause</span>
              </button>
            )}
            <button
              onClick={() => setMockTimerLeft(10800)}
              className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs transition min-h-[38px]"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {latestTest && (
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Latest Test Score</span>
            <span className="text-[10px] text-slate-400 font-mono">{latestTest.date}</span>
          </div>

          <div className="text-center py-2">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Your Total Score</div>
            <div className="text-3xl font-black text-emerald-400 mt-0.5">{latestTest.totalScore} / 300</div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex justify-between">
              <span className="text-slate-400 font-medium">Accuracy</span>
              <span className="font-bold text-cyan-300">{latestTest.accuracy}%</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex justify-between">
              <span className="text-slate-400 font-medium">Correct</span>
              <span className="font-bold text-emerald-400">{latestTest.correct}</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex justify-between">
              <span className="text-slate-400 font-medium">Incorrect</span>
              <span className="font-bold text-red-400">{latestTest.incorrect}</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex justify-between">
              <span className="text-slate-400 font-medium">Unattempted</span>
              <span className="font-bold text-amber-400">{latestTest.unattempted}</span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span>Score History</span>
          </h3>
          <button
            onClick={() => setShowLogForm(!showLogForm)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center space-x-1.5 min-h-[38px]"
          >
            <Plus className="w-4 h-4" />
            <span>Log Test Score</span>
          </button>
        </div>

        <div className="overflow-x-auto no-scrollbar pt-2">
          <div className="min-w-[320px]">
            <MockTestChart mockTests={mockTests} />
          </div>
        </div>
      </div>

      {showLogForm && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-indigo-500/40 p-5 rounded-3xl space-y-3 text-xs animate-fadeIn">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Log Mock Test Score</span>
          </h3>

          <div className="space-y-2">
            <div>
              <label className="text-slate-400 block mb-1">Physics Score (Out of 100)</label>
              <input
                type="number"
                name="physicsScore"
                min="0"
                max="100"
                value={formData.physicsScore}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                required
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Chemistry Score (Out of 100)</label>
              <input
                type="number"
                name="chemistryScore"
                min="0"
                max="100"
                value={formData.chemistryScore}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                required
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Maths Score (Out of 100)</label>
              <input
                type="number"
                name="mathsScore"
                min="0"
                max="100"
                value={formData.mathsScore}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 block mb-0.5">Attempted</label>
              <input
                type="number"
                name="questionsAttempted"
                min="0"
                max="75"
                value={formData.questionsAttempted}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-1.5 text-white"
                required
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-0.5">Correct</label>
              <input
                type="number"
                name="correct"
                min="0"
                max="75"
                value={formData.correct}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-1.5 text-white"
                required
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-0.5">Incorrect</label>
              <input
                type="number"
                name="incorrect"
                min="0"
                max="75"
                value={formData.incorrect}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-1.5 text-white"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setShowLogForm(false)}
              className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold"
            >
              Save Analysis
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
