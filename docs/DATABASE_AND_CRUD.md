# Database Schema and CRUD Specifications — hazman5540

> [!NOTE]  
> **Last Updated:** 2026-07-25T05:08:40+08:00  
> **Codebase State:** Reflects Cloudflare D1 database (`hazman5540db`) schema and CRUD operations implemented in Hono backend routes (`backend/src/routes/`).

---

## 1. Cloudflare D1 (SQLite) DDL Schema Script

```sql
-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Student / Intern Users Table
CREATE TABLE IF NOT EXISTS student_users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    matric_no TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Attendance Logs Table
CREATE TABLE IF NOT EXISTS attendance_logs (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    student_name TEXT NOT NULL,
    date TEXT NOT NULL, -- YYYY-MM-DD
    clock_in_time TEXT,
    clock_out_time TEXT,
    clock_in_photo TEXT,
    clock_out_photo TEXT,
    clock_in_location TEXT,
    clock_out_location TEXT,
    status TEXT DEFAULT 'present',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES student_users(id)
);

-- 4. Leave Requests Table
CREATE TABLE IF NOT EXISTS leave_requests (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    student_name TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    reason TEXT NOT NULL,
    attachment_url TEXT,
    status TEXT DEFAULT 'pending', -- pending, approved, rejected
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES student_users(id)
);

-- 5. Org Charts Table
CREATE TABLE IF NOT EXISTS org_charts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    chart_data TEXT NOT NULL, -- JSON stringified hierarchy tree
    created_by TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Birthday Cards & Wishes Table
CREATE TABLE IF NOT EXISTS birthday_cards (
    id TEXT PRIMARY KEY,
    recipient_name TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    theme TEXT DEFAULT 'default',
    music_url TEXT,
    created_by TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS birthday_wishes (
    id TEXT PRIMARY KEY,
    card_id TEXT NOT NULL,
    sender_name TEXT NOT NULL,
    wish_text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (card_id) REFERENCES birthday_cards(id)
);

-- 7. Visitor Counter Table
CREATE TABLE IF NOT EXISTS visitor_count (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    count INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 2. CRUD Status Matrix

| Table Name | Create (C) | Read (R) | Update (U) | Delete (D) | Frontend Page / Endpoint |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `admin_users` | ✅ (`/api/auth/setup-admin`) | ✅ (`/api/auth/login`) | ❌ | ❌ | Admin Login Page |
| `student_users` | ✅ (`/api/attendance/students`) | ✅ (`/api/auth/student-login`) | ❌ | ✅ | Student Management (`/attendance/admin/students`) |
| `attendance_logs` | ✅ (`/api/attendance/clock-in`) | ✅ (`/api/attendance/logs`) | ✅ (`/api/attendance/clock-out`) | ❌ | Student Dashboard (`/attendance/student`) |
| `leave_requests` | ✅ (`/api/attendance/leave`) | ✅ (`/api/attendance/leave/admin`) | ✅ (`/api/attendance/leave/:id/status`) | ❌ | Leave Request Page (`/attendance/student/apply-leave`) |
| `org_charts` | ✅ (`/api/orgchart`) | ✅ (`/api/orgchart/:id`) | ✅ (`/api/orgchart/:id`) | ✅ (`/api/orgchart/:id`) | Org Chart Builder (`/org-demo`, `/orgchart`) |
| `birthday_cards` | ✅ (`/api/birthday/cards`) | ✅ (`/api/birthday/cards/:id`) | ❌ | ❌ | Birthday Creator (`/birthday/create`) |
| `birthday_wishes`| ✅ (`/api/birthday/wishes`) | ✅ (`/api/birthday/cards/:id/wishes`)| ❌ | ❌ | Public Wish Submission Page (`/birthday/view/:id`) |
| `visitor_count` | ✅ (Auto Seed) | ✅ (`/api/portfolio/visitor`) | ✅ (`/api/portfolio/visitor`) | ❌ | Portfolio v2 Footer |

---

## 3. Top 5 Most Common SQL Queries

### Query 1: Fetch Daily Attendance Logs with Student Filter
```sql
SELECT id, student_id, student_name, date, clock_in_time, clock_out_time, status 
FROM attendance_logs 
WHERE date = ? 
ORDER BY clock_in_time DESC;
```

### Query 2: Increment Portfolio Visitor Counter
```sql
INSERT INTO visitor_count (id, count, updated_at) 
VALUES (1, 1, CURRENT_TIMESTAMP) 
ON CONFLICT(id) DO UPDATE SET 
count = visitor_count.count + 1, 
updated_at = CURRENT_TIMESTAMP 
RETURNING count;
```

### Query 3: Retrieve Org Chart JSON Data
```sql
SELECT id, title, chart_data, created_at, updated_at 
FROM org_charts 
WHERE id = ?;
```

### Query 4: Admin Update Leave Request Status
```sql
UPDATE leave_requests 
SET status = ? 
WHERE id = ?;
```

### Query 5: Fetch Birthday Wishes for Specific Card
```sql
SELECT id, sender_name, wish_text, created_at 
FROM birthday_wishes 
WHERE card_id = ? 
ORDER BY created_at DESC;
```
