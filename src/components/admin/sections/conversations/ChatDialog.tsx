
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Database } from '@/integrations/supabase/types';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type ChatMessage = Database['public']['Tables']['chat_messages']['Row'];
type ChatConversation = Database['public']['Tables']['chat_conversations']['Row'];

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  conversation: ChatConversation | null;
}

const ChatDialog: React.FC<ChatDialogProps> = ({ open, onOpenChange, conversation }) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    const fetchMessages = async () => {
      if (!conversation) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('conversation_id', conversation.id)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setMessages(data || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch chat messages',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (open && conversation) {
      fetchMessages();
    }
  }, [open, conversation, toast]);

  if (!conversation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col bg-navy-300">
        <DialogHeader>
          <DialogTitle className="text-gold">
            Chat with {conversation.user_name || 'Unknown User'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              No messages found in this conversation.
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'assistant' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === 'assistant'
                      ? 'bg-navy-400 text-white'
                      : 'bg-gold/90 text-navy-500'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-[10px] opacity-70 mt-1 block">
                    {format(new Date(message.created_at || ''), 'MMM d, yyyy h:mm a')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
