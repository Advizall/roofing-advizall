
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link2Off, HomeIcon, RefreshCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();
  const [errorType, setErrorType] = useState<'not-found' | 'connection' | 'server'>('not-found');

  useEffect(() => {
    // Check if the error is due to connection issues
    if (!navigator.onLine) {
      setErrorType('connection');
    }

    // Log the error for tracking
    console.error(
      `Error accessing route: ${location.pathname}`,
      `Type: ${errorType}`,
      `Time: ${new Date().toISOString()}`
    );
  }, [location.pathname, errorType]);

  const errorMessages = {
    'not-found': {
      title: '404',
      message: "The page you're looking for doesn't exist or has been moved.",
      icon: <Link2Off className="h-16 w-16 text-gold mx-auto animate-bounce" />
    },
    'connection': {
      title: 'Connection Lost',
      message: "Please check your internet connection and try again.",
      icon: <AlertTriangle className="h-16 w-16 text-gold mx-auto animate-pulse" />
    },
    'server': {
      title: '500',
      message: "Our servers are currently experiencing issues. Please try again later.",
      icon: <AlertTriangle className="h-16 w-16 text-gold mx-auto animate-pulse" />
    }
  };

  const currentError = errorMessages[errorType];

  return (
    <div className="min-h-screen flex flex-col bg-navy">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center space-y-8">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gold/20 blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <div className="relative bg-navy-300/95 backdrop-blur-sm border border-gold/20 rounded-lg p-8">
              <div className="mb-6">
                {currentError.icon}
              </div>
              
              <h1 className="text-4xl font-bold text-gold mb-4">{currentError.title}</h1>
              <p className="text-xl text-white/80 mb-2">Oops! Something went wrong</p>
              <p className="text-white/60 mb-8">
                {currentError.message}
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
