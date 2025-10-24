-- Fix Security Definer View warning by removing only functions that don't need it
-- The has_role function MUST keep SECURITY DEFINER for RLS policies to work properly

-- Remove SECURITY DEFINER from generate_referral_code function only
DROP FUNCTION IF EXISTS public.generate_referral_code();

CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS text AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    code := upper(substring(md5(random()::text) for 8));
    
    SELECT EXISTS(
      SELECT 1 FROM public.mentor_profiles WHERE referral_code = code
      UNION
      SELECT 1 FROM public.hr_partners WHERE referral_code = code
    ) INTO exists_check;
    
    EXIT WHEN NOT exists_check;
  END LOOP;
  
  RETURN code;
END;
$$ LANGUAGE plpgsql SET search_path = 'public';

-- Add documentation comments for the remaining SECURITY DEFINER functions
COMMENT ON FUNCTION public.has_role(uuid, app_role) IS 'Uses SECURITY DEFINER to avoid infinite recursion in RLS policies. Required for proper role-based access control.';
COMMENT ON FUNCTION public.log_hr_partner_access() IS 'Uses SECURITY DEFINER to allow audit logging of sensitive HR partner data access regardless of user permissions.';
COMMENT ON FUNCTION public.handle_new_user() IS 'Uses SECURITY DEFINER to allow creating user profiles upon signup regardless of RLS policies.';