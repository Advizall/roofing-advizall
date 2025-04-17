
import React from 'react';
import { MessageCircle } from 'lucide-react';

const EmptyMessages: React.FC = () => {
  return (
    <div className="text-center py-8">
      <MessageCircle size={48} className="mx-auto text-white/30 mb-4" />
      <h3 className="text-lg font-medium mb-1">No messages yet</h3>
      <p className="text-white/60">
        When our team sends you updates, they will appear here
      </p>
    </div>
  );
};

export default EmptyMessages;
