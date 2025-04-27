import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { SidebarProvider } from '@/components/ui/sidebar';
import ClientNavbar from '@/components/client/ClientNavbar';
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
    <div className="h-screen bg-navy flex flex-col">
      <ClientNavbar />
      
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-1 w-full h-[calc(100vh-88px)] mt-[88px]">
          <div className="fixed left-0 h-[calc(100vh-88px)] mt-[88px] z-40">
            <ClientSidebar 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />
          </div>
          
          <main className="flex-1 ml-0 md:ml-[16rem] overflow-y-auto p-6">
            <ClientContent 
              activeSection={activeSection} 
            />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ClientDashboard;
