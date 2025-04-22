
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { SidebarProvider } from '@/components/ui/sidebar';
import ClientNavbar from '@/components/client/ClientNavbar';
import Footer from '@/components/Footer';
import ClientSidebar from '@/components/client/ClientSidebar';
import ClientContent from '@/components/client/ClientContent';

const ClientDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/login');
      }
    };
    
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-navy flex flex-col">
      <ClientNavbar />
      
      <SidebarProvider defaultOpen={true}>
        <div className="flex-grow flex w-full">
          <ClientSidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />
          
          <main className="flex-1">
            <ClientContent 
              activeSection={activeSection} 
            />
          </main>
        </div>
      </SidebarProvider>
      
      <Footer />
    </div>
  );
};

export default ClientDashboard;
