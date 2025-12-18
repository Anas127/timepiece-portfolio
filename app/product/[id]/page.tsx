import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import AddToCartButton from "../../components/AddToCartButton";
import ThreeDViewer from "../../components/ThreeDViewer"; 

// 1. DATA SOURCE (Must match the homepage!)
const watches = [
  {
    id: 1,
    name: "Royal Oak Perpetual",
    brand: "Audemars Piguet",
    price: 145000,
    image: "/watch1.png",
    description: "An icon of steel and mechanics. The Royal Oak Perpetual Calendar features the legendary Grande Tapisserie dial and a moon phase so precise it requires correction only once every 125 years."
  },
  {
    id: 2,
    name: "Nautilus Travel Time",
    brand: "Patek Philippe",
    price: 115000,
    image: "/watch2.png",
    description: "The perfect companion for the global elite. With its dual time zone mechanism and distinct porthole construction, the Nautilus represents the pinnacle of sporty elegance."
  },
  {
    id: 3,
    name: "Daytona Platinum",
    brand: "Rolex",
    price: 95000,
    image: "/watch3.png",
    description: "The ultimate trophy. Forged in 950 platinum with an ice-blue dial, this Cosmograph Daytona is designed for those with a passion for driving and speed.",
    sketchfabId: "f8c5db458cf04374822c4a1a8f319aeb", // 3D ID
  },
  {
    id: 4,
    name: "Overseas Tourbillon",
    brand: "Vacheron Constantin",
    price: 129000,
    image: "/watch4.png", 
    description: "A tribute to the spirit of travel. This masterpiece houses an ultra-thin tourbillon movement, visible through the open-worked dial, encased in grade 5 titanium."
  },
  {
    id: 5,
    name: "Zeitwerk Date",
    brand: "A. Lange & Söhne",
    price: 98000,
    image: "/watch5.png",
    description: "German engineering at its finest. The Zeitwerk is the first mechanical wristwatch to display time digitally with jumping numerals, balancing clarity with extreme complexity."
  },
  {
    id: 6,
    name: "Day-Date 40",
    brand: "Rolex",
    price: 45000,
    image: "/watch6.png",
    description: "The 'Presidents' watch.' Available only in precious metals, the Day-Date was the first watch to spell out the day of the week in full, becoming a universal symbol of prestige."
  }
];

export async function generateStaticParams() {
  return watches.map((watch) => ({
    id: watch.id.toString(),
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = watches.find((p) => p.id === parseInt(id));

  if (!product) {
    return notFound();
  }

  return (
    <div className="bg-luxury-black min-h-screen text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-32 md:py-48 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative h-[500px] md:h-[700px] w-full bg-[#0a0a0a] overflow-hidden group">
           <Image 
             src={product.image} 
             alt={product.name} 
             fill 
             className="object-cover grayscale opacity-90 group-hover:scale-105 transition duration-700"
           />
        </div>

        <div className="space-y-8">
          <p className="text-sm tracking-[0.2em] uppercase text-gray-400 border-l-2 border-white pl-4">
            {product.brand}
          </p>
          
          <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight">
            {product.name}
          </h1>

          <p className="text-gray-400 leading-relaxed font-light max-w-md">
            {product.description}
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