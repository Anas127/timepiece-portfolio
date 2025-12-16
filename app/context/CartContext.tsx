// app/context/CartContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartContextType {
  cart: any[];
  addToCart: (product: any) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);
  // New state to track if the component has mounted in the browser
  const [isMounted, setIsMounted] = useState(false);

  // 1. Load cart from Local Storage on initial browser load
  useEffect(() => {
    setIsMounted(true);
    const storedCart = localStorage.getItem('timepiece-cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from local storage", error);
        localStorage.removeItem('timepiece-cart');
      }
    }
  }, []);

  // 2. Save cart to Local Storage whenever it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('timepiece-cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (product: any) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Prevent rendering until mounted to avoid server/client mismatch errors
  if (!isMounted) {
    return null; 
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}