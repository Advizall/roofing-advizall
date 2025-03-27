
import { useRef } from 'react';
import TestimonialCard from '../ui/TestimonialCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const testimonials = [
    {
      name: "Robert Johnson",
      location: "Minneapolis, MN",
      testimonial: "PACC Solutions was incredible throughout our entire roof replacement process. They handled everything with our insurance company and the new roof looks amazing!",
      rating: 5
    },
    {
      name: "Sarah Miller",
      location: "St. Paul, MN",
      testimonial: "After a severe hailstorm damaged our siding, PACC helped us navigate the complex insurance claim. Their team was professional and completed the repairs promptly.",
      rating: 5
    },
    {
      name: "Michael Thomas",
      location: "Eagan, MN",
      testimonial: "The inspection team was thorough and found damage that I hadn't even noticed. They helped me get a full roof replacement covered when my insurance initially denied the claim.",
      rating: 5
    },
    {
      name: "Jennifer Wilson",
      location: "Bloomington, MN",
      testimonial: "From the initial consultation to the final inspection, PACC's attention to detail was impressive. They truly advocate for homeowners!",
      rating: 4
    },
    {
      name: "David Martinez",
      location: "Eden Prairie, MN",
      testimonial: "After a windstorm damaged multiple properties in our neighborhood, PACC handled everything efficiently. Their communication throughout the process was excellent.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="section-padding bg-navy-400 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">
            Client <span className="gold-gradient">Testimonials</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-white/80 reveal" style={{ animationDelay: '0.2s' }}>
            Hear from homeowners who trusted us with their storm damage recovery.
          </p>
        </div>

        <div className="relative reveal" style={{ animationDelay: '0.3s' }}>
          {/* Navigation arrows */}
          <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 z-10 bg-navy-300/80 rounded-full p-2 text-white hover:text-gold transition-colors md:flex hidden"
            onClick={scrollLeft}
          >
            <ChevronLeft size={30} />
          </button>
          
          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 z-10 bg-navy-300/80 rounded-full p-2 text-white hover:text-gold transition-colors md:flex hidden"
            onClick={scrollRight}
          >
            <ChevronRight size={30} />
          </button>
          
          {/* Testimonials slider */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x"
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="min-w-[300px] md:min-w-[400px] snap-center"
              >
                <TestimonialCard
                  name={testimonial.name}
                  location={testimonial.location}
                  testimonial={testimonial.testimonial}
                  rating={testimonial.rating}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
