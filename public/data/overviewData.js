// User Type Data (New vs Returning)
export const allUserTypeData = {
  2023: [
    { month: "Jan", new: 1200, returning: 4000 },
    { month: "Feb", new: 1500, returning: 4600 },
    { month: "Mar", new: 1800, returning: 5600 },
    { month: "Apr", new: 2100, returning: 6400 },
    { month: "May", new: 2400, returning: 7400 },
    { month: "Jun", new: 2700, returning: 8500 },
  ],
  2024: [
    { month: "Jan", new: 2200, returning: 6000 },
    { month: "Feb", new: 2800, returning: 7200 },
    { month: "Mar", new: 3400, returning: 9000 },
    { month: "Apr", new: 4000, returning: 10500 },
    { month: "May", new: 4800, returning: 12500 },
    { month: "Jun", new: 5500, returning: 15000 },
  ],
  2025: [
    { month: "Jan", new: 3500, returning: 8600 },
    { month: "Feb", new: 4200, returning: 10800 },
    { month: "Mar", new: 5100, returning: 13400 },
    { month: "Apr", new: 6000, returning: 15200 },
    { month: "May", new: 7200, returning: 18100 },
    { month: "Jun", new: 8400, returning: 21100 },
  ],
};

// Feature Usage Data
export const allFeatureUsageData = {
  2023: [
    { feature: "Leave-By", usageRate: 78, users: 8736, sessions: 45230 },
    { feature: "Daily Digest", usageRate: 65, users: 7280, sessions: 21840 },
    {
      feature: "AI Quick Event",
      usageRate: 58,
      users: 6496,
      sessions: 38976,
    },
    { feature: "Likes", usageRate: 45, users: 5040, sessions: 15120 },
    { feature: "Countdowns", usageRate: 35, users: 3920, sessions: 11760 },
    { feature: "Invites", usageRate: 42, users: 4704, sessions: 9408 },
  ],
  2024: [
    { feature: "Leave-By", usageRate: 85, users: 10589, sessions: 58254 },
    { feature: "Daily Digest", usageRate: 72, users: 8971, sessions: 26913 },
    {
      feature: "AI Quick Event",
      usageRate: 68,
      users: 8466,
      sessions: 50796,
    },
    { feature: "Likes", usageRate: 54, users: 6727, sessions: 20181 },
    { feature: "Countdowns", usageRate: 41, users: 5107, sessions: 15321 },
    { feature: "Invites", usageRate: 48, users: 5976, sessions: 11952 },
  ],
  2025: [
    { feature: "Leave-By", usageRate: 89, users: 12458, sessions: 68552 },
    { feature: "Daily Digest", usageRate: 76, users: 10640, sessions: 31920 },
    {
      feature: "AI Quick Event",
      usageRate: 74,
      users: 10360,
      sessions: 62160,
    },
    { feature: "Likes", usageRate: 62, users: 8680, sessions: 26040 },
    { feature: "Countdowns", usageRate: 48, users: 6720, sessions: 20160 },
    { feature: "Invites", usageRate: 55, users: 7700, sessions: 15400 },
  ],
};

// Onboarding Funnel Data
export const allOnboardingData = {
  2023: [
    { step: "Sign Up", users: 12000, percent: 100 },
    { step: "Email Verify", users: 10200, percent: 85 },
    { step: "Profile Setup", users: 8760, percent: 73 },
    { step: "Family Created", users: 7440, percent: 62 },
    { step: "First Event", users: 6360, percent: 53 },
    { step: "First Invite", users: 4920, percent: 41 },
  ],
  2024: [
    { step: "Sign Up", users: 18000, percent: 100 },
    { step: "Email Verify", users: 16200, percent: 90 },
    { step: "Profile Setup", users: 14220, percent: 79 },
    { step: "Family Created", users: 12420, percent: 69 },
    { step: "First Event", users: 10980, percent: 61 },
    { step: "First Invite", users: 8820, percent: 49 },
  ],
  2025: [
    { step: "Sign Up", users: 25000, percent: 100 },
    { step: "Email Verify", users: 23500, percent: 94 },
    { step: "Profile Setup", users: 21250, percent: 85 },
    { step: "Family Created", users: 19250, percent: 77 },
    { step: "First Event", users: 17500, percent: 70 },
    { step: "First Invite", users: 14750, percent: 59 },
  ],
};

