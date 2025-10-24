import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Briefcase, GraduationCap, Globe, Users, Award } from "lucide-react";

interface TemplateSelectorProps {
  pathway: string;
  onTemplateSelect: (template: string) => void;
  onBack: () => void;
}

const TemplateSelector = ({ pathway, onTemplateSelect, onBack }: TemplateSelectorProps) => {
  const getTemplatesForPathway = (pathway: string) => {
    const baseTemplates = [
      {
        id: "nhs-standard",
        title: "NHS Standard Job Application",
        description: "Standard NHS Trust job application format with all required sections",
        icon: Briefcase,
        badge: "Most Popular",
        features: ["Trust-compliant format", "Standard sections", "Professional layout"]
      },
      {
        id: "arcp-portfolio",
        title: "ARCP Portfolio Format",
        description: "Optimized for ARCP assessments and training portfolio requirements",
        icon: GraduationCap,
        badge: "Training Focus",
        features: ["ARCP compliance", "Portfolio sections", "Training highlights"]
      }
    ];

    const pathwaySpecific = {
      "plab-img": [
        {
          id: "plab-focused",
          title: "PLAB/IMG Specialist",
          description: "Tailored for international medical graduates with PLAB completion",
          icon: Globe,
          badge: "IMG Optimized",
          features: ["PLAB highlights", "International experience", "NHS integration focus"]
        }
      ],
      "postgrad-exam": [
        {
          id: "exam-candidate",
          title: "Postgraduate Exam Candidate",
          description: "Designed for MRCP, MRCS, MRCOG, MRCPCH applications",
          icon: Award,
          badge: "Exam Ready",
          features: ["Exam preparation focus", "Academic achievements", "Research emphasis"]
        }
      ],
      "consultant": [
        {
          id: "senior-clinical",
          title: "Senior Clinical Position",
          description: "For consultant, academic, and senior clinical fellowship roles",
          icon: Users,
          badge: "Leadership",
          features: ["Leadership experience", "Academic profile", "Strategic impact"]
        }
      ],
      "returner": [
        {
          id: "return-practice",
          title: "Return to Practice",
          description: "Specialized format for professionals returning to NHS practice",
          icon: FileText,
          badge: "Reintegration",
          features: ["Career gap explanation", "Skill updates", "Motivation focus"]
        }
      ]
    };

    return [
      ...baseTemplates,
      ...(pathwaySpecific[pathway as keyof typeof pathwaySpecific] || [])
    ];
  };

  const templates = getTemplatesForPathway(pathway);

  const getPathwayTitle = (pathway: string) => {
    const titles: Record<string, string> = {
      "plab-img": "PLAB/International Medical Graduate",
      "uk-grad": "UK Graduate (Core/Specialty/ARCP)",
      "postgrad-exam": "Postgraduate Exam Candidate",
      "sas-ahp": "SAS/AHP Professional",
      "consultant": "Consultant/Academic/Clinical Fellow",
      "returner": "Return to Practice"
    };
    return titles[pathway] || pathway;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Change Pathway
        </Button>
        
        <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your CV Template</h2>
        <p className="text-muted-foreground text-lg">
          Selected pathway: <strong>{getPathwayTitle(pathway)}</strong>
        </p>
        <p className="text-muted-foreground">
          Pick the template that best fits your target role and application requirements
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <Card 
              key={template.id}
              className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 group"
              onClick={() => onTemplateSelect(template.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{template.badge}</Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-left">{template.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-foreground">Key Features:</h4>
                  <ul className="space-y-1">
                    {template.features.map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full mt-4 group-hover:bg-blue-700 transition-colors">
                    Select Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-900">Template Preview</span>
            </div>
            <p className="text-sm text-blue-700">
              You'll be able to preview and customise your CV before downloading
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TemplateSelector;