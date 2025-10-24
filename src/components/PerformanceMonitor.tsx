import React, { useEffect } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  domInteractive: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
}

interface PerformanceMonitorProps {
  onMetricsCollected?: (metrics: PerformanceMetrics) => void;
  enableReporting?: boolean;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  onMetricsCollected,
  enableReporting = process.env.NODE_ENV === 'production'
}) => {
  useEffect(() => {
    if (!enableReporting) return;

    const collectMetrics = () => {
      // Performance Observer for Core Web Vitals
      if ('PerformanceObserver' in window) {
        try {
          // Largest Contentful Paint
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lcp = entries[entries.length - 1];
            
            if (lcp) {
              console.log('LCP:', lcp.startTime);
              // Report to analytics service
              reportMetric('LCP', lcp.startTime);
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // Cumulative Layout Shift
          const clsObserver = new PerformanceObserver((entryList) => {
            let cls = 0;
            for (const entry of entryList.getEntries()) {
              const layoutShiftEntry = entry as any; // Type assertion for layout shift entries
              if (!layoutShiftEntry.hadRecentInput) {
                cls += layoutShiftEntry.value;
              }
            }
            console.log('CLS:', cls);
            reportMetric('CLS', cls);
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });

          // First Contentful Paint
          const fcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            for (const entry of entries) {
              if (entry.name === 'first-contentful-paint') {
                console.log('FCP:', entry.startTime);
                reportMetric('FCP', entry.startTime);
              }
            }
          });
          fcpObserver.observe({ entryTypes: ['paint'] });

        } catch (error) {
          console.warn('Performance monitoring not supported:', error);
        }
      }

      // Basic Navigation Timing
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          
          if (navigation) {
            const metrics: PerformanceMetrics = {
              pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
              domInteractive: navigation.domInteractive - navigation.fetchStart,
              firstContentfulPaint: 0, // Will be set by observer
              largestContentfulPaint: 0, // Will be set by observer
              cumulativeLayoutShift: 0, // Will be set by observer
            };

            console.log('Page Load Metrics:', metrics);
            onMetricsCollected?.(metrics);
          }
        }, 0);
      });
    };

    const reportMetric = (metricName: string, value: number) => {
      // In production, send to analytics service
      if (process.env.NODE_ENV === 'production') {
        // Example: Analytics service call
        // analytics.track('performance_metric', { metric: metricName, value, page: window.location.pathname });
      }
    };

    collectMetrics();
  }, [enableReporting, onMetricsCollected]);

  return null; // This component doesn't render anything
};

// Error boundary for performance monitoring
export const withPerformanceMonitoring = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => (
    <>
      <PerformanceMonitor />
      <WrappedComponent {...props} />
    </>
  );
};