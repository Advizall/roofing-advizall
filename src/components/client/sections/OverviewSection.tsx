
import React from 'react';
import WelcomeHeader from './overview/WelcomeHeader';
import ProjectStatusCard from './overview/ProjectStatusCard';
import MessagesCard from './overview/MessagesCard';
import DocumentsCard from './overview/DocumentsCard';
import PhotosCard from './overview/PhotosCard';
import HelpCard from './overview/HelpCard';

interface OverviewSectionProps {
  clientName: string;
  profile: any;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ clientName, profile }) => {
  // This would be dynamic data from the backend in a real implementation
  const projectStatus = 'In Progress';
  const projectPhase = 'Inspection';
  const unreadMessages = 3;
  const pendingDocuments = 1;
  const projectCompletion = 25; // percentage
  
  const navigateToSection = (section: string) => {
    const element = document.querySelector(`[data-section="${section}"]`);
    if (element) {
      (element as HTMLElement).click();
    }
  };
  
  return (
    <div className="space-y-6">
      <WelcomeHeader clientName={clientName} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProjectStatusCard 
          projectStatus={projectStatus}
          projectPhase={projectPhase}
          projectCompletion={projectCompletion}
        />
        
        <MessagesCard 
          unreadMessages={unreadMessages}
          navigateToSection={navigateToSection}
        />
        
        <DocumentsCard 
          pendingDocuments={pendingDocuments}
          navigateToSection={navigateToSection}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PhotosCard navigateToSection={navigateToSection} />
        <HelpCard navigateToSection={navigateToSection} />
      </div>
    </div>
  );
};

export default OverviewSection;
