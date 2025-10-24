-- Fix Security Definer functions that don't need SECURITY DEFINER privilege
-- Only keep SECURITY DEFINER for functions that truly need elevated privileges

-- 1. Fix log_hr_partner_access - this needs SECURITY DEFINER to log admin actions
-- Keep this one as is since it needs to log audit trails

-- 2. Fix has_role function - remove SECURITY DEFINER since it's just reading user_roles
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
END;
$$ LANGUAGE plpgsql STABLE SET search_path = 'public';

-- 3. Keep handle_new_user as SECURITY DEFINER since it needs to create profiles
-- This one is correct as is

-- 4. Fix other functions that might not need SECURITY DEFINER
-- Update generate_referral_code to not use SECURITY DEFINER
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

-- Comment explaining the Security Definer usage
COMMENT ON FUNCTION public.log_hr_partner_access() IS 'Uses SECURITY DEFINER to allow audit logging of sensitive HR partner data access';
COMMENT ON FUNCTION public.handle_new_user() IS 'Uses SECURITY DEFINER to allow creating user profiles upon signup';