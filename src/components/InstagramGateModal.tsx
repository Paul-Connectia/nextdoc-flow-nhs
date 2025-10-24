import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Instagram, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface InstagramGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  onVerificationSuccess?: () => void;
}

export const InstagramGateModal = ({ 
  isOpen, 
  onClose, 
  featureName,
  onVerificationSuccess 
}: InstagramGateModalProps) => {
  const handleFollowClick = () => {
    // Open Instagram in new tab
    window.open('https://instagram.com/nextdoc_uk', '_blank');
    
    // TODO: Implement actual OAuth flow
    // For now, just show a message
    setTimeout(() => {
      onVerificationSuccess?.();
    }, 2000);
  };

  const handleVerifyClick = () => {
    // TODO: Call edge function to verify follow status
    // const { data } = await supabase.functions.invoke('verify-instagram-follow');
    // if (data.verified) {
    //   onVerificationSuccess?.();
    //   onClose();
    // }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-full bg-gradient-to-br from-pink-500 to-purple-600">
              <Instagram className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Follow for Free Access</DialogTitle>
              <DialogDescription>
                Join 10,000+ doctors on Instagram
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Feature Info */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Unlock: {featureName}</h3>
            <p className="text-sm text-muted-foreground">
              Follow @nextdoc_uk on Instagram to get free daily access
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <h4 className="font-semibold">What you'll get (FREE):</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>5 PLAB questions</strong> per day with AI explanations</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>1 English AI analysis</strong> per day (writing/speaking/reading/listening)</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>10 AI chat queries</strong> per day</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Career roadmap</strong> (view-only)</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleFollowClick}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              size="lg"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Follow @nextdoc_uk
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button 
              onClick={handleVerifyClick}
              variant="outline"
              className="w-full"
            >
              Already Following? Verify Now
            </Button>
          </div>

          {/* Alternative */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-3">
              Or get unlimited access with a subscription
            </p>
            <Link to="/pricing">
              <Button variant="ghost" size="sm">
                View Subscription Plans
              </Button>
            </Link>
          </div>

          {/* Note */}
          <p className="text-xs text-muted-foreground text-center">
            💡 You'll lose access if you unfollow. Follow status is checked daily.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
