import ServiceCard from '../ui/ServiceCard';
import { FileText, Home, Building, Hammer, Droplet, Wrench } from 'lucide-react';

const Services = () => {
  const servicesList = [
    {
      icon: Home,
      title: "Copper Roofing",
      description: "Custom copper roofing, siding, bays, cornices, specialty trim and standing seam panels crafted with precision."
    },
    {
      icon: FileText,
      title: "Slate Roofing",
      description: "Expert installation and repair of traditional slate roofing, providing timeless beauty and exceptional durability."
    },
    {
      icon: Droplet,
      title: "Rubber Roofing",
      description: "EPDM rubber roofing systems with certified application from Johns Manville & GenFlex for commercial and residential projects."
    },
    {
      icon: Building,
      title: "Asphalt Shingle Roofing",
      description: "Master Shingle Applicator certified installation of high-quality asphalt shingles with manufacturer warranties."
    },
    {
      icon: Hammer,
      title: "Masonry & Hardscape",
      description: "Pointing, stone walls, patios, steps, fireplaces, BBQ pits, walkways and stonewalls crafted with expert precision."
    },
    {
      icon: Wrench,
      title: "Gutters & Maintenance",
      description: "Custom OG and Half-Moon gutters, downspouts, cleaning services, and comprehensive roof inspections and waterproofing."
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
            Comprehensive roofing solutions for residential and commercial properties across New England.
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
