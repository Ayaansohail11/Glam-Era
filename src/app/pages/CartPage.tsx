import { Link, useNavigate } from "react-router";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag, Truck } from "lucide-react";
import { useCart } from "../hooks/useCart";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();
  const deliveryFee = cartTotal >= 999 ? 0 : 99;
  const total = cartTotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-secondary/10 flex flex-col items-center justify-center gap-5 px-4">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
          <ShoppingBag size={40} className="text-primary" />
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 600 }}>Your bag is empty</h2>
        <p className="text-muted-foreground text-sm text-center max-w-xs">Add some products to your bag and they will show up here.</p>
        <Link
          to="/collections"
          className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "#1a1a2e" }} className="mb-8">
          My Bag ({cartCount} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="bg-white rounded-2xl border border-border p-4 flex gap-4">
                <Link to={`/product/${product.id}`} className="shrink-0">
                  <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-xl" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.brand}</p>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-sm font-semibold text-foreground hover:text-primary line-clamp-2">{product.name}</h3>
                      </Link>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="shrink-0 p-1 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded-full">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:text-primary"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:text-primary"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">₹{(product.price * quantity).toLocaleString()}</p>
                      {product.originalPrice > product.price && (
                        <p className="text-xs text-muted-foreground line-through">₹{(product.originalPrice * quantity).toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon */}
            <div className="bg-white rounded-2xl border border-border p-4">
              <div className="flex gap-2">
                <div className="flex items-center gap-2 flex-1 border border-border rounded-full px-4">
                  <Tag size={16} className="text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="flex-1 py-2 text-sm focus:outline-none bg-transparent"
                  />
                </div>
                <button className="px-5 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors">
                  Apply
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 ml-1">Try: <span className="text-primary font-medium">GLAM20</span> for 20% off</p>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
              <h2 className="text-base font-bold text-foreground mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({cartCount} items)</span>
                  <span className="text-foreground font-semibold">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className={deliveryFee === 0 ? "text-green-600 font-semibold" : "text-foreground font-semibold"}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                {deliveryFee === 0 && (
                  <div className="flex items-center gap-1.5 bg-green-50 text-green-700 text-xs px-3 py-2 rounded-lg">
                    <Truck size={12} />
                    You qualify for free delivery!
                  </div>
                )}
                {deliveryFee > 0 && (
                  <p className="text-xs text-muted-foreground">Add ₹{(999 - cartTotal).toLocaleString()} more for free delivery</p>
                )}
              </div>

              <div className="border-t border-border mt-5 pt-4 flex justify-between items-center">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-xl font-bold text-foreground">₹{total.toLocaleString()}</span>
              </div>

              <p className="text-xs text-green-600 mt-1 text-right">
                You save ₹{cart.reduce((s, { product, quantity }) => s + (product.originalPrice - product.price) * quantity, 0).toLocaleString()}
              </p>

              <button
                onClick={() => navigate("/payment")}
                className="w-full mt-5 py-3.5 bg-primary text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                Proceed to Payment <ArrowRight size={16} />
              </button>

              <Link
                to="/collections"
                className="block text-center mt-3 text-sm text-primary hover:underline"
              >
                Continue Shopping
              </Link>

              {/* Safe Payment */}
              <div className="mt-5 pt-5 border-t border-border">
                <p className="text-xs text-muted-foreground text-center mb-2">Safe & Secure Payment</p>
                <div className="flex justify-center gap-2">
                  {["Visa", "MC", "UPI", "Paytm", "GPay"].map(p => (
                    <span key={p} className="border border-border rounded px-1.5 py-0.5 text-xs text-muted-foreground">{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
