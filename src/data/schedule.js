// Kishore's JEE Main Daily Timetable & Weekly Subject Rotation

export const DAILY_TIMETABLE_SLOTS = [
  {
    id: "slot-01",
    startTime: "05:00",
    endTime: "05:15",
    title: "Wake Up & Freshen Up",
    type: "routine",
    category: "Morning Routine",
    description: "Wake up at 5:00 AM sharp, drink 500ml water, and freshen up.",
    icon: "Sun",
    defaultTasks: ["Drink warm water", "Freshen up", "Light stretch"]
  },
  {
    id: "slot-02",
    startTime: "05:15",
    endTime: "05:30",
    title: "Stretching & Breathing",
    type: "wellness",
    category: "Mind & Body Reset",
    description: "Light physical stretch, pranayama, and mental preparation for the day.",
    icon: "Activity",
    defaultTasks: ["10 min stretching", "5 min deep breathing", "Set daily mindset"]
  },
  {
    id: "slot-03",
    startTime: "05:30",
    endTime: "07:30",
    title: "Deep Study Session 1",
    type: "study",
    category: "Deep Study",
    sessionIndex: 1,
    durationMinutes: 120,
    icon: "BookOpen",
    defaultTasks: ["Learn key concepts", "Solve 15-20 textbook examples", "Solve 20 PYQs", "Review mistakes"]
  },
  {
    id: "slot-04",
    startTime: "07:30",
    endTime: "08:15",
    title: "Breakfast & Break",
    type: "break",
    category: "Meal Break",
    description: "Healthy breakfast, hydrate, and relax your eyes.",
    icon: "Coffee",
    defaultTasks: ["Nutritious breakfast", "Hydrate (500ml)", "Rest eyes from screens"]
  },
  {
    id: "slot-05",
    startTime: "08:15",
    endTime: "10:15",
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
    startTime: "10:15",
    endTime: "10:45",
    title: "Morning Break",
    type: "break",
    category: "Short Break",
    description: "Walk around, stretch legs, hydrate.",
    icon: "Smile",
    defaultTasks: ["Short walk", "Hydrate", "Relax mind"]
  },
  {
    id: "slot-07",
    startTime: "10:45",
    endTime: "12:45",
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
    startTime: "12:45",
    endTime: "13:45",
    title: "Lunch & Rest",
    type: "break",
    category: "Meal Break",
    description: "Wholesome lunch, family time, and light relaxation.",
    icon: "Utensils",
    defaultTasks: ["Healthy lunch", "Relax mind", "Stay away from heavy screens"]
  },
  {
    id: "slot-09",
    startTime: "13:45",
    endTime: "14:30",
    title: "Power Nap / Relaxation",
    type: "break",
    category: "Recovery",
    description: "20-30 min power nap to recharge mental energy for the afternoon.",
    icon: "Moon",
    defaultTasks: ["20-30 min power nap", "Deep muscle relaxation"]
  },
  {
    id: "slot-10",
    startTime: "14:30",
    endTime: "16:30",
    title: "Study Session 4",
    type: "study",
    category: "Problem Solving",
    sessionIndex: 4,
    durationMinutes: 120,
    icon: "Target",
    defaultTasks: ["Solve targeted exercise set", "Time-bound speed drill (30 Qs)", "Review incorrect answers", "Log to mistake notebook"]
  },
  {
    id: "slot-11",
    startTime: "16:30",
    endTime: "17:00",
    title: "Snack & Walk",
    type: "break",
    category: "Short Break",
    description: "Healthy evening snack, outdoor air, light walk.",
    icon: "Coffee",
    defaultTasks: ["Light snack & water", "15 min evening outdoor walk"]
  },
  {
    id: "slot-12",
    startTime: "17:00",
    endTime: "19:00",
    title: "Study Session 5 / PYQs Focus",
    type: "study",
    category: "PYQ Masterclass",
    sessionIndex: 5,
    durationMinutes: 120,
    icon: "CheckCircle",
    defaultTasks: ["Solve 30 PYQs with timer", "Analyze time taken per question", "Categorize mistakes", "Update progress metrics"]
  },
  {
    id: "slot-13",
    startTime: "19:00",
    endTime: "20:00",
    title: "Exercise, Bath & Dinner",
    type: "routine",
    category: "Evening Routine",
    description: "Physical workout/walk, warm shower, and evening dinner.",
    icon: "Dumbbell",
    defaultTasks: ["30 min workout / physical exercise", "Refreshing bath", "Dinner with family"]
  },
  {
    id: "slot-14",
    startTime: "20:00",
    endTime: "21:30",
    title: "Revision & Practice",
    type: "study",
    category: "Revision",
    sessionIndex: 6,
    durationMinutes: 90,
    icon: "RotateCcw",
    defaultTasks: ["Revise today's key notes", "Active recall key definitions", "Solve 15 mixed revision problems"]
  },
  {
    id: "slot-15",
    startTime: "21:30",
    endTime: "22:00",
    title: "Night Break",
    type: "break",
    category: "Short Break",
    description: "Unwind, listen to calming music, hydrate.",
    icon: "Music",
    defaultTasks: ["Listen to relaxing music", "Hydrate"]
  },
  {
    id: "slot-16",
    startTime: "22:00",
    endTime: "22:40",
    title: "Formula Revision & Mistake Review",
    type: "study",
    category: "Formula Mastery",
    sessionIndex: 7,
    durationMinutes: 40,
    icon: "Zap",
    defaultTasks: ["Review short notes & formula sheet", "Read Mistake Notebook entries", "Memorize critical constants & reactions"]
  },
  {
    id: "slot-17",
    startTime: "22:40",
    endTime: "23:00",
    title: "Plan Tomorrow & Wind Down",
    type: "routine",
    category: "Planning & Prep",
    description: "Review today's wins, set target chapters for tomorrow, prepare study desk.",
    icon: "Calendar",
    defaultTasks: ["Log today's completed targets", "Select tomorrow's 3 priority topics", "Clean study space", "Prepare water bottle"]
  },
  {
    id: "slot-18",
    startTime: "23:00",
    endTime: "05:00",
    title: "Sleep & Brain Recovery",
    type: "sleep",
    category: "Sleep",
    description: "6 full hours of restful sleep for memory consolidation and focus.",
    icon: "Moon",
    defaultTasks: ["Turn off screen blue light", "Room dark & comfortable", "Sleep by 11:00 PM sharp"]
  }
];

