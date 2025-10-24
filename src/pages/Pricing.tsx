import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ConditionalFooter from '@/components/ConditionalFooter';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import { SEOHead } from '@/components/SEOHead';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Instagram, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <SEOHead
          title="Pricing: Pro AI, Core, Elite | NextDoc"
          description="Choose Pro AI, Core or Elite. AI-first NHS career tools with mentor support."
          keywords="NextDoc pricing, Pro AI, Core, Elite, NHS tools"
        />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Transparent Pricing</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your NHS Career Journey
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Unlock AI-powered career tools, mentorship, and comprehensive exam prep. 
              All plans include money-back guarantee.
            </p>
          </div>
        </section>

        {/* Free Instagram Tier */}
        <section className="py-12 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-pink-500/30 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Instagram className="h-8 w-8" />
                  <div>
                    <CardTitle className="text-2xl">Free (Instagram Verified)</CardTitle>
                    <CardDescription className="text-white/90">
                      Join 10,000+ doctors on Instagram for free daily access
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm"><strong>5 PLAB questions/day</strong> with AI explanations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm"><strong>1 English AI analysis/day</strong> (writing/speaking/reading/listening)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm"><strong>10 AI chat queries/day</strong> with NextDoc AI assistant</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm"><strong>Career roadmap</strong> (view-only)</span>
                  </div>
                </div>
                <a 
                  href="https://instagram.com/nextdoc_uk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700" size="lg">
                    <Instagram className="mr-2 h-5 w-5" />
                    Follow @nextdoc_uk to Unlock
                  </Button>
                </a>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  💡 Access remains active while you follow us. Unfollowing removes access.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <SubscriptionPlans />
      </main>
      <ConditionalFooter />
    </div>
  );
};

export default Pricing;