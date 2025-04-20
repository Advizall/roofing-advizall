
import { useRef, useEffect } from 'react';
import { X, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import type { Message } from '@/types/chat';

interface ChatWindowProps {
  isOpen: boolean;
  messages: Message[];
  isTyping: boolean;
  onClose: () => void;
  onSendMessage: (message: string) => void;
}

const ChatWindow = ({ isOpen, messages, isTyping, onClose, onSendMessage }: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      className={cn(
        'w-[350px] mb-4 flex flex-col rounded-xl shadow-gold glass-card overflow-hidden transform transition-all duration-300 ease-out',
        isOpen ? 'max-h-[500px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95 pointer-events-none'
      )}
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <div className="px-4 py-3 bg-navy-300 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
          <h3 className="text-gold font-semibold">Jasmin</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onClose}
            className="p-1 text-white/70 hover:text-gold transition-colors"
            aria-label="Minimize chat"
          >
            <Minimize2 size={18} />
          </button>
        </div>
      </div>

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

      <ChatInput onSendMessage={onSendMessage} isOpen={isOpen} />
    </div>
  );
};

export default ChatWindow;
