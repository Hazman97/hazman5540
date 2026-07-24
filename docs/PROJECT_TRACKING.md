# Project Tracking, Audit Trail and Roadmap — hazman5540

> [!NOTE]  
> **Last Updated:** 2026-07-25T05:08:40+08:00  
> **Codebase State:** Reflects complete Portfolio v2 redesign, Hono backend routes, D1 database integration, dual light/dark mode, and UI/UX design token polish.

---

## 1. Recent Updates and Diff Log

| Timestamp | Scope | Diff Summary |
| :--- | :--- | :--- |
| **2026-07-25T05:08:40+08:00** | Docs Suite Sync | Fully synchronized the 7-file `/docs` suite with the active codebase state, Hono routes, D1 schemas, v2 UI components, and `AGENTS.md` rules. |
| **2026-07-25T05:07:00+08:00** | UI/UX & Design Tokens | Conducted full design audit. Added `.focus-ring` accessibility utility in `index.css`, defined `v2` color palette tokens in `tailwind.config.js`, and fixed WCAG AA light mode contrast ratios. |
| **2026-07-24T21:05:00+08:00** | Portfolio v2 & IoT Console | Built `IoTConsoleWidget.vue` live interactive terminal, updated `ProjectCarousel.vue` to feature all 18 projects with category tabs, and added dual light (`#FAF7F2`) and dark (`#0F0F0F`) theme support. |
| **2026-07-24T20:30:00+08:00** | Portfolio v1 Snapshot Archive | Preserved classic v1 portfolio snapshot under route `/v1` wrapped in `.v1-layout-scope` with version dropdown switcher. |

---

## 2. AGENTS.md Consistency Check

> [!IMPORTANT]  
> Cross-check between codebase implementation practices and rules defined in `AGENTS.md`.

- **Rule 4 (Verify before declaring done)**: Enforced. Every code modification pass is verified with production builds (`npm run build`).
- **Rule 9 (Never hardcode secrets)**: Enforced. Environment variables use standard key references in `.env` and `wrangler.toml`.
- **Rule 12 (Prefer edit existing files over sprawl)**: Enforced. Standardized components are edited directly inside `src/components/v2/`.
- **Rule 17 (LEARNINGS.md records)**: Enforced. Learnings recorded for version layout scoping and sliding pill navbar indicator calculation.
- **Potential Flag / Observation**:
  - *Observation*: `src/views/family/FamilyView.vue` has an unused import warning (`setDoc` from `firebase/firestore`). Does not break build, but flagged for cleanup during Phase 2 stabilization.

---

## 3. Requirement Status Matrix

| Bil | Fungsi | Requirement Item | Status | Notes |
| :---: | :--- | :--- | :---: | :--- |
| 1 | Portfolio v1 | Archive classic design under `/v1` route with isolated styles | `[DONE]` | Served at `/v1` with scoped wrapper. |
| 2 | Portfolio v2 | Build Whimsical Cozy Nocturnal theme (`#0F0F0F`, `#E8C976`, doodle art) | `[DONE]` | Served at `/portfolio` & `/`. |
| 3 | Theme Toggle | Support seamless Dark Mode (🌙) and Light Mode (☀️) switching | `[DONE]` | Toggle button in Navbar with `useTheme.js`. |
| 4 | IoT Telemetry Console | Interactive live terminal widget for ESP32, GPS, and Mesh signals | `[DONE]` | `IoTConsoleWidget.vue` embedded in Hero section. |
| 5 | All Projects Showcase | Display all 18 projects from v1 with category filter tabs | `[DONE]` | Featured in `ProjectCarousel.vue`. |
| 6 | Resume Data Integration | Showcase Mindnrobotics, PKT, UMT, PIS & Dean's List honors | `[DONE]` | Highlighted in `AboutSection.vue` & `ExperienceSection.vue`. |
| 7 | Hono v4 Backend API | Edge backend API routes backed by Cloudflare D1 | `[DONE]` | Routes in `backend/src/routes/`. |
| 8 | Version Selector Dropdown | Instant switcher between v1 and v2 in both headers | `[DONE]` | Embedded in Navbar v2 and Header v1. |

---

## 4. Phased TODO List

### Phase 1: Production Readiness (Must-Fix)
- [x] Implement dual light and dark mode styling with WCAG AA compliance across all v2 components.
- [x] Feature all 18 v1 projects in v2 carousel with category filter tabs and real images.
- [x] Synchronize complete documentation suite in `/docs`.
- [x] Verify production Vite build (`npm run build` succeeds cleanly).

### Phase 2: Stabilization & Polish
- [ ] Remove unused import `setDoc` in `src/views/family/FamilyView.vue`.
- [ ] Add automated Playwright e2e route switching test between `/v1` and `/portfolio`.
- [ ] Add OpenAPI / Swagger schema generator for Hono routes in `backend/src/index.ts`.

### Phase 3: Enhancements
- [ ] Add live WebSocket connection option for real physical ESP32 target hardware in `IoTConsoleWidget.vue`.
- [ ] Implement multi-language switcher (Malay / English) in Portfolio v2 Navbar.
