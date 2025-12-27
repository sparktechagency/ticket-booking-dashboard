// Conversion Funnel Data
export const allFunnelData = {
  2023: [
    { stage: "Signup", users: 12000, percent: 100 },
    { stage: "First Event", users: 8400, percent: 70 },
    { stage: "Invite Sent", users: 6720, percent: 56 },
    { stage: "Family Active", users: 5040, percent: 42 },
    { stage: "Trial Start", users: 3360, percent: 28 },
    { stage: "Paid", users: 1680, percent: 14 },
  ],
  2024: [
    { stage: "Signup", users: 18000, percent: 100 },
    { stage: "First Event", users: 13500, percent: 75 },
    { stage: "Invite Sent", users: 11340, percent: 63 },
    { stage: "Family Active", users: 8820, percent: 49 },
    { stage: "Trial Start", users: 6300, percent: 35 },
    { stage: "Paid", users: 3600, percent: 20 },
  ],
  2025: [
    { stage: "Signup", users: 25000, percent: 100 },
    { stage: "First Event", users: 20000, percent: 80 },
    { stage: "Invite Sent", users: 17500, percent: 70 },
    { stage: "Family Active", users: 13750, percent: 55 },
    { stage: "Trial Start", users: 10000, percent: 40 },
    { stage: "Paid", users: 6250, percent: 25 },
  ],
};

// Cohort Retention Data
export const allRetentionData = {
  2023: [
    { cohort: "Jan", day7: 72, day30: 48, day60: 35 },
    { cohort: "Feb", day7: 75, day30: 51, day60: 38 },
    { cohort: "Mar", day7: 78, day30: 54, day60: 41 },
    { cohort: "Apr", day7: 74, day30: 50, day60: 37 },
    { cohort: "May", day7: 76, day30: 52, day60: 39 },
    { cohort: "Jun", day7: 79, day30: 55, day60: 42 },
  ],
  2024: [
    { cohort: "Jan", day7: 80, day30: 58, day60: 45 },
    { cohort: "Feb", day7: 82, day30: 60, day60: 47 },
    { cohort: "Mar", day7: 85, day30: 63, day60: 50 },
    { cohort: "Apr", day7: 83, day30: 61, day60: 48 },
    { cohort: "May", day7: 86, day30: 64, day60: 51 },
    { cohort: "Jun", day7: 88, day30: 67, day60: 54 },
  ],
  2025: [
    { cohort: "Jan", day7: 89, day30: 70, day60: 58 },
    { cohort: "Feb", day7: 91, day30: 73, day60: 61 },
    { cohort: "Mar", day7: 93, day30: 76, day60: 64 },
    { cohort: "Apr", day7: 92, day30: 74, day60: 62 },
    { cohort: "May", day7: 94, day30: 77, day60: 65 },
    { cohort: "Jun", day7: 95, day30: 80, day60: 68 },
  ],
};

// Invite Metrics Data
export const allInviteData = {
  2023: [
    { month: "Jan", sent: 4200, accepted: 2940, rate: 70 },
    { month: "Feb", sent: 4800, accepted: 3456, rate: 72 },
    { month: "Mar", sent: 5400, accepted: 4050, rate: 75 },
    { month: "Apr", sent: 5100, accepted: 3774, rate: 74 },
    { month: "May", sent: 5700, accepted: 4275, rate: 75 },
    { month: "Jun", sent: 6300, accepted: 4914, rate: 78 },
  ],
  2024: [
    { month: "Jan", sent: 7200, accepted: 5616, rate: 78 },
    { month: "Feb", sent: 8100, accepted: 6561, rate: 81 },
    { month: "Mar", sent: 9000, accepted: 7470, rate: 83 },
    { month: "Apr", sent: 8700, accepted: 7134, rate: 82 },
    { month: "May", sent: 9600, accepted: 8064, rate: 84 },
    { month: "Jun", sent: 10500, accepted: 9030, rate: 86 },
  ],
  2025: [
    { month: "Jan", sent: 12000, accepted: 10440, rate: 87 },
    { month: "Feb", sent: 13500, accepted: 11880, rate: 88 },
    { month: "Mar", sent: 15000, accepted: 13350, rate: 89 },
    { month: "Apr", sent: 14400, accepted: 12816, rate: 89 },
    { month: "May", sent: 16200, accepted: 14742, rate: 91 },
    { month: "Jun", sent: 18000, accepted: 16560, rate: 92 },
  ],
};

// Geographic Distribution Data
export const allGeoData = {
  2023: {
    byState: [
      { state: "California", users: 3420, percent: 28.5 },
      { state: "Texas", users: 2280, percent: 19.0 },
      { state: "New York", users: 1920, percent: 16.0 },
      { state: "Florida", users: 1560, percent: 13.0 },
      { state: "Illinois", users: 1200, percent: 10.0 },
      { state: "Others", users: 1620, percent: 13.5 },
    ],
    byZip: [
      { zip: "90210", city: "Beverly Hills, CA", users: 420 },
      { zip: "10001", city: "New York, NY", users: 380 },
      { zip: "75001", city: "Dallas, TX", users: 350 },
      { zip: "33101", city: "Miami, FL", users: 320 },
      { zip: "60601", city: "Chicago, IL", users: 290 },
    ],
  },
  2024: {
    byState: [
      { state: "California", users: 5120, percent: 28.5 },
      { state: "Texas", users: 3420, percent: 19.0 },
      { state: "New York", users: 2880, percent: 16.0 },
      { state: "Florida", users: 2340, percent: 13.0 },
      { state: "Illinois", users: 1800, percent: 10.0 },
      { state: "Others", users: 2440, percent: 13.5 },
    ],
    byZip: [
      { zip: "90210", city: "Beverly Hills, CA", users: 620 },
      { zip: "10001", city: "New York, NY", users: 580 },
      { zip: "75001", city: "Dallas, TX", users: 540 },
      { zip: "33101", city: "Miami, FL", users: 500 },
      { zip: "60601", city: "Chicago, IL", users: 460 },
    ],
  },
  2025: {
    byState: [
      { state: "California", users: 7140, percent: 28.5 },
      { state: "Texas", users: 4760, percent: 19.0 },
      { state: "New York", users: 4000, percent: 16.0 },
      { state: "Florida", users: 3250, percent: 13.0 },
      { state: "Illinois", users: 2500, percent: 10.0 },
      { state: "Others", users: 3350, percent: 13.5 },
    ],
    byZip: [
      { zip: "90210", city: "Beverly Hills, CA", users: 850 },
      { zip: "10001", city: "New York, NY", users: 800 },
      { zip: "75001", city: "Dallas, TX", users: 750 },
      { zip: "33101", city: "Miami, FL", users: 700 },
      { zip: "60601", city: "Chicago, IL", users: 650 },
    ],
  },
};
