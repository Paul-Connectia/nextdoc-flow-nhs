import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X, Search, Instagram, MessageCircle, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { CartIcon } from "@/components/Cart";
import { EnhancedSearchModal } from "@/components/EnhancedSearchModal";
import { InstagramAccessBadge } from "@/components/InstagramAccessBadge";
import { analytics } from "@/lib/analytics";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0" aria-label="NextDoc UK home">
            <img
              src="/lovable-uploads/ngd-logo-white.jpg"
              alt="NextDoc UK logo"
              className="h-10 sm:h-12 md:h-14 w-auto transition-transform group-hover:scale-105"
            />
            {/* Desktop branding */}
            <div className="hidden md:flex flex-col leading-tight">
              <span className="text-lg font-semibold text-foreground">NextDoc UK</span>
              <div className="flex flex-col text-xs text-muted-foreground">
                <span>Built by Doctors, <br /> For Doctors</span>
                <span className="font-medium text-primary">AI Powered</span>
              </div>
            </div>
            {/* Mobile branding - show company name on mobile but smaller */}
            <div className="md:hidden flex flex-col leading-tight">
              <span className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">NextDoc UK</span>
              <span className="text-[10px] sm:text-xs text-primary font-medium whitespace-nowrap">AI Powered</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>

            {/* Exams Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors">
                <span>Exams</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background/95 backdrop-blur-sm border border-border shadow-lg z-[100]">
                <DropdownMenuItem asChild>
                  <Link to="/english" className="w-full cursor-pointer">
                    English Proficiency
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/exams/plab" className="w-full cursor-pointer">
                    PLAB Exam Suite
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/exams/mrcp" className="w-full cursor-pointer">
                    MRCP (Principal Mentor)
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/exams/mrcs" className="w-full cursor-pointer">
                    MRCS (Principal Mentor)
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/exams/mrcog" className="w-full cursor-pointer">
                    MRCOG (Principal Mentor)
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/exams/mrcpch" className="w-full cursor-pointer">
                    MRCPCH (Principal Mentor)
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/exams/royal-college"
                    className="w-full cursor-pointer"
                    onClick={() => analytics.track('rc_dropdown_clicked')}
                  >
                    Royal College Exams
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/labs" className="text-foreground hover:text-primary transition-colors">
              NextDoc Labs
            </Link>
            <Link to="/mentors" className="text-foreground hover:text-primary transition-colors">
              Mentor Insights
            </Link>
          </div>

          {/* Desktop CTA Buttons and Social */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Social Media Icons */}
            <div className="flex items-center space-x-2 mr-2">
              <a
                href="https://instagram.com/nextdoc_uk"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors hover:scale-110 duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://t.me/nextdoc_uk"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors hover:scale-110 duration-200"
                aria-label="Join our Telegram group"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@nextdocglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors hover:scale-110 duration-200"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Search</span>
              <span className="hidden lg:inline text-xs text-muted-foreground">⌘K</span>
            </Button>
            <InstagramAccessBadge compact />
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <CartIcon />
          </div>

          {/* Mobile menu button - ensure proper touch targets */}
          <div className="md:hidden flex items-center space-x-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="min-w-[44px] min-h-[44px] p-2"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <CartIcon />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="min-w-[44px] min-h-[44px] p-2"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Scrollable full height */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[64px] bottom-0 bg-background border-t border-border z-40 overflow-y-auto">
            <div className="px-4 py-4 pb-safe">
              {/* Login & Get Started - Priority at top */}
              <div className="flex flex-col space-y-2 mb-4 pb-4 border-b border-border">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="default" className="w-full justify-center">
                    Login
                  </Button>
                </Link>
                <Link to="/get-started" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center">
                    Get Started
                  </Button>
                </Link>
              </div>

              {/* Main Navigation */}
              <div className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className="text-foreground hover:text-primary transition-colors py-1.5 px-2 rounded-md hover:bg-muted/50 min-h-[44px] flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-foreground hover:text-primary transition-colors py-1.5 px-2 rounded-md hover:bg-muted/50 min-h-[44px] flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/products"
                  className="text-foreground hover:text-primary transition-colors py-1.5 px-2 rounded-md hover:bg-muted/50 min-h-[44px] flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>

                {/* Exams Section */}
                <div className="space-y-1 pt-2">
                  <p className="text-muted-foreground text-sm font-medium py-1 px-2">Exams</p>
                  <div className="pl-3 space-y-1">
                    <Link
                      to="/english"
                      className="block text-foreground hover:text-primary transition-colors py-1.5 px-2 rounded-md hover:bg-muted/50 min-h-[44px] flex items-center text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      English Proficiency
                    </Link>
                    <Link
                      to="/exams/plab"
                      className="block text-foreground hover:text-primary transition-colors py-1.5 px-2 rounded-md hover:bg-muted/50 min-h-[44px] flex items-center text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      PLAB Exam Suite
                    </Link>
                    <Link
                      to="/exams/mrcp"
                      className="block text-foreground hover:text-primary transition-colors py-1.5 px-2 rounded-md hover:bg-muted/50 min-h-[44px] flex items-center text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      MRCP
                    </Link>
                    <Link
                      to="/exams/mrcs"
                      className="block text-foreground hover:text-primary transition-colors py-1.5 px-2 rounded-md hover:bg-muted/50 min-h-[44px] flex items-center text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      MRCS
                    </Link>
                    <Link
                      to="/exams/mrcog"
                      className="block text-foreground hover:text-primary transition-colors py-1.5 px-2 rounded-md hover:bg-muted/50 min-h-[44px] flex items-center text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      MRCOG
                    </Link>
                    <Link
                      to="/exams/mrcpch"
                      className="block text-foreground hover:text-primary transition-colors py-1.5 px-2 rounded-md hover:bg-muted/50 min-h-[44px] flex items-center text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      MRCPCH
                    </Link>
                    <Link
                      to="/exams/royal-college"
                      className="block text-foreground hover:text-primary transition-colors py-1.5 px-2 rounded-md hover:bg-muted/50 min-h-[44px] flex items-center text-sm"
                      onClick={() => {
                        setIsMenuOpen(false);
                        analytics.track('rc_dropdown_clicked');
                      }}
                    >
                      Royal College Exams
                    </Link>
                  </div>
                </div>

                <Link
                  to="/labs"
                  className="text-foreground hover:text-primary transition-colors py-1.5 px-2 rounded-md hover:bg-muted/50 min-h-[44px] flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  NextDoc Labs
                </Link>
                <Link
                  to="/mentors"
                  className="text-foreground hover:text-primary transition-colors py-1.5 px-2 rounded-md hover:bg-muted/50 min-h-[44px] flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mentor Insights
                </Link>

                {/* Mobile Social Media */}
                <div className="pt-3 mt-3 border-t border-border">
                  <p className="text-muted-foreground text-sm font-medium mb-3 px-2">Connect</p>
                  <div className="flex items-center justify-center space-x-6 pb-4">
                    <a
                      href="https://instagram.com/nextdoc_uk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Follow us on Instagram"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a
                      href="https://t.me/nextdoc_uk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Join our Telegram group"
                    >
                      <MessageCircle className="h-6 w-6" />
                    </a>
                    <a
                      href="https://youtube.com/@nextdocglobal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-red-500 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Subscribe to our YouTube channel"
                    >
                      <Youtube className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Scroll indicator - subtle visual cue */}
              <div className="sticky bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {/* Search Modal */}
      <EnhancedSearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </nav>
  );
};

export default Navigation;