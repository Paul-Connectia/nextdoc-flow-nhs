import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Building, CheckCircle, AlertTriangle, Download, ExternalLink, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ConditionalFooter from "@/components/ConditionalFooter";
import SponsorshipIntake from "@/components/SponsorshipIntake";
import TrustMatchResults from "@/components/TrustMatchResults";

const SponsorMatch = () => {
  const [currentStep, setCurrentStep] = useState("intake");
  const [userProfile, setUserProfile] = useState({});
  const [matchResults, setMatchResults] = useState(null);

  const handleIntakeComplete = (profile: any) => {
    setUserProfile(profile);
    generateMatches(profile);
    setCurrentStep("results");
  };

  const generateMatches = (profile: any) => {
    // Simulate matching engine based on user profile
    const matches = {
      totalMatches: 12,
      shortlist: [
        {
          id: 1,
          trustName: "Guy's and St Thomas' NHS Foundation Trust",
          location: "London",
          specialty: "Internal Medicine",
          role: "SHO",
          fitScore: 95,
          cosStatus: "Active",
          cosExpiry: "2025-08-15",
          jobsAvailable: 3,
          sponsorshipHistory: "Excellent",
          requirements: ["GMC Registration", "PLAB 2", "IELTS 7.0"],
          benefits: ["Visa sponsorship", "Educational support", "Research opportunities"],
          applicationDeadline: "2025-02-28",
          contactEmail: "recruitment@gstt.nhs.uk",
          website: "https://www.guysandstthomas.nhs.uk"
        },
        {
          id: 2,
          trustName: "Imperial College Healthcare NHS Trust",
          location: "London",
          specialty: "Emergency Medicine",
          role: "SHO",
          fitScore: 88,
          cosStatus: "Active",
          cosExpiry: "2025-12-01",
          jobsAvailable: 2,
          sponsorshipHistory: "Good",
          requirements: ["GMC Registration", "PLAB 2", "IELTS 7.0", "UK Clinical Experience"],
          benefits: ["Visa sponsorship", "Teaching hospital environment"],
          applicationDeadline: "2025-03-15",
          contactEmail: "recruitment@imperial.nhs.uk",
          website: "https://www.imperial.nhs.uk"
        },
        {
          id: 3,
          trustName: "Royal Free London NHS Foundation Trust",
          location: "London",
          specialty: "General Surgery",
          role: "SHO",
          fitScore: 82,
          cosStatus: "Active",
          cosExpiry: "2025-06-30",
          jobsAvailable: 1,
          sponsorshipHistory: "Very Good",
          requirements: ["GMC Registration", "PLAB 2", "IELTS 7.0", "Surgical Portfolio"],
          benefits: ["Visa sponsorship", "Surgical training programme"],
          applicationDeadline: "2025-03-01",
          contactEmail: "recruitment@royalfree.nhs.uk",
          website: "https://www.royalfree.nhs.uk"
        }
      ],
      redFlags: [
        {
          trust: "King's College Hospital NHS Foundation Trust",
          reason: "Currently not sponsoring international candidates",
          advice: "Consider improving UK clinical experience first"
        }
      ],
      recommendations: [
        "Complete CPD Mastery™ to strengthen your application",
        "Consider InterviewSim™ for Trust-specific interview practice",
        "Update your CV with CV Booster™ before applying"
      ]
    };

    setMatchResults(matches);
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
            <Building className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-foreground">SponsorMatch™</h1>
            <Badge variant="secondary">AI-Powered</Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            Find NHS Trusts offering visa sponsorship tailored to your profile and specialty
          </p>
        </div>

        {/* <div className="max-w-6xl mx-auto">
          {currentStep === "intake" && (
            <SponsorshipIntake onComplete={handleIntakeComplete} />
          )}
          
          {currentStep === "results" && matchResults && (
            <TrustMatchResults 
              results={matchResults}
              userProfile={userProfile}
              onBack={() => setCurrentStep("intake")}
            />
          )}
        </div> */}
      </div>

      <ConditionalFooter />
    </div>
  );
};

export default SponsorMatch;