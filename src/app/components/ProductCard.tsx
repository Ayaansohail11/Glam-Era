import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../hooks/useCart";
import type { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.isNew && (
          <span className="bg-primary text-white text-xs px-2.5 py-0.5 rounded-full font-semibold">NEW</span>
        )}
        {product.isBestseller && (
          <span className="bg-amber-400 text-amber-900 text-xs px-2.5 py-0.5 rounded-full font-semibold">BESTSELLER</span>
        )}
        {product.discount > 0 && (
          <span className="bg-green-500 text-white text-xs px-2.5 py-0.5 rounded-full font-semibold">{product.discount}% OFF</span>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={() => toggleWishlist(product)}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 ${inWishlist ? "bg-primary text-white" : "bg-white/80 text-foreground hover:bg-primary hover:text-white"}`}
      >
        <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden bg-secondary" style={{ aspectRatio: "1" }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Quick Add overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={(e) => { e.preventDefault(); addToCart(product); }}
              className="w-full py-2.5 bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90"
            >
              <ShoppingBag size={16} />
              Quick Add
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{product.brand}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm text-foreground leading-snug hover:text-primary transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <Star size={12} className="text-amber-400" fill="currentColor" />
          <span className="text-xs text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-foreground font-semibold">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-muted-foreground line-through text-xs">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
}
