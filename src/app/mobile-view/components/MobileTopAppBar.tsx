export default function MobileTopAppBar() {
  return (
    <header className="fixed top-0 left-0 w-full z-[110] backdrop-blur-xl bg-surface/60 flex justify-between items-center px-4 py-4 border-b border-white/20">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary p-0.5 bg-white shadow-sm">
          <img className="w-full h-full object-cover rounded-full" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcCn6ZnNi3F-RdMwYLJy2w6HjMKVQlf6RdCQHQZ4uqBfzH-96oXtLC0NdBXMYrozZawNjhH-yqC-5vpqWeWVJWWJAY6r7JorZRS3nz9uFUz17dTi987GRXuqCSg_IwuwP5oqyxxgEInQ2Jg9CQkoq8vPI0_vk9LztpDWsvF7Bk0Wl5b8QyDZk6Sy9FDy5X-ldXP6hPCoYFKZF9XbfcJbNuiLa35Wd5ECuZxnYbFU5pbEyHqwRjpPSONHI8sE8rnNa80QbNdPpBjwM" />
        </div>
        <div>
          <h1 className="font-headline-md text-[18px] font-bold text-on-surface leading-tight">Good Morning, HR</h1>
          <p className="font-body-md text-xs text-on-surface-variant">Documents are under control.</p>
        </div>
      </div>
      <button className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:opacity-80 transition-opacity active:scale-95">
        <span className="material-symbols-outlined">notifications</span>
      </button>
    </header>
  );
}
