
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface DocumentsCardProps {
  pendingDocuments: number;
  navigateToSection: (section: string) => void;
}

const DocumentsCard: React.FC<DocumentsCardProps> = ({
  pendingDocuments,
  navigateToSection
}) => {
  return (
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
  );
};

export default DocumentsCard;
