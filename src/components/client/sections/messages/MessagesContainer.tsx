
import React from 'react';
import MessageCard from './MessageCard';
import EmptyMessages from './EmptyMessages';
import type { Message } from './MessageCard';

interface MessagesContainerProps {
  messages: Message[];
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.length > 0 ? (
        messages.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))
      ) : (
        <EmptyMessages />
      )}
    </div>
  );
};

export default MessagesContainer;
