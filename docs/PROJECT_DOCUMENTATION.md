# Project Documentation — hazman5540

> **Last updated:** 2026-03-11 10:55 MYT

---

## 1. Project Overview

**hazman5540** is a multi-tool portfolio web application built as a single Vue 3 SPA. It bundles a personal portfolio site with several standalone mini-apps (attendance system, birthday page builder, org chart creator, photo collection, e-claim demo, WiFi QR generator, caption generator, family database, office list).

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vue 3 (Composition API + Options API) |
| Build Tool | Vite 5 |
| Language | TypeScript / JavaScript |
| Styling | TailwindCSS 3 (dark mode via `class`) |
| State Management | Vuex 4 |
| Routing | Vue Router 4 (history mode) |
| Database (NoSQL) | Firebase Firestore |
| Database (SQL) | Supabase (PostgreSQL) |
| File Storage | Custom API at `storage.bijokdev.com` |
| QR Code | `qrcode` library |
| Charts | D3.js + `d3-org-chart` |
| PDF Export | jsPDF + html2canvas |
| Email | emailjs-com |
| Image Editing | FilePond + Pintura |
| Password Hashing | bcryptjs |
| AI Integration | Google Gemini API (2.0 Flash) |
| Deployment | Vite build (`dist/`) |

---

## 3. Folder Structure

```
hazman5540/
├── index.html                  # App entry point
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── firestore.indexes.json      # Firestore composite indexes
├── firestore.rules             # Firestore security rules
├── supabase_org_charts.sql     # Supabase table: org_charts
├── create_demo_org_chart.sql   # Demo data seed
├── public/                     # Static assets
├── dist/                       # Production build output
├── src/
│   ├── main.ts                 # App bootstrap
│   ├── App.vue
│   ├── firebase.ts             # Firebase init (Firestore)
│   ├── supabase.js             # Supabase client init
│   ├── index.css               # Global styles
│   ├── router/index.ts         # All route definitions
│   ├── store/index.ts          # Vuex store (photo collection state)
│   ├── composables/
│   │   └── useTheme.js         # Dark/light theme toggle
│   ├── services/
│   │   ├── storageService.js          # Photo upload/delete (bijokdev storage)
│   │   └── attendanceStorageService.js # Attendance photo upload
│   ├── scripts/
│   │   ├── setupAdmin.mjs      # Create admin account in Firestore
│   │   └── createStudent.mjs   # Create student account in Firestore
│   ├── components/
│   │   ├── ErrorBoundary.vue   # Reusable error boundary wrapper
│   │   ├── HelloWorld.vue
│   │   └── todolistComponent.vue
│   └── views/
│       ├── HomeView.vue
│       ├── ConverterView.vue
│       ├── database.js
│       ├── portfolio/          # Portfolio pages (6 files)
│       ├── attendance/         # Intern attendance system (12 files)
│       ├── birthday/           # Birthday page builder (7 files + SQL)
│       ├── eclaim/             # E-Claim demo (1 file)
│       ├── family/             # Family database (1 file)
│       ├── office/             # Office shirt list (1 file)
│       ├── orgchart/           # Org chart CRUD (4 files)
│       ├── photocollection/    # Photo gallery (5 files)
│       ├── project/            # Todo list + org chart (3 files)
│       ├── weather/            # Weather search (2 files)
│       ├── wifi-qr/            # WiFi QR generator (1 file)
│       ├── caption/            # Caption generator with AI (3 files)
│       └── notfoundpage/       # 404 page (1 file)
└── docs/                       # This documentation
```

---

## 4. All Routes (Grouped by Module)

### Portfolio
| Path | Component | Auth |
|------|-----------|------|
| `/` | Redirect → `/portfolio` | — |
| `/portfolio` | `portfolio.vue` | — |
| `/about` | `about.vue` + Nav | — |
| `/project` | `project.vue` + Nav | — |
| `/contact` | `contact.vue` + Nav | — |
| `/Nav` | `header.vue` | — |
| `/home` | `HomeView.vue` | — |

