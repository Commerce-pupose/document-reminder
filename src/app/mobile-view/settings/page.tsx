"use client";

import { useState } from "react";
import MobileBottomNavBar from "../components/MobileBottomNavBar";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";

export default function MobileSettingsPage() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [biometricLogin, setBiometricLogin] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className="bg-background text-on-background min-h-screen relative z-[100] pb-32">
      {/* Background layer covering desktop sidebar */}
      <div className="fixed inset-0 bg-background z-[99]"></div>

      <div className="relative z-[100]">
        <div className="aura-bg pointer-events-none"></div>

        {/* TopAppBar */}
        <header className="w-full top-0 sticky z-[110] bg-surface/60 backdrop-blur-xl border-b border-white/20 shadow-sm flex justify-between items-center px-4 py-4">
          <h1 className={cn(typography.heading.h1, "text-primary tracking-tight")}>Settings</h1>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-primary hover:bg-white/10 transition-colors p-2 rounded-full cursor-pointer active:scale-95 duration-200">notifications</button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/20">
              <img className="w-full h-full object-cover" alt="Profile Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJypuqM8BkTMj1AJ-UyWyCzQguag_LV14ABxNzMtg056XsoTna-RvJ8-qAITilJ-gimyuTEi5ML7Rj94Aec-Na8TARkLzdIGGHg0eqrCTSxCPDhMLqchCTmzyHsMWfWxKSq47ZHoEhCGLTR3A1RtAg2ZZjvX1iow-VADDFS7KVgevR_r-myQQq8T5fhITqeNR6M69UBtc4uEaI-avVV-mU_iOM03C8OI7GW9wed53HoGkj6muO9iBeQI7mXP13Hu5h2PeCIdrqSjM" />
            </div>
          </div>
        </header>

        <main className="px-4 pt-6 space-y-8 max-w-md mx-auto">
          {/* User Profile Section */}
          <section className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative p-1 rounded-full active-ring bg-surface-container-low">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Sarah Jenkins" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfVqiNX6-8h7hMsA8GZYcl-Xv4k0sOsfxLD92titZl8FuP3jUFP_46Zs7x6Di1RqavuPPwcC-_UaHBxcEqfau_hg2Drb8mfj31gRwcz4e5wCKeZjOJtJiXKftjJrO7UFCAM75_BeGAo4eQWyxfUeBAmWip82Z0uRROjhJW7RcRz3pKA7GNttasida41C-G2drcI5M1CYqsxNhX_OBwVCx3uJ33WoGyz-v2k1I2aPujwiKlQizkUtea5pMoN1GkyibkO6g_EFa2u0o" />
                </div>
              </div>
              <div>
                <h2 className={cn(typography.heading.h3, "text-on-surface")}>Sarah Jenkins</h2>
                <p className={cn(typography.body.md, "text-on-surface-variant")}>HR Director</p>
              </div>
            </div>
            <button className={cn(typography.button.sm, "text-primary hover:underline")}>Edit</button>
          </section>

          {/* Notification Controls */}
          <div className="space-y-4">
            <h3 className={cn(typography.label.md, "text-outline uppercase tracking-widest px-1")}>Notifications</h3>
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl overflow-hidden divide-y divide-white/10 shadow-sm">
              <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setPushNotifications(!pushNotifications)}>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">campaign</span>
                  <span className={cn(typography.body.md, "font-medium")}>Push Notifications</span>
                </div>
                <div className={`toggle-switch ${pushNotifications ? 'toggle-active' : ''}`}></div>
              </div>
              <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setEmailAlerts(!emailAlerts)}>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">mail</span>
                  <span className={cn(typography.body.md, "font-medium")}>Email Alerts</span>
                </div>
                <div className={`toggle-switch ${emailAlerts ? 'toggle-active' : ''}`}></div>
              </div>
            </div>
          </div>

          {/* Security & Privacy */}
          <div className="space-y-4">
            <h3 className={cn(typography.label.md, "text-outline uppercase tracking-widest px-1")}>Security & Privacy</h3>
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl overflow-hidden divide-y divide-white/10 shadow-sm">
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/60 transition-colors" onClick={() => setBiometricLogin(!biometricLogin)}>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">fingerprint</span>
                  <span className={cn(typography.body.md, "font-medium")}>Biometric Login</span>
                </div>
                <div className={`toggle-switch ${biometricLogin ? 'toggle-active' : ''}`}></div>
              </div>
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/60 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">lock</span>
                  <span className={cn(typography.body.md, "font-medium")}>Change Password</span>
                </div>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </div>
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/60 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
                  <span className={cn(typography.body.md, "font-medium")}>Privacy Settings</span>
                </div>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="space-y-4">
            <h3 className={cn(typography.label.md, "text-outline uppercase tracking-widest px-1")}>Appearance</h3>
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-2 flex shadow-sm">
              <button
                className={cn("flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300", theme === 'light' ? 'bg-primary text-white font-bold shadow-md' : 'text-on-surface-variant hover:text-primary')}
                onClick={() => setTheme('light')}
              >
                <span className="material-symbols-outlined text-[18px]">light_mode</span>
                <span className={cn(typography.button.sm)}>Light</span>
              </button>
              <button
                className={cn("flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300", theme === 'dark' ? 'bg-primary text-white font-bold shadow-md' : 'text-on-surface-variant hover:text-primary')}
                onClick={() => setTheme('dark')}
              >
                <span className="material-symbols-outlined text-[18px]">dark_mode</span>
                <span className={cn(typography.button.sm)}>Dark</span>
              </button>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className={cn(typography.label.md, "text-outline uppercase tracking-widest px-1")}>Support</h3>
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl overflow-hidden divide-y divide-white/10 shadow-sm">
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/60 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">help</span>
                  <span className={cn(typography.body.md, "font-medium")}>Help Center</span>
                </div>
                <span className="material-symbols-outlined text-outline">open_in_new</span>
              </div>
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/60 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">policy</span>
                  <span className={cn(typography.body.md, "font-medium")}>Privacy Policy</span>
                </div>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button className={cn(typography.button.lg, "w-full py-4 rounded-xl bg-white/40 backdrop-blur-md border border-error/20 flex items-center justify-center gap-2 text-error shadow-sm active:scale-[0.98] transition-all hover:bg-error/5")}>
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </main>

        <MobileBottomNavBar />
      </div>
    </div>
  );
}
