
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  full_name: string | null;
  username: string | null;
  role: string | null;
  created_at: string | null;
  updated_at: string | null;
  avatar_url: string | null;
  email: string | null;
}

const UsersSection = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Get all profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Since we can't directly access auth.users emails from client-side,
      // we'll use the profiles data and add a default email placeholder
      const profilesWithEmail = profilesData?.map(profile => ({
        ...profile,
        email: profile.email || `${profile.username || 'user'}@example.com` // Default email placeholder
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
