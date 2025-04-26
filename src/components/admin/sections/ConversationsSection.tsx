
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Check, Loader2, MessageSquare, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatConversation {
  id: string;
  thread_id: string;
  created_at: string;
  updated_at: string | null;
  user_name: string | null;
  user_email: string | null;
  user_phone: string | null;
  contacted: boolean;
  message_count: number;
}

interface ChatMessage {
  id: string;
  conversation_id: string | null;
  content: string;
  sender: 'user' | 'assistant';
  created_at: string;
}

const ConversationsSection = () => {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      // First, get all conversations
      const { data: conversationsData, error: conversationsError } = await supabase
        .from('chat_conversations')
        .select('*')
        .order('created_at', { ascending: false });

      if (conversationsError) throw conversationsError;

      // For each conversation, count the number of messages
      const conversationsWithMessageCount = await Promise.all(
        (conversationsData || []).map(async (conversation) => {
          const { count, error } = await supabase
            .from('chat_messages')
            .select('*', { count: 'exact', head: true })
            .eq('conversation_id', conversation.id);

          return {
            ...conversation,
            contacted: conversation.contacted ?? false, // Default to false if contacted is null/undefined
            message_count: count || 0,
          };
        })
      );

      setConversations(conversationsWithMessageCount);
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

  const fetchMessages = async (conversationId: string) => {
    setLoadingMessages(true);
    setSelectedConversation(conversationId);
    
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      // Convert generic sender string to the specific union type ('user' | 'assistant')
      const typedMessages = (data || []).map(msg => ({
        ...msg,
        sender: (msg.sender === 'user' || msg.sender === 'assistant') ? 
          msg.sender as 'user' | 'assistant' : 
          'user' // Default to 'user' if not matching our expected values
      }));
      
      setMessages(typedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch chat messages',
        variant: 'destructive',
      });
    } finally {
      setLoadingMessages(false);
    }
  };

  const deleteConversation = async (conversationId: string) => {
    setProcessingId(conversationId);
    
    try {
      // First delete all messages in the conversation
      const { error: messagesError } = await supabase
        .from('chat_messages')
        .delete()
        .eq('conversation_id', conversationId);

      if (messagesError) throw messagesError;

      // Then delete the conversation itself
      const { error: conversationError } = await supabase
        .from('chat_conversations')
        .delete()
        .eq('id', conversationId);

      if (conversationError) throw conversationError;

      // Update the UI
      setConversations(conversations.filter(c => c.id !== conversationId));
      
      if (selectedConversation === conversationId) {
        setSelectedConversation(null);
        setMessages([]);
      }

      toast({
        title: 'Success',
        description: 'Conversation deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete conversation',
        variant: 'destructive',
      });
    } finally {
      setProcessingId(null);
    }
  };

  const markAsContacted = async (conversationId: string) => {
    setProcessingId(conversationId);
    
    try {
      const { error } = await supabase
        .from('chat_conversations')
        .update({ contacted: true })
        .eq('id', conversationId);

      if (error) throw error;

      // Update the UI
      setConversations(conversations.map(conv => 
        conv.id === conversationId ? { ...conv, contacted: true } : conv
      ));

      toast({
        title: 'Success',
        description: 'Conversation marked as contacted',
      });
    } catch (error) {
      console.error('Error updating conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to mark conversation as contacted',
        variant: 'destructive',
      });
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Chat Conversations</h1>
        <p className="text-gold/80">
          Manage chat conversations from the website
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 bg-navy-300 rounded-lg border border-gold/20 p-4">
          <h2 className="text-xl text-gold font-medium mb-4">All Conversations</h2>
          
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
                    <TableHead className="text-gold">Date</TableHead>
                    <TableHead className="text-gold">Status</TableHead>
                    <TableHead className="text-gold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conversations.map((conv) => (
                    <TableRow 
                      key={conv.id} 
                      className={`border-b border-white/10 hover:bg-navy-400/50 cursor-pointer ${selectedConversation === conv.id ? 'bg-navy-400/80' : ''}`}
                      onClick={() => fetchMessages(conv.id)}
                    >
                      <TableCell className="font-medium text-white">
                        <div>{conv.user_name || 'Anonymous User'}</div>
                        <div className="text-xs text-white/60">{conv.message_count} messages</div>
                      </TableCell>
                      <TableCell className="text-white/80">
                        {formatDistanceToNow(new Date(conv.created_at), { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        {conv.contacted ? (
                          <span className="inline-flex items-center rounded-full bg-green-800/20 px-2 py-1 text-xs font-medium text-green-400">
                            <Check className="mr-1 h-3 w-3" />
                            Contacted
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-amber-800/20 px-2 py-1 text-xs font-medium text-amber-400">
                            Pending
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="outline"
                            size="icon"
                            disabled={conv.contacted || processingId === conv.id}
                            onClick={() => markAsContacted(conv.id)}
                            className="h-7 w-7 border-gold/30 text-gold hover:bg-gold/10"
                          >
                            {processingId === conv.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Check className="h-4 w-4" />
                            )}
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 border-red-800/30 text-red-500 hover:bg-red-500/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-navy-300 border-gold/30">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-gold">Delete Conversation</AlertDialogTitle>
                                <AlertDialogDescription className="text-white/70">
                                  This will permanently delete this conversation and all its messages.
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-navy-400 text-white border-white/20 hover:bg-navy-500">Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  className="bg-red-900/50 hover:bg-red-800 text-white border-none"
                                  onClick={() => deleteConversation(conv.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-3 bg-navy-300 rounded-lg border border-gold/20 p-4">
          <div className="flex items-center mb-4">
            <MessageSquare className="text-gold mr-2" />
            <h2 className="text-xl text-gold font-medium">Conversation Details</h2>
          </div>
          
          {selectedConversation ? (
            loadingMessages ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-8 text-white/60">
                No messages found in this conversation.
              </div>
            ) : (
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-navy-400 border-l-4 border-gold'
                          : 'bg-navy-500 border-l-4 border-blue-500'
                      }`}
                    >
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm font-medium ${
                          message.sender === 'user' ? 'text-gold' : 'text-blue-400'
                        }`}>
                          {message.sender === 'user' ? 'User' : 'AI Assistant'}
                        </span>
                        <span className="text-xs text-white/40">
                          {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-white/90">{message.content}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )
          ) : (
            <div className="text-center py-8 text-white/60">
              Select a conversation to view messages.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationsSection;
