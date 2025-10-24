export type ToolType = 'writing' | 'speaking' | 'listening' | 'reading';

export interface AnalysisInput {
  taskPrompt?: string;
  essay?: string;
  cueCard?: string;
  audioBlob?: Blob;
  transcript?: string;
  passage?: string;
  question?: string;
}

export interface WritingFeedback {
  estimatedBand: number;
  taskAchievement: string;
  coherenceCohesion: string;
  lexicalResource: string;
  grammar: string;
  suggestedRewrites: string[];
}

export interface SpeakingFeedback {
  estimatedBand: number;
  fluencyCoherence: string;
  pronunciation: string;
  lexicalResource: string;
  grammar: string;
  phrasesToUpgrade: string[];
}

export interface ListeningFeedback {
  answerRationale: string;
  keyEvidence: string[];
  vocabularyIdioms: string[];
  tips: string[];
}

export interface ReadingFeedback {
  summary: string;
  vocabularyInContext: string[];
  whyThisAnswer: string;
  readingStrategies: string[];
}

export type AnalysisFeedback = WritingFeedback | SpeakingFeedback | ListeningFeedback | ReadingFeedback;

// Mock analysis function - returns placeholder data
export async function analyseEnglish(
  toolType: ToolType,
  inputs: AnalysisInput
): Promise<AnalysisFeedback> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  switch (toolType) {
    case 'writing':
      return {
        estimatedBand: 7.5,
        taskAchievement: "Your response addresses all parts of the task with well-developed ideas. The position is clear throughout, though some minor points could be expanded further.",
        coherenceCohesion: "Ideas are logically organized with clear progression. Good use of cohesive devices, though occasional overuse of 'however' is noted.",
        lexicalResource: "Wide range of vocabulary used appropriately. Some less common items show good control (e.g., 'multifaceted', 'paradigm shift'). Minor spelling errors detected.",
        grammar: "Good range of complex structures used accurately. Mix of simple and complex sentences. Few errors that don't impede communication.",
        suggestedRewrites: [
          "Original: 'The problem is very bad.' → Suggested: 'This issue has reached critical proportions.'",
          "Original: 'People think that...' → Suggested: 'It is widely acknowledged that...'",
          "Original: 'In conclusion, I think...' → Suggested: 'To conclude, the evidence suggests...'"
        ]
      } as WritingFeedback;

    case 'speaking':
      return {
        estimatedBand: 7.0,
        fluencyCoherence: "Speech is generally fluent with few hesitations. Ideas are well-connected and easy to follow. Occasional self-correction demonstrates monitoring.",
        pronunciation: "Generally clear pronunciation with few L1 influences. Word stress is accurate. Intonation patterns are appropriate for emphasis.",
        lexicalResource: "Good range of vocabulary with some flexibility and precision. Successful use of less common items (e.g., 'compelling', 'prevalent'). Occasional imprecision in word choice.",
        grammar: "Mix of simple and complex structures used with good control. Frequent error-free sentences. Some errors in complex structures don't impede communication.",
        phrasesToUpgrade: [
          "Instead of 'I think', try: 'In my view', 'From my perspective', 'I would argue that'",
          "Instead of 'very important', try: 'crucial', 'vital', 'paramount'",
          "Instead of 'a lot of', try: 'numerous', 'a significant number of', 'considerable'"
        ]
      } as SpeakingFeedback;

    case 'listening':
      return {
        answerRationale: "The correct answer is B because the speaker explicitly states 'the main concern was not the cost, but rather the environmental impact.' This directly eliminates options A (cost) and C (timeline), while supporting option B (environmental concerns).",
        keyEvidence: [
          '"The main concern was not the cost, but rather the environmental impact"',
          '"We had to reconsider our entire approach to the project"',
          '"The sustainability aspect became our top priority"'
        ],
        vocabularyIdioms: [
          "reconsider = think again about something, review",
          "rather = instead, more accurately",
          "aspect = part, element, feature",
          "top priority = most important thing"
        ],
        tips: [
          "Listen for contrast markers like 'but', 'however', 'rather' - they often signal the correct answer",
          "The speaker may mention multiple options, but pay attention to which one is emphasized",
          "Paraphrasing is common - the answer choices won't use the exact words from the audio"
        ]
      } as ListeningFeedback;

    case 'reading':
      return {
        summary: "This passage discusses the impact of urbanization on biodiversity, highlighting how rapid city expansion threatens natural habitats. The author argues that sustainable urban planning, including green corridors and protected zones, is essential for preserving wildlife while accommodating human growth.",
        vocabularyInContext: [
          "biodiversity (noun): variety of plant and animal life in a particular habitat",
          "urbanization (noun): process of making an area more urban (city-like)",
          "sustainable (adj): able to be maintained without depleting resources",
          "corridors (noun): here meaning passageways that connect wildlife habitats",
          "accommodate (verb): provide space or opportunity for"
        ],
        whyThisAnswer: "Option C is correct because paragraph 3 explicitly states 'green corridors proved most effective in maintaining species diversity.' Options A and B describe problems, not solutions. Option D, while mentioned, is described as 'insufficient on its own.'",
        readingStrategies: [
          "Scan for keywords from the question in the passage",
          "Pay attention to qualifying language like 'most', 'least', 'always', 'never'",
          "Eliminate obviously wrong answers first",
          "The correct answer is often a paraphrase, not an exact match"
        ]
      } as ReadingFeedback;

    default:
      throw new Error(`Unknown tool type: ${toolType}`);
  }
}
