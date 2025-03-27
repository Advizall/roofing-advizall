
import { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message
          }
        ]);
        
      if (error) {
        console.error('Error submitting form:', error);
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your message. Please try again.",
          variant: "destructive"
        });
      } else {
        console.log('Form submitted successfully');
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Exception when submitting form:', error);
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/95 to-navy-500/95 z-10"></div>
        <img 
          src="/roof-repair.jpg" 
          alt="Contact background" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">
            Contact <span className="gold-gradient">Us</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-white/80 reveal" style={{ animationDelay: '0.2s' }}>
            Ready to start your recovery? Reach out for a free inspection and consultation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="glass-card p-8 reveal flex flex-col h-full" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-2xl font-semibold mb-6 gold-gradient">Get In Touch</h3>
            
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 flex-grow">
                <CheckCircle size={60} className="text-gold mb-4" />
                <h4 className="text-xl font-medium mb-2">Thank You!</h4>
                <p className="text-white/80 text-center">
                  Your message has been sent successfully. We'll contact you shortly to schedule your free inspection.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
                <div>
                  <label htmlFor="name" className="block text-white/90 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-navy-200 border border-white/10 rounded-lg focus:outline-none focus:border-gold"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white/90 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-navy-200 border border-white/10 rounded-lg focus:outline-none focus:border-gold"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-white/90 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-navy-200 border border-white/10 rounded-lg focus:outline-none focus:border-gold"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white/90 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 bg-navy-200 border border-white/10 rounded-lg focus:outline-none focus:border-gold"
                  ></textarea>
                </div>
                
                <div className="mt-auto">
                  <button 
                    type="submit" 
                    className="btn-primary w-full text-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Get a Free Inspection'}
                  </button>
                  
                  <p className="text-white/60 text-sm text-center mt-4">
                    By submitting this form, you agree to be contacted regarding our services.
                  </p>
                </div>
              </form>
            )}
          </div>
          
          <div className="flex flex-col h-full">
            <div className="glass-card p-8 mb-8 reveal" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-semibold mb-6 gold-gradient">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-gold mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium mb-1">Address</h4>
                    <p className="text-white/80">123 Recovery Lane, Minneapolis, MN 55401</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-gold mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-white/80">(612) 555-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-gold mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-white/80">contact@paccsolutions.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8 reveal flex-grow" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-semibold mb-6 gold-gradient">Service Areas</h3>
              <p className="text-white/80 mb-4">
                We proudly serve homeowners throughout Minnesota, including:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
                  <span className="text-white/80">Minneapolis</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
                  <span className="text-white/80">St. Paul</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
                  <span className="text-white/80">Bloomington</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
                  <span className="text-white/80">Eden Prairie</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
                  <span className="text-white/80">Eagan</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
                  <span className="text-white/80">Plymouth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
