
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePen, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SignatureSection: React.FC = () => {
  // This would come from your backend in a real implementation
  const documentsToSign = [
    { 
      id: 1, 
      name: 'Project Contract', 
      type: 'Contract', 
      status: 'Pending', 
      deadline: '04/20/2025' 
    },
    { 
      id: 2, 
      name: 'Insurance Form', 
      type: 'Insurance', 
      status: 'Pending', 
      deadline: '04/22/2025' 
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Digital Signature</h1>
        <p className="text-white/70">
          Sign your project documents electronically
        </p>
      </div>
      
      <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
        <CardHeader>
          <CardTitle>Documents Requiring Signature</CardTitle>
          <CardDescription className="text-white/60">
            The following documents need your electronic signature
          </CardDescription>
        </CardHeader>
        <CardContent>
          {documentsToSign.length > 0 ? (
            <Table>
              <TableHeader className="bg-navy-200">
                <TableRow className="border-gold/10 hover:bg-navy-100">
                  <TableHead className="text-white">Document</TableHead>
                  <TableHead className="text-white">Type</TableHead>
                  <TableHead className="text-white">Deadline</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documentsToSign.map((doc) => (
                  <TableRow key={doc.id} className="border-gold/10 hover:bg-navy-200">
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.deadline}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-gold/20 text-gold rounded-full text-xs">
                        {doc.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        className="bg-gold hover:bg-gold-400 text-navy-500 w-full flex items-center gap-1"
                        size="sm"
                      >
                        <FilePen size={14} />
                        <span>Sign</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <FilePen size={48} className="mx-auto text-white/30 mb-4" />
              <h3 className="text-lg font-medium mb-1">No documents to sign</h3>
              <p className="text-white/60">
                All your documents are up to date
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
        <CardHeader>
          <CardTitle>About Electronic Signatures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 bg-navy-200/50 p-4 rounded-lg">
            <Info size={24} className="text-gold flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <p className="text-white/80">
                Our electronic signature system is secure and legally binding. All signatures comply with the Electronic Signatures in Global and National Commerce Act (ESIGN) and the Uniform Electronic Transactions Act (UETA).
              </p>
              <p className="text-white/80">
                When you electronically sign a document:
              </p>
              <ul className="list-disc list-inside space-y-1 text-white/80">
                <li>A unique digital fingerprint is created</li>
                <li>The document is sealed and timestamped</li>
                <li>You'll receive a PDF copy via email for your records</li>
                <li>The signed document will always be available in your client portal</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignatureSection;
