
import { ContactForm } from './contact/ContactForm';
import { ContactInfo } from './contact/ContactInfo';
import { ServiceAreas } from './contact/ServiceAreas';

const Contact = () => {
  return (
    <section id="contact" className="section-padding relative">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/95 to-navy-500/95 z-10"></div>
        <img src="/roof-repair.jpg" alt="Contact background" className="w-full h-full object-cover opacity-20" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">
            Contact <span className="gold-gradient">Us</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-white/80 reveal" style={{
            animationDelay: '0.2s'
          }}>
            Ready to start your recovery? Reach out for a free inspection and consultation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="glass-card p-6 md:p-8 reveal flex flex-col h-full" style={{
            animationDelay: '0.3s'
          }}>
            <h3 className="text-2xl font-semibold mb-6 gold-gradient">Get In Touch</h3>
            <ContactForm />
          </div>
          
          <div className="flex flex-col h-full">
            <ContactInfo />
            <ServiceAreas />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
