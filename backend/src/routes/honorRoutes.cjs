const path = require("node:path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const express = require("express");
const {
  randomUUID,
  createHmac,
  timingSafeEqual,
} = require("node:crypto");

const { db } = require("../db/honorDatabase.cjs");

const {
  EVENT_TYPES,
  MAX_EVENT_WITNESSES_PER_DAY,
  MISSIONS,
  MISSION_BY_ID,
  getDayKey,
  getPeriodKey,
} = require("../data/honorMissions.cjs");

const router = express.Router();

const TOKEN_SECRET = process.env.HONOR_TOKEN_SECRET;

if (!TOKEN_SECRET || TOKEN_SECRET.length < 32) {
  throw new Error(
    "Set HONOR_TOKEN_SECRET to a random secret of at least 32 characters in backend/.env"
  );
}

const TOKEN_LIFETIME_MS = 14 * 24 * 60 * 60 * 1000;

const LEVELS = [
  { name: "Initiate", minPoints: 0 },
  { name: "Moon Seeker", minPoints: 50 },
  { name: "Sky Scout", minPoints: 150 },
  { name: "Celestial Ronin", minPoints: 350 },
  { name: "Tsukuyomi Guardian", minPoints: 700 },
];

function createToken(playerId) {
  const payload = Buffer.from(
    JSON.stringify({
      sub: playerId,
      exp: Date.now() + TOKEN_LIFETIME_MS,
    })
  ).toString("base64url");

  const signature = createHmac("sha256", TOKEN_SECRET)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

function verifyToken(token) {
  if (typeof token !== "string") {
    return null;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const [payload, receivedSignature] = parts;

  const expectedSignature = createHmac("sha256", TOKEN_SECRET)
    .update(payload)
    .digest("base64url");

  const receivedBuffer = Buffer.from(receivedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (receivedBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(receivedBuffer, expectedBuffer)) {
    return null;
  }

  let decoded;

  try {
    decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );
  } catch {
    return null;
  }

  if (
    !decoded.sub ||
    typeof decoded.exp !== "number" ||
    decoded.exp <= Date.now()
  ) {
    return null;
  }

  return decoded;
}

function requirePlayer(req, res, next) {
  const authorization = req.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);

  if (!match) {
    return res.status(401).json({
      message: "Your participant session is missing. Create a session first.",
    });
  }

  const payload = verifyToken(match[1]);

  if (!payload) {
    return res.status(401).json({
      message: "Your participant session is invalid or has expired.",
    });
  }

  const player = db
    .prepare(
      `SELECT id, display_name AS displayName, created_at AS createdAt
       FROM honor_players
       WHERE id = ?`
    )
    .get(payload.sub);

  if (!player) {
    return res.status(401).json({
      message: "Participant not found. Create a new session.",
    });
  }

  req.honorPlayer = player;
  next();
}

function getTotalPoints(playerId) {
  const result = db
    .prepare(
      `SELECT COALESCE(SUM(points), 0) AS total
       FROM honor_ledger
       WHERE player_id = ?`
    )
    .get(playerId);

  return Number(result.total);
}

function getLevel(totalPoints) {
  let currentIndex = 0;

  for (let i = 0; i < LEVELS.length; i += 1) {
    if (totalPoints >= LEVELS[i].minPoints) {
      currentIndex = i;
    } else {
      break;
    }
  }

  const current = LEVELS[currentIndex];
  const next = LEVELS[currentIndex + 1] || null;

  let progressPercent = 100;

  if (next) {
    const earnedInLevel = totalPoints - current.minPoints;
    const pointsInLevel = next.minPoints - current.minPoints;

    progressPercent = Math.max(
      0,
      Math.min(
        100,
        Math.round((earnedInLevel / pointsInLevel) * 100)
      )
    );
  }

  return {
    name: current.name,
    currentLevelAt: current.minPoints,
    nextLevelName: next ? next.name : null,
    nextLevelAt: next ? next.minPoints : null,
    progressPercent,
  };
}

function getStreakDays(playerId) {
  const rows = db
    .prepare(
      `SELECT DISTINCT completed_on AS day
       FROM honor_completions
       WHERE player_id = ?
       ORDER BY day DESC`
    )
    .all(playerId);

  const activeDays = new Set(rows.map((row) => row.day));
  const now = Date.now();
  const today = getDayKey(new Date(now));
  const yesterday = getDayKey(new Date(now - 24 * 60 * 60 * 1000));

  // A streak remains active for the rest of today even if
  // the participant has not logged today's observation yet.
  let offset = activeDays.has(today) ? 0 : activeDays.has(yesterday) ? 1 : -1;

  if (offset === -1) {
    return 0;
  }

  let streak = 0;

  while (offset < 366) {
    const date = getDayKey(
      new Date(now - offset * 24 * 60 * 60 * 1000)
    );

    if (!activeDays.has(date)) {
      break;
    }

    streak += 1;
    offset += 1;
  }

  return streak;
}

function getRank(totalPoints) {
  const result = db
    .prepare(
      `SELECT COUNT(*) AS ahead
       FROM (
         SELECT p.id, COALESCE(SUM(l.points), 0) AS total_points
         FROM honor_players p
         LEFT JOIN honor_ledger l ON l.player_id = p.id
         GROUP BY p.id
         HAVING total_points > ?
       )`
    )
    .get(totalPoints);

  return Number(result.ahead) + 1;
}

function getProfile(player) {
  const totalPoints = getTotalPoints(player.id);

  const recentActivity = db
    .prepare(
      `SELECT
         c.mission_id AS missionId,
         l.reason AS reason,
         l.points AS points,
         l.created_at AS createdAt
       FROM honor_ledger l
       JOIN honor_completions c ON c.id = l.completion_id
       WHERE l.player_id = ?
       ORDER BY l.created_at DESC
       LIMIT 6`
    )
    .all(player.id);

  return {
    player,
    totalPoints,
    rank: getRank(totalPoints),
    level: getLevel(totalPoints),
    streakDays: getStreakDays(player.id),
    recentActivity,
  };
}

function getMissionStatus(playerId) {
  const today = getDayKey();

  const completedOnce = db
    .prepare(
      `SELECT id
       FROM honor_completions
       WHERE player_id = ?
         AND mission_id = 'first-light'
         AND period_key = 'once'`
    )
    .get(playerId);

  const completedJournal = db
    .prepare(
      `SELECT id
       FROM honor_completions
       WHERE player_id = ?
         AND mission_id = 'night-journal'
         AND period_key = ?`
    )
    .get(playerId, today);

  const eventRows = db
    .prepare(
      `SELECT event_type AS eventType
       FROM honor_completions
       WHERE player_id = ?
         AND mission_id = 'event-witness'
         AND completed_on = ?`
    )
    .all(playerId, today);

  const completedEventTypes = eventRows.map((row) => row.eventType);

  const missions = MISSIONS.map((mission) => {
    if (mission.id === "first-light") {
      return {
        ...mission,
        completed: Boolean(completedOnce),
      };
    }

    if (mission.id === "night-journal") {
      return {
        ...mission,
        completed: Boolean(completedJournal),
      };
    }

    if (mission.id === "event-witness") {
      return {
        ...mission,
        completedEventTypes,
        completedCount: completedEventTypes.length,
        completed:
          completedEventTypes.length >= MAX_EVENT_WITNESSES_PER_DAY,
      };
    }

    return { ...mission, completed: false };
  });

  return {
    todayKey: today,
    timeZone: process.env.HONOR_TIME_ZONE || "Asia/Kolkata",
    missions,
  };
}

// POST /api/honor/session
// Creates a new anonymous participant.
router.post("/session", (req, res) => {
  const rawName = req.body?.displayName;

  if (typeof rawName !== "string") {
    return res.status(400).json({
      message: "Enter a participant name.",
    });
  }

  const displayName = rawName.trim().replace(/\s+/g, " ");

  if (
    displayName.length < 2 ||
    displayName.length > 24 ||
    !/^[\p{L}\p{N} _'-]+$/u.test(displayName)
  ) {
    return res.status(400).json({
      message:
        "Name must be 2–24 characters and use letters, numbers, spaces, hyphens, apostrophes or underscores.",
    });
  }

  const player = {
    id: randomUUID(),
    displayName,
    createdAt: new Date().toISOString(),
  };

  db.prepare(
    `INSERT INTO honor_players (id, display_name, created_at)
     VALUES (?, ?, ?)`
  ).run(player.id, player.displayName, player.createdAt);

  return res.status(201).json({
    token: createToken(player.id),
    player,
  });
});

// GET /api/honor/leaderboard
// Public leaderboard; it does not expose participant tokens or IDs.
router.get("/leaderboard", (_req, res) => {
  const entries = db
    .prepare(
      `SELECT
         ROW_NUMBER() OVER (
           ORDER BY COALESCE(SUM(l.points), 0) DESC, p.created_at ASC
         ) AS rank,
         p.display_name AS displayName,
         COALESCE(SUM(l.points), 0) AS totalPoints
       FROM honor_players p
       LEFT JOIN honor_ledger l ON l.player_id = p.id
       GROUP BY p.id
       ORDER BY totalPoints DESC, p.created_at ASC
       LIMIT 10`
    )
    .all();

  return res.json({ entries });
});

// All routes below this point require a signed participant token.
router.use(requirePlayer);

// GET /api/honor/profile
router.get("/profile", (req, res) => {
  return res.json(getProfile(req.honorPlayer));
});

// GET /api/honor/missions
router.get("/missions", (req, res) => {
  return res.json(getMissionStatus(req.honorPlayer.id));
});

// POST /api/honor/missions/:missionId/complete
router.post("/missions/:missionId/complete", (req, res, next) => {
  const player = req.honorPlayer;
  const mission = MISSION_BY_ID[req.params.missionId];

  if (!mission) {
    return res.status(404).json({
      message: "That mission does not exist.",
    });
  }

  const note =
    typeof req.body?.note === "string" ? req.body.note.trim() : "";

  if (note.length < mission.minNoteChars || note.length > 500) {
    return res.status(400).json({
      message: `Observation notes must be ${mission.minNoteChars}–500 characters.`,
    });
  }

  let eventType = null;

  if (mission.id === "event-witness") {
    eventType =
      typeof req.body?.eventType === "string"
        ? req.body.eventType
        : "";

    const allowed = EVENT_TYPES.some((event) => event.id === eventType);

    if (!allowed) {
      return res.status(400).json({
        message: "Choose a valid event category.",
      });
    }
  }

  const today = getDayKey();
  const periodKey = getPeriodKey(mission.id, today, eventType);
  const completionId = randomUUID();
  const now = new Date().toISOString();

  try {
    // The completion and points ledger update together:
    // both succeed or neither does.
    db.exec("BEGIN IMMEDIATE");

    if (mission.id === "event-witness") {
      const countResult = db
        .prepare(
          `SELECT COUNT(*) AS count
           FROM honor_completions
           WHERE player_id = ?
             AND mission_id = 'event-witness'
             AND completed_on = ?`
        )
        .get(player.id, today);

      if (Number(countResult.count) >= MAX_EVENT_WITNESSES_PER_DAY) {
        db.exec("ROLLBACK");

        return res.status(409).json({
          message: "You have reached today's Event Witness limit.",
        });
      }
    }

    const existing = db
      .prepare(
        `SELECT id
         FROM honor_completions
         WHERE player_id = ?
           AND mission_id = ?
           AND period_key = ?`
      )
      .get(player.id, mission.id, periodKey);

    if (existing) {
      db.exec("ROLLBACK");

      return res.status(409).json({
        message: "This mission reward has already been claimed for this period.",
      });
    }

    db.prepare(
      `INSERT INTO honor_completions (
         id,
         player_id,
         mission_id,
         period_key,
         event_type,
         note,
         completed_on,
         created_at
       )
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      completionId,
      player.id,
      mission.id,
      periodKey,
      eventType,
      note,
      today,
      now
    );

    db.prepare(
      `INSERT INTO honor_ledger (
         id,
         player_id,
         completion_id,
         points,
         reason,
         created_at
       )
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(
      randomUUID(),
      player.id,
      completionId,
      mission.points,
      mission.title,
      now
    );

    db.exec("COMMIT");

    return res.status(201).json({
      message: "Mission completed.",
      awardedPoints: mission.points,
      profile: getProfile(player),
    });
  } catch (error) {
    try {
      db.exec("ROLLBACK");
    } catch {
      // A transaction may already have been rolled back.
    }

    if (String(error.message).includes("UNIQUE constraint failed")) {
      return res.status(409).json({
        message: "This reward has already been claimed.",
      });
    }

    return next(error);
  }
});

// Keep unexpected route errors from leaking internal details.
router.use((error, _req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  console.error("[Honor Points]", error);

  return res.status(500).json({
    message: "The Honor Points service encountered an error.",
  });
});

module.exports = router;