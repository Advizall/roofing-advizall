
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Clock } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface AdminLog {
  id: string;
  created_at: string;
  action: string;
  performed_by: string;
  target_id: string | null;
  details: any;
  performer_name?: string;
}

const LogsSection = () => {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      // Get all logs
      const { data: logsData, error: logsError } = await supabase
        .from('admin_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (logsError) throw logsError;

      // Get all user profiles to map performer names
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, username, email');

      // Map performer names to logs
      const logsWithNames = logsData?.map(log => {
        const performer = profiles?.find(p => p.id === log.performed_by);
        return {
          ...log,
          performer_name: performer ? (performer.full_name || performer.username || performer.email) : 'Unknown User'
        };
      }) || [];

      setLogs(logsWithNames);
    } catch (error) {
      console.error('Error fetching logs:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch admin logs',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'user_deleted':
        return 'User Deleted';
      case 'user_created':
        return 'User Created';
      case 'role_changed':
        return 'Role Changed';
      case 'contact_marked_contacted':
        return 'Contact Marked as Contacted';
      case 'contact_deleted':
        return 'Contact Deleted';
      case 'chat_deleted':
        return 'Chat Deleted';
      default:
        return action.replace('_', ' ');
    }
  };

  const getActionColor = (action: string) => {
    if (action.includes('deleted')) return 'bg-red-900/30 text-red-400';
    if (action.includes('created')) return 'bg-green-900/30 text-green-400';
    if (action === 'role_changed') return 'bg-amber-900/30 text-amber-400';
    return 'bg-blue-900/30 text-blue-400';
  };

  const formatLogDetails = (details: any, action: string) => {
    if (!details) return 'No details available';
    
    try {
      const parsedDetails = typeof details === 'string' ? JSON.parse(details) : details;
      
      switch (action) {
        case 'user_deleted':
          return `Deleted user: ${parsedDetails.user_name || parsedDetails.user_email || 'Unknown'}`;
        case 'role_changed':
          return `Changed role from ${parsedDetails.from_role || 'unknown'} to ${parsedDetails.to_role || 'unknown'} for ${parsedDetails.user_name || parsedDetails.user_email || 'Unknown'}`;
        case 'contact_marked_contacted':
          return `Marked ${parsedDetails.name || parsedDetails.email || 'Unknown contact'} as contacted`;
        case 'contact_deleted':
          return `Deleted contact: ${parsedDetails.name || parsedDetails.email || 'Unknown'}`;
        case 'chat_deleted':
          return `Deleted chat from: ${parsedDetails.user_name || parsedDetails.user_email || 'Unknown'}`;
        default:
          return JSON.stringify(parsedDetails);
      }
    } catch (e) {
      return 'Invalid details format';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Admin Logs</h1>
        <p className="text-gold/80">
          Track system activity and administrative actions
        </p>
      </div>

      <div className="bg-navy-300 rounded-lg border border-gold/20 p-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            No logs found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-navy-400">
                <TableRow>
                  <TableHead className="text-gold">Timestamp</TableHead>
                  <TableHead className="text-gold">Action</TableHead>
                  <TableHead className="text-gold">Performed By</TableHead>
                  <TableHead className="text-gold">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} className="border-b border-white/10 hover:bg-navy-400/50">
                    <TableCell className="whitespace-nowrap text-white/80">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-gold/60" />
                        <div>
                          <div>{format(new Date(log.created_at), 'MMM d, yyyy')}</div>
                          <div className="text-xs text-white/60">{format(new Date(log.created_at), 'h:mm a')}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getActionColor(log.action)}`}>
                        {getActionLabel(log.action)}
                      </span>
                    </TableCell>
                    <TableCell className="text-white">
                      {log.performer_name}
                    </TableCell>
                    <TableCell className="text-white/80 max-w-md">
                      <div className="truncate">
                        {formatLogDetails(log.details, log.action)}
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

export default LogsSection;
