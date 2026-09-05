// Time Calculation Helpers for Kishore JEE Command Center

export function parseTimeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

export function getCurrentTimeMinutes(date = new Date()) {
  return date.getHours() * 60 + date.getMinutes();
}

export function getCurrentTimeSeconds(date = new Date()) {
  return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}

export function formatTime24To12(timeStr) {
  if (!timeStr) return "";
  const [hStr, mStr] = timeStr.split(":");
  let hours = parseInt(hStr, 10);
  const minutes = mStr;
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // hour '0' is '12'
  return `${hours}:${minutes} ${ampm}`;
}

export function formatSecondsToHHMMSS(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00:00";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const pad = (num) => String(num).padStart(2, "0");
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

export function formatSecondsToMMSS(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  const pad = (num) => String(num).padStart(2, "0");
  return `${pad(mins)}:${pad(secs)}`;
}

export function getGreeting(date = new Date()) {
  const hour = date.getHours();
  if (hour >= 4 && hour < 12) {
    return "Good Morning, Kishore 👋";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon, Kishore 👋";
  } else if (hour >= 17 && hour < 22) {
    return "Good Evening, Kishore 👋";
  } else {
    return "Time to Wind Down, Kishore 🌙";
  }
}

export function formatDateHeader(date = new Date()) {
  const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Finds current active slot and next upcoming slot from slots list based on current time
 */
export function findActiveAndNextSlot(slots, now = new Date()) {
  const currentMins = getCurrentTimeMinutes(now);
  const currentSecs = getCurrentTimeSeconds(now);

  let activeSlot = null;
  let nextSlot = null;
  let remainingSecondsInActive = 0;

  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const startMins = parseTimeToMinutes(slot.startTime);
    let endMins = parseTimeToMinutes(slot.endTime);

    // Handle overnight sleep slot (23:00 to 05:00)
    if (endMins < startMins) {
      if (currentMins >= startMins || currentMins < endMins) {
        activeSlot = slot;
        let endSecs = endMins * 60;
        if (currentMins >= startMins) {
          endSecs += 24 * 3600;
        }
        remainingSecondsInActive = endSecs - currentSecs;
        nextSlot = slots[(i + 1) % slots.length];
        break;
      }
    } else {
      if (currentMins >= startMins && currentMins < endMins) {
        activeSlot = slot;
        const endSecs = endMins * 60;
        remainingSecondsInActive = endSecs - currentSecs;
        nextSlot = slots[(i + 1) % slots.length];
        break;
      }
    }
  }

  // If no slot is strictly active (e.g. gap), find next upcoming slot
  if (!activeSlot) {
    for (let i = 0; i < slots.length; i++) {
      const startMins = parseTimeToMinutes(slots[i].startTime);
      if (startMins > currentMins) {
        nextSlot = slots[i];
        activeSlot = slots[i === 0 ? slots.length - 1 : i - 1]; // previous slot just ended
        break;
      }
    }
    if (!nextSlot) {
      nextSlot = slots[0]; // wraps around to 5:00 AM wake up
      activeSlot = slots[slots.length - 1];
    }
  }

  return {
    activeSlot,
    nextSlot,
    remainingSecondsInActive: Math.max(0, remainingSecondsInActive)
  };
}
