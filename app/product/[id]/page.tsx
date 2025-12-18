// app/product/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import AddToCartButton from "../../components/AddToCartButton";
import ThreeDViewer from "../../components/ThreeDViewer"; 

// 1. DATA SOURCE
const watches = [
  {
    id: 1,
    name: "Royal Oak Perpetual",
    brand: "Audemars Piguet",
    price: 145000,
    image: "/watch1.png",
    description: "The Royal Oak Perpetual Calendar combines a classic complication with the iconic aesthetic of the Royal Oak.",
  },
  {
    id: 2,
    name: "Nautilus Travel Time",
    brand: "Patek Philippe",
    price: 115000,
    image: "/watch2.png",
    description: "The Nautilus Travel Time Chronograph features a dual time zone mechanism indicating local and home time.",
  },
  {
    id: 3,
    name: "Daytona Platinum",
    brand: "Rolex",
    price: 95000,
    image: "/watch3.png",
    description: "The Oyster Perpetual Cosmograph Daytona in platinum with an ice-blue dial and an Oyster bracelet.",
    // UPDATED ID FROM YOUR NEW LINK:
    sketchfabId: "f8c5db458cf04374822c4a1a8f319aeb", 
  },
  {
    id: 4,
    name: "Overseas Tourbillon",
    brand: "Vacheron Constantin",
    price: 129000,
    image: "/watch4.png", 
    description: "A tribute to the spirit of travel, this timepiece houses an ultra-thin tourbillon movement.",
  },
  {
    id: 5,
    name: "Zeitwerk Date",
    brand: "A. Lange & Söhne",
    price: 98000,
    image: "/watch5.png",
    description: "The first mechanical wristwatch with a jumping numerals display and a date function.",
  },
  {
    id: 6,
    name: "Day-Date 40",
    brand: "Rolex",
    price: 45000,
    image: "/watch6.png",
    description: "The ultimate watch of prestige. The Day-Date 40 is available only in 18 ct gold or platinum.",
  }
];

// 2. STATIC PARAMS (Required for export)
export async function generateStaticParams() {
  return watches.map((watch) => ({
    id: watch.id.toString(),
  }));
}

// 3. PAGE COMPONENT (Async for Next.js 16)
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  
  // Await the params to get the ID
  const { id } = await params;
  
  const product = watches.find((p) => p.id === parseInt(id));

  if (!product) {
    return notFound();
  }

  return (
    <div className="bg-luxury-black min-h-screen text-white">
      <Navbar />
      
      {/* 1. MAIN PRODUCT DETAILS */}
      <div className="max-w-7xl mx-auto px-6 py-32 md:py-48 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Image */}
        <div className="relative h-[500px] md:h-[700px] w-full bg-[#0a0a0a] overflow-hidden group">
           <Image 
             src={product.image} 
             alt={product.name} 
             fill 
             className="object-cover grayscale opacity-90 group-hover:scale-105 transition duration-700"
           />
        </div>

        {/* Right: Details */}
        <div className="space-y-8">
          <p className="text-sm tracking-[0.2em] uppercase text-gray-400 border-l-2 border-white pl-4">
            {product.brand}
          </p>
          
          <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight">
            {product.name}
          </h1>

          <p className="text-gray-400 leading-relaxed font-light max-w-md">
            {product.description || "A masterpiece of horological engineering."}
          </p>

          <div className="py-8 border-t border-gray-800 border-b mb-8 flex items-center justify-between">
            <span className="text-3xl font-serif">${product.price.toLocaleString()}</span>
            <span className="text-xs uppercase tracking-widest text-green-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              In Stock
            </span>
          </div>

          <div className="flex gap-4">
             <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      {/* 2. CONDITIONAL 360 VIEW SECTION */}
      {product.sketchfabId && (
        <section className="border-t border-white/10 bg-[#0a0a0a] py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-serif mb-4">Interactive 360° View</h2>
            <p className="text-gray-500 text-sm tracking-widest uppercase mb-12">
              Inspect every detail of the craftsmanship
            </p>
            
            <div className="border border-white/10 shadow-2xl shadow-black/50">
               <ThreeDViewer modelId={product.sketchfabId} />
            </div>
            
            <p className="mt-6 text-xs text-gray-600">
              * Drag to rotate • Scroll to zoom • Double click to reset
            </p>
          </div>
        </section>
      )}

    </div>
  );
}