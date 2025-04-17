
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import OverviewSection from './sections/OverviewSection';
import ProcessSection from './sections/ProcessSection';
import DocumentsSection from './sections/DocumentsSection';
import PhotosSection from './sections/PhotosSection';
import MessagesSection from './sections/MessagesSection';
import ReportSection from './sections/ReportSection';
import SignatureSection from './sections/SignatureSection';
import VideoSection from './sections/VideoSection';
import FaqSection from './sections/FaqSection';
import MapSection from './sections/MapSection';

interface ClientContentProps {
  activeSection: string;
}

const ClientContent: React.FC<ClientContentProps> = ({ activeSection }) => {
  const [clientName, setClientName] = useState('');
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const getProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (data) {
          setProfile(data);
          setClientName(data.full_name || data.username || '');
        }
      }
    };
    
    getProfile();
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection clientName={clientName} profile={profile} />;
      case 'process':
        return <ProcessSection />;
      case 'documents':
        return <DocumentsSection />;
      case 'photos':
        return <PhotosSection />;
      case 'messages':
        return <MessagesSection />;
      case 'report':
        return <ReportSection />;
      case 'sign':
        return <SignatureSection />;
      case 'video':
        return <VideoSection />;
      case 'faq':
        return <FaqSection />;
      case 'map':
        return <MapSection profile={profile} />;
      default:
        return <OverviewSection clientName={clientName} profile={profile} />;
    }
  };

  return (
    <div className="flex-1 bg-navy-100 p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default ClientContent;
