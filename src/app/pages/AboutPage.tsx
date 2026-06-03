import { Link } from "react-router";
import { ArrowRight, Heart, Star, Users, Package } from "lucide-react";

const team = [
  { name: "Aisha Kapoor", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&auto=format" },
  { name: "Rhea Sharma", role: "Head of Curation", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&auto=format" },
  { name: "Meera Patel", role: "Chief Beauty Editor", image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&h=200&fit=crop&auto=format" },
  { name: "Nisha Gupta", role: "Head of Operations", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&h=200&fit=crop&auto=format" },
];

const milestones = [
  { year: "2020", event: "Glaméra Founded in Mumbai with 50 products" },
  { year: "2021", event: "Reached 10,000 customers across India" },
  { year: "2022", event: "Launched our own Glaméra Private Label" },
  { year: "2023", event: "Expanded to 500+ brands and 3,000+ products" },
  { year: "2024", event: "Achieved 1 million orders milestone" },
  { year: "2026", event: "Named India's #1 Online Beauty Destination" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fff0f7 0%, #fce4ec 100%)", minHeight: 500 }}>
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Our Story</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.1 }}>
              Beauty For Every Woman, <span style={{ color: "#e91e8c" }}>Everywhere</span>
            </h1>
            <p className="text-muted-foreground mt-5 text-base leading-relaxed max-w-lg">
              Glaméra was born from a simple belief: every woman deserves access to the world's finest beauty products, delivered with love and trust. Founded in 2020, we've grown from a small Mumbai startup to India's most-loved beauty destination.
            </p>
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 mt-7 px-7 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Shop Our Collection <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&auto=format" alt="Beauty" className="rounded-2xl w-full object-cover shadow-xl" />
            <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop&auto=format" alt="Products" className="rounded-2xl w-full object-cover shadow-xl mt-8" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className="py-14 px-4 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: Package, label: "Products", value: "3,000+" },
            { icon: Users, label: "Happy Customers", value: "1M+" },
            { icon: Star, label: "Average Rating", value: "4.7 / 5" },
            { icon: Heart, label: "Brands", value: "500+" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <Icon size={28} className="text-primary mx-auto mb-3" />
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#e91e8c" }}>{value}</p>
              <p className="text-muted-foreground text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Our Mission</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "#1a1a2e" }} className="mb-6">
            Democratizing Luxury Beauty
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto">
            We believe beauty is not a privilege — it's a right. Our mission is to make premium, authentic beauty products accessible to every woman across India, from metro cities to small towns. Every product on Glaméra is carefully vetted for authenticity, quality, and efficacy by our expert beauty panel.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[
              { title: "100% Authentic", desc: "Every product is sourced directly from brands or authorized distributors. No fakes, ever.", emoji: "🛡️" },
              { title: "Expert Curation", desc: "Our team of beauty editors handpick products that actually work for Indian skin tones and climates.", emoji: "✨" },
              { title: "Sustainable Beauty", desc: "We're committed to sustainability — partnering with cruelty-free, eco-conscious brands.", emoji: "🌿" },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl border border-border p-6">
                <span className="text-3xl mb-4 block">{item.emoji}</span>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Our Journey</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "#1a1a2e" }}>
              From Startup to Icon
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-16 shrink-0 text-right">
                    <span className="text-primary text-sm font-bold">{m.year}</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-3.5 top-1 w-3 h-3 rounded-full bg-primary border-2 border-white shadow" />
                    <div className="bg-secondary/30 rounded-xl px-4 py-3 ml-3">
                      <p className="text-sm text-foreground">{m.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">The People</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "#1a1a2e" }}>
              Meet the Team
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="text-center group">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-3 group-hover:border-primary transition-all">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-bold text-foreground text-sm">{member.name}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-foreground text-center">
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "white" }} className="mb-3">
          Ready to Glow?
        </h2>
        <p className="text-white/60 text-base mb-7">Join over 1 million women who trust Glaméra for their beauty needs.</p>
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-full font-bold hover:bg-primary/90 hover:shadow-xl transition-all"
        >
          Shop Now <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
