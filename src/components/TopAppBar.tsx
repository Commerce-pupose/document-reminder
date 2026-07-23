export default function TopAppBar() {
  return (
    <header className="hidden md:flex md:pl-[300px] sticky top-0 z-40 backdrop-blur-[40px] border-b border-white/10 bg-surface/40 justify-between items-center px-card-padding py-4">
      <div className="flex items-center gap-8 flex-1">
        <div className="max-w-[700px] w-full relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input className="w-full h-14 pl-12 pr-4 bg-white/20 border-none rounded-full focus:ring-2 focus:ring-primary/20 placeholder:text-outline text-sm transition-all" placeholder="Search employees, documents..." type="text" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">3</span>
        </button>
        <button className="hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-on-surface-variant">help</span>
        </button>
        <div className="h-8 w-px bg-outline-variant/30"></div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <img className="w-10 h-10 rounded-full border-2 border-primary/50 p-0.5" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4l9AQj0UqKEziDvaiyhGUXVLR4DMTGx06_fLha0Dn9u0D-dWILUTEghj1cG-0Qj3Fyw0LTfCdRxrxITGRgmqBuRE7LIZyjzWrnuFG-tIQnmnnDbVq0rrbl8sBvT56r-y2_ddQG2EbLy62V4DispxsAwegk7qfXTZGN-LOw5Sh7dT9UmJ34evb6mR4VXpUIcTJvY9udOyynY3nfdVTAAGp5fnDFSoL_H7PvCtT8ACYOJspR6QUBOPk4nTKcKowZf5I9e-qQZhQgE8" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
