import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, Users, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

const IELTS_OET = () => {
  const features = [
    "IELTS Academic & General Training modules",
    "OET for healthcare professionals",
    "Speaking practice with native speakers",
    "Writing task feedback and correction",
    "Comprehensive mock examinations",
    "Proven track record of band 7+ scores"
  ];

  const timeline = [
    {
      phase: "Assessment",
      duration: "Week 1",
      description: "English proficiency evaluation and personalised study plan"
    },
    {
      phase: "Foundation",
      duration: "Weeks 2-8",
      description: "Core language skills development and exam technique training"
    },
    {
      phase: "Practice",
      duration: "Weeks 9-14",
      description: "Intensive practice tests and skill refinement"
    },
    {
      phase: "Final Prep",
      duration: "Weeks 15-16",
      description: "Mock examinations and confidence building"
    }
  ];

  return (
    <>
      <SEOHead 
        title="IELTS & OET Preparation | NextDoc Global"
        description="Expert IELTS and OET preparation for healthcare professionals. Achieve band 7+ scores with our proven methods and personalised coaching."
        keywords="IELTS preparation, OET training, medical English, healthcare English"
      />
      <Navigation />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-primary-foreground text-primary">English Proficiency</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                IELTS & OET Preparation
              </h1>
              <p className="text-xl leading-relaxed opacity-90 mb-8">
                Master English proficiency for healthcare professionals with our comprehensive IELTS and OET preparation programs designed specifically for medical careers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/get-started">
                  <Button size="lg" variant="secondary" className="px-8">
                    Start Your Preparation
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Download Study Guide
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our English Program?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Specialized training for healthcare professionals with proven methods to achieve band 7+ scores
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>16-Week Program</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive preparation covering all four language skills for medical professionals
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Native Speakers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Practice with qualified native English speakers specialized in medical communication
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Band 7+ Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Proven track record helping healthcare professionals achieve their target scores
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Program Timeline */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Program Timeline</h2>
              <p className="text-muted-foreground">
                Structured 16-week journey to English proficiency
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {timeline.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.phase}</CardTitle>
                      <Badge variant="outline">{item.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* IELTS vs OET Comparison */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">IELTS vs OET: Choose Your Path</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">IELTS</CardTitle>
                  <p className="text-muted-foreground">International English Language Testing System</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Widely accepted for visa applications</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Academic and General Training modules</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Band score 0-9 system</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>General English proficiency</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">OET</CardTitle>
                  <p className="text-muted-foreground">Occupational English Test</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Specifically designed for healthcare</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>12 healthcare professions covered</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Grade A-E assessment</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Medical context scenarios</span>
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
            <h2 className="text-3xl font-bold mb-4">Ready to Master English for Healthcare?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of healthcare professionals who achieved their English proficiency goals with our expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/get-started">
                <Button size="lg" variant="secondary" className="px-8">
                  Start Your Journey
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Free Assessment
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default IELTS_OET;