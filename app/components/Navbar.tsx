// app/components/Navbar.tsx
"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  return (
    <nav className="flex justify-between items-center py-6 px-8 border-b border-gray-100">
      <Link
        href="/"
        className="text-2xl font-serif font-bold tracking-tighter text-gray-900 cursor-pointer hover:opacity-80 transition"
      >
        TIMEPIECE.
      </Link>
      <div className="space-x-6 text-sm font-medium text-gray-600">
        <Link href="/" className="hover:text-black transition">
          Collection
        </Link>
        <Link href="/about" className="hover:text-black transition">
          Our Story
        </Link>
        <Link
          href="/cart"
          className="hover:text-black transition font-bold text-black"
        >
          Cart ({cart.length})
        </Link>
      </div>
    </nav>
  );
}
