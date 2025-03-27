
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="glass-card p-8 h-full transition-all duration-500 gold-glow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`mb-6 transform transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`}>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mx-auto">
          <Icon className="h-8 w-8 text-navy-500" />
        </div>
      </div>
      <h3 className={`text-xl font-semibold mb-4 text-center transition-all duration-500 ${isHovered ? 'gold-gradient' : 'text-white'}`}>
        {title}
      </h3>
      <p className="text-white/80 text-center leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
