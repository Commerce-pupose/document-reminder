"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useAuth } from "@/backend/useHooks";

export default function MobileLoginPage() {
  const { login } = useAuth(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setAuthError(err?.message || "Invalid credentials or unauthorized account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface flex items-center justify-center min-h-screen relative overflow-hidden w-full px-4">
      {/* Background Atmospheric Elements */}
      <div className="aura-bg"></div>
      <div className="floating-orb w-[300px] h-[300px] bg-primary-container/20 -top-10 -left-10"></div>
      <div className="floating-orb w-[250px] h-[250px] bg-tertiary-container/20 -bottom-10 -right-10" style={{ animationDelay: "-5s" }}></div>

      <main className="relative z-10 w-full max-w-sm py-6">
        {/* Header Branding with Logo Image */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-white/50 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-center p-2 mb-3 overflow-hidden">
            <img
              src="/screen.png"
              alt="HR Portal Logo"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>

        </div>

        {/* Login Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-xl border border-white/60">
          <div className="mb-6">
            <h2 className={cn(typography.heading.h2, "text-on-surface font-bold text-xl")}>Welcome Back</h2>
            <p className={cn(typography.body.md, "text-on-surface-variant text-sm mt-0.5")}>Please enter your details to sign in.</p>
          </div>

          {authError && (
            <div className="p-3 bg-error/10 text-error rounded-xl text-xs font-semibold border border-error/20 flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[16px] shrink-0">warning</span>
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className={cn(typography.caption.sm, "text-on-surface-variant font-semibold block px-1")} htmlFor="mobile-email">
                Email Address
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors text-[20px]">
                  mail
                </span>
                <input
                  id="mobile-email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="input-glass w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-on-surface placeholder:text-outline-variant font-medium outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className={cn(typography.caption.sm, "text-on-surface-variant font-semibold")} htmlFor="mobile-password">
                  Password
                </label>
                <a href="#" className={cn(typography.caption.sm, "text-primary hover:underline font-semibold")}>
                  Forgot?
                </a>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors text-[20px]">
                  lock
                </span>
                <input
                  id="mobile-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-glass w-full pl-11 pr-11 py-3.5 rounded-xl text-sm text-on-surface placeholder:text-outline-variant font-medium outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-container text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-primary/20 transform transition-all active:scale-95 disabled:opacity-50 mt-2 cursor-pointer"
            >
              {loading ? "Verifying Credentials..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className={cn(typography.caption.md, "text-on-surface-variant text-center")}>
              New to the portal?{" "}
              <a href="#" className="text-primary font-bold hover:underline">
                Contact HR Admin
              </a>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 flex justify-center items-center gap-4 opacity-60">
          <span className={cn(typography.caption.sm, "text-on-surface-variant font-medium")}>Privacy Policy</span>
          <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
          <span className={cn(typography.caption.sm, "text-on-surface-variant font-medium")}>Security Standards</span>
        </div>
      </main>
    </div>
  );
}
