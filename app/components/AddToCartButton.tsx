// app/components/AddToCartButton.tsx
'use client';

import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface AddToCartProps {
  product: any;
  text?: string;
  className?: string;
}

export default function AddToCartButton({ 
  product, 
  text = "Add to Cart", 
  // Added "cursor-pointer" explicitly
  className = "cursor-pointer text-xs uppercase tracking-widest font-bold hover:text-gray-600 transition border-b border-transparent hover:border-gray-900 pb-0.5"
}: AddToCartProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop navigation
    addToCart(product);
    
    // Trigger the "Added" animation
    setIsAdded(true);
    
    // Reset back to normal after 1 second
    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  return (
    <button 
      onClick={handleClick}
      disabled={isAdded} // Prevent double-clicking while it says "Added"
      className={`${className} ${isAdded ? 'text-green-700 hover:text-green-700 border-green-700' : ''}`}
    >
      {isAdded ? "Added" : text}
    </button>
  );
}