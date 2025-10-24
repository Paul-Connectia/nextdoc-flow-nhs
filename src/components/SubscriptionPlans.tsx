
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap, Crown, Star, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useSubscription } from '@/hooks/useSubscription';
import { PRICES } from '@/config/pricing';
import { PriceDisplay } from '@/components/PriceDisplay';
import { CurrencySelector } from '@/components/CurrencySelector';

interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  description: string;
}

const SubscriptionPlans = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { subscribed, subscriptionTier, subscriptionEnd, isLoading: subscriptionLoading, checkSubscription } = useSubscription();
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');

  const plans: SubscriptionTier[] = [
    {
      id: 'pro-ai',
      name: 'Pro AI',
      price: PRICES.proAI.monthly,
      interval: 'month',
      icon: <Star className="h-5 w-5" />,
      description: 'Unlimited NextDoc AI',
      features: [
        'Unlimited AI chat',
        'Faster responses, deeper explanations',
        '“Ask Mentor AI” initiation',
        'Early feature access'
      ]
    },
    {
      id: 'core',
      name: 'Core',
      price: billingInterval === 'year' ? PRICES.core.yearly : PRICES.core.monthly,
      interval: billingInterval,
      popular: true,
      icon: <Zap className="h-5 w-5" />,
      description: 'Most value for active IMGs',
      features: [
        'Unlimited PLAB QBank',
        'NextDoc AI (unlimited)',
        '1 mentor session/mo',
        'Full CVPro™',
        'Basic CPD, GapMap Lite'
      ]
    },
    {
      id: 'elite',
      name: 'Elite',
      price: billingInterval === 'year' ? PRICES.elite.yearly : PRICES.elite.monthly,
      interval: billingInterval,
      icon: <Crown className="h-5 w-5" />,
      description: 'All-access for serious aspirants',
      features: [
        'Everything in Core',
        'Unlimited specialty QBanks',
        '3 mentor sessions/mo',
        'CPD Plus, InterviewSim+',
        'Priority features, portfolio review'
      ]
    }
  ];

  const handleUpgrade = async (planId: string, interval: 'month' | 'year' = 'month') => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to upgrade your subscription.",
          variant: "destructive"
        });
        return;
      }

      console.log('Creating checkout session for:', { planId, interval });
      const preferredCurrency = localStorage.getItem('preferred-currency') || 'GBP';
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          tier: planId,
          interval,
          currency: preferredCurrency
        }
      });

      if (error) {
        console.error('Checkout error:', error);
        throw error;
      }

      console.log('Checkout session created:', data);

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout failed",
        description: error?.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      console.log('Opening customer portal...');
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) {
        console.error('Portal error:', error);
        throw error;
      }

      console.log('Portal session created:', data);

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Portal error:', error);
      toast({
        title: "Error",
        description: error.message || "Unable to access customer portal.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshStatus = () => {
    checkSubscription();
    toast({
      title: "Refreshing subscription status...",
      description: "Please wait a moment.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Unlock your NHS career potential with our AI-first platform and mentor support
        </p>
        <div className="mt-4 flex flex-col items-center gap-3">
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshStatus}
              disabled={subscriptionLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${subscriptionLoading ? 'animate-spin' : ''}`} />
              Refresh Status
            </Button>
          </div>
          <div className="inline-flex rounded-md border">
            <button 
              className={`px-3 py-1 text-sm rounded-l-md ${billingInterval === 'month' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
              onClick={() => setBillingInterval('month')}
            >
              Monthly
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-r-md ${billingInterval === 'year' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
              onClick={() => setBillingInterval('year')}
            >
              Yearly
            </button>
          </div>
          <div className="mt-3">
            <CurrencySelector />
          </div>
        </div>
      </div>

      {/* Current Subscription Status */}
      {!subscriptionLoading && (
        <div className="text-center mb-8 p-4 bg-muted/50 rounded-lg max-w-md mx-auto">
          <h3 className="font-semibold mb-2">Current Status</h3>
          <div className="space-y-1 text-sm">
            <p>Plan: <Badge variant="secondary">{subscriptionTier}</Badge></p>
            <p>Active: {subscribed ? '✅ Yes' : '❌ No'}</p>
            {subscriptionEnd && (
              <p>Expires: {new Date(subscriptionEnd).toLocaleDateString()}</p>
            )}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative transition-all duration-300 hover:shadow-lg ${
              plan.popular ? 'border-2 border-primary scale-105' : ''
            } ${subscriptionTier === plan.id ? 'ring-2 ring-green-500' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            
            {subscriptionTier === plan.id && (
              <div className="absolute -top-3 right-4">
                <Badge className="bg-green-500 text-white px-3 py-1">
                  Current Plan
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                {plan.icon}
                <CardTitle className="text-xl">{plan.name}</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                  <PriceDisplay gbpPrice={plan.price} showCurrencySelector={false} size="lg" />
                  <span className="text-muted-foreground">/{plan.interval === 'year' ? 'yr' : 'mo'}</span>
                </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2">
                {subscriptionTier === plan.id ? (
                  plan.id === 'free' ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleUpgrade('core', 'month')}
                      disabled={isLoading}
                    >
                      Upgrade to Core
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleManageSubscription}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : 'Manage Subscription'}
                    </Button>
                  )
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => handleUpgrade(plan.id, (plan.interval === 'year' ? 'year' : 'month'))}
                    disabled={isLoading || plan.id === 'free'}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {isLoading ? 'Loading...' : plan.id === 'free' ? 'Current Plan' : `Upgrade to ${plan.name}`}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-muted/50 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="font-semibold mb-2">Need help choosing?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Start with Core for full access to our learning platform, or upgrade to Elite for premium mentorship and career support.
          </p>
          <Button variant="outline" size="sm">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
