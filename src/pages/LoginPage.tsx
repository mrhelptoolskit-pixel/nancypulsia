import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import pulsiaLogo from "@/assets/pulsia-logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();

  // Redirect if already logged in
  if (user) {
    navigate("/dashboard", { replace: true });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    if (isSignUp) {
      const { error } = await signUp(email, password);
      if (error) {
        setError(error.message);
      } else {
        setMessage("Check your email for a confirmation link.");
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background noise-bg overflow-hidden relative">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="glass-surface p-10 space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <img src={pulsiaLogo} alt="PULSIA Logo" className="w-32 h-32 object-contain breathing" />
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="heading-display text-2xl text-foreground">Neuro-Command</h1>
            <p className="text-sm text-muted-foreground">
              {isSignUp ? "Create operator credentials" : "Authorized personnel only"}
            </p>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
              {error}
            </div>
          )}
          {message && (
            <div className="text-sm text-primary bg-primary/10 border border-primary/20 rounded-lg px-4 py-3">
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input w-full px-4 py-3 text-sm"
                placeholder="operator@pulsia.io"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input w-full px-4 py-3 text-sm"
                placeholder="••••••••••"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-magma ripple w-full py-3.5 text-sm uppercase tracking-widest disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                  {isSignUp ? "Registering..." : "Authenticating..."}
                </span>
              ) : isSignUp ? (
                "Register Operator"
              ) : (
                "Access Command"
              )}
            </button>
          </form>

          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }}
            className="w-full text-center text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            {isSignUp ? "Already have credentials? Sign in" : "Need access? Register"}
          </button>

          <p className="text-center text-xs text-muted-foreground/50">
            PULSIA Systems v3.2 — Encrypted Channel
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
