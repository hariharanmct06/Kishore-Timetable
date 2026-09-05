// Kishore's Ground-Up Time Schedule & Day Subject Blueprint

export const EXACT_DAILY_SLOTS = [
  {
    id: "slot-01",
    startTime: "05:00:00",
    endTime: "05:15:00",
    title: "Wake Up",
    type: "routine",
    category: "Morning Routine",
    description: "Wake up at 5:00 AM sharp, drink warm water, and freshen up.",
    icon: "Sun",
    defaultTasks: ["Drink 500ml warm water", "Freshen up", "Light morning stretch"]
  },
  {
    id: "slot-02",
    startTime: "05:15:00",
    endTime: "05:30:00",
    title: "Stretching / Breathing",
    type: "wellness",
    category: "Mind & Body Reset",
    description: "Light physical stretching, pranayama, and mental prep.",
    icon: "Activity",
    defaultTasks: ["10 min body stretch", "5 min deep breathing", "Set daily study mindset"]
  },
  {
    id: "slot-03",
    startTime: "05:30:00",
    endTime: "07:30:00",
    title: "Deep Study Session 1",
    type: "study",
    category: "Deep Study",
    sessionIndex: 1,
    durationMinutes: 120,
    icon: "BookOpen",
    defaultTasks: ["Learn key concepts", "Solve textbook examples", "Solve 20 PYQs", "Review mistakes"]
  },
  {
    id: "slot-04",
    startTime: "07:30:00",
    endTime: "08:15:00",
    title: "Breakfast + Break",
    type: "break",
    category: "Meal Break",
    description: "Healthy breakfast, hydration, and eye relaxation.",
    icon: "Coffee",
    defaultTasks: ["Nutritious breakfast", "Hydrate (500ml)", "Rest eyes from screens"]
  },
  {
    id: "slot-05",
    startTime: "08:15:00",
    endTime: "10:15:00",
    title: "Deep Study Session 2",
    type: "study",
    category: "Deep Study",
    sessionIndex: 2,
    durationMinutes: 120,
    icon: "BookOpen",
    defaultTasks: ["Review chapter theory", "Solve 25 practice problems", "Solve 20 PYQs", "Mark weak concepts"]
  },
  {
    id: "slot-06",
    startTime: "10:15:00",
    endTime: "10:45:00",
    title: "Break",
    type: "break",
    category: "Short Break",
    description: "Walk around, stretch legs, hydrate.",
    icon: "Smile",
    defaultTasks: ["Short walk", "Hydrate", "Relax mind"]
  },
  {
    id: "slot-07",
    startTime: "10:45:00",
    endTime: "12:45:00",
    title: "Deep Study Session 3",
    type: "study",
    category: "Deep Study",
    sessionIndex: 3,
    durationMinutes: 120,
    icon: "BookOpen",
    defaultTasks: ["Concept deep dive", "Solve previous year questions", "Check accuracy rate", "Note tricky formulas"]
  },
  {
    id: "slot-08",
    startTime: "12:45:00",
    endTime: "13:45:00",
    title: "Lunch + Rest",
    type: "break",
    category: "Meal Break",
    description: "Wholesome lunch and light relaxation.",
    icon: "Utensils",
    defaultTasks: ["Healthy lunch", "Relax mind", "Stay away from screens"]
  },
  {
    id: "slot-09",
    startTime: "13:45:00",
    endTime: "14:30:00",
    title: "Power Nap / Relaxation",
    type: "break",
    category: "Recovery",
    description: "20-30 min power nap to recharge mental energy.",
    icon: "Moon",
    defaultTasks: ["20-30 min power nap", "Deep muscle relaxation"]
  },
  {
    id: "slot-10",
    startTime: "14:30:00",
    endTime: "16:30:00",
    title: "Study Session 4",
    type: "study",
    category: "Problem Solving",
    sessionIndex: 4,
    durationMinutes: 120,
    icon: "Target",
    defaultTasks: ["Solve targeted exercise set", "30 Qs speed drill", "Review incorrect answers", "Log to mistake notebook"]
  },
  {
    id: "slot-11",
    startTime: "16:30:00",
    endTime: "17:00:00",
    title: "Snack + Walk",
    type: "break",
    category: "Short Break",
    description: "Evening snack, outdoor air, light walk.",
    icon: "Coffee",
    defaultTasks: ["Light snack & water", "15 min outdoor walk"]
  },
  {
    id: "slot-12",
    startTime: "17:00:00",
    endTime: "19:00:00",
    title: "Study Session 5 / PYQs",
    type: "study",
    category: "PYQ Masterclass",
    sessionIndex: 5,
    durationMinutes: 120,
    icon: "CheckCircle",
    defaultTasks: ["Solve 30 PYQs with timer", "Analyze time taken per question", "Categorize mistakes", "Update progress metrics"]
  },
  {
    id: "slot-13",
    startTime: "19:00:00",
    endTime: "20:00:00",
    title: "Exercise + Bath + Dinner",
    type: "routine",
    category: "Evening Routine",
    description: "Physical workout, warm shower, and dinner.",
    icon: "Dumbbell",
    defaultTasks: ["30 min exercise", "Warm bath", "Healthy dinner"]
  },
  {
    id: "slot-14",
    startTime: "20:00:00",
    endTime: "21:30:00",
    title: "Revision + Practice",
    type: "study",
    category: "Revision",
    sessionIndex: 6,
    durationMinutes: 90,
    icon: "RotateCcw",
    defaultTasks: ["Revise today's key notes", "Active recall key definitions", "Solve 15 revision problems"]
  },
  {
    id: "slot-15",
    startTime: "21:30:00",
    endTime: "22:00:00",
    title: "Break",
    type: "break",
    category: "Short Break",
    description: "Unwind, calm music, hydrate.",
    icon: "Music",
    defaultTasks: ["Listen to relaxing music", "Hydrate"]
  },
  {
    id: "slot-16",
    startTime: "22:00:00",
    endTime: "22:40:00",
    title: "Formula Revision + Mistake Notebook",
    type: "study",
    category: "Formula Mastery",
    sessionIndex: 7,
    durationMinutes: 40,
    icon: "Zap",
    defaultTasks: ["Review short notes & formula sheet", "Read Mistake Notebook entries", "Memorize critical constants"]
  },
  {
    id: "slot-17",
    startTime: "22:40:00",
    endTime: "23:00:00",
    title: "Plan Tomorrow + Wind Down",
    type: "routine",
    category: "Planning & Prep",
    description: "Set tomorrow's priority topics and prepare study desk.",
    icon: "Calendar",
    defaultTasks: ["Log today's wins", "Select tomorrow's 3 priority topics", "Clean study desk"]
  },
  {
    id: "slot-18",
    startTime: "23:00:00",
    endTime: "05:00:00",
    title: "Sleep",
    type: "sleep",
    category: "Sleep & Recovery",
    description: "6 full hours of restful sleep for memory consolidation.",
    icon: "Moon",
    defaultTasks: ["Turn off screen blue light", "Room dark & cool", "Sleep by 11:00 PM sharp"]
  }
];

