import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [{
    name: 'Home',
    href: '#hero'
  }, {
    name: 'About',
    href: '#about'
  }, {
    name: 'Services',
    href: '#services'
  }, {
    name: 'Process',
    href: '#process'
  }, {
    name: 'Testimonials',
    href: '#testimonials'
  }, {
    name: 'Contact',
    href: '#contact'
  }];
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-navy-400/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#hero" className="flex items-center">
            <img src="/lovable-uploads/4811a69a-c3ba-4318-bb8c-d90d22539145.png" alt="PACC Solutions LLC" style={{
            height: "76.8px"
          }} className="h-[100.8px]" />
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>)}
            <a href="#contact" className="btn-primary ml-4">
              Get a Free Inspection
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white focus:outline-none" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={28} className="text-gold" /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && <div className="md:hidden bg-navy-300/95 backdrop-blur-lg">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map(link => <a key={link.name} href={link.href} className="text-white hover:text-gold py-2 text-lg font-medium transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </a>)}
              <a href="#contact" className="btn-primary text-center mt-4" onClick={() => setIsMobileMenuOpen(false)}>
                Get a Free Inspection
              </a>
            </nav>
          </div>
        </div>}
    </header>;
};
export default Navbar;