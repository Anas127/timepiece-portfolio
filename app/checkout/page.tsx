// app/checkout/page.tsx
"use client";

import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, addToCart } = useCart(); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  useEffect(() => {
    if (cart.length === 0 && !isSuccess) {
      router.push("/cart");
    }
  }, [cart, router, isSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      localStorage.removeItem("timepiece-cart");
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-serif text-gray-900 mb-4">
          Order Confirmed
        </h1>
        <p className="text-gray-500 mb-8">
          Thank you for your purchase. Your timepiece is being prepared.
        </p>
        <button
          onClick={() => {
            
            window.location.href = "/";
          }}
          className="bg-black text-white px-8 py-4 text-xs uppercase tracking-widest hover:bg-gray-800 transition"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 py-16">
        {/* LEFT: Shipping Form */}
        <div>
          <h2 className="text-xl font-serif text-gray-900 mb-8">
            Shipping Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input
                required
                type="text"
                placeholder="First Name"
                className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition text-sm"
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition text-sm"
              />
            </div>
            <input
              required
              type="email"
              placeholder="Email Address"
              className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition text-sm"
            />
            <input
              required
              type="text"
              placeholder="Address"
              className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition text-sm"
            />
            <div className="grid grid-cols-2 gap-6">
              <input
                required
                type="text"
                placeholder="City"
                className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition text-sm"
              />
              <input
                required
                type="text"
                placeholder="Postal Code"
                className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition text-sm"
              />
            </div>

            <h2 className="text-xl font-serif text-gray-900 mt-12 mb-8">
              Payment
            </h2>
            <div className="p-4 border border-gray-200 text-sm text-gray-500 bg-gray-50">
              Demo Mode: No payment required.
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest hover:bg-gray-800 transition mt-8 disabled:opacity-50"
            >
              {isProcessing
                ? "Processing..."
                : `Pay $${total.toLocaleString()}`}
            </button>
          </form>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-gray-50 p-10 h-fit">
          <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-6">
            Order Summary
          </h3>
          <div className="space-y-4 mb-8">
            {cart.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-sm"
              >
                <span>{item.name}</span>
                <span className="font-medium">
                  ${item.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-6 flex justify-between items-center text-lg font-serif">
            <span>Total</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
