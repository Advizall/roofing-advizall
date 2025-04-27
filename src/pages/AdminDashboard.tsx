
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
          console.error('Session error:', sessionError);
          throw new Error('Authentication failed. Please try logging in again.');
        }
        
        if (!sessionData.session) {
          console.log('No session found, redirecting to login');
          navigate('/login');
          return;
        }
        
        console.log('Session found, checking admin status for user:', sessionData.session.user.id);
        
        // Use our improved query that avoids RLS recursion issues
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', sessionData.session.user.id)
          .single();

        console.log('Admin check result:', { data, error });
        
        if (error) {
          console.error('Profile fetch error:', error);
          throw new Error('Failed to verify admin privileges.');
        }
        
        if (!data || data.role !== 'admin') {
          console.log('User is not an admin:', data?.role);
          toast({
            title: 'Access Denied',
            description: 'You do not have permission to access the admin panel.',
            variant: 'destructive',
          });
          navigate('/client-dashboard');
          return;
        }
        
        console.log('Admin status confirmed');
        setIsAuthorized(true);
      } catch (error: any) {
        console.error('Authorization check failed:', error);
        toast({
          title: 'Authentication Error',
          description: error.message || 'There was a problem verifying your credentials.',
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
