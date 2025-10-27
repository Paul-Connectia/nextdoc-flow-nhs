import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, GraduationCap, Award, Users, Stethoscope, RotateCcw, ArrowRight, BookOpen, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface PathwaySelectorProps {
  onSelect: (pathway: string) => void;
}

const PathwaySelector = ({ onSelect }: PathwaySelectorProps) => {
  const pathways = [
    {
      id: "plab",
      title: "PLAB Pathway",
      description: "International Medical Graduates seeking NHS positions",
      icon: Globe,
      badge: "Most Popular",
      color: "from-blue-50 to-blue-100 border-blue-200",
      steps: "8 milestones • 12-18 months"
    },
    {
      id: "mrcp",
      title: "MRCP Pathway",
      description: "Royal College of Physicians membership",
      icon: Award,
      badge: "Specialist",
      color: "from-green-50 to-green-100 border-green-200",
      steps: "7 milestones • 3-5 years"
    },
    {
      id: "mrcs",
      title: "MRCS Pathway",
      description: "Royal College of Surgeons membership",
      icon: Stethoscope,
      badge: "Surgical",
      color: "from-red-50 to-red-100 border-red-200",
      steps: "6 milestones • 2-4 years"
    },
    {
      id: "mrcog",
      title: "MRCOG Pathway",
      description: "Obstetrics & Gynaecology specialization",
      icon: Users,
      badge: "O&G Focus",
      color: "from-purple-50 to-purple-100 border-purple-200",
      steps: "7 milestones • 3-4 years"
    },
    {
      id: "mrcpch",
      title: "MRCPCH Pathway",
      description: "Paediatrics and Child Health specialization",
      icon: Users,
      badge: "Paediatrics",
      color: "from-pink-50 to-pink-100 border-pink-200",
      steps: "6 milestones • 3-4 years"
    },
    {
      id: "uk-grad",
      title: "UK Graduate",
      description: "Foundation to Specialty training progression",
      icon: GraduationCap,
      badge: "UK Trained",
      color: "from-indigo-50 to-indigo-100 border-indigo-200",
      steps: "6 milestones • 5-8 years"
    },
    {
      id: "ielts-oet",
      title: "IELTS/OET Pathway",
      description: "English language proficiency for medical practice",
      icon: Globe,
      badge: "Language",
      color: "from-teal-50 to-teal-100 border-teal-200",
      steps: "4 milestones • 3-6 months"
    },
    {
      id: "returner",
      title: "Return to Practice",
      description: "Re-entering NHS practice after a break",
      icon: RotateCcw,
      badge: "Reintegration",
      color: "from-orange-50 to-orange-100 border-orange-200",
      steps: "5 milestones • 6-12 months"
    },
    {
      id: "sas-ahp",
      title: "SAS/AHP Pathway",
      description: "SAS doctors and Allied Health Professionals",
      icon: Stethoscope,
      badge: "Non-Training",
      color: "from-gray-50 to-gray-100 border-gray-200",
      steps: "Variable milestones"
    },
    {
      id: "other-uk-exams",
      title: "Other UK Exams",
      description: "Browse FRCA, FRCR, FRCPath, FRCOphth, MRCGP, MRCEM/FRCEM, FRCS subspecialties, SCEs, and more",
      icon: BookOpen,
      badge: "Browse All",
      color: "from-violet-50 to-violet-100 border-violet-200",
      steps: "Multiple tracks"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your NHS Pathway</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Select your career pathway to generate a personalised roadmap with milestones, deadlines, and next steps
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pathways.map((pathway) => {
          const Icon = pathway.icon;

          // Special handling for "Other UK Exams" - use Link instead of onClick
          if (pathway.id === "other-uk-exams") {
            return (
              <Link key={pathway.id} to="/gapmap/other-uk-exams">
                <Card
                  className={`cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${pathway.color} h-full`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{pathway.title}</CardTitle>
                          <Badge variant="secondary" className="mt-1">{pathway.badge}</Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-left mb-3">{pathway.description}</CardDescription>
                    <div className="text-xs text-muted-foreground mb-3">
                      {pathway.steps}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <Button className="w-full group focus-visible:ring-2 focus-visible:ring-ring">
                      Select Pathway
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          }

          return (
            <Card
              key={pathway.id}
              className={`cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${pathway.color}`}
              onClick={() => onSelect(pathway.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{pathway.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{pathway.badge}</Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-left mb-3">{pathway.description}</CardDescription>
                <div className="text-xs text-muted-foreground mb-3">
                  {pathway.steps}
                </div>
              </CardHeader>

              <CardContent>
                <Button className="w-full group focus-visible:ring-2 focus-visible:ring-ring">
                  Select Pathway
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-blue-50 border-blue-200 mt-8">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-semibold text-blue-900 mb-2">Not Sure Which Pathway?</h3>
            <p className="text-sm text-blue-700 mb-4">
              Book a consultation with our Principal Mentors to discuss your career goals
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-blue-300 text-blue-700">
                  Book Career Consultation
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center">Contact Us</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 p-6">
                  {/* Email Contact */}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Email Us</h3>
                    <a href="mailto:support@nextdocuk.com" className="text-primary hover:underline font-medium">
                      support@nextdocuk.com
                    </a>
                  </div>

                  {/* UK Contact */}
                  <div className="text-center border-t pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">UK Office</h3>
                    <div className="space-y-2">
                      <a href="tel:+447733673574" className="block text-primary hover:underline font-medium">
                        +44 7733673574
                      </a>
                      <a href="https://wa.me/447733673574" className="inline-flex items-center text-green-600 hover:underline text-sm">
                        <Heart className="h-4 w-4 mr-1" />
                        WhatsApp UK
                      </a>
                    </div>
                  </div>

                  {/* India Contact */}
                  <div className="text-center border-t pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">India Office</h3>
                    <div className="space-y-2">
                      <a href="tel:+919483540070" className="block text-primary hover:underline font-medium">
                        +91 9483540070
                      </a>
                      <a href="https://wa.me/919483540070" className="inline-flex items-center text-green-600 hover:underline text-sm">
                        <Heart className="h-4 w-4 mr-1" />
                        WhatsApp India
                      </a>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PathwaySelector;