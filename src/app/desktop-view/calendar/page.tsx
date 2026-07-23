import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";

export default function CalendarPage() {
  return (
    <div className="px-12 py-10 max-w-[1400px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className={cn(typography.heading.h1, "text-on-background")}>Expiry Calendar</h2>
          <p className={cn(typography.body.lg, "text-on-surface-variant mt-1")}>Managing 48 upcoming document renewals.</p>
        </div>

        {/* Segmented Control */}
        <div className="flex items-center bg-white/40 p-1 rounded-2xl border border-white/20 shadow-sm backdrop-blur-md">
          <button className={cn(typography.button.md, "px-5 py-2.5 rounded-xl hover:bg-white/60 transition-colors flex items-center justify-center text-on-surface-variant font-semibold")}>
            <span className="material-symbols-outlined mr-1 text-[20px]">chevron_left</span>
            Prev
          </button>
          <button className={cn(typography.button.md, "px-8 py-2.5 rounded-xl text-primary bg-white shadow-sm ring-1 ring-black/5 font-bold")}>
            Today
          </button>
          <button className={cn(typography.button.md, "px-5 py-2.5 rounded-xl hover:bg-white/60 transition-colors flex items-center justify-center text-on-surface-variant font-semibold")}>
            Next
            <span className="material-symbols-outlined ml-1 text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Row */}
      <div className="flex overflow-x-auto snap-x gap-6 mb-12 pb-4 -mx-12 px-12 md:mx-0 md:px-0 md:grid md:grid-cols-2 xl:grid-cols-4 md:overflow-visible md:pb-0 md:snap-none">
        {/* KPI 1 */}
        <div className="shrink-0 w-[280px] md:w-auto snap-start glass-panel p-6 rounded-[24px] hover:-translate-y-1 transition-transform relative overflow-hidden group border-l-4 border-l-error">
          <div className="flex justify-between items-start mb-4">
            <p className={cn(typography.label.md, "uppercase tracking-wider text-on-surface-variant")}>Expired Documents</p>
            <div className="w-10 h-10 bg-error/10 text-error rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </div>
          </div>
          <h3 className={cn(typography.number.hero, "text-on-surface")}>12</h3>
          <div className={cn(typography.body.md, "mt-4 flex items-center gap-1.5 font-medium text-error")}>
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>+2 since yesterday</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="shrink-0 w-[280px] md:w-auto snap-start glass-panel p-6 rounded-[24px] hover:-translate-y-1 transition-transform relative overflow-hidden group border-l-4 border-l-orange-500">
          <div className="flex justify-between items-start mb-4">
            <p className={cn(typography.label.md, "uppercase tracking-wider text-on-surface-variant")}>Due Today</p>
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>today</span>
            </div>
          </div>
          <h3 className={cn(typography.number.hero, "text-on-surface")}>5</h3>
          <div className={cn(typography.body.md, "mt-4 flex items-center gap-1.5 font-medium text-on-surface-variant")}>
            <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
            <span>Action required</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="shrink-0 w-[280px] md:w-auto snap-start glass-panel p-6 rounded-[24px] hover:-translate-y-1 transition-transform relative overflow-hidden group border-l-4 border-l-tertiary">
          <div className="flex justify-between items-start mb-4">
            <p className={cn(typography.label.md, "uppercase tracking-wider text-on-surface-variant")}>Expiring This Week</p>
            <div className="w-10 h-10 bg-tertiary/10 text-tertiary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>date_range</span>
            </div>
          </div>
          <h3 className={cn(typography.number.hero, "text-on-surface")}>31</h3>
          <div className={cn(typography.body.md, "mt-4 flex items-center gap-1.5 font-medium text-tertiary")}>
            <span className="material-symbols-outlined text-[16px]">trending_down</span>
            <span>-14% from last week</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="shrink-0 w-[280px] md:w-auto snap-start glass-panel-heavy p-6 rounded-[24px] hover:-translate-y-1 transition-transform relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <p className={cn(typography.label.md, "uppercase tracking-wider text-on-surface-variant")}>Compliance Score</p>
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
          </div>
          <h3 className={cn(typography.number.hero, "text-primary")}>94.2%</h3>
          <div className={cn(typography.body.md, "mt-4 flex items-center gap-1.5 font-medium text-green-600")}>
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>Top tier health</span>
          </div>
        </div>
      </div>

      {/* 70/30 Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_450px] gap-8">

        {/* Timeline Section (Left Side, 70%) */}
        <div className="space-y-10 w-full lg:max-w-[850px]">

          {/* TODAY */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.6)]"></span>
              <h3 className={cn(typography.heading.h2, "text-on-surface")}>TODAY</h3>
              <span className={cn(typography.body.md, "text-outline")}>Oct 24, 2023</span>
            </div>

            <div className="space-y-6">
              {/* Expired Card */}
              <div className="glass-panel-heavy rounded-[24px] p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-6 hover:translate-x-2 transition-transform cursor-pointer group min-h-[120px]">
                <div className="flex items-center gap-6 flex-1">
                  <div className="relative shrink-0">
                    <img className="w-14 h-14 rounded-full object-cover shadow-[0_0_0_2px_white,0_0_0_4px_#dc2626]" alt="Marcus Sterling" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzpRTb2rau2HUyaEHDRwFrVD_bYm55ho0bL9xyJ07KOlQ07hl8VdWZAgdtzZ3pvD45y23bV1Ys0FvsIPjvAzONq2L3qhJN2rfNAweO8E8LJ-x2M3eLfeeXQcPSjdgABWBVP7WHiTGENczIZJmLQs3j0pI04Nr-SBb-BG-0YIZ-k9Qy96XOztRhAAWekNQAKwThhmB9DJWy5XGnsj17WnB5oE0hwfoRniSzR335mY_IAmiRxAYrdetA9bvEwus4PLph-gxvI2SJkO0" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-error rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                    </div>
                  </div>
                  <div>
                    <h4 className={cn(typography.heading.h3, "text-on-surface truncate")}>Marcus Sterling</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className={cn(typography.body.md, "flex items-center gap-1.5 text-on-surface-variant font-medium")}>
                        <span className="material-symbols-outlined text-[20px] text-error">assignment_late</span>
                        Labour Card
                      </span>
                      <span className={cn(typography.label.sm, "text-error font-bold")}>Expired</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-8 md:w-auto w-full border-t border-white/10 md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
                  <div className="flex flex-col items-start md:items-end">
                    <span className={cn(typography.label.sm, "inline-block px-4 py-1.5 rounded-full bg-error-container text-on-error-container font-bold mb-1 shadow-sm")}>Immediate Action</span>
                    <p className={cn(typography.body.md, "text-outline font-medium")}>Due: 0h 0m</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end border-r border-white/20 pr-4">
                      <span className={cn(typography.caption.sm, "uppercase tracking-wider text-on-surface-variant")}>Assigned HR</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <img className="w-5 h-5 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRT1Z5ZmSWAliD-C5hcppYdZ4fC-MyofcYDGBtDQD2Eeg8AIXcDgyJxUYJ0OfD45IwPYT_FdU3QZyGFOaH26vIa7AvPQIKT-Klxheo9Pm8py9yu2t0MKz9PV9CBnaJxmHsyxN7Dad0bSqfANl8FQ4-0wDP5mlk0Z8sTljwp9dvJNYQU5HvCts_TTWVvX7G9oZbg7JjA7flFHL8hNTRiWmH7BJyE9kKHmUSk_pDoGXgz8ZhaaYwCBhLpAccENE1qVWeD0qdYisit5g" alt="HR" />
                        <span className={cn(typography.body.md, "font-bold text-on-surface")}>Alex R.</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[24px]">chevron_right</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TOMORROW */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
              <h3 className={cn(typography.heading.h2, "text-on-surface")}>TOMORROW</h3>
              <span className={cn(typography.body.md, "text-outline")}>Oct 25, 2023</span>
            </div>

            <div className="space-y-6">
              {/* Passport Expiry */}
              <div className="glass-panel rounded-[24px] p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-6 hover:translate-x-2 transition-transform cursor-pointer group min-h-[120px]">
                <div className="flex items-center gap-6 flex-1">
                  <div className="relative shrink-0">
                    <img className="w-14 h-14 rounded-full object-cover shadow-[0_0_0_2px_white,0_0_0_4px_#a855f7]" alt="Elena Zhao" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkLwztmd3jgCnV9YkcndNxkJxdsblw0Zz5jx_61bhia7vtGWUFxkYooFP1gVhz-aRVnWvQIz9pj1DjszkZmAv4hnFCv3kKYd6_9XZGz_Oy4q7zE6OGoR9-SERlqOmKEjJz0rtICKURWanYzLmubwPaoBbhRIPTA_eaxfYaOKEd2w0JqC_k8Urt7go0NSWDp20kMkJaqWbikaKp13csV9izfs42lpytdav-dOe5AOF7vteMiO2zZhepHN9FHuWTVDuopQCkKsjK7is" />
                  </div>
                  <div>
                    <h4 className={cn(typography.heading.h3, "text-on-surface truncate")}>Elena Zhao</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className={cn(typography.body.md, "flex items-center gap-1.5 text-on-surface-variant font-medium")}>
                        <span className="material-symbols-outlined text-[20px] text-tertiary">passkey</span>
                        Passport Expiry
                      </span>
                      <span className={cn(typography.label.sm, "text-tertiary font-bold")}>Expires Tomorrow</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-8 md:w-auto w-full border-t border-white/10 md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
                  <div className="flex flex-col items-start md:items-end">
                    <span className={cn(typography.label.sm, "inline-block px-4 py-1.5 rounded-full bg-tertiary-container/20 text-tertiary font-bold mb-1 shadow-sm")}>Pending Upload</span>
                    <p className={cn(typography.body.md, "text-outline font-medium")}>1 Day Remaining</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end border-r border-white/20 pr-4">
                      <span className={cn(typography.caption.sm, "uppercase tracking-wider text-on-surface-variant")}>Assigned HR</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="w-5 h-5 rounded-full bg-tertiary text-white flex items-center justify-center text-[10px] font-bold">SJ</div>
                        <span className={cn(typography.body.md, "font-bold text-on-surface")}>Sarah J.</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[24px]">chevron_right</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* THIS WEEK */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
              <h3 className={cn(typography.heading.h2, "text-on-surface")}>THIS WEEK</h3>
              <span className={cn(typography.body.md, "text-outline")}>Oct 26 - Oct 31</span>
            </div>

            <div className="space-y-6">
              {/* Visa Expiry */}
              <div className="glass-panel rounded-[24px] p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-6 hover:translate-x-2 transition-transform cursor-pointer group min-h-[120px]">
                <div className="flex items-center gap-6 flex-1">
                  <div className="relative shrink-0">
                    <img className="w-14 h-14 rounded-full object-cover shadow-[0_0_0_2px_white,0_0_0_4px_#fb923c]" alt="Ahmed Al-Sayed" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKsoZIQKb1kO9PDz30opnFRd0m8JA9dAf7Kv43UEEHGlbHF7zV8SKqtetwMhkah6H9MTJhgGn-ufbMavGG1XdLDFbLuWeBrvTi5LZ6Z-Ab7HNOneAvIge6aNb-tJW22tg1eHip7RR7XKdt5svrwaw4Gd4ehfvOHJM-_TUOMFxgmMtLTWIR34zSThO8Kei1x2K8lnOx_sYzdHQ75L2FQTmwDlgrMl1UWkgOSVPd6_gDTbxi6lodL3mo_kQEVZAMxzzG2of3myERuNs" />
                  </div>
                  <div>
                    <h4 className={cn(typography.heading.h3, "text-on-surface truncate")}>Ahmed Al-Sayed</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className={cn(typography.body.md, "flex items-center gap-1.5 text-on-surface-variant font-medium")}>
                        <span className="material-symbols-outlined text-[20px] text-orange-400">verified_user</span>
                        Visa Renewal
                      </span>
                      <span className={cn(typography.label.sm, "text-orange-500 font-bold")}>In Processing</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-8 md:w-auto w-full border-t border-white/10 md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
                  <div className="flex flex-col items-start md:items-end">
                    <span className={cn(typography.label.sm, "inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-bold mb-1 shadow-sm")}>4 Days Left</span>
                    <p className={cn(typography.body.md, "text-outline font-medium")}>Oct 28, 2023</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end border-r border-white/20 pr-4">
                      <span className={cn(typography.caption.sm, "uppercase tracking-wider text-on-surface-variant")}>Assigned HR</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="w-5 h-5 rounded-full bg-orange-400 text-white flex items-center justify-center text-[10px] font-bold">MK</div>
                        <span className={cn(typography.body.md, "font-bold text-on-surface")}>Mona K.</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[24px]">chevron_right</span>
                  </div>
                </div>
              </div>

              {/* Emirates ID */}
              <div className="glass-panel rounded-[24px] p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-6 hover:translate-x-2 transition-transform cursor-pointer group min-h-[120px]">
                <div className="flex items-center gap-6 flex-1">
                  <div className="relative shrink-0">
                    <img className="w-14 h-14 rounded-full object-cover shadow-[0_0_0_2px_white,0_0_0_4px_#22c55e]" alt="Sarah Jenkins" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz15vcBlJhj9SLAneuNU7EvoZlzjeoFez0wzpkQQtPLgV6NmmurtT5AMD2F378r5C2MmhGQxdTQX-M9jZouR9ruq_HEHcYj7wCOUShcKcCARpifjxV6g8pkc9POZdFye0Hhml7hA44kmhjeKicwGm1kwTg1ojKK9F3KHzjghXwyVnE4PPdt2jiAunadObuQHWPVpILbzRiCORAnaKB1tuupczFA3ZKb8Nqyn42eiJnCjnngWVJ2NANAgk760GgwcP_MgXQxeCQcDA" />
                  </div>
                  <div>
                    <h4 className={cn(typography.heading.h3, "text-on-surface truncate")}>Sarah Jenkins</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className={cn(typography.body.md, "flex items-center gap-1.5 text-on-surface-variant font-medium")}>
                        <span className="material-symbols-outlined text-[20px] text-green-500">contact_emergency</span>
                        Emirates ID
                      </span>
                      <span className={cn(typography.label.sm, "text-green-600 font-bold")}>Valid</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-8 md:w-auto w-full border-t border-white/10 md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
                  <div className="flex flex-col items-start md:items-end">
                    <span className={cn(typography.label.sm, "inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 font-bold mb-1 shadow-sm")}>Renewal Open</span>
                    <p className={cn(typography.body.md, "text-outline font-medium")}>6 Days Left</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end border-r border-white/20 pr-4">
                      <span className={cn(typography.caption.sm, "uppercase tracking-wider text-on-surface-variant")}>Assigned HR</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <img className="w-5 h-5 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRT1Z5ZmSWAliD-C5hcppYdZ4fC-MyofcYDGBtDQD2Eeg8AIXcDgyJxUYJ0OfD45IwPYT_FdU3QZyGFOaH26vIa7AvPQIKT-Klxheo9Pm8py9yu2t0MKz9PV9CBnaJxmHsyxN7Dad0bSqfANl8FQ4-0wDP5mlk0Z8sTljwp9dvJNYQU5HvCts_TTWVvX7G9oZbg7JjA7flFHL8hNTRiWmH7BJyE9kKHmUSk_pDoGXgz8ZhaaYwCBhLpAccENE1qVWeD0qdYisit5g" alt="HR" />
                        <span className={cn(typography.body.md, "font-bold text-on-surface")}>Alex R.</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[24px]">chevron_right</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Calendar & Analytics (Right Side, 30%) */}
        <div className="space-y-8 w-full xl:max-w-[450px] mx-auto xl:mx-0">

          {/* Large Calendar Card */}
          <div className="glass-panel-heavy rounded-[24px] p-8 h-auto xl:min-h-[470px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h4 className={cn(typography.heading.h2, "text-on-surface")}>October 2023</h4>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-white transition-colors border border-white/30 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">arrow_back_ios_new</span>
                </button>
                <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-white transition-colors border border-white/30 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">arrow_forward_ios</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 text-center mb-4">
              <span className={cn(typography.caption.md, "uppercase tracking-wider text-outline")}>MO</span>
              <span className={cn(typography.caption.md, "uppercase tracking-wider text-outline")}>TU</span>
              <span className={cn(typography.caption.md, "uppercase tracking-wider text-outline")}>WE</span>
              <span className={cn(typography.caption.md, "uppercase tracking-wider text-outline")}>TH</span>
              <span className={cn(typography.caption.md, "uppercase tracking-wider text-outline")}>FR</span>
              <span className={cn(typography.caption.md, "uppercase tracking-wider text-outline")}>SA</span>
              <span className={cn(typography.caption.md, "uppercase tracking-wider text-outline")}>SU</span>
            </div>

            <div className="grid grid-cols-7 gap-y-4 gap-x-3 flex-1">
              <span className={cn(typography.body.md, "py-2.5 text-outline-variant text-center font-medium")}>25</span>
              <span className={cn(typography.body.md, "py-2.5 text-outline-variant text-center font-medium")}>26</span>
              <span className={cn(typography.body.md, "py-2.5 text-outline-variant text-center font-medium")}>27</span>
              <span className={cn(typography.body.md, "py-2.5 text-outline-variant text-center font-medium")}>28</span>
              <span className={cn(typography.body.md, "py-2.5 text-outline-variant text-center font-medium")}>29</span>
              <span className={cn(typography.body.md, "py-2.5 text-outline-variant text-center font-medium")}>30</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>1</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>2</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>3</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>4</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>5</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>6</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>7</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>8</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>9</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>10</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>11</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>12</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>13</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>14</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>15</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>16</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>17</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>18</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>19</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>20</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>21</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>22</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>23</span>
              {/* Active Day */}
              <div className="relative py-2.5 flex items-center justify-center cursor-pointer">
                <span className={cn(typography.body.md, "w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center font-bold shadow-lg shadow-primary/40 relative z-10")}>24</span>
                <span className="absolute -bottom-1.5 w-1.5 h-1.5 bg-error rounded-full"></span>
              </div>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface relative text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>
                25
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-tertiary rounded-full"></span>
              </span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface relative text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>
                26
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-secondary rounded-full"></span>
              </span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>27</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>28</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>29</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>30</span>
              <span className={cn(typography.body.md, "py-2.5 text-on-surface text-center hover:bg-white/40 rounded-full cursor-pointer transition-colors font-medium")}>31</span>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                <div className={cn(typography.body.md, "flex items-center gap-2.5 font-medium text-on-surface-variant")}>
                  <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                  <span>Expired</span>
                </div>
                <div className={cn(typography.body.md, "flex items-center gap-2.5 font-medium text-on-surface-variant")}>
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
                  <span>Visa</span>
                </div>
                <div className={cn(typography.body.md, "flex items-center gap-2.5 font-medium text-on-surface-variant")}>
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                  <span>Passport</span>
                </div>
                <div className={cn(typography.body.md, "flex items-center gap-2.5 font-medium text-on-surface-variant")}>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  <span>Emirates ID</span>
                </div>
                <div className={cn(typography.body.md, "flex items-center gap-2.5 font-medium text-on-surface-variant")}>
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  <span>Labour</span>
                </div>
              </div>
            </div>
          </div>

          {/* Renewal Health Widget */}
          <div className="glass-panel rounded-[24px] p-8 h-auto xl:h-[240px] flex flex-col justify-between group hover:-translate-y-1 transition-transform relative overflow-hidden">
            <div className="absolute right-[-20px] top-[-20px] opacity-[0.03] group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
              <span className="material-symbols-outlined text-[160px]">health_and_safety</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">trending_up</span>
                  </div>
                  <h4 className={cn(typography.heading.h3, "text-on-surface")}>Completion Rate</h4>
                </div>
                <div className="text-right">
                  <span className={cn(typography.number.hero, "text-primary leading-none")}>92%</span>
                </div>
              </div>

              <div className="w-full h-2.5 bg-white/40 rounded-full overflow-hidden shadow-inner mt-2 mb-6">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-tertiary" style={{ width: "92%" }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-5 gap-x-4 relative z-10">
              <div className="flex flex-col">
                <span className={cn(typography.heading.h3, "text-on-surface")}>4</span>
                <span className={cn(typography.caption.sm, "uppercase tracking-wider text-on-surface-variant font-bold")}>Pending Review</span>
              </div>
              <div className="flex flex-col border-l border-white/20 pl-4">
                <span className={cn(typography.heading.h3, "text-on-surface")}>18</span>
                <span className={cn(typography.caption.sm, "uppercase tracking-wider text-on-surface-variant font-bold")}>Done This Month</span>
              </div>
              <div className="flex flex-col pt-2 border-t border-white/20">
                <span className={cn(typography.heading.h3, "text-on-surface")}>7</span>
                <span className={cn(typography.caption.sm, "uppercase tracking-wider text-on-surface-variant font-bold")}>Expiring Next Week</span>
              </div>
              <div className="flex flex-col pt-2 border-t border-l border-white/20 pl-4">
                <span className={cn(typography.heading.h3, "text-on-surface")}>24h</span>
                <span className={cn(typography.caption.sm, "uppercase tracking-wider text-on-surface-variant font-bold")}>Avg Processing</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
