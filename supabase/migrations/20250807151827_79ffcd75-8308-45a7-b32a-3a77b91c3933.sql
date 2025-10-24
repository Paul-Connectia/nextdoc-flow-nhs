-- Create plab_questions table for quiz content
CREATE TABLE public.plab_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer TEXT NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  rationale TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Basic', 'Core', 'Advanced')),
  cpd_tag BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz_sessions table for user progress tracking
CREATE TABLE public.quiz_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  quiz_type TEXT NOT NULL,
  current_question INTEGER DEFAULT 1,
  total_questions INTEGER NOT NULL,
  answers JSONB DEFAULT '[]'::jsonb,
  flagged_questions INTEGER[] DEFAULT '{}',
  filters JSONB DEFAULT '{}'::jsonb,
  completed BOOLEAN DEFAULT false,
  score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create interview_questions table for InterviewSim
CREATE TABLE public.interview_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_text TEXT NOT NULL,
  role TEXT NOT NULL,
  specialty TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Basic', 'Intermediate', 'Advanced')),
  question_type TEXT NOT NULL CHECK (question_type IN ('scenario', 'behavioral', 'technical', 'ethical')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create study_materials table for PDF metadata
CREATE TABLE public.study_materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('PLAB', 'MRCP', 'CPD')),
  file_path TEXT NOT NULL,
  subscription_required TEXT NOT NULL CHECK (subscription_required IN ('Free', 'Core', 'Elite')),
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_usage_tracking table for rate limiting
CREATE TABLE public.user_usage_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  feature TEXT NOT NULL,
  usage_count INTEGER DEFAULT 0,
  reset_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, feature, reset_date)
);

-- Create cpd_modules table
CREATE TABLE public.cpd_modules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content_url TEXT,
  certificate_template TEXT,
  credits INTEGER DEFAULT 1,
  category TEXT NOT NULL,
  subscription_required TEXT NOT NULL CHECK (subscription_required IN ('Free', 'Core', 'Elite')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cpd_completions table
CREATE TABLE public.cpd_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  module_id UUID NOT NULL REFERENCES public.cpd_modules(id),
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  certificate_url TEXT,
  score INTEGER,
  UNIQUE(user_id, module_id)
);

-- Create nhs_trusts table for SponsorMatch
CREATE TABLE public.nhs_trusts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  sponsorship_license BOOLEAN DEFAULT false,
  license_expiry DATE,
  specialties TEXT[],
  contact_email TEXT,
  website_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.plab_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cpd_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cpd_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nhs_trusts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Anyone can read questions" ON public.plab_questions FOR SELECT USING (true);
CREATE POLICY "Users can manage their own quiz sessions" ON public.quiz_sessions FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anyone can read interview questions" ON public.interview_questions FOR SELECT USING (true);
CREATE POLICY "Anyone can read study materials" ON public.study_materials FOR SELECT USING (true);
CREATE POLICY "Users can manage their own usage tracking" ON public.user_usage_tracking FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anyone can read CPD modules" ON public.cpd_modules FOR SELECT USING (true);
CREATE POLICY "Users can manage their own CPD completions" ON public.cpd_completions FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anyone can read NHS trusts" ON public.nhs_trusts FOR SELECT USING (true);

-- Create triggers for updated_at
CREATE TRIGGER update_plab_questions_updated_at BEFORE UPDATE ON public.plab_questions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_quiz_sessions_updated_at BEFORE UPDATE ON public.quiz_sessions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_interview_questions_updated_at BEFORE UPDATE ON public.interview_questions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_study_materials_updated_at BEFORE UPDATE ON public.study_materials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_usage_tracking_updated_at BEFORE UPDATE ON public.user_usage_tracking FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cpd_modules_updated_at BEFORE UPDATE ON public.cpd_modules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_nhs_trusts_updated_at BEFORE UPDATE ON public.nhs_trusts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();