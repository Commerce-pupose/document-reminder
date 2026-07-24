"use client";

import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useDashboardStats, useEmployees, useDocuments, useConfig } from "@/backend/useHooks";

export default function ReportsPage() {
  const { stats, loading } = useDashboardStats();
  const { employees } = useEmployees();
  const { documents, isLive } = useDocuments();
  const { departments, documentTypes } = useConfig();

  const totalDocs = documents.length;
  const complianceRate = totalDocs > 0 ? Math.round((stats.validDocumentsCount / totalDocs) * 100) : 100;

  // Calculate Document Distribution by Type
  const docTypeCounts: Record<string, number> = {};
  documents.forEach((d) => {
    const name = d.document_type_name || "Other";
    docTypeCounts[name] = (docTypeCounts[name] || 0) + 1;
  });

  // Calculate Department Compliance Breakdown
  const deptCompliance = departments.map((dept) => {
    const deptEmployees = employees.filter(
      (e) => (e.department_name || "").toLowerCase() === dept.name.toLowerCase() || e.department_id === dept.id
    );
    const empIds = new Set(deptEmployees.map((e) => e.id));
    const deptDocs = documents.filter((d) => empIds.has(d.employee_id));

    const totalDeptDocs = deptDocs.length;
    const validDeptDocs = deptDocs.filter((d) => d.status === "valid").length;
    const rate = totalDeptDocs > 0 ? Math.round((validDeptDocs / totalDeptDocs) * 100) : 100;

    let riskLevel = "Low Risk";
    let riskColor = "bg-green-100 text-green-700";
    if (rate < 75) {
      riskLevel = "High Risk";
      riskColor = "bg-red-100 text-red-700";
    } else if (rate < 90) {
      riskLevel = "Medium Risk";
      riskColor = "bg-yellow-100 text-yellow-700";
    }

    return {
      dept,
      staffCount: deptEmployees.length,
      complianceRate: rate,
      riskLevel,
      riskColor,
    };
  });

  return (
    <>
      <div className="px-6 md:px-12 py-10 max-w-[1400px] mx-auto w-full space-y-8">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h2 className={cn(typography.heading.h1, "text-on-background")}>Reports &amp; Analytics</h2>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 border border-white/60 shadow-sm">
                <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                <span className={cn(typography.caption.sm, "text-on-surface font-medium")}>
                  {isLive ? "Supabase Live DB" : "Local State"}
                </span>
              </div>
            </div>
            <p className={cn(typography.body.lg, "text-on-surface-variant mt-1 opacity-70")}>
              Strategic insights into organizational compliance and document health.
            </p>
          </div>
        </div>

        {/* Summary Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tile 1 */}
          <div className="glass-panel-heavy p-6 rounded-[24px] transition-transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <span className={cn(typography.label.sm, "text-primary bg-primary/5 px-2 py-1 rounded-full whitespace-nowrap font-bold")}>Live</span>
            </div>
            <p className={cn(typography.label.md, "text-on-surface-variant uppercase tracking-wider")}>Compliance Rate</p>
            <h3 className={cn(typography.number.large, "text-on-surface")}>{loading ? "..." : `${complianceRate}%`}</h3>
          </div>

          {/* Tile 2 */}
          <div className="glass-panel-heavy p-6 rounded-[24px] transition-transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                <span className="material-symbols-outlined">description</span>
              </div>
              <span className={cn(typography.label.sm, "text-tertiary bg-tertiary/5 px-2 py-1 rounded-full whitespace-nowrap font-bold")}>Repository</span>
            </div>
            <p className={cn(typography.label.md, "text-on-surface-variant uppercase tracking-wider")}>Total Documents</p>
            <h3 className={cn(typography.number.large, "text-on-surface")}>{loading ? "..." : totalDocs}</h3>
          </div>

          {/* Tile 3 */}
          <div className="glass-panel-heavy p-6 rounded-[24px] transition-transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center text-error shrink-0">
                <span className="material-symbols-outlined">pending_actions</span>
              </div>
              <span className={cn(typography.label.sm, "text-error bg-error/5 px-2 py-1 rounded-full whitespace-nowrap font-bold")}>Priority</span>
            </div>
            <p className={cn(typography.label.md, "text-on-surface-variant uppercase tracking-wider")}>Pending Expiries</p>
            <h3 className={cn(typography.number.large, "text-on-surface")}>{loading ? "..." : stats.activeRemindersCount}</h3>
          </div>

          {/* Tile 4 */}
          <div className="glass-panel-heavy p-6 rounded-[24px] transition-transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined">group</span>
              </div>
              <span className={cn(typography.label.sm, "text-secondary bg-secondary/5 px-2 py-1 rounded-full whitespace-nowrap font-bold")}>Staff</span>
            </div>
            <p className={cn(typography.label.md, "text-on-surface-variant uppercase tracking-wider")}>Active Workforce</p>
            <h3 className={cn(typography.number.large, "text-on-surface")}>{loading ? "..." : employees.length}</h3>
          </div>
        </div>

        {/* Charts & Distribution Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          {/* Document Type Distribution Card */}
          <div className="lg:col-span-2 glass-panel-heavy p-6 md:p-8 rounded-[24px] space-y-6">
            <div className="flex justify-between items-center">
              <h4 className={cn(typography.heading.h2, "text-on-surface")}>Document Type Distribution</h4>
              <span className={cn(typography.caption.sm, "text-on-surface-variant font-bold")}>{documentTypes.length} Configured Types</span>
            </div>

            <div className="space-y-4 pt-2">
              {documentTypes.map((dt) => {
                const count = docTypeCounts[dt.name] || 0;
                const percent = totalDocs > 0 ? Math.round((count / totalDocs) * 100) : 0;
                return (
                  <div key={dt.id} className="space-y-1.5">
                    <div className="flex justify-between items-center text-sm font-semibold text-on-surface">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">{dt.icon || "description"}</span>
                        <span>{dt.name}</span>
                      </div>
                      <span>{count} docs ({percent}%)</span>
                    </div>
                    <div className="w-full bg-white/40 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compliance Status Breakdown */}
          <div className="glass-panel-heavy p-6 md:p-8 rounded-[24px] flex flex-col items-center justify-between">
            <h4 className={cn(typography.heading.h2, "text-on-surface self-start mb-4")}>Compliance Breakdown</h4>

            <div className="relative w-44 h-44 flex items-center justify-center my-4">
              <div className="w-full h-full rounded-full border-[18px] border-primary flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <span className={cn(typography.number.large, "text-on-surface")}>{complianceRate}%</span>
                  <span className={cn(typography.caption.sm, "font-bold uppercase tracking-wider opacity-60")}>Health</span>
                </div>
              </div>
            </div>

            <div className="w-full space-y-3 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                  <span className={cn(typography.body.md, "text-on-surface-variant")}>Valid Documents</span>
                </div>
                <span className={cn(typography.body.md, "font-bold text-on-surface")}>{stats.validDocumentsCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                  <span className={cn(typography.body.md, "text-on-surface-variant")}>Expiring Soon</span>
                </div>
                <span className={cn(typography.body.md, "font-bold text-on-surface")}>{stats.expiringDocumentsCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-error shrink-0" />
                  <span className={cn(typography.body.md, "text-on-surface-variant")}>Expired</span>
                </div>
                <span className={cn(typography.body.md, "font-bold text-error")}>{stats.expiredDocumentsCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Department Table Section */}
        <div className="glass-panel-heavy p-6 md:p-8 rounded-[24px] mt-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <h4 className={cn(typography.heading.h2, "text-on-surface")}>Compliance by Department</h4>
            <span className={cn(typography.caption.md, "text-on-surface-variant font-bold")}>
              {departments.length} Live Departments
            </span>
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
                {deptCompliance.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-on-surface-variant">
                      No department data available. Add departments in System Config.
                    </td>
                  </tr>
                ) : (
                  deptCompliance.map(({ dept, staffCount, complianceRate: rate, riskLevel, riskColor }) => (
                    <tr key={dept.id} className="hover:bg-white/40 transition-colors group">
                      <td className="py-4 md:py-5 px-2">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
                          </div>
                          <span className={cn(typography.heading.h3, "text-on-surface")}>{dept.name}</span>
                        </div>
                      </td>
                      <td className={cn(typography.body.md, "py-4 md:py-5 px-2 text-on-surface-variant font-medium")}>
                        {staffCount} Employees
                      </td>
                      <td className="py-4 md:py-5 px-2 w-48 md:w-64">
                        <div className="flex items-center gap-4">
                          <div className="flex-grow bg-white/40 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full shadow-[0_0_8px_rgba(70,72,212,0.5)]" style={{ width: `${rate}%` }}></div>
                          </div>
                          <span className={cn(typography.body.md, "font-bold text-primary")}>{rate}%</span>
                        </div>
                      </td>
                      <td className="py-4 md:py-5 px-2">
                        <span className={cn(typography.label.sm, `px-3 md:px-4 py-1.5 rounded-full shadow-sm whitespace-nowrap font-bold ${riskColor}`)}>
                          {riskLevel}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
