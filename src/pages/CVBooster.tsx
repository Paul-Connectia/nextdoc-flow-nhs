import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Download, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import ConditionalFooter from "@/components/ConditionalFooter";
import CVFormWizard from "@/components/CVFormWizard";
import TemplateSelector from "@/components/TemplateSelector";

const CVBooster = () => {
  const [currentStep, setCurrentStep] = useState("pathway");
  const [selectedPathway, setSelectedPathway] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [cvData, setCvData] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  
  // NEW: Pathway/Template/Keywords state
  const [pathway, setPathway] = useState<string>("");
  const [templateId, setTemplateId] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  
  // Evidence state
  const [evidenceEnabled, setEvidenceEnabled] = useState(false);
  const [evidenceJobId, setEvidenceJobId] = useState<string | null>(null);
  const [evidenceStatus, setEvidenceStatus] = useState<"idle" | "processing" | "complete">("idle");
  const [evidenceItems, setEvidenceItems] = useState<Array<{ title: string; url: string; note: string }>>([]);
  const [intakeId, setIntakeId] = useState<string | null>(null);

  const pathways = [
    {
      id: "plab-img",
      title: "PLAB/International Medical Graduate",
      description: "For doctors completing PLAB and seeking NHS positions",
      badge: "Popular"
    },
    {
      id: "uk-grad",
      title: "UK Graduate (Core/Specialty/ARCP)",
      description: "For UK medical graduates in training programmes",
      badge: "Most Used"
    },
    {
      id: "postgrad-exam",
      title: "Postgraduate Exam Candidate",
      description: "For MRCP, MRCS, MRCOG, MRCPCH applications",
      badge: "Exam Focus"
    },
    {
      id: "sas-ahp",
      title: "SAS/AHP Professional",
      description: "For SAS doctors and Allied Health Professionals",
      badge: "Specialized"
    },
    {
      id: "consultant",
      title: "Consultant/Academic/Clinical Fellow",
      description: "For senior clinical and academic positions",
      badge: "Senior Level"
    },
    {
      id: "returner",
      title: "Return to Practice",
      description: "For professionals returning to NHS practice",
      badge: "Support"
    }
  ];

  const aiFeedback = {
    score: 85,
    strengths: [
      "Strong clinical experience section",
      "Well-documented CPD activities",
      "Clear career progression timeline"
    ],
    improvements: [
      "Add more specific audit examples",
      "Include teaching experience details",
      "Strengthen research section"
    ]
  };

  const handlePathwaySelect = (pathwayId: string) => {
    setSelectedPathway(pathwayId);
    setPathway(pathwayId);
    setCurrentStep("template");
  };

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    setTemplateId(template);
    setCurrentStep("form");
  };

  const handleFormComplete = async (data: any) => {
    setCvData(data);
    
    // Mock intake submission (backend integration later)
    console.log("CV Intake Payload:", {
      pathway,
      templateId,
      keywords,
      formData: data
    });
    
    const mockIntakeId = `intake-${Date.now()}`;
    setIntakeId(mockIntakeId);
    toast.success("CV data saved successfully!");
    
    setCurrentStep("review");
  };

  const handleDownloadPDF = () => {
    console.log("Downloading PDF...", { intakeId, cvData });
    toast.success("CV PDF downloaded successfully!");
  };

  const handleDownloadDOCX = () => {
    console.log("Downloading DOCX...", { intakeId, cvData });
    toast.success("CV DOCX downloaded successfully!");
  };

  const handleSaveVersion = () => {
    console.log("Saving CV v1.1 with evidence...", { intakeId, evidenceItems });
    toast.success("CV v1.1 saved with citations!");
  };

  // Evidence polling effect
  useEffect(() => {
    if (!evidenceEnabled || !cvData || evidenceStatus !== "idle") return;
    
    // Mock: Start evidence job
    const mockJobId = `job-${Date.now()}`;
    setEvidenceJobId(mockJobId);
    setEvidenceStatus("processing");
    
    // Mock: Simulate processing -> complete after 5 seconds
    setTimeout(() => {
      setEvidenceStatus("complete");
      setEvidenceItems([
        { 
          title: "NICE Guideline NG28: Type 2 diabetes in adults", 
          url: "https://www.nice.org.uk/guidance/ng28",
          note: "Referenced in clinical experience section"
        },
        { 
          title: "NHS England: Clinical Leadership Competency Framework", 
          url: "https://www.leadershipacademy.nhs.uk/resources/",
          note: "Supports leadership claims"
        },
        { 
          title: "Royal College of Physicians: Acute Care Toolkit", 
          url: "https://www.rcplondon.ac.uk/projects/acute-care-toolkit",
          note: "Validates acute medicine experience"
        }
      ]);
    }, 5000);
  }, [evidenceEnabled, cvData]);

  const renderPathwaySelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your NHS Pathway</h2>
        <p className="text-muted-foreground text-lg">Select the pathway that best matches your career stage and goals</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pathways.map((pathway) => (
          <Card 
            key={pathway.id}
            className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
            onClick={() => handlePathwaySelect(pathway.id)}
          >
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">{pathway.title}</CardTitle>
                <Badge variant="secondary">{pathway.badge}</Badge>
              </div>
              <CardDescription>{pathway.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full focus-visible:ring-2 focus-visible:ring-ring">Select This Pathway</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAIReview = () => (
    <div className="space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">Self-generated</Badge>
        {evidenceStatus === "complete" && (
          <Badge variant="default" className="bg-purple-600">
            Citations added ({evidenceItems.length})
          </Badge>
        )}
        {aiFeedback.improvements.length > 2 && (
          <Badge variant="destructive">
            Needs proof ({aiFeedback.improvements.length})
          </Badge>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            AI Review Complete
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-green-500">{aiFeedback.score}%</div>
              <div>
                <p className="font-semibold">NHS Compliance Score</p>
                <p className="text-sm text-muted-foreground">Your CV meets NHS standards</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-2 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Strengths
                </h4>
                <ul className="space-y-1">
                  {aiFeedback.strengths.map((strength, index) => (
                    <li key={index} className="text-sm text-muted-foreground">• {strength}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-orange-600 mb-2 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  Improvements
                </h4>
                <ul className="space-y-1">
                  {aiFeedback.improvements.map((improvement, index) => (
                    <li key={index} className="text-sm text-muted-foreground">• {improvement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Toggle */}
      <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Switch
                checked={evidenceEnabled}
                onCheckedChange={setEvidenceEnabled}
              />
              <div>
                <Label className="font-semibold cursor-pointer" onClick={() => setEvidenceEnabled(!evidenceEnabled)}>
                  Add Evidence Citations
                </Label>
                <p className="text-sm text-muted-foreground">
                  Include NICE/NHS/Royal College citations for your claims
                </p>
              </div>
            </div>
            
            {evidenceJobId && (
              <Badge variant={evidenceStatus === "complete" ? "default" : "secondary"}>
                {evidenceStatus === "processing" && "Processing..."}
                {evidenceStatus === "complete" && `${evidenceItems.length} citations added`}
              </Badge>
            )}
          </div>
          
          {evidenceEnabled && evidenceStatus === "complete" && evidenceItems.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold text-sm">Evidence Items:</h4>
              {evidenceItems.map((item, idx) => (
                <div key={idx} className="text-sm p-3 bg-background rounded border">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                    {item.title}
                  </a>
                  <p className="text-muted-foreground text-xs mt-1">{item.note}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant="outline" onClick={() => setCurrentStep("form")}>
          Edit CV
        </Button>
        <Button onClick={() => setShowPreview(true)}>
          Preview CV
        </Button>
        <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button onClick={handleDownloadDOCX} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download DOCX
        </Button>
        
        {evidenceEnabled && evidenceStatus === "complete" && (
          <Button 
            variant="secondary"
            onClick={handleSaveVersion}
            className="flex items-center gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            Save as v1.1
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/products" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-foreground">CV Booster™</h1>
            <Badge variant="secondary">AI-Powered</Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            Build your NHS Gold Standard CV with AI feedback and mentor review
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {currentStep === "pathway" && renderPathwaySelection()}
          
          {currentStep === "template" && (
            <TemplateSelector 
              pathway={selectedPathway}
              onTemplateSelect={handleTemplateSelect}
              onBack={() => setCurrentStep("pathway")}
            />
          )}
          
          {currentStep === "form" && (
            <CVFormWizard 
              pathway={selectedPathway}
              template={selectedTemplate}
              pathwayId={pathway}
              templateId={templateId}
              keywords={keywords}
              onKeywordsChange={setKeywords}
              onComplete={handleFormComplete}
              onBack={() => setCurrentStep("template")}
            />
          )}
          
          {currentStep === "review" && renderAIReview()}
        </div>
      </div>
      
      <ConditionalFooter />
    </div>
  );
};

export default CVBooster;