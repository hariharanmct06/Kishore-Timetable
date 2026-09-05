import { useState, useEffect } from 'react';
import { evaluateCurrentSession } from '../utils/timeEngine';
import { EXACT_DAILY_SLOTS } from '../data/timeSchedule';

export function useTimeEngine() {
  const [timeState, setTimeState] = useState(() => evaluateCurrentSession(EXACT_DAILY_SLOTS));

  useEffect(() => {
    const tick = () => {
      setTimeState(evaluateCurrentSession(EXACT_DAILY_SLOTS, new Date()));
    };

    // Update every second
    const interval = setInterval(tick, 1000);

    // Re-evaluate immediately when tab gains focus, wakes from sleep, or becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        tick();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', tick);

    return () => {
      clearInterval(interval);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', tick);
    };
  }, []);

  return timeState;
}
