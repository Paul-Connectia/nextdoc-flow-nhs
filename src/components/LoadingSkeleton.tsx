import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface LoadingSkeletonProps {
  variant?: 'default' | 'card' | 'list' | 'hero' | 'grid';
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  variant = 'default', 
  count = 1,
  className = ''
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'hero':
        return (
          <div className={`space-y-6 animate-fade-in ${className}`}>
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
            <div className="flex gap-3">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        );

      case 'card':
        return (
          <Card className={`animate-fade-in ${className}`}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        );

      case 'list':
        return (
          <div className={`space-y-3 animate-fade-in ${className}`}>
            {[...Array(count)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        );

      case 'grid':
        return (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
            {[...Array(count)].map((_, i) => (
              <Card key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <CardHeader>
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        );

      default:
        return (
          <div className={`space-y-3 animate-fade-in ${className}`}>
            {[...Array(count)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        );
    }
  };

  return <>{renderSkeleton()}</>;
};

// Specific loading components for common use cases
export const ProductCardSkeleton = () => <LoadingSkeleton variant="card" />;
export const HeroSkeleton = () => <LoadingSkeleton variant="hero" />;
export const ListSkeleton = ({ count = 5 }: { count?: number }) => (
  <LoadingSkeleton variant="list" count={count} />
);
export const GridSkeleton = ({ count = 6 }: { count?: number }) => (
  <LoadingSkeleton variant="grid" count={count} />
);

export const LoadingSpinner = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center py-12 gap-3">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <p className="text-muted-foreground text-sm">{message}</p>
  </div>
);