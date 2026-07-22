"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Dashboard", icon: "dashboard" },
    { href: "/employees", label: "Employees", icon: "group" },
    { href: "/calendar", label: "Calendar", icon: "calendar_month" },
    { href: "/reports", label: "Reports", icon: "analytics" },
    { href: "/settings", label: "Settings", icon: "settings" },
  ];

  return (
    <aside className="hidden md:flex h-screen w-[220px] fixed left-0 top-0 backdrop-blur-[20px] border-r border-white/20 bg-surface-container/60 flex-col py-8 px-5 z-50">
      <div className="mb-12 flex items-center gap-3 px-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined">corporate_fare</span>
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">HR Portal</h1>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/70 font-bold">Document Management</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all ${isActive
                  ? "text-primary font-bold border-r-4 border-primary active:scale-95"
                  : "text-on-surface-variant hover:bg-white/10"
                }`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span className="font-body-md text-body-md">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button className="w-full py-4 px-4 bg-primary text-white rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-primary/30 hover:opacity-90 transition-all active:scale-95">
          <span className="material-symbols-outlined">upload_file</span>
          <span>Upload Document</span>
        </button>

        <div className="mt-8 flex items-center gap-3 p-2 bg-white/10 rounded-2xl">
          <img className="w-10 h-10 rounded-full border-2 border-primary-fixed" alt="Alex Rivera - HR Manager" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRT1Z5ZmSWAliD-C5hcppYdZ4fC-MyofcYDGBtDQD2Eeg8AIXcDgyJxUYJ0OfD45IwPYT_FdU3QZyGFOaH26vIa7AvPQIKT-Klxheo9Pm8py9yu2t0MKz9PV9CBnaJxmHsyxN7Dad0bSqfANl8FQ4-0wDP5mlk0Z8sTljwp9dvJNYQU5HvCts_TTWVvX7G9oZbg7JjA7flFHL8hNTRiWmH7BJyE9kKHmUSk_pDoGXgz8ZhaaYwCBhLpAccENE1qVWeD0qdYisit5g" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold truncate">Alex Rivera</p>
            <p className="text-[10px] text-on-surface-variant truncate">Lead HR Manager</p>
          </div>
          <span className="material-symbols-outlined text-primary text-sm">verified</span>
        </div>
      </div>
    </aside>
  );
}
