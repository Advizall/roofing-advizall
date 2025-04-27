import { Link } from 'react-router-dom';
import ForgotPasswordCard from '@/components/auth/ForgotPasswordCard';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-navy flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy-400/90 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/images/4811a69a-c3ba-4318-bb8c-d90d22539145.png" 
                alt="PACC Solutions LLC" 
                style={{ height: "76.8px" }} 
                className="h-[100.8px]" 
              />
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-md">
          <ForgotPasswordCard />
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
