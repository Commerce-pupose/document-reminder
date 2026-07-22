export default function EmployeesPage() {
  return (
    <>
      {/* Background Aura */}
      <div className="aura-glow">
        <div className="aura-circle bg-primary-container w-[500px] h-[500px] top-[-100px] left-[-100px]"></div>
        <div className="aura-circle bg-tertiary-container w-[400px] h-[400px] bottom-[10%] right-[-10%]"></div>
        <div className="aura-circle bg-secondary-container w-[300px] h-[300px] top-[40%] left-[20%]"></div>
      </div>

      {/* Main Content Area */}
      <div className="p-8 flex flex-col gap-8 max-w-[1400px] mx-auto w-full">
          {/* Dashboard Header */}
          <div className="flex justify-between items-end">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-background">Employees</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <p className="text-on-surface-variant font-body-md">1,248 active team members</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-full font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all">
              <span className="material-symbols-outlined text-[20px]">person_add</span>
              <span>Add Employee</span>
            </button>
          </div>

          {/* Main Glass Container */}
          <div className="glass-card rounded-xl overflow-hidden flex flex-col border border-white/40">
            {/* Filters Row */}
            <div className="p-6 border-b border-white/20 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-white/40 px-4 py-2 rounded-full border border-white/40 cursor-pointer hover:bg-white/60 transition-colors">
                <span className="material-symbols-outlined text-primary text-[18px]">account_tree</span>
                <span className="text-body-md font-semibold">Department</span>
                <span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
              </div>
              <div className="flex items-center gap-2 bg-white/40 px-4 py-2 rounded-full border border-white/40 cursor-pointer hover:bg-white/60 transition-colors">
                <span className="material-symbols-outlined text-primary text-[18px]">description</span>
                <span className="text-body-md font-semibold">Document Status</span>
                <span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
              </div>
              <div className="flex items-center gap-2 bg-white/40 px-4 py-2 rounded-full border border-white/40 cursor-pointer hover:bg-white/60 transition-colors">
                <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                <span className="text-body-md font-semibold">Location</span>
                <span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
              </div>
              <div className="ml-auto flex items-center gap-2 text-on-surface-variant font-semibold px-4 py-2 cursor-pointer hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>More Filters</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary/5">
                    <th className="px-6 py-4 font-bold text-on-surface-variant uppercase text-[11px] tracking-widest">Employee</th>
                    <th className="px-6 py-4 font-bold text-on-surface-variant uppercase text-[11px] tracking-widest">Department</th>
                    <th className="px-6 py-4 font-bold text-on-surface-variant uppercase text-[11px] tracking-widest">Documents</th>
                    <th className="px-6 py-4 font-bold text-on-surface-variant uppercase text-[11px] tracking-widest">Expiry Status</th>
                    <th className="px-6 py-4 font-bold text-on-surface-variant uppercase text-[11px] tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {/* Row 1 */}
                  <tr className="hover:bg-white/30 transition-colors group hover:translate-x-1 duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-surface-container">
                          <img className="w-full h-full object-cover" alt="Elena Rodriguez" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW3aepQoOU3rAJLAfm6SHhGjJzaMiSfzGCh7qHfZ0YqvWSkWGRag2e0-TiQF0BLd7_YTxChmBm2Zr_v_JCrXdh1Q1U1IlHCnCFyJOsXCHr2QLPvLa1agldkDGTbe2L2xOUSpD_n36pD5lq9Ut9RJl1V_sZE3Q4Tjys6C03S8ZDF0nP6yrcYPiPsTkPX66yUtY01utt__8L4i7aMQjKqStUzw6TSDP23F3NG3pTx2EKU9cfJ0AaXYvQR1N7QrdRlhx50DgExMNzJWY" />
                        </div>
                        <div>
                          <p className="font-bold text-on-background">Elena Rodriguez</p>
                          <p className="text-[12px] text-on-surface-variant font-medium">ID: NEX-2041</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-on-background font-semibold">Product Design</span>
                        <span className="text-[12px] text-on-surface-variant">Global Headquarters</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-help" title="Visa">
                          <span className="material-symbols-outlined text-[18px]">airplane_ticket</span>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-help" title="National ID">
                          <span className="material-symbols-outlined text-[18px]">badge</span>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-help" title="Passport">
                          <span className="material-symbols-outlined text-[18px]">public</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-green-100 text-green-700 border border-green-200">
                        Valid
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-primary/10 rounded-full text-primary transition-all">
                        <span className="material-symbols-outlined">chevron_right</span>
                      </button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-white/30 transition-colors group hover:translate-x-1 duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-surface-container">
                          <img className="w-full h-full object-cover" alt="Marcus Thorne" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUrLfNYtd2MwkpBhto7qNKK2u6ibJvVd2_jWsvaD77isLVyz2TYXKtgh2Pc7CzEhOe4sD84hEVErHRHm3FNmywPQ2T5cZmLagIQr02Vj-zLcDnPD1VUu-dSNXxE0uAKvra4z-BZ4ul3huR7cUUX6fBOAfsdKIrti85WJfI9jrfw_qE7E0B6zML1dGbi9QUal3oQz5wCHkh-e8mQXV21LEnIH4FJda4LHCmxgyWWc1BOPMvPlZI_lO3V3qEf9pR6s5umR7hSqngoMU" />
                        </div>
                        <div>
                          <p className="font-bold text-on-background">Marcus Thorne</p>
                          <p className="text-[12px] text-on-surface-variant font-medium">ID: NEX-1189</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-on-background font-semibold">Engineering</span>
                        <span className="text-[12px] text-on-surface-variant">London Office</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-help" title="Visa">
                          <span className="material-symbols-outlined text-[18px]">airplane_ticket</span>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-help" title="National ID">
                          <span className="material-symbols-outlined text-[18px]">badge</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-orange-100 text-orange-700 border border-orange-200">
                        Expiring Soon
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-primary/10 rounded-full text-primary transition-all">
                        <span className="material-symbols-outlined">chevron_right</span>
                      </button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-white/30 transition-colors group hover:translate-x-1 duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-surface-container">
                          <img className="w-full h-full object-cover" alt="Sienna Wu" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARy4SE0wRIyR-pa0QQ_7JG30zNNNMptd5SO5L1f75_p2t2AuTlAU4W9ZLn2txRhwhDEHCuxO1JI-TL7EgMtHLQ1DHWt6FWt4LJJ6kDDauEXQ-Un1TKKvIVNMKQnHHai-_Jie-x04i7Pjt8i_dGQQTA1FQzSw6Ec8-Kz_qkoRAVC2TtOFfOiXc0wd6OOKMuyJGOb8UmsLm2OgYHw9iPiyesmUTty8bDIDfSP4kZJDCTRLq2X4NghpiV5LKOYIsgNu70m-61s6awO1s" />
                        </div>
                        <div>
                          <p className="font-bold text-on-background">Sienna Wu</p>
                          <p className="text-[12px] text-on-surface-variant font-medium">ID: NEX-0922</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-on-background font-semibold">Strategic Ops</span>
                        <span className="text-[12px] text-on-surface-variant">Singapore Hub</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-help" title="Passport">
                          <span className="material-symbols-outlined text-[18px]">public</span>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-help" title="National ID">
                          <span className="material-symbols-outlined text-[18px]">badge</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-error-container text-on-error-container border border-error-container/50">
                        Expired
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-primary/10 rounded-full text-primary transition-all">
                        <span className="material-symbols-outlined">chevron_right</span>
                      </button>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="hover:bg-white/30 transition-colors group hover:translate-x-1 duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-surface-container">
                          <img className="w-full h-full object-cover" alt="Jordan Vance" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATd0q-MMETclFcYMeir1SUIMzT0DXWqToZ2WBvWm7OSP2v_Ks27tG42RwQbRsR6DKK9klitmR9jERgNIc67fPI8PYY2aWh_0EWo4bSCmgfXUTWmdfWiGDmpQdhpwKo553pXs0KIZ4tVdTs7zid7Zhz5vWZOd8HVpjij0E0I4EndswgqRK3kqudIRbFEZ3fSVeSjAxwOl4BLh7nNwCaEgKxnT8HXgNDfi4n2svX6ugmqNfeuJnk4zQqoFylO4Hf9Sfl3W-KJzIlSso" />
                        </div>
                        <div>
                          <p className="font-bold text-on-background">Jordan Vance</p>
                          <p className="text-[12px] text-on-surface-variant font-medium">ID: NEX-3302</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-on-background font-semibold">Marketing</span>
                        <span className="text-[12px] text-on-surface-variant">Global Headquarters</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-help" title="Passport">
                          <span className="material-symbols-outlined text-[18px]">public</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-green-100 text-green-700 border border-green-200">
                        Valid
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-primary/10 rounded-full text-primary transition-all">
                        <span className="material-symbols-outlined">chevron_right</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-6 border-t border-white/20 flex items-center justify-between">
              <p className="text-[12px] text-on-surface-variant font-semibold">Showing 1-10 of 1,248 employees</p>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/40 transition-colors border border-white/40 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold shadow-md shadow-primary/20">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/40 transition-colors border border-white/40 text-on-surface-variant font-bold">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/40 transition-colors border border-white/40 text-on-surface-variant font-bold">3</button>
                <span className="px-2 text-on-surface-variant">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/40 transition-colors border border-white/40 text-on-surface-variant font-bold">125</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/40 transition-colors border border-white/40 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
