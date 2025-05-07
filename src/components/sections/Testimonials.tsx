import { useEffect, useRef } from 'react';
import TestimonialCard from '../ui/TestimonialCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Testimonials = () => {
  // Real testimonials from Google reviews
  const testimonials = [
    {
      name: "Cindy",
      testimonial: "The Dirty Roofer went above and beyond! We would have never been able to get a full replacement of our cedar shake roof without them. We just had to sign and they did all the hard stuff. They battled with our insurance for about a year to get everything approved!",
      rating: 5
    },
    {
      name: "Raed Bisharat",
      testimonial: "The team from The Dirty Roofer did an amazing job on my home. We had hail damage on our Cedar roof. After searching high and low for a Tuscan Clay style roof, we gave up. One day Kosta knocked on our door, and The Dirty Roofer handled it all. Highly recommend!",
      rating: 5
    },
    {
      name: "Kevin Bailey",
      testimonial: "I hired The Dirty Roofer to repair the hail damage to my roof and gutter. From start to finish, I am impressed with the professionalism of their employees and systems. Daniel worked with me and my insurance company with the utmost care.",
      rating: 5
    },
    {
      name: "Anthony M Wilson",
      testimonial: "The Dirty Roofer came as advertised. They were prompt. They were efficient. They did everything they stated they were going to do when it came to making sure that my roof was examined, replaced, and cleaned perfectly. Top notch service!",
      rating: 5
    },
    {
      name: "Damir Alic",
      testimonial: "Wow is an understatement for The Dirty Roofer. From start to end, the ease of communication and while on the job was exceptional. My house looks beautiful and is a definite attraction in the neighborhood. I would highly recommend them to everyone!",
      rating: 5
    },
    {
      name: "Tom K",
      testimonial: "It is always the result that matters most. And I have a 5-star roof, gutter, and window fascia result to brag about with the neighbors. There were a couple of twists and turns, but ultimately, it ended with a fantastic outcome.",
      rating: 5
    },
    {
      name: "Michelle Zwolinski",
      testimonial: "I highly recommend The Dirty Roofer! They were very professional and helpful every step of the way. I had a new roof and siding installed, and it turned out great! My roof was able to be installed in one day — impressive work!",
      rating: 5
    },
    {
      name: "Cherry Lyn Salaguste",
      testimonial: "I've been extremely impressed with The Dirty Roofer and the outstanding job they did on our roof. The entire process—from start to finish—was seamless and stress-free. They even worked directly with our insurance!",
      rating: 5
    },
    {
      name: "Mia Bratta",
      testimonial: "The roofing project for our house was a massive job and you guys NAILED it! Our roof is unique and steep, but the team made all the necessary adjustments. Super professional and results exceeded expectations!",
      rating: 5
    },
    {
      name: "Zak Rainey",
      testimonial: "First of all, the service was top notch! From the estimator to the insurance claim handler, the project manager, and the crew — it was a great experience working with The Dirty Roofer. Highly recommended!",
      rating: 5
    },
    {
      name: "Joseph Wisniewski",
      testimonial: "The Dirty Roofer are extremely professional. I had extensive hail damage to my roof. They worked with my insurance directly and received the okay to fully replace my roof. The crew did an excellent job!",
      rating: 5
    },
    {
      name: "Richard Baske",
      testimonial: "The Dirty Roofer did an outstanding job replacing my roof. Kostas provided us with detailed explanations and worked with our insurance company to get the entire roof and gutters approved for replacement.",
      rating: 5
    },
    {
      name: "Jim Skoczen",
      testimonial: "The Dirty Roofer did a great job from filing my claim to the actual roof installation. Everyone — sales, claims, project manager — were responsive and answered all my questions. Cleanup was excellent. Highly recommend!",
      rating: 5
    },
    {
      name: "Colleen Nodelman",
      testimonial: "The Dirty Roofer did both our roof and our siding. They worked with our insurance and made it such a seamless process. They handled everything from permits to ensuring we were in compliance with our HOA. Fantastic job!",
      rating: 5
    },
    {
      name: "Donna Evanoff",
      testimonial: "At first, I was worried working with a Boston company living in Cambridge, but I was pleasantly surprised. The Dirty Roofer did an amazing job on my home! I went from nervous to completely satisfied. I highly recommend them!",
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
            Hear from homeowners who trusted us with their roofing projects.
          </p>
        </div>

        <div className="reveal" style={{ animationDelay: '0.3s' }}>
          <Carousel 
            opts={{ loop: true, align: "center" }}
            plugins={[Autoplay({ delay: 15000, stopOnInteraction: false })]}
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
