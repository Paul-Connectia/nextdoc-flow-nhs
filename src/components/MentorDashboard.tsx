import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  DollarSign, 
  Star, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  ExternalLink,
  Copy,
  Share2
} from 'lucide-react';

interface MentorProfile {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  specialty: string;
  nhs_trust: string;
  job_title: string;
  mentor_tier: 'associate' | 'senior' | 'principal';
  status: 'pending' | 'approved' | 'rejected' | 'suspended' | 'inactive';
  bio: string;
  avatar_url: string;
  mentoring_areas: string[];
  hourly_rate: number;
  calendly_link: string;
  total_sessions: number;
  average_rating: number;
  total_earnings: number;
  referral_code: string;
  created_at: string;
}

interface MentorshipSession {
  id: string;
  mentee_id: string;
  session_type: string;
  status: string;
  scheduled_at: string;
  duration_minutes: number;
  meeting_link: string;
  session_notes: string;
  mentor_feedback: string;
  mentee_feedback: string;
  rating: number;
  amount: number;
  payment_status: string;
  created_at: string;
  profiles?: {
    display_name: string;
    email: string;
  } | null;
}

interface ReferralData {
  id: string;
  referred_user_id: string;
  subscription_confirmed: boolean;
  reward_amount: number;
  payout_status: string;
  created_at: string;
}

