
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { SidebarProvider } from '@/components/ui/sidebar';
import Footer from '@/components/Footer';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminContent from '@/components/admin/AdminContent';
import ClientNavbar from '@/components/client/ClientNavbar';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        
        // Check if user is signed in
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw new Error(sessionError.message);
        }
        
        if (!sessionData.session) {
          navigate('/login');
          return;
        }
        
        // Check if user is an admin
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', sessionData.session.user.id)
          .maybeSingle();
        
        if (profileError) {
          console.error('Error fetching profile:', profileError);
          throw new Error(profileError.message);
        }
        
        console.log('Admin check - User role:', profileData?.role);
        
        if (!profileData || profileData.role !== 'admin') {
          toast({
            title: 'Access Denied',
            description: 'You do not have permission to access the admin panel.',
            variant: 'destructive',
          });
          navigate('/client-dashboard');
          return;
        }
        
        setIsAuthorized(true);
      } catch (error) {
        console.error('Error checking authorization:', error);
        toast({
          title: 'Authentication Error',
          description: 'There was a problem verifying your credentials.',
          variant: 'destructive',
        });
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-gold animate-spin" />
          <div className="text-gold text-lg">Checking permissions...</div>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-navy flex flex-col">
      <ClientNavbar />
      
      <SidebarProvider defaultOpen={true}>
        <div className="flex-grow flex w-full mt-[88px]">
          <AdminSidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />
          
          <main className="flex-1 ml-0 md:ml-[16rem]">
            <AdminContent 
              activeSection={activeSection} 
            />
          </main>
        </div>
      </SidebarProvider>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
