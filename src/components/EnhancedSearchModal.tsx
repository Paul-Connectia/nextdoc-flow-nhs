import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  FileText, 
  GraduationCap, 
  Users, 
  BookOpen,
  Stethoscope,
  Building,
  Globe,
  CreditCard,
  UserPlus,
  Calendar
} from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const searchData: SearchResult[] = [
  // Products & Services
  {
    id: "cv-booster",
    title: "CVBooster™",
    description: "AI-powered NHS CV builder with mentor review",
    category: "Products",
    path: "/cv-booster",
    icon: <FileText className="h-4 w-4" />,
    badge: "Popular"
  },
  {
    id: "interviewsim",
    title: "InterviewSim™", 
    description: "AI interview simulator with NHS scenarios",
    category: "Products",
    path: "/interview-sim",
    icon: <Users className="h-4 w-4" />
  },
  {
    id: "gapmap",
    title: "GapMap™",
    description: "NHS career pathway visualization tool",
    category: "Products", 
    path: "/gap-map",
    icon: <Globe className="h-4 w-4" />
  },
  {
    id: "sponsormatch",
    title: "SponsorMatch™",
    description: "NHS trust and sponsorship matcher",
    category: "Products",
    path: "/sponsor-match", 
    icon: <Building className="h-4 w-4" />
  },
  {
    id: "plab-qbank",
    title: "PLAB Quiz Bank",
    description: "2,000+ MLA-aligned questions with AI explanations",
    category: "Products",
    path: "/exams/plab",
    icon: <GraduationCap className="h-4 w-4" />,
    badge: "Free Access"
  },
  {
    id: "english-proficiency",
    title: "English Proficiency Suite",
    description: "IELTS/OET preparation tools",
    category: "Products",
    path: "/exams/ielts-oet",
    icon: <BookOpen className="h-4 w-4" />
  },
  {
    id: "reading-assistant",
    title: "Reading Assistant",
    description: "AI-powered reading comprehension for medical texts",
    category: "English Tools",
    path: "/english/reading-assistant",
    icon: <BookOpen className="h-4 w-4" />
  },
  {
    id: "speech-sim",
    title: "Speech Simulator",
    description: "Practice speaking for IELTS/OET",
    category: "English Tools",
    path: "/english/speech-sim",
    icon: <Users className="h-4 w-4" />
  },
  {
    id: "writer-pro",
    title: "Writer Pro",
    description: "Medical writing enhancement tool",
    category: "English Tools",
    path: "/english/writer-pro",
    icon: <FileText className="h-4 w-4" />
  },
  {
    id: "transcript-analyzer",
    title: "Transcript Analyzer",
    description: "Analyze and improve medical communication",
    category: "English Tools",
    path: "/english/transcript-analyzer",
    icon: <FileText className="h-4 w-4" />
  },

  // Exams
  {
    id: "plab",
    title: "PLAB Exam Suite",
    description: "Complete PLAB 1 & 2 preparation with AI feedback",
    category: "Exams",
    path: "/exams/plab",
    icon: <GraduationCap className="h-4 w-4" />,
    badge: "Free Access"
  },
  {
    id: "mrcp",
    title: "MRCP Preparation",
    description: "Membership of the Royal College of Physicians",
    category: "Exams", 
    path: "/exams/mrcp",
    icon: <Stethoscope className="h-4 w-4" />
  },
  {
    id: "mrcs",
    title: "MRCS Preparation",
    description: "Membership of the Royal College of Surgeons",
    category: "Exams",
    path: "/exams/mrcs",
    icon: <Stethoscope className="h-4 w-4" />
  },
  {
    id: "mrcog",
    title: "MRCOG Preparation", 
    description: "Royal College of Obstetricians and Gynaecologists",
    category: "Exams",
    path: "/exams/mrcog",
    icon: <Stethoscope className="h-4 w-4" />
  },
  {
    id: "mrcpch",
    title: "MRCPCH Preparation",
    description: "Membership of the Royal College of Paediatrics",
    category: "Exams",
    path: "/exams/mrcpch",
    icon: <Stethoscope className="h-4 w-4" />
  },
  {
    id: "mrcpsych",
    title: "MRCPsych Preparation",
    description: "Royal College of Psychiatrists membership",
    category: "Exams",
    path: "/exams/mrcpsych",
    icon: <Stethoscope className="h-4 w-4" />
  },
  {
    id: "mrcgp",
    title: "MRCGP Preparation",
    description: "Membership of the Royal College of General Practitioners",
    category: "Exams",
    path: "/exams/mrcgp",
    icon: <Stethoscope className="h-4 w-4" />
  },
  {
    id: "mrcem",
    title: "MRCEM Preparation",
    description: "Emergency Medicine membership exam",
    category: "Exams",
    path: "/exams/mrcem",
    icon: <Stethoscope className="h-4 w-4" />
  },
  {
    id: "frca",
    title: "FRCA Preparation",
    description: "Fellowship of the Royal College of Anaesthetists",
    category: "Exams",
    path: "/exams/frca",
    icon: <Stethoscope className="h-4 w-4" />
  },
  {
    id: "frcr",
    title: "FRCR Preparation",
    description: "Fellowship of the Royal College of Radiologists",
    category: "Exams",
    path: "/exams/frcr",
    icon: <Stethoscope className="h-4 w-4" />
  },
  {
    id: "frcpath",
    title: "FRCPath Preparation",
    description: "Fellowship of the Royal College of Pathologists",
    category: "Exams",
    path: "/exams/frcpath",
    icon: <Stethoscope className="h-4 w-4" />
  },
  {
    id: "frcophth",
    title: "FRCOphth Preparation",
    description: "Fellowship of the Royal College of Ophthalmologists",
    category: "Exams",
    path: "/exams/frcophth",
    icon: <Stethoscope className="h-4 w-4" />
  },
  {
    id: "ielts-oet",
    title: "IELTS & OET",
    description: "English proficiency exam preparation",
    category: "Exams",
    path: "/exams/ielts-oet",
    icon: <Globe className="h-4 w-4" />
  },
  {
    id: "royal-college",
    title: "Royal College Exams",
    description: "Browse all UK Royal College examinations",
    category: "Exams",
    path: "/exams/royal-college",
    icon: <GraduationCap className="h-4 w-4" />
  },

  // Services
  {
    id: "mentors",
    title: "Expert Mentors",
    description: "1:1 mentorship with NHS consultants",
    category: "Services",
    path: "/mentors",
    icon: <Users className="h-4 w-4" />
  },
  {
    id: "consultation",
    title: "Career Consultation", 
    description: "Book consultation with NHS experts",
    category: "Services",
    path: "/consultation",
    icon: <Calendar className="h-4 w-4" />
  },
  {
    id: "study-materials",
    title: "Study Materials",
    description: "Comprehensive NHS exam resources",
    category: "Services", 
    path: "/study-materials",
    icon: <BookOpen className="h-4 w-4" />
  },

  // White Papers & Research
  {
    id: "research",
    title: "White Paper / R&D",
    description: "Research publications and white papers",
    category: "Research",
    path: "/research", 
    icon: <FileText className="h-4 w-4" />
  },
  {
    id: "whitepaper-1", 
    title: "White Paper 1",
    description: "Coming soon - NHS transition research",
    category: "Research",
    path: "/research#whitepaper-1",
    icon: <FileText className="h-4 w-4" />,
    badge: "Coming Soon"
  },
  {
    id: "whitepaper-2",
    title: "White Paper 2", 
    description: "Coming soon - AI in medical education",
    category: "Research", 
    path: "/research#whitepaper-2",
    icon: <FileText className="h-4 w-4" />,
    badge: "Coming Soon"
  },

  // Pages
  {
    id: "pricing",
    title: "Subscription Plans",
    description: "Choose your learning plan",
    category: "Pages",
    path: "/pricing",
    icon: <CreditCard className="h-4 w-4" />
  },
  {
    id: "get-started", 
    title: "Get Started",
    description: "Begin your NHS journey today",
    category: "Pages",
    path: "/get-started",
    icon: <UserPlus className="h-4 w-4" />,
    badge: "Start Here"
  },
  {
    id: "about",
    title: "About Us",
    description: "Learn about NextDoc UK's mission",
    category: "Pages",
    path: "/about",
    icon: <Users className="h-4 w-4" />
  }
];

const EnhancedSearchModal: React.FC<SearchModalProps> = ({ open, onOpenChange }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredResults = searchData.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Group results by category
  const groupedResults = filteredResults.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const handleSelect = (path: string) => {
    navigate(path);
    onOpenChange(false);
    setQuery("");
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput 
        placeholder="Search products, exams, services..." 
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[400px]">
        <CommandEmpty>
          <div className="text-center py-6">
            <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No results found for "{query}"</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try searching for products, exams, or services
            </p>
          </div>
        </CommandEmpty>
        
        {Object.entries(groupedResults).map(([category, items]) => (
          <CommandGroup key={category} heading={category}>
            {items.map((item) => (
              <CommandItem
                key={item.id}
                value={`${item.title} ${item.description} ${item.category}`}
                onSelect={() => handleSelect(item.path)}
                className="flex items-center gap-3 px-4 py-3"
              >
                <div className="flex items-center gap-3 flex-1">
                  {item.icon}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
};

export { EnhancedSearchModal };