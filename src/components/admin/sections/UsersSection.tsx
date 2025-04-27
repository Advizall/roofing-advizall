import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Trash2, UserPlus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

type Profile = Database['public']['Tables']['profiles']['Row'];
type AdminLogInsert = Database['public']['Tables']['admin_logs']['Insert'];

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
      // Get all profiles with the new email column
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Ensure users always have an email, even if it's null
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

      // First check if user is not an admin
      const userToDelete = users.find(user => user.id === userId);
      if (userToDelete?.role === 'admin') {
        toast({
          title: 'Action Denied',
          description: 'Admin users cannot be deleted',
          variant: 'destructive',
        });
        return;
      }

      // Delete the user from auth via profiles (cascading delete)
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      // Update local state
      setUsers(users.filter(user => user.id !== userId));

      toast({
        title: 'Success',
        description: 'User has been deleted successfully',
      });

      // Log the deletion action
      const adminLogData: AdminLogInsert = {
        action: 'user_deleted',
        performed_by: (await supabase.auth.getSession()).data.session?.user.id || '',
        target_id: userId,
        details: JSON.stringify({ 
          user_email: userToDelete?.email,
          user_name: userToDelete?.full_name || userToDelete?.username 
        })
      };

      await supabase.from('admin_logs').insert(adminLogData);

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

      // Get current user data for logging
      const userToPromote = users.find(user => user.id === userId);

      // Update the user's role to admin
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userId);

      if (error) throw error;

      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: 'admin' } : user
      ));

      toast({
        title: 'Success',
        description: 'User has been promoted to admin',
      });

      // Log the promotion action
      await supabase.from('admin_logs').insert({
        action: 'role_changed',
        performed_by: (await supabase.auth.getSession()).data.session?.user.id,
        target_id: userId,
        details: JSON.stringify({ 
          from_role: 'user', 
          to_role: 'admin',
          user_email: userToPromote?.email,
          user_name: userToPromote?.full_name || userToPromote?.username 
        })
      });

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
            <Table>
              <TableHeader className="bg-navy-400">
                <TableRow>
                  <TableHead className="text-gold">User</TableHead>
                  <TableHead className="text-gold">Role</TableHead>
                  <TableHead className="text-gold">Created</TableHead>
                  <TableHead className="text-gold">Last Updated</TableHead>
                  <TableHead className="text-gold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-b border-white/10 hover:bg-navy-400/50">
                    <TableCell className="font-medium text-white">
                      <div>{user.full_name || user.username || 'Unnamed User'}</div>
                      <div className="text-xs text-white/60">{user.email || 'No email'}</div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.role === 'admin' 
                          ? 'bg-red-900/30 text-red-400' 
                          : 'bg-blue-900/30 text-blue-400'
                      }`}>
                        {user.role || 'user'}
                      </span>
                    </TableCell>
                    <TableCell className="text-white/80">
                      {user.created_at 
                        ? formatDistanceToNow(new Date(user.created_at), { addSuffix: true })
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="text-white/80">
                      {user.updated_at
                        ? formatDistanceToNow(new Date(user.updated_at), { addSuffix: true })
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {user.role !== 'admin' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 border-gold/30 text-gold hover:bg-gold/10"
                              disabled={(processingId === user.id) || user.role === 'admin'}
                              onClick={() => handlePromoteUser(user.id)}
                            >
                              {processingId === user.id && currentAction === 'promote' ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <UserPlus className="mr-1 h-4 w-4" />
                                  Make Admin
                                </>
                              )}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 border-red-600/30 text-red-500 hover:bg-red-900/20"
                              disabled={(processingId === user.id)}
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              {processingId === user.id && currentAction === 'delete' ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <Trash2 className="mr-1 h-4 w-4" />
                                  Delete
                                </>
                              )}
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersSection;
