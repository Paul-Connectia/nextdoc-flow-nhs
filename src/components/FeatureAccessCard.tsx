import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock, CheckCircle2, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureAccessCardProps {
  featureName: string;
  featureDescription: string;
  requiredAccess: 'free' | 'instagram' | 'pro' | 'elite';
  icon: React.ReactNode;
  dailyLimit?: number;
  currentUsage?: number;
  onUnlockClick?: () => void;
}

export const FeatureAccessCard = ({
  featureName,
  featureDescription,
  requiredAccess,
  icon,
  dailyLimit = 0,
  currentUsage = 0,
  onUnlockClick
}: FeatureAccessCardProps) => {
  const progress = dailyLimit > 0 ? (currentUsage / dailyLimit) * 100 : 0;
  const remaining = Math.max(0, dailyLimit - currentUsage);

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{featureName}</CardTitle>
              <CardDescription>{featureDescription}</CardDescription>
            </div>
          </div>
          
          {requiredAccess === 'instagram' && (
            <Badge variant="outline" className="gap-1 border-pink-500 text-pink-700">
              <Instagram className="h-3 w-3" />
              Instagram
            </Badge>
          )}
          {requiredAccess === 'pro' && (
            <Badge variant="secondary">Pro</Badge>
          )}
          {requiredAccess === 'elite' && (
            <Badge>Elite</Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {dailyLimit > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-muted-foreground">Daily usage</span>
              <span className="font-medium">
                {currentUsage}/{dailyLimit} used
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            {remaining > 0 ? (
              <p className="text-xs text-green-600 mt-1">
                <CheckCircle2 className="inline h-3 w-3 mr-1" />
                {remaining} {remaining === 1 ? 'use' : 'uses'} remaining today
              </p>
            ) : (
              <p className="text-xs text-amber-600 mt-1">
                Daily limit reached. Resets at midnight UTC.
              </p>
            )}
          </div>
        )}

        {requiredAccess === 'instagram' && onUnlockClick && (
          <Button 
            onClick={onUnlockClick}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
          >
            <Instagram className="mr-2 h-4 w-4" />
            Unlock with Instagram
          </Button>
        )}

        {(requiredAccess === 'pro' || requiredAccess === 'elite') && (
          <Link to="/pricing" className="block">
            <Button variant="default" className="w-full">
              <Lock className="mr-2 h-4 w-4" />
              Upgrade to {requiredAccess === 'pro' ? 'Pro' : 'Elite'}
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};
