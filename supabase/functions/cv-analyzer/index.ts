import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cvContent, specialty, pathway, userId } = await req.json();

    if (!cvContent || !specialty) {
      return new Response(
        JSON.stringify({ error: 'CV content and specialty are required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get OpenAI API key
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create specialty-specific analysis prompt
    const systemPrompt = createSpecialtyPrompt(specialty, pathway);

    console.log('Analyzing CV for specialty:', specialty);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Please analyze this CV:\n\n${cvContent}` }
        ],
        max_tokens: 1500,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    // Parse the analysis into structured format
    const structuredAnalysis = parseAnalysis(analysis);

    // Store analysis in database if userId provided
    if (userId) {
      await supabase
        .from('cvs')
        .insert({
          user_id: userId,
          content: { original: cvContent },
          ai_feedback: structuredAnalysis,
          ai_score: structuredAnalysis.overall_score || 0,
          template_id: specialty,
          status: 'analyzed'
        });
    }

    return new Response(
      JSON.stringify(structuredAnalysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in cv-analyzer function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function createSpecialtyPrompt(specialty: string, pathway: string): string {
  const basePrompt = `You are an expert NHS career advisor and CV reviewer specializing in ${specialty}. 

  Analyze the provided CV for an NHS ${specialty} position application. Focus on:

  1. NHS Compliance & Format
  2. ${specialty}-specific experience and skills
  3. Essential requirements for ${pathway || specialty} pathway
  4. Portfolio evidence and CPD
  5. Professional presentation and structure

  Provide your analysis in this exact format:

  OVERALL SCORE: [0-100]

  STRENGTHS:
  - [List 3-5 key strengths]

  AREAS FOR IMPROVEMENT:
  - [List 3-5 specific improvements needed]

  MISSING ELEMENTS:
  - [List any critical missing sections or content]

  NHS COMPLIANCE: [Compliant/Partially Compliant/Non-Compliant]
  COMPLIANCE NOTES: [Brief explanation]

  SPECIALTY READINESS: [Excellent/Good/Fair/Poor]
  READINESS NOTES: [Brief explanation for ${specialty}]

  RECOMMENDATIONS:
  1. [Specific actionable recommendation]
  2. [Specific actionable recommendation]
  3. [Specific actionable recommendation]

  Be specific, constructive, and focus on NHS requirements and ${specialty} expectations.`;

  return basePrompt;
}

function parseAnalysis(analysis: string): any {
  const lines = analysis.split('\n');
  const result = {
    overall_score: 0,
    strengths: [],
    improvements: [],
    missing_elements: [],
    nhs_compliance: 'Unknown',
    compliance_notes: '',
    specialty_readiness: 'Unknown',
    readiness_notes: '',
    recommendations: []
  };

  let currentSection = '';
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('OVERALL SCORE:')) {
      const score = parseInt(trimmedLine.replace('OVERALL SCORE:', '').trim());
      result.overall_score = isNaN(score) ? 0 : score;
    } else if (trimmedLine === 'STRENGTHS:') {
      currentSection = 'strengths';
    } else if (trimmedLine === 'AREAS FOR IMPROVEMENT:') {
      currentSection = 'improvements';
    } else if (trimmedLine === 'MISSING ELEMENTS:') {
      currentSection = 'missing_elements';
    } else if (trimmedLine.startsWith('NHS COMPLIANCE:')) {
      result.nhs_compliance = trimmedLine.replace('NHS COMPLIANCE:', '').trim();
    } else if (trimmedLine.startsWith('COMPLIANCE NOTES:')) {
      result.compliance_notes = trimmedLine.replace('COMPLIANCE NOTES:', '').trim();
    } else if (trimmedLine.startsWith('SPECIALTY READINESS:')) {
      result.specialty_readiness = trimmedLine.replace('SPECIALTY READINESS:', '').trim();
    } else if (trimmedLine.startsWith('READINESS NOTES:')) {
      result.readiness_notes = trimmedLine.replace('READINESS NOTES:', '').trim();
    } else if (trimmedLine === 'RECOMMENDATIONS:') {
      currentSection = 'recommendations';
    } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('• ')) {
      const item = trimmedLine.substring(2).trim();
      if (currentSection === 'strengths') {
        result.strengths.push(item);
      } else if (currentSection === 'improvements') {
        result.improvements.push(item);
      } else if (currentSection === 'missing_elements') {
        result.missing_elements.push(item);
      }
    } else if (trimmedLine.match(/^\d+\./)) {
      const item = trimmedLine.replace(/^\d+\./, '').trim();
      if (currentSection === 'recommendations') {
        result.recommendations.push(item);
      }
    }
  }

  return result;
}