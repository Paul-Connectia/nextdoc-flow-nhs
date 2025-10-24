import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ConditionalFooter from '@/components/ConditionalFooter';
import { SEOHead } from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, CreditCard, Mail, AlertCircle } from 'lucide-react';

const Refund = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Refund & Cancellation Policy - NextDoc UK"
        description="Clear refund policy for NextDoc UK subscriptions, AI tools, consultations, and CPD certificates. Fair and transparent cancellation terms."
        keywords="refund policy, cancellation, NextDoc UK, subscription refund, consultation cancellation"
      />
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Refund & Cancellation Policy</h1>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-6 space-y-2">
            <p><strong>Last Updated:</strong> October 2025</p>
            <p><strong>Company No.:</strong> 16504223</p>
            <p><strong>Legal Entity:</strong> NextDoc Global Ltd</p>
            <p><strong>Trading Name:</strong> NextDoc UK</p>
            <p className="text-muted-foreground pt-2">
              This Refund & Cancellation Policy explains how NextDoc Global Ltd manages requests for refunds or cancellations for services purchased through the NextDoc UK platform (www.nextdoc.co.uk). All refunds are processed in accordance with UK law and our payment provider, Stripe Payments Europe Ltd.
            </p>
          </CardContent>
        </Card>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">2. Scope</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-3">This policy applies to all:</p>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li><strong>AI-powered tools</strong> (CV Booster™, GapMap™, SponsorMatch™, InterviewSim+™, CPD SmartCert™)</li>
                <li><strong>Subscription plans</strong> (AI Pro, Core, Elite)</li>
                <li><strong>Consultation & Mentorship bookings</strong> (via MentorConnect™)</li>
                <li><strong>Digital courses & study materials</strong> (PLAB, MRCP, MRCS etc.)</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Quick Refund Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Consultations (24h+ notice):</span>
                  <span className="text-green-600 font-medium">100% Refund</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Annual Subscriptions (14 days, no access):</span>
                    <span className="text-green-600 font-medium">Pro-rata</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Monthly Subscriptions:</span>
                    <span className="text-red-500 font-medium">No partial refunds</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>AI Tools (after use):</span>
                  <span className="text-red-500 font-medium">Non-refundable</span>
                </div>
                <div className="flex justify-between">
                  <span>CPD Certificates (issued):</span>
                  <span className="text-red-500 font-medium">Non-refundable</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                How to Request a Refund
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p><strong>Email:</strong> support@nextdocuk.com</p>
                <p><strong>Include:</strong></p>
                <ul className="list-disc ml-4 space-y-1">
                  <li>Your full name</li>
                  <li>Purchase receipt/transaction ID</li>
                  <li>Reason for refund request</li>
                  <li>Date of purchase</li>
                </ul>
                <p><strong>Processing Time:</strong> 7-10 working days</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Digital Products (Non-Refundable after Access)</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground">
                  Once a user logs in and gains access to any digital product or AI-based tool, it is <strong>non-refundable under UK consumer law</strong>, as the service is considered performed and consumed upon access.
                </p>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Examples include:</h3>
                  <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                    <li>Viewing or downloading study materials or certificates</li>
                    <li>Using AI tools (CV Booster™, InterviewSim+™, GapMap™)</li>
                    <li>Starting practice tests or quiz modules</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Refunds are only granted if:</h3>
                  <ul className="list-disc ml-6 space-y-1 text-blue-800 dark:text-blue-200 text-sm">
                    <li>The user has not accessed the product and requests a cancellation within <strong>14 days of purchase</strong> (UK cooling-off period)</li>
                    <li>There is a technical error on NextDoc's end preventing access to the service (for example, Stripe payment failure without delivery of access)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Mentorship & Consultation Bookings</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-foreground">Rescheduling</h3>
                    <p className="text-muted-foreground">Consultations may be rescheduled up to <strong>24 hours before the session</strong> without charge.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-foreground">Late Cancellations</h3>
                    <p className="text-muted-foreground">Cancellations made <strong>less than 24 hours before the session</strong> are non-refundable.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-foreground">No-Shows</h3>
                    <p className="text-muted-foreground">No-shows are not eligible for refunds.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-foreground">Mentor No-Show</h3>
                    <p className="text-muted-foreground">If a mentor fails to attend, a <strong>full refund or re-booking credit</strong> will be issued within 5 business days.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Subscriptions (AI Pro, Core, Elite)</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-foreground">Auto-Renewal</h3>
                    <p className="text-muted-foreground">Subscriptions renew automatically every month or year unless cancelled before the billing date.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-foreground">Cancellation Policy</h3>
                    <p className="text-muted-foreground">Cancellations take effect at the end of the current billing cycle — <strong>no partial refunds</strong> for monthly subscriptions.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-foreground">Annual Plans</h3>
                    <p className="text-muted-foreground">Annual plans may be refunded on a <strong>pro-rata basis</strong> only if cancelled within <strong>14 days</strong> and no services have been accessed.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. How to Request a Refund</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground">All refund requests must be submitted via email to:</p>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="font-semibold text-foreground mb-2">📩 support@nextdocuk.com</p>
                  <p className="text-sm text-muted-foreground mb-3"><strong>Include:</strong></p>
                  <ul className="list-disc ml-6 space-y-1 text-sm text-muted-foreground">
                    <li>Full name and registered email</li>
                    <li>Purchase reference ID (Stripe receipt)</li>
                    <li>Reason for refund request</li>
                    <li>Evidence (if applicable)</li>
                  </ul>
                </div>
                <p className="text-muted-foreground">
                  All valid refunds are processed within <strong>7–10 business days</strong> through Stripe to the original payment method.
                </p>
              </CardContent>
            </Card>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Special Considerations</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">AI Performance Disclaimer</h3>
                    <p className="text-muted-foreground">Refunds are not granted for subjective dissatisfaction with AI outputs. Our AI tools are informational assistants, not guarantees of results.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Bundle Products</h3>
                    <p className="text-muted-foreground">If a bundle includes multiple tools or courses, partial refunds are not available once any item has been accessed.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Technical Issues</h3>
                    <p className="text-muted-foreground">If technical errors persist for over <strong>72 hours</strong> without resolution, a full refund or account credit will be provided.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Information</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Refund Requests</h3>
                    <p className="text-muted-foreground mb-2">
                      <strong>Email:</strong> support@nextdocuk.com
                    </p>
                    <p className="text-muted-foreground mb-2">
                      <strong>UK Office:</strong> +44 7733 673574
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Response Time:</strong> Within 24-48 hours
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">General Support</h3>
                    <p className="text-muted-foreground mb-2">
                      <strong>Email:</strong> support@nextdocuk.com
                    </p>
                    <p className="text-muted-foreground mb-2">
                      <strong>India Office (WhatsApp):</strong> +91 94835 40070
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Business Hours:</strong> Monday-Friday, 9 AM - 6 PM GMT
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Regulatory Compliance</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-3">This Refund Policy is compliant with:</p>
                <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                  <li><strong>UK Consumer Rights Act 2015</strong></li>
                  <li><strong>Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013</strong></li>
                  <li><strong>ICO UK GDPR guidelines</strong> for digital service providers</li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              <strong>Policy Updates:</strong> This refund policy may be updated from time to time. The latest version will always be available on this page.<br/>
              <strong>Last Updated:</strong> October 2025
            </p>
          </CardContent>
        </Card>
      </main>

      <ConditionalFooter />
    </div>
  );
};

export default Refund;