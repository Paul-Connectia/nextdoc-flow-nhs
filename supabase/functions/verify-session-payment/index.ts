import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-SESSION-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    // Create Supabase client with service role for admin operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const url = new URL(req.url);
    const sessionId = url.searchParams.get('session_id');
    
    if (!sessionId) {
      throw new Error("Missing session_id parameter");
    }
    
    logStep("Verifying session payment", { sessionId });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Get the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
    logStep("Retrieved Stripe session", { 
      paymentStatus: checkoutSession.payment_status,
      sessionId: checkoutSession.id 
    });

    if (checkoutSession.payment_status === 'paid') {
      // Get session metadata
      const mentorshipSessionId = checkoutSession.metadata?.session_id;
      const mentorId = checkoutSession.metadata?.mentor_id;
      const amount = checkoutSession.metadata?.amount;

      if (!mentorshipSessionId || !mentorId) {
        throw new Error("Missing session metadata");
      }

      // Update the mentorship session payment status
      const { error: updateError } = await supabaseClient
        .from('mentorship_sessions')
        .update({
          payment_status: 'completed',
          stripe_payment_intent_id: sessionId,
        })
        .eq('id', mentorshipSessionId);

      if (updateError) {
        logStep("Error updating session", { error: updateError });
        throw updateError;
      }

      // Update mentor earnings
      const { error: mentorUpdateError } = await supabaseClient
        .rpc('update_mentor_earnings', {
          mentor_profile_id: mentorId,
          amount_to_add: parseFloat(amount || '0')
        });

      if (mentorUpdateError) {
        logStep("Error updating mentor earnings", { error: mentorUpdateError });
        // Don't throw here as the payment was successful
      }

      logStep("Payment verified and session updated successfully");

      return new Response(JSON.stringify({ 
        success: true,
        payment_status: 'completed',
        session_id: mentorshipSessionId
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });

    } else {
      logStep("Payment not completed", { paymentStatus: checkoutSession.payment_status });
      
      return new Response(JSON.stringify({ 
        success: false,
        payment_status: checkoutSession.payment_status,
        message: 'Payment not completed'
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in verify session payment", { message: errorMessage });
    return new Response(JSON.stringify({ 
      error: errorMessage,
      success: false 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});