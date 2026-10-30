
/*
 * Dojo Overview — demo data
 *
 * These are sample values for the frontend.
 * They are not fetched from or saved to a backend yet.
 * Replace this data source when the Dojo API is ready.
 */

export const dojoProfile = {
  displayName: "Celestial Explorer",
  subtitle: "Your journey through the stars",

  honorPoints: 1280,
  weeklyPoints: 120,
  currentStreak: 3,

  rank: {
    name: "Astral Initiate",
    tier: 1,
    nextRankName: "Lunar Adept",
    nextRankPoints: 1600,
  },
};

export const dojoStats = [
  {
    id: "honor-points",
    label: "Honor Points",
    value: 1280,
    description: "+120 points this week",
    icon: "sparkles",
  },
  {
    id: "current-rank",
    label: "Current Rank",
    value: "Astral Initiate",
    description: "Your current celestial standing",
    icon: "shield",
  },
  {
    id: "badges-earned",
    label: "Badges Earned",
    value: 4,
    description: "From your achievement collection",
    icon: "medal",
  },
  {
    id: "missions-completed",
    label: "Missions Completed",
    value: "8 / 12",
    description: "Across your celestial expedition",
    icon: "target",
  },
];

export const dojoBadges = [
  {
    id: "first-watch",
    name: "First Watch",
    description: "Complete your first stargazing check-in.",
    category: "Watchtower",
    icon: "telescope",
    unlocked: true,
    earnedLabel: "Earned",
  },
  {
    id: "moon-watcher",
    name: "Moon Watcher",
    description: "Explore the lunar calendar and moon phases.",
    category: "Celestial Scroll",
    icon: "moon",
    unlocked: true,
    earnedLabel: "Earned",
  },
  {
    id: "cosmic-curiosity",
    name: "Cosmic Curiosity",
    description: "Explore your first celestial event.",
    category: "Celestial Scroll",
    icon: "orbit",
    unlocked: true,
    earnedLabel: "Earned",
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Complete three observing sessions.",
    category: "Watchtower",
    icon: "moon-star",
    unlocked: true,
    earnedLabel: "Earned",
  },
  {
    id: "image-pioneer",
    name: "Image Pioneer",
    description: "Complete your first astronomy image analysis.",
    category: "Spirit Lens",
    icon: "scan-search",
    unlocked: false,
    earnedLabel: "Not yet earned",
  },
  {
    id: "stellar-voyager",
    name: "Stellar Voyager",
    description: "Explore all three celestial modules.",
    category: "Expedition",
    icon: "rocket",
    unlocked: false,
    earnedLabel: "Not yet earned",
  },
  {
    id: "lunar-adept",
    name: "Lunar Adept",
    description: "Reach the next honor-points milestone.",
    category: "Rank",
    icon: "award",
    unlocked: false,
    earnedLabel: "Not yet earned",
  },
  {
    id: "cosmic-guardian",
    name: "Cosmic Guardian",
    description: "Complete every available expedition mission.",
    category: "Expedition",
    icon: "shield-check",
    unlocked: false,
    earnedLabel: "Not yet earned",
  },
];

export const dojoMissions = [
  {
    id: "observe-the-sky",
    title: "Explore the Watchtower",
    description: "Visit the stargazing workspace.",
    reward: 50,
    progress: 1,
    target: 1,
    href: "/watchtower",
    icon: "telescope",
  },
  {
    id: "track-celestial-events",
    title: "Explore the Celestial Scroll",
    description: "Discover upcoming celestial events.",
    reward: 40,
    progress: 0,
    target: 1,
    href: "/celestial-scroll",
    icon: "orbit",
  },
  {
    id: "begin-image-analysis",
    title: "Enter the Spirit Lens",
    description: "Open the astronomical image laboratory.",
    reward: 60,
    progress: 0,
    target: 1,
    href: "/spirit-lens",
    icon: "scan-search",
  },
];

export const dojoActivity = [
  {
    id: "activity-1",
    title: "First Watch badge unlocked",
    description: "Your first stargazing check-in.",
    points: 50,
    category: "Watchtower",
    icon: "medal",
    timeLabel: "Demo activity",
  },
  {
    id: "activity-2",
    title: "Moon Watcher badge unlocked",
    description: "You explored the lunar calendar.",
    points: 40,
    category: "Celestial Scroll",
    icon: "moon",
    timeLabel: "Demo activity",
  },
  {
    id: "activity-3",
    title: "Cosmic Curiosity badge unlocked",
    description: "You explored a celestial event.",
    points: 30,
    category: "Celestial Scroll",
    icon: "sparkles",
    timeLabel: "Demo activity",
  },
];

export const dojoDemoMode = true;
