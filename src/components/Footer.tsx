import { Link } from "react-router-dom";
import { Globe, Heart, Users, Instagram, Twitter, Youtube, Linkedin, CreditCard } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-6 md:py-12 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <img 
                src="/lovable-uploads/ngd-logo-white.jpg" 
                alt="NextDoc UK Logo" 
                className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold text-primary">NextDoc UK</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground">Built by Doctors, For Doctors. AI Powered</span>
              </div>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 max-w-md">
              Empowering healthcare professionals with AI powered tools, expert mentorship, 
              and comprehensive exam preparation for NHS success.
            </p>
            <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Registered Office:</p>
              <p>4 Queen's Road, Wimbledon, London-SW19 8ND</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-3 text-sm">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/products" className="block text-muted-foreground hover:text-primary transition-colors">
                Products
              </Link>
              <Link to="/mentors" className="block text-muted-foreground hover:text-primary transition-colors">
                Mentor Insights
              </Link>
              <Link to="/labs" className="block text-muted-foreground hover:text-primary transition-colors">
                NextDoc Labs
              </Link>
            </div>
          </div>

          {/* Exams */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Exam Preparation</h3>
            <div className="space-y-3 text-sm">
              <Link to="/english" className="block text-muted-foreground hover:text-primary transition-colors">
                IELTS/OET
              </Link>
              <Link to="/exams/plab" className="block text-muted-foreground hover:text-primary transition-colors">
                PLAB Exam Suite
              </Link>
              <Link to="/exams/mrcp" className="block text-muted-foreground hover:text-primary transition-colors">
                MRCP
              </Link>
              <Link to="/exams/mrcs" className="block text-muted-foreground hover:text-primary transition-colors">
                MRCS
              </Link>
              <Link to="/exams/mrcog" className="block text-muted-foreground hover:text-primary transition-colors">
                MRCOG
              </Link>
              <Link to="/exams/mrcpch" className="block text-muted-foreground hover:text-primary transition-colors">
                MRCPCH
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-4 md:py-6 border-t border-border">
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Row 1: Copyright */}
            <div className="flex flex-col text-center md:text-left">
              <div className="text-xs sm:text-sm text-muted-foreground">
                NextDoc UK © 2025 | Built by Doctors, for Doctors
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground/70 mt-1">
                Operated by NextDoc Global Ltd (UK) • Company No. 16504223 • All rights reserved.
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground/70 mt-1">
                NextDoc Labs is the research arm of NextDoc Global Ltd.
              </div>
            </div>
            
            {/* Row 2: Links and Compliance Badges */}
            <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
              {/* Legal Links */}
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <Link to="/privacy" className="hover:text-primary transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-primary transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded">
                  Terms of Service
                </Link>
              </div>
              
              {/* Compliance & Payment Badges */}
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Globe className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="hidden sm:inline">NHS Aligned • ICO Registered • GDPR Compliant</span>
                  <span className="sm:hidden text-xs">NHS • ICO • GDPR</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="hidden sm:inline whitespace-nowrap">Payments powered by Stripe</span>
                  <span className="sm:hidden text-xs">Stripe</span>
                </div>
              </div>
            </div>
            
            {/* Row 3: Social Media Links */}
            <div className="flex items-center justify-center md:justify-end gap-4">
              <a
                href="https://instagram.com/nextdoc_uk"
                target="_blank"
                rel="noopener noreferrer"
                className="relative hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded min-w-[44px] min-h-[44px] flex items-center justify-center group"
                aria-label="Follow us on Instagram for free access"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Free Access
                </span>
              </a>
              <a
                href="https://twitter.com/nextdocglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="https://youtube.com/@nextdocglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="https://linkedin.com/company/nextdocglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;