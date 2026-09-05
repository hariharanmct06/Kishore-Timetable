import { useState, useEffect, useRef } from 'react';
import { useAudioAlert } from './useAudioAlert';
import { useNotifications } from './useNotifications';

export function useTimer(initialSeconds = 7200, onComplete = () => {}) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(false);
  const [pomodoroState, setPomodoroState] = useState('work'); // 'work' | 'break'

  const { playChime } = useAudioAlert();
  const { sendNotification } = useNotifications();
  const hasWarnedRef = useRef(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          // 5 minute warning chime (300s remaining)
          if (prev === 300 && !hasWarnedRef.current) {
            hasWarnedRef.current = true;
            playChime('warning');
            sendNotification("⚡ 5 minutes left!", "Finish strong, Kishore! Almost done with this session.");
          }
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            playChime('complete');
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, playChime, sendNotification, onComplete]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = (newSeconds = initialSeconds) => {
    setIsRunning(false);
    setTimeLeft(newSeconds);
    hasWarnedRef.current = false;
  };

  const setDuration = (seconds) => {
    setTimeLeft(seconds);
    hasWarnedRef.current = false;
  };

  return {
    timeLeft,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    setDuration,
    isPomodoro,
    setIsPomodoro,
    pomodoroState,
    setPomodoroState
  };
}
