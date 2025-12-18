"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  images: string[];
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (index: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);
  // We use this flag to prevent saving an empty cart before the real one loads
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. LOAD CART FROM STORAGE (Runs only once on startup)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("timepiece_cart");
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error("Failed to parse cart data", error);
        }
      }
      setIsInitialized(true); // Mark as ready
    }
  }, []);

  // 2. SAVE CART TO STORAGE (Runs whenever 'cart' changes)
  useEffect(() => {
    // Only save if we have finished loading the initial data
    if (isInitialized) {
      localStorage.setItem("timepiece_cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (indexToRemove: number) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}