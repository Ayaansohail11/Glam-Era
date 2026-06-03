import { Link } from "react-router";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../hooks/useCart";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-secondary/10 flex flex-col items-center justify-center gap-5 px-4 text-center">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
          <Heart size={40} className="text-primary" />
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 600 }}>Your wishlist is empty</h2>
        <p className="text-muted-foreground text-sm max-w-xs">Save your favourite products here and shop them any time.</p>
        <Link to="/collections" className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "#1a1a2e" }} className="mb-2">
          My Wishlist
        </h1>
        <p className="text-muted-foreground text-sm mb-8">{wishlist.length} saved item{wishlist.length > 1 ? "s" : ""}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map(({ product }) => (
            <div key={product.id} className="bg-white rounded-2xl border border-border overflow-hidden group hover:shadow-lg transition-all">
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ aspectRatio: "1" }}
                  />
                </Link>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow text-destructive hover:bg-destructive hover:text-white transition-all"
                >
                  <Trash2 size={14} />
                </button>
                {product.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{product.brand}</p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-sm font-semibold text-foreground hover:text-primary line-clamp-2 mb-2">{product.name}</h3>
                </Link>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-2 bg-primary text-white rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  <ShoppingBag size={14} /> Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