const MentorDashboard: React.FC = () => {
  const [mentorProfile, setMentorProfile] = useState<MentorProfile | null>(null);
  const [sessions, setSessions] = useState<MentorshipSession[]>([]);
  const [referrals, setReferrals] = useState<ReferralData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMentorData();
  }, []);

  const loadMentorData = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Load mentor profile
      const { data: profile, error: profileError } = await supabase
        .from('mentor_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError) throw profileError;
      setMentorProfile(profile);

      // Load sessions
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('mentorship_sessions')
        .select('*')
        .eq('mentor_id', profile.id)
        .order('scheduled_at', { ascending: false });

      if (sessionsError) throw sessionsError;
      setSessions((sessionsData || []) as MentorshipSession[]);

      // Load referrals
      const { data: referralsData, error: referralsError } = await supabase
        .from('referral_tracking')
        .select('*')
        .eq('referrer_id', user.id)
        .eq('referrer_type', 'mentor');

      if (referralsError) throw referralsError;
      setReferrals(referralsData || []);

    } catch (error: any) {
      console.error('Error loading mentor data:', error);
      toast.error('Failed to load mentor data');
    } finally {
      setIsLoading(false);
    }
  };

  const copyReferralCode = () => {
    if (mentorProfile?.referral_code) {
      navigator.clipboard.writeText(mentorProfile.referral_code);
      toast.success('Referral code copied to clipboard');
    }
  };

  const shareReferralLink = () => {
    if (mentorProfile?.referral_code) {
      const referralUrl = `${window.location.origin}/mentors?ref=${mentorProfile.referral_code}`;
      navigator.clipboard.writeText(referralUrl);
      toast.success('Referral link copied to clipboard');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'scheduled': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'principal': return 'bg-purple-500';
      case 'senior': return 'bg-blue-500';
      case 'associate': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const stats = {
    totalSessions: sessions.length,
    completedSessions: sessions.filter(s => s.status === 'completed').length,
    upcomingSessions: sessions.filter(s => s.status === 'scheduled' && new Date(s.scheduled_at) > new Date()).length,
    totalEarnings: mentorProfile?.total_earnings || 0,
    totalReferrals: referrals.length,
    confirmedReferrals: referrals.filter(r => r.subscription_confirmed).length,
    pendingPayouts: referrals.filter(r => r.payout_status === 'pending').reduce((sum, r) => sum + r.reward_amount, 0),
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!mentorProfile) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Mentor Profile Not Found</CardTitle>
            <CardDescription>
              You don't have a mentor profile yet. Please apply to become a mentor first.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={mentorProfile.avatar_url} />
            <AvatarFallback>
              {mentorProfile.full_name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{mentorProfile.full_name}</h1>
            <p className="text-muted-foreground">{mentorProfile.specialty} • {mentorProfile.job_title}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge className={getTierColor(mentorProfile.mentor_tier)}>
                {mentorProfile.mentor_tier} mentor
              </Badge>
              <Badge className={getStatusColor(mentorProfile.status)}>
                {mentorProfile.status}
              </Badge>
            </div>
          </div>
        </div>
        <Button onClick={loadMentorData} variant="outline">
          Refresh Data
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSessions}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completedSessions} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingSessions}</div>
            <p className="text-xs text-muted-foreground">
              this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{stats.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              £{mentorProfile.hourly_rate}/hour rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="sessions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sessions</CardTitle>
              <CardDescription>
                Manage your mentoring sessions and bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessions.map((session) => (
                  <Card key={session.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{session.session_type}</h3>
                        <p className="text-sm text-muted-foreground">
                          with {session.profiles?.display_name || 'Unknown User'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(session.scheduled_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                        <span className="text-sm font-medium">£{session.amount}</span>
                        {session.rating && (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm ml-1">{session.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {session.meeting_link && session.status === 'scheduled' && (
                      <div className="mt-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Join Meeting
                          </a>
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mentor Profile</CardTitle>
              <CardDescription>
                Your public mentor profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> {mentorProfile.email}</p>
                    <p><strong>NHS Trust:</strong> {mentorProfile.nhs_trust}</p>
                    <p><strong>Job Title:</strong> {mentorProfile.job_title}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Mentoring Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Hourly Rate:</strong> £{mentorProfile.hourly_rate}</p>
                    <p><strong>Tier:</strong> {mentorProfile.mentor_tier}</p>
                    <p><strong>Status:</strong> {mentorProfile.status}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Bio</h4>
                <p className="text-sm text-muted-foreground">{mentorProfile.bio}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Mentoring Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {mentorProfile.mentoring_areas?.map((area) => (
                    <Badge key={area} variant="secondary">{area}</Badge>
                  ))}
                </div>
              </div>

              {mentorProfile.calendly_link && (
                <div>
                  <h4 className="font-semibold mb-2">Booking Link</h4>
                  <Button variant="outline" asChild>
                    <a href={mentorProfile.calendly_link} target="_blank" rel="noopener noreferrer">
                      <Calendar className="h-4 w-4 mr-2" />
                      Open Calendly
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Referral Program</CardTitle>
              <CardDescription>
                Earn rewards by referring new mentors to NextDoc UK
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{stats.totalReferrals}</p>
                  <p className="text-sm text-muted-foreground">Total Referrals</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{stats.confirmedReferrals}</p>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">£{stats.pendingPayouts}</p>
                  <p className="text-sm text-muted-foreground">Pending Payouts</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Your Referral Code</h4>
                <div className="flex items-center space-x-2">
                  <code className="px-3 py-2 bg-muted rounded text-sm font-mono">
                    {mentorProfile.referral_code}
                  </code>
                  <Button size="sm" variant="outline" onClick={copyReferralCode}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={shareReferralLink}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Reward Structure</h4>
                <div className="text-sm text-muted-foreground">
                  <p>• Associate Mentor referral: £100</p>
                  <p>• Senior Mentor referral: £150</p>
                  <p>• Principal Mentor referral: £200</p>
                  <p className="text-xs mt-1">Rewards paid after successful subscription confirmation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>
                Track your mentoring income and payouts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Session Earnings</h4>
                  <p className="text-2xl font-bold">£{stats.totalEarnings.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">
                    From {stats.completedSessions} completed sessions
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Referral Earnings</h4>
                  <p className="text-2xl font-bold">£{stats.pendingPayouts}</p>
                  <p className="text-sm text-muted-foreground">
                    {referrals.filter(r => r.payout_status === 'pending').length} pending payouts
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Recent Earnings</h4>
                <div className="space-y-2">
                  {sessions
                    .filter(s => s.status === 'completed' && s.amount > 0)
                    .slice(0, 5)
                    .map((session) => (
                      <div key={session.id} className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <p className="text-sm font-medium">{session.session_type}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(session.scheduled_at).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="font-semibold">£{session.amount}</p>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorDashboard;