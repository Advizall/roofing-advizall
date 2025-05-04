
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { SMSTermsDialog } from "../../SMSTermsDialog";
import { UseFormReturn } from "react-hook-form";
import { ContactFormData } from "../schema/contactFormSchema";
import { useState } from "react";

interface FormFieldsProps {
  form: UseFormReturn<ContactFormData>;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  smsConsent: boolean;
  setSmsConsent: (value: boolean) => void;
}

export const FormFields = ({ form, handlePhoneChange, smsConsent, setSmsConsent }: FormFieldsProps) => {
  const [showOtherSource, setShowOtherSource] = useState(false);
  
  const handleReferralSourceChange = (value: string) => {
    form.setValue("referralSource", value);
    setShowOtherSource(value === "Other");
    if (value !== "Other") {
      form.setValue("otherSource", "");
    }
  };

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
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white/90">Street Address (Optional)</FormLabel>
            <FormControl>
              <Input 
                placeholder="123 Main St" 
                className="bg-navy-200 border border-white/10 rounded-lg focus:outline-none focus:border-gold" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/90">City (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Chicago" 
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
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/90">State (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Illinois" 
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
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/90">Zip Code (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="60513" 
                  className="bg-navy-200 border border-white/10 rounded-lg focus:outline-none focus:border-gold" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="referralSource"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white/90">How did you hear about us? (Optional)</FormLabel>
            <Select onValueChange={handleReferralSourceChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="bg-navy-200 border border-white/10 rounded-lg focus:outline-none focus:border-gold text-white">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-navy-300 border border-white/10">
                <SelectItem value="Google">Google</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="TikTok">TikTok</SelectItem>
                <SelectItem value="YouTube">YouTube</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="Door Hanger">Door Hanger</SelectItem>
                <SelectItem value="Yard Sign">Yard Sign</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {showOtherSource && (
        <FormField
          control={form.control}
          name="otherSource"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/90">Please specify (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="How did you hear about us?" 
                  className="bg-navy-200 border border-white/10 rounded-lg focus:outline-none focus:border-gold" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      
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
