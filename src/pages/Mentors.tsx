import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, MapPin, Calendar, Users, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedMentorOnboardingForm from "@/components/EnhancedMentorOnboardingForm";
import { MentorInfoModal } from "@/components/MentorInfoModal";
import { MentorSearchBar } from "@/components/MentorSearchBar";
import { BadgeDisplay } from "@/components/BadgeDisplay";
import { analytics } from "@/lib/analytics";
import { useState, useMemo, useCallback } from "react";
import { Mentor, MentorFilters } from "@/types/mentor";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";

const Mentors = () => {
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);
  const [showMentorInfoModal, setShowMentorInfoModal] = useState(false);
  const [searchFilters, setSearchFilters] = useState<MentorFilters>({
    keyword: '',
    specialties: [],
    locations: [],
    languages: [],
    badgeLevels: [],
    availability: 'all'
  });

  //auth user
  const { user, isLoaded } = useUser()

  const mentors: Mentor[] = [
    {
      name: "Dr. Sarah Johnson",
      title: "Consultant Cardiologist",
      hospital: "Royal London Hospital",
      location: "London",
      experience: "15 years",
      background: "Originally from India, PLAB graduate 2009",
      specialties: ["Cardiology", "Internal Medicine"],
      languages: ["English", "Hindi", "Punjabi", "Bengali"],
      mentees: 47,
      badgeLevel: "principal" as const,
      acceptingMentees: true,
      image: "/api/placeholder/150/150",
      testimonial: "Having walked the same path, I understand the unique challenges international doctors face in the UK."
    },
    {
      name: "Prof. Michael Thompson",
      title: "Consultant Surgeon & Clinical Director",
      hospital: "St. Bartholomew's Hospital",
      location: "London",
      experience: "20 years",
      background: "UK graduate, specialized in IMG mentorship",
      specialties: ["General Surgery", "Leadership & Management"],
      languages: ["English", "Spanish"],
      mentees: 63,
      badgeLevel: "principal" as const,
      acceptingMentees: true,
      image: "/api/placeholder/150/150",
      testimonial: "I'm passionate about helping international colleagues excel in the NHS and reach their full potential."
    },
    {
      name: "Dr. Priya Sharma",
      title: "Consultant Psychiatrist",
      hospital: "Maudsley Hospital",
      location: "South East England",
      experience: "12 years",
      background: "Originally from Nepal, PLAB graduate 2012",
      specialties: ["Psychiatry"],
      languages: ["English", "Hindi", "Urdu", "Gujarati"],
      mentees: 35,
      badgeLevel: "senior" as const,
      acceptingMentees: true,
      image: "/api/placeholder/150/150",
      testimonial: "Mental health support is crucial during career transitions. I help doctors navigate both professional and personal challenges."
    },
    {
      name: "Dr. Ahmed Hassan",
      title: "Consultant Emergency Medicine",
      hospital: "King's College Hospital",
      location: "London",
      experience: "18 years",
      background: "Originally from Egypt, multiple Royal College memberships",
      specialties: ["Emergency Medicine"],
      languages: ["English", "Arabic", "French"],
      mentees: 52,
      badgeLevel: "senior" as const,
      acceptingMentees: false,
      image: "/api/placeholder/150/150",
      testimonial: "Emergency medicine taught me quick decision-making. I apply this to help mentees make strategic career choices."
    },
    {
      name: "Dr. Anjali Desai",
      title: "Consultant Paediatrician",
      hospital: "Great Ormond Street Hospital",
      location: "London",
      experience: "14 years",
      background: "Originally from India, MRCPCH graduate",
      specialties: ["Paediatrics", "Neurology"],
      languages: ["English", "Hindi", "Gujarati", "Tamil"],
      mentees: 41,
      badgeLevel: "senior" as const,
      acceptingMentees: false,
      image: "/api/placeholder/150/150",
      testimonial: "Supporting international doctors in paediatrics has been one of the most rewarding aspects of my career."
    },
    {
      name: "Dr. Omar Khalil",
      title: "Consultant Anaesthetist",
      hospital: "Manchester Royal Infirmary",
      location: "North West England",
      experience: "10 years",
      background: "Originally from Syria, specialised in critical care",
      specialties: ["Anaesthetics", "Internal Medicine"],
      languages: ["English", "Arabic", "Urdu"],
      mentees: 28,
      badgeLevel: "associate" as const,
      acceptingMentees: true,
      image: "/api/placeholder/150/150",
      testimonial: "I help doctors from diverse backgrounds integrate smoothly into NHS critical care settings."
    }
  ];

  // Filter logic with memoization
  const filteredMentors = useMemo(() => {
    let result = mentors;

    // Keyword search
    if (searchFilters.keyword) {
      const lowerKeyword = searchFilters.keyword.toLowerCase();
      result = result.filter(m =>
        m.name.toLowerCase().includes(lowerKeyword) ||
        m.title.toLowerCase().includes(lowerKeyword) ||
        m.hospital.toLowerCase().includes(lowerKeyword) ||
        m.location.toLowerCase().includes(lowerKeyword) ||
        m.specialties.some(s => s.toLowerCase().includes(lowerKeyword))
      );
    }

    // Specialty filter
    if (searchFilters.specialties.length > 0) {
      result = result.filter(m =>
        searchFilters.specialties.some(specialty =>
          m.specialties.includes(specialty)
        )
      );
    }

    // Badge level filter
    if (searchFilters.badgeLevels.length > 0) {
      result = result.filter(m =>
        searchFilters.badgeLevels.includes(m.badgeLevel)
      );
    }

    // Location filter
    if (searchFilters.locations.length > 0) {
      result = result.filter(m =>
        searchFilters.locations.some(loc =>
          m.hospital.toLowerCase().includes(loc.toLowerCase()) ||
          m.location.toLowerCase().includes(loc.toLowerCase())
        )
      );
    }

    // Language filter
    if (searchFilters.languages.length > 0) {
      result = result.filter(m =>
        searchFilters.languages.some(lang =>
          m.languages.includes(lang)
        )
      );
    }

    // Availability filter
    if (searchFilters.availability !== 'all') {
      if (searchFilters.availability === 'accepting') {
        result = result.filter(m => m.acceptingMentees === true);
      } else if (searchFilters.availability === 'booked') {
        // Currently booked - unavailable with high mentee count
        result = result.filter(m => !m.acceptingMentees && m.mentees >= 40);
      } else if (searchFilters.availability === 'unavailable') {
        // On leave - unavailable with lower mentee count
        result = result.filter(m => !m.acceptingMentees && m.mentees < 40);
      }
    }

    return result;
  }, [searchFilters, mentors]);

  const handleSearchFilter = useCallback((filters: MentorFilters) => {
    setSearchFilters(filters);

    // Analytics
    analytics.track('mentor_search_performed', {
      keyword: filters.keyword,
      hasFilters: filters.specialties.length > 0 || filters.locations.length > 0 ||
        filters.languages.length > 0 || filters.badgeLevels.length > 0 ||
        filters.availability !== 'all',
      resultsCount: filteredMentors.length
    });
  }, [filteredMentors.length]);

  const testimonials = [
    {
      content: "Dr. Johnson's mentorship was instrumental in my PLAB success. Her practical advice and emotional support made all the difference during my transition to the NHS.",
      author: "Dr. Raj Patel",
      position: "F2 Doctor, University College London Hospitals"
    },
    {
      content: "Professor Thompson helped me navigate the complex NHS structure and secure my ST1 position in surgery. His insights into leadership were invaluable.",
      author: "Dr. Maria Santos",
      position: "ST2 General Surgery, Chelsea and Westminster Hospital"
    },
    {
      content: "Dr. Sharma's guidance went beyond medical training. She helped me maintain work-life balance and build confidence in my new environment.",
      author: "Dr. James Chen",
      position: "CT1 Psychiatry, South London and Maudsley NHS Trust"
    }
  ];

  const programFeatures = [
    {
      title: "Personalised Matching",
      description: "Matched with mentors based on specialty, background, and career goals"
    },
    {
      title: "Regular Sessions",
      description: "Monthly one-on-one sessions with flexible scheduling"
    },
    {
      title: "Career Guidance",
      description: "Strategic advice on specialty training applications and career progression"
    },
    {
      title: "Network Access",
      description: "Introduction to professional networks and NHS contacts"
    },
    {
      title: "Ongoing Support",
      description: "Support continues beyond initial placement for long-term success"
    },
    {
      title: "Peer Community",
      description: "Access to mentee community for peer support and networking"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mentor Insights & Guidance
            </h1>
            <p className="text-xl leading-relaxed opacity-90 mb-8">
              Connect with experienced NHS consultants and medical professionals
              who have successfully navigated the UK healthcare system.
            </p>
          </div>

          {/* Search Bar + CTA */}
          <div className="mt-8">
            <div className="flex flex-col md:flex-row gap-4 items-start max-w-5xl mx-auto">
              {/* 70% width on desktop */}
              <div className="w-full md:w-[70%]">
                <MentorSearchBar
                  onSearch={handleSearchFilter}
                  totalMentors={mentors.length}
                  filteredCount={filteredMentors.length}
                />
              </div>

              {/* 30% width on desktop */}
              <div className="w-full md:w-[30%]">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full h-12"
                  onClick={() => {
                    if (isLoaded && user) {
                      setShowOnboardingForm(true)
                    } else {
                      toast.error("Please login to continue...")
                    }
                  }
                  }
                >
                  Become a Mentor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mentors */}
      <section id="mentor-cards" className="py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Expert Mentors</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn from experienced professionals who have successfully transitioned to the NHS
              and are passionate about supporting the next generation
            </p>
          </div>

          {filteredMentors.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                No mentors match your search criteria
              </p>
              <Button
                variant="outline"
                onClick={() => setSearchFilters({
                  keyword: '',
                  specialties: [],
                  locations: [],
                  languages: [],
                  badgeLevels: [],
                  availability: 'all'
                })}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredMentors.map((mentor, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={mentor.image} alt={mentor.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        {/* Badge Display */}
                        <div className="mb-2">
                          <BadgeDisplay level={mentor.badgeLevel} showTooltip />
                        </div>

                        <CardTitle className="text-xl">{mentor.name}</CardTitle>
                        <p className="text-muted-foreground font-medium">{mentor.title}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{mentor.hospital}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-2">
                          <Users className="h-4 w-4" />
                          <span>{mentor.mentees} mentees</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Background</p>
                        <p className="text-sm">{mentor.background}</p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Specialties</p>
                        <div className="flex flex-wrap gap-2">
                          {mentor.specialties.map((specialty, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Languages</p>
                        <div className="flex flex-wrap gap-2">
                          {mentor.languages.map((language, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-muted/50 p-3 rounded-lg">
                        <Quote className="h-4 w-4 text-muted-foreground mb-2" />
                        <p className="text-sm italic">{mentor.testimonial}</p>
                      </div>

                      <Button
                        className="w-full focus-visible:ring-2 focus-visible:ring-ring"
                        disabled={!mentor.acceptingMentees}
                      >
                        {mentor.acceptingMentees ? (
                          <>
                            Connect with {mentor.name.split(' ')[1]}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        ) : (
                          "Currently Unavailable"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Mentorship Program Features */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mentorship Program Features</h2>
            <p className="text-muted-foreground">
              Comprehensive support designed to accelerate your NHS career success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programFeatures.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground">
              Hear from international doctors who have achieved their NHS career goals through mentorship
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <Quote className="h-6 w-6 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Mentor */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Become a Mentor</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Share your expertise and help shape the next generation of medical professionals in the NHS.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Make an Impact</h3>
                  <p className="text-sm text-muted-foreground">Guide career decisions and professional development</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Flexible Commitment</h3>
                  <p className="text-sm text-muted-foreground">Monthly sessions that fit your schedule</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Personal Growth</h3>
                  <p className="text-sm text-muted-foreground">Develop leadership and teaching skills</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <Button
                size="lg"
                className="w-full"
                onClick={() => setShowOnboardingForm(true)}
              >
                Apply to Mentor
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => {
                  setShowMentorInfoModal(true);
                  analytics.track('mentor_learn_more_clicked');
                }}
              >
                Learn More About Mentoring
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Connect with a Mentor?</h2>
          <p className="text-xl opacity-90 mb-8">
            Take the next step in your NHS career journey with expert guidance and support.
          </p>
          <div className="max-w-md mx-auto">
            <Button size="lg" variant="secondary" className="w-full" asChild>
              <Link to="/get-started">
                Get Matched Today
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mentor Onboarding Form Modal */}
      {showOnboardingForm && (
        <EnhancedMentorOnboardingForm
          isOpen={showOnboardingForm}
          onClose={() => setShowOnboardingForm(false)}
        />
      )}

      {/* Mentor Info Modal */}
      <MentorInfoModal
        isOpen={showMentorInfoModal}
        onClose={() => setShowMentorInfoModal(false)}
        onApply={() => {
          setShowMentorInfoModal(false);
          setShowOnboardingForm(true);
        }}
      />
      <Footer />
    </div>
  );
};

export default Mentors;