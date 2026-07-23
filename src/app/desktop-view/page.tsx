"use client";

import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-container-margin space-y-6 lg:space-y-section-spacing max-w-[1400px] mx-auto w-full">

      {/* Header Section */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className={cn(typography.heading.h1, "text-on-surface tracking-tight")}>Good Morning, Alex</h1>
        <p className={cn(typography.body.lg, "text-on-surface-variant mt-1")}>Your employee documents are under control.</p>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-grid-gutter">

        {/* Total Employees */}
        <div className="glass-panel-heavy p-5 sm:p-card-padding rounded-xl relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            </div>
            <span className={cn(typography.label.sm, "px-3 py-1 bg-white/40 text-primary-fixed-dim rounded-full border border-white/50 whitespace-nowrap")}>May, 2026</span>
          </div>
          <div className="space-y-1">
            <p className={cn(typography.label.md, "text-on-surface-variant uppercase tracking-wider")}>Total Employees</p>
            <h3 className={cn(typography.number.hero, "text-on-surface")}>1,248</h3>
          </div>
          <div className="mt-6 flex -space-x-3">
            <img className="w-8 h-8 rounded-full border-2 border-white" alt="Employee 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsHWlyCFXepKsMGyRu1SKTQmAlG9AcVvOARmBMqmRrnB1Q1L7IoCg67EHbiOw6tdO-a_Ly46xzSWP5uEPiAjcIP2FMg1H_iahbGFIlqoKY4zNiGEfK2JdwrlRMrmzCUc2HBQprVY2ynfQhStL3VVE78i4kK3N1Phv7_U7ohvt-qCBi4I5x9T_2YmzZt81nbd1q8_85kMoDcPL29IDJpWGqwqfwJsE0F326Tup-KmZblbRWjQYAO9lU-xGXZB1YBn3IFMifrISdYPA" />
            <img className="w-8 h-8 rounded-full border-2 border-white" alt="Employee 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAbmzSoGEZpcPL26_NIHBSPo_xH3UDSLpyQpaMTrQLPQ2outVQfypE2JsLr8UiiIO5xkFsqVsQROy_fESxq73JuZZpEBt88UWuPM8-5sr_1aYNqTSgCsu-MbLp3eCOVlgIZkdIcE9V4Q0Md9SvEF3oU5AUdNgcAYcwwHbp0rK5UA5iORCOxtzHef1i9E_dvVS1Yie0VnDOmdTDIkvyV7ieCjKDNcpicEmdrTGH4Rz-WIju9S_dvwZlgShoy8NZrt5TSJXGgzh78DY" />
            <img className="w-8 h-8 rounded-full border-2 border-white" alt="Employee 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnS1aitGvQ5LUVMh1Lh1BR557gUmhIUhVUvfut5H3csav5A7_6PiW385xLgOjvegz4qE1NVPUnnYzWmoEMHBVB7WazDe3-t9QwpFVsIvyRaae0TTzRfHfpTCU1bkcfJ01QpB6--HtSf2e2j5Gxgj-GpjW72B0w8gPVZUsKPn0YfwWGMB45mTVOlE0XB7h72zi_i-fYSFZQVH9IMBwaO9HHUd08W180h3H_pYfRDfMJQFkTElCAFl6GbCUlOmWcSXTj3BFVdhVo8K4" />
            <div className={cn(typography.caption.sm, "w-8 h-8 rounded-full border-2 border-white bg-secondary-fixed flex items-center justify-center font-bold text-on-secondary-fixed")}>+24</div>
          </div>
        </div>

        {/* Active Documents */}
        <div className="glass-panel-heavy p-5 sm:p-card-padding rounded-xl relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-2xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
            </div>
            <span className={cn(typography.label.sm, "flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full whitespace-nowrap")}>
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              12%
            </span>
          </div>
          <div className="space-y-1">
            <p className={cn(typography.label.md, "text-on-surface-variant uppercase tracking-wider")}>Active Documents</p>
            <h3 className={cn(typography.number.hero, "text-on-surface")}>8,942</h3>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-on-surface/5 rounded-full overflow-hidden">
              <div className="h-full bg-tertiary rounded-full" style={{ width: "78%" }}></div>
            </div>
            <span className={cn(typography.caption.sm, "text-on-surface-variant whitespace-nowrap font-bold")}>78% Target</span>
          </div>
        </div>

        {/* Expiring Soon */}
        <div className="glass-panel-heavy p-5 sm:p-card-padding rounded-xl relative overflow-hidden group hover:-translate-y-1 transition-transform border-error/10 sm:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-error/10 text-error rounded-2xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>assignment_late</span>
            </div>
            <div className={cn(typography.label.sm, "px-2 py-1 bg-error text-white rounded whitespace-nowrap")}>Urgent</div>
          </div>
          <div className="space-y-1">
            <p className={cn(typography.label.md, "text-on-surface-variant uppercase tracking-wider")}>Expiring Soon</p>
            <h3 className={cn(typography.number.hero, "text-on-surface")}>24</h3>
          </div>
          <p className={cn(typography.body.md, "mt-6 text-on-surface-variant")}>
            <span className="text-error font-bold">12% more</span> than April, 2026
          </p>
        </div>
      </section>

      {/* Quick Actions Row */}
      <section className="flex flex-wrap items-center gap-3 sm:gap-4">
        <button className={cn(typography.button.md, "glass-panel hover:-translate-y-[2px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl flex items-center gap-2 sm:gap-3 text-on-surface hover:bg-white/60 transition-all active:scale-95")}>
          <span className="material-symbols-outlined text-primary">person_add</span>
          <span>Add Employee</span>
        </button>
        <button className={cn(typography.button.md, "glass-panel hover:-translate-y-[2px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl flex items-center gap-2 sm:gap-3 text-on-surface hover:bg-white/60 transition-all active:scale-95")}>
          <span className="material-symbols-outlined text-tertiary">schema</span>
          <span>Departments</span>
        </button>
        <button className={cn(typography.button.md, "glass-panel hover:-translate-y-[2px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl flex items-center gap-2 sm:gap-3 text-on-surface hover:bg-white/60 transition-all active:scale-95")}>
          <span className="material-symbols-outlined text-secondary">insights</span>
          <span>Reports</span>
        </button>
        <button className={cn(typography.button.md, "glass-panel hover:-translate-y-[2px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl flex items-center gap-2 sm:gap-3 text-on-surface hover:bg-white/60 transition-all active:scale-95")}>
          <span className="material-symbols-outlined text-outline">file_download</span>
          <span>Export Data</span>
        </button>
      </section>

      {/* Document List Section */}
      <section className="space-y-stack-gap">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
          <div>
            <h2 className={cn(typography.heading.h2, "text-on-surface")}>Upcoming Document Expiries</h2>
            <p className={cn(typography.body.md, "text-on-surface-variant")}>Priority actions required within the next 7 days.</p>
          </div>
          <a className={cn(typography.button.md, "text-primary hover:underline flex items-center gap-1")} href="#">
            See all <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>

        <div className="space-y-3">
          {/* Row 1: Ahmed Ali */}
          <div className="glass-panel hover:-translate-y-[2px] p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 group hover:bg-white/50 transition-all border-l-4 border-l-error">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-surface-container overflow-hidden shrink-0">
                <img className="w-full h-full object-cover" alt="Ahmed Ali" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWp35OYHgJM4JJpofnS7NBp0gUwsPQPCAme_7ygXDnPoSSmKGM1-eGa2R-Kq7r6CmGKVpJoPb5SE6dGALMwvCPKRJz-4sX1IzWuezH-TIi1uf_4Yv68Ua8hKarwKU90JTi4eEDXB2se2f-Kkdw0gVmLLhbc2ti9LuI10K2Utdt3PVSA3hZ06Z-3Sq8I63a70ZgXtn_HB3hk_K_wrdWWjzXU3ZqjuZ3TKEcmj_QpIffGm6azgQO6TLaJZg2U8Fn29nBjc5tDw2Lc9s" />
              </div>
              <div className="min-w-0">
                <h4 className={cn(typography.heading.h3, "text-on-surface truncate")}>Ahmed Ali</h4>
                <p className={cn(typography.body.md, "text-on-surface-variant truncate")}>Dubai Branch • Engineering</p>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-between sm:justify-start gap-2 pl-16 sm:pl-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant text-lg">badge</span>
                <span className={cn(typography.body.lg, "font-bold text-on-surface")}>Visa Renewal</span>
              </div>
              <span className={cn(typography.label.sm, "sm:hidden px-3 py-1 bg-error/10 text-error rounded-full whitespace-nowrap")}>Expires Today</span>
            </div>
            <div className="hidden sm:flex flex-1">
              <span className={cn(typography.label.sm, "px-3 py-1 bg-error/10 text-error rounded-full whitespace-nowrap")}>Expires Today</span>
            </div>
            <div className="flex items-center gap-3 justify-end sm:justify-start pl-16 sm:pl-0">
              <button className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors">
                <span className="material-symbols-outlined">mail</span>
              </button>
              <button className={cn(typography.button.sm, "px-4 py-2 bg-primary text-white rounded-xl shadow-md shadow-primary/20 hover:opacity-90 active:scale-95 transition-all whitespace-nowrap")}>
                Remind
              </button>
            </div>
          </div>

          {/* Row 2: Mohammed Hassan */}
          <div className="glass-panel hover:-translate-y-[2px] p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 group hover:bg-white/50 transition-all border-l-4 border-l-[#ff8c00]">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-surface-container overflow-hidden shrink-0">
                <img className="w-full h-full object-cover" alt="Mohammed Hassan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC54s8qyYck0MuqRixmjUEsFx5WizxrBd_6tK2JUViW9eHtqy_6trSfFAmDba8D1Kp3Xh-jMnCUgzjScUI6g1vRKRW5pMnwnk2dv--kaqPxNJ6NUg4r5H25x_RWhNLjOG3MEA9UkavfgXCZUIE3u-R9QQYYv82OXttZIsA8NHKNtM85f63bouH_MVbhmB5G_vwpwoTiAwAjE9qBv7kniKlazJH9ORqxcCjCNzHROtLWJNHCXa8-1VE07Yepslv0l_r3XSqnfrww0sA" />
              </div>
              <div className="min-w-0">
                <h4 className={cn(typography.heading.h3, "text-on-surface truncate")}>Mohammed Hassan</h4>
                <p className={cn(typography.body.md, "text-on-surface-variant truncate")}>HQ Branch • Operations</p>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-between sm:justify-start gap-2 pl-16 sm:pl-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant text-lg">id_card</span>
                <span className={cn(typography.body.lg, "font-bold text-on-surface")}>Emirates ID</span>
              </div>
              <span className={cn(typography.label.sm, "sm:hidden px-3 py-1 bg-[#ff8c00]/10 text-[#ff8c00] rounded-full whitespace-nowrap")}>2 Days Left</span>
            </div>
            <div className="hidden sm:flex flex-1">
              <span className={cn(typography.label.sm, "px-3 py-1 bg-[#ff8c00]/10 text-[#ff8c00] rounded-full whitespace-nowrap")}>2 Days Left</span>
            </div>
            <div className="flex items-center gap-3 justify-end sm:justify-start pl-16 sm:pl-0">
              <button className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors">
                <span className="material-symbols-outlined">mail</span>
              </button>
              <button className={cn(typography.button.sm, "px-4 py-2 bg-primary text-white rounded-xl shadow-md shadow-primary/20 hover:opacity-90 active:scale-95 transition-all whitespace-nowrap")}>
                Remind
              </button>
            </div>
          </div>

          {/* Row 3: Sarah Khan */}
          <div className="glass-panel hover:-translate-y-[2px] p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 group hover:bg-white/50 transition-all border-l-4 border-l-[#ffd700]">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-surface-container overflow-hidden shrink-0">
                <img className="w-full h-full object-cover" alt="Sarah Khan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZlJXG7xnoz6ZH-fUzjOdtgbR8LWJRrmHB4zoAyQl6E8j6om3nt-MAWbd6ETAKsGP8f1zzsKV5T4dTEN27E1l3vawu6eRi9VV3593x0_xSEFORQxhh0ycdCjBEbLkbNYG7g5bowSSxlGdWnYoYY2soK7-3Tu6nHodzk2jj7f1H2z-0wcb2g3JYqbyogOPxJPZeKTSYwOrK6V_Kl2Jfz8jr1WeU2pPFa5sobMgReiXajBYhKtCHv8q1W4j7D2k9x_TB1ZN5j8DVs6U" />
              </div>
              <div className="min-w-0">
                <h4 className={cn(typography.heading.h3, "text-on-surface truncate")}>Sarah Khan</h4>
                <p className={cn(typography.body.md, "text-on-surface-variant truncate")}>Finance • London Branch</p>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-between sm:justify-start gap-2 pl-16 sm:pl-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant text-lg">password</span>
                <span className={cn(typography.body.lg, "font-bold text-on-surface")}>Passport</span>
              </div>
              <span className={cn(typography.label.sm, "sm:hidden px-3 py-1 bg-[#ffd700]/20 text-[#857000] rounded-full whitespace-nowrap")}>5 Days Left</span>
            </div>
            <div className="hidden sm:flex flex-1">
              <span className={cn(typography.label.sm, "px-3 py-1 bg-[#ffd700]/20 text-[#857000] rounded-full whitespace-nowrap")}>5 Days Left</span>
            </div>
            <div className="flex items-center gap-3 justify-end sm:justify-start pl-16 sm:pl-0">
              <button className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors">
                <span className="material-symbols-outlined">mail</span>
              </button>
              <button className={cn(typography.button.sm, "px-4 py-2 bg-primary text-white rounded-xl shadow-md shadow-primary/20 hover:opacity-90 active:scale-95 transition-all whitespace-nowrap")}>
                Remind
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}