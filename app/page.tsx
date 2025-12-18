import Navbar from "./components/Navbar";
import Image from "next/image";
import Link from "next/link";

// UPDATED: 6 Real Luxury Watches
const watches = [
  {
    id: 1,
    name: "Royal Oak Perpetual",
    brand: "Audemars Piguet",
    price: 145000,
    image: "./images/watch1.png",
    // No sketchfabId here, so no 3D view will show
  },
  {
    id: 2,
    name: "Nautilus Travel Time",
    brand: "Patek Philippe",
    price: 115000,
    image: "./images/watch2.png",
  },
  {
    id: 3,
    name: "Daytona Platinum",
    brand: "Rolex",
    price: 95000,
    image: "./images/watch3.png",
    sketchfabId: "d539268d839641759367316712396301", // <--- THE MAGIC KEY
  },
  {
    id: 4,
    name: "Overseas Tourbillon",
    brand: "Vacheron Constantin",
    price: 129000,
    image: "/watch4.png",
  },
  {
    id: 5,
    name: "Zeitwerk Date",
    brand: "A. Lange & Söhne",
    price: 98000,
    image: "/watch5.png",
  },
  {
    id: 6,
    name: "Day-Date 40",
    brand: "Rolex",
    price: 45000,
    image: "/watch6.png",
  }
];

export default function Home() {
  // We use the first 6 watches for the collection grid
  const collection = watches; 

  return (
    <div className="bg-luxury-black text-white min-h-screen">
      <Navbar />

      {/* 1. HERO SECTION (Video Background) */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Video Layer */}
        <div className="absolute inset-0 z-0 bg-black">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            // 'pointer-events-none' prevents any clicking or controls from showing
            className="w-full h-full object-cover opacity-50 grayscale pointer-events-none" 
          >
            <source src="./videos/hero_video.mp4" type="video/mp4" />
          </video>
          
          {/* Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-black/30" />
        </div>

        {/* Text Layer */}
        <div className="relative z-10 text-center max-w-5xl px-6 mt-20">
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-300 mb-6 font-medium animate-fade-in">
            Legacy of Excellence
          </p>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-10 tracking-tight">
            DEFINING MOMENTS
          </h1>
          <div className="flex justify-center gap-6">
            <Link href="#collection" className="bg-white text-black px-10 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition duration-300">
              Discover More
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE COLLECTION */}
      <section id="collection" className="py-32 px-6 bg-luxury-black">
        <div className="max-w-7xl mx-auto space-y-40">
          
          {collection.map((watch, index) => (
            <div 
              key={watch.id} 
              className={`flex flex-col md:flex-row items-center gap-20 ${
                index % 2 === 1 ? "md:flex-row-reverse" : "" // Alternates Left/Right layout
              }`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative h-[60vh] md:h-[70vh] group overflow-hidden bg-[#0a0a0a]">
                <Link href={`/product/${watch.id}`}>
                  {/* Using standard img tag fallback if next/image gives trouble with local files, but Image is better */}
                  <Image
                    src={watch.image}
                    alt={watch.name}
                    fill
                    className="object-cover transition duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale hover:grayscale-0"
                  />
                </Link>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 text-center md:text-left space-y-8">
                <h3 className="text-xs text-gray-500 uppercase tracking-[0.3em]">
                  {watch.brand}
                </h3>
                <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
                  {watch.name}
                </h2>
                <div className="w-16 h-[1px] bg-gray-800 mx-auto md:mx-0" />
                <p className="text-gray-400 leading-relaxed max-w-md mx-auto md:mx-0 font-light text-sm">
                  An exemplary demonstration of technical mastery and aesthetic fluidity. 
                  Designed for those who command time, rather than chase it.
                </p>
                <div className="pt-8">
                  <Link 
                    href={`/product/${watch.id}`} 
                    className="text-[10px] font-bold uppercase tracking-widest border-b border-gray-700 pb-2 hover:border-white hover:text-white text-gray-500 transition"
                  >
                    Discover More
                  </Link>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* 3. FOOTER */}
      <footer className="bg-black py-24 border-t border-white/5">
        <div className="text-center">
             <h4 className="text-3xl font-serif mb-6 text-white tracking-widest">TIMEPIECE.</h4>
             <p className="text-gray-600 text-[10px] uppercase tracking-widest">
               Official Retailer • Geneva • New York • Tokyo
             </p>
        </div>
      </footer>
    </div>
  );
}