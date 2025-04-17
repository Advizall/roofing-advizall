
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Link2Off, HomeIcon, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-navy">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center space-y-8">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gold/20 blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <div className="relative bg-navy-300/95 backdrop-blur-sm border border-gold/20 rounded-lg p-8">
              <div className="mb-6">
                <Link2Off className="h-16 w-16 text-gold mx-auto animate-bounce" />
              </div>
              
              <h1 className="text-4xl font-bold text-gold mb-4">404</h1>
              <p className="text-xl text-white/80 mb-2">Oops! Page not found</p>
              <p className="text-white/60 mb-8">
                The page you're looking for doesn't exist or has been moved.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  className="bg-gold hover:bg-gold/80 text-navy-500 font-medium group flex gap-2 min-w-[160px]"
                >
                  <Link to="/">
                    <HomeIcon size={18} className="group-hover:scale-110 transition-transform duration-200" />
                    Return Home
                  </Link>
                </Button>
                
                <Button
                  variant="outline"
                  className="border-gold/30 text-gold hover:bg-gold/10 hover:text-white group flex gap-2 min-w-[160px]"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCcw size={18} className="group-hover:rotate-180 transition-all duration-500" />
                  Retry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
