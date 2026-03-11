# CRUD Status — hazman5540

> **Last updated:** 2026-03-11 10:55 MYT

---

## Firebase Firestore Collections

### `attendance_students`

| Operation | Implemented | Endpoint / Page |
|-----------|------------|-----------------|
| **Create** | ✅ | `AdminDashboard.vue` (admin adds student), `scripts/createStudent.mjs` |
| **Read** | ✅ | `StudentLogin.vue` (login query), `StudentManagement.vue` (list all), `AdminDashboard.vue` (count) |
| **Update** | ✅ | `StudentManagement.vue` (edit name, department, toggle active) |
| **Delete** | ✅ | `StudentManagement.vue` (delete student) |

### `attendance_admins`

| Operation | Implemented | Endpoint / Page |
|-----------|------------|-----------------|
| **Create** | ✅ | `scripts/setupAdmin.mjs` |
| **Read** | ✅ | `AdminLogin.vue` (login query) |
| **Update** | ❌ | Not implemented |
| **Delete** | ✅ | `scripts/setupAdmin.mjs` (clears all before re-creating) |

### `attendance_logs`

| Operation | Implemented | Endpoint / Page |
|-----------|------------|-----------------|
| **Create** | ✅ | `StudentDashboard.vue` (clock in) |
| **Read** | ✅ | `StudentDashboard.vue` (today's log), `StudentLogs.vue` (history), `AdminDashboard.vue` (stats + recent), `AttendanceRecords.vue` (all records) |
| **Update** | ✅ | `StudentDashboard.vue` (clock out — adds clockOutTime, totalHours) |
| **Delete** | ❌ | Not implemented |

### `leave_requests`

| Operation | Implemented | Endpoint / Page |
|-----------|------------|-----------------|
| **Create** | ✅ | `ApplyLeave.vue` (submit leave application) |
| **Read** | ✅ | `LeaveHistory.vue` (student's leaves), `LeaveRequests.vue` (admin view) |
| **Update** | ✅ | `LeaveRequests.vue` (approve/reject) |
| **Delete** | ❌ | Not implemented |

### `admin_settings`

| Operation | Implemented | Endpoint / Page |
|-----------|------------|-----------------|
| **Create** | ✅ | `AdminSettings.vue` (initial setup via setDoc) |
| **Read** | ✅ | `AdminSettings.vue`, `StudentDashboard.vue` (geofence config) |
| **Update** | ✅ | `AdminSettings.vue` (save settings) |
| **Delete** | ❌ | Not implemented |

### `countries` (Photo Collection)

| Operation | Implemented | Endpoint / Page |
|-----------|------------|-----------------|
| **Create** | ✅ | `UploadView.vue` (add new country) |
| **Read** | ✅ | `HomeCollection.vue`, `CountryView.vue`, `LocationView.vue`, `UploadView.vue` |
| **Update** | ✅ | `UploadView.vue` (add location via `arrayUnion`, add image via `arrayUnion`) |
| **Delete** | ✅ | `LocationView.vue` (delete image from array + storage API) |

### `family_members`

| Operation | Implemented | Endpoint / Page |
|-----------|------------|-----------------|
| **Create** | ✅ | `FamilyView.vue` (add member form) |
| **Read** | ✅ | `FamilyView.vue` (grid/table view) |
| **Update** | ✅ | `FamilyView.vue` (edit member) |
| **Delete** | ✅ | `FamilyView.vue` (delete button) |

### `office_baju`

| Operation | Implemented | Endpoint / Page |
|-----------|------------|-----------------|
| **Create** | ✅ | `OfficeView.vue` (add form) |
| **Read** | ✅ | `OfficeView.vue` (table/card list) |
| **Update** | ✅ | `OfficeView.vue` (edit mode) |
| **Delete** | ✅ | `OfficeView.vue` (delete button) |

---

## Supabase (PostgreSQL) Tables

### `org_charts`

| Operation | Implemented | Endpoint / Page |
|-----------|------------|-----------------|
| **Create** | ✅ | `OrgChartCreate.vue` (insert via Supabase client) |
| **Read** | ✅ | `OrgChartView.vue` (by slug), `OrgChartDemo.vue` (demo), `OrgChartEdit.vue` |
| **Update** | ✅ | `OrgChartEdit.vue` (update chart_data, title, settings) |
| **Delete** | ✅ | `OrgChartEdit.vue` (delete chart) |

### `birthday_pages`

| Operation | Implemented | Endpoint / Page |
|-----------|------------|-----------------|
| **Create** | ✅ | `BirthdayCreate.vue` (insert via Supabase client) |
| **Read** | ✅ | `BirthdayView.vue` (by slug), `BirthdayManage.vue`, `BirthdayAdmin.vue` |
| **Update** | ✅ | `BirthdayManage.vue` (edit page settings) |
| **Delete** | ✅ | `BirthdayManage.vue` (delete page) |

### `birthday_wishes`

| Operation | Implemented | Endpoint / Page |
|-----------|------------|-----------------|
| **Create** | ✅ | `SubmitWishPublic.vue`, `SubmitWish.vue` (insert wish) |
| **Read** | ✅ | `BirthdayView.vue` (display wishes), `BirthdayManage.vue` (manage wishes) |
| **Update** | ✅ | `BirthdayManage.vue` (approve/reject wish status) |
| **Delete** | ✅ | `BirthdayManage.vue` (delete wish) |

---

## Client-Side Only (No Database)

### E-Claim System

| Operation | Implemented | Storage |
|-----------|------------|---------|
| **Create** | ✅ (submit claim) | In-memory array |
| **Read** | ✅ (list/filter/detail) | In-memory array |
| **Update** | ✅ (approve/reject) | In-memory array |
| **Delete** | ❌ | — |

### WiFi QR Generator

| Operation | Implemented | Storage |
|-----------|------------|---------|
| **Create** | ✅ (generate QR) | Canvas rendering |
| **Read** | ✅ (live preview) | Canvas rendering |
| **Update** | ✅ (real-time re-generation) | Canvas rendering |
| **Delete** | N/A | — |

### Todo List

| Operation | Implemented | Storage |
|-----------|------------|---------|
| **Create** | ✅ (add todo) | Component state |
| **Read** | ✅ (list todos) | Component state |
| **Update** | ✅ (toggle complete) | Component state |
| **Delete** | ✅ (remove todo) | Component state |

### Caption Generator

| Operation | Implemented | Storage |
|-----------|-------------|--------|
| **Create** | ✅ (generate caption via template/AI) | Template engine + Gemini API |
| **Read** | ✅ (view generated caption, history) | Component state + localStorage |
| **Update** | ✅ (regenerate with new variation) | Component state |
| **Delete** | ✅ (clear history) | localStorage |

---

## Summary

| Database | Tables | Full CRUD | Partial CRUD |
|----------|--------|-----------|--------------|
| Firebase Firestore | 7 | 4 (`family_members`, `office_baju`, `attendance_students`, `countries`) | 3 (missing delete on logs/leaves, missing update on admins) |
| Supabase | 3 | 3 (`org_charts`, `birthday_pages`, `birthday_wishes`) | 0 |
| Client-side | 4 | 2 (Todo, Caption Generator) | 2 (E-Claim, WiFi QR) |
