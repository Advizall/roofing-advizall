
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FilePdf, FileText, Download, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DocumentsSection: React.FC = () => {
  // This would come from your backend in a real implementation
  const documents = [
    { 
      id: 1, 
      name: 'Project Contract', 
      date: '04/10/2025', 
      type: 'pdf', 
      status: 'Signed',
      signedDate: '04/12/2025'  
    },
    { 
      id: 2, 
      name: 'Material Specifications', 
      date: '04/10/2025', 
      type: 'pdf', 
      status: 'Viewed',
      signedDate: null  
    },
    { 
      id: 3, 
      name: 'Insurance Documentation', 
      date: '04/11/2025', 
      type: 'pdf', 
      status: 'Pending Signature',
      signedDate: null  
    },
    { 
      id: 4, 
      name: 'Project Timeline', 
      date: '04/12/2025', 
      type: 'doc', 
      status: 'Unread',
      signedDate: null  
    },
  ];

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'pdf':
        return <FilePdf size={18} className="text-red-400" />;
      default:
        return <FileText size={18} className="text-blue-400" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'Signed':
        return 'text-green-400';
      case 'Pending Signature':
        return 'text-gold';
      case 'Unread':
        return 'text-red-300';
      default:
        return 'text-white/70';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Project Documents</h1>
        <p className="text-white/70">
          View and sign your project documentation
        </p>
      </div>
      
      <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
        <CardHeader>
          <CardTitle>Your Documents</CardTitle>
          <CardDescription className="text-white/60">
            All documentation related to your project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-navy-200">
              <TableRow className="border-gold/10 hover:bg-navy-100">
                <TableHead className="text-white w-[40px]"></TableHead>
                <TableHead className="text-white">Document</TableHead>
                <TableHead className="text-white">Date Added</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id} className="border-gold/10 hover:bg-navy-200">
                  <TableCell>{getFileIcon(doc.type)}</TableCell>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell>
                    <span className={getStatusClass(doc.status)}>
                      {doc.status}
                    </span>
                    {doc.signedDate && (
                      <div className="text-xs text-white/50 mt-1">
                        Signed on {doc.signedDate}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-white/70 border-white/20 hover:bg-navy-100"
                      >
                        <Download size={14} />
                        <span className="sr-only">Download</span>
                      </Button>
                      
                      {doc.status === 'Pending Signature' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 px-2 flex items-center gap-1 text-gold border-gold/30 hover:bg-gold/10"
                        >
                          <PenTool size={14} />
                          <span className="text-xs">Sign</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsSection;
