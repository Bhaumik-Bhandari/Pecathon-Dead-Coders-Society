const EVENT_TYPES = [
  { id: "moon-phase", label: "Moon phase" },
  { id: "meteor-shower", label: "Meteor shower" },
  { id: "iss-pass", label: "ISS pass" },
  { id: "planetary-watch", label: "Planetary observation" },
  { id: "eclipse", label: "Eclipse" },
];

const MAX_EVENT_WITNESSES_PER_DAY = 2;

const MISSIONS = [
  {
    id: "first-light",
    title: "First Light",
    subtitle: "Begin your celestial journey",
    description:
      "Write your first observation log and record what you looked for or noticed in the night sky.",
    points: 25,
    cadence: "once",
    minNoteChars: 30,
    dailyLimit: 1,
  },
  {
    id: "night-journal",
    title: "Night Journal",
    subtitle: "Return to the sky",
    description:
      "Record the sky conditions, what you observed, or what you learned during tonight's session.",
    points: 10,
    cadence: "daily",
    minNoteChars: 30,
    dailyLimit: 1,
  },
  {
    id: "event-witness",
    title: "Event Witness",
    subtitle: "Record a celestial event",
    description:
      "Choose an event category and document your observation. You can earn this award for up to two different categories per date.",
    points: 20,
    cadence: "up to two categories per date",
    minNoteChars: 30,
    dailyLimit: MAX_EVENT_WITNESSES_PER_DAY,
    eventTypes: EVENT_TYPES,
  },
];

const MISSION_BY_ID = Object.fromEntries(
  MISSIONS.map((mission) => [mission.id, mission])
);

// Daily mission resets follow India time by default.
// Override HONOR_TIME_ZONE if your app needs a different timezone.
function getDayKey(date = new Date()) {
  const timeZone = process.env.HONOR_TIME_ZONE || "Asia/Kolkata";

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function getPeriodKey(missionId, dayKey, eventType) {
  switch (missionId) {
    case "first-light":
      return "once";

    case "night-journal":
      return dayKey;

    case "event-witness":
      return `${eventType}:${dayKey}`;

    default:
      throw new Error(`Unknown mission: ${missionId}`);
  }
}

module.exports = {
  EVENT_TYPES,
  MAX_EVENT_WITNESSES_PER_DAY,
  MISSIONS,
  MISSION_BY_ID,
  getDayKey,
  getPeriodKey,
};