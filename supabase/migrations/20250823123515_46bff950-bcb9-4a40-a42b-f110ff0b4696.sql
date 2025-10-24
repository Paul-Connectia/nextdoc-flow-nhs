-- Fix Security Definer View issue
-- Remove the problematic SECURITY DEFINER function that's causing the warning
DROP FUNCTION IF EXISTS public.is_mentor_profile_public_visible(mentor_status, boolean);

-- Drop and recreate the mentor_profiles_public view without SECURITY DEFINER issues
DROP VIEW IF EXISTS public.mentor_profiles_public;

-- Create a simple public view without SECURITY DEFINER that only exposes safe mentor information
CREATE VIEW public.mentor_profiles_public AS
SELECT 
  id,
  bio,
  job_title,
  specialty,
  experience_years,
  average_rating,
  total_sessions,
  mentor_tier,
  mentoring_areas,
  avatar_url,
  calendly_link,
  created_at,
  updated_at
FROM public.mentor_profiles 
WHERE status = 'approved' AND is_verified = true;

-- Ensure proper permissions for the view
GRANT SELECT ON public.mentor_profiles_public TO anon;
GRANT SELECT ON public.mentor_profiles_public TO authenticated;

-- Update the main table policy to be more restrictive 
DROP POLICY IF EXISTS "Public can view approved mentors via view only" ON public.mentor_profiles;

-- Create a restrictive policy that denies direct public access to the main table
CREATE POLICY "No direct public access to mentor profiles" 
ON public.mentor_profiles 
FOR SELECT 
USING (false);

-- Comment for documentation
COMMENT ON VIEW public.mentor_profiles_public IS 'Public view of mentor profiles that excludes sensitive personal information. Does not use SECURITY DEFINER to avoid security warnings.';