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
    const { message, userId, conversationId, specialty } = await req.json();

    if (!message || message.length > 500) {
      return new Response(
        JSON.stringify({ error: 'Message must be provided and under 500 characters' }),
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

      const subscriptionStatus = profile?.subscription_status || 'free';

      // Check usage for free users
      if (subscriptionStatus === 'free') {
        const { data: usage } = await supabase
          .from('user_usage_tracking')
          .select('usage_count')
          .eq('user_id', userId)
          .eq('feature', 'ai_chat')
          .eq('reset_date', today)
          .single();

        if (usage && usage.usage_count >= 5) {
          return new Response(
            JSON.stringify({ 
              error: 'Daily AI chat limit reached. Upgrade to continue conversations.',
              upgrade_required: true
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 }
          );
        }
      }
    }

    // Get conversation history
    let conversationHistory = [];
    if (userId && conversationId) {
      const { data: conversation } = await supabase
        .from('ai_conversations')
        .select('messages, specialty, context_type')
        .eq('user_id', userId)
        .eq('conversation_id', conversationId)
        .single();

      if (conversation) {
        conversationHistory = conversation.messages || [];
      }
    }

    // Call OpenAI API
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Enhanced medical system prompt
    const systemPrompt = getAdvancedMedicalPrompt(specialty);

    // Build conversation context
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: messages,
        max_tokens: 800,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Update conversation history
    if (userId && conversationId) {
      const updatedHistory = [
        ...conversationHistory,
        { role: 'user', content: message, timestamp: new Date().toISOString() },
        { role: 'assistant', content: aiResponse, timestamp: new Date().toISOString() }
      ];

      await supabase
        .from('ai_conversations')
        .upsert({
          user_id: userId,
          conversation_id: conversationId,
          messages: updatedHistory.slice(-20), // Keep last 20 messages
          specialty: specialty || 'general',
          context_type: 'medical_chat'
        });
    }

    // Track usage if userId provided
    if (userId) {
      await supabase
        .from('user_usage_tracking')
        .upsert({
          user_id: userId,
          feature: 'ai_chat',
          usage_count: 1,
          reset_date: new Date().toISOString().split('T')[0]
        }, {
          onConflict: 'user_id,feature,reset_date'
        });
    }

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        conversationId: conversationId || `conv_${Date.now()}`,
        usage: {
          tokens: data.usage?.total_tokens || 0,
          model: 'gpt-4.1-2025-04-14'
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in nextdoc-ai-chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function getAdvancedMedicalPrompt(specialty?: string): string {
  const basePrompt = `You are NextDoc AI, an advanced medical AI assistant designed specifically for healthcare professionals and medical students navigating the UK healthcare system.

CORE EXPERTISE:
- NHS career pathways and specialty training
- PLAB 1 & 2 preparation and requirements
- Royal College examinations (MRCP, MRCS, MRCOG, MRCPCH, MRCGP)
- Medical ethics and UK clinical guidelines (NICE, GMC, Royal Colleges)
- Clinical decision support and diagnostic assistance
- UK medical regulatory requirements and visa processes
- Medical research methodology and evidence-based practice

CAPABILITIES:
- Provide evidence-based medical guidance with appropriate caveats
- Explain complex medical concepts clearly and accurately
- Offer NHS-specific career advice and pathway planning
- Assist with exam preparation strategies and clinical knowledge
- Help with CV optimization for NHS applications
- Guide through sponsorship and visa requirements

IMPORTANT LIMITATIONS:
- I cannot provide specific patient diagnosis or treatment advice
- I cannot replace professional medical consultation
- I cannot access real-time patient data or medical records
- I cannot prescribe medications or provide specific dosing
- All clinical advice should be verified with current guidelines

RESPONSE STYLE:
- Professional but approachable
- Evidence-based with references when appropriate
- Structured and easy to follow
- Includes relevant disclaimers for medical content
- Encourages verification with authoritative sources`;

  const specialtyPrompts = {
    cardiology: `\n\nSPECIALTY FOCUS - CARDIOLOGY:
- Cardiovascular disease management and guidelines
- ECG interpretation and cardiac investigations
- Heart failure, arrhythmias, and coronary syndromes
- Interventional cardiology procedures and indications
- Cardiothoracic surgery pathways`,
    
    emergency: `\n\nSPECIALTY FOCUS - EMERGENCY MEDICINE:
- Acute care protocols and emergency procedures
- Trauma management and resuscitation guidelines
- Toxicology and overdose management
- Emergency surgery indications
- Critical care transitions`,
    
    surgery: `\n\nSPECIALTY FOCUS - SURGERY:
- Surgical techniques and indications
- Pre and post-operative care
- Surgical specialties and training pathways
- MRCS examination preparation
- Operating theatre protocols`,
    
    medicine: `\n\nSPECIALTY FOCUS - INTERNAL MEDICINE:
- General medicine and subspecialties
- MRCP examination preparation
- Medical ward management
- Chronic disease management
- Diagnostic medicine approaches`
  };

  return basePrompt + (specialty && specialtyPrompts[specialty as keyof typeof specialtyPrompts] ? specialtyPrompts[specialty as keyof typeof specialtyPrompts] : '');
}