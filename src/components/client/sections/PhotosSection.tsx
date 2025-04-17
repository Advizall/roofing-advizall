
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image, Calendar, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PhotosSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('project-photos');
  
  // This would come from your backend in a real implementation
  const projectPhotos = [
    { id: 1, date: '04/10/2025', category: 'Inspection', url: '/placeholder.svg' },
    { id: 2, date: '04/10/2025', category: 'Inspection', url: '/placeholder.svg' },
    { id: 3, date: '04/10/2025', category: 'Inspection', url: '/placeholder.svg' },
    { id: 4, date: '04/12/2025', category: 'Materials', url: '/placeholder.svg' },
    { id: 5, date: '04/12/2025', category: 'Materials', url: '/placeholder.svg' },
    { id: 6, date: '04/12/2025', category: 'Materials', url: '/placeholder.svg' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Project Photos</h1>
        <p className="text-white/70">
          View photos of your project and upload your own images
        </p>
      </div>
      
      <Tabs 
        defaultValue="project-photos" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-navy-300 text-white mb-6">
          <TabsTrigger 
            value="project-photos"
            className="data-[state=active]:bg-gold data-[state=active]:text-navy-500"
          >
            <Image size={16} className="mr-2" />
            Project Photos
          </TabsTrigger>
          <TabsTrigger 
            value="upload-photos"
            className="data-[state=active]:bg-gold data-[state=active]:text-navy-500"
          >
            <UploadCloud size={16} className="mr-2" />
            Upload Photos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="project-photos">
          <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
            <CardHeader>
              <CardTitle>Project Progress Photos</CardTitle>
              <CardDescription className="text-white/60">
                Photos taken by our team during your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {projectPhotos.map((photo) => (
                  <div key={photo.id} className="overflow-hidden rounded-md">
                    <div className="aspect-square relative group">
                      <img 
                        src={photo.url} 
                        alt={`Project photo ${photo.id}`}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                        <div className="flex items-center text-white text-sm">
                          <Calendar size={14} className="mr-1" />
                          <span>{photo.date}</span>
                        </div>
                        <div className="text-white text-sm font-medium">
                          {photo.category}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upload-photos">
          <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
            <CardHeader>
              <CardTitle>Upload Your Photos</CardTitle>
              <CardDescription className="text-white/60">
                Share photos of your project or any issues you'd like us to address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                <UploadCloud size={48} className="mx-auto text-white/40 mb-4" />
                <h3 className="text-lg font-medium mb-2">Drag and drop your photos here</h3>
                <p className="text-white/60 mb-6 max-w-md mx-auto">
                  Or click the button below to select photos from your device
                </p>
                <Button className="bg-gold hover:bg-gold-400 text-navy-500">
                  Select Photos
                </Button>
                <p className="mt-4 text-sm text-white/50">
                  Supported formats: JPG, PNG, HEIC. Maximum file size: 10MB
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PhotosSection;
