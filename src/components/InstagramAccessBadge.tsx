import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Instagram, CheckCircle2, Lock } from 'lucide-react';
import { useInstagramAccess } from '@/hooks/useInstagramAccess';
import { InstagramFeatureType } from '@/types/instagram';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface InstagramAccessBadgeProps {
  compact?: boolean;
  showUsage?: boolean;
  featureType?: InstagramFeatureType;
}

export const InstagramAccessBadge = ({ 
  compact = false, 
  showUsage = false,
  featureType 
}: InstagramAccessBadgeProps) => {
  const { 
    isInstagramVerified, 
    instagramUsername, 
    remainingUses,
    isPaidUser,
    openVerificationModal 
  } = useInstagramAccess();

  if (isPaidUser) {
    return compact ? (
      <Badge variant="secondary" className="gap-1 text-xs">
        <CheckCircle2 className="h-3 w-3" />
        Pro
      </Badge>
    ) : null;
  }

  if (isInstagramVerified) {
    const remaining = featureType ? remainingUses(featureType) : null;
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant="outline" 
              className="gap-1 border-green-500 text-green-700 bg-green-50 cursor-pointer"
            >
              <Instagram className="h-3 w-3" />
              {compact ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : (
                <>
                  Verified
                  {showUsage && remaining !== null && (
                    <span className="ml-1">({remaining} left)</span>
                  )}
                </>
              )}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Instagram Verified: @{instagramUsername}</p>
            {remaining !== null && (
              <p className="text-xs text-muted-foreground">{remaining} uses remaining today</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="outline" 
            className="gap-1 border-amber-500 text-amber-700 bg-amber-50 cursor-pointer hover:bg-amber-100"
            onClick={() => openVerificationModal('feature')}
          >
            <Lock className="h-3 w-3" />
            {!compact && 'Follow for Access'}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Follow @nextdoc_uk on Instagram for free access</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
