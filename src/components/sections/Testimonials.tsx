
import { useEffect, useRef } from 'react';
import TestimonialCard from '../ui/TestimonialCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Testimonials com cidades de Illinois
  const testimonials = [
    {
      name: "Robert Johnson",
      location: "Chicago, IL",
      testimonial: "PACC Solutions was incredible throughout our entire roof replacement process. They handled everything with our insurance company and the new roof looks amazing!",
      rating: 5
    },
    {
      name: "Sarah Miller",
      location: "Naperville, IL",
      testimonial: "After a severe hailstorm damaged our siding, PACC helped us navigate the complex insurance claim. Their team was professional and completed the repairs promptly.",
      rating: 5
    },
    {
      name: "Michael Thomas",
      location: "Tinley Park, IL",
      testimonial: "The inspection team was thorough and found damage that I hadn't even noticed. They helped me get a full roof replacement covered when my insurance initially denied the claim.",
      rating: 5
    },
    {
      name: "Jennifer Wilson",
      location: "Orland Park, IL",
      testimonial: "From the initial consultation to the final inspection, PACC's attention to detail was impressive. They truly advocate for homeowners!",
      rating: 4
    },
    {
      name: "David Martinez",
      location: "Palos Hills, IL",
      testimonial: "After a windstorm damaged multiple properties in our neighborhood, PACC handled everything efficiently. Their communication throughout the process was excellent.",
      rating: 5
    }
  ];

  // Auto-rotação do carrossel a cada 5 segundos
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [emblaApi]);

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

        <div className="reveal" style={{ animationDelay: '0.3s' }}>
          <Carousel 
            opts={{ loop: true, align: "center" }}
            ref={emblaRef}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <TestimonialCard
                    name={testimonial.name}
                    location={testimonial.location}
                    testimonial={testimonial.testimonial}
                    rating={testimonial.rating}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 md:mt-8">
              <CarouselPrevious className="relative static mx-2 -left-0 bg-navy-300/80 text-white hover:bg-navy-300 hover:text-gold" />
              <CarouselNext className="relative static mx-2 -right-0 bg-navy-300/80 text-white hover:bg-navy-300 hover:text-gold" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
