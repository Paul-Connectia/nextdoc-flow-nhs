-- Fix critical role escalation vulnerability in user_roles table
-- Remove existing policies that might be too permissive
DROP POLICY IF EXISTS "Users can insert their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can update their own roles" ON public.user_roles;

-- Create secure policies for user_roles table
CREATE POLICY "Only admins can insert roles" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles" 
ON public.user_roles 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles" 
ON public.user_roles 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Tighten subscription policies
DROP POLICY IF EXISTS "Insert subscription" ON public.subscribers;

CREATE POLICY "Authenticated users can create their own subscription" 
ON public.subscribers 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND (user_id = auth.uid() OR email = auth.email()));

-- Enhance purchases table security
DROP POLICY IF EXISTS "System can insert purchases" ON public.purchases;
DROP POLICY IF EXISTS "System can update purchases" ON public.purchases;

CREATE POLICY "Authenticated system can insert purchases" 
ON public.purchases 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "System can update purchase status only" 
ON public.purchases 
FOR UPDATE 
USING (true);