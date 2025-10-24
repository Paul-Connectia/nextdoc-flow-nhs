import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, User, Briefcase, GraduationCap, Award, FileText, AlertCircle } from "lucide-react";
import { validateEmail, validateUKPhone, detectCertificationKeywords } from "@/lib/cvValidation";
import { 
  PLABIMGFields, 
  PLABIMGAdditionalFields,
  PLABIMGSpecialistFields,
  ARCPFields, 
  ARCPWBAFields,
  UKGradFields,
  PostgradExamFields,
  SASAHPFields,
  ConsultantFields,
  ReturnToPracticeFields
} from "@/components/cv-wizard/ConditionalFields";

interface CVFormWizardProps {
  pathway: string;
  template: string;
  pathwayId: string;
  templateId: string;
  keywords: string[];
  onKeywordsChange: (keywords: string[]) => void;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const CVFormWizard = ({ pathway, template, pathwayId, templateId, keywords, onKeywordsChange, onComplete, onBack }: CVFormWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);
  const [loadingKeywords, setLoadingKeywords] = useState(false);
  
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      gmcNumber: "",
      preferredTitle: ""
    },
    experience: {
      currentRole: "",
      currentEmployer: "",
      yearsExperience: "",
      specialty: "",
      region: "",
      previousRoles: []
    },
    education: {
      medicalSchool: "",
      graduationYear: "",
      postgraduateQualifications: [],
      currentStudy: ""
    },
    achievements: {
      audits: [],
      research: [],
      teaching: [],
      cpd: []
    },
    additional: {
      languages: [],
      interests: "",
      availability: ""
    },
    // NEW: Conditional fields for all pathways
    conditionalFields: {
      // PLAB/IMG
      firstUKExposure: [] as Array<{ type: string; date: string }>,
      systemsFamiliarity: [] as string[],
      inductionOrientation: "",
      countryOfPriorPractice: "",
      scopeOfDuties: [] as string[],
      nhsTransitionActivities: "",
      
      // ARCP
      trainingProgramme: "",
      placementRotations: [] as Array<{ site: string; from: string; to: string }>,
      miniCEXCompleted: 0,
      cbdCompleted: 0,
      dopsCompleted: 0,
      latestARCPOutcome: "",
      ePortfolioURL: "",
      
      // UK Grad
      deanery: "",
      formalTeachingDelivered: 0,
      formalTeachingAttended: 0,
      
      // Postgrad Exam
      examProgress: [] as Array<{ examPart: string; attemptDate: string; result: string; candidateNo: string }>,
      examLinkedExposure: "",
      
      // SAS/AHP
      independentPractice: false,
      supervisedPractice: false,
      proceduresList: [] as string[],
      governanceEvidence: "",
      
      // Consultant
      leadershipRoles: [] as Array<{ role: string; committee: string; from: string; to: string; impact: string }>,
      leadershipRolesText: "",
      researchGrants: [] as Array<{ funder: string; value: string; role: string; title: string; year: string }>,
      supervision: [] as Array<{ grades: string; count: number; from: string; to: string }>,
      
      // Return to Practice
      timeOutStart: "",
      timeOutEnd: "",
      timeOutReason: "",
      recencyPlan: ""
    }
  });

  // Fetch keywords when specialty or region changes
  useEffect(() => {
    const fetchKeywords = async () => {
      const specialty = formData.experience.specialty;
      const region = formData.experience.region;
      
      if (!specialty || !region) return;
      
      setLoadingKeywords(true);
      
      // Mock API call - replace with real endpoint later
      setTimeout(() => {
        const mockKeywords = [
          "Acute Medicine",
          "Emergency Care",
          "Clinical Leadership",
          "Audit & QI",
          "Patient Safety",
          "Multidisciplinary Team",
          "Evidence-Based Practice"
        ];
        setSuggestedKeywords(mockKeywords);
        setLoadingKeywords(false);
      }, 500);
    };
    
    fetchKeywords();
  }, [formData.experience.specialty, formData.experience.region]);

  const toggleKeyword = (keyword: string) => {
    const newKeywords = keywords.includes(keyword)
      ? keywords.filter(k => k !== keyword)
      : [...keywords, keyword];
    onKeywordsChange(newKeywords);
  };

  const steps = [
    { 
      id: "personal", 
      title: "Personal Information", 
      icon: User,
      description: "Basic contact details and identifiers"
    },
    { 
      id: "experience", 
      title: "Clinical Experience", 
      icon: Briefcase,
      description: "Current role and work history"
    },
    { 
      id: "education", 
      title: "Education & Qualifications", 
      icon: GraduationCap,
      description: "Medical education and certifications"
    },
    { 
      id: "achievements", 
      title: "Achievements & CPD", 
      icon: Award,
      description: "Audits, research, teaching, and development"
    },
    { 
      id: "additional", 
      title: "Additional Information", 
      icon: FileText,
      description: "Languages, interests, and availability"
    }
  ];

  const updateFormData = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const addArrayItem = (section: string, field: string, item: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: [...(prev[section as keyof typeof prev][field as keyof any] || []), item]
      }
    }));
  };

  const removeArrayItem = (section: string, field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: (prev[section as keyof typeof prev][field as keyof any] || []).filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name (as per GMC registration)</Label>
          <Input
            id="fullName"
            value={formData.personalInfo.fullName}
            onChange={(e) => updateFormData("personalInfo", "fullName", e.target.value)}
            placeholder="Dr. John Smith"
          />
        </div>
        <div>
          <Label htmlFor="preferredTitle">Preferred Title</Label>
          <Select onValueChange={(value) => updateFormData("personalInfo", "preferredTitle", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select title" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dr">Dr.</SelectItem>
              <SelectItem value="prof">Prof.</SelectItem>
              <SelectItem value="mr">Mr.</SelectItem>
              <SelectItem value="ms">Ms.</SelectItem>
              <SelectItem value="mrs">Mrs.</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) => updateFormData("personalInfo", "email", e.target.value)}
            placeholder="john.smith@nhs.net"
          />
          {formData.personalInfo.email && !validateEmail(formData.personalInfo.email) && (
            <p className="text-sm text-red-600 mt-1">Invalid email format</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.personalInfo.phone}
            onChange={(e) => updateFormData("personalInfo", "phone", e.target.value)}
            placeholder="+44 7XXX XXXXXX"
          />
          {formData.personalInfo.phone && !validateUKPhone(formData.personalInfo.phone) && (
            <p className="text-sm text-yellow-600 mt-1">Please use UK format (+44 or 07xxx)</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="gmcNumber">GMC Number</Label>
        <Input
          id="gmcNumber"
          value={formData.personalInfo.gmcNumber}
          onChange={(e) => updateFormData("personalInfo", "gmcNumber", e.target.value)}
          placeholder="1234567"
        />
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="currentRole">Current Role/Position</Label>
          <Input
            id="currentRole"
            value={formData.experience.currentRole}
            onChange={(e) => updateFormData("experience", "currentRole", e.target.value)}
            placeholder="ST3 Internal Medicine"
          />
        </div>
        <div>
          <Label htmlFor="currentEmployer">Current NHS Trust/Employer</Label>
          <Input
            id="currentEmployer"
            value={formData.experience.currentEmployer}
            onChange={(e) => updateFormData("experience", "currentEmployer", e.target.value)}
            placeholder="Royal London Hospital"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="specialty">Specialty/Department</Label>
          <Input
            id="specialty"
            value={formData.experience.specialty}
            onChange={(e) => updateFormData("experience", "specialty", e.target.value)}
            placeholder="Internal Medicine"
          />
        </div>
        <div>
          <Label htmlFor="yearsExperience">Years of Clinical Experience</Label>
          <Select onValueChange={(value) => updateFormData("experience", "yearsExperience", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1">0-1 years</SelectItem>
              <SelectItem value="2-3">2-3 years</SelectItem>
              <SelectItem value="4-5">4-5 years</SelectItem>
              <SelectItem value="6-10">6-10 years</SelectItem>
              <SelectItem value="10+">10+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Keywords Section */}
      <div className="col-span-2 mt-4 p-4 bg-muted/50 rounded-lg">
        <Label>Target Region</Label>
        <Select 
          value={formData.experience.region || ""} 
          onValueChange={(value) => updateFormData("experience", "region", value)}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="london">London</SelectItem>
            <SelectItem value="south-east">South East</SelectItem>
            <SelectItem value="midlands">Midlands</SelectItem>
            <SelectItem value="north">North</SelectItem>
            <SelectItem value="scotland">Scotland</SelectItem>
            <SelectItem value="wales">Wales</SelectItem>
            <SelectItem value="northern-ireland">Northern Ireland</SelectItem>
          </SelectContent>
        </Select>
        
        {suggestedKeywords.length > 0 && (
          <div className="mt-4">
            <Label>Suggested Keywords</Label>
            <p className="text-xs text-muted-foreground mb-2">Click to add relevant keywords</p>
            <div className="flex flex-wrap gap-2">
              {suggestedKeywords.map((keyword) => (
                <Badge
                  key={keyword}
                  variant={keywords.includes(keyword) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleKeyword(keyword)}
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {keywords.length > 0 && (
          <div className="mt-3">
            <Label className="text-xs">Selected Keywords:</Label>
            <div className="flex flex-wrap gap-1 mt-1">
              {keywords.map((kw) => (
                <Badge key={kw} variant="secondary" className="text-xs">{kw}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Conditional Fields */}
      {pathwayId === "plab-img" && templateId === "nhs-standard" && (
        <PLABIMGFields formData={formData} updateFormData={updateFormData} />
      )}
      {pathwayId === "plab-img" && templateId === "plab-img-specialist" && (
        <PLABIMGSpecialistFields formData={formData} updateFormData={updateFormData} />
      )}
      {(pathwayId === "uk-grad" || pathwayId === "plab-img") && templateId === "arcp-portfolio" && (
        <ARCPFields formData={formData} updateFormData={updateFormData} />
      )}
      {pathwayId === "uk-grad" && (
        <UKGradFields formData={formData} updateFormData={updateFormData} />
      )}
      {pathwayId === "consultant" && (
        <ConsultantFields formData={formData} updateFormData={updateFormData} />
      )}
      {pathwayId === "sas-ahp" && (
        <SASAHPFields formData={formData} updateFormData={updateFormData} />
      )}
      {pathwayId === "return" && (
        <ReturnToPracticeFields formData={formData} updateFormData={updateFormData} />
      )}
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="medicalSchool">Medical School</Label>
          <Input
            id="medicalSchool"
            value={formData.education.medicalSchool}
            onChange={(e) => updateFormData("education", "medicalSchool", e.target.value)}
            placeholder="University of London"
          />
        </div>
        <div>
          <Label htmlFor="graduationYear">Graduation Year</Label>
          <Input
            id="graduationYear"
            value={formData.education.graduationYear}
            onChange={(e) => updateFormData("education", "graduationYear", e.target.value)}
            placeholder="2018"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="currentStudy">Current Study/Training Programme</Label>
        <Input
          id="currentStudy"
          value={formData.education.currentStudy}
          onChange={(e) => updateFormData("education", "currentStudy", e.target.value)}
          placeholder="Internal Medicine Training Programme"
        />
      </div>

      <div>
        <Label>Postgraduate Qualifications</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {["MRCP", "MRCS", "MRCOG", "MRCPCH", "FRCP", "FRCS", "PhD", "MSc", "Other"].map((qual) => (
            <div key={qual} className="flex items-center space-x-2">
              <Checkbox
                id={qual}
                checked={formData.education.postgraduateQualifications.includes(qual)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addArrayItem("education", "postgraduateQualifications", qual);
                  } else {
                    const index = formData.education.postgraduateQualifications.indexOf(qual);
                    if (index > -1) {
                      removeArrayItem("education", "postgraduateQualifications", index);
                    }
                  }
                }}
              />
              <Label htmlFor={qual}>{qual}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => {
    const cpdText = formData.achievements.cpd.join('\n') || "";
    const detectedCerts = detectCertificationKeywords(cpdText);
    
    return (
      <div className="space-y-6">
        <div>
          <Label>Teaching Experience</Label>
          <Textarea
            placeholder="Describe your teaching roles, medical student supervision, training delivery..."
            className="mt-2"
            value={formData.achievements.teaching.join('\n')}
            onChange={(e) => updateFormData("achievements", "teaching", e.target.value.split('\n'))}
          />
        </div>

        <div>
          <Label>Audit & Quality Improvement</Label>
          <Textarea
            placeholder="List your audits, QI projects, and outcomes achieved..."
            className="mt-2"
            value={formData.achievements.audits.join('\n')}
            onChange={(e) => updateFormData("achievements", "audits", e.target.value.split('\n'))}
          />
        </div>

        <div>
          <Label>Research & Publications</Label>
          <Textarea
            placeholder="Include research projects, publications, presentations..."
            className="mt-2"
            value={formData.achievements.research.join('\n')}
            onChange={(e) => updateFormData("achievements", "research", e.target.value.split('\n'))}
          />
        </div>

        <div>
          <Label>CPD & Professional Development</Label>
          <Textarea
            placeholder="Recent courses, conferences, certifications, and learning activities..."
            className="mt-2"
            value={cpdText}
            onChange={(e) => updateFormData("achievements", "cpd", e.target.value.split('\n'))}
          />
          {detectedCerts.length > 0 && (
            <p className="text-sm text-blue-600 mt-2 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              Detected: {detectedCerts.join(", ")}. Please add Issuer and month/year for each certification.
            </p>
          )}
        </div>

        {/* ARCP WBA Fields */}
        {templateId === "arcp-portfolio" && (
          <ARCPWBAFields formData={formData} updateFormData={updateFormData} />
        )}

        {/* PLAB/IMG Additional Fields */}
        {pathwayId === "plab-img" && templateId === "nhs-standard" && (
          <PLABIMGAdditionalFields formData={formData} updateFormData={updateFormData} />
        )}

        {/* Postgrad Exam Fields */}
        {pathwayId === "postgrad-exam" && (
          <PostgradExamFields formData={formData} updateFormData={updateFormData} />
        )}

        {/* Return to Practice already shown in Experience - no additional fields here */}
      </div>
    );
  };

  const renderAdditional = () => (
    <div className="space-y-4">
      <div>
        <Label>Languages Spoken</Label>
        <Input
          placeholder="English (Native), Spanish (Fluent), Hindi (Conversational)"
          className="mt-2"
          value={formData.additional.languages.join(', ')}
          onChange={(e) => updateFormData("additional", "languages", e.target.value.split(',').map((lang: string) => lang.trim()))}
        />
      </div>

      <div>
        <Label>Professional Interests</Label>
        <Textarea
          placeholder="Areas of clinical interest, research interests, career goals..."
          className="mt-2"
          value={formData.additional.interests}
          onChange={(e) => updateFormData("additional", "interests", e.target.value)}
        />
      </div>

      <div>
        <Label>Availability & Additional Notes</Label>
        <Textarea
          placeholder="Notice period, relocation willingness, part-time preferences..."
          className="mt-2"
          value={formData.additional.availability}
          onChange={(e) => updateFormData("additional", "availability", e.target.value)}
        />
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderPersonalInfo();
      case 1: return renderExperience();
      case 2: return renderEducation();
      case 3: return renderAchievements();
      case 4: return renderAdditional();
      default: return null;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Build Your NHS CV</h2>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">{steps[currentStep].title}</h3>
          <p className="text-muted-foreground">{steps[currentStep].description}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Step {currentStep + 1} of {steps.length}</CardTitle>
          <CardDescription>
            Pathway: {pathway.toUpperCase()} | Template: {template}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          {currentStep === 0 ? "Back to Templates" : "Previous"}
        </Button>
        <Button onClick={handleNext} className="flex items-center gap-2">
          {currentStep === steps.length - 1 ? "Generate CV" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CVFormWizard;