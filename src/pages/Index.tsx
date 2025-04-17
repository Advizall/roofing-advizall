
import { useEffect } from 'react';
import Navbar from '../components/navigation/Navbar';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import HowItWorks from '../components/sections/HowItWorks';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';
import Footer from '../components/Footer';
import ChatWidget from '../components/chat/ChatWidget';

const Index = () => {
  useEffect(() => {
    const handleReveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      const windowHeight = window.innerHeight;
      
      reveals.forEach((reveal) => {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
          reveal.classList.add('reveal-visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleReveal);
    // Initial check on page load
    handleReveal();
    
    // Handle video player fullscreen exit
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        const videoPlayers = document.querySelectorAll('.video-player');
        videoPlayers.forEach(player => {
          player.classList.remove('fullscreen');
        });
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      window.removeEventListener('scroll', handleReveal);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <HowItWorks />
      <Testimonials />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
