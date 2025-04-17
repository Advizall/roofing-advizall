
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MessageHeader from './messages/MessageHeader';
import MessagesContainer from './messages/MessagesContainer';
import { toast } from '@/components/ui/use-toast';
import type { Message } from './messages/MessageCard';

const MessagesSection: React.FC = () => {
  // This would come from your backend in a real implementation
  const messages: Message[] = [
    { 
      id: 1, 
      sender: 'Project Manager', 
      avatar: '/placeholder.svg',
      content: 'Your inspection has been completed. We\'ve uploaded the photos to your portal for your review.',
      date: '04/10/2025', 
      time: '10:30 AM', 
      read: true 
    },
    { 
      id: 2, 
      sender: 'Installation Team', 
      avatar: '/placeholder.svg',
      content: 'We\'ve scheduled your installation for next Monday, April 15th at 8:00 AM. Please ensure someone will be home to provide access.',
      date: '04/12/2025', 
      time: '3:45 PM', 
      read: false 
    },
    { 
      id: 3, 
      sender: 'Materials Coordinator', 
      avatar: '/placeholder.svg',
      content: 'Your materials have been ordered and are expected to arrive on site by this Friday.',
      date: '04/13/2025', 
      time: '11:15 AM', 
      read: false 
    },
    { 
      id: 4, 
      sender: 'Customer Support', 
      avatar: '/placeholder.svg',
      content: 'Is there anything else you need assistance with regarding your project? Please let us know if you have any questions.',
      date: '04/14/2025', 
      time: '9:00 AM', 
      read: false 
    },
  ];

  const markAsRead = (messageId: number) => {
    // In a real implementation, this would update the backend
    toast({
      title: "Message marked as read",
      description: `Message ID: ${messageId}`,
    });
  };

  return (
    <div className="space-y-6">
      <MessageHeader />
      
      <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
        <CardHeader>
          <CardTitle>Your Messages</CardTitle>
          <CardDescription className="text-white/60">
            Updates and notifications from our team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MessagesContainer messages={messages} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesSection;
