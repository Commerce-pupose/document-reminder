import MobileReportsTopAppBar from "../components/MobileReportsTopAppBar";
import MobileBottomNavBar from "../components/MobileBottomNavBar";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";

export default function MobileReportsPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen relative z-[100] pb-32 overflow-x-hidden">
      {/* Background layer covering desktop sidebar */}
      <div className="fixed inset-0 bg-background z-[99]"></div>

      <div className="relative z-[100]">
        <MobileReportsTopAppBar />

        <main className="pt-24 px-4 max-w-md mx-auto space-y-6">
          {/* Filter Chips */}
          <section className="flex gap-3 overflow-x-auto hide-scrollbar py-2 -mx-2 px-2">
            <button className={cn(typography.button.sm, "px-6 py-2 rounded-full bg-primary text-white shadow-lg shadow-primary/20 shrink-0")}>All</button>
            <button className={cn(typography.button.sm, "px-6 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-on-surface-variant shrink-0 hover:bg-white/60 transition-colors")}>Visa</button>
            <button className={cn(typography.button.sm, "px-6 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-on-surface-variant shrink-0 hover:bg-white/60 transition-colors")}>Passport</button>
            <button className={cn(typography.button.sm, "px-6 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-on-surface-variant shrink-0 hover:bg-white/60 transition-colors")}>Insurance</button>
          </section>

          {/* Overview Card */}
          <section className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-sm shadow-primary/5">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <div className="absolute inset-0 circular-progress rounded-full opacity-20"></div>
              <svg className="absolute inset-0 transform -rotate-90 w-40 h-40">
                <circle className="text-primary-container/20" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="12"></circle>
                <circle className="text-primary" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="26" strokeLinecap="round" strokeWidth="12"></circle>
              </svg>
              <div className="flex flex-col items-center">
                <span className={cn(typography.number.hero, "leading-none text-on-surface")}>94%</span>
                <span className={cn(typography.caption.sm, "font-bold text-on-surface-variant mt-1")}>Active</span>
              </div>
            </div>
            <div className="text-center">
              <h2 className={cn(typography.heading.h3, "text-on-surface mb-1")}>Overall Compliance</h2>
              <p className={cn(typography.body.md, "text-on-surface-variant")}>Top performing across all regions</p>
            </div>
          </section>

          {/* Metric Grid */}
          <section className="grid grid-cols-2 gap-3 mt-2">
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex flex-col gap-2 shadow-sm">
              <span className="material-symbols-outlined text-primary">refresh</span>
              <span className={cn(typography.number.medium, "text-on-surface")}>24</span>
              <span className={cn(typography.label.md, "text-on-surface-variant")}>Renewals</span>
            </div>
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex flex-col gap-2 shadow-sm">
              <span className="material-symbols-outlined text-tertiary">pending_actions</span>
              <span className={cn(typography.number.medium, "text-on-surface")}>12</span>
              <span className={cn(typography.label.md, "text-on-surface-variant")}>Pending</span>
            </div>
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex flex-col gap-2 shadow-sm">
              <span className="material-symbols-outlined text-secondary">timer</span>
              <span className={cn(typography.number.medium, "text-on-surface")}>4.2d</span>
              <span className={cn(typography.label.md, "text-on-surface-variant")}>Process Time</span>
            </div>
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex flex-col gap-2 shadow-sm">
              <span className="material-symbols-outlined text-error">event_busy</span>
              <span className={cn(typography.number.medium, "text-on-surface")}>0</span>
              <span className={cn(typography.label.md, "text-on-surface-variant")}>Missed</span>
            </div>
          </section>

          {/* Chart Section */}
          <section className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-6 flex flex-col gap-4 mt-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className={cn(typography.heading.h3, "text-on-surface")}>Monthly Expiry</h3>
              <span className={cn(typography.button.sm, "text-primary")}>Q3 2026</span>
            </div>
            <div className="flex items-end justify-between h-32 gap-3 pt-4">
              <div className="flex-1 bg-surface-container-high rounded-t-full transition-all duration-700 hover:bg-primary-container relative group" style={{ height: '60%' }}>
                <div className={cn(typography.caption.sm, "absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 font-bold text-primary transition-opacity")}>12</div>
              </div>
              <div className="flex-1 bg-surface-container-high rounded-t-full transition-all duration-700 hover:bg-primary-container relative group" style={{ height: '85%' }}>
                <div className={cn(typography.caption.sm, "absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 font-bold text-primary transition-opacity")}>18</div>
              </div>
              <div className="flex-1 bg-primary rounded-t-full transition-all duration-700 hover:opacity-80 relative group shadow-sm shadow-primary/20" style={{ height: '100%' }}>
                <div className={cn(typography.caption.sm, "absolute -top-6 left-1/2 -translate-x-1/2 font-bold text-primary")}>24</div>
              </div>
              <div className="flex-1 bg-surface-container-high rounded-t-full transition-all duration-700 hover:bg-primary-container relative group" style={{ height: '45%' }}>
                <div className={cn(typography.caption.sm, "absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 font-bold text-primary transition-opacity")}>9</div>
              </div>
              <div className="flex-1 bg-surface-container-high rounded-t-full transition-all duration-700 hover:bg-primary-container relative group" style={{ height: '70%' }}>
                <div className={cn(typography.caption.sm, "absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 font-bold text-primary transition-opacity")}>15</div>
              </div>
              <div className="flex-1 bg-surface-container-high rounded-t-full transition-all duration-700 hover:bg-primary-container relative group" style={{ height: '55%' }}>
                <div className={cn(typography.caption.sm, "absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 font-bold text-primary transition-opacity")}>11</div>
              </div>
            </div>
            <div className={cn(typography.caption.md, "flex justify-between text-on-surface-variant px-1 font-bold")}>
              <span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="flex flex-col gap-4 mt-4">
            <h3 className={cn(typography.heading.h3, "text-on-surface px-1")}>Recent Activity</h3>
            <div className="flex flex-col gap-3">
              <div className="bg-white/40 backdrop-blur-md border border-white/50 p-4 rounded-2xl flex items-center gap-4 group hover:scale-[1.02] transition-transform shadow-sm cursor-pointer hover:bg-white/60">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={cn(typography.heading.h4, "text-on-surface truncate")}>Visa Renewed</h4>
                  <p className={cn(typography.body.md, "text-on-surface-variant truncate mt-0.5")}>John Smith • Engineering</p>
                </div>
                <span className={cn(typography.caption.sm, "text-on-surface-variant shrink-0")}>2h ago</span>
              </div>

              <div className="bg-white/40 backdrop-blur-md border border-white/50 p-4 rounded-2xl flex items-center gap-4 group hover:scale-[1.02] transition-transform shadow-sm cursor-pointer hover:bg-white/60">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={cn(typography.heading.h4, "text-on-surface truncate")}>Report Generated</h4>
                  <p className={cn(typography.body.md, "text-on-surface-variant truncate mt-0.5")}>Annual Compliance Audit</p>
                </div>
                <span className={cn(typography.caption.sm, "text-on-surface-variant shrink-0")}>5h ago</span>
              </div>

              <div className="bg-white/40 backdrop-blur-md border border-white/50 p-4 rounded-2xl flex items-center gap-4 group hover:scale-[1.02] transition-transform shadow-sm cursor-pointer hover:bg-white/60">
                <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={cn(typography.heading.h4, "text-on-surface truncate")}>Insurance Active</h4>
                  <p className={cn(typography.body.md, "text-on-surface-variant truncate mt-0.5")}>Group Policy #8829</p>
                </div>
                <span className={cn(typography.caption.sm, "text-on-surface-variant shrink-0")}>Yesterday</span>
              </div>
            </div>
          </section>
        </main>

        <MobileBottomNavBar />
      </div>
    </div>
  );
}
