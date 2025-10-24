-- Enhanced mentor interaction system tables

-- Add Calendly integration fields to mentor_profiles
ALTER TABLE public.mentor_profiles 
ADD COLUMN calendly_username TEXT,
ADD COLUMN calendly_webhook_url TEXT,
ADD COLUMN video_platform TEXT DEFAULT 'zoom',
ADD COLUMN hourly_rate INTEGER DEFAULT 5000, -- in pence
ADD COLUMN zoom_account_connected BOOLEAN DEFAULT false,
ADD COLUMN google_meet_connected BOOLEAN DEFAULT false,
ADD COLUMN total_sessions INTEGER DEFAULT 0,
ADD COLUMN average_rating DECIMAL(3,2) DEFAULT 0.00,
ADD COLUMN earnings_total INTEGER DEFAULT 0;

-- Create mentor availability table
CREATE TABLE public.mentor_availability (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mentor_id UUID NOT NULL REFERENCES public.mentor_profiles(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL, -- 0=Sunday, 1=Monday, etc.
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'Europe/London',
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create mentorship sessions table
CREATE TABLE public.mentorship_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  mentor_id UUID NOT NULL REFERENCES public.mentor_profiles(id) ON DELETE CASCADE,
  session_type TEXT NOT NULL, -- 'cv_review', 'interview_prep', 'career_guidance', 'general'
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  amount INTEGER NOT NULL, -- in pence
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
  stripe_session_id TEXT,
  video_link TEXT,
  meeting_id TEXT,
  user_notes TEXT,
  mentor_notes TEXT,
  user_rating INTEGER, -- 1-5
  mentor_rating INTEGER, -- 1-5
  user_feedback TEXT,
  mentor_feedback TEXT,
  calendly_event_id TEXT,
  zoom_meeting_id TEXT,
  google_meet_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create session payments table
CREATE TABLE public.session_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.mentorship_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  mentor_id UUID NOT NULL REFERENCES public.mentor_profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- in pence
  platform_fee INTEGER NOT NULL, -- in pence (20% of amount)
  mentor_payout INTEGER NOT NULL, -- in pence (amount - platform_fee)
  stripe_payment_intent_id TEXT,
  stripe_transfer_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create mentor reviews table
CREATE TABLE public.mentor_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.mentorship_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  mentor_id UUID NOT NULL REFERENCES public.mentor_profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  would_recommend BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.mentor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for mentor_availability
CREATE POLICY "Mentors can manage their own availability" 
ON public.mentor_availability 
FOR ALL 
USING (mentor_id IN (SELECT id FROM public.mentor_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Anyone can view mentor availability" 
ON public.mentor_availability 
FOR SELECT 
USING (true);

-- RLS Policies for mentorship_sessions
CREATE POLICY "Users can manage their own sessions" 
ON public.mentorship_sessions 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Mentors can manage their sessions" 
ON public.mentorship_sessions 
FOR ALL 
USING (mentor_id IN (SELECT id FROM public.mentor_profiles WHERE user_id = auth.uid()));

-- RLS Policies for session_payments
CREATE POLICY "Users can view their own payments" 
ON public.session_payments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Mentors can view their payments" 
ON public.session_payments 
FOR SELECT 
USING (mentor_id IN (SELECT id FROM public.mentor_profiles WHERE user_id = auth.uid()));

CREATE POLICY "System can insert payments" 
ON public.session_payments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "System can update payments" 
ON public.session_payments 
FOR UPDATE 
USING (true);

-- RLS Policies for mentor_reviews
CREATE POLICY "Users can manage their own reviews" 
ON public.mentor_reviews 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Mentors can view their reviews" 
ON public.mentor_reviews 
FOR SELECT 
USING (mentor_id IN (SELECT id FROM public.mentor_profiles WHERE user_id = auth.uid()));

-- Create indexes for performance
CREATE INDEX idx_mentor_availability_mentor_id ON public.mentor_availability(mentor_id);
CREATE INDEX idx_mentorship_sessions_user_id ON public.mentorship_sessions(user_id);
CREATE INDEX idx_mentorship_sessions_mentor_id ON public.mentorship_sessions(mentor_id);
CREATE INDEX idx_mentorship_sessions_status ON public.mentorship_sessions(status);
CREATE INDEX idx_session_payments_session_id ON public.session_payments(session_id);
CREATE INDEX idx_mentor_reviews_mentor_id ON public.mentor_reviews(mentor_id);

-- Create trigger for updated_at columns
CREATE TRIGGER update_mentor_availability_updated_at 
BEFORE UPDATE ON public.mentor_availability 
FOR EACH ROW 
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mentorship_sessions_updated_at 
BEFORE UPDATE ON public.mentorship_sessions 
FOR EACH ROW 
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to calculate mentor statistics
CREATE OR REPLACE FUNCTION public.update_mentor_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update mentor statistics when a session is completed or reviewed
  IF NEW.status = 'completed' OR (OLD.user_rating IS NULL AND NEW.user_rating IS NOT NULL) THEN
    UPDATE public.mentor_profiles 
    SET 
      total_sessions = (
        SELECT COUNT(*) 
        FROM public.mentorship_sessions 
        WHERE mentor_id = NEW.mentor_id AND status = 'completed'
      ),
      average_rating = (
        SELECT COALESCE(AVG(user_rating), 0) 
        FROM public.mentorship_sessions 
        WHERE mentor_id = NEW.mentor_id AND user_rating IS NOT NULL
      ),
      earnings_total = (
        SELECT COALESCE(SUM(mentor_payout), 0) 
        FROM public.session_payments 
        WHERE mentor_id = NEW.mentor_id AND status = 'completed'
      )
    WHERE id = NEW.mentor_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update mentor stats
CREATE TRIGGER update_mentor_stats_trigger
AFTER UPDATE ON public.mentorship_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_mentor_stats();