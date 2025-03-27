
import ProcessStep from '../ui/ProcessStep';
import { CalendarCheck, FileSearch, FileCheck, Hammer } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Schedule Free Inspection",
      description: "Contact us to arrange a no-obligation inspection of your property at a time that works for you.",
      icon: CalendarCheck
    },
    {
      number: 2,
      title: "We Document the Damage",
      description: "Our experts thoroughly assess and document all storm-related damage to support your insurance claim.",
      icon: FileSearch
    },
    {
      number: 3,
      title: "We Handle Your Insurance Claim",
      description: "We communicate directly with your insurance company, negotiating to ensure you receive fair compensation.",
      icon: FileCheck
    },
    {
      number: 4,
      title: "We Manage the Repairs",
      description: "Once your claim is approved, our skilled team completes all necessary repairs with quality craftsmanship.",
      icon: Hammer
    }
  ];

  return (
    <section id="process" className="section-padding bg-navy-300 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">
            How It <span className="gold-gradient">Works</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-white/80 reveal" style={{ animationDelay: '0.2s' }}>
            Our streamlined process makes recovery from storm damage simple and stress-free.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="reveal" 
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <ProcessStep
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  isLast={index === steps.length - 1}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-gold/10 to-transparent opacity-30 blur-3xl"></div>
    </section>
  );
};

export default HowItWorks;
