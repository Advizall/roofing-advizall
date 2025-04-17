
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Home, CheckCircle2 } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapSectionProps {
  profile?: any;
}

// Temporary Mapbox token (replace with your own in production)
const MAPBOX_TOKEN = 'pk.eyJ1IjoibG92YWJsZWFpIiwiYSI6ImNscnlvODhyYjAwcGYyaW85dzZnNzFocnQifQ.up8FwYOFwtvx9dugahy7hA';

// Project locations
const projectLocations = [
  {
    id: 1,
    coordinates: [-87.743848, 41.676150],
    title: 'Project Site 1',
    description: 'Roof repair completed Jan 2023'
  },
  {
    id: 2,
    coordinates: [-87.791436, 41.699019],
    title: 'Project Site 2',
    description: 'Siding installation Mar 2023'
  },
  {
    id: 3,
    coordinates: [-87.806638, 41.658869],
    title: 'Project Site 3',
    description: 'Solar panel installation Dec 2022'
  }
];

const MapSection: React.FC<MapSectionProps> = ({ profile }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

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

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-87.773, 41.680], // Center between all markers
      zoom: 11.5,
    });

    // Add navigation controls
    newMap.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    newMap.on('load', () => {
      setMapLoaded(true);
      
      // Add markers for project locations
      projectLocations.forEach(location => {
        // Create a custom marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'custom-marker';
        markerEl.style.width = '32px';
        markerEl.style.height = '32px';
        markerEl.style.backgroundImage = 'url(/images/logo.png)';
        markerEl.style.backgroundSize = 'cover';
        markerEl.style.borderRadius = '50%';
        markerEl.style.border = '2px solid #D4AF37'; // Gold color
        markerEl.style.cursor = 'pointer';
        
        // Create and add the marker
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3 style="font-weight:bold">${location.title}</h3><p>${location.description}</p>`);
        
        new mapboxgl.Marker(markerEl)
          .setLngLat(location.coordinates)
          .setPopup(popup)
          .addTo(newMap);
      });
    });

    map.current = newMap;

    // Cleanup
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

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
              <div className="aspect-video bg-navy-200 rounded-md relative">
                <div ref={mapContainer} className="absolute inset-0 rounded-md" />
                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
                  </div>
                )}
              </div>
              <div className="mt-4 text-sm text-white/60">
                <p>Map shows completed PACC projects in your area. Click on markers to see project details.</p>
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
