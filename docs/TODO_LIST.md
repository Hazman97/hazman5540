# TODO List — hazman5540

> **Last updated:** 2026-05-16
> 📌 **Note:** For the changelog and recent updates, please refer to the "Recent Update Log" section in [`PROJECT_DOCUMENTATION.md`](./PROJECT_DOCUMENTATION.md).

---

## Phase 1 — Must-Fix Before Production

- [ ] **Security: Move hardcoded API keys to environment variables** — Firebase config, Supabase key, and storage API key are all hardcoded in source files
- [x] **Security: Hash passwords** — Implemented with bcryptjs (10 salt rounds) for students. Admin auth migrated to Google OAuth.
- [ ] **Security: Storage API key exposure** — `my-secret-key-123` is visible in client-side code
- [x] **Auth: Improved authentication guards** — System migrated to Centralized Google OAuth and Router Guards with RBAC
- [ ] **E-Claim: No backend persistence** — Runs entirely on client-side mock data; no database
- [x] **Attendance: Firestore security rules** — Explicit rules in `firestore.rules`, unknown collections denied
- [x] **Birthday/OrgChart RLS: Owner validation documented** — SQL files updated with stricter policy examples
- [x] **Photo Collection: Delete photo from storage** — Delete UI with trash icon on hover + API + Firestore removal

---

## Phase 2 — Stabilization

- [ ] Add proper `.env` file for all environment variables
- [ ] Add loading states and error boundaries to all views
- [ ] Add form validation with proper error messages across all forms
- [ ] Implement robust logout for attendance student (Currently clears localStorage only). Admin logout via Google OAuth is already implemented.
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
- [x] Add CI/CD pipeline — Deployed natively via Cloudflare Pages CI/CD
- [x] Caption Generator — Template + Gemini AI copywriting tool at `/caption`
- [x] Built System Management Dashboard with RBAC
- [x] Finance Tracker (3-Bucket System) with automated Grab sinking fund
