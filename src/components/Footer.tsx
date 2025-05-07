import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-navy-600 pt-16 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <a href="#hero" className="block mb-6">
              <img src="/images/4811a69a-c3ba-4318-bb8c-d90d22539145.png" alt="The Dirty Roofer" className="h-[76.8px]" style={{
              height: "76.8px"
            }} />
            </a>
            <p className="text-white/70 mb-6">
              A collection of the most talented roofing specialists serving New England for almost 20 years.
            </p>
            <div className="flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-navy-400 flex items-center justify-center hover:bg-gold transition-colors duration-300">
                <Facebook size={18} className="text-white" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-navy-400 flex items-center justify-center hover:bg-gold transition-colors duration-300">
                <Youtube size={18} className="text-white" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-navy-400 flex items-center justify-center hover:bg-gold transition-colors duration-300">
                <Instagram size={18} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-navy-400 flex items-center justify-center hover:bg-gold transition-colors duration-300">
                <Linkedin size={18} className="text-white" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 gold-gradient">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#hero" className="text-white/70 hover:text-gold transition-colors">Home</a></li>
              <li><a href="#about" className="text-white/70 hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#services" className="text-white/70 hover:text-gold transition-colors">Services</a></li>
              <li><a href="#process" className="text-white/70 hover:text-gold transition-colors">Process</a></li>
              <li><a href="#testimonials" className="text-white/70 hover:text-gold transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-white/70 hover:text-gold transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 gold-gradient">Services</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-white/70 hover:text-gold transition-colors">Copper Roofing</a></li>
              <li><a href="#services" className="text-white/70 hover:text-gold transition-colors">Slate Roofing</a></li>
              <li><a href="#services" className="text-white/70 hover:text-gold transition-colors">Rubber Roofing (EPDM)</a></li>
              <li><a href="#services" className="text-white/70 hover:text-gold transition-colors">Asphalt Shingle Roofing</a></li>
              <li><a href="#services" className="text-white/70 hover:text-gold transition-colors">Masonry & Custom Copper Work</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 gold-gradient">Contact Us</h3>
            <ul className="space-y-3">
              <li className="text-white/70">85 Willow Court, Boston, MA 02196</li>
              <li><a href="tel:6172338489" className="text-white/70 hover:text-gold transition-colors">1-617-233-8489 (ask for Brendan)</a></li>
              <li><a href="mailto:roofereamon@gmail.com" className="text-white/70 hover:text-gold transition-colors">roofereamon@gmail.com</a></li>
              <li className="text-white/70">Mon-Fri: 8:00 AM - 6:00 PM</li>
              <li className="text-white/70">Sat: 9:00 AM - 2:00 PM | Sun: Closed</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 py-8 text-center">
          <p className="text-white/60">
            © {currentYear} Eamon Geraghty dba Dirty Roofer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;
