import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MentorProfileModal } from "./MentorProfileModal";

interface Mentor {
  id: string;
  name: string;
  title: string;
  experience: string;
  mentees: string;
  image: string;
  badgeText: string;
  badgeColor: string;
}

const mentorGroups: Mentor[][] = [
  // Group 1: Principal, Senior, Associate (original mentors)
  [
    {
      id: "1",
      name: "Dr. Arjun Patel",
      title: "Consultant Cardiologist",
      experience: "15+ years NHS",
      mentees: "200+ mentees",
      image: "/lovable-uploads/b6836844-792f-482a-9748-bae7dd6d7f75.png",
      badgeText: "Principal",
      badgeColor: "bg-gradient-to-r from-amber-500 to-yellow-600"
    },
    {
      id: "2",
      name: "Dr. Priya Sharma",
      title: "Emergency Medicine SpR",
      experience: "8+ years NHS",
      mentees: "150+ mentees",
      image: "/lovable-uploads/a297de4a-314b-412c-9a60-948c549091f7.png",
      badgeText: "Senior",
      badgeColor: "bg-gradient-to-r from-teal-500 to-cyan-600"
    },
    {
      id: "3",
      name: "Dr. Amit Kumar",
      title: "General Medicine Registrar",
      experience: "5+ years NHS",
      mentees: "100+ mentees",
      image: "/lovable-uploads/f8e4e623-b303-4d34-9c7a-8a6a61ca5978.png",
      badgeText: "Associate",
      badgeColor: "bg-gradient-to-r from-blue-500 to-indigo-600"
    }
  ],
  // Group 2: Additional mentors using new faces
  [
    {
      id: "4",
      name: "Dr. Sarah Thompson",
      title: "Consultant Psychiatrist",
      experience: "12+ years NHS",
      mentees: "180+ mentees",
      image: "/lovable-uploads/185b9ce3-25f5-43d9-81fb-a162a176b016.png",
      badgeText: "Principal",
      badgeColor: "bg-gradient-to-r from-amber-500 to-yellow-600"
    },
    {
      id: "5",
      name: "Dr. Michael Chen",
      title: "Surgical Registrar",
      experience: "7+ years NHS",
      mentees: "120+ mentees",
      image: "/lovable-uploads/035a90d1-8307-4849-b5fb-661447056e16.png",
      badgeText: "Senior",
      badgeColor: "bg-gradient-to-r from-teal-500 to-cyan-600"
    },
    {
      id: "6",
      name: "Dr. Emily Roberts",
      title: "Paediatric Registrar",
      experience: "6+ years NHS",
      mentees: "90+ mentees",
      image: "/lovable-uploads/46b7e0f8-e7fd-4306-8167-d85cf26bcf5a.png",
      badgeText: "Associate",
      badgeColor: "bg-gradient-to-r from-blue-500 to-indigo-600"
    }
  ],
  // Group 3: More mentors rotating the faces
  [
    {
      id: "7",
      name: "Dr. James Wilson",
      title: "Consultant Radiologist",
      experience: "14+ years NHS",
      mentees: "160+ mentees",
      image: "/lovable-uploads/aeff223a-399c-499c-ab5e-6c16de65a989.png",
      badgeText: "Principal",
      badgeColor: "bg-gradient-to-r from-amber-500 to-yellow-600"
    },
    {
      id: "8",
      name: "Dr. Lisa Anderson",
      title: "Anaesthetic Registrar",
      experience: "9+ years NHS",
      mentees: "140+ mentees",
      image: "/lovable-uploads/740745cb-2414-44b1-a330-651eb1e224cd.png",
      badgeText: "Senior",
      badgeColor: "bg-gradient-to-r from-teal-500 to-cyan-600"
    },
    {
      id: "9",
      name: "Dr. David Martinez",
      title: "Orthopaedic Registrar",
      experience: "4+ years NHS",
      mentees: "80+ mentees",
      image: "/lovable-uploads/883f189e-b7f7-4461-b390-a1578c6270a1.png",
      badgeText: "Associate",
      badgeColor: "bg-gradient-to-r from-blue-500 to-indigo-600"
    }
  ]
];

export const RotatingMentorDisplay = () => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleMentorClick = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGroupIndex((prev) => (prev + 1) % mentorGroups.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentGroup = mentorGroups[currentGroupIndex];

  return (
    <div className="lg:max-w-md">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2 text-white">Meet Our NHS Mentors</h3>
        <p className="text-primary-foreground/80 text-sm">
          Learn from experienced NHS professionals
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {currentGroup.map((mentor, index) => (
          <Card 
            key={`${mentor.id}-${currentGroupIndex}`}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-primary-foreground animate-fade-in cursor-pointer hover:bg-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            style={{
              animationDelay: `${index * 100}ms`
            }}
            onClick={() => handleMentorClick(mentor)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400/30">
                    <img 
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Badge className={`absolute -bottom-1 -right-1 ${mentor.badgeColor} text-white border-0 text-xs px-2 py-0.5`}>
                    {mentor.badgeText}
                  </Badge>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{mentor.name}</h4>
                  <p className="text-xs text-primary-foreground/80">{mentor.title}</p>
                  <p className="text-xs text-primary-foreground/70 mt-1">{mentor.experience} • {mentor.mentees}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center space-x-2 mb-8">
        {mentorGroups.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentGroupIndex 
                ? 'bg-primary-foreground' 
                : 'bg-primary-foreground/30'
            }`}
          />
        ))}
      </div>

      {/* Action buttons */}
      <div className="space-y-3">
        <Button 
          onClick={() => navigate('/mentors')}
          className="w-full bg-white text-primary hover:bg-white/90 font-semibold"
        >
          Get Mentored
        </Button>
        <Button 
          onClick={() => navigate('/mentors')}
          variant="outline" 
          className="w-full border-white/30 text-blue-500 hover:bg-white/10 hover:text-blue-400"
        >
          Become a Mentor
        </Button>
      </div>

      <MentorProfileModal 
        mentor={selectedMentor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
