import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RoyalCollegeWaitlistModal } from "@/components/RoyalCollegeWaitlistModal";
import { Sparkles, ArrowRight, Users, MapPin, BookOpen } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { ROYAL_COLLEGE_EXAMS, ROYAL_COLLEGE_GROUPS } from "@/data/royalCollegeExams";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const RoyalCollege = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [preselectedExam, setPreselectedExam] = useState<string | undefined>();

  useEffect(() => {
    analytics.track('rc_hub_viewed');
  }, []);

  const handleJoinWaitlist = (examId?: string) => {
    if (examId) {
      analytics.track('rc_exam_tile_clicked', { exam_id: examId });
      setPreselectedExam(examId);
    }
    setIsWaitlistOpen(true);
  };

  // Generate ItemList structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": ROYAL_COLLEGE_EXAMS.map((exam, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": exam.title,
      "description": exam.microCopy,
      "url": `https://nextdoctors.org.uk/exams/royal-college#${exam.id}`
    }))
  };

  return (
    <>
      <SEOHead
        title="Royal College Exams (UK) – Coming Soon | NextDoc"
        description="Consultant-led preparation for FRCA, FRCR, FRCPath, FRCOphth, MRCPsych, MRCGP, MRCEM/FRCEM, SCEs & more. Join the waitlist."
        keywords="royal college exams, FRCA, FRCR, FRCPath, FRCOphth, MRCPsych, MRCGP, MRCEM, FRCEM, SCE, UK medical exams, consultant-led preparation"
        structuredData={structuredData}
      />

      <Navigation />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-secondary text-secondary-foreground">
              <Sparkles className="h-4 w-4 mr-2" />
              Coming Soon
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Royal College Exams
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              We're building consultant-led preparation for more Royal College exams.
              Tell us what you need—get early access and launch updates.
            </p>

            <Button
              size="lg"
              variant="secondary"
              onClick={() => handleJoinWaitlist()}
              className="gap-2"
            >
              Join Waitlist
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Exams Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {ROYAL_COLLEGE_GROUPS.map((groupName) => {
              const groupExams = ROYAL_COLLEGE_EXAMS
                .filter(e => e.group === groupName)
                .sort((a, b) => a.title.localeCompare(b.title));

              if (groupExams.length === 0) return null;

              return (
                <div key={groupName} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">
                    {groupName}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {groupExams.map((exam) => (
                      <Card
                        key={exam.id}
                        className="hover:border-primary/50 transition-all duration-200 hover:shadow-lg"
                      >
                        <CardHeader className="p-4 sm:p-6">
                          <Badge variant="secondary" className="w-fit mb-2 text-xs">
                            Coming Soon
                          </Badge>
                          <CardTitle className="text-lg mb-2">
                            {exam.title}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {exam.microCopy}
                          </p>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                          <Button
                            className="w-full"
                            variant="outline"
                            onClick={() => handleJoinWaitlist(exam.id)}
                          >
                            Join Waitlist
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Secondary CTA Strip */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Explore What's Available Now
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/mentors">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                  <Users className="h-4 w-4" />
                  Meet Mentors
                </Button>
              </Link>

              <Link to="/gapmap">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                  <MapPin className="h-4 w-4" />
                  Explore GapMap™
                </Button>
              </Link>

              <Link to="/products">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                  <BookOpen className="h-4 w-4" />
                  Explore Available Programmes
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="launch">
                <AccordionTrigger>When will programmes launch?</AccordionTrigger>
                <AccordionContent>
                  We're building these programmes based on demand. Join the waitlist
                  to be notified when your exam opens for enrollment. Early waitlist
                  members will receive pilot pricing and exclusive access.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="included">
                <AccordionTrigger>What's included?</AccordionTrigger>
                <AccordionContent>
                  Each programme will include consultant-led prep, exam-aligned content,
                  mock assessments, and mentor support tailored to that Royal College exam.
                  We follow the same high standards as our existing PLAB, MRCP, and MRCS programmes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="pricing">
                <AccordionTrigger>What will pricing be?</AccordionTrigger>
                <AccordionContent>
                  Waitlist members will receive early access and pilot pricing announcements
                  before public launch. We're committed to keeping our programmes accessible
                  to international medical graduates and UK trainees.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        <Footer />
      </div>

      {/* Waitlist Modal */}
      <RoyalCollegeWaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => {
          setIsWaitlistOpen(false);
          setPreselectedExam(undefined);
        }}
        preselectedExam={preselectedExam}
      />
    </>
  );
};

export default RoyalCollege;
