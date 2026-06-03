import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageCircle, Instagram, Twitter } from "lucide-react";

const faqs = [
  { q: "How long does delivery take?", a: "Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available for select cities. Free delivery on orders above ₹999." },
  { q: "Can I return a product?", a: "Yes! We offer 30-day hassle-free returns on most products. Products must be unused and in original packaging. Clearance items are non-returnable." },
  { q: "Are all products authentic?", a: "Absolutely. We source 100% of our products directly from brands or authorized distributors. We guarantee authenticity on every single product." },
  { q: "How do I track my order?", a: "Once your order ships, you'll receive an SMS and email with a tracking link. You can also track from the 'My Orders' section in your account." },
  { q: "Do you offer gift wrapping?", a: "Yes! Select 'Gift Wrap' at checkout for beautiful premium packaging with a personalised message card. Available for ₹99." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-secondary/30 border-b border-border py-14 px-4 text-center">
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">We're Here for You</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700, color: "#1a1a2e" }}>
          Get in Touch
        </h1>
        <p className="text-muted-foreground mt-3 text-base max-w-md mx-auto">
          Have a question, feedback, or just want to say hi? Our beauty experts are always happy to help.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-5">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 600, color: "#1a1a2e" }}>
              Contact Information
            </h2>

            {[
              {
                icon: Phone,
                title: "Phone",
                lines: ["+91 98765 43210", "+91 22 4567 8901"],
              },
              {
                icon: Mail,
                title: "Email",
                lines: ["hello@glaméra.in", "support@glaméra.in"],
              },
              {
                icon: MapPin,
                title: "Address",
                lines: ["123 Beauty Street, Bandra West", "Mumbai, Maharashtra 400050"],
              },
              {
                icon: Clock,
                title: "Support Hours",
                lines: ["Mon – Sat: 9am – 8pm IST", "Sun: 10am – 5pm IST"],
              },
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} className="flex gap-4 p-4 bg-secondary/20 rounded-xl border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-1">{title}</p>
                  {lines.map(l => <p key={l} className="text-sm text-muted-foreground">{l}</p>)}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="pt-2">
              <p className="text-sm font-bold text-foreground mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, label: "@glaméra.beauty" },
                  { icon: Twitter, label: "@glaméra" },
                  { icon: MessageCircle, label: "WhatsApp" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="flex items-center gap-1.5 px-3 py-2 border border-border rounded-full text-xs text-muted-foreground hover:border-primary hover:text-primary transition-all"
                  >
                    <Icon size={14} /> {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-secondary/20 rounded-2xl border border-border">
                <CheckCircle size={48} className="text-green-500 mb-4" />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 600, color: "#1a1a2e" }}>
                  Message Sent!
                </h3>
                <p className="text-muted-foreground mt-2 max-w-sm">
                  Thanks for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-6 px-6 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border p-8 space-y-5">
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 600, color: "#1a1a2e" }}>
                  Send Us a Message
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Full Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Priya Sharma"
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="priya@email.com"
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Subject *</label>
                  <select
                    required
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors bg-white text-foreground"
                  >
                    <option value="">Select a topic</option>
                    <option>Order & Delivery</option>
                    <option>Returns & Refunds</option>
                    <option>Product Authenticity</option>
                    <option>Payment Issues</option>
                    <option>Partnership / Brand</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-primary text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
                >
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Quick Answers</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "#1a1a2e" }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-secondary/20 transition-colors"
                >
                  <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
                  <span className={`text-primary text-lg font-bold shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
