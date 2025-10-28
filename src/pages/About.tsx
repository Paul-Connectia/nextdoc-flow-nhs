import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Users, Globe, Award, Heart, Trophy, Mail, Phone, MessageCircle, Sparkles, GraduationCap, Stethoscope, Briefcase } from "lucide-react";
import { BadgeFrameworkSection } from "@/components/BadgeFrameworkSection";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About NextDoc UK
            </h1>
            <p className="text-xl leading-relaxed opacity-90">
              Empowering medical graduates to successfully transition into the NHS.
              We provide comprehensive support, training, and mentorship for doctors beginning their UK healthcare journey.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-primary" />
                  <span>Our Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To bridge the gap between medical expertise and NHS requirements,
                  ensuring every qualified doctor can contribute meaningfully to UK healthcare while
                  advancing their professional journey with confidence and competence.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-6 w-6 text-primary" />
                  <span>Our Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  A world where talented medical graduates seamlessly integrate into
                  the NHS, bringing diverse perspectives and expertise that strengthen healthcare
                  delivery across the United Kingdom.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose NextDoc UK?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We understand the unique challenges doctors face when transitioning to the NHS
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-primary" />
                  <span>Expert Mentorship</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn from experienced NHS consultants and doctors who have
                  successfully navigated the same journey you're on.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-primary" />
                  <span>Experienced Mentors</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our mentors have guided doctors through NHS transitions, sharing practical insights,
                  leadership experience, and compassion grounded in real-world practice.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-6 w-6 text-primary" />
                  <span>Comprehensive Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From exam preparation to job placement, we provide end-to-end guidance
                  for your complete NHS career journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Mentorship Ecosystem */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mentorship Ecosystem</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Built by Doctors. For Doctors.
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto mt-4 leading-relaxed">
              At the heart of NextDoc UK lies a global network of clinicians, educators, and innovators dedicated to helping international medical graduates thrive in the NHS. Every mentor in our ecosystem has lived this path — from passing PLAB to achieving specialty registration — and now gives back through structured guidance, empathy, and real-world insight.
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto mt-4 leading-relaxed">
              Our ecosystem is built for collaboration, inclusivity, and verified experience. Every mentor undergoes verification of GMC registration, NHS employment, and professional standing before joining our network.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-blue-200 bg-blue-50/30 dark:border-blue-800 dark:bg-blue-950/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <Badge variant="outline" className="border-blue-600 text-blue-600">🩵 Associate</Badge>
                </div>
                <CardTitle className="text-lg mt-3">Associate Mentors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Early-career NHS professionals</li>
                  <li>• Peer support & PLAB prep</li>
                  <li>• Transition guidance</li>
                  <li>• 1+ years UK clinical experience</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-teal-200 bg-teal-50/30 dark:border-teal-800 dark:bg-teal-950/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg">
                    <Stethoscope className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <Badge variant="outline" className="border-teal-600 text-teal-600">💙 Senior</Badge>
                </div>
                <CardTitle className="text-lg mt-3">Senior Mentors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Experienced NHS clinicians</li>
                  <li>• Specialty mentorship</li>
                  <li>• Leadership advice & teaching</li>
                  <li>• 3+ years NHS experience</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50/30 dark:border-amber-800 dark:bg-amber-950/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">
                    <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <Badge variant="outline" className="border-amber-600 text-amber-600">🟡 Principal</Badge>
                </div>
                <CardTitle className="text-lg mt-3">Principal Mentors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Consultant-level leaders</li>
                  <li>• Strategic mentorship</li>
                  <li>• Clinical career direction</li>
                  <li>• 8+ years NHS experience</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50/30 dark:border-purple-800 dark:bg-purple-950/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <Badge variant="outline" className="border-purple-600 text-purple-600">🌍 Non-Clinical</Badge>
                </div>
                <CardTitle className="text-lg mt-3">Non-Clinical Mentors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Healthcare management experts</li>
                  <li>• Governance & CPD support</li>
                  <li>• Research mentorship</li>
                  <li>• Professional development</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground italic max-w-3xl mx-auto">
              "Together, this ecosystem connects lived NHS experience with structured mentorship and data-driven innovation — ensuring every doctor finds guidance that fits their stage and ambition."
            </p>
          </div>
        </div>
      </section>

      {/* Understanding Mentor Badges */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Understanding Mentor Badges</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transparent. Fair. Experience-Driven.
            </p>
          </div>
          <BadgeFrameworkSection />
        </div>
      </section>

      {/* Research & Development */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Research & Development</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our tools are developed using evidence-based methodology and NHS workforce data analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-6 w-6 text-primary" />
                  <span>Evidence-Based Development</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI-powered tools are built using analysis of NHS workforce data, Royal College
                  examination patterns, and validated educational methodologies. Each feature is reviewed
                  by NHS professionals to ensure alignment with clinical and educational standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-primary" />
                  <span>Peer-Reviewed Content</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  All educational material undergoes rigorous review by NHS consultants and medical
                  education specialists. Our methodology combines medical education research with
                  continuous feedback from international doctors successfully integrated into the NHS.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Excellence", description: "Committed to the highest standards in medical education and support" },
              { title: "Integrity", description: "Transparent, honest, and ethical in all our interactions" },
              { title: "Diversity", description: "Celebrating the rich perspectives doctors bring to UK healthcare" },
              { title: "Innovation", description: "Leveraging technology to create better learning experiences" }
            ].map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Connect with a Mentor Who Understands Your Journey?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Browse our verified mentor network or speak with our advisors to learn more about our programs and how we can help you succeed in your NHS career transition.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button size="lg" asChild>
                  <Link to="/mentors">
                    <Users className="mr-2 h-5 w-5" />
                    Browse Our Mentor Network
                  </Link>
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="outline">
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
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;