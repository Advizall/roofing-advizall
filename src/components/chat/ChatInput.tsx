
import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isOpen: boolean;
}

const ChatInput = ({ onSendMessage, isOpen }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (inputValue.trim() === '') return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
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
          onClick={handleSend}
          disabled={inputValue.trim() === ''}
          className="rounded-full p-2 bg-gold text-navy hover:bg-gold-400 transition-colors"
          aria-label="Send message"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
