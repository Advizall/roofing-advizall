
import React from 'react';
import DashboardSection from './sections/DashboardSection';
import ContactsSection from './sections/ContactsSection';
import ConversationsSection from './sections/ConversationsSection';
import UsersSection from './sections/UsersSection';
import LogsSection from './sections/LogsSection';

interface AdminContentProps {
  activeSection: string;
}

const AdminContent: React.FC<AdminContentProps> = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection />;
      case 'contacts':
        return <ContactsSection />;
      case 'conversations':
        return <ConversationsSection />;
      case 'users':
        return <UsersSection />;
      case 'logs':
        return <LogsSection />;
      default:
        return <DashboardSection />;
    }
  };

  return (
    <div className="flex-1 bg-navy-100 p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminContent;
