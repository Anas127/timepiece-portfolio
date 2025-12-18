'use client';

import { useState } from 'react';

interface ThreeDViewerProps {
  modelId: string;
}

export default function ThreeDViewer({ modelId }: ThreeDViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // STATE 1: Not Loaded (Lightweight & Fast)
  if (!isLoaded) {
    return (
      <div className="w-full h-[500px] md:h-[600px] bg-[#0a0a0a] flex flex-col items-center justify-center border border-white/5 relative overflow-hidden group">
        
        {/* Subtle Background Animation */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        
        <div className="relative z-10 text-center space-y-6">
          <p className="text-gray-500 text-xs tracking-[0.3em] uppercase">
            Interactive Experience
          </p>
          
          <button 
            onClick={() => setIsLoaded(true)}
            className="bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Load 360° View
          </button>
          
          <p className="text-gray-600 text-[10px] tracking-wide">
            Click to initialize 3D Engine
          </p>
        </div>
      </div>
    );
  }

  // STATE 2: Loaded (The Heavy Iframe)
  return (
    <div className="w-full h-[500px] md:h-[600px] relative bg-[#0a0a0a] overflow-hidden animate-fade-in">
      <iframe 
        title="Luxury Watch 3D" 
        className="w-full h-full relative z-0"
        src={`https://sketchfab.com/models/${modelId}/embed?autostart=1&preload=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_hint=0&ui_theme=dark&ui_controls=0`}
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
      >
      </iframe>
      
      {/* Privacy Overlays (To hide Sketchfab UI) */}
      <div className="absolute top-0 left-0 w-full h-16 bg-[#0a0a0a] z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-10 bg-[#0a0a0a] z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 h-16 bg-[#0a0a0a] z-10 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-20" />
    </div>
  );
}