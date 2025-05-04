
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
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
    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address || null,
        city: values.city || null,
        state: values.state || null,
        zip_code: values.zipCode || null,
        referral_source: values.referralSource || null,
        other_source: values.otherSource || null,
        message: values.message,
        checkbox: smsConsent
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
            {isSubmitting ? 'Submitting...' : 'Get a Free Inspection'}
          </button>
        </div>
      </form>
    </Form>
  );
};
