"use client";
import Link from "next/link";
import MobileBottomNavBar from "../components/MobileBottomNavBar";

export default function MobileDocumentsPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen relative z-[100] pb-32">
      {/* Background layer covering desktop sidebar */}
      <div className="fixed inset-0 bg-background z-[99]"></div>

      {/* Dynamic Atmospheric Background */}
      <div className="fixed inset-0 z-[100] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-tertiary/10 blur-[120px]"></div>
      </div>

      <div className="relative z-[101]">
        {/* TopAppBar */}
        <header className="w-full sticky top-0 z-40 bg-surface/60 backdrop-blur-md border-b border-white/20 shadow-sm flex justify-between items-center px-container-margin py-4">
          <div className="flex items-center gap-3">
            <Link href="/mobile-view" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/80 transition-all active:scale-90 text-on-surface-variant">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div className="flex flex-col">
              <span className="font-display text-body-md font-bold text-primary">Back</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/80 transition-all active:scale-90">
              <span className="material-symbols-outlined text-on-surface-variant">search</span>
            </button>
            <Link href="/mobile-view/calendar" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/80 transition-all active:scale-90 text-primary">
              <span className="material-symbols-outlined">calendar_month</span>
            </Link>
            <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/80 transition-all active:scale-90">
              <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
          </div>
        </header>

        <main className="px-container-margin py-6 pb-safe">
          {/* Page Title */}
          <header className="mb-section-spacing">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">Document Library</h1>
            <p className="font-body-md text-on-surface-variant">Manage and track employee compliance files.</p>
          </header>

          {/* Category Chips */}
          <section className="mb-section-spacing -mx-container-margin overflow-x-auto hide-scrollbar flex items-center gap-3 px-container-margin">
            <button className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-bold shadow-md shadow-primary/20 transition-all active:scale-95 whitespace-nowrap">All</button>
            <button className="px-6 py-2.5 rounded-full glass-panel text-on-surface-variant font-medium hover:bg-white/80 transition-all active:scale-95 whitespace-nowrap">Visa</button>
            <button className="px-6 py-2.5 rounded-full glass-panel text-on-surface-variant font-medium hover:bg-white/80 transition-all active:scale-95 whitespace-nowrap">Passport</button>
            <button className="px-6 py-2.5 rounded-full glass-panel text-on-surface-variant font-medium hover:bg-white/80 transition-all active:scale-95 whitespace-nowrap">Insurance</button>
            <button className="px-6 py-2.5 rounded-full glass-panel text-on-surface-variant font-medium hover:bg-white/80 transition-all active:scale-95 whitespace-nowrap">ID Cards</button>
          </section>

          {/* Document List */}
          <div className="flex flex-col gap-stack-gap">
            {/* Document Card 1 */}
            <div className="glass-panel-heavy p-card-padding rounded-lg shadow-sm hover:shadow-md transition-shadow active:scale-[0.98] duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 font-label-sm text-label-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Active
                  </span>
                  <span className="text-on-surface-variant font-label-sm text-label-sm mt-1">Ref: #DOC-8921</span>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-headline-md text-headline-md text-on-surface">Alex Thompson</h3>
                <p className="font-body-md text-on-surface-variant">Employee ID: EMP-2024-042</p>
              </div>
              <div className="pt-4 border-t border-white/20 flex justify-between items-center">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Document Type</p>
                  <p className="font-body-md font-bold text-on-surface">Work Visa (H1-B)</p>
                </div>
                <div className="text-right">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Expiry Date</p>
                  <p className="font-body-md font-bold text-on-surface">Nov 12, 2026</p>
                </div>
              </div>
            </div>

            {/* Document Card 2 */}
            <div className="glass-panel-heavy p-card-padding rounded-lg shadow-sm active:scale-[0.98] duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>badge</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-label-sm text-label-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    Expiring Soon
                  </span>
                  <span className="text-on-surface-variant font-label-sm text-label-sm mt-1">Ref: #DOC-4412</span>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-headline-md text-headline-md text-on-surface">Sarah Jenkins</h3>
                <p className="font-body-md text-on-surface-variant">Employee ID: EMP-2023-118</p>
              </div>
              <div className="pt-4 border-t border-white/20 flex justify-between items-center">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Document Type</p>
                  <p className="font-body-md font-bold text-on-surface">Passport (International)</p>
                </div>
                <div className="text-right">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Expiry Date</p>
                  <p className="font-body-md font-bold text-error">Mar 05, 2024</p>
                </div>
              </div>
            </div>

            {/* Document Card 3 */}
            <div className="glass-panel-heavy p-card-padding rounded-lg shadow-sm active:scale-[0.98] duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 font-label-sm text-label-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Active
                  </span>
                  <span className="text-on-surface-variant font-label-sm text-label-sm mt-1">Ref: #DOC-1029</span>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-headline-md text-headline-md text-on-surface">Marcus Chen</h3>
                <p className="font-body-md text-on-surface-variant">Employee ID: EMP-2024-009</p>
              </div>
              <div className="pt-4 border-t border-white/20 flex justify-between items-center">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Document Type</p>
                  <p className="font-body-md font-bold text-on-surface">Health Insurance Card</p>
                </div>
                <div className="text-right">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Expiry Date</p>
                  <p className="font-body-md font-bold text-on-surface">Jan 01, 2025</p>
                </div>
              </div>
            </div>

            {/* Document Card 4 */}
            <div className="glass-panel-heavy p-card-padding rounded-lg shadow-sm active:scale-[0.98] duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-outline-variant/30 flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>credit_card</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                    Archived
                  </span>
                  <span className="text-on-surface-variant font-label-sm text-label-sm mt-1">Ref: #DOC-0051</span>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-headline-md text-headline-md text-on-surface">Elena Rodriguez</h3>
                <p className="font-body-md text-on-surface-variant">Employee ID: EMP-2022-552</p>
              </div>
              <div className="pt-4 border-t border-white/20 flex justify-between items-center">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Document Type</p>
                  <p className="font-body-md font-bold text-on-surface">Government ID</p>
                </div>
                <div className="text-right">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Expiry Date</p>
                  <p className="font-body-md font-bold text-on-surface">Dec 31, 2023</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <MobileBottomNavBar />
      </div>
    </div>
  );
}
