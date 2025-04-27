import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Json } from '../../../types/supabase';

interface Log {
  id: string;
  created_at: string;
  action: string;
  details: Json;
  target_id: string;
  performed_by: string;
}

type AdminLog = Database['public']['Tables']['admin_logs']['Row'];

const getActionStyle = (action: string): string => {
  // Destructive actions - Red tones
  if (action.includes('delete') || action.includes('remove')) {
    return 'bg-red-900/30 text-red-400';
  }
  
  // Creation actions - Green tones
  if (action.includes('create') || action.includes('add')) {
    return 'bg-green-900/30 text-green-400';
  }
  
  // Update actions - Blue tones
  if (action.includes('update') || action.includes('edit') || action.includes('modify')) {
    return 'bg-blue-900/30 text-blue-400';
  }
  
  // Status change actions - Purple tones
  if (action.includes('status') || action.includes('state') || action.includes('toggle')) {
    return 'bg-purple-900/30 text-purple-400';
  }
  
  // Authentication actions - Yellow/Gold tones
  if (action.includes('login') || action.includes('auth') || action.includes('access')) {
    return 'bg-amber-900/30 text-amber-400';
  }
  
  // Contact related actions - Cyan tones
  if (action.includes('contact') || action.includes('message') || action.includes('reply')) {
    return 'bg-cyan-900/30 text-cyan-400';
  }
  
  // Default style - Neutral tone
  return 'bg-slate-900/30 text-slate-400';
};

const formatActionType = (action: string): string => {
  return action
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const LogsSection = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const { data: logsData, error: logsError } = await supabase
        .from('admin_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (logsError) {
        throw logsError;
      }

      setLogs(logsData || []);
    } catch (error) {
      console.error('Error in fetchLogs function:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch admin logs. Please refresh the page.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Admin Logs</h1>
        <p className="text-gold/80">
          View system activity and administrative actions
        </p>
      </div>

      <div className="bg-navy-300 rounded-lg border border-gold/20 p-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            No admin logs found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-navy-400">
                <TableRow>
                  <TableHead className="text-gold">Date</TableHead>
                  <TableHead className="text-gold">Action</TableHead>
                  <TableHead className="text-gold">Details</TableHead>
                  <TableHead className="text-gold">Target ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} className="border-b border-white/10 hover:bg-navy-400/50">
                    <TableCell className="text-white/80">
                      {format(new Date(log.created_at), 'MMM d, yyyy HH:mm')}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionStyle(log.action)}`}>
                        {formatActionType(log.action)}
                      </span>
                    </TableCell>
                    <TableCell className="text-white/80">
                      {log.details && typeof log.details === 'object' && (
                        <div>
                          {Object.entries(log.details).map(([key, value]) => (
                            <div key={key} className="text-sm">
                              <span className="text-white/60">{key.replace(/_/g, ' ')}: </span>
                              <span className="text-white">{value as string}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-white/80">
                      {log.target_id}
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
