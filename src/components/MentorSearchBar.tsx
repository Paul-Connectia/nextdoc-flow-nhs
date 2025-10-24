import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, ChevronDown, X, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { MentorFilters } from "@/types/mentor";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface MentorSearchBarProps {
  onSearch: (filters: MentorFilters) => void;
  totalMentors: number;
  filteredCount: number;
}

const filterOptions = {
  specialties: [
    "Academic / Research",
    "Anaesthetics",
    "Cardiology",
    "Dermatology",
    "Emergency Medicine",
    "Endocrinology & Diabetes",
    "ENT (Otolaryngology)",
    "Gastroenterology",
    "General Practice (GP)",
    "General Surgery",
    "Health and Social Care",
    "Hospital Management",
    "Internal Medicine",
    "Leadership & Management",
    "Nephrology",
    "Neurology",
    "Obstetrics & Gynaecology",
    "Oncology",
    "Ophthalmology",
    "Orthopaedics",
    "Paediatrics",
    "Pathology",
    "Psychiatry",
    "Public Health",
    "Radiology",
    "Respiratory Medicine",
    "Urology"
  ],
  locations: [
    "London",
    "Midlands",
    "North East England",
    "North West England",
    "Northern Ireland",
    "Remote / Virtual",
    "Scotland",
    "South East England",
    "South West England",
    "Wales"
  ],
  languages: [
    "Arabic",
    "Bengali",
    "English",
    "Filipino",
    "French",
    "Gujarati",
    "Hindi",
    "Kannada",
    "Malayalam",
    "Mandarin",
    "Other",
    "Punjabi",
    "Spanish",
    "Swahili",
    "Tamil",
    "Telugu",
    "Tulu",
    "Urdu"
  ],
  badgeLevels: [
    { value: 'associate' as const, label: '🩵 Associate' },
    { value: 'senior' as const, label: '💙 Senior' },
    { value: 'principal' as const, label: '🟡 Principal' }
  ]
};

