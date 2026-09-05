import React from 'react';
import { HeartPulse, Moon, Droplets, Sun, Activity } from 'lucide-react';

export function WellnessCard() {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-sm space-y-4">
      
      <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
        <HeartPulse className="w-4 h-4 text-emerald-400" />
        <span>Kishore's Peak Performance & Recovery</span>
      </div>

      <div className="flex items-start space-x-3 bg-indigo-950/30 border border-indigo-500/20 p-3.5 rounded-xl">
        <Moon className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-bold text-indigo-200">Optimal Sleep Recovery (6 Full Hours)</div>
          <p className="text-slate-300 leading-relaxed">
            Your schedule sets sleep at <span className="font-semibold text-white">11:00 PM</span> and wake-up at <span className="font-semibold text-white">5:00 AM</span>. Sleep is when your brain consolidates memory for formulas and concepts learned today. Avoid burning the midnight oil through exhaustion!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center space-x-2 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/40">
          <Droplets className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="text-slate-300 font-medium">Drink 3L Water Daily</span>
        </div>
        <div className="flex items-center space-x-2 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/40">
          <Activity className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-slate-300 font-medium">Stretching at 5:15 AM</span>
        </div>
      </div>

    </div>
  );
}
