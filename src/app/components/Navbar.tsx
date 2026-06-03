import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { ShoppingBag, Heart, Search, User, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "../hooks/useCart";

const navLinks = [
  {
    label: "Shop",
    href: "/collections",
    dropdown: [
      { label: "All Collections", href: "/collections" },
      { label: "New Arrivals", href: "/new-collection" },
      { label: "Makeup", href: "/collections?category=Makeup" },
      { label: "Skincare", href: "/collections?category=Skincare" },
      { label: "Hair", href: "/collections?category=Hair" },
      { label: "Fragrance", href: "/collections?category=Fragrance" },
    ],
  },
  { label: "New Arrivals", href: "/new-collection" },
  { label: "Bestsellers", href: "/collections?filter=bestseller" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, wishlist } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm tracking-wide">
        🌸 Free shipping on orders above ₹999 | Use code <strong>GLAM20</strong> for 20% off
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 shrink-0">
            <span style={{ fontFamily: "'Playfair Display', serif", color: "#e91e8c", fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.5px" }}>
              Glam
            </span>
            <span style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a2e", fontSize: "1.75rem", fontWeight: 400, fontStyle: "italic" }}>
              éra
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={link.href}
                  className={`flex items-center gap-0.5 text-sm transition-colors hover:text-primary ${location.pathname === link.href ? "text-primary" : "text-foreground"}`}
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} className="opacity-60" />}
                </Link>

                {link.dropdown && openDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-xl shadow-xl py-2 w-48 z-50">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:text-primary transition-colors rounded-full hover:bg-secondary"
            >
              <Search size={20} />
            </button>

            <Link to="/wishlist" className="relative p-2 hover:text-primary transition-colors rounded-full hover:bg-secondary">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 hover:text-primary transition-colors rounded-full hover:bg-secondary">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/profile" className="hidden sm:flex p-2 hover:text-primary transition-colors rounded-full hover:bg-secondary">
              <User size={20} />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 hover:text-primary transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-border bg-white px-4 py-3">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands..."
                className="flex-1 px-4 py-2 border border-border rounded-full text-sm focus:outline-none focus:border-primary bg-input-background"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-primary text-white rounded-full text-sm hover:bg-primary/90 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-white px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  to={link.href}
                  className="block py-2 text-foreground hover:text-primary font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.dropdown && (
                  <div className="pl-4 space-y-1">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="block py-1 text-sm text-muted-foreground hover:text-primary"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/profile" className="block py-2 text-foreground hover:text-primary font-medium" onClick={() => setMobileOpen(false)}>
              My Account
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
