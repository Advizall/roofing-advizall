
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { MessageCircle } from 'lucide-react';

const MessagesSection: React.FC = () => {
  // This would come from your backend in a real implementation
  const messages = [
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Messages</h1>
        <p className="text-white/70">
          Communication from our team regarding your project
        </p>
      </div>
      
      <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
        <CardHeader>
          <CardTitle>Your Messages</CardTitle>
          <CardDescription className="text-white/60">
            Updates and notifications from our team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.length > 0 ? (
              messages.map((message) => (
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
              ))
            ) : (
              <div className="text-center py-8">
                <MessageCircle size={48} className="mx-auto text-white/30 mb-4" />
                <h3 className="text-lg font-medium mb-1">No messages yet</h3>
                <p className="text-white/60">
                  When our team sends you updates, they will appear here
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesSection;
