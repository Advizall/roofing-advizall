
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
      const { error } = await supabase.from('contact_submissions').insert([{
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message
      }]);

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
                  
                  <div className="mt-auto pt-4">
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
            
            <div className="glass-card p-6 md:p-8 reveal flex-grow" style={{
              animationDelay: '0.5s'
            }}>
              <h3 className="text-2xl font-semibold mb-6 gold-gradient">Service Areas</h3>
              <p className="text-white/80 mb-4">
                We proudly serve homeowners throughout Minnesota, including:
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
