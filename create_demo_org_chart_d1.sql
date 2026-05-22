-- ============================================================
-- Demo Org Chart Seed for Cloudflare D1
-- Run this command to seed the demo chart:
--
--   npx wrangler d1 execute hazman5540db --file=create_demo_org_chart_d1.sql --remote
-- ============================================================

INSERT INTO org_charts (slug, title, owner_token, theme, custom_settings, chart_data)
VALUES (
  'demo',
  'Syarikat Megah Holdings',
  'demo-token-12345',
  'corporate',
  '{"theme": "corporate", "style": "modern"}',
  '[
    {"id": "1", "name": "Tan Sri Megat", "position": "Pengerusi & CEO", "department": "Executive", "email": "megat@megah.my", "imageUrl": "", "parentId": "", "color": "blue"},
    {"id": "2", "name": "Dato'' Seri Ismail", "position": "Ketua Pegawai Operasi (COO)", "department": "Operations", "email": "ismail@megah.my", "imageUrl": "", "parentId": "1", "color": "orange"},
    {"id": "3", "name": "Datin Seri Faridah", "position": "Ketua Pegawai Kewangan (CFO)", "department": "Finance", "email": "faridah@megah.my", "imageUrl": "", "parentId": "1", "color": "green"},
    {"id": "4", "name": "Dr. Azman Shah", "position": "Ketua Pegawai Teknologi (CTO)", "department": "Technology", "email": "azman@megah.my", "imageUrl": "", "parentId": "1", "color": "cyan"},
    {"id": "5", "name": "Puan Sri Maimunah", "position": "Pengarah Sumber Manusia", "department": "Human Resources", "email": "maimunah@megah.my", "imageUrl": "", "parentId": "1", "color": "purple"},
    {"id": "6", "name": "Tengku Firdaus", "position": "Ketua Pemasaran & Jualan", "department": "Sales", "email": "firdaus@megah.my", "imageUrl": "", "parentId": "1", "color": "pink"},
    
    {"id": "7", "name": "Zulkifli Hassan", "position": "Pengurus Besar Operasi", "department": "Operations", "email": "zul@megah.my", "imageUrl": "", "parentId": "2", "color": "orange"},
    {"id": "8", "name": "Roslan Bakar", "position": "Pengurus Logistik", "department": "Operations", "email": "roslan@megah.my", "imageUrl": "", "parentId": "7", "color": "orange"},
    {"id": "9", "name": "Hafizuddin Ahmad", "position": "Penyelia Stor", "department": "Operations", "email": "hafizuddin@megah.my", "imageUrl": "", "parentId": "8", "color": "orange"},
    {"id": "10", "name": "Mohd Faiz", "position": "Pengurus Kualiti", "department": "Operations", "email": "faiz@megah.my", "imageUrl": "", "parentId": "7", "color": "orange"},

    {"id": "11", "name": "Siti Nurhaliza", "position": "Akauntan Kanan", "department": "Finance", "email": "siti@megah.my", "imageUrl": "", "parentId": "3", "color": "green"},
    {"id": "12", "name": "Amira Natasha", "position": "Eksekutif Kewangan", "department": "Finance", "email": "amira@megah.my", "imageUrl": "", "parentId": "11", "color": "green"},
    {"id": "13", "name": "Nurul Syuhada", "position": "Eksekutif Gaji", "department": "Finance", "email": "syuhada@megah.my", "imageUrl": "", "parentId": "11", "color": "green"},
    {"id": "14", "name": "Ahmad Albab", "position": "Juru Audit Dalaman", "department": "Finance", "email": "ahmad@megah.my", "imageUrl": "", "parentId": "3", "color": "green"},

    {"id": "15", "name": "Khairul Aming", "position": "Jurutera Perisian Kanan", "department": "Technology", "email": "khairul@megah.my", "imageUrl": "", "parentId": "4", "color": "cyan"},
    {"id": "16", "name": "Aliff Syukri", "position": "Pembangun Web", "department": "Technology", "email": "aliff@megah.my", "imageUrl": "", "parentId": "15", "color": "cyan"},
    {"id": "17", "name": "Nabil Ahmad", "position": "Pembangun Mudah Alih", "department": "Technology", "email": "nabil@megah.my", "imageUrl": "", "parentId": "15", "color": "cyan"},
    {"id": "18", "name": "Fazura", "position": "Pengurus Infrastruktur IT", "department": "Technology", "email": "fazura@megah.my", "imageUrl": "", "parentId": "4", "color": "cyan"},
    {"id": "19", "name": "Awal Ashaari", "position": "Pakar Keselamatan Siber", "department": "Technology", "email": "awal@megah.my", "imageUrl": "", "parentId": "18", "color": "cyan"},

    {"id": "20", "name": "Mira Filzah", "position": "Pengurus Pengambilan", "department": "Human Resources", "email": "mira@megah.my", "imageUrl": "", "parentId": "5", "color": "purple"},
    {"id": "21", "name": "Neelofa", "position": "Eksekutif HR", "department": "Human Resources", "email": "neelofa@megah.my", "imageUrl": "", "parentId": "20", "color": "purple"},
    {"id": "22", "name": "Zizan Razak", "position": "Pengurus Latihan", "department": "Human Resources", "email": "zizan@megah.my", "imageUrl": "", "parentId": "5", "color": "purple"},

    {"id": "23", "name": "Syamsul Yusof", "position": "Pengurus Jualan", "department": "Sales", "email": "syamsul@megah.my", "imageUrl": "", "parentId": "6", "color": "pink"},
    {"id": "24", "name": "Johan", "position": "Eksekutif Jualan", "department": "Sales", "email": "johan@megah.my", "imageUrl": "", "parentId": "23", "color": "pink"},
    {"id": "25", "name": "Shuib Sepahtu", "position": "Eksekutif Jualan", "department": "Sales", "email": "shuib@megah.my", "imageUrl": "", "parentId": "23", "color": "pink"},
    {"id": "26", "name": "Fasha Sandha", "position": "Pengurus Pemasaran", "department": "Marketing", "email": "fasha@megah.my", "imageUrl": "", "parentId": "6", "color": "teal"},
    {"id": "27", "name": "Scha Alyahya", "position": "Pakar Pemasaran Digital", "department": "Marketing", "email": "scha@megah.my", "imageUrl": "", "parentId": "26", "color": "teal"},
    {"id": "28", "name": "Jihan Muse", "position": "Pakar Kandungan Sosial", "department": "Marketing", "email": "jihan@megah.my", "imageUrl": "", "parentId": "26", "color": "teal"},
    {"id": "29", "name": "Datuk K", "position": "Penasihat Pemasaran", "department": "Marketing", "email": "datukk@megah.my", "imageUrl": "", "parentId": "26", "color": "teal"},
    {"id": "30", "name": "Raja Ilya", "position": "Penganalisis Data Pemasaran", "department": "Marketing", "email": "ilya@megah.my", "imageUrl": "", "parentId": "26", "color": "teal"}
  ]'
)
ON CONFLICT (slug) DO UPDATE
SET
  title          = excluded.title,
  theme          = excluded.theme,
  custom_settings = excluded.custom_settings,
  chart_data     = excluded.chart_data,
  updated_at     = datetime('now');

-- Verify seeded data
SELECT slug, title, length(chart_data) as data_size, created_at
FROM org_charts
WHERE slug = 'demo';
