
import React from 'react';
import { 
  HomeIcon, 
  FileText, 
  Image, 
  MessageSquare, 
  Flag, 
  PenTool, 
  Video, 
  HelpCircle, 
  MapPin, 
  CalendarIcon 
} from 'lucide-react';

interface ClientSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({ 
  activeSection, 
  setActiveSection 
}) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: HomeIcon },
    { id: 'process', label: 'Project Status', icon: CalendarIcon },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'photos', label: 'Project Photos', icon: Image },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'report', label: 'Report Issue', icon: Flag },
    { id: 'sign', label: 'Digital Signature', icon: PenTool },
    { id: 'video', label: 'Process Video', icon: Video },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'map', label: 'Service Map', icon: MapPin },
  ];

  return (
    <div className="w-full md:w-64 bg-navy-300 border-r border-gold/20">
      <div className="p-4">
        <h2 className="text-gold font-semibold mb-6 pl-2">Client Portal</h2>
        
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm 
                ${activeSection === item.id 
                  ? 'bg-gold/20 text-white font-medium' 
                  : 'text-white/70 hover:text-white hover:bg-navy-200'
                }
                transition-colors
              `}
            >
              <item.icon size={18} className={activeSection === item.id ? 'text-gold' : ''} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientSidebar;
