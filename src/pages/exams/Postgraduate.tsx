import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Users, Trophy, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Postgraduate = () => {
  const examTypes = [
    {
      title: "MRCP",
      fullName: "Membership of the Royal College of Physicians",
      duration: "12-18 months",
      description: "Comprehensive internal medicine specialization pathway",
      parts: ["MRCP Part 1", "MRCP Part 2 Written", "MRCP Part 2 Clinical (PACES)"],
      badge: "Available Now"
    },
    {
      title: "MRCS",
      fullName: "Membership of the Royal College of Surgeons",
      duration: "12-15 months", 
      description: "Surgical specialization preparation program",
      parts: ["MRCS Part A", "MRCS Part B (OSCE)"],
      badge: "Coming Soon"
    },
    {
      title: "MRCOG",
      fullName: "Membership of the Royal College of Obstetricians and Gynaecologists",
      duration: "15-18 months",
      description: "Obstetrics and gynaecology specialization pathway",
      parts: ["MRCOG Part 1", "MRCOG Part 2", "MRCOG Part 3"],
      badge: "Coming Soon"
    }
  ];

  const features = [
    "Royal College-aligned curriculum",
    "Expert consultant mentorship",
    "Mock examinations and OSCEs",
    "Clinical case discussions",
    "Research and audit guidance",
    "Career pathway planning"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary-foreground text-primary">Postgraduate Training</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Postgraduate Medical Examinations
            </h1>
            <p className="text-xl leading-relaxed opacity-90 mb-8">
              Advanced preparation programs for Royal College membership examinations, 
              designed for international doctors pursuing specialist training in the UK.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/get-started">
                <Button size="lg" variant="secondary" className="px-8">
                  Explore Programs
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Download Prospectus
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Available Programs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Postgraduate Examination Programs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive preparation for Royal College membership examinations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examTypes.map((exam, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-2xl mb-1">{exam.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{exam.fullName}</p>
                    </div>
                    <Badge variant={exam.badge === "Available Now" ? "default" : "secondary"}>
                      {exam.badge}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{exam.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-sm mb-2">Duration: {exam.duration}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm mb-2">Examination Parts:</p>
                      <ul className="space-y-1">
                        {exam.parts.map((part, partIndex) => (
                          <li key={partIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">{part}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      className="w-full" 
                      variant={exam.badge === "Available Now" ? "default" : "outline"}
                      disabled={exam.badge !== "Available Now"}
                    >
                      {exam.badge === "Available Now" ? "Learn More" : "Notify Me"}
                      {exam.badge === "Available Now" && <ArrowRight className="h-4 w-4 ml-2" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MRCP Deep Dive */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">MRCP Program Details</h2>
            <p className="text-muted-foreground">Currently available - our flagship postgraduate program</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Program Features</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span>MRCP Success Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Part 1 Pass Rate</span>
                    <Badge variant="outline">92%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Part 2 Written Pass Rate</span>
                    <Badge variant="outline">88%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>PACES Pass Rate</span>
                    <Badge variant="outline">85%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Overall Success Rate</span>
                    <Badge>90%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Study Methodology */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Teaching Methodology</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Structured Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Systematic curriculum following Royal College guidelines with progressive difficulty levels
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Expert Mentorship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  One-on-one guidance from consultant physicians who are Royal College examiners
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Practice & Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Regular mock examinations and OSCEs with detailed feedback and improvement plans
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Future Programs */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground">
              We're expanding our postgraduate offerings based on popular demand
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>International Pathways</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Preparation programs for US and Australian medical examinations:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>USMLE Steps 1, 2, 3</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>AMC CAT & Clinical Examination</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specialty Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Additional UK Royal College examinations:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>MRCGP (General Practice)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>MRCPsych (Psychiatry)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Advance Your Medical Career</h2>
          <p className="text-xl opacity-90 mb-8">
            Take the next step in your specialist training with our Royal College exam preparation programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-started">
              <Button size="lg" variant="secondary" className="px-8">
                Start MRCP Program
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Postgraduate;