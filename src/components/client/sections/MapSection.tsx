
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Home, CheckCircle2 } from 'lucide-react';

interface MapSectionProps {
  profile?: any;
}

const MapSection: React.FC<MapSectionProps> = ({ profile }) => {
  // This would come from your backend in a real implementation
  const localStats = {
    zipCode: profile?.zip_code || '12345',
    projectsInArea: 37,
    projectsInCity: 245,
    nearestProject: '0.8 miles away',
    serviceArea: 'Within primary service area',
    completedProjects: {
      roofing: 157,
      siding: 89,
      solar: 42,
      windows: 68
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Service Map</h1>
        <p className="text-white/70">
          Explore our service areas and projects in your neighborhood
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
            <CardHeader>
              <CardTitle>Service Area Map</CardTitle>
              <CardDescription className="text-white/60">
                Locations where we've completed projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-navy-200 rounded-md flex items-center justify-center relative">
                {/* In a real implementation, this would be replaced with an actual map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin size={48} className="text-gold" />
                </div>
                <p className="text-white/50 absolute bottom-4 left-4">
                  Interactive map would be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
            <CardHeader>
              <CardTitle>Local Project Stats</CardTitle>
              <CardDescription className="text-white/60">
                Based on your location ({localStats.zipCode})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gold/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Home size={18} className="text-gold" />
                    <h3 className="font-medium text-gold">In Your Neighborhood</h3>
                  </div>
                  <p className="text-3xl font-bold">
                    {localStats.projectsInArea}
                  </p>
                  <p className="text-white/70 text-sm">
                    Projects completed in your ZIP code
                  </p>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between">
                    <span className="text-white/70">Nearest Project:</span>
                    <span className="font-medium">{localStats.nearestProject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Projects in Your City:</span>
                    <span className="font-medium">{localStats.projectsInCity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Service Coverage:</span>
                    <span className="font-medium text-green-400 flex items-center gap-1">
                      <CheckCircle2 size={14} />
                      {localStats.serviceArea}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4 mt-4 border-t border-white/10">
                  <h3 className="font-medium mb-3">Projects By Type</h3>
                  <div className="space-y-2">
                    {Object.entries(localStats.completedProjects).map(([type, count]) => (
                      <div key={type} className="flex justify-between items-center">
                        <span className="capitalize">{type}</span>
                        <span className="bg-navy-200 px-2 py-0.5 rounded text-sm">
                          {count} projects
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
