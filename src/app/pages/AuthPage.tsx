import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") await login(form.email, form.password);
      else await register(form.name, form.email, form.password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <span style={{ fontFamily: "'Playfair Display', serif", color: "#e91e8c", fontSize: "2rem", fontWeight: 700 }}>Glam</span>
            <span style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a2e", fontSize: "2rem", fontStyle: "italic" }}>éra</span>
          </Link>
          <p className="text-muted-foreground text-sm mt-1">Your luxury beauty destination</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-border">
          {/* Tabs */}
          <div className="flex gap-1 bg-secondary/50 rounded-xl p-1 mb-6">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all capitalize ${mode === m ? "bg-white shadow text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            )}

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            {mode === "login" && (
              <div className="text-right">
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles size={16} />
                  {mode === "login" ? "Sign In" : "Create Account"}
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-5">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
              className="text-primary font-semibold hover:underline"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
