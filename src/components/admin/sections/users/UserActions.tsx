
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, UserPlus } from 'lucide-react';

interface UserActionsProps {
  userId: string;
  userRole: string;
  processingId: string | null;
  currentAction: 'delete' | 'promote' | null;
  onDelete: (userId: string) => void;
  onPromote: (userId: string) => void;
}

const UserActions: React.FC<UserActionsProps> = ({
  userId,
  userRole,
  processingId,
  currentAction,
  onDelete,
  onPromote,
}) => {
  // Don't show action buttons for admin users
  if (userRole === 'admin') return null;

  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="h-8 border-gold/30 text-gold hover:bg-gold/10"
        disabled={(processingId === userId) || userRole === 'admin'}
        onClick={() => onPromote(userId)}
      >
        {processingId === userId && currentAction === 'promote' ? (
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
        disabled={(processingId === userId)}
        onClick={() => onDelete(userId)}
      >
        {processingId === userId && currentAction === 'delete' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Trash2 className="mr-1 h-4 w-4" />
            Delete
          </>
        )}
      </Button>
    </div>
  );
};

export default UserActions;
