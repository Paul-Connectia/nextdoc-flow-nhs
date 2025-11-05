import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageSquare, CheckCircle, AlertCircle, Download, Play, Mic, RotateCcw, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ConditionalFooter from "@/components/ConditionalFooter";
import InterviewSetup from "@/components/InterviewSetup";
import InterviewSession from "@/components/InterviewSession";
import { startInterviewSession, submitAnswers, getAIReview } from "@/services/interviewApi";
import { validateQuestions } from "@/lib/interviewHelpers";
import { InterviewSession as InterviewSessionType, InterviewAnswer, AIReview } from "@/types/interview";
import { toast } from "sonner";
import { DebugPanel } from "@/components/interview/DebugPanel";

const InterviewSim = () => {
  const [currentStep, setCurrentStep] = useState<"setup" | "interview" | "results">("setup");
  const [interviewConfig, setInterviewConfig] = useState<any>(null);
  const [session, setSession] = useState<InterviewSessionType | null>(null);
  const [sessionData, setSessionData] = useState<any>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [aiReview, setAiReview] = useState<AIReview | null>(null);
  const [isLoadingReview, setIsLoadingReview] = useState(false);

  const handleSetupComplete = async (data: { config: any; payload: any }) => {
    const { config, payload } = data;
    setInterviewConfig(data);
    setIsLoadingSession(true);
    setValidationError(null);

    try {
      toast.info("Starting your interview session...");
      const newSession = await startInterviewSession(payload);

      // Validate returned questions match expected specialty/role
      const validation = validateQuestions(
        newSession.questions,
        config.specialty,
        config.roleLevel
      );

      if (!validation.valid) {
        setValidationError(validation.errors.join("; "));
        toast.error("Question validation failed", {
          description: "The questions don't match your selected specialty/role. Please contact support."
        });
        console.error("❌ Validation Errors:", validation.errors);
        return; // Don't proceed
      }

      console.log("✅ Session started successfully:", newSession.sessionId);
      console.log("✅ Questions validated:", newSession.questions.length, "specialty-specific questions loaded");

      setSession(newSession);
      setCurrentStep("interview");
      toast.success("Interview session ready!");

    } catch (error) {
      console.error("Failed to start interview:", error);
      toast.error("Failed to start interview", {
        description: error instanceof Error ? error.message : "Please try again or contact support."
      });
    } finally {
      setIsLoadingSession(false);
    }
  };

  const handleSessionComplete = async (data: any) => {
    setSessionData(data);
    setCurrentStep("results");

    if (!session) {
      console.error("No session found");
      return;
    }

    // Submit answers to API
    const answers: InterviewAnswer[] = data.answers.map((text: string, idx: number) => ({
      questionId: session.questions[idx].id,
      text,
      audioUrl: undefined
    }));

    try {
      await submitAnswers(session.sessionId, answers);
      console.log("✅ Answers submitted successfully");
    } catch (error) {
      console.error("Failed to submit answers:", error);
      toast.error("Failed to save answers");
    }

    // Fetch AI review
    setIsLoadingReview(true);
    try {
      toast.info("AI is analyzing your answers...");
      const review = await getAIReview(session.sessionId);
      setAiReview(review);
      toast.success("AI review complete!");
      console.log("✅ AI Review received:", review);
    } catch (error) {
      console.error("Failed to get AI review:", error);
      toast.error("Failed to load AI review");
    } finally {
      setIsLoadingReview(false);
    }
  };

  const aiFeedback = {
    overallScore: 78,
    scores: [
      { question: "Tell us about yourself", score: 85, feedback: "Good structure, clear career journey. Add more NHS values." },
      { question: "Why do you want to work for the NHS?", score: 92, feedback: "Excellent passion for NHS values. Very convincing." },
      { question: "Describe a challenging patient situation", score: 65, feedback: "Good scenario but needs more focus on patient safety." },
      { question: "How do you handle stress?", score: 70, feedback: "Practical examples given. Could mention team support more." },
      { question: "Where do you see yourself in 5 years?", score: 80, feedback: "Clear career goals. Link better to this specific role." }
    ],
    strengths: [
      "Clear communication style",
      "Good understanding of NHS values",
      "Relevant clinical examples"
    ],
    improvements: [
      "Strengthen patient safety focus",
      "More structured STAR responses",
      "Include team collaboration examples"
    ],
    redFlags: []
  };

  const renderResults = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Interview Assessment Complete
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-blue-600">{aiFeedback.overallScore}%</div>
              <div>
                <p className="font-semibold text-lg">Overall Interview Score</p>
                <p className="text-muted-foreground">Above average performance for this role</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Key Strengths
                </h4>
                <ul className="space-y-2">
                  {aiFeedback.strengths.map((strength, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-orange-600 mb-3 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  Areas for Improvement
                </h4>
                <ul className="space-y-2">
                  {aiFeedback.improvements.map((improvement, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-2 flex-shrink-0" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Question-by-Question Breakdown</h4>
              <div className="space-y-3">
                {aiFeedback.scores.map((item, index) => (
                  <div key={index} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.question}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.feedback}</p>
                    </div>
                    <div className="ml-4">
                      <Badge variant={item.score >= 80 ? "default" : item.score >= 70 ? "secondary" : "destructive"}>
                        {item.score}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-center flex-wrap">
        <Button variant="outline" onClick={() => setCurrentStep("setup")} className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4" />
          Try Another Interview
        </Button>
        <Button onClick={() => { }} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
        <Button variant="secondary" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Book Mentor Review
        </Button>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h4 className="font-semibold text-blue-900 mb-2">Ready for the Real Thing?</h4>
            <p className="text-sm text-blue-700 mb-4">
              Boost your confidence with mentor feedback and CV optimization
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                CV Booster™
              </Button>
              <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                CPD Mastery™
              </Button>
              <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                1:1 Mentorship
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/products" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-foreground">InterviewSim™</h1>
            <Badge variant="secondary">AI-Powered</Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            Practice NHS interviews with AI feedback and mentor review
          </p>
        </div>

        {/* <div className="max-w-6xl mx-auto">
          {validationError && (
            <Card className="bg-red-50 border-red-200 mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-900 text-lg mb-2">🚨 Question Mismatch Detected</h4>
                    <p className="text-sm text-red-700 mb-3">{validationError}</p>
                    <Button variant="outline" size="sm" onClick={() => { setValidationError(null); setCurrentStep("setup"); }} className="border-red-300 text-red-700">
                      Back to Setup
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {isLoadingSession && (
            <Card><CardContent className="pt-12 pb-12 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-lg font-semibold mb-2">Starting Your Interview Session</p>
              <p className="text-muted-foreground">Generating {interviewConfig?.config?.specialty} questions...</p>
            </CardContent></Card>
          )}

          {currentStep === "setup" && !isLoadingSession && (
            <InterviewSetup onComplete={handleSetupComplete} />
          )}
          
          {currentStep === "interview" && session && !isLoadingSession && (
            <>
              <InterviewSession 
                session={session}
                onComplete={handleSessionComplete}
                onBack={() => { setCurrentStep("setup"); setSession(null); }}
              />
              <DebugPanel payload={interviewConfig?.payload} session={session} />
            </>
          )}
          
          {currentStep === "results" && (
            isLoadingReview ? (
              <Card><CardContent className="pt-12 pb-12 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-lg font-semibold">AI Analysis in Progress</p>
              </CardContent></Card>
            ) : renderResults()
          )}
        </div> */}
      </div>

      <ConditionalFooter />
    </div>
  );
};

export default InterviewSim;