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

-- Tighten subscription policies - replace overly permissive insert policy
DROP POLICY IF EXISTS "Insert subscription" ON public.subscribers;

CREATE POLICY "Authenticated users can create their own subscription" 
ON public.subscribers 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND (user_id = auth.uid() OR email = auth.email()));

-- Enhance purchases table security with more restrictive system policies
DROP POLICY IF EXISTS "System can insert purchases" ON public.purchases;
DROP POLICY IF EXISTS "System can update purchases" ON public.purchases;

CREATE POLICY "Authenticated system can insert purchases" 
ON public.purchases 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "System can update purchase status only" 
ON public.purchases 
FOR UPDATE 
USING (true)
WITH CHECK (
  -- Only allow updating specific safe fields
  OLD.user_id = NEW.user_id 
  AND OLD.product_id = NEW.product_id 
  AND OLD.stripe_session_id = NEW.stripe_session_id
);

-- Add audit logging trigger for sensitive operations
CREATE OR REPLACE FUNCTION public.log_role_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.admin_actions (
      admin_id, 
      action_type, 
      target_table, 
      target_id, 
      target_user_id,
      action_details,
      reason
    ) VALUES (
      auth.uid(),
      'ROLE_ASSIGNED',
      'user_roles',
      NEW.id,
      NEW.user_id,
      jsonb_build_object('role', NEW.role),
      'Role assignment via system'
    );
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.admin_actions (
      admin_id,
      action_type,
      target_table,
      target_id,
      target_user_id,
      action_details,
      reason
    ) VALUES (
      auth.uid(),
      'ROLE_REMOVED',
      'user_roles', 
      OLD.id,
      OLD.user_id,
      jsonb_build_object('role', OLD.role),
      'Role removal via system'
    );
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS role_changes_audit_log ON public.user_roles;
CREATE TRIGGER role_changes_audit_log
  AFTER INSERT OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.log_role_changes();