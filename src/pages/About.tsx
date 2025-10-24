import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Users, Globe, Award, Heart, Trophy, Mail, Phone, MessageCircle } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
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

      {/* Our Mentor Team's Journey */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mentor Team's Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the experienced NHS professionals who've walked the same path and now guide doctors to success
            </p>
          </div>
          
          <div className="space-y-12">
            {/* Dr. Arjun Patel Detailed Story */}
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 p-6 bg-muted/30 flex flex-col items-center justify-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-border">
                      <img 
                        src="/lovable-uploads/a1974f11-8f3f-40c0-b5d8-6e22f135a5e8.png" 
                        alt="Dr. Arjun Patel"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-2">
                    Principal Mentor
                  </Badge>
                  <h3 className="text-xl font-bold text-center">Dr. Arjun Patel</h3>
                  <p className="text-sm text-muted-foreground text-center">Consultant Cardiologist</p>
                  <Badge variant="outline" className="mt-2">15+ Years NHS</Badge>
                </div>
                <div className="md:col-span-2 p-6">
                  <h4 className="text-lg font-semibold mb-3">From Mumbai Medical College to NHS Leadership</h4>
                  <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
                    <p>
                      Dr. Patel arrived in the UK in 2008 with his medical degree from Mumbai but faced the 
                      reality that qualifications required validation. His PLAB journey took 
                      8 months of dedicated preparation while working part-time jobs to support himself.
                    </p>
                    <p>
                      "The most challenging aspect wasn't the medical knowledge - it was understanding 
                      NHS protocols, communication styles, and cultural nuances," Dr. Patel reflects. 
                      After passing PLAB, he secured his first NHS position as an FY2 equivalent.
                    </p>
                    <p>
                      Today, as a Consultant Cardiologist leading a busy cardiac unit, Dr. Patel has 
                      mentored over 200 doctors. His systematic approach to NHS integration 
                      forms the foundation of NextDoc UK's methodology.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className="text-green-600 border-green-600">PLAB 2009</Badge>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">Consultant 2016</Badge>
                    <Badge variant="outline" className="text-purple-600 border-purple-600">200+ Mentees</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Dr. Priya Sharma Detailed Story */}
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 p-6 bg-muted/30 flex flex-col items-center justify-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-border">
                      <img 
                        src="/lovable-uploads/0c62a90c-c3bd-4245-979a-ebe1a0e8cf1e.png" 
                        alt="Dr. Priya Sharma"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-2">
                    Senior Mentor
                  </Badge>
                  <h3 className="text-xl font-bold text-center">Dr. Priya Sharma</h3>
                  <p className="text-sm text-muted-foreground text-center">Emergency Medicine SpR</p>
                  <Badge variant="outline" className="mt-2">8+ Years NHS</Badge>
                </div>
                <div className="md:col-span-2 p-6">
                  <h4 className="text-lg font-semibold mb-3">From Karachi to Leading Emergency Medicine</h4>
                  <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
                    <p>
                      Dr. Sharma's journey began with her MBBS from Dow University in Karachi. She completed 
                      her PLAB in just 6 months through intensive preparation and arrived in the UK with 
                      clear goals for emergency medicine specialisation.
                    </p>
                    <p>
                      "Emergency medicine in the UK demanded not just clinical skills but rapid cultural 
                      adaptation. Every interaction with patients required understanding of NHS systems, 
                      protocols, and communication standards," she explains.
                    </p>
                    <p>
                      Now a Senior Specialist Registrar, Dr. Sharma leads emergency response teams and 
                      has successfully guided 150+ doctors through their NHS transition, 
                      specialising in high-pressure specialty placements.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className="text-green-600 border-green-600">PLAB 2015</Badge>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">SpR 2019</Badge>
                    <Badge variant="outline" className="text-purple-600 border-purple-600">150+ Mentees</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Dr. Amit Kumar Detailed Story */}
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 p-6 bg-muted/30 flex flex-col items-center justify-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-border">
                      <img 
                        src="/lovable-uploads/0fa2af72-01b3-48c7-9ab5-ac928ccd9f2e.png" 
                        alt="Dr. Amit Kumar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-2">
                    Associate Mentor
                  </Badge>
                  <h3 className="text-xl font-bold text-center">Dr. Amit Kumar</h3>
                  <p className="text-sm text-muted-foreground text-center">General Medicine Registrar</p>
                  <Badge variant="outline" className="mt-2">5+ Years NHS</Badge>
                </div>
                <div className="md:col-span-2 p-6">
                  <h4 className="text-lg font-semibold mb-3">From Dhaka Medical College to NHS General Medicine</h4>
                  <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
                    <p>
                      Dr. Kumar graduated from Dhaka Medical College and completed his PLAB journey in 
                      7 months while maintaining his clinical knowledge current. His systematic approach 
                      to preparation became a model for efficient NHS transition.
                    </p>
                    <p>
                      "General medicine training in the NHS requires comprehensive understanding of multiple 
                      specialties and excellent communication with multidisciplinary teams. The learning 
                      curve was steep but structured preparation made all the difference," he shares.
                    </p>
                    <p>
                      As a General Medicine Registrar, Dr. Kumar has guided 100+ doctors 
                      through foundation and core training programmes, emphasising the importance of 
                      comprehensive preparation and systematic career progression.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className="text-green-600 border-green-600">PLAB 2018</Badge>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">Registrar 2021</Badge>
                    <Badge variant="outline" className="text-purple-600 border-purple-600">100+ Mentees</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
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
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your NHS Journey?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Speak with one of our advisors to learn more about our programs and how we can help you succeed in your NHS career transition.
              </p>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg">
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
      </section>
    </div>
  );
};

export default About;