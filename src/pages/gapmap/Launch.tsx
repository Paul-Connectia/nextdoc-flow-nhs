import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ProfileIntake from '@/components/ProfileIntake';
import { SEOHead } from '@/components/SEOHead';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import gapmapTemplates from '@/data/gapmapTemplates.json';
import { analytics } from '@/lib/analytics';

interface GapmapTemplate {
  title: string;
  steps: {
    exams: {
      options: string[];
      otherField: string;
    };
  };
  roadmapBuilder: string;
}

const Launch = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [wizardKey, setWizardKey] = useState('');
  
  const templateId = searchParams.get('template');
  const examId = searchParams.get('exam');
  const trackId = searchParams.get('track');
  
  // Validate template exists (strict, no fallback)
  const template: GapmapTemplate | null = templateId ? (gapmapTemplates as Record<string, GapmapTemplate>)[templateId] || null : null;
  
  // Generate key for forcing wizard remount on template/exam/track change
  useEffect(() => {
    if (templateId && examId && trackId) {
      const newKey = `${templateId}-${examId}-${trackId}`;
      if (wizardKey !== newKey) {
        // Clear any persisted wizard state on key change
        localStorage.removeItem('gapmap_profile');
        setWizardKey(newKey);
      }
    }
  }, [templateId, examId, trackId, wizardKey]);
  
  useEffect(() => {
    if (templateId && examId && trackId && template) {
      analytics.track('gapmap_wizard_started', { 
        template: templateId, 
        exam: examId, 
        track: trackId 
      });
    }
  }, [templateId, examId, trackId, template]);
  
  if (!templateId || !template) {
    return (
      <>
        <SEOHead 
          title="Invalid Template | NextDoc Guru"
          description="GapMap template not found"
        />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
          <Card className="p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">Invalid Template</h2>
            <p className="text-muted-foreground mb-6">
              The requested pathway template could not be found. Please select a valid exam from the browser.
            </p>
            <Button onClick={() => navigate('/gapmap/other-uk-exams')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browser
            </Button>
          </Card>
        </div>
      </>
    );
  }
  
  const handleComplete = (profileData: any) => {
    // Store in localStorage
    localStorage.setItem('gapmap_profile', JSON.stringify(profileData));
    localStorage.setItem('gapmap_meta', JSON.stringify({
      template: templateId,
      exam: examId,
      track: trackId,
      timestamp: new Date().toISOString()
    }));
    
    analytics.track('gapmap_wizard_completed', { 
      template: templateId, 
      exam: examId, 
      track: trackId 
    });
    
    // Navigate to roadmap generation
    navigate('/gapmap/roadmap');
  };
  
  const handleBack = () => {
    navigate('/gapmap/other-uk-exams');
  };
  
  return (
    <>
      <SEOHead 
        title={`${template.title} - Build Your Roadmap | NextDoc Guru`}
        description={`Create your personalised ${template.title} roadmap with milestones, deadlines, and recommendations`}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'GapMap', href: '/gapmap' },
            { label: 'UK Exams', href: '/gapmap/other-uk-exams' },
            { label: 'Build Roadmap' }
          ]} />
          
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browser
          </Button>
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{template.title}</h1>
            <p className="text-muted-foreground">
              Complete the following steps to generate your personalised roadmap
            </p>
          </div>
          
          <ProfileIntake 
            key={wizardKey}
            pathway={templateId || 'mrcp'}
            examOptions={template.steps.exams.options}
            examOtherFieldLabel={template.steps.exams.otherField}
            onComplete={handleComplete}
            onBack={handleBack}
          />
        </div>
      </div>
    </>
  );
};

export default Launch;
