-- Enhanced Mentor Ecosystem Database Schema

-- Create app roles enum if not exists
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'mentor', 'hr_partner', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create mentor verification status enum
CREATE TYPE public.mentor_status AS ENUM ('pending', 'approved', 'rejected', 'suspended', 'inactive');

-- Create mentor tier enum for referral system
CREATE TYPE public.mentor_tier AS ENUM ('associate', 'senior', 'principal');

-- Create application status enum
CREATE TYPE public.application_status AS ENUM ('submitted', 'under_review', 'approved', 'rejected', 'info_requested');

-- Enhanced mentor_profiles table
CREATE TABLE public.mentor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  gmc_number TEXT,
  specialty TEXT,
  nhs_trust TEXT,
  current_role TEXT,
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

-- Mentor applications tracking
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

-- Referral tracking system
CREATE TABLE public.referral_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  referrer_type TEXT NOT NULL, -- 'mentor' or 'hr_partner'
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL,
  subscription_confirmed BOOLEAN DEFAULT false,
  reward_amount DECIMAL(10,2),
  reward_currency TEXT DEFAULT 'GBP',
  payout_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'cancelled'
  payout_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Admin actions audit trail
CREATE TABLE public.admin_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  action_type TEXT NOT NULL, -- 'approve_mentor', 'reject_mentor', 'suspend_user', etc.
  target_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  target_table TEXT,
  target_id UUID,
  action_details JSONB,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enhanced mentorship sessions
CREATE TABLE public.mentorship_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID REFERENCES public.mentor_profiles(id) ON DELETE CASCADE NOT NULL,
  mentee_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_type TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled', 'no_show'
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

-- HR partners table
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

-- Enable RLS on all tables
ALTER TABLE public.mentor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_partners ENABLE ROW LEVEL SECURITY;

-- RLS Policies for mentor_profiles
CREATE POLICY "Mentors can view and update their own profile" ON public.mentor_profiles
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view approved mentor profiles" ON public.mentor_profiles
FOR SELECT USING (status = 'approved');

CREATE POLICY "Admins can manage all mentor profiles" ON public.mentor_profiles
FOR ALL USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- RLS Policies for mentor_applications
CREATE POLICY "Users can view their own applications" ON public.mentor_applications
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications" ON public.mentor_applications
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all applications" ON public.mentor_applications
FOR ALL USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- RLS Policies for referral_tracking
CREATE POLICY "Users can view their own referrals" ON public.referral_tracking
FOR SELECT USING (auth.uid() = referrer_id OR auth.uid() = referred_user_id);

CREATE POLICY "Users can create referrals" ON public.referral_tracking
FOR INSERT WITH CHECK (auth.uid() = referrer_id);

CREATE POLICY "Admins can manage all referrals" ON public.referral_tracking
FOR ALL USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- RLS Policies for admin_actions
CREATE POLICY "Admins can manage admin actions" ON public.admin_actions
FOR ALL USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- RLS Policies for mentorship_sessions
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
FOR ALL USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- RLS Policies for hr_partners
CREATE POLICY "HR partners can view and update their own profile" ON public.hr_partners
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all HR partners" ON public.hr_partners
FOR ALL USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Indexes for performance
CREATE INDEX idx_mentor_profiles_user_id ON public.mentor_profiles(user_id);
CREATE INDEX idx_mentor_profiles_status ON public.mentor_profiles(status);
CREATE INDEX idx_mentor_profiles_referral_code ON public.mentor_profiles(referral_code);
CREATE INDEX idx_mentor_applications_user_id ON public.mentor_applications(user_id);
CREATE INDEX idx_mentor_applications_status ON public.mentor_applications(status);
CREATE INDEX idx_referral_tracking_referrer_id ON public.referral_tracking(referrer_id);
CREATE INDEX idx_referral_tracking_code ON public.referral_tracking(referral_code);
CREATE INDEX idx_mentorship_sessions_mentor_id ON public.mentorship_sessions(mentor_id);
CREATE INDEX idx_mentorship_sessions_mentee_id ON public.mentorship_sessions(mentee_id);
CREATE INDEX idx_hr_partners_user_id ON public.hr_partners(user_id);
CREATE INDEX idx_hr_partners_referral_code ON public.hr_partners(referral_code);

-- Triggers for updated_at columns
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

-- Function to generate unique referral codes
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    code := upper(substring(md5(random()::text) for 8));
    
    -- Check if code exists in any referral table
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

-- Function to update mentor statistics
CREATE OR REPLACE FUNCTION public.update_mentor_statistics()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.mentor_profiles
  SET 
    total_sessions = (
      SELECT COUNT(*) 
      FROM public.mentorship_sessions 
      WHERE mentor_id = NEW.mentor_id AND status = 'completed'
    ),
    average_rating = (
      SELECT COALESCE(AVG(rating), 0) 
      FROM public.mentorship_sessions 
      WHERE mentor_id = NEW.mentor_id AND rating IS NOT NULL
    ),
    total_earnings = (
      SELECT COALESCE(SUM(amount), 0) 
      FROM public.mentorship_sessions 
      WHERE mentor_id = NEW.mentor_id AND payment_status = 'completed'
    )
  WHERE id = NEW.mentor_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update mentor statistics when sessions are updated
CREATE TRIGGER update_mentor_stats_trigger
  AFTER INSERT OR UPDATE ON public.mentorship_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_mentor_statistics();