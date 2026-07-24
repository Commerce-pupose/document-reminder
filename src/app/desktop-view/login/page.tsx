"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useAuth } from "@/backend/useHooks";

export default function DesktopLoginPage() {
  const { login } = useAuth(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!cardRef.current) return;
      const xAxis = (window.innerWidth / 2 - e.pageX) / 20;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 20;
      cardRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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
    <div className="bg-background text-on-surface flex items-center justify-center min-h-screen relative overflow-hidden w-full px-6 py-8">
      {/* Background Atmospheric Elements */}
      <div className="aura-bg"></div>
      <div className="floating-orb w-[500px] h-[500px] bg-primary-container/20 -top-20 -left-20"></div>
      <div className="floating-orb w-[400px] h-[400px] bg-tertiary-container/20 -bottom-20 -right-20" style={{ animationDelay: "-5s" }}></div>

      <main className="relative z-10 w-full max-w-[1300px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Left Side: screen.png Image Preview Container (Takes half screen width: w-full h-[540px]) */}
        <div className="w-full">
          <div className="glass-panel p-8 rounded-3xl border border-white/60 shadow-2xl overflow-hidden w-full h-[540px] flex items-center justify-center relative group">
            <img
              src="/screen.png"
              alt="HR Portal Screen Preview"
              className="max-h-full max-w-full object-contain rounded-2xl shadow-lg transform group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>

        {/* Right Side: Login Component Card (Takes half screen width: w-full h-[540px]) */}
        <div className="w-full">
          <div
            ref={cardRef}
            className="glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between w-full h-[540px] transition-all duration-500 hover:shadow-2xl border border-white/60"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div>
              <div className="mb-6">
                <h2 className={cn(typography.heading.h1, "text-on-surface text-2xl font-bold")}>Welcome Back</h2>
                <p className={cn(typography.body.md, "text-on-surface-variant mt-1")}>Please enter your details to sign in.</p>
              </div>

              {authError && (
                <div className="p-3 bg-error/10 text-error rounded-xl text-xs font-semibold border border-error/20 flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-[18px] shrink-0">warning</span>
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className={cn(typography.caption.sm, "text-on-surface-variant px-1 font-semibold block")} htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">
                      mail
                    </span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="input-glass w-full pl-12 pr-4 py-3.5 rounded-xl text-body-md text-on-surface placeholder:text-outline-variant font-medium"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <label className={cn(typography.caption.sm, "text-on-surface-variant font-semibold")} htmlFor="password">
                      Password
                    </label>
                    <a href="#" className={cn(typography.caption.sm, "text-primary hover:underline transition-all font-semibold")}>
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">
                      lock
                    </span>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="input-glass w-full pl-12 pr-12 py-3.5 rounded-xl text-body-md text-on-surface placeholder:text-outline-variant font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface-variant transition-colors"
                    >
                      <span className="material-symbols-outlined">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-container text-white py-3.5 rounded-xl text-headline-md font-bold shadow-lg shadow-primary/20 transform transition-all active:scale-95 hover:-translate-y-[2px] disabled:opacity-50 cursor-pointer mt-2"
                >
                  {loading ? "Verifying Credentials..." : "Sign In"}
                </button>
              </form>
            </div>

            <div>
              <div className="pt-4 border-t border-white/20">
                <p className={cn(typography.body.md, "text-on-surface-variant text-center")}>
                  New to the portal?{" "}
                  <a href="#" className="text-primary font-bold hover:underline">
                    Contact HR Admin
                  </a>
                </p>
              </div>

              {/* Footer Note */}
              <div className="mt-4 flex justify-center items-center gap-6 opacity-60">
                <span className={cn(typography.caption.sm, "text-on-surface-variant font-medium")}>Privacy Policy</span>
                <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
                <span className={cn(typography.caption.sm, "text-on-surface-variant font-medium")}>Security Standards</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
