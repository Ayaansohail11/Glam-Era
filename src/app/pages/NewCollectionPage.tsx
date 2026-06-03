import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

const newProducts = products.filter(p => p.isNew);

const editorialSections = [
  {
    title: "Summer Glow Edit",
    desc: "Radiant, dewy looks for the season. Lightweight formulas that let your natural beauty shine.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop&auto=format",
    tag: "Trending Now",
  },
  {
    title: "Skinimalism",
    desc: "Less is more. Embrace your natural skin with minimal, high-performance skincare.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=600&fit=crop&auto=format",
    tag: "Editor's Pick",
  },
];

export default function NewCollectionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div
        className="relative overflow-hidden py-20 px-4"
        style={{ background: "linear-gradient(135deg, #fff0f7 0%, #fce4ec 50%, #f8bbd0 100%)" }}
      >
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-5">
            <Zap size={14} /> Just Dropped — June 2026
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "#1a1a2e" }}>
            The New Collection
          </h1>
          <p className="text-muted-foreground mt-4 text-base max-w-xl mx-auto leading-relaxed">
            Fresh arrivals from the world's most coveted beauty brands. Be the first to explore our latest drops, curated by our expert beauty editors.
          </p>
        </div>

        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/5 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-primary/10 pointer-events-none" />
      </div>

      {/* Editorial picks */}
      <section className="py-14 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Editorial</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 600, color: "#1a1a2e" }}>
              Stories We're Loving
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {editorialSections.map(s => (
              <div key={s.title} className="group relative rounded-3xl overflow-hidden bg-foreground shadow-xl" style={{ minHeight: 340 }}>
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent" />
                <div className="relative z-10 p-8 flex flex-col h-full justify-end" style={{ minHeight: 340 }}>
                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs rounded-full mb-3">{s.tag}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 600, color: "white" }}>
                    {s.title}
                  </h3>
                  <p className="text-white/70 text-sm mt-2 mb-5 leading-relaxed">{s.desc}</p>
                  <Link
                    to="/collections"
                    className="inline-flex items-center gap-2 text-white text-sm font-semibold hover:gap-3 transition-all"
                  >
                    Shop the Edit <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-1">Latest</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "#1a1a2e" }}>
                New Arrivals
              </h2>
            </div>
            <Link to="/collections" className="flex items-center gap-1 text-primary text-sm font-semibold hover:underline">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {newProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-14 px-4 bg-foreground text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Coming Soon</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "white" }}>
              Something Big is Coming
            </h2>
            <p className="text-white/60 mt-2 text-base max-w-md">
              Our most anticipated launch yet. Subscribe to be notified first and get early bird access.
            </p>
          </div>
          <form className="flex gap-2 min-w-72" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2.5 rounded-full text-foreground text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Notify Me
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
