import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminContent from '@/components/admin/AdminContent';
import ClientNavbar from '@/components/client/ClientNavbar';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (!profile || profile.role !== 'admin') {
        navigate('/client-dashboard');
      }
    };

    checkAdminAccess();
  }, [navigate]);

  return (
    <div className="h-screen bg-navy flex flex-col">
      <ClientNavbar />
      
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-1 w-full h-[calc(100vh-88px)] mt-[88px]">
          <div className="fixed left-0 h-[calc(100vh-88px)] mt-[88px] z-40">
            <AdminSidebar 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />
          </div>
          
          <main className="flex-1 ml-0 md:ml-[16rem] overflow-y-auto p-6">
            <AdminContent 
              activeSection={activeSection} 
            />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboard;
