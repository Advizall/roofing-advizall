
import { CheckCircle } from 'lucide-react';

export const SuccessMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 flex-grow">
      <CheckCircle size={60} className="text-gold mb-4" />
      <h4 className="text-xl font-medium mb-2">Thank You!</h4>
      <p className="text-white/80 text-center">
        Your message has been sent successfully. We'll contact you shortly to schedule your free inspection.
      </p>
    </div>
  );
};
