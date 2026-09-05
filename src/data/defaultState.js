// Initial Default Data for Kishore's Command Center

export const LEVEL_SYSTEM = [
  { level: 1, title: "JEE Starter", minXP: 0 },
  { level: 2, title: "Consistent Learner", minXP: 200 },
  { level: 3, title: "Problem Solver", minXP: 600 },
  { level: 4, title: "PYQ Master", minXP: 1200 },
  { level: 5, title: "JEE Warrior", minXP: 2000 },
  { level: 6, title: "JEE Champion", minXP: 3200 },
  { level: 7, title: "IIT Aspirant Legend", minXP: 5000 }
];

export function getLevelFromXP(xp) {
  for (let i = LEVEL_SYSTEM.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_SYSTEM[i].minXP) {
      const current = LEVEL_SYSTEM[i];
      const next = LEVEL_SYSTEM[i + 1] || { minXP: current.minXP * 2, title: "Legendary Rank" };
      const range = next.minXP - current.minXP;
      const progress = xp - current.minXP;
      const percentage = Math.min(100, Math.round((progress / range) * 100));
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

export const SAMPLE_MISTAKES = [
  {
    id: "m-1",
    date: "2026-09-02",
    subject: "Physics",
    topic: "Electrostatics",
    question: "Axial electric field of uniformly charged ring",
    mistakeType: "Formula",
    description: "Used (r^2 + x^2) instead of (r^2 + x^2)^(3/2) in denominator",
    correctMethod: "E = (k * Q * x) / (r^2 + x^2)^(3/2). Double check denominator exponent.",
    learned: "Always write full 3D integration formula before numerical substitution."
  },
  {
    id: "m-2",
    date: "2026-09-03",
    subject: "Maths",
    topic: "Definite Integration",
    question: "Symmetric integral from -pi to pi of sin^3(x)cos^2(x)",
    mistakeType: "Silly Mistake",
    description: "Did long substitution without checking odd function property.",
    correctMethod: "f(-x) = -f(x). Odd function integrated over [-a, a] is identically 0!",
    learned: "Check symmetry property first for symmetric limits [-a, a]."
  },
  {
    id: "m-3",
    date: "2026-09-04",
    subject: "Chemistry",
    topic: "Chemical Equilibrium",
    question: "Kp to Kc conversion when pressure in atm",
    mistakeType: "Calculation",
    description: "Substituted R = 8.314 J/mol K instead of 0.0821 L atm / mol K",
    correctMethod: "Kp = Kc * (RT)^delta_ng. Use R = 0.0821 when pressure is in atm.",
    learned: "Always verify gas constant units in physical chemistry numericals."
  }
];

export const SAMPLE_MOCK_TESTS = [
  {
    id: "mock-1",
    date: "2026-08-23",
    testName: "Saturday JEE Main Mock #1",
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
    notes: "Good start. Need faster speed in Maths algebra."
  },
  {
    id: "mock-2",
    date: "2026-08-30",
    testName: "Saturday JEE Main Mock #2",
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
    notes: "Great jump! Chemistry organic mechanisms strong."
  }
];

export const INITIAL_TODAY_TOPICS = {
  Physics: "Electrostatics & Capacitance",
  Maths: "Definite Integration & Differential Equations",
  Chemistry: "Organic Reaction Mechanisms & Aldehydes",
  "Mock Test": "Full 3-Hour JEE Main Mock Test"
};

export const INITIAL_USER_PROFILE = {
  name: "Kishore",
  exam: "JEE Main 2026",
  wakeUpTime: "05:00:00 AM",
  sleepTime: "11:00:00 PM",
  notificationsEnabled: true,
  audioAlertsEnabled: true,
  remindLeadMinutes: 10
};
