import Navbar from "./components/Navbar";
import Image from "next/image";
import Link from "next/link";

// 1. UPDATED DATA: Now using 'images' array to match the Product Page structure
const watches = [
  {
    id: 1,
    name: "Royal Oak Perpetual",
    brand: "Audemars Piguet",
    price: 145000,
    // Note: Converted './' to '/' for Next.js public folder compatibility
    images: [
      "/images/royal-oak/main_royal_oak.jpg",
      "/images/royal-oak/royal-img2.jpg",
      "/images/royal-oak/oak-img3.jpg",
      "/images/royal-oak/oak-img4.jpg",
    ],
    description:
      "An icon of steel and mechanics. The Royal Oak Perpetual Calendar features the legendary Grande Tapisserie dial and a moon phase so precise it requires correction only once every 125 years.",
  },
  {
    id: 2,
    name: "Nautilus Travel Time",
    brand: "Patek Philippe",
    price: 115000,
    images: [
      "/images/nautilus_philippe/main_nautilus.jpg",
      "/images/nautilus_philippe/nautilus-img2.jpg",
      "/images/nautilus_philippe/nautilus-img3.jpg",
    ],
    description:
      "The perfect companion for the global elite. With its dual time zone mechanism and distinct porthole construction, the Nautilus represents the pinnacle of sporty elegance.",
      sketchfabId: "f3f0fd3e237b40168784433d1f23ac06",
  },
  {
    id: 3,
    name: "Daytona Platinum",
    brand: "Rolex",
    price: 95000,
    images: [
      "/images/rolex_daytona/main_daytona.jpg",
      "/images/rolex_daytona/daytona-img2.jpg",
      "/images/rolex_daytona/daytona-img3.jpg",
      "/images/rolex_daytona/daytona-img4.jpg",
    ],
    description:
      "The ultimate trophy. Forged in 950 platinum with an ice-blue dial, this Cosmograph Daytona is designed for those with a passion for driving and speed.",
    // I added this back so your 3D viewer still works for this watch
    sketchfabId: "f8c5db458cf04374822c4a1a8f319aeb",
  },
  {
    id: 4,
    name: "Overseas Tourbillon",
    brand: "Vacheron Constantin",
    price: 129000,
    images: [
      "/images/overseas-tourbillon/tourbillon-img2.jpg",
      "/images/overseas-tourbillon/main_tourbillon.jpg",
      "/images/overseas-tourbillon/tourbillon-img3.jpg",
    ],
    description:
      "A tribute to the spirit of travel. This masterpiece houses an ultra-thin tourbillon movement, visible through the open-worked dial, encased in grade 5 titanium.",
  },
  {
    id: 5,
    name: "Zeitwerk Date",
    brand: "A. Lange & Söhne",
    price: 98000,
    images: ["/images/zeitwerk_date/zeitwerk_main.jpg", "/images/zeitwerk_date/zeitwerk_img2.jpg", "/images/zeitwerk_date/zeitwerk_img3.jpg"],
    description:
      "German engineering at its finest. The Zeitwerk is the first mechanical wristwatch to display time digitally with jumping numerals, balancing clarity with extreme complexity.",
  },
  {
    id: 6,
    name: "Day-Date 40",
    brand: "Rolex",
    price: 45000,
    images: ["/images/day_date40/date_main.jpg", "/images/day_date40/date_img2.jpg", "/images/day_date40/date_img3.jpg"],
    description:
      "The 'Presidents' watch.' Available only in precious metals, the Day-Date was the first watch to spell out the day of the week in full, becoming a universal symbol of prestige.",
  },
];

export default function Home() {
  const collection = watches; 

  return (
    <div className="bg-luxury-black text-white min-h-screen">
      <Navbar />

      {/* 1. HERO SECTION */}
      {/* Changed h-screen to h-[100dvh] for better mobile support */}
      <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-50 grayscale pointer-events-none" 
          >
            <source src="/videos/hero_video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-black/30" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6 mt-20">
          <p className="text-[10px] md:text-sm tracking-[0.4em] uppercase text-gray-300 mb-6 font-medium animate-fade-in">
            Legacy of Excellence
          </p>
          {/* Changed text-5xl to text-4xl for mobile safety */}
          <h1 className="text-4xl md:text-8xl font-serif text-white mb-10 tracking-tight leading-tight">
            DEFINING <br className="md:hidden" /> MOMENTS
          </h1>
          <div className="flex justify-center gap-6">
            <Link href="#collection" className="bg-white text-black px-8 py-3 md:px-10 md:py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition duration-300">
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
                index % 2 === 1 ? "md:flex-row-reverse" : "" 
              }`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative h-[60vh] md:h-[70vh] group overflow-hidden bg-[#0a0a0a]">
                <Link href={`/product/${watch.id}`}>
                  <Image
                    // CHANGED: Uses the first image from the array
                    src={watch.images[0]}
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
                <div className="w-16 h-[1px] bg-gray-700 mx-auto md:mx-0" />
                
                {/* Description */}
                <p className="text-gray-400 leading-relaxed max-w-md mx-auto md:mx-0 font-light text-sm">
                  {watch.description}
                </p>

                <div className="pt-8">
                  {/* Solid White Button */}
                  <Link 
                    href={`/product/${watch.id}`} 
                    className="inline-block bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-300 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Discover More
                  </Link>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

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