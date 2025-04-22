
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
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

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
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-gold font-semibold">Client Portal</h2>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={activeSection === item.id}
                onClick={() => setActiveSection(item.id)}
                tooltip={item.label}
                className="w-full"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default ClientSidebar;
