import { InterviewPayload, InterviewSession, InterviewQuestion, InterviewAnswer, AIReview } from "@/types/interview";

const API_BASE = import.meta.env.VITE_SUPABASE_URL 
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`
  : '/api';

// Mock question database - specialty/role-specific questions
const MOCK_QUESTIONS: Record<string, InterviewQuestion[]> = {
  "pathology-consultant": [
    {
      id: "q-path-cons-values-001",
      prompt: "Which NHS values most inform your approach to leading a diagnostics service and how do you embody them day-to-day?",
      type: "nhs_values",
      rubricTags: ["nhs_values", "communication"],
      category: "NHS Values",
      timeLimit: 180,
      specialty: "pathology",
      roleLevel: "consultant"
    },
    {
      id: "q-path-cons-gov-002",
      prompt: "A critical histology result was delayed due to a process gap. How would you investigate and escalate within governance frameworks (duty of candour, SI thresholds, DATIX)?",
      type: "governance",
      rubricTags: ["governance", "clinical"],
      category: "Governance & Patient Safety",
      timeLimit: 240,
      specialty: "pathology",
      roleLevel: "consultant"
    },
    {
      id: "q-path-cons-clin-003",
      prompt: "Describe a time you balanced diagnostic uncertainty with patient safety in MDT discussions. What safeguards did you implement?",
      type: "clinical",
      rubricTags: ["clinical", "governance", "communication"],
      category: "Clinical Excellence",
      timeLimit: 240,
      specialty: "pathology",
      roleLevel: "consultant"
    },
    {
      id: "q-path-cons-comm-004",
      prompt: "How do you communicate complex diagnostic limitations to non-pathology colleagues and families while maintaining trust?",
      type: "communication",
      rubricTags: ["communication", "nhs_values"],
      category: "Communication",
      timeLimit: 180,
      specialty: "pathology",
      roleLevel: "consultant"
    },
    {
      id: "q-path-cons-port-005",
      prompt: "What QI/audit have you led that measurably improved turnaround times or error detection in the lab?",
      type: "portfolio",
      rubricTags: ["portfolio", "governance"],
      category: "Quality Improvement",
      timeLimit: 240,
      specialty: "pathology",
      roleLevel: "consultant"
    },
    {
      id: "q-path-cons-lead-006",
      prompt: "Describe your approach to managing a lab staffing crisis while maintaining diagnostic quality and safety.",
      type: "leadership",
      rubricTags: ["leadership", "governance"],
      category: "Leadership",
      timeLimit: 240,
      specialty: "pathology",
      roleLevel: "consultant"
    },
    {
      id: "q-path-cons-clin-007",
      prompt: "How do you ensure equity in diagnostic access across different patient populations served by your lab?",
      type: "clinical",
      rubricTags: ["clinical", "nhs_values"],
      category: "Clinical Excellence",
      timeLimit: 180,
      specialty: "pathology",
      roleLevel: "consultant"
    }
  ],
  "pathology-st3-st8": [
    {
      id: "q-path-st3-clin-001",
      prompt: "Describe your approach to reporting an unexpected finding that could change patient management. What are your escalation steps?",
      type: "clinical",
      rubricTags: ["clinical", "governance"],
      category: "Clinical Excellence",
      timeLimit: 180,
      specialty: "pathology",
      roleLevel: "st3-st8"
    },
    {
      id: "q-path-st3-values-002",
      prompt: "How do NHS values influence your daily work in the laboratory setting?",
      type: "nhs_values",
      rubricTags: ["nhs_values", "communication"],
      category: "NHS Values",
      timeLimit: 180,
      specialty: "pathology",
      roleLevel: "st3-st8"
    },
    {
      id: "q-path-st3-gov-003",
      prompt: "You notice a colleague's reporting error. How would you handle this situation?",
      type: "governance",
      rubricTags: ["governance", "communication"],
      category: "Governance & Patient Safety",
      timeLimit: 180,
      specialty: "pathology",
      roleLevel: "st3-st8"
    },
    {
      id: "q-path-st3-comm-004",
      prompt: "How do you explain complex histopathology findings to clinicians from other specialties in MDT meetings?",
      type: "communication",
      rubricTags: ["communication", "clinical"],
      category: "Communication",
      timeLimit: 180,
      specialty: "pathology",
      roleLevel: "st3-st8"
    },
    {
      id: "q-path-st3-port-005",
      prompt: "Describe an audit or QI project you've contributed to. What was your specific role and the outcome?",
      type: "portfolio",
      rubricTags: ["portfolio", "governance"],
      category: "Quality Improvement",
      timeLimit: 240,
      specialty: "pathology",
      roleLevel: "st3-st8"
    },
    {
      id: "q-path-st3-teach-006",
      prompt: "What teaching or supervision experience do you have with medical students or junior colleagues?",
      type: "teaching",
      rubricTags: ["teaching", "communication"],
      category: "Teaching & Supervision",
      timeLimit: 180,
      specialty: "pathology",
      roleLevel: "st3-st8"
    },
    {
      id: "q-path-st3-clin-007",
      prompt: "How do you manage your workload during busy periods while maintaining diagnostic accuracy?",
      type: "clinical",
      rubricTags: ["clinical", "governance"],
      category: "Clinical Excellence",
      timeLimit: 180,
      specialty: "pathology",
      roleLevel: "st3-st8"
    }
  ],
  "internal-medicine-consultant": [
    {
      id: "q-im-cons-clin-001",
      prompt: "Describe your approach to managing a complex multi-morbid patient with conflicting treatment priorities.",
      type: "clinical",
      rubricTags: ["clinical", "communication"],
      category: "Clinical Excellence",
      timeLimit: 240,
      specialty: "internal-medicine",
      roleLevel: "consultant"
    },
    {
      id: "q-im-cons-lead-002",
      prompt: "How do you balance your clinical responsibilities with leadership and service development?",
      type: "leadership",
      rubricTags: ["leadership", "governance"],
      category: "Leadership",
      timeLimit: 240,
      specialty: "internal-medicine",
      roleLevel: "consultant"
    },
    {
      id: "q-im-cons-gov-003",
      prompt: "A serious incident has occurred on your ward. Walk me through your immediate actions and escalation pathway.",
      type: "governance",
      rubricTags: ["governance", "communication"],
      category: "Governance & Patient Safety",
      timeLimit: 240,
      specialty: "internal-medicine",
      roleLevel: "consultant"
    },
    {
      id: "q-im-cons-values-004",
      prompt: "How do you ensure compassionate care is maintained during busy ward rounds with limited time?",
      type: "nhs_values",
      rubricTags: ["nhs_values", "communication"],
      category: "NHS Values",
      timeLimit: 180,
      specialty: "internal-medicine",
      roleLevel: "consultant"
    },
    {
      id: "q-im-cons-comm-005",
      prompt: "Describe how you handle a family disagreement about end-of-life care decisions.",
      type: "communication",
      rubricTags: ["communication", "nhs_values"],
      category: "Communication",
      timeLimit: 240,
      specialty: "internal-medicine",
      roleLevel: "consultant"
    },
    {
      id: "q-im-cons-port-006",
      prompt: "What service improvement initiatives have you led and what measurable impact did they have?",
      type: "portfolio",
      rubricTags: ["portfolio", "leadership"],
      category: "Quality Improvement",
      timeLimit: 240,
      specialty: "internal-medicine",
      roleLevel: "consultant"
    },
    {
      id: "q-im-cons-teach-007",
      prompt: "How do you contribute to training and supervising junior doctors while maintaining service delivery?",
      type: "teaching",
      rubricTags: ["teaching", "leadership"],
      category: "Teaching & Supervision",
      timeLimit: 180,
      specialty: "internal-medicine",
      roleLevel: "consultant"
    }
  ],
  "internal-medicine-st3-st8": [
    {
      id: "q-im-st3-clin-001",
      prompt: "Describe your approach to managing a patient with acute deterioration on the ward. What are your escalation thresholds?",
      type: "clinical",
      rubricTags: ["clinical", "governance"],
      category: "Clinical Excellence",
      timeLimit: 240,
      specialty: "internal-medicine",
      roleLevel: "st3-st8"
    },
    {
      id: "q-im-st3-comm-002",
      prompt: "A family disagrees with a DNACPR decision you've made. How would you handle this conversation?",
      type: "communication",
      rubricTags: ["communication", "nhs_values"],
      category: "Communication",
      timeLimit: 240,
      specialty: "internal-medicine",
      roleLevel: "st3-st8"
    },
    {
      id: "q-im-st3-values-003",
      prompt: "What role do you see yourself playing in the MDT as an ST3? How do you contribute to patient-centered care?",
      type: "nhs_values",
      rubricTags: ["nhs_values", "communication"],
      category: "NHS Values",
      timeLimit: 180,
      specialty: "internal-medicine",
      roleLevel: "st3-st8"
    },
    {
      id: "q-im-st3-gov-004",
      prompt: "Describe a time you identified and reported a medication error. What systems did you use?",
      type: "governance",
      rubricTags: ["governance", "clinical"],
      category: "Governance & Patient Safety",
      timeLimit: 240,
      specialty: "internal-medicine",
      roleLevel: "st3-st8"
    },
    {
      id: "q-im-st3-port-005",
      prompt: "What audit or QI project have you completed that changed practice? Describe your methodology and outcomes.",
      type: "portfolio",
      rubricTags: ["portfolio", "governance"],
      category: "Quality Improvement",
      timeLimit: 240,
      specialty: "internal-medicine",
      roleLevel: "st3-st8"
    },
    {
      id: "q-im-st3-clin-006",
      prompt: "How do you balance training opportunities with service delivery during intense on-call periods?",
      type: "clinical",
      rubricTags: ["clinical", "leadership"],
      category: "Clinical Excellence",
      timeLimit: 180,
      specialty: "internal-medicine",
      roleLevel: "st3-st8"
    },
    {
      id: "q-im-st3-comm-007",
      prompt: "How do you manage your own wellbeing and prevent burnout during challenging rotations?",
      type: "communication",
      rubricTags: ["communication", "nhs_values"],
      category: "Communication",
      timeLimit: 180,
      specialty: "internal-medicine",
      roleLevel: "st3-st8"
    }
  ],
  "surgery-consultant": [
    {
      id: "q-surg-cons-clin-001",
      prompt: "How do you balance surgical innovation with patient safety when considering new techniques?",
      type: "clinical",
      rubricTags: ["clinical", "governance"],
      category: "Clinical Excellence",
      timeLimit: 240,
      specialty: "surgery",
      roleLevel: "consultant"
    },
    {
      id: "q-surg-cons-gov-002",
      prompt: "Describe your approach to managing a surgical complication. Include your escalation and communication pathway.",
      type: "governance",
      rubricTags: ["governance", "communication"],
      category: "Governance & Patient Safety",
      timeLimit: 240,
      specialty: "surgery",
      roleLevel: "consultant"
    },
    {
      id: "q-surg-cons-lead-003",
      prompt: "How do you mentor junior surgeons in theatre while maintaining efficiency and patient safety?",
      type: "leadership",
      rubricTags: ["leadership", "teaching"],
      category: "Leadership",
      timeLimit: 240,
      specialty: "surgery",
      roleLevel: "consultant"
    },
    {
      id: "q-surg-cons-comm-004",
      prompt: "How do you ensure truly informed consent for complex procedures with multiple potential complications?",
      type: "communication",
      rubricTags: ["communication", "governance"],
      category: "Communication",
      timeLimit: 240,
      specialty: "surgery",
      roleLevel: "consultant"
    },
    {
      id: "q-surg-cons-port-005",
      prompt: "What's your experience with mortality and morbidity reviews? How have these influenced your practice?",
      type: "portfolio",
      rubricTags: ["portfolio", "governance"],
      category: "Quality Improvement",
      timeLimit: 240,
      specialty: "surgery",
      roleLevel: "consultant"
    },
    {
      id: "q-surg-cons-values-006",
      prompt: "Describe your leadership style in high-pressure theatre environments. How do you embody NHS values?",
      type: "nhs_values",
      rubricTags: ["nhs_values", "leadership"],
      category: "NHS Values",
      timeLimit: 180,
      specialty: "surgery",
      roleLevel: "consultant"
    },
    {
      id: "q-surg-cons-lead-007",
      prompt: "How do you contribute to the wider surgical service beyond your specialty interest?",
      type: "leadership",
      rubricTags: ["leadership", "governance"],
      category: "Leadership",
      timeLimit: 180,
      specialty: "surgery",
      roleLevel: "consultant"
    }
  ],
  "emergency-medicine-st3-st8": [
    {
      id: "q-em-st3-clin-001",
      prompt: "Describe your approach to managing a major trauma patient in resus. What are your priorities and escalation points?",
      type: "clinical",
      rubricTags: ["clinical", "governance"],
      category: "Clinical Excellence",
      timeLimit: 240,
      specialty: "emergency-medicine",
      roleLevel: "st3-st8"
    },
    {
      id: "q-em-st3-comm-002",
      prompt: "How do you communicate with distressed relatives in the ED during a resuscitation attempt?",
      type: "communication",
      rubricTags: ["communication", "nhs_values"],
      category: "Communication",
      timeLimit: 180,
      specialty: "emergency-medicine",
      roleLevel: "st3-st8"
    },
    {
      id: "q-em-st3-gov-003",
      prompt: "A patient you discharged returns in extremis. How would you handle this situation from clinical and governance perspectives?",
      type: "governance",
      rubricTags: ["governance", "clinical"],
      category: "Governance & Patient Safety",
      timeLimit: 240,
      specialty: "emergency-medicine",
      roleLevel: "st3-st8"
    },
    {
      id: "q-em-st3-lead-004",
      prompt: "How do you manage team dynamics during a busy ED shift with multiple critical patients?",
      type: "leadership",
      rubricTags: ["leadership", "communication"],
      category: "Leadership",
      timeLimit: 180,
      specialty: "emergency-medicine",
      roleLevel: "st3-st8"
    },
    {
      id: "q-em-st3-values-005",
      prompt: "How do you maintain compassionate care during 12-hour shifts with high patient volumes?",
      type: "nhs_values",
      rubricTags: ["nhs_values", "communication"],
      category: "NHS Values",
      timeLimit: 180,
      specialty: "emergency-medicine",
      roleLevel: "st3-st8"
    },
    {
      id: "q-em-st3-port-006",
      prompt: "Describe a QI project you've implemented in the ED. What was the problem and how did you measure improvement?",
      type: "portfolio",
      rubricTags: ["portfolio", "governance"],
      category: "Quality Improvement",
      timeLimit: 240,
      specialty: "emergency-medicine",
      roleLevel: "st3-st8"
    },
    {
      id: "q-em-st3-clin-007",
      prompt: "How do you approach decision-making about admission vs discharge for borderline cases?",
      type: "clinical",
      rubricTags: ["clinical", "governance"],
      category: "Clinical Excellence",
      timeLimit: 180,
      specialty: "emergency-medicine",
      roleLevel: "st3-st8"
    }
  ],
  "psychiatry-consultant": [
    {
      id: "q-psych-cons-clin-001",
      prompt: "Describe your approach to risk assessment and management for a patient with complex suicidal ideation.",
      type: "clinical",
      rubricTags: ["clinical", "governance"],
      category: "Clinical Excellence",
      timeLimit: 240,
      specialty: "psychiatry",
      roleLevel: "consultant"
    },
    {
      id: "q-psych-cons-gov-002",
      prompt: "How do you balance patient autonomy with Mental Health Act responsibilities in challenging cases?",
      type: "governance",
      rubricTags: ["governance", "nhs_values"],
      category: "Governance & Patient Safety",
      timeLimit: 240,
      specialty: "psychiatry",
      roleLevel: "consultant"
    },
    {
      id: "q-psych-cons-comm-003",
      prompt: "Describe how you work with families who have different views about a patient's treatment plan.",
      type: "communication",
      rubricTags: ["communication", "nhs_values"],
      category: "Communication",
      timeLimit: 240,
      specialty: "psychiatry",
      roleLevel: "consultant"
    },
    {
      id: "q-psych-cons-lead-004",
      prompt: "How do you lead a multidisciplinary team in community mental health settings?",
      type: "leadership",
      rubricTags: ["leadership", "communication"],
      category: "Leadership",
      timeLimit: 180,
      specialty: "psychiatry",
      roleLevel: "consultant"
    },
    {
      id: "q-psych-cons-values-005",
      prompt: "How do you ensure equity of access to mental health services for marginalized communities?",
      type: "nhs_values",
      rubricTags: ["nhs_values", "clinical"],
      category: "NHS Values",
      timeLimit: 240,
      specialty: "psychiatry",
      roleLevel: "consultant"
    },
    {
      id: "q-psych-cons-port-006",
      prompt: "What service development or transformation project have you led in mental health?",
      type: "portfolio",
      rubricTags: ["portfolio", "leadership"],
      category: "Quality Improvement",
      timeLimit: 240,
      specialty: "psychiatry",
      roleLevel: "consultant"
    },
    {
      id: "q-psych-cons-teach-007",
      prompt: "How do you contribute to psychiatric training and education beyond your clinical role?",
      type: "teaching",
      rubricTags: ["teaching", "leadership"],
      category: "Teaching & Supervision",
      timeLimit: 180,
      specialty: "psychiatry",
      roleLevel: "consultant"
    }
  ],
  "general-practice-fy2": [
    {
      id: "q-gp-fy2-clin-001",
      prompt: "How would you manage a patient presenting with chest pain in a GP setting? What are your safety-netting steps?",
      type: "clinical",
      rubricTags: ["clinical", "governance"],
      category: "Clinical Excellence",
      timeLimit: 180,
      specialty: "general-practice",
      roleLevel: "fy2"
    },
    {
      id: "q-gp-fy2-comm-002",
      prompt: "A patient is upset about a long wait for a specialist appointment. How would you handle this conversation?",
      type: "communication",
      rubricTags: ["communication", "nhs_values"],
      category: "Communication",
      timeLimit: 180,
      specialty: "general-practice",
      roleLevel: "fy2"
    },
    {
      id: "q-gp-fy2-values-003",
      prompt: "What have you learned about NHS values during your foundation training?",
      type: "nhs_values",
      rubricTags: ["nhs_values"],
      category: "NHS Values",
      timeLimit: 180,
      specialty: "general-practice",
      roleLevel: "fy2"
    },
    {
      id: "q-gp-fy2-gov-004",
      prompt: "When would you escalate a clinical concern to your supervisor? Give me specific examples.",
      type: "governance",
      rubricTags: ["governance", "clinical"],
      category: "Governance & Patient Safety",
      timeLimit: 180,
      specialty: "general-practice",
      roleLevel: "fy2"
    },
    {
      id: "q-gp-fy2-port-005",
      prompt: "Have you participated in any audit or quality improvement activities? Describe your contribution.",
      type: "portfolio",
      rubricTags: ["portfolio"],
      category: "Quality Improvement",
      timeLimit: 180,
      specialty: "general-practice",
      roleLevel: "fy2"
    },
    {
      id: "q-gp-fy2-clin-006",
      prompt: "How do you manage diagnostic uncertainty in primary care?",
      type: "clinical",
      rubricTags: ["clinical", "communication"],
      category: "Clinical Excellence",
      timeLimit: 180,
      specialty: "general-practice",
      roleLevel: "fy2"
    },
    {
      id: "q-gp-fy2-comm-007",
      prompt: "Describe a time you had to deliver difficult news to a patient. How did you approach it?",
      type: "communication",
      rubricTags: ["communication", "nhs_values"],
      category: "Communication",
      timeLimit: 180,
      specialty: "general-practice",
      roleLevel: "fy2"
    }
  ],
  "anaesthetics-consultant": [
    {
      id: "q-anaes-cons-clin-001",
      prompt: "Describe your approach to managing an unexpected difficult airway in emergency theatre.",
      type: "clinical",
      rubricTags: ["clinical", "governance"],
      category: "Clinical Excellence",
      timeLimit: 240,
      specialty: "anaesthetics",
      roleLevel: "consultant"
    },
    {
      id: "q-anaes-cons-gov-002",
      prompt: "How do you handle a WHO checklist non-compliance situation in theatre?",
      type: "governance",
      rubricTags: ["governance", "communication"],
      category: "Governance & Patient Safety",
      timeLimit: 180,
      specialty: "anaesthetics",
      roleLevel: "consultant"
    },
    {
      id: "q-anaes-cons-lead-003",
      prompt: "Describe your leadership approach during a major haemorrhage protocol activation.",
      type: "leadership",
      rubricTags: ["leadership", "clinical"],
      category: "Leadership",
      timeLimit: 240,
      specialty: "anaesthetics",
      roleLevel: "consultant"
    },
    {
      id: "q-anaes-cons-comm-004",
      prompt: "How do you obtain informed consent for high-risk anaesthesia in critically unwell patients?",
      type: "communication",
      rubricTags: ["communication", "governance"],
      category: "Communication",
      timeLimit: 240,
      specialty: "anaesthetics",
      roleLevel: "consultant"
    },
    {
      id: "q-anaes-cons-values-005",
      prompt: "How do you ensure patient-centered care when patients are unconscious?",
      type: "nhs_values",
      rubricTags: ["nhs_values", "clinical"],
      category: "NHS Values",
      timeLimit: 180,
      specialty: "anaesthetics",
      roleLevel: "consultant"
    },
    {
      id: "q-anaes-cons-port-006",
      prompt: "What clinical governance initiatives have you led to improve perioperative safety?",
      type: "portfolio",
      rubricTags: ["portfolio", "governance"],
      category: "Quality Improvement",
      timeLimit: 240,
      specialty: "anaesthetics",
      roleLevel: "consultant"
    },
    {
      id: "q-anaes-cons-teach-007",
      prompt: "How do you balance teaching trainees during cases with time pressures and patient safety?",
      type: "teaching",
      rubricTags: ["teaching", "governance"],
      category: "Teaching & Supervision",
      timeLimit: 180,
      specialty: "anaesthetics",
      roleLevel: "consultant"
    }
  ]
};

// Mock API: Start interview session
export async function startInterviewSession(payload: InterviewPayload): Promise<InterviewSession> {
  console.log("═══ InterviewSim API Call ═══");
  console.log("Starting interview session with payload:", payload);
  console.log("════════════════════════════");
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Construct lookup key: specialty-roleLevel
  const key = `${payload.specialty}-${payload.roleLevel}`;
  let questions = MOCK_QUESTIONS[key] || [];
  
  // If no specialty match, return generic fallback (but log warning)
  if (questions.length === 0) {
    console.warn(`⚠️ No questions found for ${key}, using fallback`);
    // Use first available question set as fallback
    questions = Object.values(MOCK_QUESTIONS)[0] || [];
  }
  
  // Slice to requested count
  questions = questions.slice(0, payload.count);
  
  const session: InterviewSession = {
    sessionId: crypto.randomUUID(),
    config: {
      pathway: payload.pathway,
      roleLevel: payload.roleLevel,
      specialty: payload.specialty,
      interviewType: payload.interviewType,
      focusAreas: []
    },
    questions,
    createdAt: new Date().toISOString()
  };
  
  console.log(`✅ Session created: ${session.sessionId}`);
  console.log(`✅ Loaded ${questions.length} questions for ${payload.specialty} - ${payload.roleLevel}`);
  
  return session;
}

// Mock API: Submit answers
export async function submitAnswers(sessionId: string, answers: InterviewAnswer[]): Promise<{ success: boolean }> {
  console.log("═══ Submitting Answers ═══");
  console.log("Session ID:", sessionId);
  console.log("Answers count:", answers.length);
  console.log("═════════════════════════");
  
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
}

// Mock API: Get AI review
export async function getAIReview(sessionId: string): Promise<AIReview> {
  console.log("═══ Fetching AI Review ═══");
  console.log("Session ID:", sessionId);
  console.log("═════════════════════════");
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock review data
  return {
    overallScore: 78,
    items: [
      {
        questionId: "q1",
        score: 4,
        strengths: [
          "Clear structure using STAR framework",
          "Good NHS values alignment",
          "Demonstrates patient safety focus"
        ],
        improvements: [
          "Add more specific examples with measurable outcomes",
          "Mention escalation protocols explicitly",
          "Include reflection on learning points"
        ],
        redflags: []
      },
      {
        questionId: "q2",
        score: 3,
        strengths: [
          "Shows understanding of governance frameworks",
          "Mentions duty of candour"
        ],
        improvements: [
          "Provide more detail on DATIX reporting process",
          "Discuss how you involved the wider MDT",
          "Explain timeline for escalation decisions"
        ],
        redflags: []
      }
    ],
    overall: {
      mean_score: 3.9,
      summary: "Strong performance overall. Focus on governance and escalation pathways. Provide more specific examples with measurable outcomes."
    }
  };
}

// Real API implementation (replace mock functions when backend is ready)
export async function startInterviewSessionReal(payload: InterviewPayload): Promise<InterviewSession> {
  const response = await fetch(`${API_BASE}/interviewsim/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('supabase.auth.token')}`
    },
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to start interview session');
  }
  
  return response.json();
}
