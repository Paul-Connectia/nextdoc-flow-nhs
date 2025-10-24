import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SessionPaymentRequest {
  sessionId: string;
  amount: number;
  mentorId: string;
}

// Helper logging function for debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SESSION-PAYMENT] ${step}${detailsStr}`);
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
    logStep("Stripe key verified");

    // Create Supabase client with anon key for user authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const { sessionId, amount, mentorId }: SessionPaymentRequest = await req.json();
    
    if (!sessionId || !amount || !mentorId) {
      throw new Error("Missing required fields: sessionId, amount, mentorId");
    }
    logStep("Request data validated", { sessionId, amount, mentorId });

    // Verify session exists and belongs to user
    const { data: session, error: sessionError } = await supabaseClient
      .from('mentorship_sessions')
      .select(`
        *,
        mentor_profiles:mentor_id (
          full_name,
          hourly_rate,
          user_id
        )
      `)
      .eq('id', sessionId)
      .eq('mentee_id', user.id)
      .single();

    if (sessionError || !session) {
      throw new Error("Session not found or unauthorized");
    }
    logStep("Session verified", { sessionId: session.id, mentorName: session.mentor_profiles?.full_name });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      logStep("Creating new customer for user");
    }

    // Create Stripe checkout session for mentoring session payment
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: { 
              name: `Mentoring Session: ${session.session_type}`,
              description: `${session.duration_minutes} minute session with ${session.mentor_profiles?.full_name}`,
            },
            unit_amount: Math.round(amount * 100), // Convert to pence
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/session-payment-success?session_id=${sessionId}`,
      cancel_url: `${req.headers.get("origin")}/video-sessions`,
      metadata: {
        session_id: sessionId,
        mentor_id: mentorId,
        user_id: user.id,
        amount: amount.toString(),
      },
    });

    logStep("Checkout session created", { sessionId: checkoutSession.id, url: checkoutSession.url });

    // Update session with Stripe payment intent ID
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    await supabaseService
      .from('mentorship_sessions')
      .update({
        stripe_payment_intent_id: checkoutSession.id,
        payment_status: 'pending'
      })
      .eq('id', sessionId);

    logStep("Session updated with payment info");

    return new Response(JSON.stringify({ 
      url: checkoutSession.url,
      sessionId: checkoutSession.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in session payment", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});