import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Clock, MessageSquare, Mic, Square, Play } from "lucide-react";

interface InterviewSessionProps {
  session: any;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const InterviewSession = ({ session, onComplete, onBack }: InterviewSessionProps) => {
  const { questions, config } = session;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(questions[0]?.timeLimit || 180);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sessionStarted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionStarted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartSession = () => {
    setSessionStarted(true);
    setTimeRemaining(questions[0].timeLimit);
  };

  const handleNextQuestion = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = currentAnswer;
    setAnswers(updatedAnswers);
    setCurrentAnswer("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeRemaining(questions[currentQuestion + 1].timeLimit);
    } else {
      // Complete the session
      onComplete({
        config,
        questions,
        answers: [...updatedAnswers, currentAnswer],
        sessionId: session.sessionId
      });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestion] = currentAnswer;
      setAnswers(updatedAnswers);
      
      setCurrentQuestion(currentQuestion - 1);
      setCurrentAnswer(answers[currentQuestion - 1] || "");
      setTimeRemaining(questions[currentQuestion - 1].timeLimit);
    }
  };

  const handleRecordToggle = () => {
    setIsRecording(!isRecording);
    // In real implementation, this would handle audio recording
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (!sessionStarted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Ready to Start Your Interview?</CardTitle>
          <CardDescription>
            You'll have {questions.length} questions. Take your time and answer as naturally as possible.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
            <h4 className="font-semibold text-blue-900 mb-2">Interview Session Details</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Session ID:</strong> <code className="bg-blue-100 px-1 rounded">{session.sessionId}</code></p>
              <p><strong>Pathway:</strong> {config.pathway}</p>
              <p><strong>Role Level:</strong> {config.roleLevel}</p>
              <p><strong>Specialty:</strong> {config.specialty}</p>
              <p><strong>Interview Type:</strong> {config.interviewType}</p>
              <p><strong>Questions:</strong> {questions.length} specialty-specific questions loaded</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Instructions:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0" />
                Each question has a suggested time limit (1-4 minutes)
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0" />
                Type your answers or use voice recording (coming soon)
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0" />
                You can review and edit answers before moving to the next question
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0" />
                AI feedback will be provided after completing all questions
              </li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Setup
            </Button>
            <Button onClick={handleStartSession} size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Play className="h-4 w-4 mr-2" />
              Start Interview
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
              <CardDescription>
                <Badge variant="secondary" className="mr-2">
                  {questions[currentQuestion].category}
                </Badge>
                Time remaining: {formatTime(timeRemaining)}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className={`text-sm font-mono ${timeRemaining < 30 ? 'text-red-500' : 'text-muted-foreground'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Interview Question
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {questions[currentQuestion].rubricTags?.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs bg-white">
                  {tag.replace('_', ' ').toUpperCase()}
                </Badge>
              ))}
              <Badge variant="secondary" className="text-xs">{questions[currentQuestion].category}</Badge>
            </div>
            <p className="text-lg font-medium text-blue-900">
              {questions[currentQuestion].prompt}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="answer" className="font-semibold">Your Answer:</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRecordToggle}
                  className={isRecording ? "bg-red-100 border-red-300" : ""}
                >
                  {isRecording ? (
                    <>
                      <Square className="h-4 w-4 mr-1 text-red-500" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-1" />
                      Record Voice
                    </>
                  )}
                </Button>
                <span className="text-xs text-muted-foreground">(Coming Soon)</span>
              </div>
            </div>

            <Textarea
              id="answer"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer here... Use the STAR method (Situation, Task, Action, Result) for behavioral questions."
              className="min-h-[200px]"
            />

            <div className="text-xs text-muted-foreground">
              <p>💡 <strong>Tip:</strong> Structure your answer clearly. For clinical scenarios, mention patient safety, team communication, and learning outcomes.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={currentQuestion === 0 ? onBack : handlePreviousQuestion}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {currentQuestion === 0 ? "Back to Setup" : "Previous Question"}
        </Button>
        
        <Button 
          onClick={handleNextQuestion}
          disabled={!currentAnswer.trim()}
          className="flex items-center gap-2"
        >
          {currentQuestion === questions.length - 1 ? "Complete Interview" : "Next Question"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default InterviewSession;