import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight, Stethoscope, GraduationCap, Users, Globe, Award, Briefcase, Heart } from "lucide-react";
import { computePresetId, serializeInterviewPayload } from "@/lib/interviewHelpers";
import { InterviewConfig } from "@/types/interview";

interface InterviewSetupProps {
  onComplete: (config: any) => void;
}

const InterviewSetup = ({ onComplete }: InterviewSetupProps) => {
  const [selectedPathway, setSelectedPathway] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [focusAreas, setFocusAreas] = useState<string[]>([]);

  const pathways = [
    {
      id: "plab-img",
      title: "PLAB/International Medical Graduate",
      description: "For IMG doctors seeking NHS positions",
      icon: Globe,
      badge: "Popular"
    },
    {
      id: "uk-grad",
      title: "UK Graduate",
      description: "Core/Specialty training applications",
      icon: GraduationCap,
      badge: "Most Used"
    },
    {
      id: "postgrad-exam",
      title: "Postgraduate Exams",
      description: "MRCP, MRCS, MRCOG, MRCPCH interviews",
      icon: Award,
      badge: "Exam Focus"
    },
    {
      id: "consultant",
      title: "Consultant/Senior Roles",
      description: "Consultant, academic, clinical fellow positions",
      icon: Users,
      badge: "Senior Level"
    },
    {
      id: "sas-ahp",
      title: "SAS/AHP",
      description: "SAS doctors and Allied Health Professionals",
      icon: Stethoscope,
      badge: "Specialised"
    },
    {
      id: "trust-specific",
      title: "NHS Trust Jobs",
      description: "Trust-specific job interviews",
      icon: Briefcase,
      badge: "Job Ready"
    }
  ];

  const specialties = [
    "Internal Medicine", "Surgery", "Emergency Medicine", "Psychiatry", 
    "Paediatrics", "Obstetrics & Gynaecology", "Anaesthetics", "Radiology",
    "Pathology", "General Practice", "Cardiology", "Neurology", "Oncology",
    "Dermatology", "Ophthalmology", "ENT", "Orthopaedics", "Urology"
  ];

  const focusOptions = [
    "Clinical scenarios", "NHS values", "Leadership examples", 
    "Patient safety", "Communication skills", "Teamwork", 
    "Professional development", "Research experience",
    "Teaching experience", "Audit & QI projects"
  ];

  const handleFocusAreaChange = (area: string, checked: boolean) => {
    if (checked) {
      setFocusAreas([...focusAreas, area]);
    } else {
      setFocusAreas(focusAreas.filter(item => item !== area));
    }
  };

  const handleStartInterview = () => {
    const config: InterviewConfig = {
      pathway: selectedPathway,
      roleLevel: selectedRole,
      specialty: selectedSpecialty,
      interviewType,
      focusAreas
    };
    
    const payload = serializeInterviewPayload(config);
    
    // Debug logging
    console.log("═══ InterviewSim Payload Debug ═══");
    console.log("PresetId:", computePresetId(config));
    console.log("QBank Version:", payload.qbankVersion);
    console.log("Focus Tags:", payload.focusAreas);
    console.log("Mix:", payload.mix);
    console.log("Full Payload:", payload);
    console.log("══════════════════════════════════");
    
    onComplete({ config, payload });
  };

  const isConfigComplete = selectedPathway && selectedRole && selectedSpecialty && interviewType;

  return (
    <div className="space-y-8">
            <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Set Up Your NHS Interview Practise</h2>
        <p className="text-muted-foreground text-lg">
          Customise your interview simulation based on your target role and specialty
        </p>
      </div>

      {/* Pathway Selection */}
      <Card>
        <CardHeader>
          <CardTitle>1. Choose Your Career Pathway</CardTitle>
          <CardDescription>Select the pathway that matches your current career stage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pathways.map((pathway) => {
              const Icon = pathway.icon;
              return (
                <Card 
                  key={pathway.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedPathway === pathway.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedPathway(pathway.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-5 w-5 text-blue-600" />
                      <Badge variant="secondary" className="text-xs">{pathway.badge}</Badge>
                    </div>
                    <CardTitle className="text-sm">{pathway.title}</CardTitle>
                    <CardDescription className="text-xs">{pathway.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Role and Specialty Selection */}
      {selectedPathway && (
        <Card>
          <CardHeader>
            <CardTitle>2. Specify Your Target Role & Specialty</CardTitle>
            <CardDescription>Help us tailor questions to your specific interview type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="role">Target Role/Level</Label>
                <Select onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your target role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fy2">FY2</SelectItem>
                    <SelectItem value="ct1-ct2">CT1-CT2 (Core Training)</SelectItem>
                    <SelectItem value="st3-st8">ST3-ST8 (Specialty Training)</SelectItem>
                    <SelectItem value="sas">SAS Doctor</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                    <SelectItem value="clinical-fellow">Clinical Fellow</SelectItem>
                    <SelectItem value="academic">Academic Role</SelectItem>
                    <SelectItem value="trust-grade">Trust Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="specialty">Specialty</Label>
                <Select onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty.toLowerCase().replace(/\s+/g, '-')}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="interview-type">Interview Type</Label>
              <Select onValueChange={setInterviewType}>
                <SelectTrigger>
                  <SelectValue placeholder="What type of interview are you practising for?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="national-recruitment">National Recruitment</SelectItem>
                  <SelectItem value="trust-job">NHS Trust Job Interview</SelectItem>
                  <SelectItem value="training-programme">Training Programme</SelectItem>
                  <SelectItem value="consultant-appointment">Consultant Appointment</SelectItem>
                  <SelectItem value="academic-position">Academic Position</SelectItem>
                  <SelectItem value="fellowship">Fellowship Interview</SelectItem>
                  <SelectItem value="private-sector">Private Sector</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Focus Areas */}
      {selectedRole && selectedSpecialty && (
        <Card>
          <CardHeader>
            <CardTitle>3. Interview Focus Areas (Optional)</CardTitle>
            <CardDescription>Select specific areas you want to practice. Leave blank for a balanced mix.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {focusOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={focusAreas.includes(option)}
                    onCheckedChange={(checked) => handleFocusAreaChange(option, checked as boolean)}
                  />
                  <Label htmlFor={option} className="text-sm">{option}</Label>
                </div>
              ))}
            </div>
            
            {focusAreas.length === 0 && interviewType && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>ℹ️ No focus areas selected.</strong> You'll receive a balanced mix of NHS values, clinical, governance, communication, and portfolio questions.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Start Interview */}
      {isConfigComplete && (
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Heart className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">Ready to Begin Your Interview Practise</h3>
              </div>
              
              <div className="text-sm text-blue-700 space-y-1">
                <p><strong>Pathway:</strong> {pathways.find(p => p.id === selectedPathway)?.title}</p>
                <p><strong>Role:</strong> {selectedRole}</p>
                <p><strong>Specialty:</strong> {selectedSpecialty}</p>
                <p><strong>Interview Type:</strong> {interviewType}</p>
                {focusAreas.length > 0 && (
                  <p><strong>Focus Areas:</strong> {focusAreas.join(", ")}</p>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm text-blue-600">
                  You'll receive 5-7 NHS-style questions with instant AI feedback and improvement suggestions
                </p>
                <Button 
                  size="lg" 
                  onClick={handleStartInterview}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Start Interview Practise
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InterviewSetup;