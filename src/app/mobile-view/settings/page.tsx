"use client";

import { useState, useEffect } from "react";
import MobileBottomNavBar from "../components/MobileBottomNavBar";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useSettings } from "@/backend/useHooks";

export default function MobileSettingsPage() {
  const { settings, isLive, updateSettings } = useSettings();

  const [companyName, setCompanyName] = useState("");
  const [notificationEmail, setNotificationEmail] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoRenewalReminders, setAutoRenewalReminders] = useState(true);
  const [dateFormat, setDateFormat] = useState("DD/MM/YY");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setCompanyName(settings.company_name || "Acme Corporation");
      setNotificationEmail(settings.notification_email || "hr-alerts@acme.com");
      setEmailNotifications(settings.email_notifications_enabled ?? true);
      setAutoRenewalReminders(settings.auto_renewal_reminders ?? true);
      setDateFormat(settings.date_format || "DD/MM/YY");
    }
  }, [settings]);

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await updateSettings({
        company_name: companyName,
        notification_email: notificationEmail,
        email_notifications_enabled: emailNotifications,
        auto_renewal_reminders: autoRenewalReminders,
        date_format: dateFormat,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen relative z-[100] pb-32">
      {/* Background layer covering desktop sidebar */}
      <div className="fixed inset-0 bg-background z-[99]"></div>

      <div className="relative z-[100]">
        {/* TopAppBar */}
        <header className="w-full top-0 sticky z-[110] bg-surface/60 backdrop-blur-xl border-b border-white/20 shadow-sm flex justify-between items-center px-4 py-4">
          <h1 className={cn(typography.heading.h1, "text-primary tracking-tight")}>Settings</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/40 border border-white/60 shadow-sm">
              <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
              <span className={cn(typography.caption.sm, "text-on-surface font-medium")}>
                {isLive ? "Live" : "Local"}
              </span>
            </div>
          </div>
        </header>

        <main className="px-4 pt-6 space-y-6 max-w-md mx-auto">
          {/* Organization Profile Section */}
          <section className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[28px]">corporate_fare</span>
              <h2 className={cn(typography.heading.h3, "text-on-surface")}>Organization</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className={cn(typography.caption.sm, "block text-on-surface-variant mb-1 font-semibold")}>
                  Company Name
                </label>
                <input
                  className="w-full bg-white/60 border border-white/50 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="Acme Corporation"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div>
                <label className={cn(typography.caption.sm, "block text-on-surface-variant mb-1 font-semibold")}>
                  Notification Email
                </label>
                <input
                  className="w-full bg-white/60 border border-white/50 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="hr-alerts@company.com"
                  type="email"
                  value={notificationEmail}
                  onChange={(e) => setNotificationEmail(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Notification Controls */}
          <div className="space-y-3">
            <h3 className={cn(typography.label.md, "text-outline uppercase tracking-widest px-1")}>Notifications</h3>
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className={cn(typography.body.md, "font-semibold text-on-surface block")}>Email Notifications</span>
                  <span className={cn(typography.caption.sm, "text-on-surface-variant")}>Send document expiry alerts</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-sm"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/30">
                <div>
                  <span className={cn(typography.body.md, "font-semibold text-on-surface block")}>Auto-Renewal Reminders</span>
                  <span className={cn(typography.caption.sm, "text-on-surface-variant")}>Alerts at 30, 15, and 7 days prior</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRenewalReminders}
                    onChange={(e) => setAutoRenewalReminders(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-sm"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Regional Preferences */}
          <div className="space-y-3">
            <h3 className={cn(typography.label.md, "text-outline uppercase tracking-widest px-1")}>Date Format</h3>
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 space-y-2 shadow-sm">
              <label className={cn(typography.caption.sm, "block text-on-surface-variant font-semibold")}>System Date Format</label>
              <select
                className="w-full bg-white/60 border border-white/50 rounded-xl px-3 py-2.5 text-sm outline-none font-medium"
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
              >
                <option value="DD/MM/YY">DD/MM/YY (e.g. 24/07/26)</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 24/07/2026)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (ISO Format)</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className={cn(
              typography.button.md,
              "w-full py-3.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            )}
          >
            <span className="material-symbols-outlined text-[20px]">save</span>
            <span>{saving ? "Saving..." : savedSuccess ? "Saved Successfully!" : "Save Settings"}</span>
          </button>
        </main>

        <MobileBottomNavBar />
      </div>
    </div>
  );
}
