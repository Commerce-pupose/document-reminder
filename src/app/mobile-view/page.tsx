import Link from "next/link";
import MobileTopAppBar from "./components/MobileTopAppBar";
import MobileBottomNavBar from "./components/MobileBottomNavBar";

export default function MobileDashboard() {
  return (
    <div className="bg-background text-on-surface min-h-screen relative z-[100] pb-32">
      {/* Background layer covering desktop sidebar */}
      <div className="fixed inset-0 bg-background z-[99]"></div>

      {/* Mobile view content */}
      <div className="relative z-[100]">
        <MobileTopAppBar />

        <main className="pt-24 px-4 max-w-md mx-auto space-y-8">
          {/* Summary Hero Card */}
          <section className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-[24px] p-6 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <p className="font-bold text-[10px] text-on-surface-variant/80 uppercase tracking-widest">Total Employees</p>
                <div className="flex items-start">
                  <span className="text-xl font-bold mt-2 text-primary">$</span>
                  <h2 className="text-[48px] leading-none font-extrabold text-on-surface tracking-tighter">1,248</h2>
                  <span className="text-base font-bold mt-1">.00</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-4">
                <button className="bg-primary text-white font-bold text-xs px-4 py-1.5 rounded-full flex items-center gap-1 shadow-md shadow-primary/20">
                  May, 2026 <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-on-surface flex items-center justify-center border-2 border-white shadow-sm z-30">
                    <span className="material-symbols-outlined text-white text-[14px]">person</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-error flex items-center justify-center border-2 border-white shadow-sm z-20">
                    <span className="material-symbols-outlined text-white text-[14px]">description</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-white shadow-sm z-10">
                    <span className="material-symbols-outlined text-white text-[14px]">verified</span>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-on-surface-variant text-right leading-tight">8 active<br />documents</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-600/10 text-green-700 font-bold text-[12px] px-3 py-1.5 rounded-full w-fit mt-4">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span>12% more than April, 2026</span>
            </div>
          </section>

          {/* Quick Actions Row */}
          <section className="grid grid-cols-4 gap-3">
            <div className="flex flex-col items-center gap-2">
              <button className="w-[60px] h-[60px] bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl flex items-center justify-center text-primary shadow-sm hover:scale-105 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-[28px]">person_add</span>
              </button>
              <span className="font-bold text-[10px] text-on-surface-variant text-center leading-tight">Add<br />Employee</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Link href="/mobile-view/config" className="w-[60px] h-[60px] bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl flex items-center justify-center text-tertiary shadow-sm hover:scale-105 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-[28px]">tune</span>
              </Link>
              <span className="font-bold text-[10px] text-on-surface-variant text-center leading-tight">Config</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Link href="/mobile-view/reports" className="w-[60px] h-[60px] bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl flex items-center justify-center text-secondary shadow-sm hover:scale-105 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-[28px]">assessment</span>
              </Link>
              <span className="font-bold text-[10px] text-on-surface-variant text-center leading-tight">Reports</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="w-[60px] h-[60px] bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl flex items-center justify-center text-outline shadow-sm hover:scale-105 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-[28px]">download</span>
              </button>
              <span className="font-bold text-[10px] text-on-surface-variant text-center leading-tight">Export</span>
            </div>
          </section>

          {/* Upcoming Document Expiries */}
          <section className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline-md text-lg font-bold text-on-surface">Upcoming Expiries</h3>
              <button className="text-primary font-bold text-xs hover:underline">See all</button>
            </div>

            {/* Ahmed Ali Card */}
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white">
                <img className="w-full h-full object-cover" alt="Ahmed Ali" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-1OkgiSoIVe9FSMmGFeLsGz2cExxbASab-sQEPogoUlNWargRQEEknA9xoBG406OJUp2-fGP6cvUqHRwHF4nQ92gvr3IkvSH8afVV3RGysrldjW6HIFE7Xq21MncheNz907bbm_uq8uB6yTXkgPtH4RICQIMKRTbrT2fWmpHQDjBmXkOPJqCOpPNOC7330q_HdlUtCqWX6-ykiYoMhs4FpYtdu8KEJXZ70aImWWxvqX7f-ouRu8tx_gwmNnM-nd0RHr3b51VlMMc" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-on-surface truncate">Ahmed Ali</h4>
                  <span className="bg-red-100 text-red-700 text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase shrink-0">URGENT</span>
                </div>
                <p className="text-xs text-on-surface-variant truncate font-medium mt-0.5">Visa • Dubai Branch</p>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-[13px] text-error">Expires Today</div>
                <div className="font-bold text-[10px] text-on-surface-variant mt-0.5 flex justify-end items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Red
                </div>
              </div>
            </div>

            {/* Mohammed Hassan Card */}
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white">
                <img className="w-full h-full object-cover" alt="Mohammed Hassan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKjTi5_Mk59A57Edzv2D9VE4lgH5uOxteAKBPJm9AMGmO8bnSTw148MriIXhVBMKDfu_zQUFre4PhYXlol-MAR2TJzFldICSxfEWX6xJZaGYLudC3GlKEnCzEPwcO9eY-lkrU57Hs01hzvqi7-f7hzGeOtcQaU6tjguYmThjP0B6ZRfJhtcteOvuHjoTv581_u-QWq-yFDZ6Cbg4uCfQE68Ln7FfYCWkYlPT1vL2xeutr-V4bkx_2fbfgM02huB7n9UA9EqIV5bsI" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-on-surface truncate">Mohammed Hassan</h4>
                  <span className="bg-orange-100 text-orange-700 text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase shrink-0">WARNING</span>
                </div>
                <p className="text-xs text-on-surface-variant truncate font-medium mt-0.5">Emirates ID • HQ Branch</p>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-[13px] text-on-surface">2 Days Left</div>
                <div className="font-bold text-[10px] text-on-surface-variant mt-0.5 flex justify-end items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Orange
                </div>
              </div>
            </div>

            {/* Sarah Khan Card */}
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white">
                <img className="w-full h-full object-cover" alt="Sarah Khan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKIArnlTThVGPM19dL5cHgHEjaCYIcPlxJ5t6bUgzvURgQaSbgXowKOBsGuNGf_NWj2hSnwExsucmaWbhuqZ9z0Zk1NfusGm-w8ZldVcCQMh7Hxufi9C-tYP_DPg_mPTBY04dMoU0-h5kqatRSEYnFbTkfI_zkeORbbrnuahQJlbE9nwtxu5u1L5yg556wB5jFinEPBPFQphMnNX_1LP-_9LtO4oOfejT_gpNSUu9KmKDNvbBE47NLVNxs62PtpKRam_jzd084XQo" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-on-surface truncate">Sarah Khan</h4>
                  <span className="bg-yellow-100 text-yellow-700 text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase shrink-0">UPCOMING</span>
                </div>
                <p className="text-xs text-on-surface-variant truncate font-medium mt-0.5">Passport • Finance</p>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-[13px] text-on-surface">5 Days Left</div>
                <div className="font-bold text-[10px] text-on-surface-variant mt-0.5 flex justify-end items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Yellow
                </div>
              </div>
            </div>

            {/* Ali Raza Card */}
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white">
                <img className="w-full h-full object-cover" alt="Ali Raza" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANufR9re8kEzKzA1JoxTHCpJg992r0Q4Pj6GcvUSwLxwCJ5cSKZ4wlydYwPWYUMR3_VaedpR_W5w6yidXGGEqq5SPTVsnBmjC94umC1B9F2n07zDQ3SPnrb45u6VNrCkql-fs4VeUuoRRf-wZWHnjNN1p6xJA7838B9F8bbv1DwBjrptQL4gkXee8u8jEUkijszw_HWSvWKF5pzB5_NouDqFMOip6OoKEW7_9HEkdGykV3xslh0F8ucvq9-PtWSWMDr90pbhlYO2k" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-on-surface truncate">Ali Raza</h4>
                <p className="text-xs text-on-surface-variant truncate font-medium mt-0.5">Labour Card • Operations</p>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-[13px] text-on-surface">12 Days Left</div>
                <div className="font-bold text-[10px] text-on-surface-variant mt-0.5 flex justify-end items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Green
                </div>
              </div>
            </div>
          </section>
        </main>

        <MobileBottomNavBar />
      </div>
    </div>
  );
}
