import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Mic, Loader2, Square } from "lucide-react";
import Navigation from "@/components/Navigation";
import ConditionalFooter from "@/components/ConditionalFooter";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSubscription } from "@/hooks/useSubscription";
import { analyseEnglish, SpeakingFeedback } from "@/lib/englishAnalysis";
import { useToast } from "@/hooks/use-toast";
import { useInstagramAccess } from "@/hooks/useInstagramAccess";
import { InstagramGateModal } from "@/components/InstagramGateModal";
import { InstagramAccessBadge } from "@/components/InstagramAccessBadge";

const SpeechSim = () => {
  const { subscriptionTier } = useSubscription();
  const { toast } = useToast();
  const isPro = subscriptionTier === 'pro' || subscriptionTier === 'elite';
  const { canAccess, remainingUses, trackUsage, openVerificationModal } = useInstagramAccess();
  
  const [cueCard, setCueCard] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<SpeakingFeedback | null>(null);
  const [gateModalOpen, setGateModalOpen] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    toast({
      title: "Recording started",
      description: "Speak clearly into your microphone."
    });
  };

  const handleStopAndAnalyze = async () => {
    if (!canAccess('speaking')) {
      openVerificationModal('SpeechSim™');
      setIsRecording(false);
      return;
    }
    
    setIsRecording(false);
    setIsAnalyzing(true);
    
    try {
      const result = await analyseEnglish('speaking', { cueCard });
      setFeedback(result as SpeakingFeedback);
      await trackUsage('speaking');
      toast({
        title: "Analysis complete",
        description: "Your speaking has been analyzed successfully."
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
        title="SpeechSim™ — AI Speaking Partner | NextDoc Global"
        description="Practice IELTS/OET speaking with AI feedback on fluency, pronunciation, grammar, and vocabulary. Get band score estimates instantly."
        keywords="IELTS speaking, OET speaking, speaking practice, pronunciation feedback, fluency"
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
                <span className="text-foreground">SpeechSim™</span>
              </div>
            </div>
          </div>

          {/* Access Banner */}
          {!isPro && (
            <div className="bg-primary/5 border-b border-primary/20">
              <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <InstagramAccessBadge featureType="speaking" showUsage />
                  <p className="text-sm">
                    {canAccess('speaking') ? (
                      <><strong>{remainingUses('speaking')}/1</strong> free analysis remaining today</>
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
                <strong>Tip:</strong> Use official IELTS/OET speaking prompts for best results. Speak clearly and naturally.
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
                          <Mic className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle>SpeechSim™</CardTitle>
                          <CardDescription>AI Speaking Partner</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cueCard">Cue Card / Prompt (Optional)</Label>
                        <Textarea
                          id="cueCard"
                          placeholder="e.g., Describe a time when you helped someone..."
                          className="min-h-[120px]"
                          value={cueCard}
                          onChange={(e) => setCueCard(e.target.value)}
                        />
                      </div>

                      {/* Recording Controls */}
                      <div className="space-y-3">
                        {!isRecording ? (
                          <Button 
                            onClick={handleStartRecording} 
                            className="w-full"
                            variant="default"
                          >
                            <Mic className="mr-2 h-4 w-4" />
                            Start Recording
                          </Button>
                        ) : (
                          <>
                            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
                              <div className="flex items-center justify-center gap-2 mb-2">
                                <div className="h-3 w-3 bg-destructive rounded-full animate-pulse" />
                                <span className="text-sm font-medium text-destructive">Recording in progress...</span>
                              </div>
                              <div className="h-12 bg-muted/50 rounded flex items-center justify-center">
                                <div className="flex gap-1">
                                  {[...Array(20)].map((_, i) => (
                                    <div 
                                      key={i} 
                                      className="w-1 bg-primary/50 rounded animate-pulse"
                                      style={{ 
                                        height: `${Math.random() * 40 + 10}px`,
                                        animationDelay: `${i * 0.1}s`
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <Button 
                              onClick={handleStopAndAnalyze} 
                              disabled={isAnalyzing}
                              className="w-full"
                              variant="destructive"
                            >
                              {isAnalyzing ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Analyzing...
                                </>
                              ) : (
                                <>
                                  <Square className="mr-2 h-4 w-4" />
                                  Stop & Analyze
                                </>
                              )}
                            </Button>
                          </>
                        )}
                      </div>
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
                          <Mic className="h-12 w-12 mx-auto mb-4 opacity-20" />
                          <p>Record your response to see AI feedback</p>
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
                          </div>

                          <Separator />

                          {/* Fluency & Coherence */}
                          <div>
                            <h3 className="font-semibold mb-2">Fluency & Coherence</h3>
                            <p className="text-sm text-muted-foreground">{feedback.fluencyCoherence}</p>
                          </div>

                          <Separator />

                          {/* Pronunciation */}
                          <div>
                            <h3 className="font-semibold mb-2">Pronunciation</h3>
                            <p className="text-sm text-muted-foreground">{feedback.pronunciation}</p>
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

                          {/* Phrases to Upgrade */}
                          <div>
                            <h3 className="font-semibold mb-3">Phrases to Upgrade</h3>
                            <div className="space-y-2">
                              {feedback.phrasesToUpgrade.map((phrase, idx) => (
                                <div key={idx} className="text-sm bg-muted/50 p-3 rounded-lg">
                                  {phrase}
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
        featureName="SpeechSim™"
        onVerificationSuccess={() => setGateModalOpen(false)}
      />
    </>
  );
};

export default SpeechSim;
