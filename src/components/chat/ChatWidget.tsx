
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatWindow from './ChatWindow';
import { useChat } from '@/hooks/use-chat';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isTyping, sendMessage } = useChat();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        isTyping={isTyping}
        onClose={toggleChat}
        onSendMessage={sendMessage}
      />

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
