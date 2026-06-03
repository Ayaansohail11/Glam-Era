import { useState } from "react";
import { Link } from "react-router";
import { User, Package, Heart, MapPin, CreditCard, Bell, LogOut, ChevronRight, Star, Edit3 } from "lucide-react";

const menuItems = [
  { icon: Package, label: "My Orders", href: "/orders", badge: "3 Active" },
  { icon: Package, label: "Order History", href: "/order-history" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: MapPin, label: "Saved Addresses", href: "#" },
  { icon: CreditCard, label: "Payment Methods", href: "#" },
  { icon: Bell, label: "Notifications", href: "#" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [form, setForm] = useState({ name: "Priya Sharma", email: "priya@email.com", phone: "9876543210", dob: "1995-04-15" });

  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-border p-6 text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold">
                  P
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center">
                  <Edit3 size={12} />
                </button>
              </div>
              <h2 className="font-bold text-foreground">{form.name}</h2>
              <p className="text-xs text-muted-foreground">{form.email}</p>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs bg-amber-50 text-amber-700 rounded-full px-3 py-1">
                <Star size={11} fill="currentColor" className="text-amber-400" />
                Glaméra Gold Member
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">Beauty Points</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "#e91e8c" }}>2,840</p>
              </div>
            </div>

            {/* Menu */}
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              {menuItems.map(({ icon: Icon, label, href, badge }) => (
                <Link
                  key={label}
                  to={href}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-secondary/20 transition-colors border-b border-border/50 last:border-0 group"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm text-foreground">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {badge && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{badge}</span>}
                    <ChevronRight size={14} className="text-muted-foreground" />
                  </div>
                </Link>
              ))}
              <button className="flex items-center gap-3 px-5 py-3.5 w-full text-left hover:bg-red-50 transition-colors text-destructive">
                <LogOut size={16} />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-border px-6">
                {[
                  { id: "profile", label: "Profile" },
                  { id: "preferences", label: "Preferences" },
                  { id: "security", label: "Security" },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-4 text-sm font-semibold border-b-2 transition-all ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "profile" && (
                  <form onSubmit={e => e.preventDefault()} className="space-y-5">
                    <h2 className="font-bold text-foreground mb-4">Personal Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Full Name</label>
                        <input
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Phone</label>
                        <input
                          value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs text-muted-foreground mb-1 block">Email</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Date of Birth</label>
                        <input
                          type="date"
                          value={form.dob}
                          onChange={e => setForm(f => ({ ...f, dob: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                    <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors">
                      Save Changes
                    </button>
                  </form>
                )}

                {activeTab === "preferences" && (
                  <div className="space-y-5">
                    <h2 className="font-bold text-foreground mb-4">Beauty Preferences</h2>
                    {[
                      { label: "Email Newsletters", desc: "Receive beauty tips and new launch alerts" },
                      { label: "SMS Notifications", desc: "Order updates via SMS" },
                      { label: "Personalised Recommendations", desc: "AI-powered product suggestions based on your history" },
                      { label: "Loyalty Points Alerts", desc: "Get notified when you earn or can redeem points" },
                    ].map(p => (
                      <div key={p.label} className="flex items-center justify-between py-3 border-b border-border/50">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{p.label}</p>
                          <p className="text-xs text-muted-foreground">{p.desc}</p>
                        </div>
                        <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-5">
                    <h2 className="font-bold text-foreground mb-4">Security Settings</h2>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Confirm New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <button className="px-6 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors">
                      Update Password
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
