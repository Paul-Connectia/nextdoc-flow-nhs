import { RoadmapBuilder } from '../types';
import englishBlock from '@/data/roadmapBlocks/common/english.json';
import gmcBlock from '@/data/roadmapBlocks/common/gmc.json';

export const defaultBuilder: RoadmapBuilder = (params) => {
  const { wizardAnswers, exam } = params;
  const completed = wizardAnswers.exams.completedExams || [];
  const milestones = [];
  
  // Add basic prerequisites
  if (!['native', 'exempted'].includes(wizardAnswers.status.englishTest)) {
    milestones.push({
      ...englishBlock,
      status: completed.includes('IELTS Academic') || completed.includes('OET Medicine') 
        ? 'completed' 
        : 'notStarted'
    });
  }
  
  if (!wizardAnswers.personal.gmcNumber) {
    milestones.push({
      ...gmcBlock,
      status: 'notStarted'
    });
  }
  
  // Add generic exam milestone
  milestones.push({
    id: `${exam}-examination`,
    title: `${exam.toUpperCase()} Examination`,
    description: `Complete the ${exam.toUpperCase()} examination requirements`,
    status: 'notStarted' as const,
    actions: [
      { label: 'View Requirements', href: '/gapmap/other-uk-exams' },
      { label: 'Study Resources', href: '/study-materials' }
    ],
    evidence: ['Exam certificate', 'Supporting documents']
  });
  
  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const completionPct = Math.round((completedCount / milestones.length) * 100);
  
  return {
    title: `${exam.toUpperCase()} Pathway Roadmap - ${wizardAnswers.personal.fullName}`,
    completionPct,
    milestones,
    deadlines: milestones.filter(m => m.deadline).map(m => m.deadline!),
    recommendations: [
      {
        label: 'CV Booster',
        href: '/cv-booster',
        description: 'Optimise your CV for specialty applications'
      }
    ]
  };
};
