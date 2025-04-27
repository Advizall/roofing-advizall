
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Database } from '@/integrations/supabase/types';
import UserActions from './UserActions';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface UsersTableProps {
  users: Profile[];
  processingId: string | null;
  currentAction: 'delete' | 'promote' | null;
  onDeleteUser: (userId: string) => void;
  onPromoteUser: (userId: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  processingId,
  currentAction,
  onDeleteUser,
  onPromoteUser,
}) => {
  return (
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
              <UserActions
                userId={user.id}
                userRole={user.role || 'user'}
                processingId={processingId}
                currentAction={currentAction}
                onDelete={onDeleteUser}
                onPromote={onPromoteUser}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
