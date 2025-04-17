
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, FileText, Image, MessageSquare, AlertCircle } from 'lucide-react';

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
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">
          Welcome back, {clientName || 'Client'}
        </h1>
        <p className="text-white/70">
          Here's an overview of your project with PACC Solutions
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarIcon size={18} className="text-gold" />
              Project Status
            </CardTitle>
            <CardDescription className="text-white/60">
              Current phase of your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span>Status:</span>
                <span className="font-semibold text-gold">{projectStatus}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Current Phase:</span>
                <span className="font-semibold text-gold">{projectPhase}</span>
              </div>
              <div className="mt-2">
                <div className="w-full bg-navy-200 rounded-full h-2">
                  <div 
                    className="bg-gold h-2 rounded-full" 
                    style={{ width: `${projectCompletion}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-white/70">
                  <span>0%</span>
                  <span>{projectCompletion}% Complete</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
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
                <span>You have {unreadMessages} unread {unreadMessages === 1 ? 'message' : 'messages'}</span>
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
        
        <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText size={18} className="text-gold" />
              Documents
            </CardTitle>
            <CardDescription className="text-white/60">
              Your project documentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pendingDocuments > 0 ? (
              <div className="flex items-center justify-between">
                <span>
                  {pendingDocuments} {pendingDocuments === 1 ? 'document' : 'documents'} {pendingDocuments === 1 ? 'requires' : 'require'} your signature
                </span>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection("documents");
                  }}
                  className="text-gold hover:underline text-sm"
                >
                  View
                </a>
              </div>
            ) : (
              <p>All documents are up to date.</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Image size={18} className="text-gold" />
              Recent Photos
            </CardTitle>
            <CardDescription className="text-white/60">
              Latest project images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {/* Placeholder for project images */}
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="aspect-square bg-navy-200 rounded flex items-center justify-center"
                >
                  <Image size={24} className="text-white/30" />
                </div>
              ))}
            </div>
            <div className="mt-2 text-right">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  navigateToSection("photos");
                }}
                className="text-gold hover:underline text-sm"
              >
                View all photos
              </a>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle size={18} className="text-gold" />
              Need Help?
            </CardTitle>
            <CardDescription className="text-white/60">
              We're here to assist you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              If you have any questions or encounter any issues with your project, 
              our team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  navigateToSection("faq");
                }}
                className="text-gold hover:underline text-sm"
              >
                Check our FAQ
              </a>
              <span className="hidden sm:inline text-white/30">|</span>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  navigateToSection("report");
                }}
                className="text-gold hover:underline text-sm"
              >
                Report an issue
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewSection;
