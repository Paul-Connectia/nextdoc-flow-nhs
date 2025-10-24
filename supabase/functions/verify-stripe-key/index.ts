import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const log = (step: string, details?: unknown) => {
  console.log(`[VERIFY-STRIPE-KEY] ${step}`, details ?? "");
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    log("Starting verification");

    const secret = Deno.env.get("STRIPE_SECRET_KEY");
    if (!secret) {
      throw new Error("STRIPE_SECRET_KEY is not set in Supabase Edge Function secrets");
    }

    const stripe = new Stripe(secret, { apiVersion: "2023-10-16" });

    // Retrieve the account tied to the provided secret key
    const account = await stripe.accounts.retrieve();
    log("Account retrieved", { id: account.id, email: account.email, business_type: account.business_type });

    const result = {
      id: account.id,
      email: account.email,
      business_type: account.business_type,
      business_profile: account.business_profile
        ? {
            name: account.business_profile.name,
            support_email: account.business_profile.support_email,
            support_phone: account.business_profile.support_phone,
            support_url: account.business_profile.support_url,
            url: account.business_profile.url,
          }
        : null,
      capabilities: account.capabilities ?? null,
      payouts_schedule: account.settings?.payouts?.schedule ?? null,
    };

    return new Response(JSON.stringify({ ok: true, account: result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log("ERROR", message);
    return new Response(JSON.stringify({ ok: false, error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
