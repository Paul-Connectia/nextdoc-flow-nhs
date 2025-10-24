-- Complete mentor ecosystem setup in correct order

-- 1. Create all enums first
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'mentor', 'hr_partner', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TYPE public.mentor_status AS ENUM ('pending', 'approved', 'rejected', 'suspended', 'inactive');
CREATE TYPE public.mentor_tier AS ENUM ('associate', 'senior', 'principal');  
CREATE TYPE public.application_status AS ENUM ('submitted', 'under_review', 'approved', 'rejected', 'info_requested');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- 3. Create mentor ecosystem tables
CREATE TABLE public.mentor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  gmc_number TEXT,
  specialty TEXT,
  nhs_trust TEXT,
  job_title TEXT,
  experience_years INTEGER,
  mentor_tier public.mentor_tier DEFAULT 'associate',
  status public.mentor_status DEFAULT 'pending',
  bio TEXT,
  avatar_url TEXT,
  mentoring_areas TEXT[],
  hourly_rate DECIMAL(10,2),
  calendly_link TEXT,
  stripe_account_id TEXT,
  total_sessions INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0.0,
  total_earnings DECIMAL(10,2) DEFAULT 0.0,
  referral_code TEXT UNIQUE,
  is_verified BOOLEAN DEFAULT false,
  verification_documents JSONB DEFAULT '{}',
  availability_schedule JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.mentor_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  application_data JSONB NOT NULL,
  status public.application_status DEFAULT 'submitted',
  admin_notes TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  documents JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.referral_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  referrer_type TEXT NOT NULL,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL,
  subscription_confirmed BOOLEAN DEFAULT false,
  reward_amount DECIMAL(10,2),
  reward_currency TEXT DEFAULT 'GBP',
  payout_status TEXT DEFAULT 'pending',
  payout_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.admin_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  action_type TEXT NOT NULL,
  target_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  target_table TEXT,
  target_id UUID,
  action_details JSONB,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.mentorship_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID REFERENCES public.mentor_profiles(id) ON DELETE CASCADE NOT NULL,
  mentee_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_type TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled',
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  meeting_link TEXT,
  session_notes TEXT,
  mentor_feedback TEXT,
  mentee_feedback TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  amount DECIMAL(10,2),
  currency TEXT DEFAULT 'GBP',
  payment_status TEXT DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.hr_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  referral_code TEXT UNIQUE,
  total_referrals INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0.0,
  payout_details JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_partners ENABLE ROW LEVEL SECURITY;

-- 5. Helper function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create all RLS policies
CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Mentors can view and update their own profile" ON public.mentor_profiles
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view approved mentor profiles" ON public.mentor_profiles
FOR SELECT USING (status = 'approved');

CREATE POLICY "Admins can manage all mentor profiles" ON public.mentor_profiles
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own applications" ON public.mentor_applications
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications" ON public.mentor_applications
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all applications" ON public.mentor_applications
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own referrals" ON public.referral_tracking
FOR SELECT USING (auth.uid() = referrer_id OR auth.uid() = referred_user_id);

CREATE POLICY "Users can create referrals" ON public.referral_tracking
FOR INSERT WITH CHECK (auth.uid() = referrer_id);

CREATE POLICY "Admins can manage all referrals" ON public.referral_tracking
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage admin actions" ON public.admin_actions
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own sessions" ON public.mentorship_sessions
FOR SELECT USING (
  auth.uid() = mentee_id OR 
  auth.uid() = (SELECT user_id FROM public.mentor_profiles WHERE id = mentor_id)
);

CREATE POLICY "Mentors and mentees can update their sessions" ON public.mentorship_sessions
FOR UPDATE USING (
  auth.uid() = mentee_id OR 
  auth.uid() = (SELECT user_id FROM public.mentor_profiles WHERE id = mentor_id)
);

CREATE POLICY "Mentees can create sessions" ON public.mentorship_sessions
FOR INSERT WITH CHECK (auth.uid() = mentee_id);

CREATE POLICY "Admins can manage all sessions" ON public.mentorship_sessions
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "HR partners can view and update their own profile" ON public.hr_partners
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all HR partners" ON public.hr_partners
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- 7. Create indexes
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_mentor_profiles_user_id ON public.mentor_profiles(user_id);
CREATE INDEX idx_mentor_profiles_status ON public.mentor_profiles(status);
CREATE INDEX idx_mentor_applications_status ON public.mentor_applications(status);
CREATE INDEX idx_referral_tracking_referrer_id ON public.referral_tracking(referrer_id);
CREATE INDEX idx_mentorship_sessions_mentor_id ON public.mentorship_sessions(mentor_id);
CREATE INDEX idx_mentorship_sessions_mentee_id ON public.mentorship_sessions(mentee_id);

-- 8. Create triggers
CREATE TRIGGER update_mentor_profiles_updated_at
  BEFORE UPDATE ON public.mentor_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mentor_applications_updated_at
  BEFORE UPDATE ON public.mentor_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_referral_tracking_updated_at
  BEFORE UPDATE ON public.referral_tracking
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mentorship_sessions_updated_at
  BEFORE UPDATE ON public.mentorship_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hr_partners_updated_at
  BEFORE UPDATE ON public.hr_partners
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 9. Utility functions
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT AS $$
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
$$ LANGUAGE plpgsql;