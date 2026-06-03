import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronRight, CreditCard, Smartphone, Building, CheckCircle, Lock } from "lucide-react";
import { useCart } from "../hooks/useCart";

type PaymentMethod = "card" | "upi" | "netbanking" | "cod";

export default function PaymentPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"address" | "payment" | "confirm">("address");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);

  const [address, setAddress] = useState({
    name: "Priya Sharma",
    phone: "9876543210",
    line1: "42 Rose Garden Apartments",
    line2: "Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
  });

  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [upi, setUpi] = useState("");

  const deliveryFee = cartTotal >= 999 ? 0 : 99;
  const total = cartTotal + deliveryFee;

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setPlaced(true);
      clearCart();
    }, 2000);
  };

  if (placed) {
    return (
      <div className="min-h-screen bg-secondary/10 flex flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "#1a1a2e" }}>
            Order Placed! 🎉
          </h2>
          <p className="text-muted-foreground mt-2">Your order has been placed successfully. We'll send you a confirmation email shortly.</p>
          <p className="text-primary font-semibold mt-1">Order #GLM{Date.now().toString().slice(-6)}</p>
        </div>
        <div className="flex gap-3">
          <Link to="/order-history" className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors">
            View My Orders
          </Link>
          <Link to="/" className="px-6 py-3 border border-border text-foreground rounded-full font-semibold hover:border-primary hover:text-primary transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-foreground">Your cart is empty.</p>
        <Link to="/collections" className="text-primary hover:underline">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "#1a1a2e" }} className="mb-8">
          Checkout
        </h1>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-8">
          {[["address", "Delivery"], ["payment", "Payment"], ["confirm", "Review"]].map(([s, label], i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === s || (s === "address" && step !== "address") || (s === "payment" && step === "confirm") ? "bg-primary text-white" : "bg-border text-muted-foreground"}`}>
                {i + 1}
              </div>
              <span className={`text-sm font-semibold ${step === s ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
              {i < 2 && <ChevronRight size={14} className="text-muted-foreground" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Address Step */}
            {step === "address" && (
              <div className="bg-white rounded-2xl border border-border p-6">
                <h2 className="text-base font-bold mb-5">Delivery Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "Full Name", col: 1 },
                    { key: "phone", label: "Phone", col: 1 },
                    { key: "line1", label: "Address Line 1", col: 2 },
                    { key: "line2", label: "Address Line 2", col: 2 },
                    { key: "city", label: "City", col: 1 },
                    { key: "state", label: "State", col: 1 },
                    { key: "pincode", label: "Pincode", col: 1 },
                  ].map(f => (
                    <div key={f.key} className={f.col === 2 ? "col-span-2" : ""}>
                      <label className="text-xs text-muted-foreground mb-1 block">{f.label}</label>
                      <input
                        value={address[f.key as keyof typeof address]}
                        onChange={e => setAddress(a => ({ ...a, [f.key]: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStep("payment")}
                  className="mt-6 w-full py-3.5 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all"
                >
                  Proceed to Payment
                </button>
              </div>
            )}

            {/* Payment Step */}
            {step === "payment" && (
              <div className="bg-white rounded-2xl border border-border p-6">
                <h2 className="text-base font-bold mb-5 flex items-center gap-2">
                  <Lock size={16} className="text-primary" /> Secure Payment
                </h2>

                {/* Payment method tabs */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {([
                    { id: "card", icon: CreditCard, label: "Card" },
                    { id: "upi", icon: Smartphone, label: "UPI" },
                    { id: "netbanking", icon: Building, label: "Net Banking" },
                    { id: "cod", icon: null, label: "COD" },
                  ] as { id: PaymentMethod; icon: any; label: string }[]).map(m => (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-xs font-semibold transition-all ${paymentMethod === m.id ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
                    >
                      {m.icon ? <m.icon size={18} /> : <span className="text-lg">💵</span>}
                      {m.label}
                    </button>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Card Number</label>
                      <input
                        value={card.number}
                        onChange={e => setCard(c => ({ ...c, number: e.target.value }))}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Expiry Date</label>
                        <input
                          value={card.expiry}
                          onChange={e => setCard(c => ({ ...c, expiry: e.target.value }))}
                          placeholder="MM / YY"
                          className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">CVV</label>
                        <input
                          value={card.cvv}
                          onChange={e => setCard(c => ({ ...c, cvv: e.target.value }))}
                          placeholder="•••"
                          type="password"
                          className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Name on Card</label>
                      <input
                        value={card.name}
                        onChange={e => setCard(c => ({ ...c, name: e.target.value }))}
                        placeholder="Priya Sharma"
                        className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">UPI ID</label>
                    <input
                      value={upi}
                      onChange={e => setUpi(e.target.value)}
                      placeholder="yourname@upi"
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                    />
                    <div className="mt-4 flex gap-2 flex-wrap">
                      {["Google Pay", "PhonePe", "Paytm", "BHIM"].map(app => (
                        <button key={app} className="px-4 py-2 border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-all">
                          {app}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div className="grid grid-cols-3 gap-3">
                    {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "Yes Bank"].map(bank => (
                      <button key={bank} className="py-3 border border-border rounded-xl text-sm font-semibold hover:border-primary hover:text-primary transition-all">
                        {bank}
                      </button>
                    ))}
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                    <p className="font-semibold mb-1">Cash on Delivery</p>
                    <p>Pay ₹{total.toLocaleString()} when your order is delivered. Additional ₹50 COD charge may apply.</p>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep("address")} className="px-5 py-3 border border-border rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-all">
                    Back
                  </button>
                  <button onClick={() => setStep("confirm")} className="flex-1 py-3.5 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all">
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Confirm Step */}
            {step === "confirm" && (
              <div className="bg-white rounded-2xl border border-border p-6">
                <h2 className="text-base font-bold mb-5">Review Your Order</h2>

                <div className="space-y-3 mb-6">
                  {cart.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-3 py-3 border-b border-border/50">
                      <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.brand} · Qty: {quantity}</p>
                      </div>
                      <p className="text-sm font-bold">₹{(product.price * quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-secondary/30 rounded-xl p-4 mb-6 text-sm">
                  <p className="font-semibold mb-2 text-foreground">Delivery Address</p>
                  <p className="text-muted-foreground">{address.name} · {address.phone}</p>
                  <p className="text-muted-foreground">{address.line1}, {address.line2}</p>
                  <p className="text-muted-foreground">{address.city}, {address.state} - {address.pincode}</p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep("payment")} className="px-5 py-3 border border-border rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-all">
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className="flex-1 py-3.5 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all disabled:opacity-70"
                  >
                    {placing ? "Placing Order..." : `Place Order · ₹${total.toLocaleString()}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
              <h2 className="text-base font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm mb-4">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between">
                    <span className="text-muted-foreground truncate mr-2">{product.name} ×{quantity}</span>
                    <span className="font-semibold shrink-0">₹{(product.price * quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className={deliveryFee === 0 ? "text-green-600 font-semibold" : ""}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-1 border-t border-border">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Lock size={12} className="text-green-500" />
                Secured with 256-bit SSL encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
