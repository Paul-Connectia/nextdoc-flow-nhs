import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building, MapPin, CheckCircle, AlertTriangle, Download, ExternalLink, Star, Calendar, Users, FileText } from "lucide-react";

interface TrustMatchResultsProps {
  results: any;
  userProfile: any;
  onBack: () => void;
}

const TrustMatchResults = ({ results, userProfile, onBack }: TrustMatchResultsProps) => {
  const getFitScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 80) return "text-blue-600 bg-blue-50";
    if (score >= 70) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const handleDownloadReport = () => {
    // Simulate PDF download
    console.log("Downloading sponsorship report...");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Your Sponsorship Matches</h2>
          <p className="text-muted-foreground">
            Found {results.totalMatches} potential matches • Showing top {results.shortlist.length} recommendations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
          <Button onClick={handleDownloadReport}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Match Results */}
      <div className="grid gap-6">
        {results.shortlist.map((trust: any) => (
          <Card key={trust.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Building className="h-6 w-6 text-blue-600" />
                    <CardTitle className="text-xl">{trust.trustName}</CardTitle>
                    <Badge 
                      className={`font-bold ${getFitScoreColor(trust.fitScore)}`}
                    >
                      {trust.fitScore}% Match
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {trust.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {trust.specialty}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {trust.role}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={trust.cosStatus === "Active" ? "default" : "destructive"}>
                    COS {trust.cosStatus}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    Expires: {new Date(trust.cosExpiry).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Available Positions</h4>
                  <p className="text-2xl font-bold text-blue-600">{trust.jobsAvailable}</p>
                  <p className="text-xs text-muted-foreground">open roles</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Sponsorship History</h4>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{trust.sponsorshipHistory}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Application Deadline</h4>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">{new Date(trust.applicationDeadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Requirements
                  </h4>
                  <ul className="space-y-1">
                    {trust.requirements.map((req: string, index: number) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Benefits
                  </h4>
                  <ul className="space-y-1">
                    {trust.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View Jobs
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  📧 Contact HR
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  🌐 Trust Website
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  📋 Save for Later
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Red Flags */}
      {results.redFlags.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              Sponsorship Limitations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.redFlags.map((flag: any, index: number) => (
                <div key={index} className="p-3 bg-white rounded border border-orange-200">
                  <h4 className="font-medium text-orange-900">{flag.trust}</h4>
                  <p className="text-sm text-orange-700 mt-1">{flag.reason}</p>
                  <p className="text-xs text-orange-600 mt-2">💡 {flag.advice}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Strengthen Your Applications</CardTitle>
          <CardDescription className="text-blue-700">
            Recommended actions to improve your sponsorship chances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.recommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white rounded border border-blue-200">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-blue-900">{rec}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex gap-2 flex-wrap">
            <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
              📚 CPD Mastery™
            </Button>
            <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
              🎯 InterviewSim™
            </Button>
            <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
              📄 CV Booster™
            </Button>
            <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
              👨‍⚕️ Book Mentor Session
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-6">
        <Button variant="outline" onClick={onBack}>
          Update Profile
        </Button>
        <Button onClick={handleDownloadReport} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Full Report
        </Button>
        <Button variant="secondary">
          Share with Mentor
        </Button>
      </div>
    </div>
  );
};

export default TrustMatchResults;