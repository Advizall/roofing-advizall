
import React from 'react';
import { Avatar } from '@/components/ui/avatar';

export interface Message {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  date: string;
  time: string;
  read: boolean;
}

interface MessageCardProps {
  message: Message;
}

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  return (
    <div 
      key={message.id} 
      className={`p-4 rounded-lg ${
        message.read ? 'bg-navy-200/50' : 'bg-navy-200 border-l-4 border-gold'
      }`}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10 border-2 border-gold/20">
          <img src={message.avatar} alt={message.sender} />
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{message.sender}</h3>
            <span className="text-xs text-white/50">
              {message.date} at {message.time}
            </span>
          </div>
          <p className="mt-2 text-white/80">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
