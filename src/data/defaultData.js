// Initial Default Data for Kishore's Dashboard

export const LEVEL_THRESHOLDS = [
  { level: 1, title: "JEE Starter", minXP: 0, maxXP: 200 },
  { level: 2, title: "Consistent Learner", minXP: 200, maxXP: 600 },
  { level: 3, title: "Problem Solver", minXP: 600, maxXP: 1200 },
  { level: 4, title: "PYQ Master", minXP: 1200, maxXP: 2000 },
  { level: 5, title: "JEE Warrior", minXP: 2000, maxXP: 3200 },
  { level: 6, title: "JEE Champion", minXP: 3200, maxXP: 5000 },
  { level: 7, title: "IIT Aspirant Legend", minXP: 5000, maxXP: 10000 }
];

export function calculateLevel(xp) {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].minXP) {
      const current = LEVEL_THRESHOLDS[i];
      const next = LEVEL_THRESHOLDS[i + 1] || { maxXP: current.maxXP * 2, minXP: current.minXP };
      const progressInLevel = xp - current.minXP;
      const totalInLevel = next.minXP - current.minXP;
      const percentage = Math.min(100, Math.round((progressInLevel / totalInLevel) * 100));
      return {
        level: current.level,
        title: current.title,
        currentXP: xp,
        nextLevelXP: next.minXP,
        percentage
      };
    }
  }
  return { level: 1, title: "JEE Starter", currentXP: xp, nextLevelXP: 200, percentage: 0 };
}

export const INITIAL_MISTAKES = [
  {
    id: "m-01",
    date: "2026-09-02",
    subject: "Physics",
    topic: "Electrostatics",
    question: "Electric field due to uniformly charged ring at axial distance x",
    mistakeType: "Formula mistake",
    description: "Forgot the factor of (r^2 + x^2)^(3/2) in the denominator",
    correctMethod: "E = (k * Q * x) / (r^2 + x^2)^(3/2). Always double check power of 3/2 for 3D axial integration.",
    learned: "Always write down the full formula before substituting numerical values."
  },
  {
    id: "m-02",
    date: "2026-09-03",
    subject: "Maths",
    topic: "Definite Integration",
    question: "Evaluation of integral from -pi to pi of sin^3(x) * cos^2(x)",
    mistakeType: "Silly mistake",
    description: "Did standard long integration instead of checking if integrand function is odd.",
    correctMethod: "f(-x) = sin^3(-x)cos^2(-x) = -f(x). Since function is odd, integral from -a to a is 0 instantly!",
    learned: "Check symmetry (odd/even function property) first for definite integrals with symmetric limits [-a, a]."
  },
  {
    id: "m-03",
    date: "2026-09-04",
    subject: "Chemistry",
    topic: "Chemical Equilibrium",
    question: "Calculating Kp from Kc for reaction with gaseous mole change",
    mistakeType: "Calculation mistake",
    description: "Used R = 8.314 instead of R = 0.0821 L atm / mol K when pressure was in atmospheres.",
    correctMethod: "Kp = Kc * (RT)^delta_ng. Use R = 0.0821 L·atm/mol·K when pressure is in atmospheres.",
    learned: "Units check is mandatory for physical chemistry equilibrium numericals."
  }
];

export const INITIAL_MOCK_TESTS = [
  {
    id: "mock-01",
    date: "2026-08-23",
    testName: "JEE Main Full Test #1",
    physicsScore: 68,
    chemistryScore: 74,
    mathsScore: 52,
    totalScore: 194,
    maxScore: 300,
    questionsAttempted: 62,
    correct: 51,
    incorrect: 11,
    unattempted: 13,
    accuracy: 82.25,
    notes: "Good start. Need to improve Speed in Maths algebra section."
  },
  {
    id: "mock-02",
    date: "2026-08-30",
    testName: "JEE Main Full Test #2",
    physicsScore: 76,
    chemistryScore: 82,
    mathsScore: 60,
    totalScore: 218,
    maxScore: 300,
    questionsAttempted: 68,
    correct: 57,
    incorrect: 11,
    unattempted: 7,
    accuracy: 83.82,
    notes: "Strong improvement in Organic chemistry & Physics electrostatics!"
  }
];

export const INITIAL_TODAY_SUBJECT_TOPICS = {
  Physics: "Electrostatics & Capacitance",
  Maths: "Definite Integration & Differential Equations",
  Chemistry: "Organic Reaction Mechanisms & Aldehydes",
  "Mock Test": "Full 3-Hour JEE Main Mock Test"
};

export const INITIAL_USER_PROFILE = {
  name: "Kishore",
  exam: "JEE Main 2026",
  targetScore: 240,
  wakeUpTime: "05:00",
  sleepTime: "23:00",
  studyDays: "Monday - Saturday",
  recoveryDay: "Sunday",
  pomodoroWork: 50,
  pomodoroBreak: 10,
  dailyGoalHours: 8.5,
  dailyPYQTarget: 50,
  notificationsEnabled: true,
  audioAlertsEnabled: true,
  remindLeadMinutes: 10
};
