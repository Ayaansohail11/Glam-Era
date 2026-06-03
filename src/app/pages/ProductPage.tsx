import { useState } from "react";
import { useParams, Link } from "react-router";
import { Star, Heart, ShoppingBag, Minus, Plus, Share2, Truck, RotateCcw, Shield, ChevronRight } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../hooks/useCart";
import { ProductCard } from "../components/ProductCard";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-6xl">🔍</p>
        <h2 className="text-xl font-semibold">Product not found</h2>
        <Link to="/collections" className="text-primary hover:underline">Back to Collections</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-secondary/20 border-b border-border px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={12} />
          <Link to="/collections" className="hover:text-primary">Collections</Link>
          <ChevronRight size={12} />
          <Link to={`/collections?category=${product.category}`} className="hover:text-primary">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? "border-primary" : "border-border"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 relative rounded-2xl overflow-hidden bg-secondary" style={{ aspectRatio: "1" }}>
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-green-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                  {product.discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="mb-1">
              {product.isNew && <span className="bg-primary text-white text-xs px-2.5 py-0.5 rounded-full font-semibold mr-2">NEW</span>}
              {product.isBestseller && <span className="bg-amber-400 text-amber-900 text-xs px-2.5 py-0.5 rounded-full font-semibold">BESTSELLER</span>}
            </div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mt-3 mb-1">{product.brand}</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 600, color: "#1a1a2e" }}>
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={14} className={s <= Math.round(product.rating) ? "text-amber-400" : "text-gray-200"} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm font-semibold">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mt-5">
              <span style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1a1a2e" }}>₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="bg-green-100 text-green-700 text-sm px-2 py-0.5 rounded font-semibold">{product.discount}% off</span>
                </>
              )}
            </div>

            <p className="text-muted-foreground text-xs mt-1">Inclusive of all taxes. Free shipping on this order.</p>

            {/* Quantity */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-foreground mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-full">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center hover:text-primary transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="w-9 h-9 flex items-center justify-center hover:text-primary transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold transition-all ${added ? "bg-green-500 text-white" : "bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"}`}
              >
                <ShoppingBag size={18} />
                {added ? "Added to Bag!" : "Add to Bag"}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all ${inWishlist ? "bg-primary border-primary text-white" : "border-border hover:border-primary hover:text-primary"}`}
              >
                <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-border hover:border-primary hover:text-primary transition-all">
                <Share2 size={18} />
              </button>
            </div>

            <Link
              to="/cart"
              onClick={() => { for (let i = 0; i < qty; i++) addToCart(product); }}
              className="block w-full text-center py-3.5 mt-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all"
            >
              Buy Now
            </Link>

            {/* Guarantees */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: Truck, text: "Free Delivery" },
                { icon: RotateCcw, text: "Easy Returns" },
                { icon: Shield, text: "100% Authentic" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1.5 p-3 bg-secondary/30 rounded-xl text-center">
                  <Icon size={16} className="text-primary" />
                  <span className="text-xs text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="mt-8 border-t border-border pt-6">
              <div className="flex gap-6 border-b border-border">
                {["description", "details", "reviews"].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-semibold capitalize transition-all border-b-2 ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="pt-5">
                {activeTab === "description" && (
                  <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
                )}
                {activeTab === "details" && (
                  <div className="space-y-2">
                    {[
                      ["Brand", product.brand],
                      ["Category", `${product.category} / ${product.subcategory}`],
                      ["Tags", product.tags.join(", ")],
                      ["Rating", `${product.rating} / 5`],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-4 text-sm py-2 border-b border-border/50">
                        <span className="w-28 text-muted-foreground shrink-0">{k}</span>
                        <span className="text-foreground">{v}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    {[
                      { name: "Priya S.", text: "Absolutely love this product! Works exactly as described.", stars: 5 },
                      { name: "Meera K.", text: "Great quality, will buy again. Packaging is beautiful too.", stars: 4 },
                    ].map(r => (
                      <div key={r.name} className="pb-4 border-b border-border/50">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold">{r.name}</span>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(s => (
                              <Star key={s} size={11} className={s <= r.stars ? "text-amber-400" : "text-gray-200"} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{r.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 600, color: "#1a1a2e" }} className="mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
