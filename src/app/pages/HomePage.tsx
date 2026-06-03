import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Truck, RotateCcw, Shield } from "lucide-react";
import { products, categories } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { motion } from "motion/react";

const heroSlides = [
  {
    title: "Discover Your",
    highlight: "Signature Glow",
    subtitle: "Luxury beauty products curated from the world's finest brands. Up to 40% off on premium skincare.",
    cta: "Shop Now",
    href: "/collections",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=700&fit=crop&auto=format",
    bg: "#fff0f7",
  },
  {
    title: "New Season",
    highlight: "New You",
    subtitle: "Explore our latest collection of makeup, skincare & fragrances. Fresh arrivals every week.",
    cta: "View New Arrivals",
    href: "/new-collection",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200&h=700&fit=crop&auto=format",
    bg: "#fce4ec",
  },
  {
    title: "Bestsellers",
    highlight: "You'll Love",
    subtitle: "Our most-loved products, tried and tested by thousands. Shop the community favorites.",
    cta: "Explore Bestsellers",
    href: "/collections?filter=bestseller",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=700&fit=crop&auto=format",
    bg: "#f3e5f5",
  },
];

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free returns" },
  { icon: Shield, title: "100% Authentic", desc: "All products are genuine" },
  { icon: Sparkles, title: "Expert Curation", desc: "Beauty experts pick the best" },
];

const brands = ["LuxeBeauty", "GlowLab", "DermActiv", "LumiSkin", "HairLux", "MaisonScent", "CoverGlow", "PureGlow"];

export default function HomePage() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const bestsellers = products.filter(p => p.isBestseller);
  const newArrivals = products.filter(p => p.isNew);

  return (
    <div>
      {/* Hero Carousel */}
      <section className="relative overflow-hidden" style={{ minHeight: 520 }}>
        {heroSlides.map((h, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === slide ? 1 : 0, pointerEvents: i === slide ? "auto" : "none" }}
          >
            <div className="relative w-full h-full min-h-[520px]" style={{ background: h.bg }}>
              <div className="max-w-7xl mx-auto px-4 h-full flex items-center py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
                  <div>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      key={slide}
                    >
                      <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">✨ New Collection 2026</p>
                      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.1, color: "#1a1a2e" }}>
                        {h.title} <br />
                        <span style={{ color: "#e91e8c" }}>{h.highlight}</span>
                      </h1>
                      <p className="text-muted-foreground mt-4 text-base leading-relaxed max-w-md" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {h.subtitle}
                      </p>
                      <div className="flex gap-3 mt-7">
                        <Link
                          to={h.href}
                          className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
                        >
                          {h.cta} <ArrowRight size={16} />
                        </Link>
                        <Link
                          to="/about"
                          className="inline-flex items-center gap-2 px-7 py-3 border border-border text-foreground rounded-full font-semibold hover:border-primary hover:text-primary transition-all"
                        >
                          Our Story
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                  <div className="relative">
                    <img
                      src={h.image}
                      alt="Hero"
                      className="rounded-3xl w-full object-cover shadow-2xl"
                      style={{ maxHeight: 420, objectPosition: "center" }}
                    />
                    <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Sparkles size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Products</p>
                        <p className="text-sm font-bold text-foreground">3,000+</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={() => setSlide(s => (s - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition-all z-10"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => setSlide(s => (s + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition-all z-10"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all ${i === slide ? "w-6 bg-primary" : "w-2 bg-primary/30"}`}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-y border-border py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <Icon size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Browse By</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "#1a1a2e" }}>
              Shop Categories
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={`/collections?category=${cat.name}`}
                className="group flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.count}+ items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-1">Most Loved</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "#1a1a2e" }}>Bestsellers</h2>
            </div>
            <Link to="/collections?filter=bestseller" className="flex items-center gap-1 text-primary text-sm font-semibold hover:underline">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-16 px-4" style={{ background: "linear-gradient(135deg, #e91e8c 0%, #ff6b9d 50%, #c2185b 100%)" }}>
        <div className="max-w-7xl mx-auto text-center text-white">
          <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-3">Limited Time Offer</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700 }}>
            Up to 50% Off on Premium Skincare
          </h2>
          <p className="text-white/80 mt-3 text-base">Don't miss out. Sale ends Sunday midnight.</p>
          <Link
            to="/collections?category=Skincare"
            className="inline-flex items-center gap-2 mt-7 px-8 py-3 bg-white text-primary rounded-full font-bold hover:shadow-xl transition-all"
          >
            Shop Skincare <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-1">Just Dropped</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "#1a1a2e" }}>New Arrivals</h2>
            </div>
            <Link to="/new-collection" className="flex items-center gap-1 text-primary text-sm font-semibold hover:underline">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-12 px-4 bg-secondary/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-muted-foreground text-sm uppercase tracking-widest mb-7">Top Brands We Carry</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {brands.map(b => (
              <Link
                key={b}
                to={`/collections?brand=${b}`}
                className="px-5 py-2 bg-white rounded-full border border-border text-sm font-semibold text-muted-foreground hover:border-primary hover:text-primary transition-all"
              >
                {b}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">What They Say</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "#1a1a2e" }} className="mb-10">
            Customer Love
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Priya Sharma", text: "Glaméra is my go-to for all beauty needs. The products are authentic and delivery is super fast!", stars: 5 },
              { name: "Anjali Mehta", text: "Amazing collection! Found my holy grail serum here. The expert curation is spot on.", stars: 5 },
              { name: "Riya Kapoor", text: "Best customer service ever. Returns were hassle-free and the packaging is so luxurious.", stars: 5 },
            ].map(t => (
              <div key={t.name} className="bg-secondary/30 rounded-2xl p-6 text-left border border-border">
                <div className="flex gap-0.5 mb-3">
                  {Array(t.stars).fill(0).map((_, i) => (
                    <span key={i} className="text-amber-400">★</span>
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
