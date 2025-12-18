"use client";

import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart } = useCart(); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  // Redirect to cart if empty (and not finished)
  useEffect(() => {
    if (cart.length === 0 && !isSuccess) {
      router.push("/cart");
    }
  }, [cart, router, isSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Payment Processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // FIXED: Key must match what we used in Context ('timepiece_cart')
      // Note: In a real app, you would call clearCart() from context instead
      localStorage.removeItem("timepiece_cart");
      // Force reload to clear context state if we aren't using a clear function
      // But for this demo, the empty local storage will clear it on next load
    }, 2000);
  };

  // 1. SUCCESS STATE (Dark Theme)
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-luxury-black flex flex-col items-center justify-center text-center px-6">
        <div className="w-20 h-20 border border-white/20 rounded-full flex items-center justify-center mb-8 animate-fade-in">
           <span className="text-3xl">✨</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
          Order Confirmed
        </h1>
        <p className="text-gray-400 mb-12 max-w-md leading-relaxed font-light">
          Thank you for your patronage. Your timepiece is being prepared for secure shipment. You will receive a tracking number shortly.
        </p>
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-300 transition-all duration-300"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-black text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-6 py-32 md:py-48">
        
        {/* LEFT: Shipping Form */}
        <div>
          <h2 className="text-3xl font-serif text-white mb-10">
            Shipping Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <input
                required
                type="text"
                placeholder="First Name"
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300 text-sm"
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300 text-sm"
              />
            </div>
            <input
              required
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300 text-sm"
            />
            <input
              required
              type="text"
              placeholder="Address"
              className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300 text-sm"
            />
            <div className="grid grid-cols-2 gap-8">
              <input
                required
                type="text"
                placeholder="City"
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300 text-sm"
              />
              <input
                required
                type="text"
                placeholder="Postal Code"
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300 text-sm"
              />
            </div>

            <h2 className="text-3xl font-serif text-white mt-16 mb-8">
              Payment
            </h2>
            <div className="p-6 border border-white/10 text-xs text-gray-400 bg-[#0a0a0a] tracking-widest uppercase">
              Secure Encrypted Transaction • Demo Mode Enabled
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-white text-black py-5 text-xs font-bold uppercase tracking-widest hover:bg-gray-300 transition-all duration-300 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing
                ? "Processing Securely..."
                : `Complete Order - $${total.toLocaleString()}`}
            </button>
          </form>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-[#0a0a0a] border border-white/5 p-12 h-fit sticky top-32">
          <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-10 border-b border-white/10 pb-4">
            Order Summary
          </h3>
          <div className="space-y-6 mb-10">
            {cart.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-start text-sm group"
              >
                <div>
                  <span className="text-white block mb-1 group-hover:text-gray-300 transition">{item.name}</span>
                  <span className="text-[10px] text-gray-600 uppercase tracking-wider">{item.brand}</span>
                </div>
                <span className="font-medium text-gray-400 font-serif">
                  ${item.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/10 pt-8 flex justify-between items-center">
            <span className="text-lg font-serif text-white">Total</span>
            <span className="text-2xl font-serif text-white">${total.toLocaleString()}</span>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-gray-600 uppercase tracking-widest">
             <span>🔒 Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}