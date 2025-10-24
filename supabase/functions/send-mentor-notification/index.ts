import React from 'npm:react@18.3.1';
import { Resend } from 'npm:resend@4.0.0';
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { MentorApplicationStatusEmail } from './_templates/mentor-application-status.tsx';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string);

interface NotificationRequest {
  mentorUserId: string;
  status: 'approved' | 'rejected' | 'info_requested';
  adminNotes?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    // Create Supabase client with service role for admin operations
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const { mentorUserId, status, adminNotes }: NotificationRequest = await req.json();

    if (!mentorUserId || !status) {
      throw new Error('Missing required fields: mentorUserId and status');
    }

    // Get mentor profile information
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('email, display_name, first_name, last_name')
      .eq('user_id', mentorUserId)
      .single();

    if (profileError || !profile) {
      throw new Error('Mentor profile not found');
    }

    const mentorName = profile.display_name || 
                      `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 
                      'Mentor';

    // Get application URLs
    const baseUrl = Deno.env.get('SITE_URL') || 'https://your-domain.com';
    const loginUrl = `${baseUrl}/login`;
    const dashboardUrl = `${baseUrl}/mentor-dashboard`;

    // Render the email template
    const html = await renderAsync(
      React.createElement(MentorApplicationStatusEmail, {
        mentorName,
        status,
        adminNotes,
        loginUrl,
        dashboardUrl,
      })
    );

    // Determine email subject based on status
    const getSubject = (status: string) => {
      switch (status) {
        case 'approved':
          return 'Welcome to NextDoc Global - Application Approved! 🎉';
        case 'rejected':
          return 'NextDoc Global Mentor Application Update';
        case 'info_requested':
          return 'Additional Information Required - NextDoc Global';
        default:
          return 'NextDoc Global Application Update';
      }
    };

    // Send the email
    const { error: emailError } = await resend.emails.send({
      from: 'NextDoc Global <noreply@nextdocglobal.com>',
      to: [profile.email],
      subject: getSubject(status),
      html,
    });

    if (emailError) {
      throw emailError;
    }

    // Log the notification in admin actions
    const { data: { user: adminUser } } = await supabaseClient.auth.getUser(
      req.headers.get('Authorization')?.replace('Bearer ', '') || ''
    );

    if (adminUser) {
      await supabaseClient
        .from('admin_actions')
        .insert({
          admin_id: adminUser.id,
          action_type: `send_${status}_notification`,
          target_user_id: mentorUserId,
          action_details: {
            email_sent: true,
            recipient: profile.email,
            status,
            admin_notes: adminNotes,
          },
          reason: `Sent ${status} notification email to mentor`,
        });
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Notification sent successfully',
        recipient: profile.email,
        status 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error sending mentor notification:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to send notification',
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});