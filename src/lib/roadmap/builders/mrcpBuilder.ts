import { RoadmapBuilder, Milestone } from '../types';
import englishBlock from '@/data/roadmapBlocks/common/english.json';
import gmcBlock from '@/data/roadmapBlocks/common/gmc.json';
import part1Block from '@/data/roadmapBlocks/mrcp/part1.json';
import part2Block from '@/data/roadmapBlocks/mrcp/part2.json';
import pacesBlock from '@/data/roadmapBlocks/mrcp/paces.json';

export const mrcpBuilder: RoadmapBuilder = (params) => {
  const { wizardAnswers } = params;
  const completed = wizardAnswers.exams.completedExams || [];
  const milestones: Milestone[] = [];
  
  // Add English requirement if needed
  if (!['native', 'exempted'].includes(wizardAnswers.status.englishTest)) {
    milestones.push({
      ...englishBlock,
      status: completed.includes('IELTS Academic') || completed.includes('OET Medicine') 
        ? 'completed' 
        : 'notStarted'
    } as Milestone);
  }
  
  // Add GMC registration if no GMC number
  if (!wizardAnswers.personal.gmcNumber) {
    milestones.push({
      ...gmcBlock,
      status: 'notStarted'
    } as Milestone);
  }
  
  // Add MRCP exam milestones
  milestones.push({
    ...part1Block,
    status: completed.includes('MRCP Part 1') ? 'completed' : 
            wizardAnswers.exams.currentStudy === 'MRCP Part 1' ? 'inProgress' : 
            'notStarted'
  } as Milestone);
  
  milestones.push({
    ...part2Block,
    status: completed.includes('MRCP Part 2 Written') ? 'completed' : 
            wizardAnswers.exams.currentStudy === 'MRCP Part 2 Written' ? 'inProgress' : 
            'notStarted'
  } as Milestone);
  
  milestones.push({
    ...pacesBlock,
    status: completed.includes('MRCP PACES') ? 'completed' : 
            wizardAnswers.exams.currentStudy === 'MRCP PACES' ? 'inProgress' : 
            'notStarted'
  } as Milestone);
  
  // Calculate completion
  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const completionPct = Math.round((completedCount / milestones.length) * 100);
  
  // Generate deadlines
  const deadlines = milestones
    .filter(m => m.deadline)
    .map(m => m.deadline!);
  
  // Generate recommendations
  const recommendations = [];
  
  if (milestones.some(m => m.status === 'inProgress')) {
    recommendations.push({
      label: 'CV Booster',
      href: '/cv-booster',
      description: 'Optimise your CV for specialty training applications'
    });
    
    recommendations.push({
      label: 'Interview Simulator',
      href: '/interviewsim',
      description: 'Practice clinical scenarios and exam vivas with AI feedback'
    });
  }
  
  if (completionPct > 50) {
    recommendations.push({
      label: 'Find a Mentor',
      href: '/mentors',
      description: 'Connect with consultants who have successfully passed MRCP'
    });
  }
  
  return {
    title: `MRCP Pathway Roadmap - ${wizardAnswers.personal.fullName}`,
    completionPct,
    milestones,
    deadlines,
    recommendations
  };
};
