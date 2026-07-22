-- ========================================================
-- Supabase Database Schema for My Portfolio Application
-- ========================================================

-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  "imageUrl" TEXT,
  "demoUrl" TEXT,
  "githubUrl" TEXT,
  status TEXT DEFAULT 'planning' CHECK (status IN ('completed', 'in-progress', 'planning')),
  featured BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to projects
CREATE POLICY "Allow public read access to projects"
  ON public.projects FOR SELECT
  USING (true);

-- Create policy for public insert/update/delete access (or restricted by auth)
CREATE POLICY "Allow write access to projects"
  ON public.projects FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update access to projects"
  ON public.projects FOR UPDATE
  USING (true);

CREATE POLICY "Allow delete access to projects"
  ON public.projects FOR DELETE
  USING (true);


-- 2. Setup Supabase Storage Bucket for Images
-- Run this in Supabase SQL editor or create bucket "portfolio-projects" in Supabase Storage UI:
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-projects', 'portfolio-projects', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for portfolio-projects bucket
CREATE POLICY "Public Read Access" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'portfolio-projects');

CREATE POLICY "Public Upload Access" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'portfolio-projects');

CREATE POLICY "Public Update Access" 
  ON storage.objects FOR UPDATE 
  USING (bucket_id = 'portfolio-projects');

CREATE POLICY "Public Delete Access" 
  ON storage.objects FOR DELETE 
  USING (bucket_id = 'portfolio-projects');
