// Ground-Up Timestamp-Driven Time Engine for Kishore JEE Command Center

import { EXACT_DAILY_SLOTS, DAY_SUBJECT_BLUEPRINT } from '../data/timeSchedule';

/**
 * Converts a time string "HH:MM:SS" into an exact Date timestamp object for a given reference date
 */
export function getTimestampForTimeString(timeStr, refDate = new Date()) {
  const [h, m, s] = timeStr.split(':').map(Number);
  const date = new Date(refDate);
  date.setHours(h, m, s || 0, 0);
  return date;
}

/**
 * Evaluates the current active schedule slot, next slot, remaining seconds, and elapsed percentage
 * strictly based on real system timestamps (Date.now())
 */
export function evaluateCurrentSession(slots = EXACT_DAILY_SLOTS, now = new Date()) {
  const nowMs = now.getTime();
  const todayDateStr = now.toISOString().split('T')[0];
  const dayOfWeek = now.getDay();
  const dayBlueprint = DAY_SUBJECT_BLUEPRINT[dayOfWeek];

  let activeSlot = null;
  let nextSlot = null;
  let remainingSeconds = 0;
  let totalSlotSeconds = 0;
  let elapsedSeconds = 0;

  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    let startTimestamp = getTimestampForTimeString(slot.startTime, now);
    let endTimestamp = getTimestampForTimeString(slot.endTime, now);

    // Handle overnight sleep slot (23:00:00 to 05:00:00)
    if (endTimestamp.getTime() < startTimestamp.getTime()) {
      if (now.getHours() < 5) {
        // We are past midnight in early morning (00:00 - 05:00)
        startTimestamp = new Date(startTimestamp.getTime() - 24 * 3600 * 1000);
      } else {
        // We are late night (23:00 - 23:59)
        endTimestamp = new Date(endTimestamp.getTime() + 24 * 3600 * 1000);
      }
    }

    const startMs = startTimestamp.getTime();
    const endMs = endTimestamp.getTime();

    if (nowMs >= startMs && nowMs < endMs) {
      activeSlot = {
        ...slot,
        startTimestamp,
        endTimestamp
      };
      remainingSeconds = Math.max(0, Math.floor((endMs - nowMs) / 1000));
      totalSlotSeconds = Math.floor((endMs - startMs) / 1000);
      elapsedSeconds = Math.max(0, Math.floor((nowMs - startMs) / 1000));
      nextSlot = slots[(i + 1) % slots.length];
      break;
    }
  }

  // Fallback if between slots or exact boundary
  if (!activeSlot) {
    for (let i = 0; i < slots.length; i++) {
      const startMs = getTimestampForTimeString(slots[i].startTime, now).getTime();
      if (startMs > nowMs) {
        nextSlot = slots[i];
        activeSlot = slots[i === 0 ? slots.length - 1 : i - 1];
        break;
      }
    }
    if (!nextSlot) {
      nextSlot = slots[0];
      activeSlot = slots[slots.length - 1];
    }
  }

  const progressPercent = totalSlotSeconds > 0
    ? Math.min(100, Math.round((elapsedSeconds / totalSlotSeconds) * 100))
    : 0;

  return {
    now,
    todayDateStr,
    dayOfWeek,
    dayBlueprint,
    activeSlot,
    nextSlot,
    remainingSeconds,
    totalSlotSeconds,
    elapsedSeconds,
    progressPercent
  };
}

/**
 * Formats seconds into HH:MM:SS string
 */
export function formatSecondsToHHMMSS(totalSeconds) {
  if (isNaN(totalSeconds) || totalSeconds < 0) return "00:00:00";
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);

  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

/**
 * Formats time as HH:MM:SS AM/PM (e.g. "05:43:27 AM")
 */
export function formatClockTime(date = new Date()) {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const hoursStr = String(hours).padStart(2, '0');
  return `${hoursStr}:${minutes}:${seconds} ${ampm}`;
}

/**
 * Formats 24h string "05:30:00" to 12h string "05:30 AM"
 */
export function formatTime24To12(timeStr) {
  if (!timeStr) return "";
  const [hStr, mStr] = timeStr.split(":");
  let hours = parseInt(hStr, 10);
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const hoursStr = String(hours).padStart(2, '0');
  return `${hoursStr}:${mStr} ${ampm}`;
}

/**
 * Formats Date to "Saturday, September 5"
 */
export function formatHeaderDate(date = new Date()) {
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
