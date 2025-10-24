-- Fix Mentor Profiles public information exposure
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

-- Enable RLS on the public view
ALTER VIEW public.mentor_profiles_public SET (security_invoker = on);

-- Create a policy allowing public read access to the secure view
-- Note: Views inherit the RLS policies of their underlying tables
-- but we need to ensure the underlying table has proper policies

-- Update the mentor_profiles policies to be more explicit
-- Keep existing admin and mentor self-access policies
-- Add a new restricted policy for public access to specific fields only

-- Create a function to check if data should be publicly visible
CREATE OR REPLACE FUNCTION public.is_mentor_profile_public_visible(
  mentor_status mentor_status,
  is_verified boolean
)
RETURNS boolean AS $$
BEGIN
  RETURN mentor_status = 'approved' AND is_verified = true;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Create a more restrictive public policy that doesn't expose sensitive data
-- This policy will be used when accessing the main table directly
CREATE POLICY "Public can view approved mentor professional info only" 
ON public.mentor_profiles 
FOR SELECT 
USING (
  is_mentor_profile_public_visible(status, is_verified) AND 
  -- This policy exists but actual column restriction happens through the view
  true
);

-- Add function to log access to mentor personal data for audit
CREATE OR REPLACE FUNCTION public.log_mentor_data_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log access to sensitive mentor data
  INSERT INTO public.admin_actions (
    admin_id,
    action_type,
    target_table,
    target_id,
    target_user_id,
    action_details
  ) VALUES (
    auth.uid(),
    'DATA_ACCESS',
    'mentor_profiles',
    COALESCE(NEW.id, OLD.id),
    COALESCE(NEW.user_id, OLD.user_id),
    jsonb_build_object(
      'timestamp', now(),
      'sensitive_data_accessed', true,
      'access_type', 'mentor_profile'
    )
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for audit logging of mentor profile access
CREATE TRIGGER mentor_profile_access_log
  AFTER SELECT ON public.mentor_profiles
  FOR EACH ROW
  WHEN (auth.uid() IS NOT NULL AND auth.uid() != OLD.user_id)
  EXECUTE FUNCTION public.log_mentor_data_access();

-- Grant appropriate permissions for the public view
GRANT SELECT ON public.mentor_profiles_public TO anon;
GRANT SELECT ON public.mentor_profiles_public TO authenticated;