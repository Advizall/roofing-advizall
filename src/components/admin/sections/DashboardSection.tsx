
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, UserCheck, Users } from 'lucide-react';

// Simplified interface to avoid deep type instantiation
interface DashboardStats {
  totalContacts: number;
  totalConversations: number;
  uncontactedSubmissions: number;
  uncontactedConversations: number;
}

const DashboardSection = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    totalConversations: 0,
    uncontactedSubmissions: 0,
    uncontactedConversations: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
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

        setStats({
          totalContacts: contactsCount || 0,
          totalConversations: conversationsCount || 0,
          uncontactedSubmissions: uncontactedSubmissions || 0,
          uncontactedConversations: uncontactedConversations || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
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
            <div className="text-3xl font-bold">--</div>
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
            <p className="text-white/60">
              Loading recent form submissions...
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-navy-300 border-gold/20 text-white">
          <CardHeader>
            <CardTitle className="text-gold">Recent Chat Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/60">
              Loading recent chat conversations...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSection;
