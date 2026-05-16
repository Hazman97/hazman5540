# Requirement Table Status — hazman5540

> **Last updated:** 2026-05-16

---

## Requirements Status

| Bil | Fungsi | Requirement Item | Status | Notes |
|-----|--------|-----------------|--------|-------|
| 1 | Portfolio | Landing page with hero section | [DONE] | Redirects `/` to `/portfolio` |
| 2 | Portfolio | About page | [DONE] | `/about` with nav |
| 3 | Portfolio | Project showcase | [DONE] | `/project` with nav |
| 4 | Portfolio | Contact form | [DONE] | Uses emailjs-com |
| 5 | Portfolio | Dark/light theme toggle | [DONE] | `useTheme.js` composable |
| 6 | Attendance | Student login | [DONE] | Username + password via Firestore |
| 7 | Attendance | Clock in with photo + GPS | [DONE] | Camera capture, geofence check, photo upload |
| 8 | Attendance | Clock out with photo + GPS | [DONE] | Updates same attendance log |
| 9 | Attendance | Work duration timer | [DONE] | Live countdown on dashboard |
| 10 | Attendance | Attendance history (student) | [DONE] | `/attendance/logs` with calendar view |
| 11 | Attendance | Apply leave (MC/Annual) | [DONE] | Upload attachment, submit to Firestore |
| 12 | Attendance | Leave history (student) | [DONE] | View all past requests |
| 13 | Attendance | Admin login | [DONE] | Migrated to Centralized Google OAuth + RBAC |
| 14 | Attendance | Admin dashboard | [DONE] | Stats + live activity feed |
| 15 | Attendance | Admin student management | [DONE] | Add/edit/toggle active students |
| 16 | Attendance | Admin attendance records | [DONE] | View/filter all logs |
| 17 | Attendance | Admin leave approval | [DONE] | Approve/reject leave requests |
| 18 | Attendance | Admin settings | [DONE] | Office location, geofence config |
| 19 | Attendance | Remote/outside detection | [DONE] | Flags `isClockInOutside` / `isClockOutOutside` |
| 20 | Attendance | Missed clock-out detection | [DONE] | Stale session warning shown on dashboard |
| 21 | Birthday | Create birthday page (wizard) | [DONE] | 4-step flow with templates, media, customization |
| 22 | Birthday | Public birthday view | [DONE] | `/b/:slug` with animations, music |
| 23 | Birthday | Submit wishes (public) | [DONE] | `/b/:slug/wish` |
| 24 | Birthday | Manage wishes (owner) | [DONE] | `/birthday/manage/:id?token=...` |
| 25 | Birthday | Template selection (6 themes) | [DONE] | Rose, Party, Minimal, Ocean, Sunset, Galaxy |
| 26 | Birthday | Custom effects (stars, hearts, etc.) | [DONE] | 6 effect options |
| 27 | Birthday | Memories video support | [DONE] | YouTube embed with audio choice |
| 28 | Birthday | Admin overview | [DONE] | `/birthday/admin` |
| 29 | Org Chart | Create org chart | [DONE] | Form with employee data |
| 30 | Org Chart | View org chart (public) | [DONE] | D3-based interactive rendering |
| 31 | Org Chart | Edit org chart (owner) | [DONE] | Token-based access |
| 32 | Org Chart | Demo org chart | [DONE] | Pre-seeded via SQL |
| 33 | Photo Collection | Browse by country | [DONE] | `/photocollection` |
| 34 | Photo Collection | Browse by location | [DONE] | `/country/:name/location/:location` |
| 35 | Photo Collection | Upload photo | [DONE] | File upload with progress via custom storage API |
| 36 | Photo Collection | Add country/location | [DONE] | Inline creation on upload page |
| 37 | Photo Collection | Delete photos | [DONE] | Trash icon on hover → deletes from storage API + Firestore |
| 38 | E-Claim | Submit claim | [DONE] | Client-side only (demo) |
| 39 | E-Claim | View claims list | [DONE] | With filter by status |
| 40 | E-Claim | Approval workflow | [DONE] | Role-based (HOD/Finance/HR) |
| 41 | E-Claim | Reports & analytics | [DONE] | Category breakdown, totals |
| 42 | E-Claim | Backend persistence | [PENDING] | No database — runs on mock data |
| 43 | WiFi QR | Generate QR from SSID/password | [DONE] | Real-time QR generation |
| 44 | WiFi QR | Theme selection | [DONE] | Swiss Modern, Warm, Minimal |
| 45 | WiFi QR | Download PNG | [DONE] | Canvas-based export |
| 46 | WiFi QR | Print card | [DONE] | Themed A4 print layout |
| 47 | Family | View family members | [DONE] | Grid + table views |
| 48 | Family | Add/edit/delete members | [DONE] | Full CRUD with confirmation dialog |
| 49 | Family | Filter & sort | [DONE] | By age, gender, name, family order |
| 50 | Family | Copy to clipboard | [DONE] | WhatsApp-friendly formatted text |
| 51 | Office | View shirt size list | [DONE] | Table format with size summary |
| 52 | Office | Add/edit/delete entries | [DONE] | Full CRUD with confirmation dialog |
| 53 | Office | Copy to clipboard | [DONE] | Formatted list output |
| 54 | Converter | Unit converter tool | [DONE] | Standalone view |
| 55 | Todo List | Local todo management | [DONE] | Add/toggle/remove tasks |
| 56 | Security | Environment variable management | [PENDING] | All secrets hardcoded (user chose to skip) |
| 57 | Security | Password hashing | [DONE] | bcryptjs with 10 salt rounds + legacy fallback |
| 58 | Security | Improved auth guards | [DONE] | Google OAuth / JSON validation / Router Guards |
| 59 | Security | Firestore security rules | [DONE] | Explicit rules in `firestore.rules` |
| 60 | Caption Generator | Template-based caption generation | [DONE] | 6 categories × 4 tones × 5 platforms |
| 61 | Caption Generator | AI-powered generation (Gemini) | [DONE] | Gemini 2.0 Flash with model fallback |
| 62 | Router | Lazy-loaded routes | [DONE] | ~25 routes lazy-loaded |
| 63 | Router | SEO meta tags | [DONE] | Dynamic document.title via afterEach |
| 64 | Components | Error boundary | [DONE] | Reusable `ErrorBoundary.vue` |
| 65 | Testing | Unit tests | [PENDING] | No test framework configured |
| 66 | CI/CD | Deployment pipeline | [DONE] | Deployed natively via Cloudflare Pages |
| 67 | System & Auth | Centralized Google OAuth | [DONE] | Secure application stack |
| 68 | System & Auth | RBAC Gateway & Middleware | [DONE] | Router-level guard & Hono Middleware |
| 69 | System Admin | User Permissions Dashboard | [DONE] | Superadmin-only UI for access control |
| 70 | Finance | 3-Bucket Finance Tracker | [DONE] | Native tracker utilizing Cloudflare D1 |
| 71 | Finance | Sinking Fund Automation | [DONE] | Automated 10% Grab maintenance logic |
| 72 | Portfolio | E-Resume Timeline | [DONE] | Upgraded UI with MindGPS Tracker |

---

## Completion Summary

| Status | Count | Percentage |
|--------|-------|-----------|
| [DONE] | 69 | 96% |
| [PARTIAL] | 0 | 0% |
| [PENDING] | 3 | 4% |
| **Total** | **72** | **100%** |

---

## Priority Gaps

1. **🟡 Medium:** Hardcoded API keys in source files (user chose to skip `.env` migration)
2. **🟡 Medium:** E-Claim has no backend — currently a front-end demo only
3. **🟢 Low:** No unit tests configured
4. **🟢 Low:** Weather module is minimal/incomplete
