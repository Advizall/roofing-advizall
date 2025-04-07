
import ProcessStep from '../ui/ProcessStep';
import { ClipboardCheck, FileText, Users, Calculator, Palette, HardHat, CheckSquare, Receipt, DollarSign } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Damage Assessment",
      description: "Once you sign the agreement, our HAAG-certified Inspectors complete a thorough damage assessment to determine if your property qualifies for a claim.",
      icon: ClipboardCheck
    },
    {
      number: 2,
      title: "File Claim",
      description: "Our Office Executive calls your insurance carrier to set up the claim file, report the damages found during the damage assessment, and submit all the necessary documentation.",
      icon: FileText
    },
    {
      number: 3,
      title: "Adjuster Meeting",
      description: "We schedule a date and time to meet on-site with the insurance carrier's Adjuster. This meeting is essential as it allows us to show them the damage and agree on a scope of work.",
      icon: Users
    },
    {
      number: 4,
      title: "Estimate Review",
      description: "After we receive the adjuster's first draft estimate, our Claim Management Team will review it to ensure it includes all needed components for a complete project.",
      icon: Calculator
    },
    {
      number: 5,
      title: "Design Meeting",
      description: "Once we have an agreed estimate, our Account Executive will schedule a meeting with you to discuss the scope of work and help you choose colors and materials.",
      icon: Palette
    },
    {
      number: 6,
      title: "Property Restoration",
      description: "With the colors and materials decided on, our Project Manager will review and set up your project. They will pull the permits, order materials, and schedule a start date.",
      icon: HardHat
    },
    {
      number: 7,
      title: "Final Walk-Through",
      description: "Once all the work is complete, our Project Executive will schedule a quality walk to ensure it was completed to your satisfaction.",
      icon: CheckSquare
    },
    {
      number: 8,
      title: "Billing",
      description: "It's common to find additional costs during the restoration phase of the process. Additional costs, if any, are documented and sent to the insurance carrier for consideration.",
      icon: Receipt
    },
    {
      number: 9,
      title: "Final Payment",
      description: "Once the final payment arrives, our Finance Manager will contact you to coordinate the pickup. With your account paid in full, this completes the entire process.",
      icon: DollarSign
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
            Our complete restoration process from assessment to final payment.
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
