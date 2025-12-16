// app/cart/page.tsx
'use client';

import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cart } = useCart();

  // Calculate Total Price
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-serif text-gray-900 mb-12">Your Selection</h1>

        {cart.length === 0 ? (
          // Empty State
          <div className="text-center py-20 border border-dashed border-gray-200">
            <p className="text-gray-500 mb-6">Your cart is currently empty.</p>
            <Link href="/" className="text-xs uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-gray-600 transition">
              Return to Collection
            </Link>
          </div>
        ) : (
          // Cart Items List
          <>
            <div className="space-y-8">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-8">
                  {/* Product Info */}
                  <div className="flex items-center space-x-6">
                    <div className="relative w-20 h-20 bg-gray-50">
                       <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{item.brand}</p>
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-gray-900 font-medium">
                    ${item.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="mt-12 flex justify-end">
              <div className="w-full max-w-sm">
                <div className="flex justify-between py-4 border-b border-gray-900 mb-6">
                  <span className="text-gray-500 uppercase text-xs tracking-widest">Total</span>
                  <span className="text-2xl font-serif font-medium">${total.toLocaleString()}</span>
                </div>
                <button className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest hover:bg-gray-800 transition">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}