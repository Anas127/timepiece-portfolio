// app/about/page.tsx
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-serif text-gray-900 mb-8">
          The Pursuit of Perfection
        </h1>
        
        <div className="space-y-6 text-gray-600 leading-relaxed font-light">
          <p>
            TIMEPIECE was born from a singular obsession: the belief that a watch is not merely an instrument of time, but a reflection of character.
          </p>
          <p>
            In an era of disposable technology, we stand for permanence. Our movements are Swiss-engineered, our materials are ethically sourced, and our design philosophy is ruthlessly minimalist. We remove the non-essential to reveal the exceptional.
          </p>
          <p>
            We do not follow trends. We simply build the watches we wanted to wear ourselves.
          </p>
        </div>

        <div className="mt-16 border-t border-gray-100 pt-10">
          <p className="text-xs uppercase tracking-widest text-gray-400">
            Established 2025 • Casablanca, Morocco
          </p>
        </div>
      </main>
    </div>
  );
}