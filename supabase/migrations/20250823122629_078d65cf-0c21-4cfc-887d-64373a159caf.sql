-- Fix Mentor Profiles public information exposure (corrected version)
-- Remove the overly permissive public policy that exposes all personal data
DROP POLICY IF EXISTS "Public can view basic mentor professional info" ON public.mentor_profiles;

-- Create a secure public view that only exposes non-sensitive mentor information
CREATE OR REPLACE VIEW public.mentor_profiles_public AS
SELECT 
  id,
  full_name,
  specialty,
  bio,
  job_title,
  nhs_trust,
  experience_years,
  mentor_tier,
  average_rating,
  total_sessions,
  mentoring_areas,
  avatar_url,
  calendly_link,
  created_at,
  updated_at
FROM public.mentor_profiles 
WHERE status = 'approved' AND is_verified = true;

-- Create a function to check if data should be publicly visible
CREATE OR REPLACE FUNCTION public.is_mentor_profile_public_visible(
  mentor_status mentor_status,
  is_verified boolean
)
RETURNS boolean AS $$
BEGIN
  RETURN mentor_status = 'approved' AND is_verified = true;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Create a more restrictive public policy for the main table
-- This ensures that even direct table access doesn't expose sensitive data
CREATE POLICY "Public can view approved mentors via view only" 
ON public.mentor_profiles 
FOR SELECT 
USING (false); -- Deny direct public access to main table

-- Allow public access only through the secure view
GRANT SELECT ON public.mentor_profiles_public TO anon;
GRANT SELECT ON public.mentor_profiles_public TO authenticated;

-- Ensure the view is properly secured
COMMENT ON VIEW public.mentor_profiles_public IS 'Public view of mentor profiles that excludes sensitive personal information like email, phone, and GMC numbers';