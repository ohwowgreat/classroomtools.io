CREATE TABLE IF NOT EXISTS boards (
  code TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  owner_hash TEXT NOT NULL,
  creator_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  paused INTEGER NOT NULL DEFAULT 0,
  hidden INTEGER NOT NULL DEFAULT 0,
  focus TEXT,
  version INTEGER NOT NULL DEFAULT 1
);
CREATE INDEX IF NOT EXISTS boards_creator_time ON boards(creator_hash, created_at);

CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY,
  board_code TEXT NOT NULL REFERENCES boards(code) ON DELETE CASCADE,
  number INTEGER NOT NULL,
  author TEXT NOT NULL,
  author_hash TEXT NOT NULL,
  kind TEXT NOT NULL CHECK(kind IN ('Observation','Interpretation','Question')),
  text TEXT NOT NULL,
  x REAL NOT NULL CHECK(x BETWEEN 0 AND 1),
  y REAL NOT NULL CHECK(y BETWEEN 0 AND 1),
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  hidden INTEGER NOT NULL DEFAULT 0,
  UNIQUE(board_code, number)
);
CREATE INDEX IF NOT EXISTS notes_board_author_time ON notes(board_code, author_hash, created_at);
CREATE TRIGGER IF NOT EXISTS notes_added AFTER INSERT ON notes BEGIN
  UPDATE boards SET version = version + 1 WHERE code = NEW.board_code;
END;
CREATE TRIGGER IF NOT EXISTS notes_changed AFTER UPDATE ON notes BEGIN
  UPDATE boards SET version = version + 1 WHERE code = NEW.board_code;
END;
