"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useSettings } from "@/backend/useHooks";

const inputCls =
  "w-full bg-white/40 border border-white/50 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium";

export default function SettingsPage() {
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
    <div className="px-6 md:px-12 py-10 max-w-[1400px] mx-auto w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h2 className={cn(typography.heading.h1, "text-on-background")}>System Settings</h2>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 border border-white/60 shadow-sm">
              <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
              <span className={cn(typography.caption.sm, "text-on-surface font-medium")}>
                {isLive ? "Supabase Live DB" : "Local State"}
              </span>
            </div>
          </div>
          <p className={cn(typography.body.lg, "text-on-surface-variant mt-1")}>
            Manage global workspace preferences, notification channels, and date formats.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className={cn(
            typography.button.md,
            "flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full shadow-lg shadow-primary/30 hover:brightness-110 transition-all active:scale-95 disabled:opacity-50"
          )}
        >
          <span className="material-symbols-outlined text-[20px]">save</span>
          <span>{saving ? "Saving..." : savedSuccess ? "Saved Successfully!" : "Save Changes"}</span>
        </button>
      </div>

      {/* Organization Profile Settings */}
      <section className="glass-panel-heavy rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
          <span className="material-symbols-outlined text-[48px]">corporate_fare</span>
        </div>
        <div className="flex-grow w-full space-y-4 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={cn(typography.label.md, "block text-on-surface-variant uppercase tracking-wider mb-1.5")}>
                Organization Name
              </label>
              <input
                className={inputCls}
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div>
              <label className={cn(typography.label.md, "block text-on-surface-variant uppercase tracking-wider mb-1.5")}>
                HR Notification Email
              </label>
              <input
                className={inputCls}
                placeholder="email@company.com"
                type="email"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications Settings */}
        <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]">notifications_active</span>
            <h3 className={cn(typography.heading.h2, "text-on-surface")}>Notification Channels</h3>
          </div>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className={cn(typography.body.lg, "font-bold text-on-surface block")}>Email Notifications</span>
                <span className={cn(typography.caption.sm, "text-on-surface-variant")}>Send automated email alerts before document expiry</span>
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
                <span className={cn(typography.body.lg, "font-bold text-on-surface block")}>Auto-Renewal Reminders</span>
                <span className={cn(typography.caption.sm, "text-on-surface-variant")}>Automatically dispatch reminders at 30, 15, and 7 days prior to expiry</span>
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
        </section>

        {/* App Preferences */}
        <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]">tune</span>
            <h3 className={cn(typography.heading.h2, "text-on-surface")}>Regional Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className={cn(typography.label.md, "font-bold text-on-surface-variant uppercase tracking-wider")}>
                System Date Format
              </label>
              <select
                className={inputCls}
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
              >
                <option value="DD/MM/YY">DD/MM/YY (e.g. 24/07/26)</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 24/07/2026)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (ISO Format)</option>
              </select>
            </div>

            <div className="p-4 bg-primary/10 rounded-xl flex items-center gap-3 mt-4">
              <span className="material-symbols-outlined text-primary">info</span>
              <p className={cn(typography.caption.md, "text-on-surface-variant")}>
                All dates in document cards and tables respect your chosen system date format.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
