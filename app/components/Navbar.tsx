'use client'; 

import Link from 'next/link';
import { useCart } from '../context/CartContext'; 

export default function Navbar() {
  const { cart } = useCart(); 

  return (
    // changed 'text-gray-900' to 'text-white' explicitly
    <nav className="absolute top-0 w-full z-50 flex justify-between items-center py-8 px-6 md:px-12 bg-transparent text-white">
      
      {/* Logo */}
      <Link href="/" className="text-2xl font-serif font-bold tracking-widest cursor-pointer hover:opacity-80 transition text-white">
        TIMEPIECE.
      </Link>
      
      {/* Links */}
      <div className="flex items-center space-x-8 text-xs font-bold uppercase tracking-widest">
        <Link href="/" className="hidden md:block hover:text-gray-400 transition text-white">Collection</Link>
        <Link href="/about" className="hidden md:block hover:text-gray-400 transition text-white">Our Story</Link>
        
        <Link href="/cart" className="hover:text-gray-400 transition relative text-white">
          Cart 
          {cart.length > 0 && (
            <span className="ml-2 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}