-- Ensure RLS remains strict on profiles and add admin-only read access
-- 1) Keep existing owner-only policies (unchanged)
-- 2) Add explicit admin SELECT policy so admins can view all profiles

-- Enable RLS (no-op if already enabled)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Add/refresh admin read policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));
