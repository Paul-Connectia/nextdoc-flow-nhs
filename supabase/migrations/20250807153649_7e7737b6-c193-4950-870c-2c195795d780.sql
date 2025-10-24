-- Create storage buckets for study materials
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('study-materials', 'study-materials', false),
  ('plab-materials', 'plab-materials', false),
  ('mrcp-materials', 'mrcp-materials', false),
  ('cpd-materials', 'cpd-materials', false);

-- Create storage policies for study materials access
CREATE POLICY "Allow authenticated users to view study materials"
ON storage.objects FOR SELECT
USING (bucket_id IN ('study-materials', 'plab-materials', 'mrcp-materials', 'cpd-materials') AND auth.role() = 'authenticated');

CREATE POLICY "Allow service role to manage study materials"
ON storage.objects FOR ALL
USING (bucket_id IN ('study-materials', 'plab-materials', 'mrcp-materials', 'cpd-materials') AND auth.role() = 'service_role');

-- Create subscribers table for Stripe integration
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT DEFAULT 'free',
  subscription_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security on subscribers
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for subscribers
CREATE POLICY "Users can view their own subscription" ON public.subscribers
FOR SELECT USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "Users can update their own subscription" ON public.subscribers
FOR UPDATE USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "Insert subscription" ON public.subscribers
FOR INSERT WITH CHECK (true);

-- Create trigger for updated_at on subscribers
CREATE TRIGGER update_subscribers_updated_at
BEFORE UPDATE ON public.subscribers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();