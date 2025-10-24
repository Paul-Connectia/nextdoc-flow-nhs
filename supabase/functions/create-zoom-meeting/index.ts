import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const log = (step: string, details?: any) => {
  console.log(`[ZOOM] ${step}${details ? " - " + JSON.stringify(details) : ""}`);
};

async function getZoomAccessToken() {
  const accountId = Deno.env.get("ZOOM_ACCOUNT_ID");
  const clientId = Deno.env.get("ZOOM_CLIENT_ID");
  const clientSecret = Deno.env.get("ZOOM_CLIENT_SECRET");
  if (!accountId || !clientId || !clientSecret) {
    throw new Error("Missing Zoom credentials. Please set ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET.");
  }
  const creds = btoa(`${clientId}:${clientSecret}`);
  const resp = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Failed to get Zoom token: ${resp.status} ${text}`);
  }
  const data = await resp.json();
  return data.access_token as string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Require auth
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing Authorization header');
    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr) throw new Error(`Auth error: ${userErr.message}`);
    const user = userData.user;
    if (!user) throw new Error('Not authenticated');
    log('User authenticated', { userId: user.id, email: user.email });

    const body = await req.json();
    const topic = body?.topic || 'NextDoc Mentorship Session';
    const start_time = body?.start_time; // ISO8601
    const duration = Number(body?.duration || 60);
    const timezone = body?.timezone || 'UTC';

    if (!start_time) throw new Error('start_time is required (ISO string)');

    const accessToken = await getZoomAccessToken();

    const resp = await fetch('https://api.zoom.us/v2/users/me/meetings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,
        type: 2,
        start_time,
        duration,
        timezone,
        settings: {
          join_before_host: false,
          waiting_room: true,
          approval_type: 2,
          registrants_email_notification: true,
        }
      })
    });

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Zoom create meeting failed: ${resp.status} ${text}`);
    }

    const meeting = await resp.json();
    log('Zoom meeting created', { id: meeting.id });

    return new Response(JSON.stringify({
      id: meeting.id,
      join_url: meeting.join_url,
      start_url: meeting.start_url,
      password: meeting.password,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    log('ERROR', { msg });
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});