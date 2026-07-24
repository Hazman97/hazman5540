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