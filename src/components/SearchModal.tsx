import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
}

const searchData: SearchResult[] = [
  // Products
  { id: '1', title: 'CV Booster', description: 'AI-powered CV enhancement for medical professionals', category: 'Products', path: '/cv-booster' },
  { id: '2', title: 'Gap Map', description: 'Strategic career planning and skills gap analysis', category: 'Products', path: '/gap-map' },
  { id: '3', title: 'Interview Sim', description: 'Medical interview practice and simulation', category: 'Products', path: '/interview-sim' },
  { id: '4', title: 'Sponsor Match', description: 'Find and connect with healthcare sponsors', category: 'Products', path: '/sponsor-match' },
  
  // Exams
  { id: '5', title: 'PLAB Preparation', description: 'Complete PLAB exam preparation resources', category: 'Exams', path: '/exams/plab' },
  { id: '6', title: 'Postgraduate Exams', description: 'Medical postgraduate examination support', category: 'Exams', path: '/exams/postgraduate' },
  
  // Pages
  { id: '7', title: 'About Us', description: 'Learn more about NextDoc UK', category: 'Pages', path: '/about' },
  { id: '8', title: 'Research', description: 'Medical research and publications', category: 'Pages', path: '/research' },
  { id: '9', title: 'Mentors', description: 'Connect with experienced medical mentors', category: 'Pages', path: '/mentors' },
  { id: '10', title: 'Products Overview', description: 'Explore all our medical career tools', category: 'Pages', path: '/products' },
];

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredResults = searchData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    onOpenChange(false);
    setSearchQuery('');
  };

  const groupedResults = filteredResults.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput 
        placeholder="Search products, exams, pages..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {Object.entries(groupedResults).map(([category, results]) => (
          <CommandGroup key={category} heading={category}>
            {results.map((result) => (
              <CommandItem
                key={result.id}
                onSelect={() => handleSelect(result.path)}
                className="flex flex-col items-start gap-1 p-3"
              >
                <div className="flex items-center gap-2 w-full">
                  <Search className="h-4 w-4 opacity-50" />
                  <span className="font-medium">{result.title}</span>
                </div>
                <span className="text-sm text-muted-foreground ml-6">
                  {result.description}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}