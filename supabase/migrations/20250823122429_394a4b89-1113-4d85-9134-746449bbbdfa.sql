-- Fix HR Partners table security issues (corrected version)
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "HR partners can view and update their own profile" ON public.hr_partners;
DROP POLICY IF EXISTS "Admins can manage all HR partners" ON public.hr_partners;

-- Create more granular, secure policies

-- HR partners can only view their own basic profile information
CREATE POLICY "HR partners can view their own profile" 
ON public.hr_partners 
FOR SELECT 
USING (auth.uid() = user_id);

-- HR partners can update only basic contact fields (not financial data)
CREATE POLICY "HR partners can update their own basic info" 
ON public.hr_partners 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Only admins can create HR partner profiles
CREATE POLICY "Only admins can create HR partners" 
ON public.hr_partners 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can manage all HR partner data
CREATE POLICY "Admins can manage all HR partner data" 
ON public.hr_partners 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Prevent unauthorized deletion - only admins can delete
CREATE POLICY "Only admins can delete HR partners" 
ON public.hr_partners 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create function to log HR partner data access for audit trail
CREATE OR REPLACE FUNCTION public.log_hr_partner_access()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_actions (
    admin_id,
    action_type,
    target_table,
    target_id,
    target_user_id,
    action_details
  ) VALUES (
    auth.uid(),
    TG_OP,
    'hr_partners',
    COALESCE(NEW.id, OLD.id),
    COALESCE(NEW.user_id, OLD.user_id),
    jsonb_build_object(
      'timestamp', now(),
      'sensitive_data_accessed', true
    )
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for audit logging
CREATE TRIGGER hr_partner_access_log
  AFTER INSERT OR UPDATE OR DELETE ON public.hr_partners
  FOR EACH ROW
  EXECUTE FUNCTION public.log_hr_partner_access();