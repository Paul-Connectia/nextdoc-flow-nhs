import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Video, Users, Clock, ArrowRight } from 'lucide-react';

const ConsultationBooking = () => {
  const [selectedMentor, setSelectedMentor] = useState('');
  const [selectedSession, setSelectedSession] = useState('');

  const mentors = [
    { id: 'dr-smith', name: 'Dr. Sarah Smith', specialty: 'Cardiology', availability: 'Mon-Wed' },
    { id: 'dr-jones', name: 'Dr. Michael Jones', specialty: 'Emergency Medicine', availability: 'Thu-Fri' },
    { id: 'dr-patel', name: 'Dr. Priya Patel', specialty: 'General Practice', availability: 'Mon-Fri' },
  ];

  const sessionTypes = [
    { id: 'interview-sim', name: 'InterviewSim™ Session', duration: '60 min', price: '£39' },
    { id: 'cv-review', name: 'CV Review & Feedback', duration: '45 min', price: '£29' },
    { id: 'cpd-consult', name: 'CPD Consultation', duration: '30 min', price: '£25' },
    { id: 'career-guidance', name: 'Career Pathway Guidance', duration: '60 min', price: '£45' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-primary text-primary-foreground">
            Expert Consultations
          </Badge>
          <h1 className="text-3xl font-bold mb-2">Book Your Consultation</h1>
          <p className="text-muted-foreground">
            Get personalised guidance from NHS consultants and medical experts
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Mentor Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Select Your Mentor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedMentor} onValueChange={setSelectedMentor}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a mentor" />
                </SelectTrigger>
                <SelectContent>
                  {mentors.map((mentor) => (
                    <SelectItem key={mentor.id} value={mentor.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{mentor.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {mentor.specialty} • Available {mentor.availability}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Session Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Type of Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedSession} onValueChange={setSelectedSession}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose session type" />
                </SelectTrigger>
                <SelectContent>
                  {sessionTypes.map((session) => (
                    <SelectItem key={session.id} value={session.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{session.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {session.duration} • {session.price}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Calendly Integration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Select Your Appointment Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMentor && selectedSession ? (
              <div className="space-y-4">
                {/* Calendly iframe placeholder */}
                <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Calendly Widget</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Embed Calendly booking widget here
                    </p>
                    <code className="text-xs bg-muted-foreground/10 px-2 py-1 rounded">
                      iframe src="https://calendly.com/nextdoc-{selectedMentor}"
                    </code>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-green-700 mb-2">
                    <Video className="h-4 w-4" />
                    <span className="font-medium">Zoom Meeting Included</span>
                  </div>
                  <p className="text-sm text-green-600">
                    Your Zoom join link will be automatically generated and sent via email after booking.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>Please select a mentor and session type to continue</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Booking Confirmation */}
        {selectedMentor && selectedSession && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Booking Summary</h3>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>
                    <strong>Mentor:</strong> {mentors.find(m => m.id === selectedMentor)?.name}
                  </p>
                  <p>
                    <strong>Session:</strong> {sessionTypes.find(s => s.id === selectedSession)?.name}
                  </p>
                  <p>
                    <strong>Duration:</strong> {sessionTypes.find(s => s.id === selectedSession)?.duration}
                  </p>
                  <p>
                    <strong>Price:</strong> {sessionTypes.find(s => s.id === selectedSession)?.price}
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border mb-4">
                  <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
                    <Video className="h-4 w-4" />
                    <span className="font-medium">Post-Booking Confirmation</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ✅ Email confirmation with session details<br />
                    📞 Zoom join link and meeting ID<br />
                    📋 Pre-session preparation materials
                  </p>
                </div>

                <Button size="lg" className="px-8">
                  Confirm Booking
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConsultationBooking;