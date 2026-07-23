"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";

export default function MobileBottomNavBar() {
  const pathname = usePathname();

  const isDashboard = pathname === "/";
  const isEmployees = pathname === "/employees";
  const isDocuments = pathname === "/documents";
  const isSettings = pathname === "/settings";

  return (
    <nav className="fixed bottom-0 left-0 w-full z-[110] flex justify-around items-center px-4 pb-6 pt-3 backdrop-blur-3xl border-t border-white/20 shadow-[0_-10px_20px_rgba(70,72,212,0.1)] rounded-t-2xl bg-surface/80">
      <Link href="/" className={cn("flex flex-col items-center justify-center w-12 h-12 transition-transform", isDashboard ? 'text-primary scale-110' : 'text-on-surface-variant/70 hover:scale-110 active:text-primary')}>
        <span className="material-symbols-outlined text-[24px]" style={isDashboard ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
        <span className={cn(typography.caption.md, "mt-1 font-bold")}>Dashboard</span>
      </Link>
      
      <Link href="/employees" className={cn("flex flex-col items-center justify-center w-12 h-12 transition-transform", isEmployees ? 'bg-primary/10 text-primary rounded-full shadow-sm scale-110' : 'text-on-surface-variant/70 hover:scale-110 active:text-primary')}>
        <span className="material-symbols-outlined text-[24px]" style={isEmployees ? { fontVariationSettings: "'FILL' 1" } : {}}>group</span>
        <span className={cn(typography.caption.md, "mt-1 font-medium")}>Employees</span>
      </Link>
      
      <button className="bg-gradient-to-br from-primary to-tertiary flex items-center justify-center text-white rounded-full w-14 h-14 shadow-xl shadow-primary/40 -mt-8 border-4 border-surface active:scale-95 transition-transform hover:scale-105">
        <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'wght' 600" }}>add</span>
      </button>
      
      <Link href="/documents" className={cn("flex flex-col items-center justify-center w-12 h-12 transition-transform", isDocuments ? 'bg-primary/10 text-primary rounded-full shadow-sm scale-110' : 'text-on-surface-variant/70 hover:scale-110 active:text-primary')}>
        <span className="material-symbols-outlined text-[24px]" style={isDocuments ? { fontVariationSettings: "'FILL' 1" } : {}}>description</span>
        <span className={cn(typography.caption.md, "mt-1 font-medium")}>Documents</span>
      </Link>
      
      <Link href="/settings" className={cn("flex flex-col items-center justify-center w-12 h-12 transition-transform", isSettings ? 'bg-primary/10 text-primary rounded-full shadow-sm scale-110' : 'text-on-surface-variant/70 hover:scale-110 active:text-primary')}>
        <span className="material-symbols-outlined text-[24px]" style={isSettings ? { fontVariationSettings: "'FILL' 1" } : {}}>settings</span>
        <span className={cn(typography.caption.md, "mt-1 font-medium")}>Settings</span>
      </Link>
    </nav>
  );
}
