
import ServiceCard from '../ui/ServiceCard';
import { Clipboard, FileText, Home, Building, Phone } from 'lucide-react';

const Services = () => {
  const servicesList = [
    {
      icon: Clipboard,
      title: "Insurance Claim Management",
      description: "We handle the entire insurance claim process from documentation to final settlement negotiation."
    },
    {
      icon: FileText,
      title: "Damage Assessment",
      description: "Professional evaluation of storm damage to determine the full extent of repairs needed for your insurance claim."
    },
    {
      icon: Home,
      title: "Roof Repair & Replacement",
      description: "Expert installation of high-quality roofing systems with industry-leading warranties and superior craftsmanship."
    },
    {
      icon: Building,
      title: "Window and Siding Restoration",
      description: "Complete repair or replacement of damaged windows and siding to protect your home's integrity and appearance."
    },
    {
      icon: Phone,
      title: "24/7 Emergency Response",
      description: "Immediate assistance following storm damage, including temporary repairs to prevent further damage to your property."
    }
  ];

  return (
    <section id="services" className="section-padding bg-navy-400 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">
            Our <span className="gold-gradient">Services</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-white/80 reveal" style={{ animationDelay: '0.2s' }}>
            Comprehensive solutions for homeowners dealing with storm damage and insurance claims.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div 
              key={index} 
              className="reveal" 
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-gold/10 to-transparent opacity-30 blur-3xl"></div>
    </section>
  );
};

export default Services;
