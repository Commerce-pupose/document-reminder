import Link from 'next/link';

export default function MobileEmployeesTopAppBar() {
  return (
    <header className="fixed top-0 left-0 w-full z-[110] bg-surface/60 backdrop-blur-2xl border-b border-white/20 shadow-sm flex justify-between items-center px-4 py-4">
      <div className="flex items-center gap-3">
        <Link href="/mobile-view" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/40 border border-white/30 backdrop-blur-md hover:opacity-80 transition-opacity active:scale-95 shadow-sm">
          <span className="material-symbols-outlined text-primary">arrow_back_ios_new</span>
        </Link>
        <span className="font-bold text-[20px] text-primary">Employee Docs</span>
      </div>
      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/40 border border-white/30 backdrop-blur-md text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 shadow-sm">
        <span className="material-symbols-outlined">notifications</span>
      </button>
    </header>
  );
}
