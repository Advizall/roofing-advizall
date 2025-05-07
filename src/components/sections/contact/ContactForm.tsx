import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { contactFormSchema, type ContactFormData } from "./schema/contactFormSchema";
import { formatPhoneNumber } from "./utils/phoneFormat";
import { SuccessMessage } from "./components/SuccessMessage";
import { FormFields } from "./components/FormFields";

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      referralSource: "",
      otherSource: "",
      message: ""
    }
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    form.setValue("phone", formattedPhone, { shouldValidate: true });
  };

  const onSubmit = async (values: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate processing delay
    setTimeout(() => {
      console.log('Form data:', values);
      
      // Show success message
      setSubmitted(true);
      
      // Reset form
      form.reset();
      setSmsConsent(false);
      
      // Reset after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
      
      setIsSubmitting(false);
    }, 1000);
  };

  if (submitted) {
    return <SuccessMessage />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-grow flex flex-col">
        <FormFields 
          form={form}
          handlePhoneChange={handlePhoneChange}
          smsConsent={smsConsent}
          setSmsConsent={setSmsConsent}
        />
        
        <div className="mt-auto pt-4">
          <button 
            type="submit" 
            className="btn-primary w-full text-center" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Get a Free Estimate'}
          </button>
        </div>
      </form>
    </Form>
  );
};
