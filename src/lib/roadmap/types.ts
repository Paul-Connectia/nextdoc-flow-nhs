export interface BuildParams {
  exam: string;
  track: string;
  wizardAnswers: {
    personal: {
      fullName: string;
      nationality: string;
      currentLocation: string;
      graduationYear: string;
      gmcNumber?: string;
      medicalDegree: string;
    };
    status: {
      visaStatus: string;
      nhsExperience: string;
      currentRole: string;
      englishTest: string;
      trainingLevel?: string;
      affiliatedCollege?: string;
    };
    exams: {
      completedExams: string[];
      currentStudy?: string;
      otherExams?: string;
    };
    goals: {
      targetRole: string;
      specialtyInterest: string;
      preferredLocation: string;
      timeframe: string;
    };
  };
}

export interface RoadmapAction {
  label: string;
  href: string;
}

export interface RoadmapDeadline {
  label: string;
  date?: string;
  daysFromToday?: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'inProgress' | 'notStarted';
  actions: RoadmapAction[];
  deadline?: RoadmapDeadline;
  evidence?: string[];
}

export interface Recommendation {
  label: string;
  href: string;
  description: string;
}

export interface Roadmap {
  title: string;
  completionPct: number;
  milestones: Milestone[];
  deadlines: RoadmapDeadline[];
  recommendations: Recommendation[];
}

export type RoadmapBuilder = (params: BuildParams) => Roadmap;
