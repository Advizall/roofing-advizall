
import { LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  isLast?: boolean;
}

const ProcessStep = ({ number, title, description, icon: Icon, isLast = false }: ProcessStepProps) => {
  return (
    <div className="relative">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-navy-500 font-bold text-xl z-10">
          {number}
        </div>
        {!isLast && (
          <div className="h-0.5 bg-gradient-to-r from-gold via-gold/50 to-transparent flex-grow ml-4"></div>
        )}
      </div>
      
      <div className="flex items-start ml-4">
        <div className="mr-6 mt-1">
          <Icon className="h-8 w-8 text-gold" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-white/80 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProcessStep;
