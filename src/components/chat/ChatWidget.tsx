
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatWindow from './ChatWindow';
import { useChat } from '@/hooks/use-chat';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(true);
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

      {!isOpen && showSuggestion && (
        <div className="mb-4 mr-2 animate-fade-in relative">
          <button 
            onClick={() => setShowSuggestion(false)}
            className="absolute top-1 left-1 text-white/40 hover:text-white/60 transition-colors duration-200 rounded-full"
            aria-label="Close suggestion"
          >
            <X size={16} />
          </button>
          <div className="bg-navy-300 text-gold pl-6 pr-4 py-2 rounded-lg shadow-gold text-sm max-w-[220px] font-medium">
            Questions about your roofing project? Chat with us!
          </div>
        </div>
      )}

      <button
        onClick={toggleChat}
        className={cn(
          "flex items-center justify-center w-14 h-14 rounded-full bg-gold hover:bg-gold-400 transition-all duration-300 shadow-lg hover:shadow-gold",
          isOpen ? "rotate-180" : "animate-bounce"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} className="text-navy-500" /> : <MessageCircle size={24} className="text-navy-500" />}
      </button>
    </div>
  );
};

export default ChatWidget;
