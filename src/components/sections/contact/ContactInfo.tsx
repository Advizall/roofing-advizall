import { MapPin, Phone, Mail } from 'lucide-react';

export const ContactInfo = () => {
  return (
    <div className="glass-card p-6 md:p-8 mb-8 reveal" style={{
      animationDelay: '0.4s'
    }}>
      <h3 className="text-2xl font-semibold mb-6 gold-gradient">Contact Information</h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <MapPin className="h-6 w-6 text-gold mt-1 mr-4" />
          <div>
            <h4 className="font-medium mb-1">Address</h4>
            <p className="text-white/80">85 Willow Court, Boston, MA 02196</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Phone className="h-6 w-6 text-gold mt-1 mr-4" />
          <div>
            <h4 className="font-medium mb-1">Phone</h4>
            <p className="text-white/80">1-617-233-8489 (ask for Brendan)</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Mail className="h-6 w-6 text-gold mt-1 mr-4" />
          <div>
            <h4 className="font-medium mb-1">Email</h4>
            <p className="text-white/80">roofereamon@gmail.com</p>
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
            <p className="text-white/80">Mon-Fri: 8:00 AM - 6:00 PM</p>
            <p className="text-white/80">Sat: 9:00 AM - 2:00 PM</p>
            <p className="text-white/80">Sun: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};
