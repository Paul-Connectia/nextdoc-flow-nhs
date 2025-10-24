import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Headphones, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import ConditionalFooter from "@/components/ConditionalFooter";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSubscription } from "@/hooks/useSubscription";
import { analyseEnglish, ListeningFeedback } from "@/lib/englishAnalysis";
import { useToast } from "@/hooks/use-toast";
import { useInstagramAccess } from "@/hooks/useInstagramAccess";
import { InstagramGateModal } from "@/components/InstagramGateModal";
import { InstagramAccessBadge } from "@/components/InstagramAccessBadge";

const TranscriptAnalyzer = () => {
  const { subscriptionTier } = useSubscription();
  const { toast } = useToast();
  const isPro = subscriptionTier === 'pro' || subscriptionTier === 'elite';
  const { canAccess, remainingUses, trackUsage, openVerificationModal } = useInstagramAccess();
  
  const [transcript, setTranscript] = useState("");
  const [question, setQuestion] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<ListeningFeedback | null>(null);
  const [gateModalOpen, setGateModalOpen] = useState(false);

  const handleAnalyze = async () => {
    if (!canAccess('transcript')) {
      openVerificationModal('Transcript Analyzer');
      return;
    }
    if (!transcript.trim()) {
      toast({
        title: "Missing transcript",
        description: "Please paste a transcript to analyse.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyseEnglish('listening', { transcript, question });
      setFeedback(result as ListeningFeedback);
      await trackUsage('transcript');
      toast({
        title: "Analysis complete",
        description: "Your transcript has been analyzed successfully."
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
        title="Transcript Analyzer — Listening Companion | NextDoc Global"
        description="Understand IELTS/OET listening answers with AI analysis. Get rationale, key evidence, vocabulary explanations, and listening tips."
        keywords="IELTS listening, OET listening, transcript analysis, listening comprehension"
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
                <span className="text-foreground">Transcript Analyzer</span>
              </div>
            </div>
          </div>

          {/* Access Banner */}
          {!isPro && (
            <div className="bg-primary/5 border-b border-primary/20">
              <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <InstagramAccessBadge featureType="transcript" showUsage />
                  <p className="text-sm">
                    {canAccess('transcript') ? (
                      <><strong>{remainingUses('transcript')}/1</strong> free analysis remaining today</>
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
                <strong>Tip:</strong> Use official IELTS/OET listening transcripts for best results.
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
                          <Headphones className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Transcript Analyzer</CardTitle>
                          <CardDescription>Listening Companion</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="transcript">Paste Transcript</Label>
                        <Textarea
                          id="transcript"
                          placeholder="Paste the listening transcript here..."
                          className="min-h-[250px]"
                          value={transcript}
                          onChange={(e) => setTranscript(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="question">Your Question</Label>
                        <Textarea
                          id="question"
                          placeholder="e.g., Why is answer B correct, not C?"
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
                          <Headphones className="h-12 w-12 mx-auto mb-4 opacity-20" />
                          <p>Submit a transcript to see AI feedback</p>
                        </div>
                      ) : (
                        <div className="space-y-6 animate-fade-in">
                          {/* Answer Rationale */}
                          <div>
                            <h3 className="font-semibold mb-2">Answer Rationale</h3>
                            <p className="text-sm text-muted-foreground">{feedback.answerRationale}</p>
                          </div>

                          <Separator />

                          {/* Key Evidence */}
                          <div>
                            <h3 className="font-semibold mb-3">Key Evidence from Transcript</h3>
                            <div className="space-y-2">
                              {feedback.keyEvidence.map((evidence, idx) => (
                                <div key={idx} className="text-sm bg-primary/5 border-l-4 border-primary p-3 rounded">
                                  {evidence}
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          {/* Vocabulary & Idioms */}
                          <div>
                            <h3 className="font-semibold mb-3">Vocabulary & Idioms in Context</h3>
                            <div className="space-y-2">
                              {feedback.vocabularyIdioms.map((item, idx) => (
                                <div key={idx} className="text-sm bg-muted/50 p-3 rounded-lg">
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          {/* Listening Tips */}
                          <div>
                            <h3 className="font-semibold mb-3">Grammar/Listening Tips</h3>
                            <ul className="space-y-2">
                              {feedback.tips.map((tip, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                                  <span className="text-primary">•</span>
                                  <span>{tip}</span>
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
        featureName="Transcript Analyzer"
        onVerificationSuccess={() => setGateModalOpen(false)}
      />
    </>
  );
};

export default TranscriptAnalyzer;
