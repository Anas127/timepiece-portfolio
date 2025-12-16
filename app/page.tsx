// app/page.tsx
import Navbar from "./components/Navbar";
import { watches } from "./data/watches";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./components/AddToCartButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-24 px-4 bg-gray-50">
        <h1 className="text-5xl font-serif font-medium text-gray-900 mb-6">
          Timeless Elegance
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto text-sm tracking-wide uppercase">
          Curated timepieces for the modern gentleman.
        </p>
      </section>

      {/* Product Grid */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {watches.map((watch) => (
            <div key={watch.id} className="group cursor-pointer">
              
              {/* 2. Wrap Image and Name in Link */}
              <Link href={`/product/${watch.id}`}>
                <div className="relative h-80 w-full bg-gray-100 mb-4 overflow-hidden">
                  <Image
                    src={watch.image}
                    alt={watch.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <h3 className="text-lg font-medium text-gray-900">
                  {watch.name}
                </h3>
              </Link>

              <p className="text-sm text-gray-500 mb-3">{watch.brand}</p>

              <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                <span className="text-gray-900 font-semibold">
                  ${watch.price.toLocaleString()}
                </span>
                <AddToCartButton product={watch} />
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center py-10 text-gray-400 text-xs border-t border-gray-100">
        © 2025 TIMEPIECE.
      </footer>
    </div>
  );
}