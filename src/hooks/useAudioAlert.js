// Web Audio API Synthesizer Chimes for Audio Notifications

export function useAudioAlert() {
  const playChime = (type = 'start') => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'start') {
        // High ascending double chime (Study Start)
        playNote(ctx, 523.25, 0, 0.15); // C5
        playNote(ctx, 659.25, 0.15, 0.15); // E5
        playNote(ctx, 783.99, 0.3, 0.4); // G5
      } else if (type === 'complete') {
        // Joyful victory triad chime (Session Complete / Level Up)
        playNote(ctx, 587.33, 0, 0.15); // D5
        playNote(ctx, 739.99, 0.15, 0.15); // F#5
        playNote(ctx, 880.00, 0.3, 0.15); // A5
        playNote(ctx, 1174.66, 0.45, 0.5); // D6
      } else if (type === 'warning') {
        // Soft double pulsing tone (5 min warning)
        playNote(ctx, 440, 0, 0.2); // A4
        playNote(ctx, 440, 0.25, 0.2); // A4
      } else if (type === 'break') {
        // Gentle descending tone (Break time)
        playNote(ctx, 659.25, 0, 0.2); // E5
        playNote(ctx, 523.25, 0.2, 0.4); // C5
      }
    } catch (e) {
      console.warn("AudioContext error:", e);
    }
  };

  return { playChime };
}

function playNote(ctx, frequency, startTime, duration) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(frequency, ctx.currentTime + startTime);

  gain.gain.setValueAtTime(0.001, ctx.currentTime + startTime);
  gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + startTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime + startTime);
  osc.stop(ctx.currentTime + startTime + duration);
}
