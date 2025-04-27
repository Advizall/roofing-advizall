import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, UserCheck, Users, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

// Simplified interface to avoid deep type instantiation
interface DashboardStats {
  totalContacts: number;
  totalConversations: number;
  uncontactedSubmissions: number;
  uncontactedConversations: number;
  totalUsers: number;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  created_at: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  contacted: boolean;
}

const DashboardSection = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    totalConversations: 0,
    uncontactedSubmissions: 0,
    uncontactedConversations: 0,
    totalUsers: 0
  });
  const [recentMessages, setRecentMessages] = useState<ChatMessage[]>([]);
  const [recentSubmissions, setRecentSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total users
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Fetch total form submissions
        const { count: contactsCount } = await supabase
          .from('contact_submissions')
          .select('*', { count: 'exact', head: true });

        // Fetch total conversations
        const { count: conversationsCount } = await supabase
          .from('chat_conversations')
          .select('*', { count: 'exact', head: true });

        // Fetch uncontacted submissions
        const { count: uncontactedSubmissions } = await supabase
          .from('contact_submissions')
          .select('*', { count: 'exact', head: true })
          .eq('contacted', false);

        // Fetch uncontacted conversations
        const { count: uncontactedConversations } = await supabase
          .from('chat_conversations')
          .select('*', { count: 'exact', head: true })
          .eq('contacted', false);

        // Fetch recent chat messages
        const { data: messages } = await supabase
          .from('chat_messages')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        // Fetch recent form submissions
        const { data: submissions } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        setStats({
          totalContacts: contactsCount || 0,
          totalConversations: conversationsCount || 0,
          uncontactedSubmissions: uncontactedSubmissions || 0,
          uncontactedConversations: uncontactedConversations || 0,
          totalUsers: usersCount || 0
        });

        if (messages) setRecentMessages(messages);
        if (submissions) setRecentSubmissions(submissions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gold/80">
          Overview of website activity and customer interactions
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-navy-300 border-gold/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-gold flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Form Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalContacts}</div>
          </CardContent>
          <CardFooter className="pt-0">
            <CardDescription className="text-white/60">
              {stats.uncontactedSubmissions} need follow-up
            </CardDescription>
          </CardFooter>
        </Card>
        
        <Card className="bg-navy-300 border-gold/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-gold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Chat Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalConversations}</div>
          </CardContent>
          <CardFooter className="pt-0">
            <CardDescription className="text-white/60">
              {stats.uncontactedConversations} need follow-up
            </CardDescription>
          </CardFooter>
        </Card>
        
        <Card className="bg-navy-300 border-gold/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-gold flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Completed Follow-ups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats.totalContacts + stats.totalConversations - stats.uncontactedSubmissions - stats.uncontactedConversations}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-navy-300 border-gold/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-gold flex items-center gap-2">
              <Users className="h-5 w-5" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalUsers}</div>
          </CardContent>
          <CardFooter className="pt-0">
            <CardDescription className="text-white/60">
              Registered accounts
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-navy-300 border-gold/20 text-white">
          <CardHeader>
            <CardTitle className="text-gold">Recent Form Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-white/60">Loading recent form submissions...</p>
            ) : recentSubmissions.length === 0 ? (
              <p className="text-white/60">No recent form submissions.</p>
            ) : (
              <div className="space-y-4">
                {recentSubmissions.map((submission) => (
                  <div key={submission.id} className="border-b border-gold/10 last:border-0 pb-3 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-white">{submission.name}</p>
                        <p className="text-sm text-white/60">{submission.email}</p>
                      </div>
                      <span className="text-xs text-white/40">
                        {format(new Date(submission.created_at), 'MMM d, HH:mm')}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-white/80 line-clamp-2">
                      {submission.message}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        submission.contacted
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-amber-900/30 text-amber-400'
                      }`}>
                        {submission.contacted ? 'Contacted' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-navy-300 border-gold/20 text-white">
          <CardHeader>
            <CardTitle className="text-gold">Recent Chat Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-white/60">Loading recent chat conversations...</p>
            ) : recentMessages.length === 0 ? (
              <p className="text-white/60">No recent chat messages.</p>
            ) : (
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="border-b border-gold/10 last:border-0 pb-3 last:pb-0">
                    <div className="flex items-start justify-between">
                      <p className="font-medium text-white">{message.sender}</p>
                      <span className="text-xs text-white/40">
                        {format(new Date(message.created_at), 'MMM d, HH:mm')}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-white/80 line-clamp-2">
                      {message.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSection;
