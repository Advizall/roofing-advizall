import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { List, CheckCircle2 } from 'lucide-react';
import VideoPlayer from '@/components/ui/VideoPlayer';

const VideoSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Process Explanation</h1>
        <p className="text-white/70">
          Learn about our project process from start to finish
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
            <CardHeader>
              <CardTitle>Our Process Explained</CardTitle>
              <CardDescription className="text-white/60">
                Watch this video to understand how we'll handle your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VideoPlayer 
                url="https://www.youtube.com/watch?v=0V11iemMsB8" 
                title="The Dirty Roofer Process Explanation"
                className="aspect-video rounded-md overflow-hidden shadow-gold"
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10 h-full">
            <CardHeader>
              <CardTitle>What You'll Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  'Initial inspection process',
                  'Material selection guidelines',
                  'Construction timeline expectations',
                  'Quality control measures',
                  'Final inspection procedure',
                  'Warranty information',
                  'Payment schedule details'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="font-medium flex items-center gap-2 mb-3">
                  <List size={16} className="text-gold" />
                  Additional Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gold hover:underline text-sm">
                      Download Process Guide (PDF)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gold hover:underline text-sm">
                      Materials Overview
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gold hover:underline text-sm">
                      Frequently Asked Questions
                    </a>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