export const DAY_SUBJECT_BLUEPRINT = {
  1: {
    dayName: "Monday",
    mainFocus: "Physics",
    secondary: "Maths",
    revision: "Chemistry",
    pyqFocus: "Physics PYQs",
    subjects: ["Physics", "Maths", "Chemistry"],
    description: "Physics main focus day with intense PYQ problem solving."
  },
  2: {
    dayName: "Tuesday",
    mainFocus: "Chemistry",
    secondary: "Maths",
    revision: "Physics",
    pyqFocus: "Maths PYQs",
    subjects: ["Chemistry", "Maths", "Physics"],
    description: "Chemistry organic/inorganic mechanisms & Maths calculus drills."
  },
  3: {
    dayName: "Wednesday",
    mainFocus: "Physics",
    secondary: "Chemistry",
    revision: "Maths",
    pyqFocus: "Chemistry PYQs",
    subjects: ["Physics", "Chemistry", "Maths"],
    description: "Physics numericals & Physical Chemistry equilibrium practice."
  },
  4: {
    dayName: "Thursday",
    mainFocus: "Maths",
    secondary: "Physics",
    revision: "Chemistry",
    pyqFocus: "Maths Problem Solving",
    subjects: ["Maths", "Physics", "Chemistry"],
    description: "Maths high-level problem solving & vector geometry."
  },
  5: {
    dayName: "Friday",
    mainFocus: "Chemistry",
    secondary: "Physics",
    revision: "Maths",
    pyqFocus: "Physics + Chemistry PYQs",
    subjects: ["Chemistry", "Physics", "Maths"],
    description: "Combined Physics + Chemistry speed tests and PYQs."
  },
  6: {
    dayName: "Saturday",
    mainFocus: "🧪 FULL JEE MAIN MOCK TEST",
    secondary: "Mock Analysis",
    revision: "Weak Topics",
    pyqFocus: "Weekly Revision",
    subjects: ["Mock Test", "Physics", "Chemistry", "Maths"],
    isMockDay: true,
    description: "Simulate true 3-Hour exam conditions followed by deep error analysis."
  },
  0: {
    dayName: "Sunday",
    mainFocus: "🌿 RECOVERY DAY",
    secondary: "Light Formula Revision",
    revision: "Mistake Notebook Review",
    pyqFocus: "Weekly Planning",
    subjects: ["Revision", "Formula Sheet", "Rest"],
    isRecoveryDay: true,
    description: "Recovery & light revision. Formula sheet review, mistake notebook sync, and mental reset."
  }
};
