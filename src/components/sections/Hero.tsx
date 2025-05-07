import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-navy-500/70 z-10"></div>
        <img 
          src="/images/types-of-roofing-section-2.jpg.avif" 
          alt="American home with stylish roof" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 py-24 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="reveal">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              <span className="block">The Dirty Roofer.</span>
              <span className="gold-gradient">Serving Boston and surrounding communities</span>
            </h1>
          </div>
          
          <div className="reveal" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl md:text-2xl mb-10 text-white/90 leading-relaxed drop-shadow-md">
              The Dirty Roofer is a family-owned business with almost 20 years of experience in New England, offering expert residential and commercial roofing services.
            </p>
          </div>
          
          <div className="reveal" style={{ animationDelay: '0.4s' }}>
            <a 
              href="#contact" 
              className="btn-primary text-lg inline-flex items-center shadow-lg hover:shadow-xl transition-all"
            >
              Get a Free Estimate
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <a href="#about" className="text-white/70 hover:text-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-full p-2">
          <ArrowDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
