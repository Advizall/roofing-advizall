import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      src: "/images/gallery/kitchen-1.jpg",
      alt: "Modern kitchen with white cabinets and stainless steel appliances",
      aspectRatio: "4/3"
    },
    {
      src: "/images/gallery/kitchen-2.jpg",
      alt: "Bright kitchen with subway tile backsplash",
      aspectRatio: "4/3"
    },
    {
      src: "/images/gallery/kitchen-3.jpg",
      alt: "Kitchen with desk area and floral border",
      aspectRatio: "4/3"
    },
    {
      src: "/images/gallery/kitchen-4.jpg",
      alt: "Modern kitchen with plants and natural lighting",
      aspectRatio: "4/3"
    },
    {
      src: "/images/gallery/kitchen-5.jpg",
      alt: "U-shaped kitchen with marble backsplash",
      aspectRatio: "4/3"
    },
    {
      src: "/images/gallery/kitchen-6.jpg",
      alt: "Kitchen with beige countertops and black handles",
      aspectRatio: "4/3"
    }
  ];

  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Work Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of kitchen renovations and transformations. Each project showcases our commitment to quality and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="aspect-[4/3]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Gallery preview"
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery; 