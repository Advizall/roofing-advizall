
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatMessage from './ChatMessage';
import { Button } from '@/components/ui/button';

export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
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

    // Simulate assistant response after delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your message. Our team will get back to you shortly.",
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
            <h3 className="text-gold font-semibold">HomeGuardian Assistant</h3>
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
