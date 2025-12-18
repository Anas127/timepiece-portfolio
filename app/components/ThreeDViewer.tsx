'use client';

interface ThreeDViewerProps {
  modelId: string;
}

export default function ThreeDViewer({ modelId }: ThreeDViewerProps) {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative bg-[#0a0a0a] overflow-hidden group">
      <iframe 
        title="Luxury Watch 3D" 
        className="w-full h-full relative z-0"
        src={`https://sketchfab.com/models/${modelId}/embed?autostart=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_hint=0&ui_theme=dark&ui_controls=0`}
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
      >
      </iframe>
      
      {/* 1. TOP OVERLAY: Hides the Title and Username */}
      <div className="absolute top-0 left-0 w-full h-16 bg-[#0a0a0a] z-10 pointer-events-none" />

      {/* 2. BOTTOM OVERLAY: Hides the Sketchfab logo and play bar */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-[#0a0a0a] z-10 pointer-events-none" />

      {/* 3. CORNER OVERLAY: Hides the Share button (Top Right) */}
      <div className="absolute top-0 right-0 w-20 h-16 bg-[#0a0a0a] z-10 pointer-events-none" />
      
      {/* Optional: A subtle gradient to blend the overlays smoothly */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-20" />
    </div>
  );
}