export const MentorSearchBar = ({ onSearch, totalMentors, filteredCount }: MentorSearchBarProps) => {
  const [keyword, setKeyword] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedBadgeLevels, setSelectedBadgeLevels] = useState<('associate' | 'senior' | 'principal')[]>([]);
  const [availability, setAvailability] = useState<'all' | 'accepting' | 'booked' | 'unavailable'>('all');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch({
        keyword,
        specialties: selectedSpecialties,
        locations: selectedLocations,
        languages: selectedLanguages,
        badgeLevels: selectedBadgeLevels,
        availability
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword, selectedSpecialties, selectedLocations, selectedLanguages, selectedBadgeLevels, availability, onSearch]);

  const clearAllFilters = () => {
    setKeyword("");
    setSelectedSpecialties([]);
    setSelectedLocations([]);
    setSelectedLanguages([]);
    setSelectedBadgeLevels([]);
    setAvailability('all');
  };

  const hasActiveFilters = keyword || selectedSpecialties.length > 0 || selectedLocations.length > 0 || 
                          selectedLanguages.length > 0 || selectedBadgeLevels.length > 0 || availability !== 'all';

  const removeFilter = (type: string, value: string) => {
    switch (type) {
      case 'specialty':
        setSelectedSpecialties(prev => prev.filter(s => s !== value));
        break;
      case 'location':
        setSelectedLocations(prev => prev.filter(l => l !== value));
        break;
      case 'language':
        setSelectedLanguages(prev => prev.filter(l => l !== value));
        break;
      case 'badge':
        setSelectedBadgeLevels(prev => prev.filter(b => b !== value));
        break;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          className="pl-12 pr-4 h-12 text-base"
          placeholder="Search mentors by name, specialty, or hospital..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          aria-label="Search mentors by name, specialty, or hospital"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Filter mentors by department, specialty, or hospital to find the right match.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2 sm:gap-3 items-center min-h-[40px]">
        {/* Specialty Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-auto px-3 py-2 font-normal rounded-full bg-white/90 text-primary border-transparent hover:bg-white hover:shadow-md transition-all",
                selectedSpecialties.length > 0 && "bg-white shadow-sm font-medium"
              )}
              aria-label="Filter by specialty"
            >
              Specialty {selectedSpecialties.length > 0 && `(${selectedSpecialties.length})`}
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-background border shadow-lg z-50">
            <div className="space-y-2">
              <p className="text-sm font-semibold mb-2">Select Specialties</p>
              <ScrollArea className="h-64">
                {filterOptions.specialties.map((specialty) => (
                  <div key={specialty} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`specialty-${specialty}`}
                      checked={selectedSpecialties.includes(specialty)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedSpecialties([...selectedSpecialties, specialty]);
                        } else {
                          setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
                        }
                      }}
                    />
                    <label
                      htmlFor={`specialty-${specialty}`}
                      className="text-sm cursor-pointer"
                    >
                      {specialty}
                    </label>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </PopoverContent>
        </Popover>

        {/* Location Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-auto px-3 py-2 font-normal rounded-full bg-white/90 text-primary border-transparent hover:bg-white hover:shadow-md transition-all",
                selectedLocations.length > 0 && "bg-white shadow-sm font-medium"
              )}
              aria-label="Filter by location"
            >
              Location {selectedLocations.length > 0 && `(${selectedLocations.length})`}
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-background border shadow-lg z-50">
            <div className="space-y-2">
              <p className="text-sm font-semibold mb-2">Select Locations</p>
              {filterOptions.locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location}`}
                    checked={selectedLocations.includes(location)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedLocations([...selectedLocations, location]);
                      } else {
                        setSelectedLocations(selectedLocations.filter(l => l !== location));
                      }
                    }}
                  />
                  <label
                    htmlFor={`location-${location}`}
                    className="text-sm cursor-pointer"
                  >
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Language Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-auto px-3 py-2 font-normal rounded-full bg-white/90 text-primary border-transparent hover:bg-white hover:shadow-md transition-all",
                selectedLanguages.length > 0 && "bg-white shadow-sm font-medium"
              )}
              aria-label="Filter by language"
            >
              Language {selectedLanguages.length > 0 && `(${selectedLanguages.length})`}
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-background border shadow-lg z-50">
            <div className="space-y-2">
              <p className="text-sm font-semibold mb-2">Select Languages</p>
              {filterOptions.languages.map((language) => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox
                    id={`language-${language}`}
                    checked={selectedLanguages.includes(language)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedLanguages([...selectedLanguages, language]);
                      } else {
                        setSelectedLanguages(selectedLanguages.filter(l => l !== language));
                      }
                    }}
                  />
                  <label
                    htmlFor={`language-${language}`}
                    className="text-sm cursor-pointer"
                  >
                    {language}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Badge Level Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-auto px-3 py-2 font-normal rounded-full bg-white/90 text-primary border-transparent hover:bg-white hover:shadow-md transition-all",
                selectedBadgeLevels.length > 0 && "bg-white shadow-sm font-medium"
              )}
              aria-label="Filter by badge level"
            >
              Badge Level {selectedBadgeLevels.length > 0 && `(${selectedBadgeLevels.length})`}
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-background border shadow-lg z-50">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">Select Badge Levels</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p className="text-xs">Badge levels reflect verified NHS experience and mentoring contribution.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {filterOptions.badgeLevels.map((badge) => (
                <div key={badge.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`badge-${badge.value}`}
                    checked={selectedBadgeLevels.includes(badge.value as 'associate' | 'senior' | 'principal')}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedBadgeLevels([...selectedBadgeLevels, badge.value as 'associate' | 'senior' | 'principal']);
                      } else {
                        setSelectedBadgeLevels(selectedBadgeLevels.filter(b => b !== badge.value));
                      }
                    }}
                  />
                  <label
                    htmlFor={`badge-${badge.value}`}
                    className="text-sm cursor-pointer"
                  >
                    {badge.label}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Availability Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-auto px-3 py-2 font-normal rounded-full bg-white/90 text-primary border-transparent hover:bg-white hover:shadow-md transition-all",
                availability !== 'all' && "bg-white shadow-sm font-medium"
              )}
              aria-label="Filter by availability"
            >
              Availability
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-background border shadow-lg z-50">
            <div className="space-y-3">
              <p className="text-sm font-semibold mb-2">Availability Status</p>
              {[
                { value: 'all' as const, label: '🔵 All Mentors', description: 'Show everyone' },
                { value: 'accepting' as const, label: '🟢 Accepting New Mentees', description: 'Currently available' },
                { value: 'booked' as const, label: '🟡 Currently Booked', description: 'Temporarily full' },
                { value: 'unavailable' as const, label: '⚫ On Leave', description: 'Temporarily unavailable' }
              ].map((option) => (
                <div key={option.value} className="flex items-start space-x-2">
                  <Checkbox
                    id={`availability-${option.value}`}
                    checked={availability === option.value}
                    onCheckedChange={(checked) => {
                      if (checked) setAvailability(option.value);
                    }}
                  />
                  <label
                    htmlFor={`availability-${option.value}`}
                    className="text-sm cursor-pointer leading-tight flex-1"
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Results Counter */}
        <div className="ml-auto text-sm text-white/90 whitespace-nowrap">
          Showing <span className="font-semibold text-white">{filteredCount}</span> of {totalMentors} mentors
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {selectedSpecialties.map(specialty => (
            <Badge key={specialty} variant="secondary" className="text-xs">
              {specialty}
              <X 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('specialty', specialty)}
              />
            </Badge>
          ))}
          {selectedLocations.map(location => (
            <Badge key={location} variant="secondary" className="text-xs">
              {location}
              <X 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('location', location)}
              />
            </Badge>
          ))}
          {selectedLanguages.map(language => (
            <Badge key={language} variant="secondary" className="text-xs">
              {language}
              <X 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('language', language)}
              />
            </Badge>
          ))}
          {selectedBadgeLevels.map(badge => (
            <Badge key={badge} variant="secondary" className="text-xs">
              {badge}
              <X 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter('badge', badge)}
              />
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 text-xs"
            onClick={clearAllFilters}
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};
