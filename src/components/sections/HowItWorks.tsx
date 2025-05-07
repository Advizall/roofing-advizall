import React from 'react';

const ProcessCard = ({ number, title, description, delay }) => {
  return (
    <div 
      className="glass-card p-6 md:p-8 flex flex-col h-full reveal" 
      style={{ animationDelay: delay }}
    >
      <div className="flex items-center mb-4">
        <span className="text-gold text-xl md:text-2xl font-bold mr-3">{number}</span>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-white/80 leading-relaxed">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  const processes = [
    {
      number: "01",
      title: "Initial Contact",
      description: "Reach out to us at 1-617-233-8489 or via email at roofereamon@gmail.com for an immediate response. We're ready to discuss your roofing needs."
    },
    {
      number: "02",
      title: "Free Estimate",
      description: "We provide free estimates for all roofing projects. Our specialists will assess your needs and provide a detailed quote with no obligation."
    },
    {
      number: "03",
      title: "Project Planning",
      description: "Once you approve the estimate, we'll schedule your project, select materials, and prepare a comprehensive plan tailored to your specific requirements."
    },
    {
      number: "04",
      title: "Expert Installation",
      description: "Our skilled team executes the project with precision and care, using quality materials and adhering to the highest industry standards."
    },
    {
      number: "05",
      title: "Final Inspection",
      description: "We thoroughly inspect all completed work to ensure everything meets our rigorous quality standards and your complete satisfaction."
    },
    {
      number: "06",
      title: "Warranty & Support",
      description: "We stand behind our work with comprehensive warranties on workmanship and remain available for any future maintenance or support needs."
    }
  ];

  return (
    <section id="process" className="section-padding bg-navy-300 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">
            Our <span className="gold-gradient">Process</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-white/80 reveal" style={{ animationDelay: '0.2s' }}>
            At The Dirty Roofer, we follow a systematic approach to ensure your roofing project is completed efficiently, with the highest quality standards, and with minimal disruption to your property.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal" style={{ animationDelay: '0.3s' }}>
          {processes.map((process, index) => (
            <ProcessCard 
              key={index}
              number={process.number}
              title={process.title}
              description={process.description}
              delay={`${0.4 + index * 0.1}s`}
            />
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-gold/10 to-transparent opacity-30 blur-3xl"></div>
    </section>
  );
};

export default HowItWorks;
