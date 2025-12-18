'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Scroll Effect (Adds background when scrolling)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled || isMobileMenuOpen
            ? "bg-luxury-black/90 backdrop-blur-md border-white/10 py-4"
            : "bg-transparent border-transparent py-6 md:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white">
          
          {/* 1. LOGO (Always Left) */}
          <Link 
            href="/" 
            className="text-2xl font-serif font-bold tracking-widest cursor-pointer hover:opacity-80 transition relative z-50"
          >
            TIMEPIECE.
          </Link>

          {/* 2. RIGHT SIDE GROUP (Links + Cart + Mobile Toggle) */}
          {/* We group them all here so they stay together on the right */}
          <div className="flex items-center gap-8">
            
            {/* Desktop Links (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
              <Link href="/" className="hover:text-gray-400 transition">Collection</Link>
              <Link href="/about" className="hover:text-gray-400 transition">Our Story</Link>
            </div>

            {/* Cart & Hamburger Container */}
            <div className="flex items-center gap-6 relative z-50">
              
              {/* Cart Link */}
              <Link href="/cart" className="text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition relative">
                Cart 
                {cart.length > 0 && (
                  <span className="ml-2 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>

              {/* Hamburger Button (Hidden on Desktop, Visible on Mobile) */}
              <button 
                className="md:hidden flex flex-col gap-1.5 p-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-6 h-[2px] bg-white transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 3. MOBILE FULLSCREEN MENU OVERLAY */}
      <div className={`fixed inset-0 bg-[#121212] z-40 flex flex-col justify-center items-center gap-10 transition-transform duration-500 md:hidden ${
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
         <Link 
           href="/" 
           onClick={() => setIsMobileMenuOpen(false)}
           className="text-4xl font-serif text-white hover:text-gray-400 transition"
         >
           Collection
         </Link>
         <Link 
           href="/about" 
           onClick={() => setIsMobileMenuOpen(false)}
           className="text-4xl font-serif text-white hover:text-gray-400 transition"
         >
           Our Story
         </Link>
         <Link 
           href="/cart" 
           onClick={() => setIsMobileMenuOpen(false)}
           className="text-4xl font-serif text-white hover:text-gray-400 transition"
         >
           Cart ({cart.length})
         </Link>
      </div>
    </>
  );
}