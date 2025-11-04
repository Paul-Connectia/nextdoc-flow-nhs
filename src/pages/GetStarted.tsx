import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, ArrowRight, Mail, Phone, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser, useSignIn } from "@clerk/clerk-react";
import { LoadingSpinner } from "@/components/LoadingSkeleton";

const GetStarted = () => {
  const [consultDialogOpen, setConsultDialogOpen] = useState(false);

  const { isSignedIn } = useUser()
  const { isLoaded } = useSignIn()
  const navigate = useNavigate()

  if (isLoaded && isSignedIn) {
    navigate('/')
  }

  const steps = [
    {
      number: "01",
      title: "Complete Assessment",
      description: "Tell us about your background, qualifications, and career goals"
    },
    {
      number: "02",
      title: "Get Matched",
      description: "We'll match you with the right mentor and create your personalized plan"
    },
    {
      number: "03",
      title: "Start Learning",
      description: "Begin your journey with AI-powered tools and expert guidance"
    },
    {
      number: "04",
      title: "Achieve Success",
      description: "Pass your exams and secure your NHS position with ongoing support"
    }
  ];

  const benefits = [
    "Personalized learning pathway",
    "Expert mentor matching",
    "AI-powered study tools",
    "Mock examinations & feedback",
    "Integrated with NextDoc AI tools — GapMap™, CVBooster™, InterviewSim+™, PLAB QBank",
    "AI-powered personalized dashboard"
  ];

  return (
    !isLoaded ? <LoadingSpinner /> : <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your NHS Journey Today
            </h1>
            <p className="text-xl leading-relaxed opacity-90 mb-8">
              Join thousands of international doctors who have successfully transitioned to the NHS
              with our comprehensive support system.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">Your journey to NHS success in 4 simple steps</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="text-center relative">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                    {step.number}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Get Started Today</CardTitle>
                <p className="text-muted-foreground">
                  Complete your initial assessment to begin your personalized NHS journey
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+44 20 1234 5678" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Home Country</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="pakistan">Pakistan</SelectItem>
                        <SelectItem value="bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="nigeria">Nigeria</SelectItem>
                        <SelectItem value="egypt">Egypt</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select years" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal">Primary Goal</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="What's your main objective?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plab">Pass PLAB Examinations</SelectItem>
                      <SelectItem value="mrcp">MRCP Preparation</SelectItem>
                      <SelectItem value="placement">NHS Job Placement</SelectItem>
                      <SelectItem value="specialty">Specialty Training</SelectItem>
                      <SelectItem value="general">General Career Guidance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background">Tell us about your medical background</Label>
                  <Textarea
                    id="background"
                    placeholder="Please share your medical qualifications, specialties, and any relevant experience..."
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="newsletter" />
                    <Label htmlFor="newsletter" className="text-sm">
                      I would like to receive updates about new programmes and NHS opportunities
                    </Label>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Start My NHS Journey
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in here
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">What You'll Get</h3>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Built for NHS Success</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Expert-developed, AI-powered tools designed with practicing NHS mentors.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Secure, GDPR-compliant, and ICO registered (Company No. 16504223).
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">GDPR Compliant</Badge>
                    <Badge variant="secondary">ICO Registered</Badge>
                    <Badge variant="secondary">NHS Aligned</Badge>
                  </div>
                  <Button variant="outline" className="w-full mt-2" asChild>
                    <Link to="/products">
                      View Our Products
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Still have questions?</h3>
                  <p className="text-muted-foreground mb-4">
                    Speak with one of our advisors to learn more about our programmes and how we can help you succeed.
                  </p>

                  <Dialog open={consultDialogOpen} onOpenChange={setConsultDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Schedule Free Consultation
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Contact Us</DialogTitle>
                        <DialogDescription>
                          Choose your preferred method to schedule a free consultation
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        {/* Email Option */}
                        <a
                          href="mailto:support@nextdocuk.com?subject=Free%20Consultation%20Request&body=Hi%20NextDoc%20UK%2C%0A%0AMy%20name%20is%20...%20and%20I%27d%20like%20to%20request%20a%20free%20consultation.%0A%0AThanks!"
                          className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent transition-colors"
                        >
                          <Mail className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-semibold">Email Us</div>
                            <div className="text-sm text-muted-foreground">support@nextdocuk.com</div>
                            <div className="text-xs text-muted-foreground mt-1">We typically reply within 1 business day</div>
                          </div>
                        </a>

                        {/* UK Phone Option */}
                        <a
                          href="tel:+447733673574"
                          className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent transition-colors"
                        >
                          <Phone className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-semibold">UK Office</div>
                            <div className="text-sm text-muted-foreground">+44 7733 673574</div>
                          </div>
                        </a>

                        {/* India WhatsApp Option */}
                        <a
                          href="https://wa.me/919483540070"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent transition-colors"
                        >
                          <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-semibold">India Office (WhatsApp)</div>
                            <div className="text-sm text-muted-foreground">+91 9483 540070</div>
                            <div className="text-xs text-muted-foreground mt-1">Call or chat via WhatsApp</div>
                          </div>
                        </a>
                      </div>

                      <div className="text-center text-xs text-muted-foreground pt-2 border-t">
                        Prefer email? We typically reply within 1 business day.
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetStarted;