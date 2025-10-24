import { Link } from "react-router-dom";
import { Pen, Mic, Headphones, BookOpen, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import ConditionalFooter from "@/components/ConditionalFooter";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/hooks/useSubscription";

const EnglishProficiency = () => {
  const { subscriptionTier } = useSubscription();
  const isPro = subscriptionTier === 'pro' || subscriptionTier === 'elite';

  const tools = [
    {
      title: "WriterPro™",
      subtitle: "AI Writing Analyzer",
      description: "Paste any IELTS/OET task. Get instant band, criteria feedback, and fixes.",
      icon: Pen,
      route: "/english/writing",
      buttonText: "Open WriterPro™"
    },
    {
      title: "SpeechSim™",
      subtitle: "AI Speaking Partner",
      description: "Record your response or run a Part 1–3 simulation. Get fluency, pronunciation, grammar feedback.",
      icon: Mic,
      route: "/english/speaking",
      buttonText: "Start Speaking"
    },
    {
      title: "Transcript Analyzer",
      subtitle: "Listening Companion",
      description: "Paste a listening transcript + your question. Understand answers, idioms, and reasoning.",
      icon: Headphones,
      route: "/english/listening",
      buttonText: "Analyse Transcript"
    },
    {
      title: "Reading Assistant",
      subtitle: "Comprehension Coach",
      description: "Paste any reading passage. Get summaries, vocab help, and 'why this answer' logic.",
      icon: BookOpen,
      route: "/english/reading",
      buttonText: "Practice Reading"
    }
  ];

  return (
    <>
      <SEOHead
        title="English Proficiency — IELTS/OET AI Toolkit | NextDoc UK"
        description="Bring your own official IELTS/OET materials. Our AI analyzes writing, speaking, listening, and reading to help you achieve your target band score."
        keywords="IELTS AI, OET preparation, English proficiency, writing analyzer, speaking practice, IELTS band score"
      />
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
        <Navigation />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-12 md:py-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge variant="secondary" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI-Powered
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                NextDoc UK — English Proficiency Toolkit
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Bring your own official materials. Our AI does the analysis.
              </p>

              {/* Access Control Banner for Free Users */}
              {!isPro && (
                <Card className="max-w-2xl mx-auto mb-8 border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <p className="text-sm mb-3">
                      <strong>Free users:</strong> 1 AI analysis per day across all tools.
                    </p>
                    <Link to="/pricing">
                      <Button variant="default" size="sm">
                        Unlock Unlimited with NextDoc AI Pro
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          {/* Tools Grid */}
          <section className="pb-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Card key={tool.route} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="mb-1">{tool.title}</CardTitle>
                            <CardDescription className="text-xs font-medium text-primary">
                              {tool.subtitle}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {tool.description}
                        </p>
                        <Link to={tool.route}>
                          <Button className="w-full">{tool.buttonText}</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Compliance Footer */}
          <section className="pb-12 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <p className="text-xs text-muted-foreground">
                NextDoc AI is not affiliated with IDP or British Council. Use official materials; our tools provide independent AI analysis.
              </p>
            </div>
          </section>
        </main>

        <ConditionalFooter />
      </div>
    </>
  );
};

export default EnglishProficiency;
