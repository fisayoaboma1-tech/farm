-- =============================================================
-- MULIARAYA — Supabase Database Setup Script
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/tvjhottqdqovnlnsuwsb/sql/new)
-- =============================================================

-- 1. Create table for tracking admin users
-- Each admin user is linked to a Supabase Auth user by their UUID

CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Allow only service_role to insert/update/delete admin_users
CREATE POLICY "Admin users are managed by service_role only"
  ON public.admin_users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 2. Create table for contact form submissions

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  read BOOLEAN NOT NULL DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anon key to insert (contact form submission)
CREATE POLICY "Anyone can submit contact messages"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow only service_role to read/update contact messages (admin dashboard)
CREATE POLICY "Only service_role can read contact messages"
  ON public.contact_messages
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Only service_role can update contact messages"
  ON public.contact_messages
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 3. Create the initial admin user
-- IMPORTANT: First, create a user in Supabase Auth UI (Authentication > Users > Invite user / Add user)
-- Then replace the UUID below with the actual user ID from Auth

-- Example (uncomment and run AFTER creating user in Auth UI):
-- INSERT INTO public.admin_users (id, email, role)
-- VALUES ('REPLACE_WITH_ACTUAL_USER_UUID', 'admin@muliaraya.co.id', 'admin');

-- 4. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT INSERT ON public.contact_messages TO anon, authenticated;