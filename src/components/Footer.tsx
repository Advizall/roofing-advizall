
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-navy-600 pt-16 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <a href="#hero" className="block mb-6">
              <img src="/images/4811a69a-c3ba-4318-bb8c-d90d22539145.png" alt="PACC Solutions LLC" className="h-[76.8px]" style={{
              height: "76.8px"
            }} />
            </a>
            <p className="text-white/70 mb-6">
              Helping homeowners recover from storm damage with expertise and compassion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-navy-400 flex items-center justify-center hover:bg-gold transition-colors duration-300">
                <Facebook size={18} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-navy-400 flex items-center justify-center hover:bg-gold transition-colors duration-300">
                <Twitter size={18} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-navy-400 flex items-center justify-center hover:bg-gold transition-colors duration-300">
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
              <li><a href="#services" className="text-white/70 hover:text-gold transition-colors">Storm Damage Inspections</a></li>
              <li><a href="#services" className="text-white/70 hover:text-gold transition-colors">Insurance Claim Assistance</a></li>
              <li><a href="#services" className="text-white/70 hover:text-gold transition-colors">Roof Replacement & Repair</a></li>
              <li><a href="#services" className="text-white/70 hover:text-gold transition-colors">Window and Siding Restoration</a></li>
              <li><a href="#services" className="text-white/70 hover:text-gold transition-colors">Emergency Consultations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 gold-gradient">Contact Us</h3>
            <ul className="space-y-3">
              <li className="text-white/70">9150 Broadway Ave, Brookfield, IL 60513</li>
              <li><a href="tel:6125557890" className="text-white/70 hover:text-gold transition-colors">(612) 555-7890</a></li>
              <li><a href="mailto:contact@paccsolutions.com" className="text-white/70 hover:text-gold transition-colors">contact@paccsolutions.com</a></li>
              <li className="text-white/70">Mon-Fri: 9:00 AM - 5:00 PM</li>
              <li className="text-white/70">Sat-Sun: Closed (Emergency services available)</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 py-8 text-center">
          <p className="text-white/60">
            © {currentYear} PACC Solutions LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;
