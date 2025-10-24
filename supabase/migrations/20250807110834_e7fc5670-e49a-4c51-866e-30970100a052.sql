-- Create ai_queries table for logging AI search queries
CREATE TABLE public.ai_queries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  query TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  device TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ai_queries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert queries (for anonymous users)
CREATE POLICY "Anyone can insert ai queries" 
ON public.ai_queries 
FOR INSERT 
WITH CHECK (true);

-- Create policy to prevent reading queries (privacy)
CREATE POLICY "No one can read ai queries" 
ON public.ai_queries 
FOR SELECT 
USING (false);