
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  testimonial: string;
  rating: number;
}

const TestimonialCard = ({ name, location, testimonial, rating }: TestimonialCardProps) => {
  return (
    <div className="glass-card p-8 h-full gold-glow">
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={20} 
            className={i < rating ? "fill-gold text-gold" : "text-gray-400"} 
          />
        ))}
      </div>
      <p className="text-white/90 italic mb-6 leading-relaxed">"{testimonial}"</p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mr-4">
          <span className="font-bold text-navy-500">{name.charAt(0)}</span>
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-white/70 text-sm">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