// Session Metrics Data
export const allSessionData = {
  2023: [
    { day: "Mon", avgLength: 8.2, sessionsPerUser: 2.3 },
    { day: "Tue", avgLength: 9.1, sessionsPerUser: 2.5 },
    { day: "Wed", avgLength: 7.8, sessionsPerUser: 2.1 },
    { day: "Thu", avgLength: 8.9, sessionsPerUser: 2.4 },
    { day: "Fri", avgLength: 10.2, sessionsPerUser: 2.8 },
    { day: "Sat", avgLength: 6.5, sessionsPerUser: 1.8 },
    { day: "Sun", avgLength: 6.1, sessionsPerUser: 1.6 },
  ],
  2024: [
    { day: "Mon", avgLength: 9.5, sessionsPerUser: 2.6 },
    { day: "Tue", avgLength: 10.3, sessionsPerUser: 2.8 },
    { day: "Wed", avgLength: 8.7, sessionsPerUser: 2.3 },
    { day: "Thu", avgLength: 10.1, sessionsPerUser: 2.7 },
    { day: "Fri", avgLength: 11.8, sessionsPerUser: 3.1 },
    { day: "Sat", avgLength: 7.2, sessionsPerUser: 2.0 },
    { day: "Sun", avgLength: 6.8, sessionsPerUser: 1.9 },
  ],
  2025: [
    { day: "Mon", avgLength: 11.2, sessionsPerUser: 3.0 },
    { day: "Tue", avgLength: 12.1, sessionsPerUser: 3.3 },
    { day: "Wed", avgLength: 10.3, sessionsPerUser: 2.7 },
    { day: "Thu", avgLength: 11.9, sessionsPerUser: 3.2 },
    { day: "Fri", avgLength: 13.5, sessionsPerUser: 3.6 },
    { day: "Sat", avgLength: 8.5, sessionsPerUser: 2.3 },
    { day: "Sun", avgLength: 8.0, sessionsPerUser: 2.2 },
  ],
};

// Calendar Density Data
export const allCalendarDensityData = {
  2023: [
    { month: "Jan", eventsPerFamily: 12.3, avgMembers: 3.2 },
    { month: "Feb", eventsPerFamily: 14.1, avgMembers: 3.3 },
    { month: "Mar", eventsPerFamily: 15.8, avgMembers: 3.4 },
    { month: "Apr", eventsPerFamily: 17.2, avgMembers: 3.5 },
    { month: "May", eventsPerFamily: 18.9, avgMembers: 3.6 },
    { month: "Jun", eventsPerFamily: 20.5, avgMembers: 3.7 },
  ],
  2024: [
    { month: "Jan", eventsPerFamily: 18.5, avgMembers: 3.8 },
    { month: "Feb", eventsPerFamily: 21.2, avgMembers: 3.9 },
    { month: "Mar", eventsPerFamily: 23.7, avgMembers: 4.0 },
    { month: "Apr", eventsPerFamily: 25.8, avgMembers: 4.1 },
    { month: "May", eventsPerFamily: 28.4, avgMembers: 4.2 },
    { month: "Jun", eventsPerFamily: 31.2, avgMembers: 4.3 },
  ],
  2025: [
    { month: "Jan", eventsPerFamily: 27.5, avgMembers: 4.5 },
    { month: "Feb", eventsPerFamily: 31.8, avgMembers: 4.6 },
    { month: "Mar", eventsPerFamily: 35.6, avgMembers: 4.7 },
    { month: "Apr", eventsPerFamily: 38.7, avgMembers: 4.8 },
    { month: "May", eventsPerFamily: 42.6, avgMembers: 4.9 },
    { month: "Jun", eventsPerFamily: 46.8, avgMembers: 5.0 },
  ],
};

// Time to Value Data
export const allTimeToValueData = {
  2023: [
    { metric: "First Event", days: 3.8 },
    { metric: "First Invite", days: 5.2 },
    { metric: "First Leave-By", days: 4.5 },
    { metric: "Daily Digest Setup", days: 6.1 },
  ],
  2024: [
    { metric: "First Event", days: 2.4 },
    { metric: "First Invite", days: 3.6 },
    { metric: "First Leave-By", days: 2.9 },
    { metric: "Daily Digest Setup", days: 4.2 },
  ],
  2025: [
    { metric: "First Event", days: 1.8 },
    { metric: "First Invite", days: 2.7 },
    { metric: "First Leave-By", days: 2.1 },
    { metric: "Daily Digest Setup", days: 3.1 },
  ],
};
