
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface HelpCardProps {
  navigateToSection: (section: string) => void;
}

const HelpCard: React.FC<HelpCardProps> = ({ navigateToSection }) => {
  return (
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
  );
};

export default HelpCard;
