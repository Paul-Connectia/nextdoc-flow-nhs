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
    const { query, userId } = await req.json();

    if (!query || query.length > 300) {
      return new Response(
        JSON.stringify({ error: 'Query must be provided and under 300 characters' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check user usage limits if userId is provided
    if (userId) {
      const today = new Date().toISOString().split('T')[0];
      
      // Get user profile to check subscription
      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_status')
        .eq('user_id', userId)
        .single();

      const subscriptionStatus = profile?.subscription_status || 'Free';

      // Check usage for free users
      if (subscriptionStatus === 'Free') {
        const { data: usage } = await supabase
          .from('user_usage_tracking')
          .select('usage_count')
          .eq('user_id', userId)
          .eq('feature', 'ai_search')
          .eq('reset_date', today)
          .single();

        if (usage && usage.usage_count >= 2) {
          return new Response(
            JSON.stringify({ 
              error: 'Daily AI query limit reached. Upgrade to continue using NextDoc AI.',
              upgrade_required: true
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 }
          );
        }
      }
    }

    // Call OpenAI API
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Determine if query should redirect to a product
    const redirects = detectProductRedirect(query);

    // Generate AI response with enhanced medical knowledge
    const systemPrompt = `You are NextDoc AI, an advanced medical AI assistant for UK healthcare professionals.

    EXPERTISE AREAS:
    - NHS career pathways and specialty training programs
    - PLAB 1 & 2 comprehensive preparation and requirements
    - Royal College examinations (MRCP, MRCS, MRCOG, MRCPCH, MRCGP)
    - UK medical regulatory compliance (GMC, NICE guidelines)
    - Clinical decision support and evidence-based medicine
    - NHS job applications, CV optimization, and interview preparation
    - Medical visa requirements and Certificate of Sponsorship processes
    - Medical ethics, clinical governance, and UK healthcare protocols
    - Medical research methodology and publication guidance
    - CPD requirements and continuous professional development

    RESPONSE GUIDELINES:
    - Provide evidence-based, accurate medical and career guidance
    - Include relevant UK-specific context and regulations
    - Offer practical, actionable advice with clear next steps
    - Maintain professional medical communication standards
    - Include appropriate medical disclaimers when discussing clinical topics
    - Keep responses concise but comprehensive (under 250 words)
    - Reference authoritative sources (GMC, NICE, Royal Colleges) when relevant

    IMPORTANT: For clinical questions, always include appropriate disclaimers about seeking professional medical advice.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        max_tokens: 400,
        temperature: 0.6,
        presence_penalty: 0.1,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Track usage if userId provided
    if (userId) {
      await supabase
        .from('user_usage_tracking')
        .upsert({
          user_id: userId,
          feature: 'ai_search',
          usage_count: 1,
          reset_date: new Date().toISOString().split('T')[0]
        }, {
          onConflict: 'user_id,feature,reset_date'
        });
    }

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        redirects: redirects
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in nextdoc-ai-search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function detectProductRedirect(query: string): any[] {
  const lowerQuery = query.toLowerCase();
  const redirects = [];

  if (lowerQuery.includes('cv') || lowerQuery.includes('resume') || lowerQuery.includes('application')) {
    redirects.push({
      product: 'CV Booster™',
      description: 'AI-powered CV enhancement for NHS applications',
      url: '/cv-booster'
    });
  }

  if (lowerQuery.includes('interview') || lowerQuery.includes('practice')) {
    redirects.push({
      product: 'InterviewSim™',
      description: 'Practice NHS interviews with AI feedback',
      url: '/interview-sim'
    });
  }

  if (lowerQuery.includes('plab') || lowerQuery.includes('quiz') || lowerQuery.includes('mcq')) {
    redirects.push({
      product: 'PLAB Quiz',
      description: 'Practice PLAB MCQs with explanations',
      url: '/plab-quiz'
    });
  }

  if (lowerQuery.includes('sponsor') || lowerQuery.includes('trust') || lowerQuery.includes('job')) {
    redirects.push({
      product: 'SponsorMatch™',
      description: 'Find NHS sponsorship opportunities',
      url: '/sponsor-match'
    });
  }

  if (lowerQuery.includes('roadmap') || lowerQuery.includes('pathway') || lowerQuery.includes('career')) {
    redirects.push({
      product: 'GapMap™',
      description: 'Personalized NHS career roadmap',
      url: '/gap-map'
    });
  }

  return redirects;
}