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