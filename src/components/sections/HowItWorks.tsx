
import React from 'react';
import VideoPlayer from '../ui/VideoPlayer';

const HowItWorks = () => {
  return (
    <section id="process" className="section-padding bg-navy-300 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">
            How It <span className="gold-gradient">Works</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto reveal" style={{ animationDelay: '0.2s' }}>
          <VideoPlayer 
            url="https://www.youtube.com/watch?v=0V11iemMsB8" 
            title="Our Restoration Process"
            className="aspect-video shadow-gold"
          />
          
          <div className="mt-4 text-xs text-center text-white/60">
            Video: Complete Home Restoration Process
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-gold/10 to-transparent opacity-30 blur-3xl"></div>
    </section>
  );
};

export default HowItWorks;
