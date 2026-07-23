import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";

export default function ReportsPage() {
  return (
    <>
      {/* Content Area */}
      <div className="px-6 md:px-12 py-10 max-w-[1400px] mx-auto w-full space-y-8">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className={cn(typography.heading.h1, "text-on-background")}>Reports & Analytics</h2>
            <p className={cn(typography.body.lg, "text-on-surface-variant mt-1 opacity-70")}>Strategic insights into organizational compliance and document health.</p>
          </div>
          <div className="flex items-center gap-3 glass-panel px-4 py-2 rounded-xl border border-white/20 shadow-sm backdrop-blur-md">
            <span className="material-symbols-outlined text-primary">calendar_today</span>
            <span className={cn(typography.body.md, "font-bold")}>Last 30 Days</span>
            <span className="material-symbols-outlined text-outline">expand_more</span>
          </div>
        </div>

        {/* Summary Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel-heavy p-6 rounded-[24px] transition-transform hover:-translate-y-1 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <span className={cn(typography.label.sm, "text-primary bg-primary/5 px-2 py-1 rounded-full whitespace-nowrap")}>+2.4%</span>
            </div>
            <p className={cn(typography.label.md, "text-on-surface-variant uppercase tracking-wider")}>Compliance Rate</p>
            <h3 className={cn(typography.number.large, "text-on-surface")}>94%</h3>
          </div>

          <div className="glass-panel-heavy p-6 rounded-[24px] transition-transform hover:-translate-y-1 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                <span className="material-symbols-outlined">history_edu</span>
              </div>
              <span className={cn(typography.label.sm, "text-tertiary bg-tertiary/5 px-2 py-1 rounded-full whitespace-nowrap")}>Active</span>
            </div>
            <p className={cn(typography.label.md, "text-on-surface-variant uppercase tracking-wider")}>Total Renewals</p>
            <h3 className={cn(typography.number.large, "text-on-surface")}>128</h3>
          </div>

          <div className="glass-panel-heavy p-6 rounded-[24px] transition-transform hover:-translate-y-1 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center text-error shrink-0">
                <span className="material-symbols-outlined">pending_actions</span>
              </div>
              <span className={cn(typography.label.sm, "text-error bg-error/5 px-2 py-1 rounded-full whitespace-nowrap")}>Priority</span>
            </div>
            <p className={cn(typography.label.md, "text-on-surface-variant uppercase tracking-wider")}>Pending Actions</p>
            <h3 className={cn(typography.number.large, "text-on-surface")}>15</h3>
          </div>

          <div className="glass-panel-heavy p-6 rounded-[24px] transition-transform hover:-translate-y-1 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined">timer</span>
              </div>
              <span className={cn(typography.label.sm, "text-secondary bg-secondary/5 px-2 py-1 rounded-full whitespace-nowrap")}>-0.2d</span>
            </div>
            <p className={cn(typography.label.md, "text-on-surface-variant uppercase tracking-wider")}>Avg. Processing</p>
            <h3 className={cn(typography.number.large, "text-on-surface")}>1.2 <span className={cn(typography.body.md, "text-on-surface-variant font-medium")}>days</span></h3>
          </div>
        </div>

        {/* Charts Section (Bento Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          {/* Line Chart Card */}
          <div className="lg:col-span-2 glass-panel-heavy p-6 md:p-8 rounded-[24px]">
            <div className="flex justify-between items-center mb-6">
              <h4 className={cn(typography.heading.h2, "text-on-surface")}>Document Expiry Trends</h4>
              <div className="flex gap-2">
                <button className={cn(typography.button.sm, "px-4 py-1.5 bg-primary text-white rounded-full shadow-md")}>Monthly</button>
                <button className={cn(typography.button.sm, "hidden sm:inline-block px-4 py-1.5 bg-white/50 text-on-surface-variant rounded-full hover:bg-white/70 transition-colors")}>Quarterly</button>
              </div>
            </div>
            <div className="h-64 w-full flex items-end justify-between gap-1 sm:gap-3 pb-2 mt-8">
              {/* Mock Chart Visualization */}
              <div className="w-full bg-gradient-to-t from-primary/20 to-transparent rounded-t-xl relative" style={{ height: "40%" }}>
                <div className={cn(typography.caption.sm, "absolute -top-6 left-1/2 -translate-x-1/2 text-on-surface-variant font-bold")}>Jan</div>
              </div>
              <div className="w-full bg-gradient-to-t from-primary/20 to-transparent rounded-t-xl relative" style={{ height: "55%" }}>
                <div className={cn(typography.caption.sm, "absolute -top-6 left-1/2 -translate-x-1/2 text-on-surface-variant font-bold")}>Feb</div>
              </div>
              <div className="w-full bg-gradient-to-t from-primary/30 to-transparent rounded-t-xl relative" style={{ height: "45%" }}>
                <div className={cn(typography.caption.sm, "absolute -top-6 left-1/2 -translate-x-1/2 text-on-surface-variant font-bold")}>Mar</div>
              </div>
              <div className="w-full bg-gradient-to-t from-primary/40 to-primary rounded-t-xl relative" style={{ height: "85%" }}>
                <div className={cn(typography.caption.sm, "absolute -top-6 left-1/2 -translate-x-1/2 text-on-surface-variant font-bold")}>Apr</div>
                <div className={cn(typography.caption.sm, "absolute -top-10 md:-top-14 left-1/2 -translate-x-1/2 bg-on-surface text-white px-2 py-1 md:px-3 rounded md:rounded-lg font-bold shadow-lg")}>Peak</div>
              </div>
              <div className="w-full bg-gradient-to-t from-primary/30 to-transparent rounded-t-xl relative" style={{ height: "60%" }}>
                <div className={cn(typography.caption.sm, "absolute -top-6 left-1/2 -translate-x-1/2 text-on-surface-variant font-bold")}>May</div>
              </div>
              <div className="w-full bg-gradient-to-t from-primary/20 to-transparent rounded-t-xl relative" style={{ height: "50%" }}>
                <div className={cn(typography.caption.sm, "absolute -top-6 left-1/2 -translate-x-1/2 text-on-surface-variant font-bold")}>Jun</div>
              </div>
              <div className="w-full bg-gradient-to-t from-primary/10 to-transparent rounded-t-xl relative" style={{ height: "35%" }}>
                <div className={cn(typography.caption.sm, "absolute -top-6 left-1/2 -translate-x-1/2 text-on-surface-variant font-bold")}>Jul</div>
              </div>
              <div className="w-full bg-gradient-to-t from-primary/20 to-transparent rounded-t-xl relative" style={{ height: "45%" }}>
                <div className={cn(typography.caption.sm, "absolute -top-6 left-1/2 -translate-x-1/2 text-on-surface-variant font-bold")}>Aug</div>
              </div>
            </div>
          </div>

          {/* Donut Chart Card */}
          <div className="glass-panel-heavy p-6 md:p-8 rounded-[24px] flex flex-col items-center">
            <h4 className={cn(typography.heading.h2, "text-on-surface self-start mb-6")}>Document Distribution</h4>
            <div className="relative w-48 h-48 flex items-center justify-center mb-8 mt-4 shrink-0">
              {/* Custom CSS Donut */}
              <div className="w-full h-full rounded-full border-[20px] border-primary" style={{ clipPath: "polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0)" }}></div>
              <div className="absolute inset-0 w-full h-full rounded-full border-[20px] border-tertiary rotate-45" style={{ clipPath: "polygon(50% 50%, 50% 0, 100% 0, 100% 20%, 50% 50%)" }}></div>
              <div className="absolute flex flex-col items-center">
                <span className={cn(typography.number.large, "text-on-surface")}>482</span>
                <span className={cn(typography.caption.sm, "font-bold uppercase tracking-wider opacity-60")}>Total</span>
              </div>
            </div>
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary shrink-0"></div>
                  <span className={cn(typography.body.md, "text-on-surface-variant truncate")}>Visa & Permits</span>
                </div>
                <span className={cn(typography.body.md, "font-bold text-on-surface ml-2")}>45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-tertiary shrink-0"></div>
                  <span className={cn(typography.body.md, "text-on-surface-variant truncate")}>Passport Copies</span>
                </div>
                <span className={cn(typography.body.md, "font-bold text-on-surface ml-2")}>30%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-secondary shrink-0"></div>
                  <span className={cn(typography.body.md, "text-on-surface-variant truncate")}>Emirates ID</span>
                </div>
                <span className={cn(typography.body.md, "font-bold text-on-surface ml-2")}>25%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Department Table Section */}
        <div className="glass-panel-heavy p-6 md:p-8 rounded-[24px] mt-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <h4 className={cn(typography.heading.h2, "text-on-surface")}>Compliance by Department</h4>
            <button className={cn(typography.button.md, "text-primary flex items-center gap-1 hover:underline")}>
              <span>View All Details</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="text-on-surface-variant border-b border-white/20 uppercase tracking-wider">
                  <th className={cn(typography.label.md, "py-4 px-2")}>Department</th>
                  <th className={cn(typography.label.md, "py-4 px-2")}>Staff Count</th>
                  <th className={cn(typography.label.md, "py-4 px-2")}>Compliance Status</th>
                  <th className={cn(typography.label.md, "py-4 px-2")}>Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="hover:bg-white/40 transition-colors group">
                  <td className="py-4 md:py-5 px-2">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-[20px]">engineering</span>
                      </div>
                      <span className={cn(typography.heading.h3, "text-on-surface")}>Engineering</span>
                    </div>
                  </td>
                  <td className={cn(typography.body.md, "py-4 md:py-5 px-2 text-on-surface-variant")}>245 Employees</td>
                  <td className="py-4 md:py-5 px-2 w-48 md:w-64">
                    <div className="flex items-center gap-4">
                      <div className="flex-grow bg-white/40 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full shadow-[0_0_8px_rgba(70,72,212,0.5)]" style={{ width: "98%" }}></div>
                      </div>
                      <span className={cn(typography.body.md, "font-bold text-primary")}>98%</span>
                    </div>
                  </td>
                  <td className="py-4 md:py-5 px-2">
                    <span className={cn(typography.label.sm, "px-3 md:px-4 py-1.5 rounded-full bg-green-100 text-green-700 shadow-sm whitespace-nowrap")}>Low Risk</span>
                  </td>
                </tr>

                <tr className="hover:bg-white/40 transition-colors group">
                  <td className="py-4 md:py-5 px-2">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                        <span className="material-symbols-outlined text-[20px]">payments</span>
                      </div>
                      <span className={cn(typography.heading.h3, "text-on-surface")}>Sales & Marketing</span>
                    </div>
                  </td>
                  <td className={cn(typography.body.md, "py-4 md:py-5 px-2 text-on-surface-variant")}>82 Employees</td>
                  <td className="py-4 md:py-5 px-2 w-48 md:w-64">
                    <div className="flex items-center gap-4">
                      <div className="flex-grow bg-white/40 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-tertiary h-full rounded-full shadow-[0_0_8px_rgba(127,69,141,0.5)]" style={{ width: "84%" }}></div>
                      </div>
                      <span className={cn(typography.body.md, "font-bold text-tertiary")}>84%</span>
                    </div>
                  </td>
                  <td className="py-4 md:py-5 px-2">
                    <span className={cn(typography.label.sm, "px-3 md:px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 shadow-sm whitespace-nowrap")}>Medium Risk</span>
                  </td>
                </tr>

                <tr className="hover:bg-white/40 transition-colors group">
                  <td className="py-4 md:py-5 px-2">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                        <span className="material-symbols-outlined text-[20px]">badge</span>
                      </div>
                      <span className={cn(typography.heading.h3, "text-on-surface")}>Human Resources</span>
                    </div>
                  </td>
                  <td className={cn(typography.body.md, "py-4 md:py-5 px-2 text-on-surface-variant")}>18 Employees</td>
                  <td className="py-4 md:py-5 px-2 w-48 md:w-64">
                    <div className="flex items-center gap-4">
                      <div className="flex-grow bg-white/40 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-secondary h-full rounded-full shadow-[0_0_8px_rgba(75,90,156,0.5)]" style={{ width: "100%" }}></div>
                      </div>
                      <span className={cn(typography.body.md, "font-bold text-secondary")}>100%</span>
                    </div>
                  </td>
                  <td className="py-4 md:py-5 px-2">
                    <span className={cn(typography.label.sm, "px-3 md:px-4 py-1.5 rounded-full bg-green-100 text-green-700 shadow-sm whitespace-nowrap")}>Low Risk</span>
                  </td>
                </tr>

                <tr className="hover:bg-white/40 transition-colors group">
                  <td className="py-4 md:py-5 px-2">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center text-error shrink-0">
                        <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                      </div>
                      <span className={cn(typography.heading.h3, "text-on-surface")}>Logistics</span>
                    </div>
                  </td>
                  <td className={cn(typography.body.md, "py-4 md:py-5 px-2 text-on-surface-variant")}>156 Employees</td>
                  <td className="py-4 md:py-5 px-2 w-48 md:w-64">
                    <div className="flex items-center gap-4">
                      <div className="flex-grow bg-white/40 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-error h-full rounded-full shadow-[0_0_8px_rgba(186,26,26,0.5)]" style={{ width: "72%" }}></div>
                      </div>
                      <span className={cn(typography.body.md, "font-bold text-error")}>72%</span>
                    </div>
                  </td>
                  <td className="py-4 md:py-5 px-2">
                    <span className={cn(typography.label.sm, "px-3 md:px-4 py-1.5 rounded-full bg-red-100 text-red-700 shadow-sm whitespace-nowrap")}>High Risk</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* FAB for Quick Actions */}
      <button className="fixed bottom-10 right-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-tertiary text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-transform group z-50">
        <span className="material-symbols-outlined text-[28px] md:text-[32px] group-hover:rotate-90 transition-transform">add</span>
        {/* Tooltip */}
        <span className={cn(typography.body.md, "absolute right-[70px] md:right-20 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg")}>New Report Task</span>
      </button>
    </>
  );
}
