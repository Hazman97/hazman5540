# TODO List — hazman5540

> **Last updated:** 2026-03-11 10:55 MYT

---

## Recent Updates Log

| Date | Update |
|------|--------|
| 2026-03-11 | Security: password hashing (bcryptjs), auth guard 24h TTL, Firestore rules, Supabase RLS docs |
| 2026-03-11 | New: Caption Generator page (`/caption`) with template engine + Gemini AI integration |
| 2026-03-11 | Router: lazy-loaded ~25 routes, SEO meta titles, dynamic document.title |
| 2026-03-11 | Photo collection: delete UI (trash icon + storage API + Firestore) |
| 2026-03-11 | Office: added missing `deleteMember` with confirmation dialog |
| 2026-03-11 | New: `ErrorBoundary.vue` reusable component |
| 2026-03-11 | Generated comprehensive project documentation (`docs/` folder) |
| 2026-03 | Added leave management features (apply leave, leave history, admin leave requests) |
| 2026-03 | Multi-user birthday system with 6 templates, custom effects, memories video |
| 2026-03 | Photo collection — file upload via custom storage API with progress tracking |
| 2026-03 | Admin layout with sidebar navigation for attendance system |
| 2026-03 | Family database with grid/table views, filtering, edit mode |
| 2026-03 | Office shirt list with Firestore CRUD |
| 2026-03 | WiFi QR generator with themed print cards |

---

## Phase 1 — Must-Fix Before Production

- [ ] **Security: Move hardcoded API keys to environment variables** — Firebase config, Supabase key, and storage API key are all hardcoded in source files
- [x] **Security: Hash passwords** — Implemented with bcryptjs (10 salt rounds) + legacy plain-text fallback
- [ ] **Security: Storage API key exposure** — `my-secret-key-123` is visible in client-side code
- [x] **Auth: Improved authentication guards** — Session JSON validation, required fields check, 24-hour TTL
- [ ] **E-Claim: No backend persistence** — Runs entirely on client-side mock data; no database
- [x] **Attendance: Firestore security rules** — Explicit rules in `firestore.rules`, unknown collections denied
- [x] **Birthday/OrgChart RLS: Owner validation documented** — SQL files updated with stricter policy examples
- [x] **Photo Collection: Delete photo from storage** — Delete UI with trash icon on hover + API + Firestore removal

---

## Phase 2 — Stabilization

- [ ] Add proper `.env` file for all environment variables
- [ ] Add loading states and error boundaries to all views
- [ ] Add form validation with proper error messages across all forms
- [ ] Implement logout for attendance student (currently clears localStorage only)
- [ ] Add responsive design fixes for E-Claim (desktop-only layout)
- [ ] Add pagination for attendance records and leave history
- [ ] Birthday page: handle image upload failures gracefully
- [ ] Org chart: add mobile-responsive view
- [ ] Photo collection: add image lazy loading for performance
- [x] Family/office: add confirmation dialog before delete — Both views now have `confirm()` dialog
- [x] Dark mode support via `useTheme.js` composable
- [x] 404 page implemented
- [x] Router scroll behavior configured
- [x] Firestore composite index for attendance_logs
- [x] Error boundaries — `ErrorBoundary.vue` component created
- [x] Lazy-loaded routes — ~25 routes lazy-loaded (only portfolio eager)
- [x] SEO meta tags — Dynamic `document.title` via `router.afterEach`

---

## Phase 3 — Enhancements

- [ ] Add PWA support (service worker, manifest)
- [ ] E-Claim: connect to a real backend with persistence
- [ ] Weather module: implement API integration (currently minimal)
- [ ] Photo collection: add album/slideshow view
- [ ] Birthday: add analytics (view count, wish count)
- [ ] Org chart: add PDF export
- [ ] Attendance: add monthly summary report with charts
- [ ] Attendance: push notifications for missed clock-out
- [ ] Family: add export to Excel/PDF
- [ ] Portfolio: add blog/articles section
- [ ] Add i18n support (Malay/English)
- [ ] Add unit tests (currently no test setup)
- [ ] Add CI/CD pipeline
- [x] Caption Generator — Template + Gemini AI copywriting tool at `/caption`
