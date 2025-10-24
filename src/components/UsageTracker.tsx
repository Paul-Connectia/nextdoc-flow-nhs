import { supabase } from '@/integrations/supabase/client';
import { InstagramFeatureType } from '@/types/instagram';

export async function trackInstagramUsage(
  userId: string,
  featureType: InstagramFeatureType
): Promise<{ success: boolean; remainingUses: number }> {
  try {
    // TODO: Replace with actual edge function call when implemented
    // const { data, error } = await supabase.functions.invoke('track-instagram-usage', {
    //   body: { feature_type: featureType }
    // });

    // if (error) throw error;

    // return {
    //   success: true,
    //   remainingUses: data.remaining_uses
    // };

    // Temporary: Update localStorage
    const today = new Date().toISOString().split('T')[0];
    const key = `instagram_usage_${today}`;
    const cached = localStorage.getItem(key);
    const usage = cached ? JSON.parse(cached) : {};
    
    usage[featureType] = (usage[featureType] || 0) + 1;
    localStorage.setItem(key, JSON.stringify(usage));

    // Return mock data
    const limits: Record<InstagramFeatureType, number> = {
      quiz: 5,
      writing: 1,
      speaking: 1,
      reading: 1,
      transcript: 1,
      chat: 10,
      gapmap: 1,
    };

    return {
      success: true,
      remainingUses: Math.max(0, limits[featureType] - usage[featureType])
    };
  } catch (error) {
    console.error('Error tracking Instagram usage:', error);
    return {
      success: false,
      remainingUses: 0
    };
  }
}
