import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { InstagramVerificationData } from '@/types/instagram';

interface InstagramContextType {
  isVerified: boolean;
  verificationData: InstagramVerificationData | null;
  isLoading: boolean;
  openGateModal: (feature: string) => void;
  closeGateModal: () => void;
  gateModalOpen: boolean;
  gateModalFeature: string;
  refreshVerification: () => Promise<void>;
}

const InstagramContext = createContext<InstagramContextType | undefined>(undefined);

export const useInstagramContext = () => {
  const context = useContext(InstagramContext);
  if (!context) {
    throw new Error('useInstagramContext must be used within InstagramProvider');
  }
  return context;
};

export const InstagramProvider = ({ children }: { children: ReactNode }) => {
  const [verificationData, setVerificationData] = useState<InstagramVerificationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gateModalOpen, setGateModalOpen] = useState(false);
  const [gateModalFeature, setGateModalFeature] = useState('');

  const fetchVerification = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setVerificationData(null);
        setIsLoading(false);
        return;
      }

      // TODO: Replace with actual Supabase query when table is created
      // const { data, error } = await supabase
      //   .from('instagram_verified_users')
      //   .select('*')
      //   .eq('user_id', session.user.id)
      //   .eq('follow_status', 'active')
      //   .single();

      // if (!error && data) {
      //   setVerificationData(data as InstagramVerificationData);
      // } else {
      //   setVerificationData(null);
      // }

      // Temporary: Check localStorage for verification status
      const cachedVerification = localStorage.getItem('instagram_verification');
      if (cachedVerification) {
        setVerificationData(JSON.parse(cachedVerification));
      } else {
        setVerificationData(null);
      }
    } catch (error) {
      console.error('Error fetching Instagram verification:', error);
      setVerificationData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshVerification = async () => {
    setIsLoading(true);
    await fetchVerification();
  };

  const openGateModal = (feature: string) => {
    setGateModalFeature(feature);
    setGateModalOpen(true);
  };

  const closeGateModal = () => {
    setGateModalOpen(false);
    setGateModalFeature('');
  };

  useEffect(() => {
    fetchVerification();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN') {
        await fetchVerification();
      } else if (event === 'SIGNED_OUT') {
        setVerificationData(null);
        localStorage.removeItem('instagram_verification');
      }
    });

    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchVerification, 5 * 60 * 1000);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const value: InstagramContextType = {
    isVerified: !!verificationData && verificationData.follow_status === 'active',
    verificationData,
    isLoading,
    openGateModal,
    closeGateModal,
    gateModalOpen,
    gateModalFeature,
    refreshVerification,
  };

  return (
    <InstagramContext.Provider value={value}>
      {children}
    </InstagramContext.Provider>
  );
};
