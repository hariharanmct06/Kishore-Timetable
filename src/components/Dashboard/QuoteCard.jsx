import React from 'react';
import { Quote, Sparkles } from 'lucide-react';
import { getRandomQuote } from '../../data/quotes';

export function QuoteCard() {
  const dailyQuote = getRandomQuote();

  return (
    <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-900 border border-indigo-500/30 p-5 rounded-2xl backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Daily Motivational Boost</span>
        </div>
        <Quote className="w-6 h-6 text-indigo-500/30" />
      </div>

      <blockquote className="text-sm sm:text-base font-medium italic text-slate-200 leading-relaxed mb-3">
        "{dailyQuote.quote}"
      </blockquote>

      <div className="text-right text-xs font-semibold text-indigo-300">
        — {dailyQuote.author}
      </div>
    </div>
  );
}
