-- Create Demo Org Chart with Malaysian Names
-- Run this in your Supabase SQL Editor

-- Insert the demo org chart with 10 Malaysian employees
INSERT INTO org_charts (slug, title, owner_token, custom_settings, chart_data)
VALUES (
  'demo',
  'Demo Company Org Chart',
  'demo-token-12345',
  '{"theme": "dark", "style": "modern"}'::jsonb,
  '[
    {
      "id": "1",
      "name": "Ahmad bin Abdullah",
      "position": "Chief Executive Officer",
      "department": "Executive",
      "email": "ahmad@democompany.my",
      "imageUrl": "",
      "parentId": "",
      "color": "blue"
    },
    {
      "id": "2",
      "name": "Siti Nurhaliza",
      "position": "Chief Technology Officer",
      "department": "Technology",
      "email": "siti@democompany.my",
      "imageUrl": "",
      "parentId": "1",
      "color": "cyan"
    },
    {
      "id": "3",
      "name": "Lee Chong Wei",
      "position": "Chief Financial Officer",
      "department": "Finance",
      "email": "lee@democompany.my",
      "imageUrl": "",
      "parentId": "1",
      "color": "green"
    },
    {
      "id": "4",
      "name": "Nurul Izzah",
      "position": "Chief Operating Officer",
      "department": "Operations",
      "email": "nurul@democompany.my",
      "imageUrl": "",
      "parentId": "1",
      "color": "orange"
    },
    {
      "id": "5",
      "name": "Raj Kumar",
      "position": "Lead Developer",
      "department": "Technology",
      "email": "raj@democompany.my",
      "imageUrl": "",
      "parentId": "2",
      "color": "cyan"
    },
    {
      "id": "6",
      "name": "Michelle Yeoh",
      "position": "UI/UX Designer",
      "department": "Design",
      "email": "michelle@democompany.my",
      "imageUrl": "",
      "parentId": "2",
      "color": "pink"
    },
    {
      "id": "7",
      "name": "Tan Sri Lim",
      "position": "Senior Accountant",
      "department": "Finance",
      "email": "lim@democompany.my",
      "imageUrl": "",
      "parentId": "3",
      "color": "green"
    },
    {
      "id": "8",
      "name": "Farah binti Hassan",
      "position": "HR Manager",
      "department": "Human Resources",
      "email": "farah@democompany.my",
      "imageUrl": "",
      "parentId": "4",
      "color": "purple"
    },
    {
      "id": "9",
      "name": "Wong Kar Wai",
      "position": "Marketing Manager",
      "department": "Marketing",
      "email": "wong@democompany.my",
      "imageUrl": "",
      "parentId": "4",
      "color": "blue"
    },
    {
      "id": "10",
      "name": "Amirul Hakim",
      "position": "Junior Developer",
      "department": "Technology",
      "email": "amirul@democompany.my",
      "imageUrl": "",
      "parentId": "5",
      "color": "cyan"
    }
  ]'::jsonb
)
ON CONFLICT (slug) DO UPDATE
SET title = EXCLUDED.title,
    custom_settings = EXCLUDED.custom_settings,
    chart_data = EXCLUDED.chart_data;

-- Verify the data
SELECT 
  slug,
  title,
  jsonb_array_length(chart_data) as employee_count,
  custom_settings
FROM org_charts
WHERE slug = 'demo';

