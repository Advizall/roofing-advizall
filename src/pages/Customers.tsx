import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, useTexture } from '@react-three/drei';
import { Vector3 } from 'three';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/Footer';
import { ScrollArea } from '../components/ui/scroll-area';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ArrowLeft, ChevronDown } from 'lucide-react';

// Mock roof layer data
const roofLayers = [
  {
    id: 'plywood',
    name: 'Plywood Base',
    description: 'The foundation of the roof system, providing structural support.',
    color: '#8B4513',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [2, 0.1, 2],
    useTexture: true
  },
  {
    id: 'underlayment',
    name: 'Underlayment',
    description: 'Waterproof membrane that protects against moisture infiltration.',
    color: '#333333',
    position: [0, 0.15, 0],
    rotation: [0, 0, 0],
    scale: [1.95, 0.05, 1.95],
    useTexture: false
  },
  {
    id: 'drip-edge',
    name: 'Drip Edge',
    description: 'Metal flashing that directs water away from the fascia.',
    color: '#C0C0C0',
    position: [0, 0.25, 0],
    rotation: [0, 0, 0],
    scale: [2.1, 0.03, 2.1],
    useTexture: false
  },
  {
    id: 'shingles',
    name: 'Asphalt Shingles',
    description: 'The visible layer that protects against weather and adds aesthetic appeal.',
    color: '#696969',
    position: [0, 0.35, 0],
    rotation: [0, 0, 0],
    scale: [2, 0.1, 2],
    useTexture: false
  },
  {
    id: 'ridge-cap',
    name: 'Ridge Cap Shingles',
    description: 'Specialized shingles that protect the ridge of the roof.',
    color: '#4B4B4B',
    position: [0, 0.5, 0],
    rotation: [0, 0, 0],
    scale: [0.5, 0.08, 2],
    useTexture: false
  },
];

