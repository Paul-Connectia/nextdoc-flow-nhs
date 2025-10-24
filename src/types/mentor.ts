export interface Mentor {
  name: string;
  title: string;
  hospital: string;
  location: string;
  experience: string;
  background: string;
  specialties: string[];
  languages: string[];
  mentees: number;
  badgeLevel: 'associate' | 'senior' | 'principal';
  acceptingMentees: boolean;
  image: string;
  testimonial: string;
}

export interface MentorFilters {
  keyword: string;
  specialties: string[];
  locations: string[];
  languages: string[];
  badgeLevels: ('associate' | 'senior' | 'principal')[];
  availability: 'all' | 'accepting' | 'booked' | 'unavailable';
}
