
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, Check as CheckIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  contacted: boolean;
}

const ContactsSection = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch contact submissions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsContacted = async (id: string) => {
    setProcessingId(id);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ contacted: true })
        .eq('id', id);

      if (error) throw error;

      setSubmissions(submissions.map(submission => 
        submission.id === id ? { ...submission, contacted: true } : submission
      ));

      toast({
        title: 'Success',
        description: 'Submission marked as contacted',
      });
    } catch (error) {
      console.error('Error updating submission:', error);
      toast({
        title: 'Error',
        description: 'Failed to mark as contacted',
        variant: 'destructive',
      });
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Form Submissions</h1>
        <p className="text-gold/80">
          Manage contact form submissions from the website
        </p>
      </div>

      <div className="bg-navy-300 rounded-lg border border-gold/20 p-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            No form submissions found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-navy-400">
                <TableRow>
                  <TableHead className="text-gold">Name</TableHead>
                  <TableHead className="text-gold">Contact Info</TableHead>
                  <TableHead className="text-gold">Message</TableHead>
                  <TableHead className="text-gold">Submitted</TableHead>
                  <TableHead className="text-gold">Status</TableHead>
                  <TableHead className="text-gold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id} className="border-b border-white/10 hover:bg-navy-400/50">
                    <TableCell className="font-medium text-white">
                      {submission.name}
                    </TableCell>
                    <TableCell className="text-white/80">
                      <div>{submission.email}</div>
                      <div>{submission.phone}</div>
                    </TableCell>
                    <TableCell className="text-white/80 max-w-xs truncate">
                      {submission.message}
                    </TableCell>
                    <TableCell className="text-white/80">
                      {formatDistanceToNow(new Date(submission.created_at), { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      {submission.contacted ? (
                        <span className="inline-flex items-center rounded-full bg-green-800/20 px-2 py-1 text-xs font-medium text-green-400">
                          <CheckIcon className="mr-1 h-3 w-3" />
                          Contacted
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-amber-800/20 px-2 py-1 text-xs font-medium text-amber-400">
                          Pending
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={submission.contacted || processingId === submission.id}
                        onClick={() => markAsContacted(submission.id)}
                        className="h-8 border-gold/30 text-gold hover:bg-gold/10"
                      >
                        {processingId === submission.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Check className="mr-1 h-4 w-4" />
                            Mark Contacted
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

export default ContactsSection;
