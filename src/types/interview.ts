export type RubricTag = 
  | 'nhs_values' 
  | 'clinical' 
  | 'governance' 
  | 'communication' 
  | 'portfolio' 
  | 'leadership' 
  | 'teaching';

export interface InterviewConfig {
  pathway: string;
  roleLevel: string;
  specialty: string;
  interviewType: string;
  focusAreas: string[];
}

export interface InterviewPayload {
  presetId: string;
  pathway: string;
  roleLevel: string;
  specialty: string;
  interviewType: string;
  focusAreas: RubricTag[];
  mix: Record<RubricTag, number>;
  qbankVersion: string;
  count: number;
}

export interface InterviewQuestion {
  id: string;
  prompt: string;
  type: RubricTag;
  rubricTags: RubricTag[];
  category: string;
  timeLimit: number;
  specialty: string;
  roleLevel: string;
}

export interface InterviewSession {
  sessionId: string;
  config: InterviewConfig;
  questions: InterviewQuestion[];
  createdAt: string;
}

export interface InterviewAnswer {
  questionId: string;
  text: string;
  audioUrl?: string;
}

export interface RedFlag {
  code: 'UNSAFE_PRACTICE' | 'DISCRIMINATION' | 'CONFIDENTIALITY' | 'GOVERNANCE';
  rationale: string;
}

export interface AIReviewItem {
  questionId: string;
  score: number;
  strengths: string[];
  improvements: string[];
  redflags: RedFlag[];
}

export interface AIReview {
  overallScore: number;
  items: AIReviewItem[];
  overall: {
    mean_score: number;
    summary: string;
  };
}
