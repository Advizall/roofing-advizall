
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
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
import { SMSTermsDialog } from "../SMSTermsDialog";

// Schema validation using zod
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

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
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
      console.log("SMS Consent status:", smsConsent);
      
      const { error } = await supabase.from('contact_submissions').insert({
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message
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

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 flex-grow">
        <CheckCircle size={60} className="text-gold mb-4" />
        <h4 className="text-xl font-medium mb-2">Thank You!</h4>
        <p className="text-white/80 text-center">
          Your message has been sent successfully. We'll contact you shortly to schedule your free inspection.
        </p>
      </div>
    );
  }

  return (
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
  );
};
