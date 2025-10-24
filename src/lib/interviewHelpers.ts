import { RubricTag, InterviewConfig, InterviewPayload } from "@/types/interview";

export const QBANK_VERSION = "v2025.10.12";

export const DEFAULT_MIX: Record<RubricTag, number> = {
  nhs_values: 2,
  clinical: 2,
  governance: 1,
  communication: 1,
  portfolio: 1,
  leadership: 0,
  teaching: 0
};

// Map human-readable focus areas to rubric tags
export function mapFocusAreasToTags(focusAreas: string[]): RubricTag[] {
  const mapping: Record<string, RubricTag> = {
    "Clinical scenarios": "clinical",
    "NHS values": "nhs_values",
    "Leadership examples": "leadership",
    "Patient safety": "governance",
    "Communication skills": "communication",
    "Teamwork": "communication",
    "Professional development": "portfolio",
    "Research experience": "portfolio",
    "Teaching experience": "teaching",
    "Audit & QI projects": "governance"
  };
  
  const tags = focusAreas.map(area => mapping[area]).filter(Boolean) as RubricTag[];
  return [...new Set(tags)]; // dedupe
}

// Compute preset ID from wizard selections
export function computePresetId(config: InterviewConfig): string {
  return [
    config.pathway,
    config.interviewType,
    config.roleLevel,
    config.specialty
  ].join('|').toLowerCase();
}

// Build mix from focus areas (if empty, use default)
export function buildMix(focusAreas: RubricTag[]): Record<RubricTag, number> {
  if (focusAreas.length === 0) {
    return DEFAULT_MIX;
  }
  
  // Distribute count across selected tags
  const mix: Partial<Record<RubricTag, number>> = {};
  const countPerTag = Math.ceil(7 / focusAreas.length);
  focusAreas.forEach(tag => {
    mix[tag] = countPerTag;
  });
  
  return { ...DEFAULT_MIX, ...mix };
}

// Validate that returned questions match expected specialty/role
export function validateQuestions(
  questions: any[],
  expectedSpecialty: string,
  expectedRoleLevel: string
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  questions.forEach((q, idx) => {
    if (q.specialty && q.specialty !== expectedSpecialty) {
      errors.push(`Question ${idx + 1}: Expected specialty '${expectedSpecialty}' but got '${q.specialty}'`);
    }
    if (q.roleLevel && q.roleLevel !== expectedRoleLevel) {
      errors.push(`Question ${idx + 1}: Expected role '${expectedRoleLevel}' but got '${q.roleLevel}'`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// Serialize config to payload
export function serializeInterviewPayload(config: InterviewConfig): InterviewPayload {
  const focusTags = mapFocusAreasToTags(config.focusAreas);
  const mix = buildMix(focusTags);
  
  return {
    presetId: computePresetId(config),
    pathway: config.pathway,
    roleLevel: config.roleLevel,
    specialty: config.specialty,
    interviewType: config.interviewType,
    focusAreas: focusTags,
    mix,
    qbankVersion: QBANK_VERSION,
    count: 7
  };
}
