import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { buildRoadmap } from '@/lib/roadmap/builders';
import gapmapTemplates from '@/data/gapmapTemplates.json';
import { Roadmap } from '@/lib/roadmap/types';
import { analytics } from '@/lib/analytics';

const RoadmapResult = () => {
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load saved data
    const profileJson = localStorage.getItem('gapmap_profile');
    const metaJson = localStorage.getItem('gapmap_meta');
    
    if (!profileJson || !metaJson) {
      navigate('/gapmap/other-uk-exams');
      return;
    }
    
    const profile = JSON.parse(profileJson);
    const meta = JSON.parse(metaJson);
    
    // Get template
    const template = gapmapTemplates[meta.template as keyof typeof gapmapTemplates];
    
    if (!template) {
      navigate('/gapmap/other-uk-exams');
      return;
    }
    
    // Build roadmap
    const generatedRoadmap = buildRoadmap(template.roadmapBuilder, {
      exam: meta.exam,
      track: meta.track,
      wizardAnswers: profile
    });
    
    setRoadmap(generatedRoadmap);
    setLoading(false);
    
    analytics.track('gapmap_roadmap_viewed', { 
      template: meta.template, 
      exam: meta.exam, 
      track: meta.track 
    });
  }, [navigate]);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'inProgress':
        return <Clock className="h-6 w-6 text-orange-600" />;
      case 'notStarted':
        return <AlertCircle className="h-6 w-6 text-gray-400" />;
      default:
        return <AlertCircle className="h-6 w-6 text-gray-400" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900';
      case 'inProgress':
        return 'bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900';
      case 'notStarted':
        return 'bg-muted/50 border-muted';
      default:
        return 'bg-muted/50 border-muted';
    }
  };
  
  if (loading || !roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Generating your roadmap...</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <SEOHead 
        title={`${roadmap.title} | NextDoc Guru`}
        description="Your personalised medical career roadmap with milestones, deadlines, and recommendations"
      />
      
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'GapMap', href: '/gapmap' },
            { label: 'UK Exams', href: '/gapmap/other-uk-exams' },
            { label: 'My Roadmap' }
          ]} />
          
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/gapmap/other-uk-exams')} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browser
            </Button>
            
            <h1 className="text-4xl font-bold mb-2">{roadmap.title}</h1>
            <p className="text-muted-foreground text-lg">
              Your personalised roadmap to success
            </p>
          </div>
          
          {/* Progress Overview */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Overall Progress</h2>
              <Badge variant="outline" className="text-lg px-4 py-1">
                {roadmap.completionPct}% Complete
              </Badge>
            </div>
            <Progress value={roadmap.completionPct} className="h-3 mb-6" />
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {roadmap.milestones.filter(m => m.status === 'completed').length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {roadmap.milestones.filter(m => m.status === 'inProgress').length}
                </div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-muted-foreground">
                  {roadmap.milestones.filter(m => m.status === 'notStarted').length}
                </div>
                <div className="text-sm text-muted-foreground">Not Started</div>
              </div>
            </div>
          </Card>
          
          {/* Milestone Timeline */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Pathway Timeline</h2>
            <div className="space-y-4">
              {roadmap.milestones.map((milestone, index) => (
                <Card key={milestone.id} className={`p-6 ${getStatusColor(milestone.status)}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(milestone.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">
                            Step {index + 1}: {milestone.title}
                          </h3>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </div>
                        <Badge variant={
                          milestone.status === 'completed' ? 'default' :
                          milestone.status === 'inProgress' ? 'secondary' :
                          'outline'
                        }>
                          {milestone.status === 'completed' ? 'Completed' :
                           milestone.status === 'inProgress' ? 'In Progress' :
                           'Not Started'}
                        </Badge>
                      </div>
                      
                      {milestone.deadline && (
                        <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Deadline: {milestone.deadline.label}</span>
                        </div>
                      )}
                      
                      {milestone.actions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {milestone.actions.map((action, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (action.href.startsWith('http')) {
                                  window.open(action.href, '_blank');
                                } else {
                                  navigate(action.href);
                                }
                              }}
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Upcoming Deadlines */}
          {roadmap.deadlines.length > 0 && (
            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Upcoming Deadlines</h2>
              <div className="space-y-3">
                {roadmap.deadlines.map((deadline, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium">{deadline.label}</div>
                      {deadline.daysFromToday && (
                        <div className="text-sm text-muted-foreground">
                          In {deadline.daysFromToday} days
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {/* Recommended Actions */}
          {roadmap.recommendations.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roadmap.recommendations.map((rec, idx) => (
                  <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">{rec.label}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{rec.description}</p>
                    <Button
                      variant="outline"
                      onClick={() => navigate(rec.href)}
                    >
                      Explore {rec.label}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate('/gapmap')}
            >
              Change Pathway
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share with Mentor
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoadmapResult;
