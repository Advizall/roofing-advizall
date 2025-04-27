import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, MessageSquare, CheckCircle, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { createAdminLog } from '@/utils/adminLogUtils';
import { Button } from '@/components/ui/button';

type ChatConversation = Database['public']['Tables']['chat_conversations']['Row'];

const ConversationsSection = () => {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<'contact' | 'delete' | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      setConversations(data || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch chat conversations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContactedToggle = async (conversation: ChatConversation) => {
    try {
      setProcessingId(conversation.id);
      setCurrentAction('contact');
      
      // Atualizar o status de contatado
      const newContactedStatus = !conversation.contacted;
      
      const { error } = await supabase
        .from('chat_conversations')
        .update({ contacted: newContactedStatus })
        .eq('id', conversation.id);
      
      if (error) throw error;
      
      // Atualizar o estado local
      setConversations(conversations.map(c => 
        c.id === conversation.id ? { ...c, contacted: newContactedStatus } : c
      ));
      
      toast({
        title: 'Success',
        description: newContactedStatus 
          ? 'Conversation marked as contacted' 
          : 'Conversation marked as not contacted',
      });

      // Registrar a ação nos logs de administração
      await createAdminLog(
        'chat_marked_contacted',
        conversation.id,
        {
          user_name: conversation.user_name,
          user_email: conversation.user_email,
          contacted: newContactedStatus
        }
      );
      
    } catch (error) {
      console.error('Error toggling contact status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update conversation status',
        variant: 'destructive',
      });
    } finally {
      setProcessingId(null);
      setCurrentAction(null);
    }
  };

  const handleDeleteConversation = async (conversation: ChatConversation) => {
    try {
      setProcessingId(conversation.id);
      setCurrentAction('delete');
      
      // Primeiro exclua as mensagens relacionadas
      const { error: messagesError } = await supabase
        .from('chat_messages')
        .delete()
        .eq('conversation_id', conversation.id);
      
      if (messagesError) throw messagesError;
      
      // Depois exclua a conversa
      const { error: conversationError } = await supabase
        .from('chat_conversations')
        .delete()
        .eq('id', conversation.id);
      
      if (conversationError) throw conversationError;
      
      // Atualizar o estado local
      setConversations(conversations.filter(c => c.id !== conversation.id));
      
      toast({
        title: 'Success',
        description: 'Conversation has been deleted',
      });

      // Registrar a ação nos logs de administração
      await createAdminLog(
        'chat_deleted',
        conversation.id,
        {
          user_name: conversation.user_name,
          user_email: conversation.user_email,
          thread_id: conversation.thread_id
        }
      );
      
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete conversation',
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
        <h1 className="text-2xl font-bold text-white mb-2">Chat Conversations</h1>
        <p className="text-gold/80">
          Manage and monitor user chat conversations
        </p>
      </div>

      <div className="bg-navy-300 rounded-lg border border-gold/20 p-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        ) : conversations.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            No chat conversations found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-navy-400">
                <TableRow>
                  <TableHead className="text-gold">User</TableHead>
                  <TableHead className="text-gold">Thread ID</TableHead>
                  <TableHead className="text-gold">Last Updated</TableHead>
                  <TableHead className="text-gold">Contacted</TableHead>
                  <TableHead className="text-gold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conversations.map((conversation) => (
                  <TableRow key={conversation.id} className="border-b border-white/10 hover:bg-navy-400/50">
                    <TableCell className="font-medium text-white">
                      <div>{conversation.user_name || 'Unknown User'}</div>
                      <div className="text-xs text-white/60">{conversation.user_email || 'No email'}</div>
                      <div className="text-xs text-white/60">{conversation.user_phone || 'No phone'}</div>
                    </TableCell>
                    <TableCell className="text-white/80">{conversation.thread_id}</TableCell>
                    <TableCell className="text-white/80">
                      {conversation.updated_at
                        ? formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <button
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          conversation.contacted
                            ? 'bg-green-900/30 text-green-400'
                            : 'bg-red-900/30 text-red-400'
                        }`}
                        onClick={() => handleContactedToggle(conversation)}
                        disabled={processingId === conversation.id && currentAction === 'contact'}
                      >
                        {processingId === conversation.id && currentAction === 'contact' ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : conversation.contacted ? (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        ) : (
                          <MessageSquare className="h-4 w-4 mr-2" />
                        )}
                        {conversation.contacted ? 'Contacted' : 'Not Contacted'}
                      </button>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 border-red-600/30 text-red-500 hover:bg-red-900/20"
                        disabled={processingId === conversation.id && currentAction === 'delete'}
                        onClick={() => handleDeleteConversation(conversation)}
                      >
                        {processingId === conversation.id && currentAction === 'delete' ? (
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

export default ConversationsSection;
