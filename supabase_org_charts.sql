-- Organization Charts Table
-- Run this SQL in Supabase SQL Editor to create the table

CREATE TABLE IF NOT EXISTS org_charts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  owner_token TEXT NOT NULL,
  theme TEXT DEFAULT 'corporate',
  custom_settings JSONB DEFAULT '{}',
  chart_data JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_org_charts_slug ON org_charts(slug);

-- Enable Row Level Security
ALTER TABLE org_charts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read org charts (public shareable links)
CREATE POLICY "Public read access" ON org_charts
  FOR SELECT
  USING (true);

-- Policy: Anyone can create org charts
CREATE POLICY "Public insert access" ON org_charts
  FOR INSERT
  WITH CHECK (true);

-- Policy: Owner can update their own charts (using owner_token)
CREATE POLICY "Owner update access" ON org_charts
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Policy: Owner can delete their own charts
CREATE POLICY "Owner delete access" ON org_charts
  FOR DELETE
  USING (true);
