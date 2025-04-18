
import { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SMSTermsDialog } from "./SMSTermsDialog";

// Schema de validação usando zod
const formSchema = z.object({
  name: z.string()
    .min(5, "Nome deve ter pelo menos 5 caracteres")
    .regex(/^[a-zA-Z\s]+$/, "Nome deve conter apenas letras"),
  
  email: z.string()
    .email("Por favor, forneça um email válido"),
  
  phone: z.string()
    .regex(/^\(\d{3}\)\s\d{3}-\d{4}$/, "Número de telefone deve seguir o formato (555) 555-5555"),
  
  message: z.string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(300, "Mensagem não pode exceder 300 caracteres")
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  
  // Inicializar o formulário com react-hook-form e zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  // Formato telefone (555) 555-5555
  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    
    // Limpar tudo que não for número
    const phoneNumber = value.replace(/[^\d]/g, '');
    
    // Aplicar o formato conforme o usuário digita
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    form.setValue("phone", formattedPhone, { shouldValidate: true });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Store smsConsent state in a variable but don't include it in the DB insert
      // (Until we update the database schema)
      console.log("SMS Consent status:", smsConsent);
      
      const { error } = await supabase.from('contact_submissions').insert({
        ...values
        // smsConsent is not included since it's not in the database schema
      });

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
        form.reset();
        setSmsConsent(false);
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
            
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 flex-grow">
                <CheckCircle size={60} className="text-gold mb-4" />
                <h4 className="text-xl font-medium mb-2">Thank You!</h4>
                <p className="text-white/80 text-center">
                  Your message has been sent successfully. We'll contact you shortly to schedule your free inspection.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-grow flex flex-col">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/90">Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            className="bg-navy-200 border border-white/10 rounded-lg focus:outline-none focus:border-gold" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/90">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="johndoe@example.com" 
                            className="bg-navy-200 border border-white/10 rounded-lg focus:outline-none focus:border-gold" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/90">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="(555) 555-5555" 
                            className="bg-navy-200 border border-white/10 rounded-lg focus:outline-none focus:border-gold" 
                            value={field.value}
                            onChange={handlePhoneChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/90">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project..." 
                            className="bg-navy-200 border border-white/10 rounded-lg focus:outline-none focus:border-gold min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-start space-x-3 mt-4">
                    <Checkbox
                      id="sms-consent"
                      checked={smsConsent}
                      onCheckedChange={(checked) => setSmsConsent(checked as boolean)}
                      className="mt-1"
                    />
                    <label
                      htmlFor="sms-consent"
                      className="text-sm text-white/80 leading-tight"
                    >
                      By checking this box, you agree to receive conversational text messages from PACC Solutions LLC / PACC Building Group. You may reply STOP to opt out at any time. Reply HELP for assistance. Message and data rates may apply. Messaging frequency will vary. <SMSTermsDialog />
                    </label>
                  </div>

                  <div className="mt-auto pt-4">
                    <button 
                      type="submit" 
                      className="btn-primary w-full text-center" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Get a Free Inspection'}
                    </button>
                  </div>
                </form>
              </Form>
            )}
          </div>
          
          <div className="flex flex-col h-full">
            <div className="glass-card p-6 md:p-8 mb-8 reveal" style={{
              animationDelay: '0.4s'
            }}>
              <h3 className="text-2xl font-semibold mb-6 gold-gradient">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-gold mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium mb-1">Address</h4>
                    <p className="text-white/80">9150 Broadway Ave, Brookfield, IL 60513</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-gold mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-white/80">(877) 350-1690</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-gold mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-white/80">contact@paccsolutions.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 text-gold mt-1 mr-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Business Hours</h4>
                    <p className="text-white/80">Mon-Fri: 9:00 AM - 5:00 PM</p>
                    <p className="text-white/80">Sat-Sun: Closed (Emergency services available)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 md:p-8 reveal flex-grow" style={{
              animationDelay: '0.5s'
            }}>
              <h3 className="text-2xl font-semibold mb-6 gold-gradient">Service Areas</h3>
              <p className="text-white/80 mb-4">
                We proudly serve homeowners throughout Illinois, including:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
                  <span className="text-white/80">Cook County</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
                  <span className="text-white/80">DuPage County</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
                  <span className="text-white/80">Lake County</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
                  <span className="text-white/80">Will County</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
                  <span className="text-white/80">Kankakee County</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
                  <span className="text-white/80">Kendall County</span>
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
