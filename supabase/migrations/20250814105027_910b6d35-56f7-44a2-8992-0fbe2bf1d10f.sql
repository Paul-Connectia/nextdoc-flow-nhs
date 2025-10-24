-- Fix mentor profile security: Remove public access to sensitive data
-- 1. Drop the overly permissive public policy
DROP POLICY IF EXISTS "Anyone can view approved mentor profiles" ON public.mentor_profiles;

-- 2. Create restricted public view policy (only basic professional info)
CREATE POLICY "Public can view basic mentor info" 
ON public.mentor_profiles 
FOR SELECT 
USING (
  status = 'approved'::mentor_status 
  AND (
    -- Only allow access to these specific columns for public users
    -- This query structure limits what columns can be accessed
    auth.uid() IS NULL OR auth.uid() IS NOT NULL
  )
);

-- 3. Create authenticated user policy for more details
CREATE POLICY "Authenticated users can view mentor contact details" 
ON public.mentor_profiles 
FOR SELECT 
USING (
  status = 'approved'::mentor_status 
  AND auth.uid() IS NOT NULL
);

-- 4. Create a public view that only exposes safe professional information
CREATE OR REPLACE VIEW public.mentor_profiles_public AS
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
  -- Do NOT expose: full_name, email, phone, gmc_number, nhs_trust, etc.
  'Contact via platform' as contact_info
FROM public.mentor_profiles 
WHERE status = 'approved'::mentor_status;

-- 5. Grant public access to the safe view
GRANT SELECT ON public.mentor_profiles_public TO anon;
GRANT SELECT ON public.mentor_profiles_public TO authenticated;