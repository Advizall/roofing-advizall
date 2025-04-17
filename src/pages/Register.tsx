
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/Footer';
import RegisterCard from '@/components/auth/RegisterCard';

const Register = () => {
  return (
    <div className="min-h-screen bg-navy flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-md">
          <RegisterCard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
