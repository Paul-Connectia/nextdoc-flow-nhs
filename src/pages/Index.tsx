import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ConditionalFooter from "@/components/ConditionalFooter";
import { CheckCircle, Users, Trophy, Globe, ArrowRight, Stethoscope, GraduationCap, Heart, Youtube, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import nhsHeroImage from "@/assets/nhs-medical-hero.jpg";
import cvBoosterHero from "@/assets/cv-booster-hero.jpg";
import interviewsimHero from "@/assets/interviewsim-hero.jpg";
import gapmapHero from "@/assets/gapmap-hero.jpg";
import sponsormatchHero from "@/assets/sponsormatch-hero.jpg";
import { MentorOnboardingForm } from "@/components/MentorOnboardingForm";
import { BuyNowButton } from "@/components/BuyNowButton";
import { RotatingMentorDisplay } from "@/components/RotatingMentorDisplay";
import { AISearchConsole } from "@/components/AISearchConsole";
import { SocialProof } from "@/components/SocialProof";
import { SEOHead } from "@/components/SEOHead";
import React, { useState } from "react";

const Index = () => {
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="NextDoc - NHS Career Success Platform for International Doctors"
        description="AI-powered tools for NHS career success. PLAB preparation, CV optimisation, interview simulation, and career guidance for medical professionals transitioning to the UK healthcare system."
        keywords="NHS careers, PLAB preparation, medical CV, NHS jobs, international doctors, UK medical training, NHS interview preparation, medical career guidance, NextDoc"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "NextDoc UK",
          "url": "https://nextdocuk.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://nextdocuk.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-8 sm:py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={nhsHeroImage} alt="NHS Medical Hero" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Left Column - Main Content */}
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Badge className="bg-primary-foreground text-primary text-xs sm:text-sm">
                  AI-Powered Tools for NHS Career Readiness
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Your Gateway to NHS Success
              </h1>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed opacity-90 mb-6 sm:mb-8">
                AI-powered tools, mentor-validated guidance, and structured learning pathways for doctors preparing for NHS careers.
              </p>

              {/* AI Search Console */}
              <AISearchConsole />

              <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-md mx-auto sm:mx-0">
                <Link to="/get-started" className="w-full">
                  <Button size="lg" variant="secondary" className="w-full">
                    Start Your Journey
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/products" className="w-full">
                  <Button size="lg" variant="outline" className="w-full border-primary text-primary bg-background hover:bg-primary hover:text-primary-foreground">
                    Explore Programmes
                  </Button>
                </Link>
                <a
                  href="https://instagram.com/nextdoc_uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button size="lg" variant="outline" className="w-full border-pink-500 text-pink-500 bg-background hover:bg-pink-500 hover:text-white">
                    Join Our Insta Community
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>NHS-focused Training</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Expert Mentorship</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4" />
                  <span>Proven Results</span>
                </div>
              </div>

              {/* FREE PLAB Quiz Bank Promotional Box */}
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-accent/20 backdrop-blur-sm rounded-lg border-2 border-primary shadow-lg">
                <div className="flex items-start justify-between mb-3 sm:mb-4 gap-3">
                  <div className="flex-1">
                    <Badge className="mb-2 bg-green-500 text-white text-xs sm:text-sm">LIMITED ACCESS</Badge>
                    <h3 className="text-lg sm:text-xl font-bold text-primary-foreground mb-1 sm:mb-2">
                      FREE PLAB Quiz Bank
                    </h3>
                    <p className="text-xs sm:text-sm text-primary-foreground/80">
                      847 spots remaining for this month
                    </p>
                  </div>
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 flex-shrink-0" />
                </div>
                <div className="space-y-2 mb-3 sm:mb-4">
                  <div className="flex items-center text-xs sm:text-sm text-primary-foreground/90">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0 text-green-500" />
                    <span>2,000+ MLA-aligned questions</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-primary-foreground/90">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0 text-green-500" />
                    <span>AI-powered explanations</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-primary-foreground/90">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0 text-green-500" />
                    <span>Progress tracking & analytics</span>
                  </div>
                </div>
                <Link to="/exams/plab" className="block">
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base">
                    Claim Free Access
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Instagram Community Footer - Enhanced */}
              <a
                href="https://instagram.com/nextdoc_uk"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 sm:mt-6"
              >
                <div className="p-4 bg-gradient-to-r from-pink-500/10 to-purple-600/10 backdrop-blur-sm rounded-lg border-2 border-pink-500/30 hover:border-pink-500/50 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm sm:text-base font-semibold text-primary-foreground mb-1 group-hover:text-pink-300 transition-colors">
                        📲 Follow for FREE Daily Access
                      </p>
                      <p className="text-xs text-primary-foreground/70">
                        5 PLAB questions • 1 AI analysis • 10 chat queries/day
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-pink-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>

            </div>

            {/* Right Column - Rotating Mentor Display */}
            <RotatingMentorDisplay />
          </div>
        </div>
      </section>


      {/* Flagship Products Section */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-12">
            <Badge className="mb-3 sm:mb-4 bg-primary text-primary-foreground text-xs sm:text-sm">
              🚀 Flagship Products
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">Professional Development Suite</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto px-4">
              AI-powered learning tools informed by NHS consultant feedback and competency frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* GapMap (Flagship) */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={gapmapHero}
                  alt="GapMap NHS career pathway visualization"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <Badge className="bg-purple-500 text-white text-xs sm:text-sm w-fit">Pathway</Badge>
                  <span className="text-lg font-bold text-primary">£29</span>
                </div>
                <CardTitle className="text-lg mb-1">GapMap™</CardTitle>
                <p className="text-sm text-muted-foreground">UK NHS-Aligned Visual Career Roadmap</p>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Career pathway visualiser for NHS readiness and competency mapping.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span className="text-xs text-blue-600">Personalised roadmaps</span>
                </div>
                <div className="space-y-2">
                  <Link to="/gapmap" className="block">
                    <Button className="w-full" size="default">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <BuyNowButton
                    item={{
                      id: 'gapmap-flagship',
                      name: 'GapMap™',
                      price: 29,
                      description: 'NHS career pathway visualisation tool',
                      type: 'one-time'
                    }}
                    variant="outline"
                    size="default"
                    className="w-full"
                  >
                    Map My NHS Journey - £29
                  </BuyNowButton>
                </div>
              </CardContent>
            </Card>

            {/* CVPro */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={cvBoosterHero}
                  alt="CVPro AI-powered NHS CV rewrite"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <Badge className="bg-green-500 text-white text-xs sm:text-sm w-fit">Most Popular</Badge>
                  <span className="text-lg font-bold text-primary">from £24</span>
                </div>
                <CardTitle className="text-lg mb-1">CVBooster™</CardTitle>
                <p className="text-sm text-muted-foreground">NHS-Format CV Builder with Mentor Review</p>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Aligned to NHS portfolio standards with mentor review option.
                </p>
                <div className="space-y-2">
                  <Link to="/cv-booster" className="block">
                    <Button className="w-full" size="default">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <BuyNowButton
                    item={{
                      id: 'cvbooster-basic',
                      name: 'CVBooster™',
                      price: 24,
                      description: 'AI CV review (upgrade to mentor polish any time)',
                      type: 'one-time'
                    }}
                    variant="outline"
                    size="default"
                    className="w-full"
                  >
                    AI CV Review - £24
                  </BuyNowButton>
                </div>
              </CardContent>
            </Card>

            {/* SponsorMatch */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={sponsormatchHero}
                  alt="SponsorMatch NHS trust matching"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <Badge className="bg-red-500 text-white text-xs sm:text-sm w-fit">Job Ready</Badge>
                  <span className="text-lg font-bold text-primary">£29</span>
                </div>
                <CardTitle className="text-lg mb-1">SponsorMatch™</CardTitle>
                <p className="text-sm text-muted-foreground">UK Sponsorship Trust Matcher with Red-Flag Detection</p>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Smart Trust matcher offering insights on visa sponsorship and Trust eligibility.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-xs text-green-600">Live job matching</span>
                </div>
                <div className="space-y-2">
                  <Link to="/sponsormatch" className="block">
                    <Button className="w-full" size="default">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <BuyNowButton
                    item={{
                      id: 'sponsormatch-flagship',
                      name: 'SponsorMatch™',
                      price: 29,
                      description: 'NHS trust and sponsorship matcher',
                      type: 'one-time'
                    }}
                    variant="outline"
                    size="default"
                    className="w-full"
                  >
                    Begin Matching - £29
                  </BuyNowButton>
                </div>
              </CardContent>
            </Card>

            {/* InterviewSim+ */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={interviewsimHero}
                  alt="InterviewSim+ AI interview practice"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs sm:text-sm w-fit">AI + Mentor</Badge>
                  <span className="text-lg font-bold text-primary">£29</span>
                </div>
                <CardTitle className="text-lg mb-1">InterviewSim+™</CardTitle>
                <p className="text-sm text-muted-foreground">Specialty-Matched NHS Interview Simulator</p>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  AI simulator using realistic NHS interview scenarios with instant feedback.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  <span className="text-xs text-amber-600">Real NHS interview practice</span>
                </div>
                <div className="space-y-2">
                  <Link to="/interviewsim" className="block">
                    <Button className="w-full" size="default">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <BuyNowButton
                    item={{
                      id: 'interviewsim-basic',
                      name: 'InterviewSim+™',
                      price: 29,
                      description: 'AI interview simulation (mentor review available)',
                      type: 'one-time'
                    }}
                    variant="outline"
                    size="default"
                    className="w-full"
                  >
                    Start Training - £29
                  </BuyNowButton>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" className="px-8">
                Explore All Learning Tools
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Book an Appointment CTA Section */}
      <section className="py-8 md:py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your NHS Journey?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Book a consultation with our NHS experts. We're here to guide you every step of the way.
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="px-8 py-3 text-lg">
                  Book a Free Consultation
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center">Contact Us</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 p-6">
                  {/* Email Contact */}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Email Us</h3>
                    <a href="mailto:support@nextdocuk.com" className="text-primary hover:underline font-medium">
                      support@nextdocuk.com
                    </a>
                  </div>

                  {/* UK Contact */}
                  <div className="text-center border-t pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">UK Office</h3>
                    <div className="space-y-2">
                      <a href="tel:+447733673574" className="block text-primary hover:underline font-medium">
                        +44 7733673574
                      </a>
                      <a href="https://wa.me/447733673574" className="inline-flex items-center text-green-600 hover:underline text-sm">
                        <Heart className="h-4 w-4 mr-1" />
                        WhatsApp UK
                      </a>
                    </div>
                  </div>

                  {/* India Contact */}
                  <div className="text-center border-t pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">India Office</h3>
                    <div className="space-y-2">
                      <a href="tel:+919483540070" className="block text-primary hover:underline font-medium">
                        +91 9483540070
                      </a>
                      <a href="https://wa.me/919483540070" className="inline-flex items-center text-green-600 hover:underline text-sm">
                        <Heart className="h-4 w-4 mr-1" />
                        WhatsApp India
                      </a>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* GapMap™ NHS Pathway Showcase */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-12">
            <Badge className="mb-4 bg-nhs-blue text-white">
              GapMap™ - AI Powered - Mentor Reviewed Products
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Map Your NHS Journey—For Every Pathway</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Visualise milestones, flag gaps, and integrate CPD/mentor tools at every step.
              Choose your pathway and get a personalised roadmap to NHS success.
            </p>
          </div>

          {/* Pathway Selector Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {/* PLAB Pathway */}
            <Link to="/exams/plab">
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-nhs-blue cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="border-nhs-blue text-nhs-blue">PLAB</Badge>
                    <div className="text-right">
                      <Badge className="bg-green-500 text-white">FREE Quiz Bank</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">PLAB Pathway</CardTitle>
                  <p className="text-sm text-muted-foreground">Medical Graduate Route to NHS</p>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Mini Timeline */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs">Degree ✓</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs">IELTS/OET ✓</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span className="text-xs">PLAB 1 (In Progress)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-xs text-muted-foreground">PLAB 2</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-xs text-muted-foreground">GMC Registration</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-primary">From £149</span>
                  </div>
                  <Button className="w-full" size="sm">
                    Start PLAB Journey
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* MRCP Pathway */}
            <Link to="/exams/mrcp">
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-nhs-blue cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="border-amber-500 text-amber-600">MRCP</Badge>
                    <span className="text-sm font-semibold text-green-600">Expert Mentors</span>
                  </div>
                  <CardTitle className="text-lg">MRCP Pathway</CardTitle>
                  <p className="text-sm text-muted-foreground">Physician Specialty Training</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs">Foundation ✓</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span className="text-xs">MRCP Part 1 (In Progress)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-xs text-muted-foreground">MRCP Part 2</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-xs text-muted-foreground">PACES</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-xs text-red-600">CPD Required</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-primary">From £149</span>
                    <Badge variant="outline" className="border-amber-500 text-amber-600">Premium</Badge>
                  </div>
                  <Button className="w-full" size="sm">
                    Start MRCP Journey
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* MRCS Pathway */}
            <Link to="/exams/mrcs">
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-nhs-blue cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="border-red-500 text-red-600">MRCS</Badge>
                    <span className="text-sm font-semibold text-green-600">Surgical Focus</span>
                  </div>
                  <CardTitle className="text-lg">MRCS Pathway</CardTitle>
                  <p className="text-sm text-muted-foreground">Surgical Specialty Training</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs">Foundation ✓</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs">MRCS Part A ✓</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span className="text-xs">MRCS Part B (In Progress)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-xs text-muted-foreground">Surgical Skills</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-xs text-muted-foreground">Specialty Training</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-primary">From £149</span>
                    <Badge variant="outline" className="border-red-500 text-red-600">Surgical</Badge>
                  </div>
                  <Button className="w-full" size="sm">
                    Start MRCS Journey
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* MRCOG Pathway */}
            <Link to="/exams/mrcog">
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-nhs-blue cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="border-purple-500 text-purple-600">MRCOG</Badge>
                    <span className="text-sm font-semibold text-green-600">OBGYN</span>
                  </div>
                  <CardTitle className="text-lg">MRCOG Pathway</CardTitle>
                  <p className="text-sm text-muted-foreground">Obstetrics & Gynaecology</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span className="text-xs">MRCOG Part 1 (In Progress)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-xs text-muted-foreground">MRCOG Part 2</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-xs text-muted-foreground">Clinical Skills</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-xs text-red-600">Portfolio Incomplete</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-primary">From £149</span>
                    <Badge variant="outline" className="border-purple-500 text-purple-600">OBGYN</Badge>
                  </div>
                  <Button className="w-full" size="sm">
                    Start MRCOG Journey
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* MRCPCH Pathway */}
            <Link to="/exams/mrcpch">
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-nhs-blue cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="border-blue-500 text-blue-600">MRCPCH</Badge>
                    <span className="text-sm font-semibold text-green-600">Paediatrics</span>
                  </div>
                  <CardTitle className="text-lg">MRCPCH Pathway</CardTitle>
                  <p className="text-sm text-muted-foreground">Paediatrics & Child Health</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs">Foundation ✓</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-xs text-muted-foreground">MRCPCH Theory</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-xs text-muted-foreground">Clinical Exam</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-xs text-muted-foreground">Portfolio</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-primary">From £149</span>
                    <Badge variant="outline" className="border-blue-500 text-blue-600">Paediatrics</Badge>
                  </div>
                  <Button className="w-full" size="sm">
                    Start MRCPCH Journey
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* UK Graduate Pathway */}
            <Link to="/get-started">
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-nhs-blue cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="border-green-500 text-green-600">UK GRAD</Badge>
                    <span className="text-sm font-semibold text-green-600">Foundation+</span>
                  </div>
                  <CardTitle className="text-lg">UK Graduate</CardTitle>
                  <p className="text-sm text-muted-foreground">Foundation → Specialty</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs">Medical School ✓</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs">FY1 ✓</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span className="text-xs">FY2 (In Progress)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-xs text-muted-foreground">Core Training</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-xs text-muted-foreground">Specialty</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-primary">From £99</span>
                    <Badge variant="outline" className="border-green-500 text-green-600">UK</Badge>
                  </div>
                  <Button className="w-full" size="sm">
                    Start UK Journey
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="text-center mt-6 text-xs text-muted-foreground border-t border-border pt-4">
            <p>NextDoc UK provides independent learning resources and career guidance. We are not affiliated with the GMC or NHS.</p>
          </div>

        </div>
      </section>

      {/* Services Overview */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete NHS Integration Support</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From exam readiness to CV enhancement and mentorship — comprehensive support for your NHS career transition.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardHeader>
                <Stethoscope className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>PLAB & Postgraduate Exams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comprehensive learning for PLAB and UK postgraduate exams.
                </p>
                <Link to="/exams/plab">
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>AI-Powered Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Adaptive AI tutoring and personalised mock exams.
                </p>
                <div className="space-y-2">
                  <Link to="/products">
                    <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground w-fit ">
                      Explore Tools
                    </Button>
                  </Link>
                  <a
                    href="https://youtube.com/@nextdocglobal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-fit text-wrap py-6 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <Youtube className="h-4 w-4 mr-2" />
                      Podcast by Dr. Pradeep Sabapathy <br /> — Coming Soon
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Expert Mentorship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  One-to-one guidance from verified NHS mentors.
                </p>
                <div className="space-y-2">
                  <Link to="/mentors">
                    <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground w-full">
                      Find Mentors
                    </Button>
                  </Link>

                  {/* Community & Support */}
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Community & Support</p>
                    <div className="space-y-1">
                      <a
                        href="https://t.me/nextdoc_uk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Join Telegram Study Group
                        </Button>
                      </a>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground text-center">
                    Educational use only — not an NHS recruitment agency.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="py-8 md:py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-8">
            <Badge className="mb-4 bg-primary text-primary-foreground">
              AI Powered - Mentor Reviewed Products
            </Badge>
            <h2 className="text-3xl font-bold mb-4">What is NextDoc UK?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              NextDoc UK is an AI-powered education and career-readiness platform built by doctors for medical professionals. Join us for the upcoming podcast series featuring Dr. Pradeep Sabapathy, discussing real NHS journeys and career insights.
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>🎙️ Podcast Series Coming Soon — Subscribe to our YouTube channel for updates</p>
            </div>
          </div>
          <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="NextDoc UK: Your Gateway to NHS Success"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Mentor Success Journey Section */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-8">
            <Badge className="mb-4 bg-primary text-primary-foreground">
              Success Stories
            </Badge>
            <h2 className="text-3xl font-bold mb-4">From IMG to NHS Success</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn from real journeys of doctors who successfully transitioned to the NHS.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {/* Dr. Arjun Patel Journey */}
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-2">
                <div className="relative mx-auto mb-3">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-amber-400/30 mx-auto">
                    <img
                      src="/lovable-uploads/a1974f11-8f3f-40c0-b5d8-6e22f135a5e8.png"
                      alt="Dr. Arjun Patel"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Badge className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-0 text-xs px-2 py-0.5">
                    Principal Mentor
                  </Badge>
                </div>
                <CardTitle className="text-lg">Dr. Arjun Patel</CardTitle>
                <p className="text-sm text-muted-foreground">India → NHS Consultant Cardiologist</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Experienced NHS Consultant · Specialty Mentor</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  "From clearing PLAB to leading cardiology services - the structured approach works."
                </p>
              </CardContent>
            </Card>

            {/* Dr. Priya Sharma Journey */}
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-2">
                <div className="relative mx-auto mb-3">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-teal-400/30 mx-auto">
                    <img
                      src="/lovable-uploads/0c62a90c-c3bd-4245-979a-ebe1a0e8cf1e.png"
                      alt="Dr. Priya Sharma"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Badge className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white border-0 text-xs px-2 py-0.5">
                    Senior Mentor
                  </Badge>
                </div>
                <CardTitle className="text-lg">Dr. Priya Sharma</CardTitle>
                <p className="text-sm text-muted-foreground">Pakistan → NHS Emergency Medicine SpR</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Experienced NHS Consultant · Specialty Mentor</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  "Emergency medicine demanded quick adaptation - systematic preparation was key."
                </p>
              </CardContent>
            </Card>

            {/* Dr. Amit Kumar Journey */}
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-2">
                <div className="relative mx-auto mb-3">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-blue-400/30 mx-auto">
                    <img
                      src="/lovable-uploads/0fa2af72-01b3-48c7-9ab5-ac928ccd9f2e.png"
                      alt="Dr. Amit Kumar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Badge className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 text-xs px-2 py-0.5">
                    Associate Mentor
                  </Badge>
                </div>
                <CardTitle className="text-lg">Dr. Amit Kumar</CardTitle>
                <p className="text-sm text-muted-foreground">Bangladesh → NHS General Medicine Registrar</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Experienced NHS Consultant · Specialty Mentor</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  "General medicine training taught me the importance of comprehensive preparation."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Compact Evidence-Based Results Section */}
      <section className="py-6 md:py-8 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 md:mb-6">
            <Badge className="mb-3 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              Research-Backed
            </Badge>
            <h2 className="text-xl md:text-2xl font-bold mb-3">Evidence-Based Success</h2>
            <p className="text-base text-primary-foreground/90 max-w-2xl mx-auto">
              Our methodology is built on NHS workforce data and proven educational frameworks
            </p>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <p className="text-base text-primary-foreground/90 mb-4">
              Our approach is grounded in NHS workforce experience, evidence-based learning design, and continuous mentor feedback.
            </p>
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-2 text-xs bg-primary-foreground/10 px-3 py-2 rounded-full border border-primary-foreground/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>🔒 GDPR Compliant</span>
                <span>•</span>
                <span>📋 ICO Registered</span>
                <span>•</span>
                <span>NHS Aligned</span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Registered Company No. 16504223 · ICO Registered · GDPR Compliant
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <SocialProof />

      {/* Mentor CTAs */}
      <div className="flex flex-col gap-3">
        <Link to="/mentors" className="w-full">
          <Button variant="secondary" className="w-full">
            Get Mentored
            <Users className="h-4 w-4 ml-2" />
          </Button>
        </Link>
        <Button
          variant="outline"
          className="w-full border-primary text-primary bg-background hover:bg-primary hover:text-primary-foreground"
          onClick={() => setShowOnboardingForm(true)}
        >
          Become a Mentor
          <GraduationCap className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Mentor Onboarding Form Modal */}
      {showOnboardingForm && (
        <MentorOnboardingForm onClose={() => setShowOnboardingForm(false)} />
      )}

      <ConditionalFooter />
    </div>
  );
};

export default Index;
