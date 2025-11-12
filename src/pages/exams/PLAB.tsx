import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Brain,
  BookOpen,
  BarChart3,
  Share2,
  Users,
  Shield,
  Target,
  Focus,
  Clock,
  UserCheck,
  ExternalLink,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PLAB = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      text: "Designed by NHS Doctors — grounded in real-world clinical practice and UK guidelines.",
    },
    {
      icon: Brain,
      text: "NextDoc AI Assistant — helps you understand rationales, generate mnemonics, and clarify mistakes.",
    },
    {
      icon: BookOpen,
      text: "2000+ Clinically Reviewed Questions — extended explanations, distractor analysis, and clinical pearls.",
    },
    {
      icon: BarChart3,
      text: "Smart Learning Dashboard — adaptive analytics showing accuracy, weak areas, and improvement curves.",
    },
    {
      icon: Share2,
      text: "Share Analytics with Mentor (Chargeable Feature) — securely connect with NHS mentors for paid performance review sessions.",
    },
    {
      icon: Users,
      text: "Mentor-Backed Progression — verified NHS consultants available for expert guidance through MentorConnect™.",
    },
  ];

  const steps = [
    {
      icon: Target,
      title: "Baseline Diagnostic",
      description: "start with a quick adaptive test.",
    },
    {
      icon: Focus,
      title: "Targeted Practice",
      description: "improve using Focus 50™ and topic-based sets.",
    },
    {
      icon: Clock,
      title: "Mock & Review",
      description: "timed mocks, error analysis, AI feedback.",
    },
    {
      icon: UserCheck,
      title: "Mentor Review (Optional, Chargeable)",
      description: "book a mentor to analyse your performance dashboard.",
    },
  ];

  const plab1Features = [
    "Layered explanations (concept → distractors → clinical pearl)",
    "NextDoc AI-powered clarifications and mnemonics",
    "Adaptive analytics and Focus 50™ weak-topic drills",
    "Progress tracking with performance summaries",
    "Optional paid mentor analytics review for deeper insights",
    "Real exam-mode with flag & review system",
  ];

  const plab2Includes = [
    "Consultation frameworks (SBAR, Calgary-Cambridge)",
    "Station templates, scripts, and rubrics",
    "Marking checklists and common pitfalls",
    "MentorConnect™ mock circuits (coming soon)",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* 1️⃣ Hero Section */}
      <section className="relative bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] text-primary-foreground py-16 overflow-hidden">
        {/* Doctor silhouette overlay */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAwIDQwYzE2LjU3IDAgMzAgMTMuNDMgMzAgMzBzLTEzLjQzIDMwLTMwIDMwLTMwLTEzLjQzLTMwLTMwIDEzLjQzLTMwIDMwLTMwem0wIDcwYzE2LjU3IDAgMzAgMTMuNDMgMzAgMzBzLTEzLjQzIDMwLTMwIDMwLTMwLTEzLjQzLTMwLTMwIDEzLjQzLTMwIDMwLTMwem0wIDBsLTIwIDQwaDQwbC0yMC00MHoiIGZpbGw9IndoaXRlIi8+PC9zdmc+')]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your PLAB Journey with NextDoc AI
            </h1>
            <p className="text-xl leading-relaxed opacity-90 mb-4">
              An AI-powered question bank and mentorship ecosystem built by NHS
              doctors. Experience PLAB-1 and PLAB-2 preparation designed for
              real NHS success.
            </p>
            <p className="text-sm opacity-80 mb-2">
              For the first 1000 learners, full PLAB-1 access is free. Mentor
              analysis and feedback sessions remain paid features.
            </p>
            <p className="text-lg font-semibold mb-8 opacity-95">
              Built by Doctors. For Doctors. AI-Powered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                onClick={() => navigate("/login?next=/dashboard/plab-qbank")}
              >
                Login to Access PLAB QBank
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="px-8 shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                onClick={() =>
                  navigate("/login?next=/dashboard/resources/plab2")
                }
              >
                <Download className="h-4 w-4 mr-2" />
                Login to Download PLAB-2 Pack
              </Button>
            </div>
          </div>
        </div>

        {/* Animated icons */}
        <div className="absolute top-10 right-10 opacity-10 animate-pulse">
          <Brain className="h-24 w-24" />
        </div>
        <div
          className="absolute bottom-10 right-32 opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          <BarChart3 className="h-20 w-20" />
        </div>
        <div
          className="absolute bottom-20 left-10 opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          <Users className="h-20 w-20" />
        </div>
      </section>

      {/* 2️⃣ Why Choose NextDoc for PLAB */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose NextDoc for PLAB?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive approach ensures you're fully prepared with
              AI-powered tools and NHS mentor support
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-accent/50 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1 transition-transform duration-200 ease-out group-hover:scale-105 hover:scale-105 hover:text-primary/80" />
                <span className="text-sm leading-relaxed">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3️⃣ How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Four simple steps to PLAB success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {steps.map((step, index) => (
              <Card key={index} className="group text-center">
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <step.icon className="h-8 w-8 text-primary transition-transform duration-200 ease-out group-hover:scale-105 hover:scale-105 hover:text-primary/80" />
                    </div>
                  </div>

                  <CardTitle className="text-lg flex items-center justify-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 text-sm font-semibold text-white bg-primary rounded-lg">
                      {index + 1}
                    </span>
                    {step.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
              onClick={() => navigate("/login?next=/dashboard/plab-qbank")}
            >
              Login to Begin
            </Button>
          </div>
        </div>
      </section>

      {/* 4️⃣ PLAB-1 Question Bank */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-primary text-primary-foreground">
              Free for First 1000 Users
            </Badge>
            <h2 className="text-3xl font-bold mb-4">PLAB-1 Question Bank</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
              The most comprehensive PLAB-1 preparation platform for
              international doctors. Each question includes detailed
              explanations, NHS-aligned reasoning, and real clinical pearls.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Feature Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {plab1Features.map((feature, index) => (
                  <div key={index} className="group flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 transition-colors duration-200 group-hover:text-primary/80" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button
              size="lg"
              className="shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
              onClick={() => navigate("/login?next=/dashboard/plab-qbank")}
            >
              Login to Access PLAB QBank
            </Button>
          </div>
        </div>
      </section>

      {/* 5️⃣ PLAB-2 Study Pack */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              PLAB-2 OSCE Study Resource Pack
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Structured OSCE preparation tools designed by NHS clinicians —
              from communication checklists to station frameworks.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Includes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plab2Includes.map((item, index) => (
                  <li key={index} className="group flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 transition-colors duration-200 group-hover:text-primary/80" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button
              size="lg"
              className="shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
              onClick={() => navigate("/login?next=/dashboard/resources/plab2")}
            >
              <Download className="h-4 w-4 mr-2" />
              Login to Download PLAB-2 Pack
            </Button>
          </div>
        </div>
      </section>

      {/* 6️⃣ Early-Access Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-primary/20 bg-accent/30">
            <CardHeader className="text-center">
              <Badge className="inline-flex items-center gap-1 rounded-full bg-accent/10 text-primary ring-1 ring-primary/15 shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-3 py-1 mb-3 text-sm md:text-base animate-pulse-2 hover:animate-none mx-auto">
                🎉 Early Access Offer
              </Badge>
              <CardTitle className="text-2xl">
                Limited Period - First 1000 Users Only
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                For a limited period, the first 1000 users will enjoy full
                PLAB-1 access for free. Mentor analysis and feedback features
                remain part of the paid plans.
              </p>
              <Button
                size="lg"
                className="shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                onClick={() => navigate("/login?next=/dashboard/plab-qbank")}
              >
                Join Early Access → Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 7️⃣ Ethical Footer */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-6 max-w-3xl mx-auto">
              PLAB is a GMC examination. NextDoc UK is an independent
              educational platform offering AI-powered learning tools for IMGs.
              We make no pass-rate or placement claims. Mentor analysis is a
              paid feature.
            </p>

            <div className="flex items-center justify-center gap-6">
              <a
                href="https://instagram.com/nextdocglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram – Daily 5-Question Quiz"
              >
                <span aria-hidden="true">📸</span>
                <span className="text-sm">
                  Instagram – Daily 5-Question Quiz
                </span>
              </a>
              <a
                href="https://t.me/nextdocglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Telegram – Peer Learning Group"
              >
                <span aria-hidden="true">✈️</span>
                <span className="text-sm">Telegram – Peer Learning Group</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PLAB;
