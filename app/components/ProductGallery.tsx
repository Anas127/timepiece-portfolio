'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle mouse movement for the zoom effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="w-full space-y-6">
      
      {/* 1. MAIN IMAGE (With Zoom) */}
      <div 
        className="relative w-full h-[500px] md:h-[650px] bg-[#0a0a0a] overflow-hidden group cursor-crosshair border border-white/5"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        {/* The Standard Image (Visible when not hovering) */}
        <Image 
          src={selectedImage} 
          alt={name} 
          fill
          className={`object-cover transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
          priority
        />

        {/* The Zoomed Image (Visible on hover) */}
        {isZoomed && (
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              backgroundImage: `url(${selectedImage})`,
              backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
              backgroundSize: '200%', // 2x Zoom level
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}
      </div>

      {/* 2. THUMBNAIL GRID */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 border transition-all duration-300 ${
              selectedImage === img 
                ? 'border-white opacity-100' 
                : 'border-transparent opacity-50 hover:opacity-100 hover:border-white/30'
            }`}
          >
            <Image 
              src={img} 
              alt={`${name} view ${index + 1}`} 
              fill
              className="object-cover bg-[#0a0a0a]"
            />
          </button>
        ))}
      </div>

    </div>
  );
}