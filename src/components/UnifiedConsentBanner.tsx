import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { X, Shield, Cookie, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

const UnifiedConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only check the unified consent key for proper GDPR compliance
    const hasGivenUnifiedConsent = localStorage.getItem('unified-consent');
    
    // Show banner if unified consent hasn't been given
    if (!hasGivenUnifiedConsent) {
      // Delay show for first-time visitors to not overwhelm
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    // Clear old consent keys from legacy banners
    localStorage.removeItem('nhs-consent');
    
    // Set comprehensive consent for all features
    localStorage.setItem('unified-consent', 'accepted');
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('ai-consent-status', 'accepted');
    localStorage.setItem('ai-data-consent', 'full');
    localStorage.setItem('analytics-consent', 'accepted');
    setIsVisible(false);
    
    console.log('Unified Consent: All features accepted - GDPR & ICO compliant');
  };

  const handleEssentialOnly = () => {
    // Clear old consent keys from legacy banners
    localStorage.removeItem('nhs-consent');
    
    // Set essential-only consent
    localStorage.setItem('unified-consent', 'essential');
    localStorage.setItem('cookie-consent', 'essential-only');
    localStorage.setItem('ai-consent-status', 'essential-only');
    localStorage.setItem('ai-data-consent', 'essential');
    localStorage.setItem('analytics-consent', 'declined');
    setIsVisible(false);
    
    console.log('Unified Consent: Essential only - strictly necessary features');
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-lg z-50 animate-fade-in">
      <Card className="shadow-xl border-2 border-nhs-blue/20 bg-background/95 backdrop-blur">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <div className="flex gap-2 mt-1">
              <Shield className="h-5 w-5 text-nhs-blue flex-shrink-0" />
              <Cookie className="h-4 w-4 text-primary flex-shrink-0" />
              <Bot className="h-4 w-4 text-accent flex-shrink-0" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                NHS-Aligned Privacy & Consent
                <span className="text-xs bg-nhs-blue text-white px-2 py-0.5 rounded">ICO Registered</span>
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                NextDoc UK operates in compliance with NHS data standards, GDPR, and ICO registration. We use:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 mb-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span><strong>Essential Cookies</strong> - Required for site functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <span><strong>AI Processing</strong> - Personalized career guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">✓</span>
                  <span><strong>Analytics</strong> - Improve your experience</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground">
                View our{' '}
                <Link to="/privacy" className="text-nhs-blue hover:underline font-medium">
                  Privacy Policy
                </Link>
                {', '}
                <Link to="/terms" className="text-nhs-blue hover:underline font-medium">
                  Terms
                </Link>
                {', and '}
                <Link to="/cookies" className="text-nhs-blue hover:underline font-medium">
                  Cookie Policy
                </Link>
                {' '}for detailed information or to manage preferences later.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="p-1 h-auto hover:bg-destructive/10 focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close consent banner"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="pt-0 gap-2 flex-col sm:flex-row">
          <Button
            onClick={handleEssentialOnly}
            variant="outline"
            size="sm"
            className="w-full sm:flex-1 text-xs border-nhs-blue/30 focus-visible:ring-2 focus-visible:ring-ring"
          >
            Essential Only
          </Button>
          <Button
            onClick={handleAcceptAll}
            size="sm"
            className="w-full sm:flex-1 text-xs bg-nhs-blue hover:bg-nhs-blue/90 focus-visible:ring-2 focus-visible:ring-ring"
          >
            Accept All & Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UnifiedConsentBanner;
