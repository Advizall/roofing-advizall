
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Message } from '@/types/chat';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAssistant = message.sender === 'assistant';
  const formattedTime = formatDistanceToNow(message.timestamp, { addSuffix: true });

  return (
    <div
      className={cn(
        'flex max-w-[85%] animate-fade-in',
        isAssistant ? 'self-start' : 'self-end'
      )}
    >
      <div
        className={cn(
          'rounded-xl p-3 shadow',
          isAssistant
            ? 'bg-navy-200 text-white'
            : 'bg-gold/90 text-navy-500 font-medium'
        )}
      >
        <p className="text-sm">{message.content}</p>
        <span className={cn(
          'text-[10px] block mt-1',
          isAssistant ? 'text-white/50' : 'text-navy-400'
        )}>
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
