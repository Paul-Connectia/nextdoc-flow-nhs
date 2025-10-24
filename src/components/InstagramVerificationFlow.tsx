import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const InstagramVerificationFlow = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    
    if (code) {
      verifyInstagramFollow(code, state);
    }
  }, [searchParams]);

  const verifyInstagramFollow = async (code: string, state: string | null) => {
    setIsVerifying(true);
    try {
      // TODO: Call edge function to verify Instagram follow
      // const { data, error } = await supabase.functions.invoke('verify-instagram-follow', {
      //   body: { code, state }
      // });

      // if (error) throw error;

      // if (data.verified) {
      //   setIsVerified(true);
      //   // Store verification in localStorage temporarily
      //   localStorage.setItem('instagram_verification', JSON.stringify({
      //     instagram_username: data.username,
      //     instagram_user_id: data.user_id,
      //     follow_status: 'active',
      //     follow_verified_at: new Date().toISOString()
      //   }));
      //   
      //   confetti({
      //     particleCount: 100,
      //     spread: 70,
      //     origin: { y: 0.6 }
      //   });
      //   
      //   toast({
      //     title: "Verification successful!",
      //     description: `Welcome @${data.username}! You now have free access.`
      //   });
      //   
      //   setTimeout(() => navigate('/'), 2000);
      // } else {
      //   setError('Could not verify your follow. Please make sure you followed @nextdoc_uk');
      // }

      // Temporary placeholder
      await new Promise(resolve => setTimeout(resolve, 2000));
      setError('Instagram OAuth integration pending backend setup');
      
    } catch (err: any) {
      console.error('Verification error:', err);
      setError(err.message || 'Verification failed');
      toast({
        title: "Verification failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Verifying Instagram Follow</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground text-center">
              Please wait while we verify your follow status...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-green-600">Verification Successful!</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <p className="text-center">
              Welcome! You now have free access to our tools.
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Redirecting to homepage...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-destructive">Verification Failed</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <XCircle className="h-16 w-16 text-destructive" />
            <p className="text-center text-sm">
              {error}
            </p>
            <Button onClick={() => navigate('/')}>
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};
