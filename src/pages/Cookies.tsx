import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import ConditionalFooter from '@/components/ConditionalFooter';
import { SEOHead } from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Cookie, Settings } from 'lucide-react';

const Cookies = () => {
  const [functionalEnabled, setFunctionalEnabled] = useState(true);
  const [aiInteractionEnabled, setAiInteractionEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Cookie Policy - NextDoc UK"
        description="Learn how NextDoc UK uses cookies. We use only essential and functional cookies - no ads, no trackers."
        keywords="cookies, privacy, NextDoc UK, cookie policy, GDPR"
      />
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <Cookie className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Cookie Policy</h1>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6 space-y-2">
            <p><strong>Last Updated:</strong> 17 October 2025</p>
            <p><strong>Company:</strong> NextDoc Global Ltd (Company No. 16504223)</p>
            <p><strong>Trading Brand:</strong> NextDoc UK</p>
            <p><strong>Applies to:</strong> nextdocuk.com, nextdocglobal.com, nextdocglobal.io</p>
          </CardContent>
        </Card>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. About This Policy</h2>
          <Card>
            <CardContent className="p-6 space-y-3 text-muted-foreground">
              <p>
                This Cookie Policy explains how NextDoc Global Ltd (Company No. 16504223) — trading as NextDoc UK — uses cookies and similar technologies to provide, secure, and improve our services.
              </p>
              <p>
                We use only <strong>essential cookies</strong> and limited <strong>functional cookies</strong> to ensure our website and AI tools operate correctly. We do not use advertising or behavioural tracking cookies.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Cookies are small text files placed on your device when you visit a website. They are used to make websites work more efficiently, as well as to provide information to the site owners.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Type</th>
                      <th className="text-left p-3 font-semibold">Purpose</th>
                      <th className="text-left p-3 font-semibold">Example</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="p-3">Essential Cookies</td>
                      <td className="p-3">Required for site operation (security, login, payments).</td>
                      <td className="p-3">Stripe session ID, authentication tokens.</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">Functional Cookies</td>
                      <td className="p-3">Improve usability and save preferences.</td>
                      <td className="p-3">"Remember me" login, language setting.</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">AI Interaction Cookies</td>
                      <td className="p-3">Maintain continuity across chat and learning sessions.</td>
                      <td className="p-3">"Ask NextDoc AI" history, analytics logs.</td>
                    </tr>
                    <tr>
                      <td className="p-3">Performance Cookies</td>
                      <td className="p-3">Measure technical site performance (non-tracking).</td>
                      <td className="p-3">Basic page load analytics (no Google Analytics).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                We <strong>do not use</strong> third-party advertising cookies, Facebook Pixel, or Google Analytics.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
          <Card>
            <CardContent className="p-6 space-y-3 text-muted-foreground">
              <p>Some cookies are placed by trusted partners we use to provide secure functionality:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Stripe Payments Europe Ltd</strong> – session and checkout cookies</li>
                <li><strong>Google LLC (Gemini AI)</strong> – contextual cookies for AI processing</li>
                <li><strong>Parallel AI Ltd</strong> – session logs for AI interaction continuity</li>
              </ul>
              <p>All partners comply with UK GDPR and Standard Contractual Clauses.</p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. How Long Cookies Last</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Session cookies:</strong> Deleted automatically when you close your browser</li>
                <li><strong>Persistent cookies:</strong> Expire automatically within 12 months unless cleared manually</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Managing Cookies</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                You can manage or delete cookies in your browser settings.
              </p>
              <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Note:</strong> Disabling essential cookies may limit platform functionality such as logins or secure checkouts.
                </p>
              </div>

              <div className="border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Manage Cookie Preferences
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Essential Cookies</p>
                      <p className="text-sm text-muted-foreground">Always Active</p>
                    </div>
                    <Switch checked disabled />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Functional Cookies</p>
                      <p className="text-sm text-muted-foreground">Save preferences and improve usability</p>
                    </div>
                    <Switch 
                      checked={functionalEnabled}
                      onCheckedChange={setFunctionalEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">AI Interaction Cookies</p>
                      <p className="text-sm text-muted-foreground">Remember chat history and learning progress</p>
                    </div>
                    <Switch 
                      checked={aiInteractionEnabled}
                      onCheckedChange={setAiInteractionEnabled}
                    />
                  </div>
                </div>

                <Button className="w-full">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-3">For cookie-related queries, contact:</p>
              <div className="space-y-2 text-muted-foreground">
                <p>📩 <strong>Email:</strong> support@nextdocuk.com</p>
                <p>📞 <strong>UK Office:</strong> +44 7733 673574</p>
                <p>📱 <strong>India Office (WhatsApp):</strong> +91 94835 40070</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              <strong>Last Updated:</strong> 17 October 2025<br/>
              This Cookie Policy may be updated from time to time. The latest version will always be available on this page.
            </p>
          </CardContent>
        </Card>
      </main>

      <ConditionalFooter />
    </div>
  );
};

export default Cookies;