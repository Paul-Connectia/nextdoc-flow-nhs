import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ConditionalFooter from '@/components/ConditionalFooter';
import { SEOHead } from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Terms & Conditions - NextDoc UK"
        description="Terms and conditions for NextDoc UK's AI-powered medical career tools, PLAB preparation, and CPD modules. UK jurisdiction and GDPR compliant."
        keywords="terms conditions, NextDoc UK, medical career, PLAB, legal, UK healthcare"
      />
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-6">Terms & Conditions of Use</h1>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-4">
              <strong>Effective Date:</strong> 17 October 2025<br/>
              <strong>Data Controller:</strong> NextDoc Global Ltd (Company No. 16504223)<br/>
              <strong>Trading Brand:</strong> NextDoc UK<br/>
              <strong>Jurisdiction:</strong> United Kingdom (England & Wales)
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to NextDoc UK, operated by NextDoc Global Ltd ("NextDoc", "we", "us", "our"). 
              NextDoc UK is a trading brand of NextDoc Global Ltd.
            </p>
            <p className="text-muted-foreground mb-4">
              These Terms govern your use of our websites, dashboards, AI tools, and all associated digital services (collectively, the "Services"), including AI-powered tools (e.g., CV Booster™, InterviewSim™, GapMap™, SponsorMatch™), PLAB and postgraduate exam resources, CPD modules, and payment and subscription systems powered by Stripe.
            </p>
            <p className="text-muted-foreground">
              By accessing or using our Services, you agree to comply with and be bound by these Terms. If you do not agree, you must not use the Services.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Eligibility</h2>
            <p className="text-muted-foreground mb-4">
              You must be 18 years of age or older, a healthcare professional, or an aspiring healthcare professional capable of entering into legally binding contracts.
            </p>
            <p className="text-muted-foreground">
              If you are using the Services on behalf of an organisation, you confirm that you are authorised to bind that organisation to these Terms.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Accounts, Subscriptions, and Access</h2>
            <div className="space-y-3 text-muted-foreground">
              <p><strong>3.1 Accounts</strong> – Certain features require registration. You must maintain the confidentiality of your login credentials and notify us of unauthorised access.</p>
              <p><strong>3.2 Subscription Access</strong> – Paid content (e.g., AI tools, CPD modules, downloadable materials) requires login and a successful Stripe payment.</p>
              <p><strong>3.3 Billing & Renewal</strong> – Subscription fees are processed securely through Stripe and renew automatically unless cancelled before the renewal date.</p>
              <p><strong>3.4 Refunds & Cancellations</strong> – Please refer to our <a href="/refunds" className="text-primary hover:underline">Refund Policy</a> for applicable terms.</p>
              <p><strong>3.5 Taxes</strong> – Prices may include or exclude VAT as indicated.</p>
              <p><strong>3.6 Free Tier</strong> – Access to limited features is permitted under the Free Tier; misuse or automated scraping may result in account suspension.</p>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. AI Tools and Limitations</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Our AI-based tools (including Ask NextDoc AI, CV Booster™, InterviewSim™, GapMap™, and SponsorMatch™) are designed for educational and career guidance purposes only.
              </p>
              <p>
                They must not be treated as clinical, legal, or professional advice. Outputs may be incomplete or contain inaccuracies.
              </p>
              <p>
                Users are responsible for verifying any important information with a qualified human advisor.
              </p>
              <p>You acknowledge that:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>AI-generated outputs are probabilistic and not guaranteed to be correct.</li>
                <li>No liability arises from reliance on AI results for career, visa, or medical decisions.</li>
              </ul>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Acceptable Use</h2>
            <div className="text-muted-foreground">
              <p className="mb-2">You agree not to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Use the Services for unlawful or unethical purposes.</li>
                <li>Circumvent access controls, scrape content, or reverse-engineer any system.</li>
                <li>Misrepresent identity or impersonate another user.</li>
                <li>Post harmful, infringing, or discriminatory material.</li>
                <li>Use AI outputs in patient care, diagnostics, or legal documentation.</li>
              </ul>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Third-Party Services</h2>
            <p className="text-muted-foreground">
              We use verified third-party providers, including Stripe (payments) and Google Workspace (communications). Each may have their own privacy and usage terms. We do not control third-party websites or services linked from our platform.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Intellectual Property</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                All content, source code, AI prompts, database structures, trademarks, branding, and downloadable materials are the intellectual property of NextDoc Global Ltd.
              </p>
              <p>
                Unauthorised reproduction, distribution, or data scraping is prohibited. Users may access and download materials only for lawful, personal, and educational use.
              </p>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. User Data, Storage, and Analytics</h2>
            <div className="space-y-3 text-muted-foreground">
              <p><strong>8.1 Data Controller</strong> – NextDoc Global Ltd acts as the Data Controller under UK GDPR.</p>
              <p><strong>8.2 Processing</strong> – Data is processed on secure UK/EU servers via Supabase and Stripe.</p>
              <p><strong>8.3 Lawful Bases</strong> – Processing is based on:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Contract (to deliver subscribed services)</li>
                <li>Legitimate interests (security, analytics, improvement)</li>
                <li>Consent (for communications, newsletters, or cookies)</li>
              </ul>
              <p><strong>8.4 Rights</strong> – You have rights under UK GDPR to access, correct, erase, or restrict processing. See our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> for details.</p>
              <p><strong>8.5 Data Retention</strong> – Data is retained only as long as necessary for legal and operational purposes.</p>
              <p><strong>8.6 Analytics</strong> – Optional analytics may be used to personalise content and improve learning recommendations.</p>
              <p><strong>8.7 Cookies</strong> – Use of cookies is governed by our Cookie Policy in our <a href="/privacy#cookies" className="text-primary hover:underline">Privacy Policy</a>.</p>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitation of Liability</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>To the fullest extent permitted by law:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>NextDoc Global Ltd and its affiliates are not liable for indirect, consequential, or incidental damages, including loss of profits or data.</li>
                <li>Our total liability for any claim is limited to the greater of £100 or the total amount paid by you within the past 12 months.</li>
              </ul>
              <p>
                Nothing in these Terms limits liability for death or personal injury caused by negligence, fraud, or statutory rights under UK law.
              </p>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Suspension and Termination</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>We may suspend or terminate access to Services for:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Breach of these Terms,</li>
                <li>Misuse, non-payment, or fraud, or</li>
                <li>Regulatory or security reasons.</li>
              </ul>
              <p>
                You may terminate your account anytime by contacting support@nextdocuk.com. Certain clauses (intellectual property, data, limitation of liability) survive termination.
              </p>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Modifications</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                NextDoc Global Ltd reserves the right to modify these Terms to comply with new laws, product updates, or policy changes.
              </p>
              <p>
                Users will be notified of material updates via email, in-platform alerts, or banners. Continued use after notification constitutes acceptance.
              </p>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Governing Law and Jurisdiction</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>These Terms are governed by the laws of England and Wales.</p>
              <p>All disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact Information</h2>
            <div className="text-muted-foreground space-y-2">
              <p><strong>Email:</strong> support@nextdocuk.com</p>
              <p><strong>Company:</strong> NextDoc Global Ltd (Company No. 16504223)</p>
              <p><strong>Trading Brand:</strong> NextDoc UK</p>
              <p><strong>Registered Jurisdiction:</strong> United Kingdom</p>
            </div>
            <p className="text-sm text-muted-foreground mt-8">
              Last updated: 17 October 2025
            </p>
          </section>
        </div>
      </main>

      <ConditionalFooter />
    </div>
  );
};

export default Terms;