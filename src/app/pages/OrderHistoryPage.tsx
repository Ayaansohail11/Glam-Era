import { Link } from "react-router";
import { Package, Star, Download, RefreshCcw, ChevronRight } from "lucide-react";
import { products } from "../data/products";

const pastOrders = [
  {
    id: "GLM847291",
    date: "2 June 2026",
    status: "delivered",
    total: 2498,
    savings: 648,
    items: [
      { name: "Matte Liquid Lipstick - Ruby Red", brand: "LuxeBeauty", qty: 2, price: 799, image: "https://images.unsplash.com/photo-1586495777744-4e6b23aced2b?w=80&h=80&fit=crop&auto=format", rated: false },
      { name: "Hyaluronic Acid Serum 2%", brand: "DermActiv", qty: 1, price: 649, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop&auto=format", rated: true },
    ],
  },
  {
    id: "GLM736482",
    date: "15 May 2026",
    status: "delivered",
    total: 1299,
    savings: 500,
    items: [
      { name: "Rose Gold Highlighter Palette", brand: "GlowLab", qty: 1, price: 1299, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=80&h=80&fit=crop&auto=format", rated: true },
    ],
  },
  {
    id: "GLM621047",
    date: "1 May 2026",
    status: "delivered",
    total: 899,
    savings: 400,
    items: [
      { name: "Vitamin C Brightening Cream", brand: "LumiSkin", qty: 1, price: 899, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=80&h=80&fit=crop&auto=format", rated: false },
    ],
  },
  {
    id: "GLM518372",
    date: "18 Apr 2026",
    status: "cancelled",
    total: 2499,
    savings: 0,
    items: [
      { name: "Floral Eau de Parfum", brand: "MaisonScent", qty: 1, price: 2499, image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=80&h=80&fit=crop&auto=format", rated: false },
    ],
  },
];

const stats = [
  { label: "Total Orders", value: "12" },
  { label: "Total Savings", value: "₹4,280" },
  { label: "Products Rated", value: "8" },
  { label: "Member Since", value: "Jan 2025" },
];

export default function OrderHistoryPage() {
  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "#1a1a2e" }} className="mb-2">
          Order History
        </h1>
        <p className="text-muted-foreground text-sm mb-8">A complete record of all your past orders</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-border p-4 text-center">
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "#e91e8c" }}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Loyalty Banner */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-5 mb-8 flex items-center justify-between flex-wrap gap-4">
          <div className="text-white">
            <p className="text-sm font-semibold opacity-80">Your Beauty Points</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700 }}>2,840 pts</p>
            <p className="text-sm opacity-80 mt-1">Worth ₹284 — Redeem on your next order</p>
          </div>
          <Link
            to="/collections"
            className="px-5 py-2.5 bg-white text-primary rounded-full text-sm font-bold hover:shadow-lg transition-all"
          >
            Shop & Earn More
          </Link>
        </div>

        {/* Orders */}
        <div className="space-y-5">
          {pastOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-border overflow-hidden">
              {/* Header */}
              <div className={`px-5 py-3 flex items-center justify-between ${order.status === "cancelled" ? "bg-red-50" : "bg-secondary/20"}`}>
                <div className="flex items-center gap-3">
                  <Package size={16} className={order.status === "cancelled" ? "text-red-400" : "text-primary"} />
                  <div>
                    <span className="text-xs font-bold text-foreground">#{order.id}</span>
                    <span className="text-xs text-muted-foreground ml-2">{order.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${order.status === "delivered" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {order.status === "delivered" ? "Delivered" : "Cancelled"}
                  </span>
                  <button className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
                    <Download size={14} />
                  </button>
                </div>
              </div>

              {/* Items */}
              <div className="p-5 space-y-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl border border-border" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">{item.brand}</p>
                      <p className="text-sm font-semibold text-foreground line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.qty} · ₹{item.price.toLocaleString()}</p>
                    </div>
                    <div className="shrink-0 flex flex-col gap-1.5">
                      {order.status === "delivered" && !item.rated && (
                        <button className="flex items-center gap-1 text-xs text-amber-600 border border-amber-200 rounded-full px-2.5 py-1 hover:bg-amber-50 transition-colors">
                          <Star size={11} /> Rate
                        </button>
                      )}
                      {item.rated && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Star size={11} className="text-amber-400 fill-amber-400" /> Rated
                        </span>
                      )}
                      <button className="flex items-center gap-1 text-xs text-primary border border-primary/30 rounded-full px-2.5 py-1 hover:bg-primary/5 transition-colors">
                        <RefreshCcw size={11} /> Buy Again
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-border px-5 py-3 flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-foreground font-bold">₹{order.total.toLocaleString()}</span>
                  {order.savings > 0 && (
                    <span className="text-green-600 text-xs ml-2">Saved ₹{order.savings}</span>
                  )}
                </div>
                <Link
                  to="/orders"
                  className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                >
                  View Details <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Recommended */}
        <div className="mt-10">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 600, color: "#1a1a2e" }} className="mb-4">
            Based on Your History
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {products.slice(0, 4).map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="bg-white rounded-xl border border-border p-3 hover:border-primary hover:shadow transition-all group">
                <img src={p.image} alt={p.name} className="w-full h-24 object-cover rounded-lg mb-2 group-hover:scale-105 transition-transform" />
                <p className="text-xs text-muted-foreground">{p.brand}</p>
                <p className="text-xs font-semibold text-foreground line-clamp-2">{p.name}</p>
                <p className="text-xs font-bold text-primary mt-1">₹{p.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
