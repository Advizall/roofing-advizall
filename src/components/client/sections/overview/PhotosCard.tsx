
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Image } from 'lucide-react';

interface PhotosCardProps {
  navigateToSection: (section: string) => void;
}

const PhotosCard: React.FC<PhotosCardProps> = ({ navigateToSection }) => {
  return (
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
  );
};

export default PhotosCard;
