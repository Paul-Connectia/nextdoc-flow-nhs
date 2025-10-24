import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Video, User } from 'lucide-react';

interface CalendlyIntegrationProps {
  mentorId?: string;
  serviceType?: string;
  onBookingComplete?: (bookingDetails: any) => void;
}

export const CalendlyIntegration: React.FC<CalendlyIntegrationProps> = ({
  mentorId,
  serviceType = 'consultation',
  onBookingComplete
}) => {
  const [prefill, setPrefill] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    // Load Calendly widget script dynamically
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Prefill user info from Supabase
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const name = (user.user_metadata?.full_name || user.user_metadata?.name || '').toString();
          setPrefill({ name, email: user.email || undefined });
        }
      } catch (e) {
        console.warn('Calendly prefill unavailable:', e);
      }
    })();

    // Listen for Calendly events
    const handler = (event: MessageEvent) => {
      if (typeof event.data === 'object' && event.data?.event === 'calendly.event_scheduled') {
        onBookingComplete?.(event.data?.payload);
      }
    };
    window.addEventListener('message', handler);

    return () => {
      window.removeEventListener('message', handler);
      document.body.removeChild(script);
    };
  }, [onBookingComplete]);

  const openCalendlyPopup = (url: string) => {
    // @ts-ignore - Calendly is loaded dynamically
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({
        url,
        prefill: {
          name: prefill.name,
          email: prefill.email,
        },
        utm: {
          utmCampaign: 'NextDoc UK',
          utmSource: 'platform',
          utmMedium: 'booking_widget'
        }
      });
    }
  };

  const getCalendlyUrl = (type: string) => {
    // These would be actual Calendly URLs in production
    const calendlyUrls = {
      'consultation': 'https://calendly.com/nextdoc-consultation',
      'mentor': 'https://calendly.com/nextdoc-mentor-session',
      'interview-prep': 'https://calendly.com/nextdoc-interview-prep',
      'cv-review': 'https://calendly.com/nextdoc-cv-review'
    };
    
    return calendlyUrls[type as keyof typeof calendlyUrls] || calendlyUrls.consultation;
  };

  const services = [
    {
      type: 'consultation',
      title: '15-Min Free Consultation',
      duration: '15 minutes',
      price: 'FREE',
      description: 'Quick career guidance and platform walkthrough',
      icon: User,
      popular: true
    },
    {
      type: 'mentor',
      title: 'Principal Mentor Session',
      duration: '60 minutes',
      price: '£89',
      description: 'Deep-dive career mentoring with NHS consultant',
      icon: Calendar
    },
    {
      type: 'interview-prep',
      title: 'Interview Preparation',
      duration: '45 minutes', 
      price: '£69',
      description: 'Mock interview with personalised feedback',
      icon: Video
    },
    {
      type: 'cv-review',
      title: 'CV Review Session',
      duration: '30 minutes',
      price: '£49',
      description: 'Professional CV review and optimization',
      icon: Clock
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Book Your Session</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Schedule a personalised session with our NHS mentors. All sessions include automatic calendar invites and Zoom links.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <Card 
              key={service.type} 
              className={`relative hover:shadow-xl transition-all duration-300 ${
                service.popular ? 'border-primary ring-2 ring-primary/20' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <span>⏱️ {service.duration}</span>
                  <span className="font-bold text-primary text-lg">{service.price}</span>
                </div>
              </CardHeader>
              
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6 min-h-[48px] flex items-center justify-center">
                  {service.description}
                </p>
                
                <Button 
                  className="w-full"
                  size="lg"
                  onClick={() => openCalendlyPopup(getCalendlyUrl(service.type))}
                >
                  Schedule {service.title}
                  <Calendar className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Seamless Integration
            </h3>
            <p className="text-blue-700 mb-4">
              All bookings automatically generate:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-600">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Calendar Invite
              </span>
              <span className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                Zoom Meeting Link
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Automatic Reminders
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};