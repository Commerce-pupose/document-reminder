import MobileCalendarTopAppBar from "../components/MobileCalendarTopAppBar";
import MobileBottomNavBar from "../components/MobileBottomNavBar";

export default function MobileCalendarPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen relative z-[100] pb-32">
      {/* Background layer covering desktop sidebar */}
      <div className="fixed inset-0 bg-background z-[99]"></div>

      <div className="relative z-[100]">
        <MobileCalendarTopAppBar />

        <main className="pt-24 px-4 max-w-md mx-auto">
          {/* Date & Count Header */}
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="font-bold text-[24px] leading-tight text-on-surface">May 12, 2026</h2>
            </div>
            <div className="text-right">
              <span className="font-bold text-[10px] text-on-surface-variant block uppercase tracking-wider">12 upcoming</span>
              <span className="font-bold text-[10px] text-on-surface-variant">expiries</span>
            </div>
          </div>

          {/* Calendar Card */}
          <section className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-7 text-center gap-y-4">
              {/* Day Labels */}
              <span className="font-bold text-[10px] text-outline-variant">SUN</span>
              <span className="font-bold text-[10px] text-outline-variant">MON</span>
              <span className="font-bold text-[10px] text-outline-variant">TUE</span>
              <span className="font-bold text-[10px] text-outline-variant">WED</span>
              <span className="font-bold text-[10px] text-outline-variant">THU</span>
              <span className="font-bold text-[10px] text-outline-variant">FRI</span>
              <span className="font-bold text-[10px] text-outline-variant">SAT</span>

              {/* Days (Row 1) */}
              <span className="py-2 text-sm text-on-surface-variant opacity-30 font-medium">26</span>
              <span className="py-2 text-sm text-on-surface-variant opacity-30 font-medium">27</span>
              <span className="py-2 text-sm text-on-surface-variant opacity-30 font-medium">28</span>
              <span className="py-2 text-sm text-on-surface-variant opacity-30 font-medium">29</span>
              <span className="py-2 text-sm text-on-surface-variant opacity-30 font-medium">30</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer calendar-dot dot-red active:scale-110 transition-transform">1</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer">2</span>

              {/* Days (Row 2) */}
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer calendar-dot dot-blue active:scale-110 transition-transform">3</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer">4</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer">5</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer calendar-dot dot-green active:scale-110 transition-transform">6</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer">7</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer">8</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer">9</span>

              {/* Days (Row 3 - Active Date) */}
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer">10</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer">11</span>
              <div className="relative py-2 flex items-center justify-center cursor-pointer">
                <div className="absolute inset-0 bg-primary rounded-full scale-[0.8] shadow-md shadow-primary/30"></div>
                <span className="relative text-sm font-bold text-white z-10">12</span>
              </div>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer calendar-dot dot-orange active:scale-110 transition-transform">13</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer">14</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer calendar-dot dot-yellow active:scale-110 transition-transform">15</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer">16</span>

              {/* Row 4 */}
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer">17</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer calendar-dot dot-blue active:scale-110 transition-transform">18</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer">19</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer">20</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer">21</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer">22</span>
              <span className="py-2 text-sm font-medium text-on-surface cursor-pointer calendar-dot dot-green active:scale-110 transition-transform">23</span>
            </div>
          </section>

          {/* Timeline: TODAY */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-on-surface uppercase tracking-tight">TODAY</h3>
              <span className="font-bold text-[10px] text-error">Priority</span>
            </div>
            <div className="space-y-4">
              <div className="relative pl-8">
                <div className="timeline-line"></div>
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-error bg-white flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-error"></div>
                </div>
                <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-surface-container rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <img alt="Ahmed Ali" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGOw5EqSv_wf1gzKZv8FnWgpPJn_wX4q-5XZzvu8pTUZHDtRpc1ow3zmvrG9uUAcPmlp2EK9S8RJE8uUyly0j2_kGiSxPoIWOz4MQAhOa_ONhhuMcy5a9nvjXetIlUNkCLV30ngR-Eid0EuoaPrB4dOcHJyOP5E6JEcH_DQhsSbZCj1o6VrA2OjtTMDtZ4UeOp8qMe5WtNmDBhl5E2HWnWkQ5Ehje0L-YrCceJJFoKfO0IFAbrSvMenKcf63Rroe_4dCYOGnGwxx8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-on-surface">Ahmed Ali</h4>
                      <p className="font-medium text-xs text-on-surface-variant opacity-80 mt-0.5">Visa Renewal • 09:00 AM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-error/10 text-error font-bold text-[10px] uppercase tracking-wide">Expired</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline: TOMORROW */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-on-surface uppercase tracking-tight">TOMORROW</h3>
              <span className="font-medium text-[10px] text-on-surface-variant">1 item</span>
            </div>
            <div className="space-y-4">
              <div className="relative pl-8">
                <div className="timeline-line"></div>
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-orange-500 bg-white flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </div>
                <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-surface-container rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <img alt="Mohammed Hassan" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD-4mx3RckcpzEsdlZpMmTq-swgDhO01C1wZCVVFCks3l-4Z7cgKb8e72KtXkpkeYqoIMzwO5-dzefkXMMvsJzIOR75zJmvH3XsC7rGKCgs-pqwhOkqgoCGGVHYXyVbr76U5ae7ybUDpuZMz-CekZ-iZgLrZBFGpJd_4id5sQtBkhi1SmXAkXR0mZ6YEznC6ZC9HQbhUpZTnFY8pRsavZnz1P5i_XMPsfoG_D9xRkMJtdg_T_L35Mv5irv15QCB2jAwBZfQoR0-yQ" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-on-surface">Mohammed Hassan</h4>
                      <p className="font-medium text-xs text-on-surface-variant opacity-80 mt-0.5">Passport Renewal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-orange-600 block">2 Days</span>
                    <span className="font-medium text-[10px] text-on-surface-variant">Remaining</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline: THIS WEEK */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-on-surface uppercase tracking-tight">THIS WEEK</h3>
              <span className="font-medium text-[10px] text-on-surface-variant">1 item</span>
            </div>
            <div className="space-y-4">
              <div className="relative pl-8">
                <div className="timeline-line opacity-50"></div>
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-yellow-500 bg-white flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                </div>
                <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-surface-container rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <img alt="Sarah Khan" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL7zwa4-KlG9oP8LpCzfh6xh-prb9XDBMhjXcn4PqGqPVKkcA53KsaGIJwCV30gKadQkEZq-SwzhNqx1lblyLNoz9O09JbzntuG-NDJAG1GQW_dhGVPuSGgskVbcTzLmkYpdlpQVIV-rTbI2GrQ-XiYZSKVq_VRVb7bTvjk6ZLi3b6DFWjTQXGMLS_reA26twC0S8Gf_L3_skWAuXMO0IlFgRLM7uqdoXdcsrz6NeTwlqI9yryTA30dtZo-YVxBVjXe32X4hPpKm8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-on-surface">Sarah Khan</h4>
                      <p className="font-medium text-xs text-on-surface-variant opacity-80 mt-0.5">Emirates ID Renewal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-yellow-600 block">7 Days</span>
                    <span className="font-medium text-[10px] text-on-surface-variant">Remaining</span>
                  </div>
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
