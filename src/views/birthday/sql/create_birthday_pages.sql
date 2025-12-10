-- ============================================
-- Multi-User Birthday Pages System
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create birthday_pages table
CREATE TABLE IF NOT EXISTS birthday_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_token VARCHAR(64) NOT NULL,           -- Secret token for page owner
  slug VARCHAR(50) UNIQUE NOT NULL,           -- Public share link: /b/{slug}
  title VARCHAR(100) NOT NULL,                -- e.g., "Happy Birthday Mama!"
  person_name VARCHAR(100) NOT NULL,          -- The birthday person's name
  subtitle VARCHAR(200),                      -- Optional tagline
  hero_image_url TEXT,                        -- Main banner image
  template VARCHAR(20) DEFAULT 'rose',        -- 'rose', 'party', 'minimal', 'ocean', 'sunset', 'galaxy'
  youtube_video_id VARCHAR(20),               -- Background music
  youtube_start_time INTEGER DEFAULT 0,
  memories_video_id VARCHAR(20),              -- Optional memories video (YouTube)
  use_video_sound BOOLEAN DEFAULT false,      -- true = use video sound, false = use bg music
  settings JSONB DEFAULT '{}',                -- Future customization options
  wishes_require_approval BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add memories video columns to existing table
ALTER TABLE birthday_pages ADD COLUMN IF NOT EXISTS memories_video_id VARCHAR(20);
ALTER TABLE birthday_pages ADD COLUMN IF NOT EXISTS use_video_sound BOOLEAN DEFAULT false;
-- 2. Add columns to birthday_wishes if they don't exist
-- First check if page_id column exists, if not add it
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'birthday_wishes' AND column_name = 'page_id'
  ) THEN
    ALTER TABLE birthday_wishes ADD COLUMN page_id UUID REFERENCES birthday_pages(id) ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'birthday_wishes' AND column_name = 'status'
  ) THEN
    ALTER TABLE birthday_wishes ADD COLUMN status VARCHAR(20) DEFAULT 'approved';
  END IF;
END $$;

-- 3. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_birthday_pages_slug ON birthday_pages(slug);
CREATE INDEX IF NOT EXISTS idx_birthday_pages_owner_token ON birthday_pages(owner_token);
CREATE INDEX IF NOT EXISTS idx_birthday_wishes_page_id ON birthday_wishes(page_id);
CREATE INDEX IF NOT EXISTS idx_birthday_wishes_status ON birthday_wishes(status);

-- 4. Enable Row Level Security
ALTER TABLE birthday_pages ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for birthday_pages

-- Anyone can read birthday pages (public viewing)
CREATE POLICY "Anyone can view birthday pages" ON birthday_pages
  FOR SELECT USING (true);

-- Anyone can create birthday pages (no auth required)
CREATE POLICY "Anyone can create birthday pages" ON birthday_pages
  FOR INSERT WITH CHECK (true);

-- Only owner can update their page (validated by owner_token in app)
CREATE POLICY "Anyone can update birthday pages" ON birthday_pages
  FOR UPDATE USING (true);

-- Only owner can delete their page (validated by owner_token in app)
CREATE POLICY "Anyone can delete birthday pages" ON birthday_pages
  FOR DELETE USING (true);

-- 6. RLS Policies for birthday_wishes (if not already set)
-- Drop existing policies first to avoid conflicts
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can view approved wishes" ON birthday_wishes;
  DROP POLICY IF EXISTS "Anyone can insert wishes" ON birthday_wishes;
  DROP POLICY IF EXISTS "Anyone can update wishes" ON birthday_wishes;
  DROP POLICY IF EXISTS "Anyone can delete wishes" ON birthday_wishes;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Recreate policies
CREATE POLICY "Anyone can view approved wishes" ON birthday_wishes
  FOR SELECT USING (status = 'approved' OR status IS NULL);

CREATE POLICY "Anyone can insert wishes" ON birthday_wishes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update wishes" ON birthday_wishes
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete wishes" ON birthday_wishes
  FOR DELETE USING (true);

-- ============================================
-- DONE! Your multi-user birthday system is ready.
-- ============================================
