import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  Mail, 
  Sparkles, 
  Users, 
  BookOpen, 
  Award,
  ArrowRight,
  Loader2
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";

interface ExamComingSoonProps {
  examName: string;
  examFullName: string;
  description: string;
  examParts: string[];
  specialtyFocus: string;
}

const ExamComingSoon = ({
  examName,
  examFullName,
  description,
  examParts,
  specialtyFocus
}: ExamComingSoonProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('register-exam-notification', {
        body: {
          email,
          name: name || null,
          examType: examName,
        }
      });

      if (error) throw error;

      toast({
        title: "Successfully registered!",
        description: `We'll send you an email at ${email} when our ${examName} programme launches.`,
        duration: 5000,
      });
      setEmail("");
      setName("");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    `Comprehensive preparation for ${examParts.join(", ")}`,
    `Expert guidance from UK consultant specialists in ${specialtyFocus}`,
    "Enhanced curriculum with latest exam formats",
    "Interactive learning resources and case-based training",
    "Mock examinations with detailed feedback",
    "Dedicated principal mentor support programme"
  ];

  return (
    <>
      <SEOHead 
        title={`${examName} Preparation - Coming Soon | NextDoc UK`}
        description={`Enhanced ${examName} preparation launching soon. Register for early access to comprehensive training with UK consultant mentors.`}
        keywords={`${examName} preparation, ${specialtyFocus}, UK medical training, coming soon`}
      />
      <Navigation />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-6 bg-secondary text-secondary-foreground animate-pulse px-4 py-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4 mr-2 inline" />
                Coming Soon
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {examName} Preparation Programme
              </h1>
              
              <p className="text-lg md:text-xl leading-relaxed opacity-90 mb-4">
                {examFullName}
              </p>
              
              <p className="text-base md:text-lg leading-relaxed opacity-80 max-w-2xl mx-auto">
                {description}
              </p>
            </div>
          </div>
        </section>

        {/* What We're Building Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What We're Building For You</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive {examName} preparation designed by UK consultants specifically for international medical graduates
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-background border border-border">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-primary/20">
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Expert Curriculum</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Comprehensive study materials aligned with current exam formats and Royal College guidelines
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20">
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>UK Consultants</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Learn from experienced NHS consultants and examiners who understand the UK healthcare system
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20">
                <CardHeader>
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Proven Success</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Join thousands of doctors who've successfully passed their exams with our guidance
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Email Notification Form */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="max-w-xl mx-auto shadow-lg border-primary/20">
              <CardHeader className="text-center">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl mb-2">Be the First to Know</CardTitle>
                <p className="text-muted-foreground">
                  Register your interest and we'll notify you as soon as our enhanced {examName} preparation programme launches
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Name (Optional)</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Dr. Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        Notify Me When Available
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    We'll only send you important updates about the {examName} programme launch. No spam, ever.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Explore What's Available Now
            </h2>
            <p className="text-xl opacity-90 mb-8">
              While we finalise our {examName} programme, discover our other tools and connect with expert mentors
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/mentors">
                <Button size="lg" variant="secondary" className="px-8">
                  <Users className="h-4 w-4 mr-2" />
                  Meet Our Mentors
                </Button>
              </Link>
              <Link to="/exams/plab">
                <Button size="lg" variant="secondary" className="px-8">
                  Explore PLAB Preparation
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="secondary" className="px-8">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ExamComingSoon;
