import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, User, Globe, Award, Target } from "lucide-react";
import { EXAM_FAMILIES } from "@/lib/smOptions";
import ChipsInput from "@/components/shared/ChipsInput";

interface SponsorshipIntakeProps {
  onComplete: (profile: any) => void;
}

const SponsorshipIntake = ({ onComplete }: SponsorshipIntakeProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState({
    personal: {
      fullName: "",
      nationality: "",
      currentLocation: "",
      gmcNumber: "",
      medicalDegree: "",
      graduationYear: ""
    },
    visa: {
      currentVisaStatus: "",
      visaExpiry: "",
      dependents: false,
      sponsorshipHistory: ""
    },
    qualifications: {
      examsPassed: [] as string[],
      examsOther: [] as string[],
      showExamsOther: false,
      englishTest: "",
      englishScore: "",
      ukExperience: "",
      currentRole: ""
    },
    preferences: {
      targetSpecialty: "",
      targetRole: "",
      preferredLocations: [] as string[],
      locationsOther: [] as string[],
      showLocationsOther: false,
      startDate: "",
      workPattern: ""
    }
  });

  const [examSearch, setExamSearch] = useState("");

  const steps = [
    { 
      id: "personal", 
      title: "Personal Details", 
      icon: User,
      description: "Basic information and qualifications"
    },
    { 
      id: "visa", 
      title: "Visa Status", 
      icon: Globe,
      description: "Current immigration status"
    },
    { 
      id: "qualifications", 
      title: "Medical Qualifications", 
      icon: Award,
      description: "Exams, experience, and competencies"
    },
    { 
      id: "preferences", 
      title: "Job Preferences", 
      icon: Target,
      description: "Target roles and preferences"
    }
  ];

  const updateProfileData = (section: string, field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleArrayToggle = (section: string, field: string, item: string, checked: boolean) => {
    const currentArray = profileData[section as keyof typeof profileData][field as keyof any] || [];
    if (checked) {
      updateProfileData(section, field, [...currentArray, item]);
    } else {
      updateProfileData(section, field, currentArray.filter((i: string) => i !== item));
    }
  };

  const renderPersonalDetails = () => (
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
              <SelectItem value="india">India</SelectItem>
              <SelectItem value="pakistan">Pakistan</SelectItem>
              <SelectItem value="bangladesh">Bangladesh</SelectItem>
              <SelectItem value="nigeria">Nigeria</SelectItem>
              <SelectItem value="egypt">Egypt</SelectItem>
              <SelectItem value="sudan">Sudan</SelectItem>
              <SelectItem value="syria">Syria</SelectItem>
              <SelectItem value="iraq">Iraq</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="currentLocation">Current Location</Label>
          <Input
            id="currentLocation"
            value={profileData.personal.currentLocation}
            onChange={(e) => updateProfileData("personal", "currentLocation", e.target.value)}
            placeholder="e.g., Mumbai, India"
          />
        </div>
        <div>
          <Label htmlFor="gmcNumber">GMC Number (if registered)</Label>
          <Input
            id="gmcNumber"
            value={profileData.personal.gmcNumber}
            onChange={(e) => updateProfileData("personal", "gmcNumber", e.target.value)}
            placeholder="1234567"
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

  const renderVisaStatus = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="currentVisaStatus">Current Visa Status</Label>
          <Select onValueChange={(value) => updateProfileData("visa", "currentVisaStatus", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select visa status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No UK Visa</SelectItem>
              <SelectItem value="visitor">Visitor Visa</SelectItem>
              <SelectItem value="student">Student Visa</SelectItem>
              <SelectItem value="tier2">Tier 2 (Skilled Worker)</SelectItem>
              <SelectItem value="dependent">Dependent Visa</SelectItem>
              <SelectItem value="refugee">Refugee Status</SelectItem>
              <SelectItem value="indefinite">Indefinite Leave to Remain</SelectItem>
              <SelectItem value="british">British Citizen</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {profileData.visa.currentVisaStatus !== "none" && profileData.visa.currentVisaStatus !== "british" && (
          <div>
            <Label htmlFor="visaExpiry">Visa Expiry Date</Label>
            <Input
              id="visaExpiry"
              type="date"
              value={profileData.visa.visaExpiry}
              onChange={(e) => updateProfileData("visa", "visaExpiry", e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="dependents"
            checked={profileData.visa.dependents}
            onCheckedChange={(checked) => updateProfileData("visa", "dependents", checked)}
          />
          <Label htmlFor="dependents">I have dependents who will need sponsorship</Label>
        </div>
      </div>

      <div>
        <Label htmlFor="sponsorshipHistory">Previous UK Sponsorship Experience</Label>
        <Select onValueChange={(value) => updateProfileData("visa", "sponsorshipHistory", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select sponsorship history" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No previous sponsorship</SelectItem>
            <SelectItem value="student">Student visa sponsorship only</SelectItem>
            <SelectItem value="work">Previous work visa sponsorship</SelectItem>
            <SelectItem value="nhs">Previous NHS sponsorship</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderQualifications = () => {
    const filteredFamilies = EXAM_FAMILIES.filter(fam =>
      examSearch === "" || 
      fam.label.toLowerCase().includes(examSearch.toLowerCase()) ||
      fam.stages.some(s => s.label.toLowerCase().includes(examSearch.toLowerCase()))
    );

    return (
      <div className="space-y-4">
        <div>
          <Label>Completed Medical Examinations</Label>
          
          {/* Search filter */}
          <Input
            placeholder="🔍 Search exams (e.g., 'path', 'psych', 'frcr')..."
            value={examSearch}
            onChange={(e) => setExamSearch(e.target.value)}
            className="mb-3 mt-2"
          />
          
          {/* Accordion of exam families */}
          <Accordion type="multiple" className="space-y-2">
            {filteredFamilies.map((family) => (
              <AccordionItem key={family.code} value={family.code}>
                <AccordionTrigger className="text-sm font-medium">
                  {family.label} <span className="text-muted-foreground ml-1">({family.stages.length} stages)</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid md:grid-cols-2 gap-2 pl-4">
                    {family.stages.map((stage) => {
                      const examKey = `${family.code}_${stage.code}`;
                      return (
                        <div key={examKey} className="flex items-center space-x-2">
                          <Checkbox
                            id={examKey}
                            checked={profileData.qualifications.examsPassed.includes(examKey)}
                            onCheckedChange={(checked) => 
                              handleArrayToggle("qualifications", "examsPassed", examKey, checked as boolean)
                            }
                          />
                          <Label htmlFor={examKey} className="text-sm cursor-pointer">
                            {stage.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          {filteredFamilies.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No exams found matching "{examSearch}"
            </p>
          )}
          
          {/* "Other exam" toggle + chips */}
          <div className="mt-4 p-3 bg-muted/30 rounded-lg border">
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox
                id="examsOther"
                checked={profileData.qualifications.showExamsOther}
                onCheckedChange={(checked) => 
                  updateProfileData("qualifications", "showExamsOther", checked)
                }
              />
              <Label htmlFor="examsOther" className="font-medium cursor-pointer">
                Other exam (specify)
              </Label>
            </div>
            
            {profileData.qualifications.showExamsOther && (
              <ChipsInput
                value={profileData.qualifications.examsOther}
                onChange={(values) => updateProfileData("qualifications", "examsOther", values)}
                placeholder="Enter exam (e.g., FRCR 2B, FRCPath Immunology Part 2), press Enter to add"
                maxLength={50}
                pattern={/^[A-Za-z0-9\s+\-\/]{1,50}$/}
              />
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="englishTest">English Language Test</Label>
            <Select onValueChange={(value) => updateProfileData("qualifications", "englishTest", value)}>
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
          {(profileData.qualifications.englishTest === "ielts" || profileData.qualifications.englishTest === "oet") && (
            <div>
              <Label htmlFor="englishScore">English Test Score</Label>
              <Input
                id="englishScore"
                value={profileData.qualifications.englishScore}
                onChange={(e) => updateProfileData("qualifications", "englishScore", e.target.value)}
                placeholder="e.g., Overall 7.5 (IELTS) or Overall B (OET)"
              />
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="ukExperience">UK Clinical Experience</Label>
            <Select onValueChange={(value) => updateProfileData("qualifications", "ukExperience", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select UK experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No UK Experience</SelectItem>
                <SelectItem value="clinical-attachment">Clinical Attachment Only</SelectItem>
                <SelectItem value="0-6months">0-6 months</SelectItem>
                <SelectItem value="6-12months">6-12 months</SelectItem>
                <SelectItem value="1-2years">1-2 years</SelectItem>
                <SelectItem value="2plus">2+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="currentRole">Current Role/Position</Label>
            <Input
              id="currentRole"
              value={profileData.qualifications.currentRole}
              onChange={(e) => updateProfileData("qualifications", "currentRole", e.target.value)}
              placeholder="e.g., SHO, Registrar, Consultant"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderPreferences = () => {
    const locations = [
      "London", "Manchester", "Birmingham", "Liverpool", "Leeds", "Newcastle", 
      "Sheffield", "Bristol", "Nottingham", "Leicester", "Scotland", "Wales", "Northern Ireland"
    ];

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="targetSpecialty">Target Specialty</Label>
            <Select onValueChange={(value) => updateProfileData("preferences", "targetSpecialty", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internal-medicine">Internal Medicine</SelectItem>
                <SelectItem value="emergency-medicine">Emergency Medicine</SelectItem>
                <SelectItem value="surgery">General Surgery</SelectItem>
                <SelectItem value="psychiatry">Psychiatry</SelectItem>
                <SelectItem value="paediatrics">Paediatrics</SelectItem>
                <SelectItem value="obstetrics-gynaecology">Obstetrics & Gynaecology</SelectItem>
                <SelectItem value="anaesthetics">Anaesthetics</SelectItem>
                <SelectItem value="radiology">Radiology</SelectItem>
                <SelectItem value="pathology">Pathology</SelectItem>
                <SelectItem value="general-practice">General Practice</SelectItem>
                <SelectItem value="any">Open to Any Specialty</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="targetRole">Target Role Level</Label>
            <Select onValueChange={(value) => updateProfileData("preferences", "targetRole", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select target role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fy2">Foundation Year 2</SelectItem>
                <SelectItem value="sho">Senior House Officer</SelectItem>
                <SelectItem value="specialty-doctor">Specialty Doctor</SelectItem>
                <SelectItem value="associate-specialist">Associate Specialist</SelectItem>
                <SelectItem value="consultant">Consultant</SelectItem>
                <SelectItem value="locum">Locum Positions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Preferred Locations (select multiple)</Label>
          <div className="grid md:grid-cols-3 gap-2 mt-2">
            {locations.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={location}
                  checked={profileData.preferences.preferredLocations.includes(location)}
                  onCheckedChange={(checked) => handleArrayToggle("preferences", "preferredLocations", location, checked as boolean)}
                />
                <Label htmlFor={location} className="text-sm cursor-pointer">{location}</Label>
              </div>
            ))}
          </div>
          
          {/* "Other location" toggle + chips */}
          <div className="mt-4 p-3 bg-muted/30 rounded-lg border">
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox
                id="locationsOther"
                checked={profileData.preferences.showLocationsOther}
                onCheckedChange={(checked) => 
                  updateProfileData("preferences", "showLocationsOther", checked)
                }
              />
              <Label htmlFor="locationsOther" className="font-medium cursor-pointer">
                Other location (specify)
              </Label>
            </div>
            
            {profileData.preferences.showLocationsOther && (
              <ChipsInput
                value={profileData.preferences.locationsOther}
                onChange={(values) => updateProfileData("preferences", "locationsOther", values)}
                placeholder="Enter city/town or postcode (e.g., Guildford, G1 1AA), press Enter to add"
                maxLength={50}
                pattern={/^[A-Za-z0-9\s+\-\/]{1,50}$/}
              />
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Preferred Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={profileData.preferences.startDate}
              onChange={(e) => updateProfileData("preferences", "startDate", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="workPattern">Work Pattern Preference</Label>
            <Select onValueChange={(value) => updateProfileData("preferences", "workPattern", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select work pattern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
                <SelectItem value="locum">Locum Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderPersonalDetails();
      case 1: return renderVisaStatus();
      case 2: return renderQualifications();
      case 3: return renderPreferences();
      default: return null;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Build payload with conditional arrays
      const payload = {
        ...profileData,
        // Add exams_other only if non-empty
        ...(profileData.qualifications.examsOther?.length > 0 && {
          exams_other: profileData.qualifications.examsOther
        }),
        // Add locations_other only if non-empty
        ...(profileData.preferences.locationsOther?.length > 0 && {
          locations_other: profileData.preferences.locationsOther
        })
      };
      
      onComplete(payload);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 0: return profileData.personal.fullName && profileData.personal.nationality;
      case 1: return profileData.visa.currentVisaStatus;
      case 2: 
        return (
          profileData.qualifications.examsPassed.length > 0 ||
          profileData.qualifications.examsOther.length > 0
        );
      case 3: return profileData.preferences.targetSpecialty && profileData.preferences.targetRole;
      default: return false;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Find Your NHS Sponsorship Match</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Complete your profile to get matched with NHS Trusts offering visa sponsorship for your specialty and experience level
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
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
        <div>
          <h3 className="text-xl font-semibold">{steps[currentStep].title}</h3>
          <p className="text-muted-foreground">{steps[currentStep].description}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Step {currentStep + 1} of {steps.length}</CardTitle>
          <CardDescription>
            Please provide accurate information for the best sponsorship matches
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!isStepComplete()}
          className="flex items-center gap-2"
        >
          {currentStep === steps.length - 1 ? "Find Matches" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SponsorshipIntake;