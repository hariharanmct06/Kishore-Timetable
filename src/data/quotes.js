// Daily Motivational Quotes for Kishore's JEE Journey

export const MOTIVATIONAL_QUOTES = [
  {
    quote: "Small progress every day becomes a great result.",
    author: "JEE Wisdom"
  },
  {
    quote: "Kishore, your competition is yesterday's version of you.",
    author: "Personal Reminder"
  },
  {
    quote: "Don't count the hours. Make the hours count.",
    author: "Muhammad Ali"
  },
  {
    quote: "One more question. One more concept. One step closer.",
    author: "Kishore's Target"
  },
  {
    quote: "Consistency is what transforms average into excellence.",
    author: "JEE Command Center"
  },
  {
    quote: "Physics requires clarity, Chemistry requires retention, Maths requires problem speed. Master all three.",
    author: "JEE Main Blueprint"
  },
  {
    quote: "Mistakes are proof that you are trying. Tag them, analyze them, and never repeat them.",
    author: "Mistake Notebook Protocol"
  },
  {
    quote: "Success in JEE is 10% talent, 90% relentless practice and discipline.",
    author: "Top Rankers Principle"
  },
  {
    quote: "Wake up with determination, go to sleep at 11 PM with satisfaction.",
    author: "Kishore 5 AM Routine"
  },
  {
    quote: "Focus on the process, and the rank will take care of itself.",
    author: "Mindset Master"
  }
];

export function getRandomQuote() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  return MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length];
}
