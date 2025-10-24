import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, BookOpen, Users, MapPin, ArrowRight, CheckCircle, Brain, Stethoscope, GraduationCap, Globe, Award, Target, Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BuyNowButton } from "@/components/BuyNowButton";
import { SEOHead } from "@/components/SEOHead";
import { PRICES } from "@/config/pricing";

const Products = () => {
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');
  const navigate = useNavigate();

  return (
    <div>
        <SEOHead
          title="AI NHS Career Tools & Mentorship | NextDoc"
          description="Explore AI-powered NHS career tools: GapMap, CVBooster, SponsorMatch, InterviewSim+, PLAB QBank, and mentor support."
          keywords="AI NHS tools, PLAB QBank, NHS mentorship, CV review, Interview simulator"
        />
        {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="mb-6 bg-primary-foreground text-primary">
              AI Powered • Mentor Validated • UK Registered
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NextDoc UK — AI-Powered Career & Certification Ecosystem
            </h1>
            <p className="text-xl leading-relaxed opacity-90">
              A comprehensive suite of AI-powered tools and NHS-verified mentorship designed for international doctors. From PLAB success to career integration and CPD growth — NextDoc UK sets a new standard for medical career empowerment.
            </p>
            <p className="text-xs opacity-75 mt-2">Company No. 16504223</p>
          </div>
        </div>
      </section>

      {/* AI-Powered Platform Core */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-3" variant="secondary">AI-Powered Platform Core</Badge>
            <h2 className="text-3xl font-bold mb-2">NextDoc AI — Your Medical & Career Co-Pilot</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Free plan includes 5 queries per day. Upgrade to Pro AI (£{PRICES.proAI.monthly}/mo) for unlimited responses, deeper reasoning, and NHS-aligned feedback across CVPro™, GapMap™, InterviewSim™, and QBank modules., “Ask Mentor AI”, early features. Specialty modes: Internal Medicine, Surgery, OBG, EM, Paediatrics, Psych, Cardiology, Oncology.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* ... keep existing code (AI feature cards) */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <CardTitle>Conversational Guidance</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Context-aware answers with specialty modes.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>Mentor Hand-off</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Seamless upgrade to verified NHS mentors.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <CardTitle>Built-in Tools</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">“Ask AI” inside GapMap, CVPro, InterviewSim+, and QBank.</CardContent>
            </Card>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mt-8">
            <Button onClick={() => window.dispatchEvent(new CustomEvent('nextdoc:open-ai', { detail: { message: 'Hello NextDoc AI — can you help me plan my NHS journey?', specialty: 'general' } }))} className="w-full sm:w-auto">
              Try Free (5/day) <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <BuyNowButton 
              item={{
                id: 'pro-ai',
                name: 'NextDoc Pro AI Subscription',
                price: PRICES.proAI.monthly,
                description: 'Unlimited AI with faster responses and “Ask Mentor AI”',
                type: 'subscription'
              }}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Upgrade to Pro AI — £{PRICES.proAI.monthly}/mo
            </BuyNowButton>
          </div>
        </div>
      </section>

      {/* NHS Career Tools */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">I. NHS Career Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AI-powered tools designed to accelerate your NHS career journey with Principal Mentor integration
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* GapMap (Flagship) */}
            <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all">
              <CardHeader className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-1">GapMap™</CardTitle>
                      <p className="text-sm text-muted-foreground">UK NHS-Aligned Visual Career Roadmap</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="flex-shrink-0">Pathway</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Personalised NHS journey mapping with gap analysis, milestones, and action plan. Upgrade to mentor session anytime.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Dynamic, step-by-step roadmap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Gap analysis with red flags</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary">£29</span>
                  <span className="text-sm text-muted-foreground">AI Map</span>
                </div>
                <div className="space-y-2">
                  <Link to="/gapmap">
                    <Button className="w-full">
                      Map My NHS Journey <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <BuyNowButton 
                    item={{
                      id: 'gapmap',
                      name: 'GapMap™',
                      price: PRICES.gapMap.ai,
                      description: 'AI career roadmap with gap analysis',
                      type: 'one-time'
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Buy Now - £{PRICES.gapMap.ai}
                  </BuyNowButton>
                  <BuyNowButton 
                    item={{
                      id: 'gapmap-mentor',
                      name: 'GapMap™ + Mentor',
                      price: PRICES.gapMap.aiMentor,
                      description: 'AI map with mentor session add-on',
                      type: 'one-time'
                    }}
                    variant="secondary"
                    className="w-full"
                  >
                    AI + Mentor — £{PRICES.gapMap.aiMentor}
                  </BuyNowButton>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => window.dispatchEvent(new CustomEvent('nextdoc:open-ai', { detail: { message: 'Is GapMap™ right for my NHS pathway? Explain how it works and the outcomes.', specialty: 'general' } }))}
                  >
                    Ask AI about GapMap™
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* CVPro (was CV Booster) */}
            <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all">
              <CardHeader className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-1">CVBooster™</CardTitle>
                      <p className="text-sm text-muted-foreground">NHS-Format CV Builder with Mentor Review</p>
                    </div>
                  </div>
                  <Badge className="flex-shrink-0">Most Popular</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Instant AI scoring/rewrites in NHS format. Optional mentor human polish for guaranteed professionalism.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Benchmark vs NHS CVs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Export-ready PDF & portfolio</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary">from £24</span>
                  <span className="text-sm text-muted-foreground">AI • +Mentor £49</span>
                </div>
                <div className="space-y-2">
                  <Link to="/cv-booster">
                    <Button className="w-full">
                      Launch CVBooster™ <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <BuyNowButton 
                    item={{
                      id: 'cvbooster',
                      name: 'CVBooster™',
                      price: PRICES.cvPro.ai,
                      description: 'AI CV Review (upgrade to Mentor for £49)',
                      type: 'one-time'
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    AI Review - £{PRICES.cvPro.ai}
                  </BuyNowButton>
                  <BuyNowButton 
                    item={{
                      id: 'cvbooster-mentor',
                      name: 'CVBooster™ AI + Mentor',
                      price: PRICES.cvPro.aiMentor,
                      description: 'AI review plus mentor polish',
                      type: 'one-time'
                    }}
                    variant="secondary"
                    className="w-full"
                  >
                    AI + Mentor — £{PRICES.cvPro.aiMentor}
                  </BuyNowButton>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => window.dispatchEvent(new CustomEvent('nextdoc:open-ai', { detail: { message: 'Can AI review and mentor polish improve my NHS CV with CVBooster™? What do I get?', specialty: 'general' } }))}
                  >
                    Ask AI about CVBooster™
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* SponsorMatch */}
            <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all">
              <CardHeader className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-1">SponsorMatch™</CardTitle>
                      <p className="text-sm text-muted-foreground">UK Sponsorship Trust Matcher with Red-Flag Detection</p>
                    </div>
                  </div>
                  <Badge variant="destructive" className="flex-shrink-0">Job Ready</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Personalised shortlist of live NHS jobs and Trusts with sponsorship status, fit score, and red flags.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Live job matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Sponsorship eligibility check</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary">£29</span>
                  <span className="text-sm text-muted-foreground">Per report</span>
                </div>
                <div className="space-y-2">
                  <Link to="/sponsor-match">
                    <Button className="w-full">
                      Learn More <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <BuyNowButton 
                    item={{
                      id: 'sponsormatch',
                      name: 'SponsorMatch™',
                      price: 29,
                      description: 'Smart Trust/visa sponsorship matcher with live NHS jobs',
                      type: 'one-time'
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Buy Report - £29
                  </BuyNowButton>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => window.dispatchEvent(new CustomEvent('nextdoc:open-ai', { detail: { message: 'How does SponsorMatch™ find NHS trusts with visa sponsorship and fit for me?', specialty: 'general' } }))}
                  >
                    Ask AI about SponsorMatch™
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* InterviewSim+ */}
            <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all">
              <CardHeader className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-1">InterviewSim+™</CardTitle>
                      <p className="text-sm text-muted-foreground">Specialty-Matched NHS Interview Simulator</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="flex-shrink-0">AI + Mentor</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Specialty-matched NHS interview simulator with instant AI feedback. Upgrade to mentor review anytime.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Instant feedback & scoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Real NHS-style questions</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary">£29</span>
                  <span className="text-sm text-muted-foreground">Per session</span>
                </div>
                <div className="space-y-2">
                  <Link to="/interview-sim">
                    <Button className="w-full">
                      Learn More <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <BuyNowButton 
                    item={{
                      id: 'interviewsim',
                      name: 'InterviewSim+™',
                      price: PRICES.interviewSim.ai,
                      description: 'AI-powered NHS interview simulator with instant feedback',
                      type: 'one-time'
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Buy Session - £{PRICES.interviewSim.ai}
                  </BuyNowButton>
                  <BuyNowButton 
                    item={{
                      id: 'interviewsim-mentor',
                      name: 'InterviewSim+™ AI + Mentor Review',
                      price: PRICES.interviewSim.aiMentor,
                      description: 'AI session plus mentor feedback review',
                      type: 'one-time'
                    }}
                    variant="secondary"
                    className="w-full"
                  >
                    AI + Mentor Review — £{PRICES.interviewSim.aiMentor}
                  </BuyNowButton>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.dispatchEvent(new CustomEvent('nextdoc:open-ai', { detail: { message: 'What does InterviewSim+™ include and how is feedback provided?', specialty: 'general' } }))}
                  >
                    Ask AI about InterviewSim+™
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* MentorConnect */}
            <Card className="group hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Stethoscope className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">MentorConnect™</CardTitle>
                      <p className="text-sm text-muted-foreground">Verified NHS Mentors</p>
                    </div>
                  </div>
                  <Badge>1:1 Support</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Book specialty-matched NHS mentors. Session notes, CPD sign-off, and package deals available.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Session credits & bundles</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">CPD sign-off eligible</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary">from £59</span>
                  <span className="text-sm text-muted-foreground">Per session</span>
                </div>
                <div className="space-y-2">
                  <Link to="/mentors">
                    <Button className="w-full">
                      Book Mentor <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <BuyNowButton 
                    item={{
                      id: 'mentor-session',
                      name: 'Mentor Session',
                      price: PRICES.mentorConnect.single,
                      description: 'Single mentor session (packages available)',
                      type: 'one-time'
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Buy Session - £{PRICES.mentorConnect.single}
                  </BuyNowButton>
                  <BuyNowButton 
                    item={{
                      id: 'mentor-3-pack',
                      name: 'Mentor 3-Pack',
                      price: PRICES.mentorConnect.pack3,
                      description: 'Package of 3 mentor sessions',
                      type: 'one-time'
                    }}
                    variant="secondary"
                    className="w-full"
                  >
                    3-Pack — £{PRICES.mentorConnect.pack3}
                  </BuyNowButton>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.dispatchEvent(new CustomEvent('nextdoc:open-ai', { detail: { message: 'Which mentor should I book for my NHS pathway via MentorConnect™?', specialty: 'general' } }))}
                  >
                    Ask AI about MentorConnect™
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* PLAB Mastery QBank */}
            <Card className="group hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">PLAB Mastery QBank</CardTitle>
                      <p className="text-sm text-muted-foreground">2,000+ Questions • Full Rationales</p>
                    </div>
                  </div>
                  <Badge>Free Sample</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Practice with MLA-aligned MCQs, difficulty modes, mocks, and peer stats. “Ask AI about this question” included for Pro/Core/Elite.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Free: 30 Qs/month</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Full Access: £69 or £6.99/mo</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Link to="/plab-quiz">
                    <Button className="w-full">
                      Try Free PLAB Quiz <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <BuyNowButton 
                    item={{
                      id: 'plab-qbank-full',
                      name: 'PLAB Mastery QBank - Full Access',
                      price: 69,
                      description: 'Unlock full access (monthly option available)',
                      type: 'one-time'
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Buy Full Access - £69
                  </BuyNowButton>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.dispatchEvent(new CustomEvent('nextdoc:open-ai', { detail: { message: 'Is PLAB Mastery QBank right for me? What’s included and how do I start?', specialty: 'general' } }))}
                  >
                    Ask AI about PLAB QBank
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Exams Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">II. Exams</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive exam preparation with Principal Mentor support for every NHS pathway
            </p>
          </div>

          {/* English Proficiency */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">A. English Proficiency</h3>
            <Card 
              className="group hover:shadow-xl transition-all cursor-pointer"
              onClick={() => navigate('/english')}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">English Proficiency (IELTS / OET) — AI Toolkit</CardTitle>
                      <p className="text-sm text-muted-foreground">Bring your own official materials. Our AI does the analysis.</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Language Focus</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">WriterPro™ — AI Writing Analyzer</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">SpeechSim™ — AI Speaking Partner</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">Transcript Analyzer — Listening Companion</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">Reading Assistant — Comprehension Coach</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/english');
                    }}
                  >
                    Open English Toolkit <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* PLAB Exam Suite */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">B. PLAB Exam Suite</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card 
                className="group hover:shadow-xl transition-all cursor-pointer"
                onClick={() => navigate('/exams/plab')}
              >
                <CardHeader>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Brain className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle>PLAB-1 QBank — NHS Aligned</CardTitle>
                        <p className="text-sm text-muted-foreground">2,000+ MLA-aligned MCQs • Full Rationales</p>
                      </div>
                    </div>
                    <Badge className="inline-flex items-center gap-1 rounded-full bg-accent/10 text-primary ring-1 ring-primary/15 shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-3 py-1 text-xs w-fit">
                      Early Access: Free for first 1000 users
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">Extended rationales, distractor analysis, and clinical pearls</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">NextDoc AI help + performance analytics</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      Mentor analysis is a paid add-on
                    </p>
                    <Button 
                      className="w-full shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/exams/plab');
                      }}
                    >
                      Open PLAB QBank <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle>PLAB Study Material & Starter Bundle</CardTitle>
                      <p className="text-sm text-muted-foreground">Complete preparation package</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    High-yield guides, revision notes, and bundled offer: QBank + CV Booster™ + InterviewSim™ + CPD + 1x mentor consult.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">Complete study bundle</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">Best value package deal</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-primary">£199</span>
                    <span className="text-sm text-muted-foreground">Complete bundle</span>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full">Get Bundle</Button>
                    <BuyNowButton 
                      item={{
                        id: 'plab-bundle',
                        name: 'PLAB Study Material & Starter Bundle',
                        price: 199,
                        description: 'Complete PLAB preparation with QBank, CV Booster, InterviewSim, CPD & mentor consult',
                        type: 'one-time'
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Buy Bundle - £199
                    </BuyNowButton>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Postgraduate Exams */}
          <div>
            <h3 className="text-2xl font-bold mb-6">C. Postgraduate Exams — Principal Mentor Series</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "MRCP", subtitle: "Prep", color: "amber", link: "/exams/mrcp" },
                { title: "MRCS", subtitle: "Prep", color: "red", link: "/exams/mrcs" },
                { title: "MRCOG", subtitle: "Prep", color: "purple", link: "/exams/mrcog" },
                { title: "MRCPCH", subtitle: "Prep", color: "blue", link: "/exams/mrcpch" }
              ].map((exam, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => navigate(exam.link)}
                >
                  <CardHeader>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 bg-${exam.color}-100 rounded-lg`}>
                          <Stethoscope className={`h-6 w-6 text-${exam.color}-600`} />
                        </div>
                        <div>
                          <CardTitle className="text-base">{exam.title} / {exam.title === "MRCS" ? "MRCS" : exam.title} Prep (Coming Soon)</CardTitle>
                          <p className="text-xs text-muted-foreground mt-1">AI-powered diagnostic & revision tools in development.</p>
                        </div>
                      </div>
                      <Badge className="w-fit" variant="secondary">Coming Soon</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      size="sm" 
                      className="w-full shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(exam.link);
                      }}
                    >
                      Join Waitlist <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CPD & Mentorship */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">III. CPD & Mentorship</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional development and expert guidance from NHS consultants
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>CPD SmartCert™ Suite</CardTitle>
                    <p className="text-sm text-muted-foreground">AI-powered CPD with portfolio-ready certificates</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    AI needs analysis, personalized learning plans, automatic certificate & portfolio generation. Mentor sign-off option. Elite: unlimited included.
                  </p>
                  <div className="space-y-2 mb-2">
                    <div className="flex justify-between items-center">
                      <span>CPD Lite (AI-only)</span>
                      <span className="font-bold text-primary">£{PRICES.cpdSmartCert.lite}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>CPD Plus (Mentor-validated)</span>
                      <span className="font-bold text-primary">£{PRICES.cpdSmartCert.plus}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <BuyNowButton 
                      item={{
                        id: 'cpd-lite',
                        name: 'CPD SmartCert™ Lite',
                        price: PRICES.cpdSmartCert.lite,
                        description: 'AI-only CPD SmartCert',
                        type: 'one-time'
                      }}
                      variant="outline"
                    >
                      Buy CPD Lite — £{PRICES.cpdSmartCert.lite}
                    </BuyNowButton>
                    <BuyNowButton 
                      item={{
                        id: 'cpd-plus',
                        name: 'CPD SmartCert™ Plus',
                        price: PRICES.cpdSmartCert.plus,
                        description: 'Mentor-validated CPD SmartCert',
                        type: 'one-time'
                      }}
                      variant="secondary"
                    >
                      Buy CPD Plus — £{PRICES.cpdSmartCert.plus}
                    </BuyNowButton>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Mentorship Pack</CardTitle>
                    <p className="text-sm text-muted-foreground">Comprehensive mentor support</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Multiple live sessions covering career consult, CV review, exam strategy, appraisal, interview prep, or Trust onboarding.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Career consultation sessions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Mentor-signed report included</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Participation certificates</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary">£99</span>
                  <span className="text-sm text-muted-foreground">Per session</span>
                </div>
                <Button className="w-full">
                  Book Mentor Session
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bundles & Subscriptions */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">IV. Bundles & Subscriptions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete packages designed for maximum value and comprehensive support
            </p>
          </div>

          {/* Featured Subscription Plans */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">Billing:</span>
            <div className="inline-flex rounded-md border">
              <button 
                className={`px-3 py-1 text-sm rounded-l-md ${billingInterval === 'month' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                onClick={() => setBillingInterval('month')}
              >
                Monthly
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-r-md ${billingInterval === 'year' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                onClick={() => setBillingInterval('year')}
              >
                Yearly
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Pro AI Only */}
            <Card className="group hover:shadow-xl transition-all">
              <CardHeader className="text-center">
                <Badge className="mb-2" variant="secondary">AI</Badge>
                <CardTitle className="text-2xl">Pro AI Only</CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-primary">£{PRICES.proAI.monthly}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center space-x-2"><CheckCircle className="h-4 w-4 text-primary" /><span>Unlimited NextDoc AI</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle className="h-4 w-4 text-primary" /><span>Faster responses, deeper explanations</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle className="h-4 w-4 text-primary" /><span>“Ask Mentor AI” initiation</span></div>
                </div>
                <BuyNowButton 
                  item={{ id: 'pro-ai', name: 'NextDoc Pro AI Subscription', price: PRICES.proAI.monthly, description: 'Unlimited AI access', type: 'subscription' }}
                  className="w-full"
                >
                  Subscribe — £{PRICES.proAI.monthly}/mo
                </BuyNowButton>
              </CardContent>
            </Card>

            {/* Core */}
            <Card className="group hover:shadow-xl transition-all border-2 border-primary/20">
              <CardHeader className="text-center bg-primary/5">
                <Badge className="mb-2 bg-primary text-primary-foreground self-center">MOST POPULAR</Badge>
                <CardTitle className="text-2xl">Core</CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-primary">£{billingInterval === 'year' ? PRICES.core.yearly : PRICES.core.monthly}</span>
                  <span className="text-muted-foreground">/{billingInterval === 'year' ? 'yr' : 'mo'}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center space-x-2"><CheckCircle className="h-4 w-4 text-primary" /><span>Unlimited PLAB QBank</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle className="h-4 w-4 text-primary" /><span>NextDoc AI (unlimited)</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle className="h-4 w-4 text-primary" /><span>1 mentor session/mo</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle className="h-4 w-4 text-primary" /><span>Full CVBooster™</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle className="h-4 w-4 text-primary" /><span>Basic CPD, GapMap Lite</span></div>
                </div>
                <BuyNowButton 
                  item={{ id: `core-${billingInterval}`, name: 'NextDoc Core Subscription', price: billingInterval === 'year' ? PRICES.core.yearly : PRICES.core.monthly, description: 'Core subscription', type: 'subscription' }}
                  className="w-full"
                >
                  Subscribe — £{billingInterval === 'year' ? PRICES.core.yearly : PRICES.core.monthly}/{billingInterval === 'year' ? 'yr' : 'mo'}
                </BuyNowButton>
              </CardContent>
            </Card>

            {/* Elite */}
            <Card className="group hover:shadow-xl transition-all border-2 border-amber-500/20 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-amber-500 text-white">PREMIUM</Badge>
              </div>
              <CardHeader className="text-center bg-amber-50">
                <CardTitle className="text-2xl">Elite</CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-amber-600">£{billingInterval === 'year' ? PRICES.elite.yearly : PRICES.elite.monthly}</span>
                  <span className="text-muted-foreground">/{billingInterval === 'year' ? 'yr' : 'mo'}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center space-x-2"><CheckCircle className="h-4 w-4 text-primary" /><span>Everything in Core</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle className="h-4 w-4 text-primary" /><span>Unlimited specialty QBanks</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle className="h-4 w-4 text-primary" /><span>3 mentor sessions/mo</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle className="h-4 w-4 text-primary" /><span>CPD Plus, InterviewSim+</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle className="h-4 w-4 text-primary" /><span>Priority features, portfolio review</span></div>
                </div>
                <BuyNowButton 
                  item={{ id: `elite-${billingInterval}`, name: 'NextDoc Elite Subscription', price: billingInterval === 'year' ? PRICES.elite.yearly : PRICES.elite.monthly, description: 'Elite subscription', type: 'subscription' }}
                  className="w-full"
                >
                  Subscribe — £{billingInterval === 'year' ? PRICES.elite.yearly : PRICES.elite.monthly}/{billingInterval === 'year' ? 'yr' : 'mo'}
                </BuyNowButton>
              </CardContent>
            </Card>
          </div>

          {/* Other Bundles */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "PLAB Starter Bundle",
                description: "All-in-one: QBank, study material, CV, InterviewSim™, CPD, mentor consult",
                price: "£299",
                badge: "Best Value",
                badgeColor: "bg-green-100 text-green-800"
              },
              {
                title: "Postgraduate Exam Success Bundle", 
                description: "QBank + study material + mentor session + live workshop + CPD",
                price: "£349",
                badge: "Complete",
                badgeColor: "bg-blue-100 text-blue-800"
              },
              {
                title: "NHS Job Pack",
                description: "All core tools + CPDs + consults—everything for job applications",
                price: "£249",
                badge: "Job Ready",
                badgeColor: "bg-purple-100 text-purple-800"
              }
            ].map((bundle, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Target className="h-6 w-6 text-primary" />
                    <Badge className={bundle.badgeColor}>{bundle.badge}</Badge>
                  </div>
                  <CardTitle className="text-lg">{bundle.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {bundle.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-primary">{bundle.price}</span>
                    <span className="text-sm text-muted-foreground">One-time</span>
                  </div>
                  <div className="space-y-1">
                    <Button className="w-full" size="sm">
                      Get Bundle
                    </Button>
                    <BuyNowButton 
                      item={{
                        id: bundle.title.toLowerCase().replace(/\s+/g, '-'),
                        name: bundle.title,
                        price: parseInt(bundle.price.replace('£', '')),
                        description: bundle.description,
                        type: 'one-time'
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Buy {bundle.price}
                    </BuyNowButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* B2B/Trust Solutions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">V. B2B/Trust Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enterprise solutions for NHS Trusts, deaneries, and medical institutions
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center space-x-3 justify-center">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">White-Label & Institutional Packages</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                <Badge variant="secondary" className="text-sm">Coming Soon</Badge>
              </div>
              <p className="text-muted-foreground text-center mb-8">
                Coming soon: GapMap™, InterviewSim™, CPD, and analytics dashboards for NHS Trusts, deaneries, medical schools.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="flex items-center space-x-2 justify-center mb-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Cohort tracking & analytics</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center space-x-2 justify-center mb-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">White-label branding</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center space-x-2 justify-center mb-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Bulk user management</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Button size="lg" disabled>
                  Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary-foreground text-primary">
            AI Powered - Mentor Reviewed Products
          </Badge>
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your NHS Journey?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of international doctors who have successfully transitioned to the NHS with NextDoc UK's comprehensive ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-started">
              <Button size="lg" variant="secondary" className="px-8">
                Get Started Today
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/mentors">
              <Button variant="outline" size="lg" className="px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Speak with a Principal Mentor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;