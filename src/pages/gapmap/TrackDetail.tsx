import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle, BookOpen, FileText, Stethoscope, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { examsCatalog, EXAMS_TO_TEMPLATE, type College, type Exam, type Track } from '@/data/examsCatalog';
import { SEOHead } from '@/components/SEOHead';
import { toast } from 'sonner';

const TrackDetail = () => {
  const navigate = useNavigate();
  const { college: collegeId, exam: examId, track: trackId } = useParams<{
    college: string;
    exam: string;
    track: string;
  }>();

  // Find the college, exam, and track from the catalog
  const college = examsCatalog.colleges.find((c) => c.id === collegeId);
  const exam = college?.exams.find((e) => e.id === examId);
  const track = exam?.tracks?.find((t) => t.id === trackId);

  if (!college || !exam || !track) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Track Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The requested examination track could not be found.
          </p>
          <Link to="/gapmap/other-uk-exams">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browser
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const seoTitle = exam.meta?.seo?.title || `${exam.label} - ${track.label} | NextDoc Guru`;
  const seoDescription = exam.meta?.seo?.description || `Complete guide to ${exam.label} ${track.label} examination`;

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription} />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <Link to="/gapmap/other-uk-exams">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Browser
              </Button>
            </Link>
            
            <div className="mb-4">
              <Badge variant="outline" className="mb-2">
                {college.name}
              </Badge>
            </div>
            
            <h1 className="text-4xl font-bold mb-2">
              {exam.label} · {track.label}
            </h1>
            <p className="text-muted-foreground text-lg">
              Your pathway to success in {track.label}
            </p>
          </div>

          {/* CTA Card */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Build Your Personalized {track.label} Roadmap</h2>
                <p className="text-muted-foreground">
                  Complete a short questionnaire to generate your tailored study plan with milestones, deadlines, and personalized recommendations
                </p>
              </div>
              <Button 
                size="lg"
                className="shrink-0"
                onClick={() => {
                  const template = EXAMS_TO_TEMPLATE[exam.id];
                  if (!template) {
                    toast.error('GapMap not available for this exam yet');
                    return;
                  }
                  navigate(`/gapmap/launch?template=${template}&exam=${exam.id}&track=${track.id}`);
                }}
              >
                Generate My GapMap
              </Button>
            </div>
          </Card>

          {/* Milestone Checklist */}
          {track.steps && track.steps.length > 0 && (
            <Card className="p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Milestone Checklist</h2>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">Your Progress</div>
                  <Progress value={0} className="w-32" />
                </div>
              </div>
              
              <div className="space-y-4">
                {track.steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium mb-1">Step {index + 1}</h3>
                          <p className="text-muted-foreground">{step}</p>
                        </div>
                        <Badge variant="outline" className="ml-4">
                          Pending
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Exam Overview */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Exam Overview</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">About This Track</h3>
                <p className="text-muted-foreground">
                  The {track.label} is part of the {exam.label} examination series offered by {college.name}.
                  This component is designed to assess your knowledge and clinical skills in this specialty area.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-1">Examination Type</h4>
                  <p className="text-sm text-muted-foreground capitalize">{exam.type}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-1">Awarding Body</h4>
                  <p className="text-sm text-muted-foreground">{college.name}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Cross-sell Cards */}
          {track.crossSell && track.crossSell.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Recommended Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {track.crossSell.includes('cvbooster') && (
                  <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">CV Booster</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Optimise your CV for specialty training applications and stand out from the competition.
                        </p>
                        <Link to="/cv-booster">
                          <Button size="sm" variant="outline">
                            Explore CV Booster
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                )}

                {track.crossSell.includes('interviewsim') && (
                  <Card className="p-6 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Stethoscope className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Interview Simulator</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Practice clinical scenarios and exam vivas with AI-powered feedback.
                        </p>
                        <Link to="/interviewsim">
                          <Button size="sm" variant="outline">
                            Try Interview Sim
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                )}

                {track.crossSell.includes('mentor') && (
                  <Card className="p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-secondary/10 rounded-lg">
                        <GraduationCap className="h-6 w-6 text-secondary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Expert Mentorship</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Connect with consultants who have successfully passed this examination.
                        </p>
                        <Link to="/mentors">
                          <Button size="sm" variant="outline">
                            Find a Mentor
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                )}

                {track.crossSell.includes('cpd') && (
                  <Card className="p-6 bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-chart-3/10 rounded-lg">
                        <BookOpen className="h-6 w-6 text-chart-3" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">CPD Resources</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Access continuing professional development materials and study resources.
                        </p>
                        <Link to="/study-materials">
                          <Button size="sm" variant="outline">
                            Browse Materials
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Booking Information */}
          {exam.meta?.bookingLinks && exam.meta.bookingLinks.length > 0 && (
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Booking & Registration</h2>
              <p className="text-muted-foreground mb-4">
                Ready to take the next step? Register for your examination through the official portal.
              </p>
              <div className="space-y-2">
                {exam.meta.bookingLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full justify-start">
                      Visit Official Booking Site
                    </Button>
                  </a>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default TrackDetail;
