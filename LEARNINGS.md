# LEARNINGS.md

> Log silap & fix yang pernah jadi dalam project ni. AI kena baca fail ni di awal setiap session (rule #18 dalam AGENTS.md). Entry baru ditambah hanya lepas user confirm (rule #17).

---

## Format entry

## [YYYY-MM-DD] — Ringkasan singkat isu
❌ **Silap:** apa yang jadi / assumption yang salah
🔍 **Root cause:** kenapa ia jadi (bukan setakat symptom)
✅ **Fix:** apa penyelesaian betul
📌 **Elak lagi:** (optional) rule/pattern spesifik untuk future reference

---

<!-- Entries baru ditambah kat bawah ni -->

## [2026-07-25] — Vue Router Sliding Pill Navbar & Scoped Version Archiving
❌ **Silap:** Switch version portfolio (v2 ke v1) berisiko bocor CSS global dan merosakkan kedudukan sliding active indicator pill jika offset dibaca sebelum DOM siap render.
🔍 **Root cause:** Kedudukan elemen (`offsetLeft`/`offsetWidth`) berubah mengikut breakpoint skrin & mount cycle.
✅ **Fix:** Scope v1 dalam wrapper class khusus dan guna `nextTick` + `resize` event listener untuk recalculate indicator position secara tepat dalam `Navbar.vue`.
📌 **Elak lagi:** Sentiasa bungkus v1/archived routes dalam container scoped dan pastikan kalkulasi DOM ref dinamik dijalankan di dalam `nextTick()` berserta listener `resize`.

---

## [2026-07-25] — Smooth Scrolling Clipping & STAR Metric Copy Positioning
❌ **Silap:** Smooth scrolling terganggu dan tidak bergerak ke seksyen sasaran apabila mengklik pautan navigasi atau item modal Command Palette.
🔍 **Root cause:** Kelas `overflow-x-hidden` diletakkan pada div bekas anak di dalam `HomeV2.vue`, bukannya pada elemen `html, body`. Ini menyebabkannya disekat oleh pelayar sebagai scroll container berasingan.
✅ **Fix:** Memindahkan `overflow-x: hidden` & `scroll-behavior: smooth` ke tahap `html, body` di `index.css`, serta menambah `section { scroll-margin-top: 100px; }` untuk offset header melekit secara automatik.
📌 **Elak lagi:** Jangan letak `overflow-x: hidden` pada wrapper div anak jika menggunakan `window.scrollTo` atau `scrollIntoView` untuk smooth scrolling; tetapkan pada `html, body`.

---

## [2026-08-13] — Global Theme Flashing & Muted Text WCAG Contrast Resolution
❌ **Silap:** Latar belakang dark mode melimpah (flicker) antara `#0a192f` (v1 navy) dengan `#0F0F0F` (v2 warm charcoal) semasa scroll bounce, dan warna teks subtitle `#8A8A8A` / `#6E655F` tidak melepasi standard kontras WCAG AA (bawah 4.5:1 ratio).
🔍 **Root cause:** `html, body` di `src/index.css` ditetapkan pada `dark:bg-primary` (`#0a192f`) manakala container v2 menggunakan `#0F0F0F`. Teks muted juga menggunakan hex raw yang terlalu gelap/pudar untuk saiz font 11px-12px.
✅ **Fix:** Menyelaraskan `html, body` ke `@apply bg-[#FAF7F2] dark:bg-[#0F0F0F]`, mengurung scope v1 dalam `.v1-layout-scope`, serta menaikkan warna token muted ke `#524A45` (Light - 5.8:1) dan `#9E9E9E` (Dark - 5.2:1).
📌 **Elak lagi:** Sentiasa pastikan `html, body` menggunakan token warna asas v2 yang konsisten dan uji kontras teks muted sekurang-kurangnya 4.5:1 untuk saiz kecil.

---

## [2026-08-13] — Portfolio Redundancy & Recruiter Skim Efficiency Polish
❌ **Silap:** Hero section mengulang mesej yang sama 3 kali, terminal CLI menyembunyikan maklumat utama di sebalik klik/delay, grid kemahiran mengandungi 20 bullets, dan carousel memaparkan 18 projek sekali gus yang menyebabkan kehilangan perhatian recruiter.
🔍 **Root cause:** Terlalu banyak kandungan dipaparkan secara terus (*over-exposure*) tanpa hirarki penapisan (*default collapsed view*).
✅ **Fix:** Menggabungkan mesej Hero kepada 1 headline + 1 subline, menjadikan boot terminal instant dengan summary ringkas, memotong grid tech ke top 3 item per column, membuang peranan non-tech dari timeline, dan menetapkan carousel projek paparan asal ke top 5 projek sahaja.
📌 **Elak lagi:** Sentiasa hadkan paparan awal (*initial viewport*) kepada 3-5 item terpenting sahaja dan sediakan butang toggle untuk *deep-dive*.

---

## [2026-08-14] — Full App Audit & Critical Bug Resolution
❌ **Silap:** Penghalaan RBAC guard menuju ke laluan tidak wujud `/admin/login` (menyebabkan 404), pengiraan `avgClaimAmount` menghasilkan `NaN` apabila senarai klaim kosong, ekstraksi sambungan fail muat naik MC boleh rosak jika nama fail tiada titik, dan data RSVP kad kahwin tidak disimpan secara bertahan.
🔍 **Root cause:** Mismatch nama route dalam router guard, pembahagian dengan kosong (division by zero), andaian parsing string `split('.').pop()` tanpa validation, dan ketiadaan storan persisten untuk borang RSVP demo.
✅ **Fix:** Menyelaraskan RBAC guard redirect ke `/attendance/admin/login` dengan alias `/admin/login`, menambah `length` check pada `avgClaimAmount`, menapis sanitasi ekstensi fail muat naik, dan menyimpan data RSVP serta ucapan Kad Kahwin Digital ke `localStorage`.
📌 **Elak lagi:** Sentiasa sahkan route destination wujud dalam router manifest, lindungi operasi pembahagian matematik dari `length === 0`, dan sediakan mekanisme simpanan tempatan (*storage fallback*) untuk semua borang interaktif.

---

## [2026-08-14] — Vue Router RouteRecordRaw Redirect Parameter Mismatch
❌ **Silap:** Type error `null is not assignable to RouteRecordNameGeneric` apabila menggunakan `redirect: (to: RouteLocationNormalized) => ...` dalam manifest route.
🔍 **Root cause:** `RouteLocationNormalized` tidak menerima `name: null` manakala `RouteRecordRedirectOption` melepaskan `RouteLocationGeneric` (yang membenarkan `name` bernilai `null`).
✅ **Fix:** Import `RouteRecordRaw`, taip `const routes: RouteRecordRaw[]`, dan padamkan anotasi spesifik `RouteLocationNormalized` pada callback `redirect: (to) => ...` supaya type diinferred secara tepat oleh Vue Router.
📌 **Elak lagi:** Taip tatasusunan route sebagai `RouteRecordRaw[]` dan biarkan TypeScript infer parameter callback `redirect: (to) => ...` secara kontekstual.