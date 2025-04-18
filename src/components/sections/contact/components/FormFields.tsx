
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SMSTermsDialog } from "../../SMSTermsDialog";
import { UseFormReturn } from "react-hook-form";
import { ContactFormData } from "../schema/contactFormSchema";

interface FormFieldsProps {
  form: UseFormReturn<ContactFormData>;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  smsConsent: boolean;
  setSmsConsent: (value: boolean) => void;
}

export const FormFields = ({ form, handlePhoneChange, smsConsent, setSmsConsent }: FormFieldsProps) => {
  return (
    <>
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
    </>
  );
};
