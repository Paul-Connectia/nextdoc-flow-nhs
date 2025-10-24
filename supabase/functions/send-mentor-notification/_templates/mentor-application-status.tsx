import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Button,
  Section,
  Hr,
} from 'npm:@react-email/components@0.0.22';
import * as React from 'npm:react@18.3.1';

interface MentorApplicationStatusEmailProps {
  mentorName: string;
  status: 'approved' | 'rejected' | 'info_requested';
  adminNotes?: string;
  loginUrl: string;
  dashboardUrl: string;
}

export const MentorApplicationStatusEmail = ({
  mentorName,
  status,
  adminNotes,
  loginUrl,
  dashboardUrl,
}: MentorApplicationStatusEmailProps) => {
  const getStatusDetails = () => {
    switch (status) {
      case 'approved':
        return {
          subject: 'Welcome to NextDoc Global - Application Approved!',
          heading: 'Congratulations! Your mentor application has been approved',
          message: 'We are thrilled to welcome you to our community of NHS mentors. You can now start connecting with international medical graduates and make a meaningful impact on their careers.',
          ctaText: 'Access Your Mentor Dashboard',
          color: '#16a34a',
        };
      case 'rejected':
        return {
          subject: 'NextDoc Global Mentor Application Update',
          heading: 'Thank you for your interest in mentoring',
          message: 'After careful review, we are unable to approve your mentor application at this time. We encourage you to reapply in the future as our requirements may evolve.',
          ctaText: 'View Application Details',
          color: '#dc2626',
        };
      case 'info_requested':
        return {
          subject: 'Additional Information Required - NextDoc Global',
          heading: 'We need some additional information',
          message: 'Your mentor application is under review. To proceed, we need some additional information from you. Please review the details below and provide the requested information.',
          ctaText: 'Complete Your Application',
          color: '#ea580c',
        };
      default:
        return {
          subject: 'NextDoc Global Application Update',
          heading: 'Application Status Update',
          message: 'There has been an update to your mentor application.',
          ctaText: 'View Application',
          color: '#6366f1',
        };
    }
  };

  const statusDetails = getStatusDetails();

  return (
    <Html>
      <Head />
      <Preview>{statusDetails.subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>NextDoc Global</Heading>
            <Text style={subtitle}>Mentor Network</Text>
          </Section>

          <Section style={content}>
            <Heading style={{ ...h2, color: statusDetails.color }}>
              {statusDetails.heading}
            </Heading>
            
            <Text style={greeting}>Dear {mentorName},</Text>
            
            <Text style={text}>{statusDetails.message}</Text>

            {adminNotes && (
              <Section style={notesSection}>
                <Text style={notesLabel}>Additional Details:</Text>
                <Text style={notesText}>{adminNotes}</Text>
              </Section>
            )}

            {status === 'approved' && (
              <Section style={approvedSection}>
                <Text style={text}>As an approved mentor, you now have access to:</Text>
                <ul style={list}>
                  <li style={listItem}>Your personal mentor dashboard</li>
                  <li style={listItem}>Booking calendar management</li>
                  <li style={listItem}>Session scheduling and management</li>
                  <li style={listItem}>Earnings tracking and payout system</li>
                  <li style={listItem}>Referral program with rewards</li>
                </ul>
              </Section>
            )}

            <Section style={ctaSection}>
              <Button href={status === 'approved' ? dashboardUrl : loginUrl} style={button}>
                {statusDetails.ctaText}
              </Button>
            </Section>

            <Hr style={hr} />

            <Section style={supportSection}>
              <Text style={supportText}>
                If you have any questions or need assistance, please don't hesitate to contact our support team at{' '}
                <Link href="mailto:support@nextdocglobal.com" style={link}>
                  support@nextdocglobal.com
                </Link>
              </Text>
            </Section>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Best regards,<br />
              The NextDoc Global Team
            </Text>
            <Hr style={hr} />
            <Text style={footerInfo}>
              NextDoc Global • Supporting International Medical Graduates in the NHS
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default MentorApplicationStatusEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const header = {
  textAlign: 'center' as const,
  padding: '32px 20px',
  backgroundColor: '#1e40af',
  color: '#ffffff',
};

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 8px',
  padding: '0',
};

const subtitle = {
  color: '#e0e7ff',
  fontSize: '16px',
  margin: '0',
  fontWeight: '500',
};

const content = {
  padding: '32px 20px',
};

const h2 = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 24px',
  padding: '0',
};

const greeting = {
  fontSize: '16px',
  margin: '0 0 16px',
  fontWeight: '600',
  color: '#374151',
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0',
};

const notesSection = {
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
};

const notesLabel = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#6b7280',
  margin: '0 0 8px',
};

const notesText = {
  fontSize: '14px',
  color: '#374151',
  margin: '0',
  fontStyle: 'italic',
};

const approvedSection = {
  margin: '24px 0',
};

const list = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  paddingLeft: '20px',
};

const listItem = {
  margin: '8px 0',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#1e40af',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
  margin: '0',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '24px 0',
};

const supportSection = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
};

const supportText = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0',
  lineHeight: '1.5',
};

const link = {
  color: '#1e40af',
  textDecoration: 'underline',
};

const footer = {
  textAlign: 'center' as const,
  padding: '20px',
  borderTop: '1px solid #e5e7eb',
};

const footerText = {
  fontSize: '16px',
  color: '#374151',
  margin: '0 0 16px',
};

const footerInfo = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '0',
};