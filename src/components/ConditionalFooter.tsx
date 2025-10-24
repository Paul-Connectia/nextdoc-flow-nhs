import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const ConditionalFooter = () => {
  const location = useLocation();
  
  // Pages that should show the full footer
  const fullFooterPages = ['/', '/about', '/products', '/mentors'];
  
  // Pages that should show no footer  
  const noFooterPages = ['/auth', '/login', '/admin'];
  
  // Check if current page should show no footer
  if (noFooterPages.includes(location.pathname)) {
    return null;
  }
  
  // Check if current page should show full footer
  if (fullFooterPages.includes(location.pathname)) {
    return <Footer />;
  }
  
  // Show simplified footer for other pages
  return (
    <footer className="bg-background border-t border-border py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img 
              src="/lovable-uploads/ngd-logo-white.jpg" 
              alt="NextDoc UK Logo" 
              className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
            />
            <span className="font-medium text-foreground whitespace-nowrap">NextDoc UK</span>
            <span className="whitespace-nowrap">© 2025</span>
          </div>
          
          <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors whitespace-nowrap">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors whitespace-nowrap">
              Terms
            </Link>
            <Link to="/" className="hover:text-primary transition-colors whitespace-nowrap">
              Home
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ConditionalFooter;