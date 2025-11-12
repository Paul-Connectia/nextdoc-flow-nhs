import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FileText, Download, ExternalLink, Calendar, Lock, Bell } from "lucide-react";
import { LabsWaitlistForm } from "@/components/LabsWaitlistForm";
import { SEOHead } from "@/components/SEOHead";
import { analytics } from "@/lib/analytics";
import Navigation from "@/components/Navigation";

const Research = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const whitepapers = [
    {
      title: "International Medical Graduate Integration in NHS: A 5-Year Analysis",
      authors: "Dr. Sarah Johnson, Prof. Michael Thompson, Dr. Raj Patel",
      date: "March 2024",
      category: "Healthcare Policy",
      summary: "Comprehensive analysis of IMG integration patterns, success factors, and recommendations for improving transition processes.",
      downloadCount: "2,847",
      featured: true
    },
    {
      title: "AI-Enhanced Medical Education: Transforming PLAB Preparation",
      authors: "Dr. Emily Chen, Dr. Alexander Wright",
      date: "January 2024", 
      category: "Medical Education",
      summary: "Research on the effectiveness of AI-powered learning platforms in improving PLAB examination success rates.",
      downloadCount: "1,923",
      featured: true
    },
    {
      title: "Mentorship Models in International Medical Career Development",
      authors: "Prof. David Cameron, Dr. Priya Sharma",
      date: "November 2023",
      category: "Career Development",
      summary: "Evidence-based analysis of mentorship program effectiveness in IMG career progression within NHS trusts.",
      downloadCount: "1,456",
      featured: false
    },
    {
      title: "Cultural Competency Training for International Healthcare Professionals",
      authors: "Dr. Hassan Al-Mahmoud, Dr. Maria Rodriguez",
      date: "September 2023",
      category: "Cultural Integration",
      summary: "Framework for developing cultural competency among international medical graduates entering UK healthcare.",
      downloadCount: "987",
      featured: false
    }
  ];

  const researchAreas = [
    {
      title: "Medical Education Technology",
      description: "Investigating AI and VR applications in medical training and assessment",
      icon: "🔬"
    },
    {
      title: "Healthcare Integration",
      description: "Studying best practices for international healthcare professional integration",
      icon: "🌍"
    },
    {
      title: "Assessment Methods",
      description: "Developing improved evaluation techniques for medical competency",
      icon: "📊"
    },
    {
      title: "Career Pathways",
      description: "Mapping optimal career progression routes for international medical graduates",
      icon: "🎯"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="NextDoc Labs — Research & White Papers by NextDoc Global"
        description="Open-access white papers and practical research on NHS workforce, IMG integration, medical education, and responsible AI."
        canonicalUrl="https://nextdocuk.com/labs"
      />
      <Navigation/>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NextDoc Labs
            </h1>
            <p className="text-xl leading-relaxed opacity-90 mb-3">
              Evidence-led white papers and practical frameworks on NHS workforce, 
              medical education, and health & social care.
            </p>
            <p className="text-sm opacity-75 italic">
              The research arm of NextDoc Global.
            </p>
          </div>
        </div>
      </section>

      {/* What is NextDoc Labs */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">What is NextDoc Labs?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                NextDoc Labs publishes white papers, working papers, and methods notes focused on 
                NHS workforce integration, IMG pathways, medical education, and responsible AI. 
                We follow COPE/ICMJE guidance and EQUATOR reporting standards, aiming for BMJ-level 
                rigor with service-design practicality.
              </p>
              <p className="font-medium text-foreground">
                Coming soon: author submissions, peer review, and a reviewer registry.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
{/* 
      {/* Featured Research */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">NextDoc Labs White Papers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our latest publications advancing international medical education and NHS integration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {whitepapers.filter(paper => paper.featured).map((paper, index) => (
              <Card key={index} className="border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge className="mb-2">{paper.category}</Badge>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Download className="h-4 w-4" />
                      <span>{paper.downloadCount}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight">{paper.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{paper.authors}</p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {paper.date}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{paper.summary}</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Abstract
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> 
      * All Research Papers 
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Research Publications</h2>
          
          <div className="space-y-6">
            {whitepapers.map((paper, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <Badge variant={paper.featured ? "default" : "outline"}>
                          {paper.category}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Download className="h-4 w-4" />
                          <span>{paper.downloadCount} downloads</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{paper.title}</h3>
                      <p className="text-muted-foreground mb-2">{paper.summary}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{paper.authors}</span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {paper.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0 md:ml-6">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> 

      {/* Research Areas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Research Focus Areas</h2>
            <p className="text-muted-foreground">
              We conduct research across multiple domains to advance international medical education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchAreas.map((area, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <CardTitle className="text-lg">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Our work aligns with NHS guidance, NICE, BNF, ICMJE, COPE, and EQUATOR 
            (CONSORT, STROBE, PRISMA, SQUIRE).
          </p>
        </div>
      </section>

      {/* Preview Cards */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <FileText className="h-8 w-8 text-primary" />
                  <CardTitle>Author Guidelines (Preview)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  2-page overview: what we accept, reporting standards, licensing, conflicts.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  disabled
                  onClick={() => analytics.track("pdf_download", { document: "author_guidelines" })}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Preview (Coming Soon)
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <FileText className="h-8 w-8 text-primary" />
                  <CardTitle>Editorial & Ethics (Preview)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  COPE/ICMJE alignment, plagiarism screening, data availability.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  disabled
                  onClick={() => analytics.track("pdf_download", { document: "editorial_ethics" })}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Preview (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Contribute to Our Research</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join our research community and help shape the future of international medical education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="px-8"
                  disabled
                  aria-disabled="true"
                  onClick={() => analytics.track("cta_participate_comingsoon_click")}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Participate in Research — Coming soon
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Launching soon. Join the early access list to get notified.</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="px-8"
                  disabled
                  aria-disabled="true"
                  onClick={() => analytics.track("cta_submit_comingsoon_click")}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Submit Research Proposal — Coming soon
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Launching soon. Join the early access list to get notified.</p>
              </TooltipContent>
            </Tooltip>

            <Dialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="px-8">
                  <Bell className="h-4 w-4 mr-2" />
                  Join the Early Access List
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <LabsWaitlistForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Research;