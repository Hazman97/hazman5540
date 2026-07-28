# Project Tracking, Audit Trail and Roadmap — hazman5540

> [!NOTE]  
> **Last Updated:** 2026-07-28T19:55:00+08:00  
> **Codebase State:** Reflects Portfolio v2 polish, action-oriented copywriting, neon green terminal contrast, Technical Notes Lightbox Reader Modal, Multi-Image Lightbox Gallery, CLI Copy Email button, SEO Open Graph meta tags, clean print stylesheet, and latest resume file (`Hazman's-resume-july-2026.pdf`).

---

## 1. Recent Updates and Diff Log

| Timestamp | Scope | Diff Summary |
| :--- | :--- | :--- |
| **2026-07-28T19:55:00+08:00** | Portfolio v2 Polish & Resume Update | Refactored v2 copywriting to action-oriented phrasing avoiding first-person pronouns. Upgraded terminal green text to neon green (`#00FF66`) for WCAG AA+ contrast. Added interactive Article Reader Modal in `WritingSection.vue`, multi-image gallery in `ProjectCarousel.vue`, copy email button in `IoTConsoleWidget.vue`, dynamic OG meta tags in `HomeV2.vue`, clean print stylesheet, and updated resume file to `Hazman's-resume-july-2026.pdf`. |
| **2026-07-25T06:08:37+08:00** | Interactive CLI & Tier Strategy | Redesigned `IoTConsoleWidget.vue` to Recruiter Command Terminal v2.6 with 3.0s line-by-line typing animation & real-time timestamps. Tiered 18 projects in `ProjectCarousel.vue` (Tier 1/2/3) with system architecture flowcharts in Lightbox Modal. |
| **2026-07-25T05:30:00+08:00** | Copywriting & STAR Metrics | Updated hero headline to "Full-Stack & IoT Systems Engineer", bio narrative to CS Degree + E&E Diploma hybrid superpower, experience bullets to STAR method metrics (<15ms latency, 500+ pkts/sec), and renamed resume PDF to `Hazman_Adanan_Software_IoT_Engineer_Resume.pdf`. |
| **2026-07-25T05:08:40+08:00** | Docs Suite Sync | Synchronized `/docs` suite with active codebase state, Hono routes, D1 schemas, v2 UI components, and `AGENTS.md` rules. |
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
- **Rule 17 (LEARNINGS.md records)**: Enforced. Learnings recorded for version layout scoping, sliding pill navbar indicator calculation, and v2 copywriting/CLI contrast.

---

## 3. Requirement Status Matrix

| Bil | Fungsi | Requirement Item | Status | Notes |
| :---: | :--- | :--- | :---: | :--- |
| 1 | Portfolio v1 | Archive classic design under `/v1` route with isolated styles | `[DONE]` | Served at `/v1` with scoped wrapper. |
| 2 | Portfolio v2 | Build Whimsical Cozy Nocturnal theme (`#0F0F0F`, `#E8C976`, doodle art) | `[DONE]` | Served at `/portfolio` & `/`. |
| 3 | Theme Toggle | Support seamless Dark Mode (🌙) and Light Mode (☀️) switching | `[DONE]` | Toggle button in Navbar with `useTheme.js`. |
| 4 | IoT Telemetry Console | Interactive live terminal widget with neon green contrast & copy email button | `[DONE]` | `IoTConsoleWidget.vue` embedded in Hero section. |
| 5 | All Projects Showcase | Display 18 projects with multi-image gallery & architecture flowcharts | `[DONE]` | Featured in `ProjectCarousel.vue`. |
| 6 | Technical Notes Modal | Interactive Lightbox Reader Modal for Technical Thoughts & Learnings | `[DONE]` | Embedded in `WritingSection.vue`. |
| 7 | Resume Integration | Latest resume PDF download link (`Hazman's-resume-july-2026.pdf`) | `[DONE]` | Download buttons in Hero, CLI, and Command Palette. |
| 8 | SEO & Open Graph | Dynamic page title and Open Graph meta tag injection on route load | `[DONE]` | Setup in `HomeV2.vue` onMounted. |

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
