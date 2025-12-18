"use client";

import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart(); // <--- Get the function

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-luxury-black text-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-32 md:py-48">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-16 tracking-tight">
          Your Selection
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border border-white/5 bg-[#0a0a0a]">
            <p className="text-gray-500 mb-8 text-sm tracking-widest uppercase">
              Your collection is currently empty
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-300 transition-all duration-300"
            >
              Explore Timepieces
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-0 divide-y divide-white/10 border-t border-b border-white/10">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center justify-between py-10 group"
                >
                  {/* Product Info */}
                  <div className="flex items-center space-x-8 w-full md:w-auto">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 bg-[#0a0a0a] border border-white/5 overflow-hidden">
                      <Image
                        src={item.images ? item.images[0] : "/placeholder.png"}
                        alt={item.name}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-2">
                        {item.brand}
                      </p>
                      <h3 className="text-xl md:text-2xl font-serif font-medium text-white mb-2">
                        {item.name}
                      </h3>
                      
                      <div className="flex items-center gap-6">
                         <p className="text-xs text-gray-400 font-light">
                           Ref. {item.id}00{index}
                         </p>
                         
                         {/* NEW: Remove Button */}
                         <button 
                           onClick={() => removeFromCart(index)}
                           className="text-[10px] uppercase tracking-widest text-red-900 hover:text-red-500 transition-colors duration-300 border-b border-transparent hover:border-red-500 pb-0.5"
                         >
                           Remove
                         </button>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-6 md:mt-0 text-2xl font-serif text-white">
                    ${item.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="mt-16 flex justify-end">
              <div className="w-full max-w-md bg-[#0a0a0a] p-8 border border-white/5">
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                  <span className="text-gray-500 uppercase text-xs tracking-widest">
                    Subtotal
                  </span>
                  <span className="text-3xl font-serif font-medium">
                    ${total.toLocaleString()}
                  </span>
                </div>
                
                <p className="text-[10px] text-gray-500 mb-8 leading-relaxed">
                  Shipping and taxes calculated at checkout. Complimentary insured shipping worldwide.
                </p>

                <Link
                  href="/checkout"
                  className="block w-full bg-white text-black py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-300 transition-all duration-300 text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}