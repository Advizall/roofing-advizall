
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatMessage from './ChatMessage';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

type UserInfo = {
  name?: string;
  email?: string;
  phone?: string;
  userId?: string;
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m Jasmin, how can I help you today?',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-with-assistant', {
        body: {
          message: inputValue,
          threadId: threadId,
          userInfo: userInfo,
        },
      });

      if (error) throw error;

      // Store threadId for conversation continuity
      if (data.threadId) {
        setThreadId(data.threadId);
        
        // If we don't have a thread ID yet, save it to localStorage
        if (!threadId) {
          localStorage.setItem('chat_thread_id', data.threadId);
          localStorage.setItem('chat_user_info', JSON.stringify(userInfo));
        }
      }

      // Add assistant's response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Load thread ID and user information from localStorage on start
  useEffect(() => {
    const savedThreadId = localStorage.getItem('chat_thread_id');
    const savedUserInfo = localStorage.getItem('chat_user_info');
    
    if (savedThreadId) {
      setThreadId(savedThreadId);
    }
    
    if (savedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(savedUserInfo);
        setUserInfo(parsedUserInfo);
      } catch (e) {
        console.error('Error parsing saved user info:', e);
      }
    }
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div
        className={cn(
          'w-[350px] mb-4 flex flex-col rounded-xl shadow-gold glass-card overflow-hidden transform transition-all duration-300 ease-out',
          isOpen ? 'max-h-[500px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95 pointer-events-none'
        )}
        style={{ backdropFilter: 'blur(10px)' }}
      >
        {/* Chat Header */}
        <div className="px-4 py-3 bg-navy-300 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
            <h3 className="text-gold font-semibold">Jasmin</h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={toggleChat}
              className="p-1 text-white/70 hover:text-gold transition-colors"
              aria-label="Minimize chat"
            >
              <Minimize2 size={18} />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-navy-400/90">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && (
            <div className="flex items-center text-white/50 text-sm">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-navy-300 border-t border-white/10">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-navy-200 border border-white/10 rounded-full px-4 py-2 text-white outline-none focus:ring-1 focus:ring-gold focus:border-gold"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ''}
              className="rounded-full p-2 bg-gold text-navy hover:bg-gold-400 transition-colors"
              aria-label="Send message"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={cn(
          "flex items-center justify-center w-14 h-14 rounded-full bg-gold hover:bg-gold-400 transition-all duration-300 shadow-lg hover:shadow-gold",
          isOpen ? "rotate-180" : "animate-pulse-gentle"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} className="text-navy-500" /> : <MessageCircle size={24} className="text-navy-500" />}
      </button>
    </div>
  );
};

export default ChatWidget;
