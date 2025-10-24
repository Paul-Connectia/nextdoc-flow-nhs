import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MessageSquare, 
  Eye,
  MoreHorizontal,
  Shield,
  DollarSign,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface MentorApplication {
  id: string;
  user_id: string;
  application_data: any;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'info_requested';
  admin_notes: string;
  reviewed_by: string;
  reviewed_at: string;
  documents: any;
  created_at: string;
  updated_at: string;
}

interface MentorProfile {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  specialty: string;
  nhs_trust: string;
  job_title: string;
  mentor_tier: 'associate' | 'senior' | 'principal';
  status: 'pending' | 'approved' | 'rejected' | 'suspended' | 'inactive';
  total_sessions: number;
  average_rating: number;
  total_earnings: number;
  created_at: string;
}

interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  display_name: string;
  subscription_status: string;
  created_at: string;
}

interface AdminAction {
  id: string;
  admin_id: string;
  action_type: string;
  target_user_id: string;
  reason: string;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const [mentorApplications, setMentorApplications] = useState<MentorApplication[]>([]);
  const [mentorProfiles, setMentorProfiles] = useState<MentorProfile[]>([]);
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [adminActions, setAdminActions] = useState<AdminAction[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<MentorApplication | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<MentorProfile | UserProfile | null>(null);
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    type: 'approve' | 'reject' | 'suspend' | 'request_info' | null;
    target: MentorApplication | MentorProfile | UserProfile | null;
  }>({ open: false, type: null, target: null });
  const [actionReason, setActionReason] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Load mentor applications
      const { data: applications, error: appsError } = await supabase
        .from('mentor_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (appsError) throw appsError;
      setMentorApplications(applications || []);

      // Load mentor profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('mentor_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;
      setMentorProfiles(profiles || []);

      // Load user profiles
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (usersError) throw usersError;
      setUserProfiles(users || []);

      // Load admin actions
      const { data: actions, error: actionsError } = await supabase
        .from('admin_actions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (actionsError) throw actionsError;
      setAdminActions(actions || []);

    } catch (error: any) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplicationAction = async (
    applicationId: string, 
    action: 'approve' | 'reject' | 'request_info',
    reason: string
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Update application status
      const newStatus = action === 'approve' ? 'approved' : 
                       action === 'reject' ? 'rejected' : 'info_requested';

      const { error: updateError } = await supabase
        .from('mentor_applications')
        .update({
          status: newStatus,
          admin_notes: reason,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', applicationId);

      if (updateError) throw updateError;

      // If approved, create mentor profile
      if (action === 'approve') {
        const application = mentorApplications.find(app => app.id === applicationId);
        if (application) {
          // Generate referral code first
          const { data: referralCode, error: referralError } = await supabase.rpc('generate_referral_code');
          if (referralError) throw referralError;

          const { error: profileError } = await supabase
            .from('mentor_profiles')
            .insert({
              user_id: application.user_id,
              email: application.application_data.email,
              full_name: application.application_data.fullName,
              phone: application.application_data.phone,
              gmc_number: application.application_data.gmcNumber,
              specialty: application.application_data.specialty,
              nhs_trust: application.application_data.nhsTrust,
              job_title: application.application_data.jobTitle,
              experience_years: application.application_data.experienceYears,
              mentor_tier: application.application_data.mentorTier,
              bio: application.application_data.bio,
              mentoring_areas: application.application_data.mentoringAreas,
              hourly_rate: application.application_data.hourlyRate,
              calendly_link: application.application_data.calendlyLink,
              status: 'approved',
              is_verified: true,
              verification_documents: application.documents,
              referral_code: referralCode,
            });

          if (profileError) throw profileError;
        }
      }

      // Log admin action
      await supabase
        .from('admin_actions')
        .insert({
          admin_id: user.id,
          action_type: `${action}_mentor_application`,
          target_user_id: mentorApplications.find(app => app.id === applicationId)?.user_id,
          target_table: 'mentor_applications',
          target_id: applicationId,
          reason,
        });

      toast.success(`Application ${action}d successfully`);
      loadDashboardData();
      setActionDialog({ open: false, type: null, target: null });
      setActionReason('');

    } catch (error: any) {
      console.error('Error handling application action:', error);
      toast.error(`Failed to ${action} application`);
    }
  };

  const handleUserAction = async (
    userId: string,
    action: 'suspend' | 'activate',
    reason: string
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Update mentor profile status if applicable
      const mentorProfile = mentorProfiles.find(p => p.user_id === userId);
      if (mentorProfile) {
        const newStatus = action === 'suspend' ? 'suspended' : 'approved';
        await supabase
          .from('mentor_profiles')
          .update({ status: newStatus })
          .eq('user_id', userId);
      }

      // Log admin action
      await supabase
        .from('admin_actions')
        .insert({
          admin_id: user.id,
          action_type: `${action}_user`,
          target_user_id: userId,
          reason,
        });

      toast.success(`User ${action}d successfully`);
      loadDashboardData();
      setActionDialog({ open: false, type: null, target: null });
      setActionReason('');

    } catch (error: any) {
      console.error('Error handling user action:', error);
      toast.error(`Failed to ${action} user`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'pending': case 'submitted': return 'bg-yellow-500';
      case 'under_review': return 'bg-blue-500';
      case 'suspended': return 'bg-red-600';
      case 'info_requested': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const stats = {
    totalApplications: mentorApplications.length,
    pendingApplications: mentorApplications.filter(app => app.status === 'submitted').length,
    approvedMentors: mentorProfiles.filter(profile => profile.status === 'approved').length,
    totalUsers: userProfiles.length,
    totalSessions: mentorProfiles.reduce((sum, profile) => sum + profile.total_sessions, 0),
    totalEarnings: mentorProfiles.reduce((sum, profile) => sum + profile.total_earnings, 0),
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
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={loadDashboardData} variant="outline">
          Refresh Data
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApplications}</div>
            <p className="text-xs text-muted-foreground">
              of {stats.totalApplications} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Mentors</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approvedMentors}</div>
            <p className="text-xs text-muted-foreground">
              verified mentors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSessions}</div>
            <p className="text-xs text-muted-foreground">
              mentoring sessions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{stats.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              mentor earnings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">Mentor Applications</TabsTrigger>
          <TabsTrigger value="mentors">Active Mentors</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mentor Applications</CardTitle>
              <CardDescription>
                Review and manage mentor applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {mentorApplications.map((application) => (
                    <Card key={application.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {application.application_data.fullName?.split(' ').map((n: string) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{application.application_data.fullName}</h3>
                            <p className="text-sm text-muted-foreground">
                              {application.application_data.specialty} • {application.application_data.nhsTrust}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Applied {new Date(application.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(application.status)}>
                            {application.status.replace('_', ' ')}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedApplication(application)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Mentors</CardTitle>
              <CardDescription>
                Manage mentor profiles and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {mentorProfiles.map((mentor) => (
                    <Card key={mentor.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {mentor.full_name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{mentor.full_name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {mentor.specialty} • {mentor.job_title}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>{mentor.total_sessions} sessions</span>
                              <span>£{mentor.total_earnings} earned</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(mentor.status)}>
                            {mentor.status}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedProfile(mentor)}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage platform users and their access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {userProfiles.map((user) => (
                    <Card key={user.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {user.display_name?.split(' ').map(n => n[0]).join('') || user.email[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{user.display_name || 'No name'}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-xs text-muted-foreground">
                              Joined {new Date(user.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={user.subscription_status === 'premium' ? 'default' : 'secondary'}>
                            {user.subscription_status}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedProfile(user)}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
              <CardDescription>
                Track all admin actions and changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {adminActions.map((action) => (
                    <Card key={action.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{action.action_type.replace('_', ' ')}</h3>
                          <p className="text-sm text-muted-foreground">{action.reason}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(action.created_at).toLocaleString()}
                          </p>
                        </div>
                        <Shield className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Application Review Dialog */}
      {selectedApplication && (
        <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Review Mentor Application</DialogTitle>
              <DialogDescription>
                {selectedApplication.application_data.fullName} • {selectedApplication.application_data.specialty}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {selectedApplication.application_data.fullName}</p>
                    <p><strong>Email:</strong> {selectedApplication.application_data.email}</p>
                    <p><strong>Phone:</strong> {selectedApplication.application_data.phone}</p>
                    <p><strong>GMC Number:</strong> {selectedApplication.application_data.gmcNumber}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Professional Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Specialty:</strong> {selectedApplication.application_data.specialty}</p>
                    <p><strong>NHS Trust:</strong> {selectedApplication.application_data.nhsTrust}</p>
                    <p><strong>Job Title:</strong> {selectedApplication.application_data.jobTitle}</p>
                    <p><strong>Experience:</strong> {selectedApplication.application_data.experienceYears} years</p>
                    <p><strong>Mentor Tier:</strong> {selectedApplication.application_data.mentorTier}</p>
                    <p><strong>Hourly Rate:</strong> £{selectedApplication.application_data.hourlyRate}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Bio</h4>
                  <p className="text-sm text-muted-foreground">{selectedApplication.application_data.bio}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Mentoring Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplication.application_data.mentoringAreas?.map((area: string) => (
                      <Badge key={area} variant="secondary">{area}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Documents</h4>
                  <div className="space-y-2">
                    {Object.keys(selectedApplication.documents || {}).map(docType => (
                      <div key={docType} className="flex items-center justify-between">
                        <span className="text-sm">{docType.replace('_', ' ')}</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setActionDialog({
                    open: true,
                    type: 'request_info',
                    target: selectedApplication,
                  });
                }}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Request Info
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setActionDialog({
                    open: true,
                    type: 'reject',
                    target: selectedApplication,
                  });
                }}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button
                onClick={() => {
                  setActionDialog({
                    open: true,
                    type: 'approve',
                    target: selectedApplication,
                  });
                }}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Action Confirmation Dialog */}
      <Dialog open={actionDialog.open} onOpenChange={(open) => !open && setActionDialog({ open: false, type: null, target: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionDialog.type === 'approve' && 'Approve Application'}
              {actionDialog.type === 'reject' && 'Reject Application'}
              {actionDialog.type === 'request_info' && 'Request Additional Information'}
              {actionDialog.type === 'suspend' && 'Suspend User'}
            </DialogTitle>
            <DialogDescription>
              Please provide a reason for this action. This will be logged and may be sent to the user.
            </DialogDescription>
          </DialogHeader>

          <Textarea
            placeholder="Enter reason for this action..."
            value={actionReason}
            onChange={(e) => setActionReason(e.target.value)}
            className="min-h-[100px]"
          />

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setActionDialog({ open: false, type: null, target: null })}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (actionDialog.target && 'application_data' in actionDialog.target) {
                  // It's a mentor application
                  handleApplicationAction(
                    actionDialog.target.id,
                    actionDialog.type as 'approve' | 'reject' | 'request_info',
                    actionReason
                  );
                } else if (actionDialog.target) {
                  // It's a user/mentor profile
                  handleUserAction(
                    actionDialog.target.user_id,
                    actionDialog.type as 'suspend' | 'activate',
                    actionReason
                  );
                }
              }}
              disabled={!actionReason.trim()}
            >
              {actionDialog.type === 'approve' && 'Approve'}
              {actionDialog.type === 'reject' && 'Reject'}
              {actionDialog.type === 'request_info' && 'Send Request'}
              {actionDialog.type === 'suspend' && 'Suspend'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;