export const WEEKLY_SUBJECT_ROTATION = {
  1: {
    dayName: "Monday",
    focus: "Physics PYQs Focus",
    subjects: ["Physics", "Maths", "Chemistry"],
    primarySubject: "Physics",
    customNotes: "Focus on Physics PYQs and problem solving speed."
  },
  2: {
    dayName: "Tuesday",
    focus: "Maths PYQs Focus",
    subjects: ["Chemistry", "Maths", "Physics"],
    primarySubject: "Maths",
    customNotes: "Deep calculus & algebra problem sets."
  },
  3: {
    dayName: "Wednesday",
    focus: "Chemistry PYQs Focus",
    subjects: ["Physics", "Chemistry", "Maths"],
    primarySubject: "Chemistry",
    customNotes: "Organic mechanisms & Physical Chemistry numericals."
  },
  4: {
    dayName: "Thursday",
    focus: "Maths Problem Solving",
    subjects: ["Maths", "Physics", "Chemistry"],
    primarySubject: "Maths",
    customNotes: "High-level problem solving and vector geometry."
  },
  5: {
    dayName: "Friday",
    focus: "Physics + Chemistry PYQs",
    subjects: ["Chemistry", "Physics", "Maths"],
    primarySubject: "Physics & Chemistry",
    customNotes: "Combined Speed test on Physics and Chemistry formulas."
  },
  6: {
    dayName: "Saturday",
    focus: "Full JEE Main Mock Test + Analysis",
    subjects: ["Mock Test", "Physics", "Chemistry", "Maths"],
    primarySubject: "Mock Test",
    customNotes: "Simulate real exam conditions (3 Hours). Analyze every mistake!"
  },
  0: {
    dayName: "Sunday",
    focus: "Recovery + Light Revision",
    subjects: ["Revision", "Formula Review", "Weak Topics"],
    primarySubject: "Revision & Recovery",
    customNotes: "Light revision, formula sheets, rest, and mental reset."
  }
};
