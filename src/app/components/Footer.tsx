import { Link } from "react-router";
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      {/* Newsletter */}
      <div className="bg-primary py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 600 }} className="text-white mb-2">
            Join the Glaméra Circle
          </h3>
          <p className="text-white/80 text-sm mb-5">Get exclusive offers, beauty tips, and first access to new launches.</p>
          <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2.5 rounded-full text-foreground text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-white text-primary rounded-full text-sm font-semibold hover:bg-secondary transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <span style={{ fontFamily: "'Playfair Display', serif", color: "#e91e8c", fontSize: "1.5rem", fontWeight: 700 }}>Glam</span>
              <span style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "1.5rem", fontStyle: "italic" }}>éra</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Your destination for luxury beauty, skincare & wellness products curated from the world's finest brands.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="text-white/60 hover:text-primary transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors"><Facebook size={18} /></a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors"><Twitter size={18} /></a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors"><Youtube size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2">
              {["New Arrivals", "Bestsellers", "Makeup", "Skincare", "Hair Care", "Fragrances", "Wellness"].map(item => (
                <li key={item}>
                  <Link to="/collections" className="text-white/60 hover:text-primary text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Help</h4>
            <ul className="space-y-2">
              {[
                { label: "My Orders", href: "/orders" },
                { label: "Track Order", href: "/orders" },
                { label: "Returns & Exchanges", href: "/contact" },
                { label: "FAQs", href: "/contact" },
                { label: "Contact Us", href: "/contact" },
                { label: "About Us", href: "/about" },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.href} className="text-white/60 hover:text-primary text-sm transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex gap-2 text-sm text-white/60">
                <MapPin size={16} className="shrink-0 mt-0.5 text-primary" />
                123 Beauty Street, Mumbai, Maharashtra 400001
              </li>
              <li className="flex gap-2 text-sm text-white/60">
                <Phone size={16} className="shrink-0 text-primary" />
                +91 98765 43210
              </li>
              <li className="flex gap-2 text-sm text-white/60">
                <Mail size={16} className="shrink-0 text-primary" />
                hello@glaméra.in
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
          <p>© 2026 Glaméra. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/70 transition-colors">Cookie Policy</a>
          </div>
          <div className="flex gap-2 items-center">
            <span>Pay with:</span>
            {["Visa", "Mastercard", "UPI", "Paytm"].map(p => (
              <span key={p} className="border border-white/20 rounded px-1.5 py-0.5 text-xs text-white/60">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
