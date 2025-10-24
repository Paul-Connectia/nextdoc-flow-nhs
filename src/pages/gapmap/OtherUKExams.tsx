import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown, BookOpen, Award, GraduationCap, FileText, Stethoscope, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { examsCatalog, EXAMS_TO_TEMPLATE, type College, type Exam, type Track } from '@/data/examsCatalog';
import { SEOHead } from '@/components/SEOHead';
import { toast } from 'sonner';

const OtherUKExams = () => {
  const navigate = useNavigate();
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [expandedColleges, setExpandedColleges] = useState<Set<string>>(new Set());
  const [expandedExams, setExpandedExams] = useState<Set<string>>(new Set());

  const toggleCollege = (collegeId: string) => {
    const newExpanded = new Set(expandedColleges);
    if (newExpanded.has(collegeId)) {
      newExpanded.delete(collegeId);
    } else {
      newExpanded.add(collegeId);
    }
    setExpandedColleges(newExpanded);
  };

  const toggleExam = (examId: string) => {
    const newExpanded = new Set(expandedExams);
    if (newExpanded.has(examId)) {
      newExpanded.delete(examId);
    } else {
      newExpanded.add(examId);
    }
    setExpandedExams(newExpanded);
  };

  const handleExamClick = (college: College, exam: Exam) => {
    setSelectedCollege(college);
    setSelectedExam(exam);
  };

  const getExamTypeColor = (type: string) => {
    switch (type) {
      case 'membership':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'fellowship':
        return 'bg-accent/10 text-accent-foreground border-accent/20';
      case 'diploma':
        return 'bg-secondary/10 text-secondary-foreground border-secondary/20';
      case 'sce':
        return 'bg-chart-3/10 text-chart-3 border-chart-3/20';
      case 'faculty':
        return 'bg-chart-5/10 text-chart-5 border-chart-5/20';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const getExamTypeIcon = (type: string) => {
    switch (type) {
      case 'membership':
        return <Award className="h-4 w-4" />;
      case 'fellowship':
        return <GraduationCap className="h-4 w-4" />;
      case 'diploma':
        return <FileText className="h-4 w-4" />;
      case 'sce':
        return <Stethoscope className="h-4 w-4" />;
      case 'faculty':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <>
      <SEOHead 
        title="UK Medical Exams Browser | NextDoc Guru"
        description="Browse all UK Royal College examinations including FRCA, FRCR, FRCPath, FRCOphth, MRCGP, MRCEM/FRCEM, FRCS subspecialties, SCEs, and more"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link to="/gapmap">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to GapMap
              </Button>
            </Link>
            <h1 className="text-4xl font-bold mb-2">UK Medical Exams Browser</h1>
            <p className="text-muted-foreground text-lg">
              Explore all UK Royal College examinations and specialty certificates
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Tree Navigation */}
            <Card className="lg:col-span-1 p-6 h-fit lg:sticky lg:top-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Browse by College
              </h2>
              
              <div className="space-y-2">
                {examsCatalog.colleges.map((college) => (
                  <div key={college.id} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleCollege(college.id)}
                      className="w-full px-4 py-3 text-left font-medium hover:bg-muted/50 transition-colors flex items-center justify-between"
                    >
                      <span className="text-sm">{college.name}</span>
                      {expandedColleges.has(college.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    
                    {expandedColleges.has(college.id) && (
                      <div className="border-t bg-muted/20">
                        {college.exams.map((exam) => (
                          <div key={exam.id}>
                            <button
                              onClick={() => {
                                handleExamClick(college, exam);
                                if (exam.tracks && exam.tracks.length > 0) {
                                  toggleExam(exam.id);
                                }
                              }}
                              className="w-full px-6 py-2 text-left text-sm hover:bg-muted/50 transition-colors flex items-center justify-between"
                            >
                              <span className="flex items-center gap-2">
                                {getExamTypeIcon(exam.type)}
                                {exam.label}
                              </span>
                              {exam.tracks && exam.tracks.length > 0 && (
                                expandedExams.has(exam.id) ? (
                                  <ChevronDown className="h-3 w-3" />
                                ) : (
                                  <ChevronRight className="h-3 w-3" />
                                )
                              )}
                            </button>
                            
                            {expandedExams.has(exam.id) && exam.tracks && (
                              <div className="bg-muted/40 border-t">
                                {exam.tracks.map((track) => (
                                  <Link
                                    key={track.id}
                                    to={`/gapmap/${college.id}/${exam.id}/${track.id}`}
                                    className="block px-8 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                                  >
                                    {track.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Right Panel - Details */}
            <Card className="lg:col-span-2 p-6">
              {selectedExam && selectedCollege ? (
                <Tabs defaultValue="overview" className="w-full">
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Badge className={`mb-2 ${getExamTypeColor(selectedExam.type)}`}>
                          {selectedExam.type.toUpperCase()}
                        </Badge>
                        <h2 className="text-3xl font-bold mb-1">{selectedExam.label}</h2>
                        <p className="text-muted-foreground">{selectedCollege.name}</p>
                      </div>
                    </div>
                    
                    <TabsList className="w-full justify-start overflow-x-auto">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="tracks">Exam Parts</TabsTrigger>
                      {selectedExam.siblingGroups && <TabsTrigger value="related">Related Exams</TabsTrigger>}
                      <TabsTrigger value="prep">Preparation</TabsTrigger>
                      <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="overview" className="space-y-6">
                    {/* CTA Card */}
                    <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">Ready to Build Your Personalised Roadmap?</h3>
                          <p className="text-muted-foreground">
                            Answer a few questions to generate a tailored GapMap for your {selectedExam.label} journey with milestones, deadlines, and recommended actions
                          </p>
                        </div>
                        <Button 
                          size="lg" 
                          className="shrink-0"
                          onClick={() => {
                            const template = EXAMS_TO_TEMPLATE[selectedExam.id];
                            if (!template) {
                              toast.error('GapMap not available for this exam yet');
                              return;
                            }
                            const trackId = selectedExam.tracks?.[0]?.id || 'standard';
                            navigate(`/gapmap/launch?template=${template}&exam=${selectedExam.id}&track=${trackId}`);
                          }}
                        >
                          Generate My GapMap
                        </Button>
                      </div>
                    </Card>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">About {selectedExam.label}</h3>
                      <p className="text-muted-foreground mb-4">
                        The {selectedExam.label} is a {selectedExam.type} examination offered by {selectedCollege.name}.
                        This qualification is essential for medical professionals pursuing careers in this specialty.
                      </p>
                      
                      {selectedExam.tracks && selectedExam.tracks.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Examination Components:</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {selectedExam.tracks.map((track) => (
                              <li key={track.id}>{track.label}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedExam.next && selectedExam.next.length > 0 && (
                        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-medium mb-2">Next Steps:</h4>
                          <p className="text-sm text-muted-foreground">
                            After completing {selectedExam.label}, consider:
                          </p>
                          <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                            {selectedExam.next.map((next) => (
                              <li key={next.id}>{next.label}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="tracks" className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4">Examination Parts & Tracks</h3>
                    {selectedExam.tracks && selectedExam.tracks.length > 0 ? (
                      <div className="grid gap-4">
                        {selectedExam.tracks.map((track) => (
                          <Card key={track.id} className="p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-lg">{track.label}</h4>
                              <Link to={`/gapmap/${selectedCollege.id}/${selectedExam.id}/${track.id}`}>
                                <Button size="sm" variant="outline">
                                  View Details
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              </Link>
                            </div>
                            {track.steps && track.steps.length > 0 && (
                              <div className="mt-3">
                                <p className="text-sm font-medium mb-2">Key Milestones:</p>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {track.steps.slice(0, 3).map((step, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <span className="text-primary mt-1">•</span>
                                      <span>{step}</span>
                                    </li>
                                  ))}
                                  {track.steps.length > 3 && (
                                    <li className="text-xs italic">
                                      +{track.steps.length - 3} more steps
                                    </li>
                                  )}
                                </ul>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        No specific tracks available. Please check with {selectedCollege.name} for exam structure.
                      </p>
                    )}
                  </TabsContent>

                  {selectedExam.siblingGroups && (
                    <TabsContent value="related" className="space-y-4">
                      <h3 className="text-xl font-semibold mb-4">Related Examinations</h3>
                      {selectedExam.siblingGroups.map((group, idx) => (
                        <div key={idx}>
                          <h4 className="font-medium mb-3">{group.group}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {group.items.map((item) => (
                              <Card key={item.id} className="p-3 hover:shadow-sm transition-shadow">
                                <p className="text-sm font-medium">{item.label}</p>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  )}

                  <TabsContent value="prep" className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4">Preparation Resources</h3>
                    <div className="grid gap-4">
                      <Card className="p-4 bg-primary/5 border-primary/20">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          CV Booster
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Optimise your CV for specialty applications and training posts
                        </p>
                        <Link to="/cv-booster">
                          <Button variant="outline" size="sm">Explore CV Booster</Button>
                        </Link>
                      </Card>
                      
                      <Card className="p-4 bg-accent/5 border-accent/20">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Stethoscope className="h-5 w-5" />
                          Interview Simulator
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Practice clinical scenarios and exam vivas with AI
                        </p>
                        <Link to="/interviewsim">
                          <Button variant="outline" size="sm">Try Interview Sim</Button>
                        </Link>
                      </Card>
                      
                      <Card className="p-4 bg-secondary/5 border-secondary/20">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <GraduationCap className="h-5 w-5" />
                          Mentorship
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Connect with consultants who've passed this exam
                        </p>
                        <Link to="/mentors">
                          <Button variant="outline" size="sm">Find a Mentor</Button>
                        </Link>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="timeline" className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4">Typical Timeline</h3>
                    <div className="space-y-4">
                      {selectedExam.tracks && selectedExam.tracks.length > 0 ? (
                        selectedExam.tracks.map((track, idx) => (
                          <Card key={track.id} className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1">{track.label}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Complete this stage as part of your {selectedExam.label} journey
                                </p>
                              </div>
                            </div>
                          </Card>
                        ))
                      ) : (
                        <p className="text-muted-foreground">
                          Timeline varies by specialty. Contact {selectedCollege.name} for specific dates and deadlines.
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <BookOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select an Examination</h3>
                  <p className="text-muted-foreground max-w-md">
                    Choose a college and examination from the navigation menu to view detailed information,
                    tracks, and preparation resources.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherUKExams;
