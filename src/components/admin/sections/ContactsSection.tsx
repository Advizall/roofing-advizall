import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Trash2, Check, MessageSquare, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
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

      if (error) {
        console.error('Erro ao buscar contatos:', error);
        throw error;
      }

      // Log para debug
      console.log('Contatos buscados:', data?.map(c => ({
        id: c.id,
        name: c.name,
        contacted: c.contacted
      })));

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
      
      console.log('Atualizando contato:', {
        id: contact.id,
        oldStatus: contact.contacted,
        newStatus: newContactedStatus
      });

      // Fazer o update
      const { error } = await supabase
        .from('contact_submissions')
        .update({ contacted: newContactedStatus })
        .eq('id', contact.id);
      
      if (error) {
        console.error('Erro no update:', error);
        throw error;
      }

      // Atualizar o estado local
      setContacts(prevContacts => 
        prevContacts.map(c => 
          c.id === contact.id ? { ...c, contacted: newContactedStatus } : c
        )
      );
      
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
        <p className="text-gold/80">Review and manage contact form submissions</p>
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
          <ScrollArea className="h-[600px] rounded-md">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-navy-400 sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="text-gold font-semibold">Name</TableHead>
                    <TableHead className="text-gold font-semibold">Contact Info</TableHead>
                    <TableHead className="text-gold font-semibold">Message</TableHead>
                    <TableHead className="text-gold font-semibold">Date</TableHead>
                    <TableHead className="text-gold font-semibold text-center">Status</TableHead>
                    <TableHead className="text-gold font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow 
                      key={contact.id} 
                      className="border-b border-white/10 hover:bg-navy-400/50"
                    >
                      <TableCell className="text-white/80">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">{contact.name}</span>
                          <span className="text-sm text-white/60">{contact.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-white/80">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm whitespace-nowrap">{contact.phone}</span>
                          <span className="text-xs text-white/60 whitespace-nowrap">
                            {contact.checkbox ? 'SMS Enabled' : 'SMS Disabled'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-white/80">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="text-left w-full">
                              <div className="max-w-[250px] text-sm text-white/80">
                                <p className="truncate cursor-pointer hover:text-white">
                                  {contact.message}
                                </p>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent 
                              side="right" 
                              className="max-w-[400px] bg-navy-200 border border-gold/20"
                            >
                              <p className="text-white/90 p-2 whitespace-pre-wrap">
                                {contact.message}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-white/80 whitespace-nowrap">
                        {format(new Date(contact.created_at), 'MMM d, yyyy h:mm a')}
                      </TableCell>
                      <TableCell>
                        <button
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            contact.contacted
                              ? 'bg-green-900/30 text-green-400'
                              : 'bg-red-900/30 text-red-400'
                          }`}
                          onClick={() => handleContactedToggle(contact)}
                          disabled={processingId === contact.id && currentAction === 'contact'}
                        >
                          {processingId === contact.id && currentAction === 'contact' ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : contact.contacted ? (
                            <CheckCircle className="h-4 w-4 mr-2" />
                          ) : (
                            <MessageSquare className="h-4 w-4 mr-2" />
                          )}
                          {contact.contacted ? 'Contacted' : 'Not Contacted'}
                        </button>
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default ContactsSection;
