export default function SettingsPage() {
  return (
    <div className="px-6 md:px-12 py-10 max-w-[1400px] mx-auto w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-background">Settings</h2>
          <p className="text-sm sm:text-body-lg text-on-surface-variant mt-1">Manage your profile, preferences, and account security.</p>
        </div>
      </div>

      {/* Profile Settings */}
      <section className="glass-panel-heavy rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="relative group shrink-0">
          <div className="w-32 h-32 rounded-full p-1 border-2 border-primary-container relative">
            <div className="w-full h-full rounded-full p-1 border-2 border-primary/40">
              <img
                className="w-full h-full rounded-full object-cover shadow-lg"
                alt="Sarah Jenkins"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuClJdoBTawLQMPFYwSDLhGXRhjzCBFUeHZmZulbxVX5Xqb7ztoc7Yqg-u2-3rD8WidUgbKa7slH1M8TKYN12RUgsC0F2sDrljo3o1gH_F0WfF0DF_8HTsSDIJpEPwti8keTkeQJOhrn2XH4tPjMmTiPDmhlEXf1v4KDtlDR2qTRpVcf34BqhA2e503qL66IeLEH98bV3UuHVTLYdOdZ-RD4LHrsySqv001c14xMs4T-AgybkLCMdauG2iSGqclpooRuDvXesIh5vVc"
              />
            </div>
          </div>
          <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
        </div>
        <div className="flex-grow text-center md:text-left">
          <h2 className="font-display text-2xl sm:text-[32px] text-on-surface font-bold">Sarah Jenkins</h2>
          <p className="font-body-lg text-sm sm:text-base text-on-surface-variant mb-6">HR Director • Global Operations</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <button className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity">
              Edit Profile
            </button>
            <button className="border border-outline-variant/50 text-on-surface px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white/40 transition-colors">
              View Public Profile
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Security */}
        <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]">security</span>
            <h3 className="font-headline-md text-xl sm:text-[24px] font-bold">Account Security</h3>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/40 rounded-xl gap-4">
              <div>
                <p className="font-bold text-sm sm:text-base text-on-surface">Password</p>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1">Last changed 3 months ago</p>
              </div>
              <button className="text-primary font-bold text-sm hover:underline self-start sm:self-auto">Change</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/40 rounded-xl gap-4">
              <div>
                <p className="font-bold text-sm sm:text-base text-on-surface">Two-Factor Auth</p>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1">Add an extra layer of security</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-sm"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]">notifications_active</span>
            <h3 className="font-headline-md text-xl sm:text-[24px] font-bold">Notifications</h3>
          </div>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm sm:text-base text-on-surface">Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-sm"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm sm:text-base text-on-surface">Push Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-sm"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm sm:text-base text-on-surface">Desktop Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-sm"></div>
              </label>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant pt-3 border-t border-white/30">
              Alerts include: document expiries, system updates, and leave requests.
            </p>
          </div>
        </section>

        {/* App Preferences */}
        <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]">tune</span>
            <h3 className="font-headline-md text-xl sm:text-[24px] font-bold">App Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold text-on-surface-variant uppercase tracking-wider">Theme</label>
                <select className="w-full bg-white/40 border border-white/50 rounded-xl text-sm font-medium px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold text-on-surface-variant uppercase tracking-wider">Language</label>
                <select className="w-full bg-white/40 border border-white/50 rounded-xl text-sm font-medium px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>Arabic</option>
                </select>
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <label className="text-xs sm:text-sm font-bold text-on-surface-variant uppercase tracking-wider">Currency</label>
              <select className="w-full bg-white/40 border border-white/50 rounded-xl text-sm font-medium px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>AED (د.إ)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Subscription & Billing */}
        <section className="glass-panel-heavy rounded-2xl p-6 sm:p-8 space-y-6 border-2 border-primary/10">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[28px]">credit_card</span>
              <h3 className="font-headline-md text-xl sm:text-[24px] font-bold">Subscription</h3>
            </div>
            <span className="bg-primary-container text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
              Enterprise Plan
            </span>
          </div>
          <div className="p-5 bg-white/40 rounded-xl border border-white/50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-on-surface">Monthly Billing</span>
                <span className="text-2xl font-bold text-primary">$499.00</span>
              </div>
              <p className="text-xs text-on-surface-variant font-medium">Next billing date: Oct 24, 2026</p>
            </div>
          </div>
          <button className="w-full py-3 bg-on-surface text-white rounded-xl font-bold text-sm shadow-md hover:bg-on-surface/90 transition-colors active:scale-[0.98]">
            Manage Billing
          </button>
        </section>
      </div>

      {/* Footer Info */}
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 pt-6 border-t border-white/20">
        <p className="text-xs text-on-surface-variant font-medium">© 2026 HR Harmony Cloud Solutions. All rights reserved.</p>
        <div className="flex gap-4 md:gap-6 text-xs font-bold text-on-surface-variant">
          <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a className="hover:text-primary transition-colors" href="#">Data Security</a>
        </div>
      </div>
    </div>
  );
}
