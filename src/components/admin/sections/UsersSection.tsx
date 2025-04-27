
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import UsersTable from './users/UsersTable';
import { createAdminLog } from '@/utils/adminLogUtils';

type Profile = Database['public']['Tables']['profiles']['Row'];

const UsersSection = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<'delete' | 'promote' | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch all profiles without any filtering by user ID
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      const profilesWithEmail: Profile[] = profilesData?.map(profile => ({
        ...profile,
        email: profile.email || null
      })) || [];

      setUsers(profilesWithEmail);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch user profiles',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      setProcessingId(userId);
      setCurrentAction('delete');

      const userToDelete = users.find(user => user.id === userId);
      if (userToDelete?.role === 'admin') {
        toast({
          title: 'Action Denied',
          description: 'Admin users cannot be deleted',
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.filter(user => user.id !== userId));

      toast({
        title: 'Success',
        description: 'User has been deleted successfully',
      });

      await createAdminLog(
        'user_deleted',
        userId,
        { 
          user_email: userToDelete?.email,
          user_name: userToDelete?.full_name || userToDelete?.username 
        }
      );

    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        variant: 'destructive',
      });
    } finally {
      setProcessingId(null);
      setCurrentAction(null);
    }
  };

  const handlePromoteUser = async (userId: string) => {
    try {
      setProcessingId(userId);
      setCurrentAction('promote');

      const userToPromote = users.find(user => user.id === userId);

      const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: 'admin' } : user
      ));

      toast({
        title: 'Success',
        description: 'User has been promoted to admin',
      });

      await createAdminLog(
        'role_changed',
        userId,
        { 
          from_role: 'user', 
          to_role: 'admin',
          user_email: userToPromote?.email,
          user_name: userToPromote?.full_name || userToPromote?.username 
        }
      );

    } catch (error) {
      console.error('Error promoting user:', error);
      toast({
        title: 'Error',
        description: 'Failed to promote user',
        variant: 'destructive',
      });
    } finally {
      setProcessingId(null);
      setCurrentAction(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">User Management</h1>
        <p className="text-gold/80">
          View and manage user accounts and roles
        </p>
      </div>

      <div className="bg-navy-300 rounded-lg border border-gold/20 p-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            No user accounts found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <UsersTable
              users={users}
              processingId={processingId}
              currentAction={currentAction}
              onDeleteUser={handleDeleteUser}
              onPromoteUser={handlePromoteUser}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersSection;