### Photo Collection
| Path | Component | Auth |
|------|-----------|------|
| `/photocollection` | `HomeCollection.vue` | — |
| `/country/:name` | `CountryView.vue` + Topbar | — |
| `/country/:name/location/:location` | `LocationView.vue` + Topbar | — |
| `/upload` | `UploadView.vue` | — |

### Birthday System
| Path | Component | Auth |
|------|-----------|------|
| `/birthday-maa` | `BirthdayMaa.vue` | — |
| `/birthday-maa/submit` | `SubmitWish.vue` | — |
| `/birthday/create` | `BirthdayCreate.vue` | — |
| `/b/:slug` | `BirthdayView.vue` | — |
| `/b/:slug/wish` | `SubmitWishPublic.vue` | — |
| `/birthday/manage/:id` | `BirthdayManage.vue` | — |
| `/birthday/admin` | `BirthdayAdmin.vue` | — |

### Organization Chart
| Path | Component | Auth |
|------|-----------|------|
| `/org-demo` | `OrgChartDemo.vue` | — |
| `/org/create` | `OrgChartCreate.vue` | — |
| `/org/:slug` | `OrgChartView.vue` | — |
| `/org/:slug/edit` | `OrgChartEdit.vue` | — |

### E-Claim
| Path | Component | Auth |
|------|-----------|------|
| `/eclaim` | `EClaimView.vue` | — |

### WiFi QR
| Path | Component | Auth |
|------|-----------|------|
| `/wifi-qr` | `WifiQrGenerator.vue` | — |

### Caption Generator
| Path | Component | Auth |
|------|-----------|------|
| `/caption` | `CaptionGenerator.vue` | — |

### Attendance System — Student
| Path | Component | Auth |
|------|-----------|------|
| `/attendance` | `StudentLogin.vue` | — |
| `/attendance/dashboard` | `StudentDashboard.vue` | requiresAuth |
| `/attendance/logs` | `StudentLogs.vue` | requiresAuth |
| `/attendance/apply-leave` | `ApplyLeave.vue` | requiresAuth |
| `/attendance/leaves` | `LeaveHistory.vue` | requiresAuth |

### Attendance System — Admin
| Path | Component | Auth |
|------|-----------|------|
| `/attendance/admin/login` | `AdminLogin.vue` | — |
| `/attendance/admin/dashboard` | `AdminDashboard.vue` | requiresAdmin |
| `/attendance/admin/students` | `StudentManagement.vue` | requiresAdmin |
| `/attendance/admin/records` | `AttendanceRecords.vue` | requiresAdmin |
| `/attendance/admin/settings` | `AdminSettings.vue` | requiresAdmin |
| `/attendance/admin/leaves` | `LeaveRequests.vue` | requiresAdmin |

### Misc
| Path | Component | Auth |
|------|-----------|------|
| `/converter` | `ConverterView.vue` | — |
| `/todolist` | `todolist.vue` | — |
| `/family` | `FamilyView.vue` | — |
| `/office` | `OfficeView.vue` | — |
| `/:pathMatch(.*)*` | 404 page | — |

---

## 5. Database Tables & Migrations

### Firebase Firestore Collections

| Collection | Key Fields | Used By |
|-----------|------------|---------|
| `attendance_students` | `name`, `username`, `password`, `department`, `isActive`, `createdAt` | Attendance module |
| `attendance_admins` | `username`, `password`, `name`, `createdAt` | Admin login |
| `attendance_logs` | `studentId`, `studentName`, `clockInTime`, `clockOutTime`, `isClockInOutside`, `isClockOutOutside`, `clockInPhotoUrl`, `clockOutPhotoUrl`, `totalHours`, `reason` | Clock in/out records |
| `leave_requests` | (student leave applications — MC/Annual) | Leave module |
| `admin_settings` | (office location config, geofence radius) | Admin settings |
| `countries` | `country`, `location[]`, `images[]` | Photo collection |
| `family_members` | `name`, `group`, `familyOrder`, `role`, `age`, `size`, `gender`, `createdAt` | Family database |
| `office_baju` | `name`, `size`, `createdAt` | Office shirt list |

