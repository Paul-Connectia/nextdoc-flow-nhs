import React from 'react';
import Navigation from '@/components/Navigation';
import ConditionalFooter from '@/components/ConditionalFooter';
import { SEOHead } from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, Users, FileText, AlertTriangle, Scale, Mail } from 'lucide-react';

const MentorCodeOfConduct = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Mentor Code of Conduct - NextDoc UK"
        description="Code of Conduct for mentors at NextDoc UK — outlining professional standards, confidentiality, equality, and accountability expectations."
        keywords="mentor code of conduct, NextDoc UK, NHS mentorship, professional standards, confidentiality, equality, accountability"
      />
      <Navigation />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Mentor Code of Conduct</h1>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6 text-sm text-muted-foreground">
            <p>
              As a mentor with <strong>NextDoc UK</strong>, you play a vital role in supporting international doctors navigating the UK NHS system. 
              This Code of Conduct defines the professional, ethical, and behavioural standards expected of all mentors.
            </p>
            <p className="mt-2">
              By participating as a mentor, you agree to uphold integrity, respect, confidentiality, and professionalism in all mentoring activities.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* 1. Preamble */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">1. Preamble</h2>
            </div>
            <p className="text-muted-foreground">
              As a mentor with NextDoc UK, you support international doctors navigating the UK NHS system. 
              Your role matters — you commit to the highest standards of integrity, respect, and trustworthiness.
            </p>
          </section>

          <Separator />

          {/* 2. Core Principles */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">2. Core Principles</h2>
            </div>
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
              <li><strong>Respect & Dignity:</strong> Treat all mentees with fairness and courtesy, irrespective of background.</li>
              <li><strong>Integrity & Transparency:</strong> Provide honest guidance; never misrepresent your credentials or outcomes.</li>
              <li><strong>Confidentiality:</strong> Protect mentee information unless legally or professionally required to disclose.</li>
              <li><strong>Professional Boundaries:</strong> Maintain a mentoring relationship distinct from friendship or employment.</li>
              <li><strong>Empowerment:</strong> Enable mentees to make their own informed decisions.</li>
              <li><strong>Accountability:</strong> Comply with NextDoc UK’s oversight, quality, and ethics processes.</li>
            </ul>
          </section>

          <Separator />

          {/* 3. Scope & Role */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Scope & Role</h2>
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
              <li>Act as a mentor for professionals exploring UK NHS career pathways.</li>
              <li>Stay within your area of competence; refer when necessary.</li>
              <li>Provide respectful, evidence-based, and up-to-date guidance aligned with NHS standards.</li>
            </ul>
          </section>

          <Separator />

          {/* 4. Mentoring Relationship Standards */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Mentoring Relationship Standards</h2>
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
              <li><strong>Initial Contracting:</strong> Define expectations, confidentiality, and frequency at the first session.</li>
              <li><strong>Meetings & Availability:</strong> Be punctual; notify cancellations in advance.</li>
              <li><strong>Communication:</strong> Respond to mentee messages within 48 hours unless otherwise agreed.</li>
              <li><strong>Boundaries:</strong> Avoid dual roles unless approved by both parties and NextDoc UK.</li>
              <li><strong>Conflict of Interest:</strong> Disclose any personal or financial interests that could influence mentoring.</li>
              <li><strong>Termination:</strong> End relationships respectfully and refer mentees back to NextDoc UK if needed.</li>
            </ul>
          </section>

          <Separator />

          {/* 5. Confidentiality & Data Protection */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">5. Confidentiality & Data Protection</h2>
            </div>
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
              <li>Handle all mentee-shared data as confidential per UK GDPR and NextDoc UK’s Privacy Policy.</li>
              <li>Do not disclose mentee information without explicit consent.</li>
              <li>Escalate safeguarding or legal concerns following NextDoc UK’s protocol.</li>
            </ul>
          </section>

          <Separator />

          {/* 6. Equality, Diversity & Inclusion */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">6. Equality, Diversity & Inclusion</h2>
            </div>
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
              <li>Promote a mentoring environment free from discrimination or bias.</li>
              <li>Demonstrate cultural awareness and respect.</li>
              <li>Support equal opportunity for all mentees.</li>
            </ul>
          </section>

          <Separator />

          {/* 7. Professional Conduct & NHS Alignment */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Professional Conduct & NHS Alignment</h2>
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
              <li>Maintain professionalism in dress, language, and behaviour.</li>
              <li>Ensure all advice aligns with NHS and GMC standards.</li>
              <li>Do not make false claims or unrealistic promises.</li>
              <li>Inform NextDoc UK of any professional investigations or sanctions.</li>
            </ul>
          </section>

          <Separator />

          {/* 8. Fees & Transparency */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Fees and Financial Transparency</h2>
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
              <li>Mentoring fees displayed on the platform must reflect accurate take-home rates.</li>
              <li>Do not charge additional or hidden fees outside the platform.</li>
              <li>All invoicing and payments must occur via NextDoc UK unless granted written exception.</li>
            </ul>
          </section>

          <Separator />

          {/* 9. Conflict Management */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">9. Conflict Management & Escalation</h2>
            </div>
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
              <li>Report issues such as boundary breaches or conflicts to the Mentoring Lead.</li>
              <li>All ethical concerns are reviewed under NextDoc UK’s internal policy.</li>
              <li>Non-compliance may result in suspension or removal from the mentoring programme.</li>
            </ul>
          </section>

          <Separator />

          {/* 10. Data & Quality Assurance */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Data, Reviews & Quality Assurance</h2>
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
              <li>Participate in periodic reviews, feedback surveys, and audits.</li>
              <li>Co-operate in providing anonymised data for quality improvement.</li>
            </ul>
          </section>

          <Separator />

          {/* 11. Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Termination & Sanctions</h2>
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
              <li>Breach of this Code may lead to investigation or removal from the programme.</li>
              <li>Upon termination, mentors must cease using the NextDoc UK name or branding.</li>
            </ul>
          </section>

          <Separator />

          {/* Contact */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Contact Information</h2>
            </div>
            <div className="text-muted-foreground">
              <p>For any questions or ethical concerns, contact:</p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p><strong>Mentoring Lead:</strong> NextDoc Global Ltd (Company No. 16504223)</p>
                <p><strong>Email:</strong> support@nextdocuk.com</p>
                <p><strong>Jurisdiction:</strong> United Kingdom</p>
                <p><strong>Response Time:</strong> Within 72 hours</p>
              </div>
            </div>
          </section>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6 text-sm text-muted-foreground">
            <p><strong>Last Updated:</strong> 17 October 2025</p>
            <p><strong>Version:</strong> 1.0</p>
            <p>NextDoc UK may update this Code periodically to reflect evolving best practices.</p>
          </CardContent>
        </Card>
      </main>

      <ConditionalFooter />
    </div>
  );
};

export default MentorCodeOfConduct;
