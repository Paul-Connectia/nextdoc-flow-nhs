import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, Flag, ChevronRight, ChevronLeft, Clock, 
  CheckCircle2, XCircle, AlertTriangle, RotateCcw 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useInstagramAccess } from '@/hooks/useInstagramAccess';
import { InstagramGateModal } from '@/components/InstagramGateModal';
import { InstagramAccessBadge } from '@/components/InstagramAccessBadge';

interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  rationale: string;
  category: string;
  difficulty: string;
  cpd_tag: boolean;
}

interface QuizSession {
  id: string;
  current_question: number;
  total_questions: number;
  answers: any[];
  flagged_questions: number[];
  filters: any;
  completed: boolean;
  score: number;
}

const PLABQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showRationale, setShowRationale] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [quizSession, setQuizSession] = useState<QuizSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    cpd_tag: ''
  });
  const [gateModalOpen, setGateModalOpen] = useState(false);
  const { toast } = useToast();
  const { canAccess, remainingUses, trackUsage, openVerificationModal, isPaidUser } = useInstagramAccess();

  const categories = ['Emergency', 'Surgery', 'Medicine', 'Pediatrics', 'Obstetrics', 'Psychiatry'];
  const difficulties = ['Basic', 'Core', 'Advanced'];

  useEffect(() => {
    initializeQuiz();
  }, []);

  const initializeQuiz = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please log in to access the quiz.",
          variant: "destructive"
        });
        return;
      }

      // Check Instagram access for non-paid users
      if (!isPaidUser && !canAccess('quiz')) {
        openVerificationModal('Daily PLAB Quiz');
        setIsLoading(false);
        return;
      }

      // Check for existing quiz session
      const { data: existingSession } = await supabase
        .from('quiz_sessions')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('quiz_type', 'PLAB-1')
        .eq('completed', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (existingSession) {
        setQuizSession(existingSession as QuizSession);
        setCurrentQuestionIndex(existingSession.current_question - 1);
        setFlaggedQuestions(new Set(existingSession.flagged_questions));
        setFilters((existingSession.filters as any) || { category: '', difficulty: '', cpd_tag: '' });
      }

      // Load questions based on filters
      await loadQuestions();
    } catch (error) {
      console.error('Quiz initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadQuestions = async () => {
    try {
      let query = supabase
        .from('plab_questions')
        .select('*')
        .limit(50);

      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      if (filters.difficulty) {
        query = query.eq('difficulty', filters.difficulty);
      }
      if (filters.cpd_tag) {
        query = query.eq('cpd_tag', filters.cpd_tag === 'yes');
      }

      const { data, error } = await query;

      if (error) throw error;

      if (data && data.length > 0) {
        setQuestions(data as Question[]);
        
        // Create new session if none exists
        if (!quizSession) {
          await createNewSession(data.length);
        }
      } else {
        // Insert sample questions if none exist
        await insertSampleQuestions();
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      toast({
        title: "Error loading questions",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const insertSampleQuestions = async () => {
    const sampleQuestions = [
      {
        question_text: "A 45-year-old man presents with chest pain and shortness of breath. ECG shows ST elevation in leads V1-V4. What is the most likely diagnosis?",
        option_a: "Unstable angina",
        option_b: "Anterior STEMI",
        option_c: "Pulmonary embolism",
        option_d: "Pericarditis",
        correct_answer: "B",
        rationale: "ST elevation in leads V1-V4 indicates an anterior ST-elevation myocardial infarction (STEMI), typically caused by occlusion of the left anterior descending artery.",
        category: "Emergency",
        difficulty: "Core",
        cpd_tag: true
      },
      {
        question_text: "Which of the following is the first-line treatment for hypertension in a 60-year-old diabetic patient?",
        option_a: "Thiazide diuretic",
        option_b: "ACE inhibitor",
        option_c: "Beta blocker",
        option_d: "Calcium channel blocker",
        correct_answer: "B",
        rationale: "ACE inhibitors are first-line for diabetic patients with hypertension due to their renoprotective effects and cardiovascular benefits.",
        category: "Medicine",
        difficulty: "Basic",
        cpd_tag: false
      }
    ];

    const { error } = await supabase
      .from('plab_questions')
      .insert(sampleQuestions);

    if (!error) {
      // Fetch the inserted questions with IDs
      const { data: insertedQuestions } = await supabase
        .from('plab_questions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(sampleQuestions.length);
      
      if (insertedQuestions) {
        setQuestions(insertedQuestions as Question[]);
        await createNewSession(insertedQuestions.length);
      }
    }
  };

  const createNewSession = async (totalQuestions: number) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('quiz_sessions')
        .insert({
          user_id: session.user.id,
          quiz_type: 'PLAB-1',
          total_questions: totalQuestions,
          filters: filters
        })
        .select()
        .single();

      if (error) throw error;
      setQuizSession(data as QuizSession);
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !quizSession) return;

    setIsAnswerSubmitted(true);
    setShowRationale(true);

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    // Track usage for Instagram-verified users
    if (!isPaidUser) {
      await trackUsage('quiz');
    }

    // Update session with answer
    const updatedAnswers = [...(quizSession.answers || [])];
    updatedAnswers[currentQuestionIndex] = {
      question_id: currentQuestion.id,
      selected_answer: selectedAnswer,
      correct_answer: currentQuestion.correct_answer,
      is_correct: isCorrect
    };

    try {
      const { error } = await supabase
        .from('quiz_sessions')
        .update({
          answers: updatedAnswers,
          current_question: currentQuestionIndex + 1,
          score: updatedAnswers.filter(a => a.is_correct).length
        })
        .eq('id', quizSession.id);

      if (error) throw error;

      setQuizSession({
        ...quizSession,
        answers: updatedAnswers,
        current_question: currentQuestionIndex + 1,
        score: updatedAnswers.filter(a => a.is_correct).length
      });
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowRationale(false);
      setIsAnswerSubmitted(false);
      
      // Check if this question was already answered
      if (quizSession?.answers?.[currentQuestionIndex + 1]) {
        const savedAnswer = quizSession.answers[currentQuestionIndex + 1];
        setSelectedAnswer(savedAnswer.selected_answer);
        setShowRationale(true);
        setIsAnswerSubmitted(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer('');
      setShowRationale(false);
      setIsAnswerSubmitted(false);

      // Load previous answer if exists
      if (quizSession?.answers?.[currentQuestionIndex - 1]) {
        const savedAnswer = quizSession.answers[currentQuestionIndex - 1];
        setSelectedAnswer(savedAnswer.selected_answer);
        setShowRationale(true);
        setIsAnswerSubmitted(true);
      }
    }
  };

  const toggleFlag = async () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestionIndex)) {
      newFlagged.delete(currentQuestionIndex);
    } else {
      newFlagged.add(currentQuestionIndex);
    }
    setFlaggedQuestions(newFlagged);

    if (quizSession) {
      await supabase
        .from('quiz_sessions')
        .update({ flagged_questions: Array.from(newFlagged) })
        .eq('id', quizSession.id);
    }
  };

  const handleFilterChange = async (filterType: string, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    // Reset quiz with new filters
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowRationale(false);
    setIsAnswerSubmitted(false);
    setQuizSession(null);
    
    await loadQuestions();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>No Questions Available</CardTitle>
            <CardDescription>
              Please try adjusting your filters or contact support.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            PLAB-1 Emergency Pack
          </h1>
          <div className="flex items-center gap-2">
            <InstagramAccessBadge featureType="quiz" showUsage />
            <Badge variant="outline">
              Q{currentQuestionIndex + 1}/{questions.length}
            </Badge>
          </div>
        </div>
        
        {!isPaidUser && canAccess('quiz') && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-green-700">
              📊 <strong>{remainingUses('quiz')}/5</strong> free questions remaining today. Follow @nextdoc_uk on Instagram for daily access!
            </p>
          </div>
        )}
        
        <Progress value={progress} className="mb-4" />
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filters.difficulty} onValueChange={(value) => handleFilterChange('difficulty', value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Levels</SelectItem>
              {difficulties.map(diff => (
                <SelectItem key={diff} value={diff}>{diff}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filters.cpd_tag} onValueChange={(value) => handleFilterChange('cpd_tag', value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="CPD Tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Questions</SelectItem>
              <SelectItem value="yes">CPD Tagged</SelectItem>
              <SelectItem value="no">Not CPD Tagged</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex gap-2">
              <Badge variant="secondary">{currentQuestion.category}</Badge>
              <Badge variant="outline">{currentQuestion.difficulty}</Badge>
              {currentQuestion.cpd_tag && <Badge>CPD</Badge>}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFlag}
              className={flaggedQuestions.has(currentQuestionIndex) ? 'bg-yellow-100' : ''}
            >
              <Flag className="h-4 w-4" />
            </Button>
          </div>
          <CardTitle className="text-lg leading-relaxed">
            {currentQuestion.question_text}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3 mb-6">
            {[
              { key: 'A', text: currentQuestion.option_a },
              { key: 'B', text: currentQuestion.option_b },
              { key: 'C', text: currentQuestion.option_c },
              { key: 'D', text: currentQuestion.option_d }
            ].map((option) => (
              <div
                key={option.key}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedAnswer === option.key
                    ? isAnswerSubmitted
                      ? option.key === currentQuestion.correct_answer
                        ? 'bg-green-50 border-green-300'
                        : 'bg-red-50 border-red-300'
                      : 'bg-primary/10 border-primary'
                    : 'hover:bg-muted border-border'
                } ${isAnswerSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                onClick={() => handleAnswerSelect(option.key)}
              >
                <div className="flex items-start gap-3">
                  <span className="font-medium text-primary">
                    {option.key}.
                  </span>
                  <span className="flex-1">{option.text}</span>
                  {isAnswerSubmitted && option.key === currentQuestion.correct_answer && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                  {isAnswerSubmitted && selectedAnswer === option.key && option.key !== currentQuestion.correct_answer && (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {!isAnswerSubmitted && selectedAnswer && (
            <Button onClick={handleSubmitAnswer} className="w-full mb-4">
              Submit Answer
            </Button>
          )}
          
          {showRationale && (
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Explanation:</strong> {currentQuestion.rationale}
              </AlertDescription>
            </Alert>
          )}
          
          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Quiz Stats */}
      {quizSession && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Session Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{quizSession.score || 0}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{flaggedQuestions.size}</div>
                <div className="text-sm text-muted-foreground">Flagged</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{currentQuestionIndex + 1}</div>
                <div className="text-sm text-muted-foreground">of {questions.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PLABQuiz;