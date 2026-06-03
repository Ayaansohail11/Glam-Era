import { useState } from "react";
import { Link } from "react-router";
import { Package, ChevronRight, Search, Filter, Truck, CheckCircle, Clock, XCircle } from "lucide-react";

const mockOrders = [
  {
    id: "GLM847291",
    date: "2 June 2026",
    status: "delivered",
    total: 2498,
    items: [
      { name: "Matte Liquid Lipstick - Ruby Red", brand: "LuxeBeauty", qty: 2, price: 799, image: "https://images.unsplash.com/photo-1586495777744-4e6b23aced2b?w=100&h=100&fit=crop&auto=format" },
      { name: "Hyaluronic Acid Serum 2%", brand: "DermActiv", qty: 1, price: 649, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&h=100&fit=crop&auto=format" },
    ],
  },
  {
    id: "GLM736482",
    date: "28 May 2026",
    status: "shipped",
    total: 1299,
    items: [
      { name: "Rose Gold Highlighter Palette", brand: "GlowLab", qty: 1, price: 1299, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&h=100&fit=crop&auto=format" },
    ],
  },
  {
    id: "GLM628471",
    date: "20 May 2026",
    status: "processing",
    total: 3148,
    items: [
      { name: "Floral Eau de Parfum", brand: "MaisonScent", qty: 1, price: 2499, image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=100&h=100&fit=crop&auto=format" },
      { name: "Argan Oil Hair Mask", brand: "HairLux", qty: 1, price: 549, image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=100&h=100&fit=crop&auto=format" },
    ],
  },
];

const statusConfig = {
  delivered: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", label: "Delivered" },
  shipped: { icon: Truck, color: "text-blue-600", bg: "bg-blue-50", label: "Shipped" },
  processing: { icon: Clock, color: "text-amber-600", bg: "bg-amber-50", label: "Processing" },
  cancelled: { icon: XCircle, color: "text-red-500", bg: "bg-red-50", label: "Cancelled" },
};

const steps = ["Order Placed", "Confirmed", "Shipped", "Out for Delivery", "Delivered"];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>("GLM847291");

  const filtered = mockOrders.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.items.some(i => i.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "#1a1a2e" }} className="mb-2">
          My Orders
        </h1>
        <p className="text-muted-foreground text-sm mb-7">Track and manage your orders</p>

        {/* Search */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-white border border-border rounded-full px-4">
            <Search size={16} className="text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by order ID or product name..."
              className="flex-1 py-2.5 text-sm focus:outline-none bg-transparent"
            />
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-border">
            <Package size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-base font-semibold text-foreground">No orders found</h3>
            <p className="text-muted-foreground text-sm mt-1">Try a different search or start shopping.</p>
            <Link to="/collections" className="inline-block mt-4 px-6 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors">
              Shop Now
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {filtered.map(order => {
            const status = statusConfig[order.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            const isExpanded = expandedOrder === order.id;
            const statusIndex = order.status === "delivered" ? 4 : order.status === "shipped" ? 2 : 1;

            return (
              <div key={order.id} className="bg-white rounded-2xl border border-border overflow-hidden">
                {/* Order Header */}
                <button
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  className="w-full p-5 flex items-center justify-between hover:bg-secondary/10 transition-colors"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className={`w-10 h-10 rounded-full ${status.bg} flex items-center justify-center`}>
                      <StatusIcon size={18} className={status.color} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Order #{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.date} · {order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">₹{order.total.toLocaleString()}</p>
                      <span className={`text-xs font-semibold ${status.color} ${status.bg} px-2 py-0.5 rounded-full`}>
                        {status.label}
                      </span>
                    </div>
                    <ChevronRight size={16} className={`text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </div>
                </button>

                {/* Expanded */}
                {isExpanded && (
                  <div className="border-t border-border">
                    {/* Tracking */}
                    <div className="px-5 py-4 bg-secondary/10">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Order Tracking</p>
                      <div className="flex items-center gap-0">
                        {steps.map((step, i) => (
                          <div key={step} className="flex items-center flex-1">
                            <div className="flex flex-col items-center">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${i <= statusIndex ? "bg-primary border-primary" : "bg-white border-border"}`}>
                                {i <= statusIndex && <div className="w-2 h-2 bg-white rounded-full" />}
                              </div>
                              <p className={`text-xs mt-1 text-center whitespace-nowrap ${i <= statusIndex ? "text-primary font-semibold" : "text-muted-foreground"}`} style={{ fontSize: "10px" }}>
                                {step}
                              </p>
                            </div>
                            {i < steps.length - 1 && (
                              <div className={`flex-1 h-0.5 mb-4 ${i < statusIndex ? "bg-primary" : "bg-border"}`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Items */}
                    <div className="px-5 py-4 space-y-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl" />
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground">{item.brand}</p>
                            <p className="text-sm font-semibold text-foreground">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.qty} · ₹{item.price.toLocaleString()}</p>
                          </div>
                          <button className="text-xs text-primary border border-primary/30 rounded-full px-3 py-1 hover:bg-primary/5 transition-colors">
                            Buy Again
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="px-5 pb-4 flex gap-3">
                      {order.status === "delivered" && (
                        <button className="px-4 py-2 border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-all">
                          Write a Review
                        </button>
                      )}
                      <button className="px-4 py-2 border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-all">
                        Invoice
                      </button>
                      {order.status !== "delivered" && order.status !== "cancelled" && (
                        <button className="px-4 py-2 border border-destructive/30 text-destructive rounded-full text-sm hover:bg-destructive/5 transition-all">
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
