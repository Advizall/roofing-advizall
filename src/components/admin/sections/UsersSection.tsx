import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { Loader2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

type Profile = Database['public']['Tables']['profiles']['Row'];

const UsersSection = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;
      setUsers(profilesData || []);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      setDeletingUserId(userId);
      
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) throw profileError;

      setUsers(users.filter(user => user.id !== userId));
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      });
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        variant: 'destructive',
      });
    } finally {
      setDeletingUserId(null);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-white mb-2">User Management</h1>
        <Button
          variant="outline"
          size="sm"
          className="border-gold/30 text-gold hover:bg-gold/10 hover:text-white"
          onClick={fetchUsers}
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Refresh
        </Button>
      </div>
      <p className="text-gold/80">View and manage user accounts</p>

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
                      <div>{user.full_name || 'Unnamed User'}</div>
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
                      {formatDate(user.created_at)}
                    </TableCell>
                    <TableCell className="text-white/80">
                      {formatDate(user.updated_at)}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 border-red-600/30 text-red-500 hover:bg-red-900/20"
                        disabled={deletingUserId === user.id}
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        {deletingUserId === user.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Trash2 className="mr-1 h-4 w-4" />
                            Delete
                          </>
                        )}
                      </Button>
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
