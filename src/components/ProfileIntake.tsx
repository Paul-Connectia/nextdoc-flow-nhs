import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, User, FileText, Award, Clock } from "lucide-react";
import { sanitizeInput, validateEmail, validatePhone, validateGMCNumber } from "@/lib/utils";
import { toast } from "sonner";
import pathwaysSchema from "@/data/pathwaysSchema.json";
import { examsCatalog } from "@/data/examsCatalog";
import gapmapTemplates from "@/data/gapmapTemplates.json";

interface ProfileIntakeProps {
  pathway: string;
  examOptions?: string[];
  examOtherFieldLabel?: string;
  onComplete: (profile: any) => void;
  onBack: () => void;
}

const ProfileIntake = ({ pathway, examOptions: propExamOptions, examOtherFieldLabel, onComplete, onBack }: ProfileIntakeProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState({
    personal: {
      fullName: "",
      nationality: "",
      gmcNumber: "",
      medicalDegree: "",
      graduationYear: "",
      currentLocation: ""
    },
    status: {
      visaStatus: "",
      currentRole: "",
      nhsExperience: "",
      englishTest: "",
      englishScore: "",
      trainingLevel: "",
      affiliatedCollege: ""
    },
    exams: {
      completedExams: [] as string[],
      examDates: {},
      currentStudy: "",
      otherExams: ""
    },
    goals: {
      targetRole: "",
      timeframe: "",
      preferredLocation: "",
      specialtyInterest: ""
    }
  });

  const steps = [
    { 
      id: "personal", 
      title: "Personal Information", 
      icon: User,
      description: "Basic details and qualifications"
    },
    { 
      id: "status", 
      title: "Current Status", 
      icon: FileText,
      description: "Work rights and current position"
    },
    { 
      id: "exams", 
      title: "Exams & Qualifications", 
      icon: Award,
      description: "Completed and planned examinations"
    },
    { 
      id: "goals", 
      title: "Career Goals", 
      icon: Clock,
      description: "Target roles and timeline"
    }
  ];

  const updateProfileData = (section: string, field: string, value: any) => {
    // Sanitize string inputs for security
    const sanitizedValue = typeof value === 'string' ? sanitizeInput(value) : value;
    
    // Validate specific fields
    if (field === 'gmcNumber' && sanitizedValue && !validateGMCNumber(sanitizedValue)) {
      toast.error("Invalid GMC number format");
      return;
    }
    
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: sanitizedValue
      }
    }));
  };

  const handleExamToggle = (exam: string, checked: boolean) => {
    if (checked) {
      updateProfileData("exams", "completedExams", [...profileData.exams.completedExams, exam]);
    } else {
      const filtered = profileData.exams.completedExams.filter(e => e !== exam);
      updateProfileData("exams", "completedExams", filtered);
    }
  };

  const getPathwayTitle = (pathway: string) => {
    // First check if pathway exists in gapmapTemplates
    const template = gapmapTemplates[pathway as keyof typeof gapmapTemplates];
    if (template?.title) {
      return template.title;
    }
    
    // Fallback to legacy pathway titles
    const legacyTitles: Record<string, string> = {
      "plab": "PLAB Pathway",
      "uk-grad": "UK Graduate Pathway",
      "ielts-oet": "IELTS/OET Pathway",
      "returner": "Return to Practice",
      "sas-ahp": "SAS/AHP Pathway"
    };
    
    if (legacyTitles[pathway]) {
      return legacyTitles[pathway];
    }
    
    // Final fallback: Format the pathway ID (uppercase + "Pathway")
    return pathway.toUpperCase() + ' Pathway';
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={profileData.personal.fullName}
            onChange={(e) => updateProfileData("personal", "fullName", e.target.value)}
            placeholder="Dr. John Smith"
          />
        </div>
        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Select onValueChange={(value) => updateProfileData("personal", "nationality", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="india">India</SelectItem>
              <SelectItem value="pakistan">Pakistan</SelectItem>
              <SelectItem value="bangladesh">Bangladesh</SelectItem>
              <SelectItem value="nigeria">Nigeria</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="gmcNumber">GMC Number (if applicable)</Label>
          <Input
            id="gmcNumber"
            value={profileData.personal.gmcNumber}
            onChange={(e) => updateProfileData("personal", "gmcNumber", e.target.value)}
            placeholder="1234567"
          />
        </div>
        <div>
          <Label htmlFor="currentLocation">Current Location</Label>
          <Input
            id="currentLocation"
            value={profileData.personal.currentLocation}
            onChange={(e) => updateProfileData("personal", "currentLocation", e.target.value)}
            placeholder="London, UK"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="medicalDegree">Medical Degree</Label>
          <Input
            id="medicalDegree"
            value={profileData.personal.medicalDegree}
            onChange={(e) => updateProfileData("personal", "medicalDegree", e.target.value)}
            placeholder="MBBS, MD, etc."
          />
        </div>
        <div>
          <Label htmlFor="graduationYear">Graduation Year</Label>
          <Input
            id="graduationYear"
            value={profileData.personal.graduationYear}
            onChange={(e) => updateProfileData("personal", "graduationYear", e.target.value)}
            placeholder="2018"
          />
        </div>
      </div>
    </div>
  );

  const renderStatus = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="visaStatus">Visa/Work Status</Label>
          <Select onValueChange={(value) => updateProfileData("status", "visaStatus", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select visa status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uk-citizen">UK Citizen</SelectItem>
              <SelectItem value="tier2">Tier 2 (Skilled Worker)</SelectItem>
              <SelectItem value="student">Student Visa</SelectItem>
              <SelectItem value="dependent">Dependent Visa</SelectItem>
              <SelectItem value="refugee">Refugee Status</SelectItem>
              <SelectItem value="none">No Current Visa</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="currentRole">Current Role</Label>
          <Select onValueChange={(value) => updateProfileData("status", "currentRole", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select current role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Medical Student</SelectItem>
              <SelectItem value="fy1">Foundation Year 1</SelectItem>
              <SelectItem value="fy2">Foundation Year 2</SelectItem>
              <SelectItem value="core">Core Training</SelectItem>
              <SelectItem value="specialty">Specialty Training</SelectItem>
              <SelectItem value="sas">SAS Doctor</SelectItem>
              <SelectItem value="consultant">Consultant</SelectItem>
              <SelectItem value="unemployed">Currently Unemployed</SelectItem>
              <SelectItem value="non-medical">Non-Medical Role</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="trainingLevel">Training Level (Optional)</Label>
          <Select onValueChange={(value) => updateProfileData("status", "trainingLevel", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select training level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="intern">Intern</SelectItem>
              <SelectItem value="fy1">FY1</SelectItem>
              <SelectItem value="fy2">FY2</SelectItem>
              <SelectItem value="sho">SHO</SelectItem>
              <SelectItem value="registrar">Registrar</SelectItem>
              <SelectItem value="consultant">Consultant</SelectItem>
              <SelectItem value="non-training">Non-Training</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="affiliatedCollege">Affiliated College (Optional)</Label>
          <Select onValueChange={(value) => updateProfileData("status", "affiliatedCollege", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select college" />
            </SelectTrigger>
            <SelectContent>
              {examsCatalog.colleges.map((college) => (
                <SelectItem key={college.id} value={college.id}>
                  {college.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nhsExperience">NHS Experience</Label>
          <Select onValueChange={(value) => updateProfileData("status", "nhsExperience", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select NHS experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No NHS Experience</SelectItem>
              <SelectItem value="clinical-attachment">Clinical Attachment Only</SelectItem>
              <SelectItem value="0-6months">0-6 months</SelectItem>
              <SelectItem value="6-12months">6-12 months</SelectItem>
              <SelectItem value="1-2years">1-2 years</SelectItem>
              <SelectItem value="2plus">2+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="englishTest">English Language Test</Label>
          <Select onValueChange={(value) => updateProfileData("status", "englishTest", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select test type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ielts">IELTS</SelectItem>
              <SelectItem value="oet">OET</SelectItem>
              <SelectItem value="native">Native Speaker</SelectItem>
              <SelectItem value="none">Not Taken</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {(profileData.status.englishTest === "ielts" || profileData.status.englishTest === "oet") && (
        <div>
          <Label htmlFor="englishScore">English Test Score</Label>
          <Input
            id="englishScore"
            value={profileData.status.englishScore}
            onChange={(e) => updateProfileData("status", "englishScore", e.target.value)}
            placeholder="e.g., Overall 7.5 (IELTS) or Overall B (OET)"
          />
        </div>
      )}
    </div>
  );

  const renderExams = () => {
    // Prioritize prop-based examOptions (from template), fallback to pathwaysSchema
    const pathwayData = pathwaysSchema[pathway as keyof typeof pathwaysSchema];
    const examOptions = propExamOptions ?? pathwayData?.examParts ?? [];
    const otherFieldLabel = examOtherFieldLabel ?? "Currently Studying For";

    return (
      <div className="space-y-4">
        <div>
          <Label>Completed Examinations</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Select the exams you have already completed
          </p>
          <div className="grid md:grid-cols-2 gap-2 mt-2">
            {examOptions.map((exam) => (
              <div key={exam} className="flex items-center space-x-2">
                <Checkbox
                  id={exam}
                  checked={profileData.exams.completedExams.includes(exam)}
                  onCheckedChange={(checked) => handleExamToggle(exam, checked as boolean)}
                />
                <Label htmlFor={exam} className="text-sm">{exam}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="otherExams">Other Exams Completed</Label>
          <Input
            id="otherExams"
            value={profileData.exams.otherExams}
            onChange={(e) => updateProfileData("exams", "otherExams", e.target.value)}
            placeholder="e.g., USMLE Step 1, IELTS, Additional qualifications"
          />
        </div>

        <div>
          <Label htmlFor="currentStudy">{otherFieldLabel}</Label>
          <Input
            id="currentStudy"
            value={profileData.exams.currentStudy}
            onChange={(e) => updateProfileData("exams", "currentStudy", e.target.value)}
            placeholder="e.g., MRCP Part 2, PLAB 2"
          />
        </div>
      </div>
    );
  };

  const renderGoals = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="targetRole">Target Role</Label>
          <Select onValueChange={(value) => updateProfileData("goals", "targetRole", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select target role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fy2">Foundation Year 2</SelectItem>
              <SelectItem value="sho">Senior House Officer</SelectItem>
              <SelectItem value="core">Core Training</SelectItem>
              <SelectItem value="specialty">Specialty Training</SelectItem>
              <SelectItem value="sas">SAS Doctor</SelectItem>
              <SelectItem value="consultant">Consultant</SelectItem>
              <SelectItem value="gp">General Practitioner</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="timeframe">Target Timeframe</Label>
          <Select onValueChange={(value) => updateProfileData("goals", "timeframe", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">Within 6 months</SelectItem>
              <SelectItem value="1year">Within 1 year</SelectItem>
              <SelectItem value="2years">Within 2 years</SelectItem>
              <SelectItem value="3plus">3+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="specialtyInterest">Specialty Interest</Label>
        <Input
          id="specialtyInterest"
          value={profileData.goals.specialtyInterest}
          onChange={(e) => updateProfileData("goals", "specialtyInterest", e.target.value)}
          placeholder="e.g., Internal Medicine, Surgery, Paediatrics"
        />
      </div>

      <div>
        <Label htmlFor="preferredLocation">Preferred Location</Label>
        <Input
          id="preferredLocation"
          value={profileData.goals.preferredLocation}
          onChange={(e) => updateProfileData("goals", "preferredLocation", e.target.value)}
          placeholder="e.g., London, Manchester, Scotland"
        />
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderPersonalInfo();
      case 1: return renderStatus();
      case 2: return renderExams();
      case 3: return renderGoals();
      default: return null;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(profileData);
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
        <h2 className="text-3xl font-bold text-foreground mb-4">Build Your Profile</h2>
        <p className="text-muted-foreground mb-6">
          Pathway: <strong>{getPathwayTitle(pathway)}</strong>
        </p>
        
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
            Please provide accurate information to generate the most relevant roadmap
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          {currentStep === 0 ? "Back to Pathways" : "Previous"}
        </Button>
        <Button onClick={handleNext} className="flex items-center gap-2">
          {currentStep === steps.length - 1 ? "Generate Roadmap" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProfileIntake;