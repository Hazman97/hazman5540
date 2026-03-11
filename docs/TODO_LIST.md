# TODO List — hazman5540

> **Last updated:** 2026-03-11 08:09 MYT

---

## Recent Updates Log

| Date | Update |
|------|--------|
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
- [ ] **Security: Hash passwords** — `attendance_admins` and `attendance_students` store passwords in plain text
- [ ] **Security: Storage API key exposure** — `my-secret-key-123` is visible in client-side code
- [ ] **Auth: Implement proper authentication** — Currently using `localStorage` flags for auth guards; easily bypassed
- [ ] **E-Claim: No backend persistence** — Runs entirely on client-side mock data; no database
- [ ] **Attendance: Firestore security rules** — No custom Firestore security rules defined; relying on default/open access
- [ ] **Birthday/OrgChart RLS: Owner validation at DB level** — RLS policies are fully open; owner_token validation happens only in app code
- [ ] **Photo Collection: Delete photo from storage** — No UI to delete uploaded photos from the storage API

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
- [ ] Family/office: add confirmation dialog before delete
- [x] Dark mode support via `useTheme.js` composable
- [x] 404 page implemented
- [x] Router scroll behavior configured
- [x] Firestore composite index for attendance_logs

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
- [ ] SEO: add meta tags and structured data per page
