export interface InstagramVerificationData {
  id: string;
  user_id: string;
  instagram_username: string;
  instagram_user_id: string;
  follow_verified_at: string;
  last_follow_check: string;
  follow_status: 'active' | 'unfollowed' | 'pending';
  access_revoked_at: string | null;
}

export interface InstagramUsageData {
  id: string;
  user_id: string;
  feature_type: string;
  usage_count: number;
  usage_date: string; // YYYY-MM-DD
}

export type InstagramFeatureType = 
  | 'quiz' 
  | 'writing' 
  | 'speaking' 
  | 'reading' 
  | 'transcript' 
  | 'chat' 
  | 'gapmap';

export interface InstagramGateConfig {
  featureName: string;
  dailyLimit: number;
  icon: React.ReactNode;
  description: string;
}
