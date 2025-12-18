import Navbar from '../components/Navbar';
import Image from 'next/image';

export default function About() {
  return (
    <div className="bg-luxury-black min-h-screen text-white">
      <Navbar />
      
      {/* MAIN SECTION: Split Layout (Text + Visual) */}
      <main className="max-w-7xl mx-auto px-6 py-32 md:py-48 flex flex-col md:flex-row items-center gap-20">
        
        {/* 1. TEXT CONTENT */}
        <div className="md:w-1/2 space-y-10">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-4">
              Our Philosophy
            </p>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
              The Pursuit of <br />
              <span className="text-gray-600">Perfection.</span>
            </h1>
          </div>

          <div className="h-[1px] w-24 bg-white/20" />

          <div className="space-y-6 text-gray-400 leading-relaxed font-light text-sm md:text-base max-w-md">
            <p>
              TIMEPIECE was born from a singular obsession: the belief that a watch is not merely an instrument of time, but a reflection of character.
            </p>
            <p>
              In an era of disposable technology, we stand for permanence. Our movements are Swiss-engineered, our materials are ethically sourced, and our design philosophy is ruthlessly minimalist. We remove the non-essential to reveal the exceptional.
            </p>
            <p>
              We do not follow trends. We simply build the watches we wanted to wear ourselves.
            </p>
          </div>

          <div className="pt-6">
            <div className="inline-flex items-center gap-4 border border-white/10 px-6 py-3 bg-white/5">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <p className="text-xs uppercase tracking-widest text-gray-300">
                Established 2025 • Casablanca, Morocco
              </p>
            </div>
          </div>
        </div>

        {/* 2. VISUAL (Using one of your watches as the 'Hero' of the story) */}
        <div className="md:w-1/2 relative h-[500px] md:h-[700px] w-full bg-[#0a0a0a] border border-white/5 overflow-hidden group">
           {/* Decorative Background Glow */}
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />
           
           <Image 
             src="/images/overseas-tourbillon/main_tourbillon.jpg" // The Daytona looks the most "Engineered"
             alt="Craftsmanship" 
             fill 
             className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-1000 ease-out"
           />
           
           <div className="absolute bottom-10 left-10 z-20">
             <p className="text-white font-serif text-2xl">Mastery of Time</p>
             <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Swiss Engineering</p>
           </div>
        </div>

      </main>

      {/* FOOTER */}
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