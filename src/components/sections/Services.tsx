
import ServiceCard from '../ui/ServiceCard';
import { Clipboard, FileText, Home, Window, Phone } from 'lucide-react';

const Services = () => {
  const servicesList = [
    {
      icon: Clipboard,
      title: "Storm Damage Inspections",
      description: "Our certified inspectors thoroughly assess and document all damage to your property following severe weather events."
    },
    {
      icon: FileText,
      title: "Insurance Claim Assistance",
      description: "We handle the entire claims process, communicating directly with your insurance provider to ensure fair settlement."
    },
    {
      icon: Home,
      title: "Roof Replacement & Repair",
      description: "Expert installation of high-quality roofing systems with industry-leading warranties and superior craftsmanship."
    },
    {
      icon: Window,
      title: "Window and Siding Restoration",
      description: "Complete repair or replacement of damaged windows and siding to protect your home's integrity and appearance."
    },
    {
      icon: Phone,
      title: "Emergency Consultations",
      description: "Immediate response and guidance following storm damage to prevent further damage and begin recovery promptly."
    }
  ];

  return (
    <section id="services" className="section-padding bg-gradient-navy relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">
            Our <span className="gold-gradient">Services</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-white/80 reveal" style={{ animationDelay: '0.2s' }}>
            Comprehensive solutions to restore your home and provide peace of mind after storm damage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Services;
