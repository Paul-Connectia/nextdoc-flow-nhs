import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  User, LogOut, BookOpen, Brain, FileText, MapPin, Award,
  Clock, TrendingUp, CheckCircle2, AlertCircle
} from 'lucide-react';
// import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ConditionalFooter from '@/components/ConditionalFooter';
import { useClerk, useUser } from '@clerk/clerk-react';

interface Profile {
  id: string;
  display_name: string;
  email: string;
  subscription_status: string;
  first_name?: string;
  last_name?: string;
}

interface UsageStats {
  mcqs_today: number;
  pdfs_this_week: number;
  ai_queries_today: number;
}


const Dashboard = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [usageStats, setUsageStats] = useState<UsageStats>({
    mcqs_today: 0,
    pdfs_this_week: 0,
    ai_queries_today: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { signOut } = useClerk()
  const { isLoaded, isSignedIn } = useUser()

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      if (!isSignedIn) {
        navigate('/auth');
        return;
      }

      // Fetch user profile
      // const { data: profileData, error: profileError } = await supabase
      //   .from('profiles')
      //   .select('*')
      //   .eq('user_id', session.user.id)
      //   .single();

      // if (profileError) {
      //   console.error('Profile error:', profileError);
      // } else {
      //   setProfile(profileData);
      // }

      // Fetch usage stats
      // const today = new Date().toISOString().split('T')[0];
      // const weekStart = new Date();
      // weekStart.setDate(weekStart.getDate() - 7);

      // const { data: usageData } = await supabase
      //   .from('user_usage_tracking')
      //   .select('feature, usage_count, reset_date')
      //   .eq('user_id', session.user.id)
      //   .gte('reset_date', weekStart.toISOString().split('T')[0]);

      // const stats = { mcqs_today: 0, pdfs_this_week: 0, ai_queries_today: 0 };
      // usageData?.forEach((usage) => {
      //   if (usage.feature === 'mcq' && usage.reset_date === today) {
      //     stats.mcqs_today = usage.usage_count;
      //   } else if (usage.feature === 'pdf_download') {
      //     stats.pdfs_this_week += usage.usage_count;
      //   } else if (usage.feature === 'ai_search' && usage.reset_date === today) {
      //     stats.ai_queries_today = usage.usage_count;
      //   }
      // });
      // setUsageStats(stats);
    } catch (error) {
      console.error('Dashboard error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/');
    } catch (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getSubscriptionLimits = (subscription: string) => {
    switch (subscription) {
      case 'Core':
        return { mcqs: 'Unlimited', pdfs: 'Unlimited', ai: 'Unlimited' };
      case 'Elite':
        return { mcqs: 'Unlimited', pdfs: 'Unlimited', ai: 'Unlimited' };
      default:
        return { mcqs: '3/day', pdfs: '1/week', ai: '2/day' };
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
        <ConditionalFooter />
      </div>
    );
  }

  const limits = getSubscriptionLimits(profile?.subscription_status || 'Free');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {profile?.first_name || profile?.display_name || 'Doctor'}!
            </h1>
            <p className="text-muted-foreground mt-2">
              Continue your NHS career journey with NextDoc's AI-powered tools
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={profile?.subscription_status === 'Free' ? 'secondary' : 'default'}>
              {profile?.subscription_status || 'Free'} Plan
            </Badge>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Usage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">MCQ Practice</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageStats.mcqs_today}</div>
              <p className="text-xs text-muted-foreground">
                Today's limit: {limits.mcqs}
              </p>
              {profile?.subscription_status === 'Free' && (
                <Progress value={(usageStats.mcqs_today / 3) * 100} className="mt-2" />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">PDF Downloads</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageStats.pdfs_this_week}</div>
              <p className="text-xs text-muted-foreground">
                Weekly limit: {limits.pdfs}
              </p>
              {profile?.subscription_status === 'Free' && (
                <Progress value={(usageStats.pdfs_this_week / 1) * 100} className="mt-2" />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Queries</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageStats.ai_queries_today}</div>
              <p className="text-xs text-muted-foreground">
                Daily limit: {limits.ai}
              </p>
              {profile?.subscription_status === 'Free' && (
                <Progress value={(usageStats.ai_queries_today / 2) * 100} className="mt-2" />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/plab-quiz')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                PLAB-1 Quiz
              </CardTitle>
              <CardDescription>
                Practice MCQs with AI-powered explanations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Start Quiz</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/cv-booster')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                CV Booster™
              </CardTitle>
              <CardDescription>
                AI-powered CV enhancement and review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Enhance CV</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/interview-sim')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                InterviewSim™
              </CardTitle>
              <CardDescription>
                Practice NHS interviews with AI feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Start Practice</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/gap-map')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                GapMap™
              </CardTitle>
              <CardDescription>
                Personalised NHS career roadmap
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Roadmap</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/sponsor-match')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                SponsorMatch™
              </CardTitle>
              <CardDescription>
                Find NHS sponsorship opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Find Sponsors</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/study-materials')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Study Materials
              </CardTitle>
              <CardDescription>
                Access PDFs and CPD modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Browse Materials</Button>
            </CardContent>
          </Card>
        </div>

        {/* Subscription Upgrade */}
        {profile?.subscription_status === 'Free' && (
          <Alert className="mb-8">
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              <div className="flex justify-between items-center">
                <span>Upgrade to unlock unlimited access to all features and premium content.</span>
                <Button size="sm" onClick={() => navigate('/products')}>
                  Upgrade Now
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </main>

      <ConditionalFooter />
      <Footer />
    </div>
  );
};

export default Dashboard;