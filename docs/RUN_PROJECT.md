# Run Project — hazman5540

> **Last updated:** 2026-03-11 08:09 MYT

---

## Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- A Firebase project (Firestore enabled)
- A Supabase project (for org charts & birthday pages)

---

## 1. Clone the Repository

```bash
git clone https://github.com/Hazman97/hazman5540.git
cd hazman5540
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Environment Configuration

> ⚠️ Currently, all configuration is **hardcoded** in the source files. No `.env` file exists.

The following files contain configuration that may need updating:

| File | What to configure |
|------|------------------|
| `src/firebase.ts` | Firebase `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId` |
| `src/supabase.js` | Supabase `supabaseUrl`, `supabaseKey` (anon key) |
| `src/services/storageService.js` | `STORAGE_BASE_URL`, `API_KEY`, `BUCKET_NAME` |
| `src/services/attendanceStorageService.js` | `STORAGE_BASE_URL`, `API_KEY`, `BUCKET_NAME` |

---

## 4. Database Setup

### Firebase Firestore

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Open your project → Firestore Database
3. Deploy the composite index:

```bash
# If you have Firebase CLI installed:
firebase deploy --only firestore:indexes
```

Or manually create the index from `firestore.indexes.json`:
- Collection: `attendance_logs`
- Fields: `studentId` (ASC), `clockInTime` (DESC)

### Supabase (PostgreSQL)

1. Go to your Supabase project → SQL Editor
2. Run the following SQL files in order:

```sql
-- 1. Create org_charts table
-- File: supabase_org_charts.sql
```

```sql
-- 2. Create birthday system tables
-- File: src/views/birthday/sql/create_birthday_pages.sql
```

```sql
-- 3. (Optional) Seed demo org chart data
-- File: create_demo_org_chart.sql
```

---

## 5. Create Initial Accounts

### Admin Account (for Attendance System)

```bash
node src/scripts/setupAdmin.mjs
```

This creates:
- **Username:** `admin`
- **Password:** `admin123`

### Student Account (for Attendance System)

```bash
node src/scripts/createStudent.mjs
```

This creates:
- **Username:** `hazman`
- **Password:** `man123`
- **Department:** IT

---

## 6. Run Development Server

```bash
npm run dev
```

The app will start at **http://localhost:8080** (auto-opens in browser).

---

## 7. Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

---

## 8. Preview Production Build

```bash
npm run preview
```

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server (port 8080) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `node src/scripts/setupAdmin.mjs` | Create admin account |
| `node src/scripts/createStudent.mjs` | Create student account |

---

## Troubleshooting

| Issue | Solution |
|-------|---------|
| Port 8080 already in use | Change port in `vite.config.ts` → `server.port` |
| Firestore permission denied | Check Firebase Console → Firestore → Rules (ensure read/write are allowed for your use case) |
| Supabase connection error | Verify `supabaseUrl` and `supabaseKey` in `src/supabase.js` |
| Images not uploading | Ensure `storage.bijokdev.com` is accessible and API key is correct |
| Camera not working (attendance) | Ensure HTTPS or localhost, and grant camera permissions |
