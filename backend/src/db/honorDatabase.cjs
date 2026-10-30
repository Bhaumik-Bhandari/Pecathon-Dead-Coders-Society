const fs = require("node:fs");
const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");

const DATA_DIR = path.resolve(__dirname, "../../data");
const DATABASE_PATH = path.join(DATA_DIR, "honor-points.sqlite");

fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new DatabaseSync(DATABASE_PATH);

db.exec(`
  PRAGMA foreign_keys = ON;
  PRAGMA journal_mode = WAL;
  PRAGMA busy_timeout = 5000;

  CREATE TABLE IF NOT EXISTS honor_players (
    id TEXT PRIMARY KEY,
    display_name TEXT NOT NULL
      CHECK (length(display_name) BETWEEN 2 AND 24),
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS honor_completions (
    id TEXT PRIMARY KEY,
    player_id TEXT NOT NULL,
    mission_id TEXT NOT NULL,
    period_key TEXT NOT NULL,
    event_type TEXT,
    note TEXT NOT NULL,
    completed_on TEXT NOT NULL,
    created_at TEXT NOT NULL,

    FOREIGN KEY (player_id)
      REFERENCES honor_players(id)
      ON DELETE CASCADE,

    UNIQUE (player_id, mission_id, period_key)
  );

  CREATE TABLE IF NOT EXISTS honor_ledger (
    id TEXT PRIMARY KEY,
    player_id TEXT NOT NULL,
    completion_id TEXT NOT NULL UNIQUE,
    points INTEGER NOT NULL CHECK (points > 0),
    reason TEXT NOT NULL,
    created_at TEXT NOT NULL,

    FOREIGN KEY (player_id)
      REFERENCES honor_players(id)
      ON DELETE CASCADE,

    FOREIGN KEY (completion_id)
      REFERENCES honor_completions(id)
      ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_honor_completions_player_date
    ON honor_completions(player_id, completed_on);

  CREATE INDEX IF NOT EXISTS idx_honor_ledger_player
    ON honor_ledger(player_id);
`);

module.exports = {
  db,
  DATABASE_PATH,
};