// TexturedRoofLayer component
const TexturedRoofLayer = ({ 
  position, 
  rotation, 
  scale, 
  color, 
  visible = true,
  useTexture = false
}) => {
  const texture = useTexture(useTexture ? '/images/6cec3c84-d369-4d4c-b995-ee519e7d2c9a.png' : '');
  
  return (
    <mesh 
      position={position} 
      rotation={rotation} 
      scale={visible ? scale : [0, 0, 0]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      {useTexture ? (
        <meshStandardMaterial 
          map={texture}
          roughness={0.5}
          metalness={0.2}
        />
      ) : (
        <meshStandardMaterial 
          color={color} 
          roughness={0.7}
          metalness={0.3}
        />
      )}
    </mesh>
  );
};

// RoofLayer component (for backward compatibility)
const RoofLayer = ({ 
  position, 
  rotation, 
  scale, 
  color, 
  visible = true,
  useTexture = false
}) => {
  return (
    <TexturedRoofLayer
      position={position}
      rotation={rotation}
      scale={scale}
      color={color}
      visible={visible}
      useTexture={useTexture}
    />
  );
};

// Scene component with all roof layers
const RoofModel = ({ activeLayer }) => {
  // Animation effects
  useEffect(() => {
    // Could add more complex animations here
  }, [activeLayer]);

  return (
    <group position={[0, 0, 0]} rotation={[0.2, 0.5, 0]}>
      {roofLayers.map((layer, index) => (
        <RoofLayer
          key={layer.id}
          position={layer.position}
          rotation={layer.rotation}
          scale={layer.scale}
          color={layer.color}
          visible={index <= activeLayer}
          useTexture={layer.useTexture && index <= activeLayer}
        />
      ))}
      
      {/* Environment lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[1024, 1024]} 
      />
      <directionalLight 
        position={[-10, -10, -10]} 
        intensity={0.5} 
        color="#9b87f5" 
      />
    </group>
  );
};

// Main page component
const Customers = () => {
  const navigate = useNavigate();
  const [activeLayer, setActiveLayer] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);
  
  // Handle scroll to control roof layer visibility
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight - windowHeight;
      const scrollPercentage = Math.min(scrollPosition / docHeight, 1);
      
      setScrollProgress(scrollPercentage);
      
      // Determine which layer to show based on scroll position
      const layerIndex = Math.min(
        Math.floor(scrollPercentage * (roofLayers.length + 1)),
        roofLayers.length - 1
      );
      
      setActiveLayer(layerIndex);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to section handler
  const scrollToNextSection = () => {
    const nextSection = document.getElementById(`layer-${activeLayer + 1}`);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div 
      ref={scrollRef}
      className="min-h-screen bg-gradient-to-br from-navy-600 via-navy-400 to-navy-600 text-white"
    >
      <Navbar />
      
      {/* Hero section */}
      <section 
        className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/6cec3c84-d369-4d4c-b995-ee519e7d2c9a.png')] bg-cover bg-center opacity-10 z-0"></div>
        
        <div className="container mx-auto text-center z-10 relative animate-fade-in">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 py-2 px-4 text-white">
            Exclusive 3D Experience
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            American Roof Construction
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto">
            Experience the innovative layering technology behind our premium roofing systems with this immersive 3D visualization.
          </p>
          
          <div className="relative w-full max-w-4xl h-[40vh] md:h-[60vh] mx-auto rounded-xl overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10 shadow-lg">
            <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
              <RoofModel activeLayer={activeLayer} />
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.5}
              />
            </Canvas>
          </div>
          
          <div 
            className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce cursor-pointer"
            onClick={scrollToNextSection}
          >
            <ChevronDown size={40} className="text-white/70 hover:text-purple-400 transition-colors" />
          </div>
        </div>
      </section>
      
      {/* Layer detail sections */}
      {roofLayers.map((layer, index) => (
        <section 
          id={`layer-${index}`}
          key={layer.id}
          className="min-h-screen flex items-center relative py-20 px-6"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-navy-500/50 to-navy-900/90 z-0"></div>
          
          {/* Parallax decorative elements */}
          <div 
            className="absolute w-64 h-64 rounded-full bg-purple-500/10 filter blur-3xl"
            style={{ 
              top: `${30 + Math.sin(index) * 20}%`, 
              left: `${20 + Math.cos(index) * 20}%`,
              transform: `translateY(${scrollProgress * -50}px)`,
              opacity: 0.5 + Math.sin(scrollProgress * Math.PI) * 0.3
            }}
          ></div>
          
          <div 
            className="absolute w-96 h-96 rounded-full bg-pink-500/10 filter blur-3xl"
            style={{ 
              bottom: `${10 + Math.cos(index) * 20}%`, 
              right: `${20 + Math.sin(index) * 20}%`,
              transform: `translateY(${scrollProgress * 50}px)`,
              opacity: 0.5 + Math.cos(scrollProgress * Math.PI) * 0.3
            }}
          ></div>
          
          <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
            <div 
              className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg transition-all duration-700 transform hover:scale-105"
              style={{ 
                opacity: index <= activeLayer ? 1 : 0,
                transform: index <= activeLayer ? 'translateY(0)' : 'translateY(50px)' 
              }}
            >
              <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500">Layer {index + 1}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                {layer.name}
              </h2>
              <p className="text-lg mb-6 text-gray-300">
                {layer.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="px-3 py-1 bg-white/10 rounded-full">Premium Quality</span>
                <span className="px-3 py-1 bg-white/10 rounded-full">Weather Resistant</span>
                <span className="px-3 py-1 bg-white/10 rounded-full">Professional Installation</span>
              </div>
            </div>
            
            <div className="relative h-[40vh] md:h-[60vh] rounded-xl overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10 shadow-lg">
              <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
                <RoofModel activeLayer={index} />
                <OrbitControls 
                  enableZoom={false}
                  enablePan={false}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI / 2.5}
                />
              </Canvas>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-center">
                <p className="font-medium">
                  <span className="text-purple-300">Layer {index + 1}:</span> {layer.name}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}
      
      {/* CTA section */}
      <section className="py-20 px-6 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-navy-500 to-navy-900/70 z-0"></div>
        
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            Ready for a Professional Roof Installation?
          </h2>
          
          <p className="text-xl mb-10 text-gray-300">
            Our experts will handle every layer with precision and care, ensuring your roof provides maximum protection and longevity.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-full text-lg font-medium transition-all hover:shadow-lg hover:shadow-purple-500/20"
              onClick={() => navigate('/#contact')}
            >
              Get a Free Inspection
            </Button>
            
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg font-medium transition-all"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Customers;
