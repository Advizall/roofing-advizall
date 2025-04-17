
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/Footer';
import ForgotPasswordCard from '@/components/auth/ForgotPasswordCard';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-navy flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-md">
          <ForgotPasswordCard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
