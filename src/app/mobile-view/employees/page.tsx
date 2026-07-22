import MobileEmployeesTopAppBar from "../components/MobileEmployeesTopAppBar";
import MobileBottomNavBar from "../components/MobileBottomNavBar";

export default function MobileEmployeesPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen relative z-[100] pb-32 overflow-x-hidden">
      {/* Background layer covering desktop sidebar */}
      <div className="fixed inset-0 bg-background z-[99]"></div>

      {/* Atmospheric Ambient Elements */}
      <div className="fixed top-1/4 -right-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full z-[100] animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-1/4 -left-20 w-64 h-64 bg-tertiary/10 blur-[100px] rounded-full z-[100] pointer-events-none"></div>

      <div className="relative z-[100]">
        <MobileEmployeesTopAppBar />

        <main className="pt-24 px-4 max-w-md mx-auto space-y-6">
          {/* Search Section */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className="w-full h-14 pl-12 pr-4 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md placeholder:text-outline-variant outline-none shadow-sm"
              placeholder="Find team members..."
              type="text"
            />
          </div>

          {/* Department Filters */}
          <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 py-2">
            <button className="px-6 py-2.5 rounded-full bg-primary text-white shadow-lg shadow-primary/20 font-bold text-xs whitespace-nowrap active:scale-95 transition-transform">All</button>
            <button className="px-6 py-2.5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-on-surface-variant font-bold text-xs whitespace-nowrap active:scale-95 transition-transform hover:bg-white/60">Design</button>
            <button className="px-6 py-2.5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-on-surface-variant font-bold text-xs whitespace-nowrap active:scale-95 transition-transform hover:bg-white/60">Engineering</button>
            <button className="px-6 py-2.5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-on-surface-variant font-bold text-xs whitespace-nowrap active:scale-95 transition-transform hover:bg-white/60">Marketing</button>
            <button className="px-6 py-2.5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-on-surface-variant font-bold text-xs whitespace-nowrap active:scale-95 transition-transform hover:bg-white/60">Sales</button>
          </div>

          {/* Staff List Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-xl text-on-surface">Team Directory</h2>
              <span className="font-bold text-xs text-outline">24 Total</span>
            </div>

            {/* Employee Card 1 */}
            <div className="bg-white/40 backdrop-blur-md border border-white/50 p-4 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all duration-300 shadow-sm cursor-pointer hover:bg-white/60">
              <div className="flex items-center gap-4">
                <div className="profile-ring">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
                    <img className="w-full h-full object-cover" alt="Alex Rivers" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5ZnJVpUmDYLZiKf2hyRqQLmBif8LlDKPYF6AYd7DgzIqawxZB8HyKtxu42Cb1_CR7iyg1nz46kZDegSji0CJf5EoirP4Jhe6eb_BmKuS4z1QGuz0W1gDTXj-BKIpLzwnQZOrApwMoccNeHcD3mv8oH2EJe85dJc9HKOXpE7A7Nl1jQXNfazoAbCTuvZIhlZoy96rNGgCdlpEjps4EBn7FnmfJUe3ngP2kJJTpWI-oFrJ-7iljbIlQRUOS9AxAteOmOooNqibsmqs" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base text-on-surface">Alex Rivers</h3>
                  <p className="font-bold text-[10px] text-outline uppercase tracking-wider">ID: #EMP-9021</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-100/50 text-blue-700 rounded text-[10px] font-bold uppercase tracking-tight">Engineering</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_rgba(70,72,212,0.6)]"></span>
                      VALID
                    </span>
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
            </div>

            {/* Employee Card 2 */}
            <div className="bg-white/40 backdrop-blur-md border border-white/50 p-4 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all duration-300 shadow-sm cursor-pointer hover:bg-white/60">
              <div className="flex items-center gap-4">
                <div className="profile-ring">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
                    <img className="w-full h-full object-cover" alt="Elena Chen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV0ZWf-aze3YC4Ci1tMw7zvRzLnOqxveaS_7bsrWojfHrt2f0lXv4mjVlOGuQppjKMQ6Eau2TUWAC2YyJlXBbEjHrwhcujE82nxQ2P_2KJVavH6CLLLrs-Uv73RffIMzU-_UHtK5SGw596R4AqzeKRCEiXe_5ADcnX-xybaTjpzAvE6luDeFnZE2FbqU0HTX1B0rbl0CjKwXR9AhG0_XnuBWSr7FrHjf1WQicYboJckjCY6jYg1MdzPaZo0p9YytMn8Y4KJWryKaA" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base text-on-surface">Elena Chen</h3>
                  <p className="font-bold text-[10px] text-outline uppercase tracking-wider">ID: #EMP-4423</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-purple-100/50 text-purple-700 rounded text-[10px] font-bold uppercase tracking-tight">Design</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-error">
                      <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                      EXPIRED
                    </span>
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
            </div>

            {/* Employee Card 3 */}
            <div className="bg-white/40 backdrop-blur-md border border-white/50 p-4 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all duration-300 shadow-sm cursor-pointer hover:bg-white/60">
              <div className="flex items-center gap-4">
                <div className="profile-ring">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
                    <img className="w-full h-full object-cover" alt="Marcus Thorne" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtdeqEAjBCJi32U4KwveDAeNK_xdMMwIphDdUh3YhqMwETSwXze4b-nyoiTTtuPaFsK5gQg-6GsnhbavwaBQeNu6pZiUOZG8zSDHKd-P_VkuvQPOjt3GHOD75T_CMP9uoFosy21xVOwaT5Z9NEFoiXoV2UWuam4gNMs2fc19oCfnRZ62Q-NT9mIJKhUzIKv8XOl47ZQ_6dSfnsxwBtZehg6xPQ7VGGkkTGQROeS80LTna7LDXgRczhnc8IZvSmZi9rE3gR-CuSZDQ" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base text-on-surface">Marcus Thorne</h3>
                  <p className="font-bold text-[10px] text-outline uppercase tracking-wider">ID: #EMP-8102</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-gray-200/50 text-gray-700 rounded text-[10px] font-bold uppercase tracking-tight">Marketing</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      EXPIRING SOON
                    </span>
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
            </div>

            {/* Employee Card 4 */}
            <div className="bg-white/40 backdrop-blur-md border border-white/50 p-4 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all duration-300 shadow-sm cursor-pointer hover:bg-white/60">
              <div className="flex items-center gap-4">
                <div className="profile-ring">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
                    <img className="w-full h-full object-cover" alt="Sarah Jenkins" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMPHZ43CjmNhcNLb-qIct3TlXxBCbEE1X1INWnqf8ZGSk01-0WO7QN_PrPkra6xZZFgv5-NDKwmDVwj0-QTBrYgF1op2sbbzk_hCTEj8Yu-0Sn9u9t4XK3QEO-M5AbXlYgeV7oFJ6yV_9X_FfS8bFbKuzoCKW2QJONmL613JP6QYDAkGEtY4aXFthKG-dSNlpqCOhATAvlwqcS6lGkri3EkhyqU1nteT0jylEKVoRhC372odezqDXu-CvEo7C6YtV8lY4hQGNWNLU" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base text-on-surface">Sarah Jenkins</h3>
                  <p className="font-bold text-[10px] text-outline uppercase tracking-wider">ID: #EMP-2209</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-gray-200/50 text-gray-700 rounded text-[10px] font-bold uppercase tracking-tight">Staff</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      VALID
                    </span>
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
            </div>
          </section>
        </main>

        {/* FAB */}
        <button className="fixed bottom-32 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center fab-glow active:scale-90 transition-transform z-[110] animate-float">
          <span className="material-symbols-outlined text-[28px]">add</span>
        </button>

        <MobileBottomNavBar />
      </div>
    </div>
  );
}
