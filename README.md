# Kishore JEE Command Center 🚀

A personal, premium, responsive JEE Main preparation timetable, reminder, and progress-tracking web application for **Kishore**.

## Features

- 🏠 **Home Dashboard**: Real-time clock, personalized greeting based on time of day, active streak, XP points & level badge, and daily completion percentage.
- ⚡ **Current Session Card**: Automatically determines what Kishore needs to study right now based on wall clock time (e.g., 5:30 AM -> Deep Study Session 1), live countdown timer, and quick action buttons (`START`, `PAUSE`, `COMPLETE`, `FOCUS MODE`).
- ⏰ **Smart 5:00 AM – 11:00 PM Timetable**: Complete routine with active slot highlighting, subtask checklists, and custom task creation.
- 📚 **Day-Wise Subject Rotation Engine**: Automatic day-of-week subject assignment (Monday through Sunday focus subjects & PYQ targets).
- ⏱️ **Study Timer & Focus Mode**: Countdown, stopwatch, and Pomodoro mode (50m study / 10m break), plus a distraction-free Fullscreen Focus overlay with ambient sound options.
- 🧪 **Saturday Mock Test Hub**: 3-hour mock test timer, score entry for Physics/Chemistry/Maths, automatic calculation of accuracy %, total score, improvement rate, and interactive trend charts.
- ❌ **Kishore's Mistake Notebook**: Categorized error tracking (Concept, Calculation, Silly, Time Management, Formula) with takeaway logs.
- 📊 **Gamification & Progress Dashboard**: XP points, levels (Starter -> JEE Legend), streak tracking, and study hour statistics.
- 🌙 **Smart Daily Summary & Tomorrow Planner**: End-of-day review modal ("Good Night, Kishore") with daily accomplishments and "Plan Tomorrow" feature.
- 📱 **Responsive UI & Data Persistence**: Modern glassmorphic dark/light UI, responsive sidebar for desktop, mobile bottom navigation, and full offline `localStorage` auto-sync.

## Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS**
- **Lucide React**
- **Chart.js** & **react-chartjs-2**
- **Canvas Confetti**
- **Web Audio API** & **Web Notifications API**

## Getting Started

1. Clone the repository:
   ```bash
   git clone git@github.com:hariharanmct06/Kishore-Timetable.git
   cd Kishore-Timetable
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```
