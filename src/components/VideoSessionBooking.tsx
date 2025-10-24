import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar as CalendarIcon, 
  Video, 
  Clock, 
  User, 
  ExternalLink,
  Plus,
  Check,
  X
} from 'lucide-react';
import { format } from 'date-fns';

interface VideoSession {
  id: string;
  mentor_id: string;
  mentee_id: string;
  session_type: string;
  status: string;
  scheduled_at: string;
  duration_minutes: number;
  meeting_link: string;
  session_notes: string;
  amount: number;
  payment_status: string;
  mentor_profiles?: {
    job_title: string;
    specialty: string;
  };
  profiles?: {
    display_name: string;
    email: string;
  };
}

interface SessionBookingData {
  mentorId: string;
  sessionType: string;
  scheduledAt: Date;
  durationMinutes: number;
  notes: string;
  amount: number;
}

const VideoSessionBooking: React.FC = () => {
  const [sessions, setSessions] = useState<VideoSession[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [bookingData, setBookingData] = useState<Partial<SessionBookingData>>({
    durationMinutes: 60,
    amount: 50,
  });

  const sessionTypes = [
    'CV Review',
    'Interview Preparation',
    'Career Guidance',
    'PLAB Support',
    'Specialty Training Advice',
    'General Mentoring',
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Load user's sessions (both as mentor and mentee)
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('mentorship_sessions')
        .select(`
          *,
          mentor_profiles:mentor_id (
            job_title,
            specialty
          ),
          profiles:mentee_id (
            display_name,
            email
          )
        `)
        .or(`mentee_id.eq.${user.id},mentor_profiles.user_id.eq.${user.id}`)
        .order('scheduled_at', { ascending: false });

      if (sessionsError) throw sessionsError;
      setSessions((sessionsData || []).map(s => ({
        ...s,
        profiles: (s.profiles as any) || { display_name: 'Unknown', email: '' }
      })) as VideoSession[]);

      // Load available mentors for booking - use public view to protect sensitive data
      const { data: mentorsData, error: mentorsError } = await supabase
        .from('mentor_profiles_public')
        .select('id, job_title, specialty, bio, avatar_url')
        .order('specialty');

      if (mentorsError) throw mentorsError;
      setMentors(mentorsData || []);

    } catch (error: any) {
      console.error('Error loading session data:', error);
      toast.error('Failed to load session data');
    } finally {
      setIsLoading(false);
    }
  };

  const generateMeetingLink = async (sessionId: string) => {
    try {
      const session = sessions.find(s => s.id === sessionId);
      if (!session) throw new Error('Session not found');

      const topic = `${session.session_type} with ${session.mentor_profiles?.specialty || 'Mentor'}`;
      const start_time = new Date(session.scheduled_at).toISOString();
      const duration = session.duration_minutes || 60;

      const { data, error: fnError } = await supabase.functions.invoke('create-zoom-meeting', {
        body: { topic, start_time, duration, timezone: 'UTC' }
      });
      if (fnError) throw fnError;

      const meetingLink = data?.join_url as string;
      if (!meetingLink) throw new Error('Zoom meeting creation failed');

      const { error } = await supabase
        .from('mentorship_sessions')
        .update({ meeting_link: meetingLink })
        .eq('id', sessionId);
      if (error) throw error;

      toast.success('Zoom meeting link generated successfully');
      loadData();
      return meetingLink;
    } catch (error: any) {
      console.error('Error generating meeting link:', error);
      toast.error(error?.message || 'Failed to generate meeting link');
    }
  };

  const bookSession = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (!bookingData.mentorId || !bookingData.sessionType || !selectedDate) {
        toast.error('Please fill in all required fields');
        return;
      }

      const sessionDateTime = new Date(selectedDate);
      
      const { error } = await supabase
        .from('mentorship_sessions')
        .insert({
          mentor_id: bookingData.mentorId,
          mentee_id: user.id,
          session_type: bookingData.sessionType,
          scheduled_at: sessionDateTime.toISOString(),
          duration_minutes: bookingData.durationMinutes || 60,
          session_notes: bookingData.notes || '',
          amount: bookingData.amount || 50,
          status: 'scheduled',
          payment_status: 'pending',
        });

      if (error) throw error;

      toast.success('Session booked successfully!');
      setShowBookingDialog(false);
      setBookingData({ durationMinutes: 60, amount: 50 });
      setSelectedDate(undefined);
      loadData();

    } catch (error: any) {
      console.error('Error booking session:', error);
      toast.error('Failed to book session');
    }
  };

  const updateSessionStatus = async (sessionId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('mentorship_sessions')
        .update({ status })
        .eq('id', sessionId);

      if (error) throw error;

      toast.success(`Session ${status} successfully`);
      loadData();
    } catch (error: any) {
      console.error('Error updating session status:', error);
      toast.error('Failed to update session status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      case 'no_show': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Video Session Management</h1>
          <p className="text-muted-foreground">Schedule and manage mentoring video sessions</p>
        </div>
        
        <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Book Session
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Book Mentoring Session</DialogTitle>
              <DialogDescription>
                Schedule a video session with one of our expert mentors
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="mentor">Select Mentor</Label>
                <Select 
                  value={bookingData.mentorId} 
                  onValueChange={(value) => setBookingData(prev => ({ ...prev, mentorId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a mentor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mentors.map((mentor) => (
                      <SelectItem key={mentor.id} value={mentor.id}>
                        <div>
                          <div className="font-medium">{mentor.specialty} Mentor</div>
                          <div className="text-sm text-muted-foreground">
                            {mentor.job_title}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sessionType">Session Type</Label>
                <Select 
                  value={bookingData.sessionType} 
                  onValueChange={(value) => setBookingData(prev => ({ ...prev, sessionType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose session type" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessionTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Date & Time</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'PPP p') : <span>Pick a date and time</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={bookingData.durationMinutes}
                    onChange={(e) => setBookingData(prev => ({ 
                      ...prev, 
                      durationMinutes: parseInt(e.target.value) 
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount (£)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={bookingData.amount}
                    onChange={(e) => setBookingData(prev => ({ 
                      ...prev, 
                      amount: parseFloat(e.target.value) 
                    }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Session Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific topics or goals for this session..."
                  value={bookingData.notes}
                  onChange={(e) => setBookingData(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowBookingDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={bookSession}>
                  Book Session
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map((session) => (
          <Card key={session.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(session.status)}`} />
                  <div>
                    <h3 className="font-semibold">{session.session_type}</h3>
                    <p className="text-sm text-muted-foreground">
                      with {session.mentor_profiles?.specialty || 'Mentor'}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                      <div className="flex items-center">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {format(new Date(session.scheduled_at), 'PPp')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {session.duration_minutes} minutes
                      </div>
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        £{session.amount}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(session.status)}>
                    {session.status}
                  </Badge>

                  {session.status === 'scheduled' && (
                    <>
                      {session.meeting_link ? (
                        <Button size="sm" variant="outline" asChild>
                          <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">
                            <Video className="h-4 w-4 mr-2" />
                            Join Meeting
                          </a>
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => generateMeetingLink(session.id)}
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Generate Link
                        </Button>
                      )}

                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateSessionStatus(session.id, 'completed')}
                      >
                        <Check className="h-4 w-4" />
                      </Button>

                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateSessionStatus(session.id, 'cancelled')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}

                  {session.meeting_link && session.status === 'completed' && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Recording
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {session.session_notes && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm">{session.session_notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {sessions.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No sessions yet</h3>
              <p className="text-muted-foreground mb-4">
                Book your first mentoring session to get started
              </p>
              <Button onClick={() => setShowBookingDialog(true)}>
                Book Your First Session
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VideoSessionBooking;