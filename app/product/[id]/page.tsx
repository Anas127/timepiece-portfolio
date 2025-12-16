// app/product/[id]/page.tsx
import { watches } from '@/app/data/watches'; // We import our database
import Navbar from '@/app/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/app/components/AddToCartButton';

// This function generates the static paths for export (optional but good practice)
export function generateStaticParams() {
  return watches.map((watch) => ({
    id: watch.id.toString(),
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  const watch = watches.find((w) => w.id === id);

  if (!watch) {
    notFound(); // Shows a 404 if the ID doesn't exist
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link href="/" className="text-xs text-gray-500 hover:text-black mb-8 block">
          ← BACK TO COLLECTION
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="relative h-[500px] w-full bg-gray-50">
            <Image 
              src={watch.image} 
              alt={watch.name}
              fill
              className="object-contain p-10"
            />
          </div>

          {/* Right: Details */}
          <div>
            <h2 className="text-sm text-gray-400 tracking-widest uppercase mb-2">{watch.brand}</h2>
            <h1 className="text-4xl font-serif text-gray-900 mb-6">{watch.name}</h1>
            <p className="text-gray-600 font-light mb-8 leading-relaxed">
              Experience the pinnacle of Swiss engineering. The {watch.name} features a sapphire crystal face, 
              automatic movement, and a 42-hour power reserve. Designed for those who command their own time.
            </p>
            
            <div className="text-3xl font-medium text-gray-900 mb-8">
              ${watch.price.toLocaleString()}
            </div>

            <AddToCartButton 
                product={watch} 
                className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest hover:bg-gray-800 transition"
    />
          </div>
        </div>
      </div>
    </div>
  );
}