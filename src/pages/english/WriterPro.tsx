import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Pen, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import ConditionalFooter from "@/components/ConditionalFooter";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSubscription } from "@/hooks/useSubscription";
import { analyseEnglish, WritingFeedback } from "@/lib/englishAnalysis";
import { useToast } from "@/hooks/use-toast";
import { useInstagramAccess } from "@/hooks/useInstagramAccess";
import { InstagramGateModal } from "@/components/InstagramGateModal";
import { InstagramAccessBadge } from "@/components/InstagramAccessBadge";

const WriterPro = () => {
  const { subscriptionTier } = useSubscription();
  const { toast } = useToast();
  const isPro = subscriptionTier === 'pro' || subscriptionTier === 'elite';
  const { canAccess, remainingUses, trackUsage, openVerificationModal } = useInstagramAccess();
  
  const [taskPrompt, setTaskPrompt] = useState("");
  const [essay, setEssay] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [gateModalOpen, setGateModalOpen] = useState(false);

  const handleAnalyze = async () => {
    if (!canAccess('writing')) {
      openVerificationModal('WriterPro™');
      return;
    }
    if (!taskPrompt.trim() || !essay.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both task prompt and your essay.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyseEnglish('writing', { taskPrompt, essay });
      setFeedback(result as WritingFeedback);
      await trackUsage('writing');
      toast({
        title: "Analysis complete",
        description: "Your writing has been analyzed successfully."
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <SEOHead
        title="WriterPro™ — AI Writing Analyzer | NextDoc Global"
        description="Get instant IELTS/OET writing feedback with band scores, criteria analysis, and suggested improvements powered by AI."
        keywords="IELTS writing, OET writing, writing analyzer, band score, task achievement, coherence"
      />
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
        <Navigation />
        
        <main className="flex-1">
          {/* Breadcrumb */}
          <div className="border-b bg-background/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Link to="/exams/plab" className="hover:text-primary transition-colors">Exams</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <Link to="/english" className="hover:text-primary transition-colors">English Proficiency</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-foreground">WriterPro™</span>
              </div>
            </div>
          </div>

          {/* Access Banner */}
          {!isPro && (
            <div className="bg-primary/5 border-b border-primary/20">
              <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <InstagramAccessBadge featureType="writing" showUsage />
                  <p className="text-sm">
                    {canAccess('writing') ? (
                      <><strong>{remainingUses('writing')}/1</strong> free analysis remaining today</>
                    ) : (
                      <>Follow @nextdoc_uk on Instagram for 1 free analysis/day, or </>
                    )}
                    <Link to="/pricing" className="ml-2 underline font-medium hover:text-primary">
                      upgrade to Pro for unlimited
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Helper Text */}
          <div className="bg-muted/30 border-b">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <p className="text-sm text-muted-foreground">
                <strong>Tip:</strong> Use official IELTS/OET prompts and your practice essays for best results.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Inputs */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Pen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle>WriterPro™</CardTitle>
                          <CardDescription>AI Writing Analyzer</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="taskPrompt">Task Prompt</Label>
                        <Input
                          id="taskPrompt"
                          placeholder="e.g., Some people believe that..."
                          value={taskPrompt}
                          onChange={(e) => setTaskPrompt(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="essay">Your Essay</Label>
                        <Textarea
                          id="essay"
                          placeholder="Paste your essay here..."
                          className="min-h-[300px]"
                          value={essay}
                          onChange={(e) => setEssay(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Word count: {essay.trim().split(/\s+/).filter(Boolean).length}
                        </p>
                      </div>

                      <Button 
                        onClick={handleAnalyze} 
                        disabled={isAnalyzing}
                        className="w-full"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analysing...
                          </>
                        ) : (
                          "Analyse with NextDoc AI"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - AI Feedback */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Feedback</CardTitle>
                      <CardDescription>
                        {feedback ? "Analysis complete" : "Results will appear here"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!feedback ? (
                        <div className="text-center py-12 text-muted-foreground">
                          <Pen className="h-12 w-12 mx-auto mb-4 opacity-20" />
                          <p>Submit your essay to see AI feedback</p>
                        </div>
                      ) : (
                        <div className="space-y-6 animate-fade-in">
                          {/* Estimated Band */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold">Estimated Band</h3>
                              <Badge variant="secondary" className="text-lg">
                                {feedback.estimatedBand}
                              </Badge>
                            </div>
                            <Progress value={feedback.estimatedBand * 11.11} className="h-2" />
                          </div>

                          <Separator />

                          {/* Task Achievement */}
                          <div>
                            <h3 className="font-semibold mb-2">Task Achievement</h3>
                            <p className="text-sm text-muted-foreground">{feedback.taskAchievement}</p>
                          </div>

                          <Separator />

                          {/* Coherence & Cohesion */}
                          <div>
                            <h3 className="font-semibold mb-2">Coherence & Cohesion</h3>
                            <p className="text-sm text-muted-foreground">{feedback.coherenceCohesion}</p>
                          </div>

                          <Separator />

                          {/* Lexical Resource */}
                          <div>
                            <h3 className="font-semibold mb-2">Lexical Resource</h3>
                            <p className="text-sm text-muted-foreground">{feedback.lexicalResource}</p>
                          </div>

                          <Separator />

                          {/* Grammar */}
                          <div>
                            <h3 className="font-semibold mb-2">Grammatical Range & Accuracy</h3>
                            <p className="text-sm text-muted-foreground">{feedback.grammar}</p>
                          </div>

                          <Separator />

                          {/* Suggested Rewrites */}
                          <div>
                            <h3 className="font-semibold mb-3">Suggested Rewrites</h3>
                            <div className="space-y-2">
                              {feedback.suggestedRewrites.map((rewrite, idx) => (
                                <div key={idx} className="text-sm bg-muted/50 p-3 rounded-lg">
                                  {rewrite}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>

        <ConditionalFooter />
      </div>
      
      <InstagramGateModal 
        isOpen={gateModalOpen}
        onClose={() => setGateModalOpen(false)}
        featureName="WriterPro™"
        onVerificationSuccess={() => setGateModalOpen(false)}
      />
    </>
  );
};

export default WriterPro;
