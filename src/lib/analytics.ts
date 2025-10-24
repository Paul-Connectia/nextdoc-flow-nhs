export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    // Log to console for development
    console.log('[Analytics]', event, properties);
    
    // In production, integrate with analytics service (GA4, Mixpanel, etc.)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, properties);
    }
  }
};
