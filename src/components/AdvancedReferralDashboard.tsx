import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Gift,
  Copy,
  ExternalLink,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface ReferralData {
  id: string;
  referrer_id: string;
  referrer_type: string;
  referred_user_id: string;
  referral_code: string;
  subscription_confirmed: boolean;
  reward_amount: number;
  reward_currency: string;
  payout_status: 'pending' | 'paid' | 'cancelled';
  payout_date: string;
  created_at: string;
  profiles?: {
    display_name: string;
    email: string;
  };
}

interface ReferralStats {
  totalReferrals: number;
  confirmedReferrals: number;
  pendingPayouts: number;
  paidPayouts: number;
  totalRewards: number;
  conversionRate: number;
}

interface TopReferrer {
  user_id: string;
  referrer_type: string;
  display_name: string;
  email: string;
  total_referrals: number;
  confirmed_referrals: number;
  total_rewards: number;
}

const AdvancedReferralDashboard: React.FC = () => {
  const [referrals, setReferrals] = useState<ReferralData[]>([]);
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    confirmedReferrals: 0,
    pendingPayouts: 0,
    paidPayouts: 0,
    totalRewards: 0,
    conversionRate: 0,
  });
  const [topReferrers, setTopReferrers] = useState<TopReferrer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  useEffect(() => {
    loadReferralData();
  }, [selectedTimeframe]);

  const loadReferralData = async () => {
    setIsLoading(true);
    try {
      // Calculate date filter based on timeframe
      const now = new Date();
      const timeframeDate = (() => {
        switch (selectedTimeframe) {
          case '7d': return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          case '30d': return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          case '90d': return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          default: return new Date('2020-01-01'); // All time
        }
      })();

      // Load referral data
      const { data: referralData, error: referralError } = await supabase
        .from('referral_tracking')
        .select(`
          *,
          profiles:referred_user_id (
            display_name,
            email
          )
        `)
        .gte('created_at', timeframeDate.toISOString())
        .order('created_at', { ascending: false });

      if (referralError) throw referralError;
      setReferrals((referralData || []).map(r => ({
        ...r,
        profiles: (r.profiles as any) || { display_name: 'Unknown', email: '' }
      })) as ReferralData[]);

      // Calculate stats
      const totalReferrals = referralData?.length || 0;
      const confirmedReferrals = referralData?.filter(r => r.subscription_confirmed).length || 0;
      const pendingPayouts = referralData?.filter(r => r.payout_status === 'pending').reduce((sum, r) => sum + r.reward_amount, 0) || 0;
      const paidPayouts = referralData?.filter(r => r.payout_status === 'paid').reduce((sum, r) => sum + r.reward_amount, 0) || 0;
      const totalRewards = pendingPayouts + paidPayouts;
      const conversionRate = totalReferrals > 0 ? (confirmedReferrals / totalReferrals) * 100 : 0;

      setStats({
        totalReferrals,
        confirmedReferrals,
        pendingPayouts,
        paidPayouts,
        totalRewards,
        conversionRate,
      });

      // Load top referrers with direct query instead of RPC
      const { data: topReferrersData, error: topReferrersError } = await supabase
        .from('referral_tracking')
        .select(`
          referrer_id,
          referrer_type,
          profiles:referrer_id (display_name, email)
        `)
        .gte('created_at', timeframeDate.toISOString());

      if (!topReferrersError && topReferrersData) {
        // Group and calculate stats manually
        const referrerStats: {[key: string]: TopReferrer} = {};
        topReferrersData.forEach(ref => {
          const key = ref.referrer_id;
          if (!referrerStats[key]) {
            referrerStats[key] = {
              user_id: ref.referrer_id,
              referrer_type: ref.referrer_type,
              display_name: (ref.profiles as any)?.display_name || 'Unknown',
              email: (ref.profiles as any)?.email || '',
              total_referrals: 0,
              confirmed_referrals: 0,
              total_rewards: 0,
            };
          }
          referrerStats[key].total_referrals++;
        });
        
        setTopReferrers(Object.values(referrerStats).slice(0, 10));
      }

    } catch (error: any) {
      console.error('Error loading referral data:', error);
      toast.error('Failed to load referral data');
    } finally {
      setIsLoading(false);
    }
  };

  const processPayouts = async (referralIds: string[]) => {
    try {
      const { error } = await supabase
        .from('referral_tracking')
        .update({ 
          payout_status: 'paid', 
          payout_date: new Date().toISOString() 
        })
        .in('id', referralIds);

      if (error) throw error;

      toast.success('Payouts processed successfully');
      loadReferralData();
    } catch (error: any) {
      console.error('Error processing payouts:', error);
      toast.error('Failed to process payouts');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return CheckCircle;
      case 'pending': return Clock;
      case 'cancelled': return AlertCircle;
      default: return Clock;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Referral Analytics Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage the referral program performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={selectedTimeframe === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeframe('7d')}
          >
            7 Days
          </Button>
          <Button
            variant={selectedTimeframe === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeframe('30d')}
          >
            30 Days
          </Button>
          <Button
            variant={selectedTimeframe === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeframe('90d')}
          >
            90 Days
          </Button>
          <Button
            variant={selectedTimeframe === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeframe('all')}
          >
            All Time
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">
              {stats.confirmedReferrals} confirmed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate.toFixed(1)}%</div>
            <Progress value={stats.conversionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{stats.pendingPayouts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              awaiting processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{stats.totalRewards.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              £{stats.paidPayouts.toLocaleString()} paid out
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="referrals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="referrals">All Referrals</TabsTrigger>
          <TabsTrigger value="payouts">Payout Management</TabsTrigger>
          <TabsTrigger value="leaderboard">Top Referrers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="referrals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Referrals</CardTitle>
              <CardDescription>
                Track all referral activity across mentors and HR partners
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referrals.map((referral) => {
                  const StatusIcon = getStatusIcon(referral.payout_status);
                  return (
                    <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(referral.payout_status)}`} />
                        <div>
                          <p className="font-medium">
                            {referral.profiles?.display_name || 'Unknown User'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {referral.profiles?.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Referred {new Date(referral.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold">£{referral.reward_amount}</p>
                          <div className="flex items-center space-x-1">
                            <StatusIcon className="h-3 w-3" />
                            <span className="text-xs capitalize">{referral.payout_status}</span>
                          </div>
                        </div>
                        <Badge variant={referral.subscription_confirmed ? 'default' : 'secondary'}>
                          {referral.subscription_confirmed ? 'Confirmed' : 'Pending'}
                        </Badge>
                        <Badge variant="outline">
                          {referral.referrer_type}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payout Management</CardTitle>
              <CardDescription>
                Process pending referral rewards and manage payouts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referrals
                  .filter(r => r.payout_status === 'pending' && r.subscription_confirmed)
                  .map((referral) => (
                    <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{referral.profiles?.display_name}</p>
                        <p className="text-sm text-muted-foreground">
                          Referral Code: {referral.referral_code}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">£{referral.reward_amount}</span>
                        <Button 
                          size="sm" 
                          onClick={() => processPayouts([referral.id])}
                        >
                          Process Payout
                        </Button>
                      </div>
                    </div>
                  ))}
                
                {referrals.filter(r => r.payout_status === 'pending' && r.subscription_confirmed).length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No pending payouts at this time
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Referrers</CardTitle>
              <CardDescription>
                Recognise and reward your most successful referrers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topReferrers.map((referrer, index) => (
                  <div key={referrer.user_id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{referrer.display_name}</p>
                        <p className="text-sm text-muted-foreground">{referrer.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{referrer.total_referrals} referrals</p>
                      <p className="text-sm text-muted-foreground">
                        {referrer.confirmed_referrals} confirmed • £{referrer.total_rewards} earned
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Referral Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Conversion Rate</span>
                    <span>{stats.conversionRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={stats.conversionRate} />
                  
                  <div className="flex items-center justify-between">
                    <span>Average Reward</span>
                    <span>£{stats.totalReferrals > 0 ? (stats.totalRewards / stats.totalReferrals).toFixed(0) : 0}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Success Rate</span>
                    <span>{stats.totalReferrals > 0 ? ((stats.confirmedReferrals / stats.totalReferrals) * 100).toFixed(1) : 0}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payout Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Rewards Generated</span>
                    <span className="font-semibold">£{stats.totalRewards.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Paid Out</span>
                    <span className="text-green-600">£{stats.paidPayouts.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Pending</span>
                    <span className="text-yellow-600">£{stats.pendingPayouts.toLocaleString()}</span>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between font-semibold">
                      <span>Payout Rate</span>
                      <span>{stats.totalRewards > 0 ? ((stats.paidPayouts / stats.totalRewards) * 100).toFixed(1) : 0}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedReferralDashboard;