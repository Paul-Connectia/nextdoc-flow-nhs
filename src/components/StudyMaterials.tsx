import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Download, Lock, FileText, BookOpen, Award, 
  TrendingUp, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  category: string;
  file_path: string;
  subscription_required: string;
  file_size: number;
}

interface UserProfile {
  subscription_status: string;
}

const StudyMaterials: React.FC = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('PLAB');
  const { toast } = useToast();

  useEffect(() => {
    loadMaterials();
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('subscription_status')
          .eq('user_id', session.user.id)
          .single();
        
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setMaterials(data);
      } else {
        // Insert sample materials if none exist
        await insertSampleMaterials();
      }
    } catch (error) {
      console.error('Error loading materials:', error);
      toast({
        title: "Error loading materials",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const insertSampleMaterials = async () => {
    const sampleMaterials = [
      {
        title: "PLAB 1 Question Bank - Emergency Medicine",
        description: "Comprehensive question bank covering emergency medicine topics for PLAB 1 preparation.",
        category: "PLAB",
        file_path: "/study-materials/plab/emergency-medicine-qbank.pdf",
        subscription_required: "Free",
        file_size: 2048000
      },
      {
        title: "PLAB 1 Question Bank - Surgery",
        description: "Surgical topics and scenarios for PLAB 1 examination preparation.",
        category: "PLAB",
        file_path: "/study-materials/plab/surgery-qbank.pdf",
        subscription_required: "Core",
        file_size: 3072000
      },
      {
        title: "MRCP Part 1 Cardiology Notes",
        description: "Detailed cardiology notes and practice questions for MRCP Part 1.",
        category: "MRCP",
        file_path: "/study-materials/mrcp/cardiology-notes.pdf",
        subscription_required: "Core",
        file_size: 4096000
      },
      {
        title: "CPD Certificate - Clinical Leadership",
        description: "Clinical leadership and management CPD module with certificate.",
        category: "CPD",
        file_path: "/study-materials/cpd/clinical-leadership.pdf",
        subscription_required: "Elite",
        file_size: 1024000
      }
    ];

    const { error } = await supabase
      .from('study_materials')
      .insert(sampleMaterials);

    if (!error) {
      // Fetch the inserted materials with IDs
      const { data: insertedMaterials } = await supabase
        .from('study_materials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(sampleMaterials.length);
      
      if (insertedMaterials) {
        setMaterials(insertedMaterials as StudyMaterial[]);
      }
    }
  };

  const checkAccess = (material: StudyMaterial): boolean => {
    if (!userProfile) return material.subscription_required === 'Free';
    
    const userTier = userProfile.subscription_status || 'Free';
    const requiredTier = material.subscription_required;
    
    if (requiredTier === 'Free') return true;
    if (requiredTier === 'Core' && ['Core', 'Elite'].includes(userTier)) return true;
    if (requiredTier === 'Elite' && userTier === 'Elite') return true;
    
    return false;
  };

  const handleDownload = async (material: StudyMaterial) => {
    if (!checkAccess(material)) {
      toast({
        title: "Upgrade Required",
        description: `${material.subscription_required} subscription required to access this material.`,
        variant: "destructive"
      });
      return;
    }

    // Check usage limits for free users
    if (userProfile?.subscription_status === 'Free') {
      const { data: usage } = await supabase
        .from('user_usage_tracking')
        .select('usage_count')
        .eq('user_id', (await supabase.auth.getSession()).data.session?.user.id)
        .eq('feature', 'pdf_download')
        .eq('reset_date', new Date().toISOString().split('T')[0])
        .single();

      if (usage && usage.usage_count >= 1) {
        toast({
          title: "Daily limit reached",
          description: "Free users can download 1 PDF per week. Upgrade for unlimited access.",
          variant: "destructive"
        });
        return;
      }
    }

    try {
      // Track usage
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase
          .from('user_usage_tracking')
          .upsert({
            user_id: session.user.id,
            feature: 'pdf_download',
            usage_count: 1,
            reset_date: new Date().toISOString().split('T')[0]
          }, {
            onConflict: 'user_id,feature,reset_date'
          });
      }

      // Simulate download
      toast({
        title: "Download started",
        description: `Downloading ${material.title}...`,
      });
      
      // In a real implementation, you would download from Supabase Storage
      // const { data } = await supabase.storage.from('study-materials').download(material.file_path);
      
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const formatFileSize = (bytes: number): string => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const getFilteredMaterials = (category: string) => {
    return materials.filter(material => material.category === category);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Study Materials</h1>
        <p className="text-muted-foreground">
          Access comprehensive study materials, question banks, and CPD modules
        </p>
      </div>

      {/* Subscription Status */}
      {userProfile && (
        <Alert className="mb-6">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            <div className="flex justify-between items-center">
              <span>
                Current subscription: <strong>{userProfile.subscription_status || 'Free'}</strong>
                {userProfile.subscription_status === 'Free' && ' - Limited to 1 PDF per week'}
              </span>
              {userProfile.subscription_status === 'Free' && (
                <Button size="sm" variant="outline">
                  Upgrade Plan
                </Button>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="PLAB" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            PLAB
          </TabsTrigger>
          <TabsTrigger value="MRCP" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            MRCP
          </TabsTrigger>
          <TabsTrigger value="CPD" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            CPD
          </TabsTrigger>
        </TabsList>

        <TabsContent value="PLAB" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredMaterials('PLAB').map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                hasAccess={checkAccess(material)}
                onDownload={() => handleDownload(material)}
                formatFileSize={formatFileSize}
              />
            ))}
          </div>
          {getFilteredMaterials('PLAB').length === 0 && (
            <EmptyState category="PLAB" />
          )}
        </TabsContent>

        <TabsContent value="MRCP" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredMaterials('MRCP').map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                hasAccess={checkAccess(material)}
                onDownload={() => handleDownload(material)}
                formatFileSize={formatFileSize}
              />
            ))}
          </div>
          {getFilteredMaterials('MRCP').length === 0 && (
            <EmptyState category="MRCP" />
          )}
        </TabsContent>

        <TabsContent value="CPD" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredMaterials('CPD').map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                hasAccess={checkAccess(material)}
                onDownload={() => handleDownload(material)}
                formatFileSize={formatFileSize}
              />
            ))}
          </div>
          {getFilteredMaterials('CPD').length === 0 && (
            <EmptyState category="CPD" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface MaterialCardProps {
  material: StudyMaterial;
  hasAccess: boolean;
  onDownload: () => void;
  formatFileSize: (bytes: number) => string;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ 
  material, 
  hasAccess, 
  onDownload, 
  formatFileSize 
}) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className="flex justify-between items-start mb-2">
        <Badge variant={hasAccess ? "default" : "secondary"}>
          {material.subscription_required}
        </Badge>
        {!hasAccess && <Lock className="h-4 w-4 text-muted-foreground" />}
      </div>
      <CardTitle className="text-lg leading-tight">{material.title}</CardTitle>
      <CardDescription>{material.description}</CardDescription>
    </CardHeader>
    
    <CardContent>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-muted-foreground">
          {formatFileSize(material.file_size)}
        </span>
        <FileText className="h-4 w-4 text-muted-foreground" />
      </div>
      
      <Button 
        onClick={onDownload}
        disabled={!hasAccess}
        className="w-full"
        variant={hasAccess ? "default" : "outline"}
      >
        {hasAccess ? (
          <>
            <Download className="h-4 w-4 mr-2" />
            Download
          </>
        ) : (
          <>
            <Lock className="h-4 w-4 mr-2" />
            Upgrade Required
          </>
        )}
      </Button>
    </CardContent>
  </Card>
);

const EmptyState: React.FC<{ category: string }> = ({ category }) => (
  <div className="text-center py-12">
    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-foreground mb-2">
      No {category} materials available
    </h3>
    <p className="text-muted-foreground">
      New materials are added regularly. Check back soon!
    </p>
  </div>
);

export default StudyMaterials;