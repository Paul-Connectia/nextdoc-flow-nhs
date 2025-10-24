import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, MapPin, CheckCircle, AlertCircle, Clock, Download, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ConditionalFooter from "@/components/ConditionalFooter";
import PathwaySelector from "@/components/PathwaySelector";
import ProfileIntake from "@/components/ProfileIntake";
import RoadmapTimeline from "@/components/RoadmapTimeline";

const GapMap = () => {
  const [currentStep, setCurrentStep] = useState("pathway");
  const [selectedPathway, setSelectedPathway] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [roadmapData, setRoadmapData] = useState(null);

  const handlePathwaySelect = (pathway: string) => {
    setSelectedPathway(pathway);
    setCurrentStep("intake");
  };

  const handleProfileComplete = (profile: any) => {
    setUserProfile(profile);
    generateRoadmap(selectedPathway, profile);
    setCurrentStep("roadmap");
  };

  const generateRoadmap = (pathway: string, profile: any) => {
    // Simulate roadmap generation based on pathway and profile
    const roadmaps = {
      "plab": {
        title: "PLAB Pathway to NHS",
        progress: 65,
        totalSteps: 8,
        completedSteps: 5,
        steps: [
          { id: 1, title: "Medical Degree Verification", status: "completed", description: "Medical degree recognized by GMC" },
          { id: 2, title: "IELTS/OET Qualification", status: "completed", description: "English language proficiency achieved" },
          { id: 3, title: "PLAB 1 Examination", status: "completed", description: "Written examination passed" },
          { id: 4, title: "PLAB 2 OSCE", status: "completed", description: "Clinical skills assessment passed" },
          { id: 5, title: "GMC Registration", status: "completed", description: "Full GMC registration obtained" },
          { id: 6, title: "Clinical Attachment", status: "pending", description: "4-week clinical attachment in UK hospital" },
          { id: 7, title: "NHS Job Application", status: "not-started", description: "Apply for FY2 or SHO positions" },
          { id: 8, title: "NHS Induction", status: "not-started", description: "Complete NHS induction programme" }
        ]
      },
      "mrcp": {
        title: "MRCP Pathway to Specialty Training",
        progress: 40,
        totalSteps: 7,
        completedSteps: 3,
        steps: [
          { id: 1, title: "Foundation Training", status: "completed", description: "FY1 and FY2 completed" },
          { id: 2, title: "MRCP Part 1", status: "completed", description: "Written examination passed" },
          { id: 3, title: "Core Medical Training", status: "completed", description: "CT1-CT2 training completed" },
          { id: 4, title: "MRCP Part 2", status: "pending", description: "Written examination scheduled" },
          { id: 5, title: "MRCP PACES", status: "not-started", description: "Clinical examination" },
          { id: 6, title: "Specialty Training Application", status: "not-started", description: "Apply for ST3+ positions" },
          { id: 7, title: "Consultant Appointment", status: "not-started", description: "Senior medical positions" }
        ]
      },
      "uk-grad": {
        title: "UK Graduate Progression",
        progress: 75,
        totalSteps: 6,
        completedSteps: 4,
        steps: [
          { id: 1, title: "Medical School Graduation", status: "completed", description: "UK medical degree obtained" },
          { id: 2, title: "Foundation Year 1", status: "completed", description: "FY1 training completed" },
          { id: 3, title: "Foundation Year 2", status: "completed", description: "FY2 training completed" },
          { id: 4, title: "Core Training", status: "completed", description: "CT1-CT2 in chosen specialty" },
          { id: 5, title: "Specialty Training", status: "pending", description: "ST3+ training programme" },
          { id: 6, title: "Consultant/GP Partnership", status: "not-started", description: "Senior clinical roles" }
        ]
      }
    };

    setRoadmapData(roadmaps[pathway as keyof typeof roadmaps] || roadmaps.plab);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600";
      case "pending": return "text-orange-600";
      case "not-started": return "text-gray-400";
      default: return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-6 w-6 text-green-600" />;
      case "pending": return <Clock className="h-6 w-6 text-orange-600" />;
      case "not-started": return <AlertCircle className="h-6 w-6 text-gray-400" />;
      default: return <AlertCircle className="h-6 w-6 text-gray-400" />;
    }
  };

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
            <MapPin className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-foreground">GapMap™</h1>
            <Badge variant="secondary">AI-Powered</Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            Map your NHS career journey with personalised roadmaps and milestone tracking
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {currentStep === "pathway" && (
            <PathwaySelector onSelect={handlePathwaySelect} />
          )}
          
          {currentStep === "intake" && (
            <ProfileIntake 
              pathway={selectedPathway}
              onComplete={handleProfileComplete}
              onBack={() => setCurrentStep("pathway")}
            />
          )}
          
          {currentStep === "roadmap" && roadmapData && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{roadmapData.title}</CardTitle>
                      <CardDescription>Your personalised NHS career roadmap</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{roadmapData.progress}%</div>
                      <p className="text-sm text-muted-foreground">Complete</p>
                    </div>
                  </div>
                  <Progress value={roadmapData.progress} className="mt-4" />
                  <p className="text-sm text-muted-foreground">
                    {roadmapData.completedSteps} of {roadmapData.totalSteps} milestones completed
                  </p>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Career Timeline</CardTitle>
                  <CardDescription>Track your progress through each milestone</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roadmapData.steps.map((step, index) => (
                      <div key={step.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0">
                          {getStatusIcon(step.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`font-semibold ${getStatusColor(step.status)}`}>
                              {step.title}
                            </h4>
                            <Badge 
                              variant={step.status === "completed" ? "default" : 
                                     step.status === "pending" ? "secondary" : "outline"}
                            >
                              {step.status === "completed" ? "Completed" :
                               step.status === "pending" ? "In Progress" : "Not Started"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                          
                          {step.status === "pending" && (
                            <div className="bg-orange-50 border border-orange-200 rounded p-3">
                              <p className="text-sm text-orange-800 mb-2">
                                <strong>Next Actions:</strong>
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                <Button size="sm" variant="outline" className="text-xs">
                                  Book Mentor Session
                                </Button>
                                <Button size="sm" variant="outline" className="text-xs">
                                  View Requirements
                                </Button>
                                <Button size="sm" variant="outline" className="text-xs">
                                  Update CV
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          {step.status === "not-started" && index === roadmapData.steps.findIndex(s => s.status === "not-started") && (
                            <div className="bg-blue-50 border border-blue-200 rounded p-3">
                              <p className="text-sm text-blue-800 mb-2">
                                <strong>Ready to start:</strong> This is your next milestone
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                <Button size="sm" className="text-xs">
                                  Get Started
                                </Button>
                                <Button size="sm" variant="outline" className="text-xs">
                                  Learn More
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Deadlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                        <span className="text-sm">MRCP Part 2 Application</span>
                        <Badge variant="secondary">15 days</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-sm">CPD Portfolio Review</span>
                        <Badge variant="outline">30 days</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Recommended Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        📚 Complete CPD Mastery™ Course
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        🎯 Practice with InterviewSim™
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        👨‍⚕️ Book Principal Mentor Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => setCurrentStep("pathway")}>
                  Change Pathway
                </Button>
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Roadmap PDF
                </Button>
                <Button variant="secondary">
                  Share with Mentor
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <ConditionalFooter />
    </div>
  );
};

export default GapMap;