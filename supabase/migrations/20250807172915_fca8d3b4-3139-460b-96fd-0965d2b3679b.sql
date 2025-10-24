-- Add SQL function to get top referrers for analytics
CREATE OR REPLACE FUNCTION public.get_top_referrers(
  time_filter TIMESTAMPTZ DEFAULT '2020-01-01'::TIMESTAMPTZ,
  limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
  user_id UUID,
  referrer_type TEXT,
  display_name TEXT,
  email TEXT,
  total_referrals BIGINT,
  confirmed_referrals BIGINT,
  total_rewards NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    rt.referrer_id,
    rt.referrer_type,
    COALESCE(p.display_name, p.first_name || ' ' || p.last_name, 'Unknown') as display_name,
    p.email,
    COUNT(rt.id) as total_referrals,
    COUNT(rt.id) FILTER (WHERE rt.subscription_confirmed = true) as confirmed_referrals,
    COALESCE(SUM(rt.reward_amount) FILTER (WHERE rt.subscription_confirmed = true), 0) as total_rewards
  FROM public.referral_tracking rt
  LEFT JOIN public.profiles p ON rt.referrer_id = p.user_id
  WHERE rt.created_at >= time_filter
  GROUP BY rt.referrer_id, rt.referrer_type, p.display_name, p.first_name, p.last_name, p.email
  ORDER BY total_referrals DESC, total_rewards DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Add function to update mentor earnings
CREATE OR REPLACE FUNCTION public.update_mentor_earnings(
  mentor_profile_id UUID,
  amount_to_add DECIMAL
)
RETURNS VOID AS $$
BEGIN
  UPDATE public.mentor_profiles
  SET total_earnings = total_earnings + amount_to_add
  WHERE id = mentor_profile_id;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to auto-generate referral codes for new mentor profiles
CREATE OR REPLACE FUNCTION public.auto_generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := public.generate_referral_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_generate_referral_code
  BEFORE INSERT ON public.mentor_profiles
  FOR EACH ROW EXECUTE FUNCTION public.auto_generate_referral_code();