**Firestore Index** (from `firestore.indexes.json`):
- `attendance_logs`: composite index on `studentId` (ASC) + `clockInTime` (DESC)

### Supabase (PostgreSQL) Tables

| Table | Key Columns | SQL File |
|-------|------------|----------|
| `org_charts` | `id` (UUID), `slug` (unique), `title`, `description`, `owner_token`, `theme`, `custom_settings` (JSONB), `chart_data` (JSONB), `created_at`, `updated_at` | `supabase_org_charts.sql` |
| `birthday_pages` | `id` (UUID), `owner_token`, `slug` (unique), `title`, `person_name`, `subtitle`, `hero_image_url`, `template`, `youtube_video_id`, `youtube_start_time`, `memories_video_id`, `use_video_sound`, `settings` (JSONB), `wishes_require_approval`, `created_at`, `updated_at` | `src/views/birthday/sql/create_birthday_pages.sql` |
| `birthday_wishes` | `page_id` (FK → birthday_pages), `status` | Referenced in birthday SQL |

**RLS Policies:** Both tables have open RLS (public read/insert, owner-based update/delete validated at app level via `owner_token`). SQL files include commented examples for stricter header-based enforcement.

**Firestore Security Rules:** Explicit rules defined in `firestore.rules` for all collections. Unknown collections are denied access by default.

---

## 6. Environment Variables / Configuration

This project uses **hardcoded configuration** (no `.env` file detected):

| Key | Value/Location | Purpose |
|-----|---------------|---------|
| Firebase Config | `src/firebase.ts` | API Key, Auth Domain, Project ID, Storage Bucket, etc. |
| Supabase URL | `src/supabase.js` | `https://ossqkmzqwztkalvfeocm.supabase.co` |
| Supabase Anon Key | `src/supabase.js` | Public anon key for client-side access |
| Storage API URL | `src/services/storageService.js` | `https://storage.bijokdev.com` |
| Storage API Key | `src/services/storageService.js` | `my-secret-key-123` |
| Storage Bucket (Photos) | `src/services/storageService.js` | `photocollection` |
| Storage Bucket (Attendance) | `src/services/attendanceStorageService.js` | `attendanceintern` |
| Gemini API Key | `localStorage` (user-provided) | Caption Generator AI mode |
| Dev Server Port | `vite.config.ts` | `8080` |

---

## 7. Recent Update Log

| Date | Module | Change |
|------|--------|--------|
| 2026-03-11 | Security | Password hashing with bcryptjs (10 salt rounds), auth guard 24h TTL, Firestore security rules |
| 2026-03-11 | Caption Generator | New module — template-based + Gemini AI copywriting tool with 6 categories, 5 platforms, 4 tones |
| 2026-03-11 | Router | Lazy-loaded ~25 routes (only portfolio eager), SEO meta titles on all routes |
| 2026-03-11 | Photo Collection | Photo delete UI (hover trash icon → deletes from storage API + Firestore) |
| 2026-03-11 | Office | Added missing `deleteMember` function with confirmation dialog |
| 2026-03-11 | Components | ErrorBoundary.vue — reusable error boundary component |
| 2026-03 | Attendance | Leave application & history features, leave request management for admin |
| 2026-03 | Birthday | Multi-user birthday system with step-by-step creator, template picker, custom settings (fonts, colors, effects), memories video support |
| 2026-03 | Photo Collection | File upload via custom storage API with progress tracking, drag-and-drop support |
| 2026-03 | Org Chart | Full CRUD with Supabase, slug-based sharing, demo data seed |
| 2026-03 | Family | Firestore-based family database with grid/table views, filtering, sorting, copy-to-clipboard |
| 2026-03 | Office | Firestore-based simple name + size list with CRUD |
| 2026-03 | WiFi QR | QR generator with theming, print card, download PNG |
| 2026-03 | E-Claim | Client-side demo with role switcher (staff/HOD/finance/HR) |
