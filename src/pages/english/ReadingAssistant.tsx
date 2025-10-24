import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, BookOpen, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import ConditionalFooter from "@/components/ConditionalFooter";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSubscription } from "@/hooks/useSubscription";
import { analyseEnglish, ReadingFeedback } from "@/lib/englishAnalysis";
import { useToast } from "@/hooks/use-toast";
import { useInstagramAccess } from "@/hooks/useInstagramAccess";
import { InstagramGateModal } from "@/components/InstagramGateModal";
import { InstagramAccessBadge } from "@/components/InstagramAccessBadge";

const ReadingAssistant = () => {
  const { subscriptionTier } = useSubscription();
  const { toast } = useToast();
  const isPro = subscriptionTier === 'pro' || subscriptionTier === 'elite';
  const { canAccess, remainingUses, trackUsage, openVerificationModal } = useInstagramAccess();
  
  const [passage, setPassage] = useState("");
  const [question, setQuestion] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<ReadingFeedback | null>(null);
  const [gateModalOpen, setGateModalOpen] = useState(false);

  const handleAnalyze = async () => {
    if (!canAccess('reading')) {
      openVerificationModal('Reading Assistant');
      return;
    }
    if (!passage.trim()) {
      toast({
        title: "Missing passage",
        description: "Please paste a reading passage to analyse.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyseEnglish('reading', { passage, question });
      setFeedback(result as ReadingFeedback);
      await trackUsage('reading');
      toast({
        title: "Analysis complete",
        description: "Your passage has been analyzed successfully."
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
        title="Reading Assistant — Comprehension Coach | NextDoc Global"
        description="Master IELTS/OET reading with AI summaries, vocabulary help, and answer explanations. Understand why answers are correct."
        keywords="IELTS reading, OET reading, reading comprehension, vocabulary, reading strategies"
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
                <span className="text-foreground">Reading Assistant</span>
              </div>
            </div>
          </div>

          {/* Access Banner */}
          {!isPro && (
            <div className="bg-primary/5 border-b border-primary/20">
              <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <InstagramAccessBadge featureType="reading" showUsage />
                  <p className="text-sm">
                    {canAccess('reading') ? (
                      <><strong>{remainingUses('reading')}/1</strong> free analysis remaining today</>
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
                <strong>Tip:</strong> Use official IELTS/OET reading passages for best results.
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
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Reading Assistant</CardTitle>
                          <CardDescription>Comprehension Coach</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="passage">Paste Passage</Label>
                        <Textarea
                          id="passage"
                          placeholder="Paste the reading passage here..."
                          className="min-h-[250px]"
                          value={passage}
                          onChange={(e) => setPassage(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="question">Your Question (Optional)</Label>
                        <Textarea
                          id="question"
                          placeholder="e.g., Why is answer C correct? What does 'paradigm shift' mean in this context?"
                          className="min-h-[100px]"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                        />
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
                          <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-20" />
                          <p>Submit a passage to see AI feedback</p>
                        </div>
                      ) : (
                        <div className="space-y-6 animate-fade-in">
                          {/* Simple Summary */}
                          <div>
                            <h3 className="font-semibold mb-2">Simple Summary</h3>
                            <p className="text-sm text-muted-foreground">{feedback.summary}</p>
                          </div>

                          <Separator />

                          {/* Vocabulary in Context */}
                          <div>
                            <h3 className="font-semibold mb-3">Vocabulary in Context</h3>
                            <div className="space-y-2">
                              {feedback.vocabularyInContext.map((item, idx) => (
                                <div key={idx} className="text-sm bg-muted/50 p-3 rounded-lg">
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          {/* Why This Answer Is Correct */}
                          <div>
                            <h3 className="font-semibold mb-2">Why This Answer Is Correct</h3>
                            <p className="text-sm text-muted-foreground">{feedback.whyThisAnswer}</p>
                          </div>

                          <Separator />

                          {/* Reading Strategies */}
                          <div>
                            <h3 className="font-semibold mb-3">Reading Strategies for This Passage</h3>
                            <ul className="space-y-2">
                              {feedback.readingStrategies.map((strategy, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                                  <span className="text-primary">•</span>
                                  <span>{strategy}</span>
                                </li>
                              ))}
                            </ul>
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
        featureName="Reading Assistant"
        onVerificationSuccess={() => setGateModalOpen(false)}
      />
    </>
  );
};

export default ReadingAssistant;
