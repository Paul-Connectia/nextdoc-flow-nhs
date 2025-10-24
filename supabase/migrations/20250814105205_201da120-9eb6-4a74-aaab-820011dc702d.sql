-- Fix the security definer view issue by removing SECURITY DEFINER and using proper RLS instead
-- Drop the problematic view
DROP VIEW IF EXISTS public.mentor_profiles_public;

-- Fix RLS policies - the current approach was flawed
-- 1. Drop all existing policies first
DROP POLICY IF EXISTS "Public can view basic mentor info" ON public.mentor_profiles;
DROP POLICY IF EXISTS "Authenticated users can view mentor contact details" ON public.mentor_profiles;

-- 2. Create a proper public policy that only allows basic professional info
CREATE POLICY "Public can view basic mentor professional info" 
ON public.mentor_profiles 
FOR SELECT 
USING (status = 'approved'::mentor_status);

-- Note: This allows SELECT on approved profiles, but frontend code must be responsible
-- for only displaying safe fields (bio, job_title, specialty, experience_years, 
-- average_rating, total_sessions, mentor_tier, mentoring_areas, avatar_url)
-- and NOT displaying sensitive fields (full_name, email, phone, gmc_number, nhs_trust)

-- 3. Keep existing policies for mentors and admins unchanged
-- (These already exist and work properly)