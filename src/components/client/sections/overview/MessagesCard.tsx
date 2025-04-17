
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

interface MessagesCardProps {
  unreadMessages: number;
  navigateToSection: (section: string) => void;
}

const MessagesCard: React.FC<MessagesCardProps> = ({
  unreadMessages,
  navigateToSection
}) => {
  return (
    <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare size={18} className="text-gold" />
          Messages
        </CardTitle>
        <CardDescription className="text-white/60">
          Updates from our team
        </CardDescription>
      </CardHeader>
      <CardContent>
        {unreadMessages > 0 ? (
          <div className="flex items-center justify-between">
            <span>
              You have {unreadMessages} unread {Number(unreadMessages) === 1 ? 'message' : 'messages'}
            </span>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                navigateToSection("messages");
              }}
              className="text-gold hover:underline text-sm"
            >
              View all
            </a>
          </div>
        ) : (
          <p>No new messages at this time.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MessagesCard;
