
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-navy-500/80 z-10"></div>
        <img 
          src="/roof-repair.jpg" 
          alt="Home roof repair" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 py-24 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="reveal">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="block">Protecting Your Home.</span>
              <span className="gold-gradient">Guiding Your Claims.</span>
            </h1>
          </div>
          
          <div className="reveal" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl md:text-2xl mb-10 text-white/90 leading-relaxed">
              PACC Solutions LLC offers expert support for homeowners facing storm damage – from inspection to insurance negotiation and full restoration.
            </p>
          </div>
          
          <div className="reveal" style={{ animationDelay: '0.4s' }}>
            <a 
              href="#contact" 
              className="btn-primary text-lg inline-flex items-center"
            >
              Get a Free Inspection
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <a href="#about" className="text-white/70 hover:text-gold transition-colors">
          <ArrowDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
