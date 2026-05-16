-- ============================================================
-- hazman5540db — Cloudflare D1 Database Schema
-- All sub-modules consolidated into one D1 database
-- ============================================================

PRAGMA foreign_keys = ON;

-- ============================================================
-- ATTENDANCE SYSTEM
-- ============================================================

CREATE TABLE IF NOT EXISTS attendance_students (
  id         TEXT    PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name       TEXT    NOT NULL,
  username   TEXT    UNIQUE NOT NULL,
  password   TEXT    NOT NULL,
  department TEXT,
  is_active  INTEGER NOT NULL DEFAULT 1,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS attendance_admins (
  id         TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  username   TEXT UNIQUE NOT NULL,
  password   TEXT NOT NULL,
  name       TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS attendance_logs (
  id                    TEXT    PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  student_id            TEXT    NOT NULL,
  student_name          TEXT,
  clock_in_time         TEXT,
  clock_out_time        TEXT,
  is_clock_in_outside   INTEGER NOT NULL DEFAULT 0,
  is_clock_out_outside  INTEGER NOT NULL DEFAULT 0,
  clock_in_photo_url    TEXT,
  clock_out_photo_url   TEXT,
  total_hours           REAL,
  reason                TEXT,
  created_at            TEXT    NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (student_id) REFERENCES attendance_students(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_attendance_logs_student ON attendance_logs(student_id, clock_in_time DESC);

CREATE TABLE IF NOT EXISTS leave_requests (
  id           TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  student_id   TEXT NOT NULL,
  student_name TEXT,
  leave_type   TEXT NOT NULL,   -- MC | Annual
  start_date   TEXT NOT NULL,
  end_date     TEXT NOT NULL,
  reason       TEXT,
  status       TEXT NOT NULL DEFAULT 'pending',  -- pending | approved | rejected
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (student_id) REFERENCES attendance_students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admin_settings (
  id              TEXT  PRIMARY KEY DEFAULT 'main',
  office_lat      REAL,
  office_lng      REAL,
  geofence_radius INTEGER NOT NULL DEFAULT 200,
  updated_at      TEXT   NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO admin_settings (id) VALUES ('main');

-- ============================================================
-- BIRTHDAY SYSTEM
-- ============================================================

CREATE TABLE IF NOT EXISTS birthday_pages (
  id                     TEXT    PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  owner_token            TEXT    NOT NULL,
  slug                   TEXT    UNIQUE NOT NULL,
  title                  TEXT,
  person_name            TEXT,
  subtitle               TEXT,
  hero_image_url         TEXT,
  template               TEXT    NOT NULL DEFAULT 'default',
  youtube_video_id       TEXT,
  youtube_start_time     INTEGER NOT NULL DEFAULT 0,
  memories_video_id      TEXT,
  use_video_sound        INTEGER NOT NULL DEFAULT 0,
  settings               TEXT    NOT NULL DEFAULT '{}',
  wishes_require_approval INTEGER NOT NULL DEFAULT 0,
  created_at             TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at             TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS birthday_wishes (
  id         TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  page_id    TEXT NOT NULL,
  name       TEXT,
  message    TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'pending',  -- pending | approved | rejected
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (page_id) REFERENCES birthday_pages(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_birthday_wishes_page ON birthday_wishes(page_id, status);

-- ============================================================
-- ORGANIZATION CHART
-- ============================================================

CREATE TABLE IF NOT EXISTS org_charts (
  id              TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT,
  description     TEXT,
  owner_token     TEXT NOT NULL,
  theme           TEXT NOT NULL DEFAULT 'default',
  custom_settings TEXT NOT NULL DEFAULT '{}',
  chart_data      TEXT NOT NULL DEFAULT '[]',
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ============================================================
-- PHOTO COLLECTION
-- ============================================================

CREATE TABLE IF NOT EXISTS countries (
  id         TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name       TEXT UNIQUE NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS locations (
  id         TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  country_id TEXT NOT NULL,
  name       TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS photos (
  id          TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  location_id TEXT NOT NULL,
  url         TEXT NOT NULL,
  caption     TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_photos_location ON photos(location_id);

-- ============================================================
-- FAMILY DATABASE
-- ============================================================

CREATE TABLE IF NOT EXISTS family_members (
  id           TEXT    PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name         TEXT    NOT NULL,
  group_name   TEXT,
  family_order INTEGER,
  role         TEXT,
  age          INTEGER,
  size         TEXT,
  gender       TEXT,
  created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- ============================================================
-- OFFICE SHIRT LIST
-- ============================================================

CREATE TABLE IF NOT EXISTS office_baju (
  id         TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name       TEXT NOT NULL,
  size       TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ============================================================
-- PORTFOLIO VISITORS
-- ============================================================

CREATE TABLE IF NOT EXISTS portfolio_visitors (
  ip_hash    TEXT PRIMARY KEY,
  last_visit TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ============================================================
-- FINANCIAL TRACKER (3-BUCKET SYSTEM)
-- ============================================================

CREATE TABLE IF NOT EXISTS finance_wallets (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  name           TEXT NOT NULL,
  target_amount  REAL,
  balance        REAL NOT NULL DEFAULT 0.0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS finance_categories (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  name           TEXT NOT NULL,
  bucket_type    TEXT NOT NULL, -- 'Grab', 'Personal', 'Shared'
  created_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS finance_transactions (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  amount           REAL NOT NULL,
  transaction_type TEXT NOT NULL, -- 'income' | 'expense'
  category_id      INTEGER NOT NULL,
  wallet_id        INTEGER,       -- Optional, if allocating to a specific wallet
  date             TEXT NOT NULL, -- ISO Date String
  notes            TEXT,
  created_at       TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (category_id) REFERENCES finance_categories(id) ON DELETE RESTRICT,
  FOREIGN KEY (wallet_id) REFERENCES finance_wallets(id) ON DELETE SET NULL
);

-- ============================================================
-- CENTRALIZED SYSTEM AUTHENTICATION & RBAC
-- ============================================================

CREATE TABLE IF NOT EXISTS system_users (
  id            TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email         TEXT UNIQUE NOT NULL,
  name          TEXT,
  picture       TEXT,
  is_superadmin INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS user_permissions (
  id            TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id       TEXT NOT NULL,
  project       TEXT NOT NULL, -- 'finance', 'attendance_admin', 'birthday_admin', 'org_admin'
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES system_users(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_user_project ON user_permissions(user_id, project);
