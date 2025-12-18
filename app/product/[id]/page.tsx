import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import AddToCartButton from "../../components/AddToCartButton";
import ThreeDViewer from "../../components/ThreeDViewer";
import ProductGallery from "../../components/ProductGallery";

// 1. DEFINE TYPE
interface Watch {
  id: number;
  name: string;
  brand: string;
  price: number;
  images: string[];
  description: string;
  sketchfabId?: string;
}

// 2. DATA SOURCE
const watches: Watch[] = [
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

// 3. REQUIRED FUNCTION: Generates all paths at build time
export async function generateStaticParams() {
  return watches.map((watch) => ({
    id: watch.id.toString(),
  }));
}

// 4. MAIN PAGE COMPONENT
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = watches.find((p) => p.id === parseInt(id));

  if (!product) {
    return notFound();
  }

  return (
    <div className="bg-luxury-black min-h-screen text-white">
      <Navbar />

      {/* 1. MAIN PRODUCT DETAILS */}
      <div className="max-w-7xl mx-auto px-6 py-32 md:py-48 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left: THE NEW GALLERY */}
        <div className="w-full sticky top-32">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Right: Details */}
        <div className="space-y-8">
          <p className="text-sm tracking-[0.2em] uppercase text-gray-400 border-l-2 border-white pl-4">
            {product.brand}
          </p>

          <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight">
            {product.name}
          </h1>

          <p className="text-gray-400 leading-relaxed font-light max-w-md text-sm md:text-base">
            {product.description}
          </p>

          <div className="py-8 border-t border-gray-800 border-b mb-8 flex items-center justify-between">
            <span className="text-3xl font-serif">
              ${product.price.toLocaleString()}
            </span>
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
