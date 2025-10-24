
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionContextType {
  subscribed: boolean;
  subscriptionTier: string;
  subscriptionEnd: string | null;
  isLoading: boolean;
  checkSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState('free');
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const checkSubscription = async () => {
    try {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setSubscribed(false);
        setSubscriptionTier('free');
        setSubscriptionEnd(null);
        return;
      }

      console.log('Checking subscription status...');
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Subscription check error:', error);
        toast({
          title: "Error checking subscription",
          description: "Please try again later.",
          variant: "destructive"
        });
        return;
      }

      console.log('Subscription data:', data);
      
      if (data) {
        setSubscribed(data.subscribed || false);
        setSubscriptionTier(data.subscription_tier || 'free');
        setSubscriptionEnd(data.subscription_end || null);
      }
    } catch (error) {
      console.error('Subscription check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check subscription on mount and auth changes
    checkSubscription();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        checkSubscription();
      } else if (event === 'SIGNED_OUT') {
        setSubscribed(false);
        setSubscriptionTier('free');
        setSubscriptionEnd(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SubscriptionContext.Provider value={{
      subscribed,
      subscriptionTier,
      subscriptionEnd,
      isLoading,
      checkSubscription
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};
