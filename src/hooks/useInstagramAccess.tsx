import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useInstagramContext } from '@/contexts/InstagramContext';
import { InstagramFeatureType } from '@/types/instagram';
import { useSubscription } from '@/hooks/useSubscription';

const DAILY_LIMITS: Record<InstagramFeatureType, number> = {
  quiz: 5,
  writing: 1,
  speaking: 1,
  reading: 1,
  transcript: 1,
  chat: 10,
  gapmap: 1,
};

interface DailyUsage {
  quiz: number;
  writing: number;
  speaking: number;
  reading: number;
  transcript: number;
  chat: number;
  gapmap: number;
}

export const useInstagramAccess = () => {
  const { isVerified, verificationData, openGateModal, refreshVerification, isLoading: contextLoading } = useInstagramContext();
  const { subscriptionTier } = useSubscription();
  const [dailyUsage, setDailyUsage] = useState<DailyUsage>({
    quiz: 0,
    writing: 0,
    speaking: 0,
    reading: 0,
    transcript: 0,
    chat: 0,
    gapmap: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const isPaidUser = subscriptionTier === 'pro' || subscriptionTier === 'core' || subscriptionTier === 'elite';

  const fetchDailyUsage = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsLoading(false);
        return;
      }

      // TODO: Replace with actual Supabase query when table is created
      // const today = new Date().toISOString().split('T')[0];
      // const { data, error } = await supabase
      //   .from('instagram_usage_tracking')
      //   .select('*')
      //   .eq('user_id', session.user.id)
      //   .eq('usage_date', today);

      // if (!error && data) {
      //   const usage: DailyUsage = {
      //     quiz: 0,
      //     writing: 0,
      //     speaking: 0,
      //     reading: 0,
      //     transcript: 0,
      //     chat: 0,
      //     gapmap: 0,
      //   };
      //   data.forEach((record) => {
      //     const type = record.feature_type as InstagramFeatureType;
      //     usage[type] = record.usage_count;
      //   });
      //   setDailyUsage(usage);
      // }

      // Temporary: Get from localStorage
      const cachedUsage = localStorage.getItem(`instagram_usage_${new Date().toISOString().split('T')[0]}`);
      if (cachedUsage) {
        setDailyUsage(JSON.parse(cachedUsage));
      }
    } catch (error) {
      console.error('Error fetching daily usage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyUsage();
  }, []);

  const canAccess = (feature: InstagramFeatureType): boolean => {
    // Paid users always have access
    if (isPaidUser) return true;

    // Instagram verified users have daily limits
    if (isVerified) {
      const limit = DAILY_LIMITS[feature];
      const used = dailyUsage[feature];
      return used < limit;
    }

    // Non-verified, non-paid users have no access
    return false;
  };

  const remainingUses = (feature: InstagramFeatureType): number => {
    if (isPaidUser) return Infinity;
    if (!isVerified) return 0;
    
    const limit = DAILY_LIMITS[feature];
    const used = dailyUsage[feature];
    return Math.max(0, limit - used);
  };

  const trackUsage = async (feature: InstagramFeatureType): Promise<void> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // TODO: Replace with actual Supabase mutation when table is created
      // await supabase.functions.invoke('track-instagram-usage', {
      //   body: { feature_type: feature }
      // });

      // Temporary: Update localStorage
      const today = new Date().toISOString().split('T')[0];
      const updated = { ...dailyUsage, [feature]: dailyUsage[feature] + 1 };
      setDailyUsage(updated);
      localStorage.setItem(`instagram_usage_${today}`, JSON.stringify(updated));
    } catch (error) {
      console.error('Error tracking usage:', error);
    }
  };

  return {
    isInstagramVerified: isVerified,
    instagramUsername: verificationData?.instagram_username || null,
    followStatus: verificationData?.follow_status || null,
    dailyUsage,
    canAccess,
    remainingUses,
    trackUsage,
    openVerificationModal: openGateModal,
    refreshVerification,
    isLoading: contextLoading || isLoading,
    isPaidUser,
  };
};
