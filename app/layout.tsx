// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

// 1. The "Luxury" Serif Font
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif", 
  display: "swap",
});

// 2. The "Technical" Swiss Sans Font
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TIMEPIECE | Master Chronometers",
  description: "Swiss Engineering. Monochrome Aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="antialiased bg-black text-white font-sans selection:bg-white selection:text-black">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}