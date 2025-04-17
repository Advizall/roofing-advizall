import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ClientNavbar = () => {
  const [userName, setUserName] = useState('Client');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name, username')
          .eq('id', session.user.id)
          .single();
          
        if (profileData) {
          setUserName(profileData.full_name || profileData.username || 'Client');
        }
      }
    };
    
    getProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-navy-200 border-b border-gold/20 py-4 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/images/4811a69a-c3ba-4318-bb8c-d90d22539145.png" alt="PACC Solutions" className="h-16" />
          <span className="text-gold ml-4 font-semibold hidden md:inline-block">
            Client Dashboard
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center text-white">
            <span>Welcome, {userName}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout} 
            className="border-gold/30 text-gold hover:bg-gold/10 hover:text-white"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
        
        <button 
          className="md:hidden text-gold"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-navy-300 rounded p-4 flex flex-col gap-4">
          <div className="flex items-center text-white">
            <span>Welcome, {userName}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout} 
            className="border-gold/30 text-gold hover:bg-gold/10 hover:text-white w-full"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};

export default ClientNavbar;
