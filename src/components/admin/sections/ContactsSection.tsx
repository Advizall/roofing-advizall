import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, MailCheck, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { createAdminLog } from '@/utils/adminLogUtils';

type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row'];

const ContactsSection = () => {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<'contact' | 'delete' | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch contact submissions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContactedToggle = async (contact: ContactSubmission) => {
    try {
      setProcessingId(contact.id);
      setCurrentAction('contact');
      
      // Atualizar o status de contatado
      const newContactedStatus = !contact.contacted;
      
      const { error } = await supabase
        .from('contact_submissions')
        .update({ contacted: newContactedStatus })
        .eq('id', contact.id);
      
      if (error) throw error;
      
      // Atualizar o estado local
      setContacts(contacts.map(c => 
        c.id === contact.id ? { ...c, contacted: newContactedStatus } : c
      ));
      
      toast({
        title: 'Success',
        description: newContactedStatus 
          ? 'Contact marked as contacted' 
          : 'Contact marked as not contacted',
      });

      // Registrar a ação nos logs de administração
      await createAdminLog(
        'contact_marked_contacted',
        contact.id,
        {
          name: contact.name,
          email: contact.email,
          contacted: newContactedStatus
        }
      );
      
    } catch (error) {
      console.error('Error toggling contact status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update contact status',
        variant: 'destructive',
      });
    } finally {
      setProcessingId(null);
      setCurrentAction(null);
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    try {
      setProcessingId(contactId);
      setCurrentAction('delete');
      
      const contactToDelete = contacts.find(contact => contact.id === contactId);
      
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', contactId);
      
      if (error) throw error;
      
      // Atualizar o estado local
      setContacts(contacts.filter(c => c.id !== contactId));
      
      toast({
        title: 'Success',
        description: 'Contact has been deleted',
      });

      // Registrar a ação nos logs de administração
      await createAdminLog(
        'contact_deleted',
        contactId,
        {
          name: contactToDelete?.name,
          email: contactToDelete?.email
        }
      );
      
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete contact',
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
        <h1 className="text-2xl font-bold text-white mb-2">Form Submissions</h1>
        <p className="text-gold/80">
          Review and manage contact form submissions
        </p>
      </div>

      <div className="bg-navy-300 rounded-lg border border-gold/20 p-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            No contact submissions found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-navy-400">
                <TableRow>
                  <TableHead className="text-gold">Name</TableHead>
                  <TableHead className="text-gold">Email</TableHead>
                  <TableHead className="text-gold">Phone</TableHead>
                  <TableHead className="text-gold">Message</TableHead>
                  <TableHead className="text-gold">Submitted</TableHead>
                  <TableHead className="text-gold text-center">Contacted</TableHead>
                  <TableHead className="text-gold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id} className="border-b border-white/10 hover:bg-navy-400/50">
                    <TableCell className="font-medium text-white">{contact.name}</TableCell>
                    <TableCell className="text-white/80">{contact.email}</TableCell>
                    <TableCell className="text-white/80">{contact.phone}</TableCell>
                    <TableCell className="text-white/80 max-w-md truncate">{contact.message}</TableCell>
                    <TableCell className="text-white/80">{format(new Date(contact.created_at), 'MMM d, yyyy h:mm a')}</TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={!!contact.contacted}
                        onCheckedChange={() => handleContactedToggle(contact)}
                        disabled={processingId === contact.id && currentAction === 'contact'}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button
                          className="p-2 rounded-md hover:bg-red-900/20 text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handleDeleteContact(contact.id)}
                          disabled={processingId === contact.id && currentAction === 'delete'}
                        >
                          {processingId === contact.id && currentAction === 'delete' ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
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

export default ContactsSection;
