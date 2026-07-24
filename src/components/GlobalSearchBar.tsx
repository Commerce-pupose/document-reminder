"use client";

import { useState, useRef, useEffect } from "react";
import { useEmployees, useDocuments } from "@/backend/useHooks";
import { formatDisplayDate } from "@/lib/dateUtils";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useRouter } from "next/navigation";

export default function GlobalSearchBar() {
  const { employees } = useEmployees();
  const { documents } = useDocuments();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getEmpName = (empId: string) => {
    const found = employees.find((e) => e.id === empId);
    return found ? found.full_name : "Team Member";
  };

  const q = query.trim().toLowerCase();

  // Working search matching across employees and documents
  const matchingEmployees = q
    ? employees.filter(
        (emp) =>
          emp.full_name?.toLowerCase().includes(q) ||
          emp.employee_code?.toLowerCase().includes(q) ||
          emp.department_name?.toLowerCase().includes(q) ||
          emp.position?.toLowerCase().includes(q) ||
          emp.email?.toLowerCase().includes(q)
      )
    : [];

  const matchingDocuments = q
    ? documents.filter((doc) => {
        const empName = getEmpName(doc.employee_id).toLowerCase();
        const docName = (doc.document_type_name || "").toLowerCase();
        const docNum = (doc.document_number || "").toLowerCase();
        const status = (doc.status || "").toLowerCase();
        return (
          empName.includes(q) ||
          docName.includes(q) ||
          docNum.includes(q) ||
          status.includes(q)
        );
      })
    : [];

  const totalResults = matchingEmployees.length + matchingDocuments.length;

  const handleSelectResult = (path: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(path);
  };

  return (
    <div className="w-full relative max-w-[700px]" ref={searchRef}>
      {/* Search Input Box with Clean White Background */}
      <div className="relative flex items-center">
        <span className="material-symbols-outlined absolute left-4 text-slate-400 pointer-events-none">
          search
        </span>
        <input
          className={cn(
            typography.body.md,
            "w-full h-12 pl-12 pr-10 bg-white/90 border border-slate-200/80 rounded-full focus:ring-2 focus:ring-primary/30 focus:bg-white placeholder:text-slate-400 shadow-sm transition-all outline-none text-slate-800 font-medium"
          )}
          placeholder="Search employees, documents, visa status..."
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 transition-colors text-xs font-bold"
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search Overlay Dropdown with White Background */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white/95 border border-slate-200/90 rounded-2xl shadow-2xl backdrop-blur-2xl z-[160] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 max-h-[480px] overflow-y-auto text-slate-800">
          {/* Header */}
          <div className="p-3.5 bg-slate-50 border-b border-slate-100 flex justify-between items-center px-4">
            <span className="text-xs font-bold tracking-wider uppercase text-slate-500">
              SEARCH RESULTS ({totalResults})
            </span>
            <span className="text-[11px] font-medium text-slate-400">ESC to close</span>
          </div>

          {totalResults === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <span className="material-symbols-outlined text-4xl mb-2 text-slate-300">search_off</span>
              <p className="text-sm font-bold text-slate-700">No matching employees or documents</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for a name, visa type, or ID number.</p>
            </div>
          ) : (
            <div className="p-2 space-y-3">
              {/* Employee Results */}
              {matchingEmployees.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase text-indigo-600">
                    Employees ({matchingEmployees.length})
                  </div>
                  <div className="space-y-1">
                    {matchingEmployees.slice(0, 5).map((emp) => (
                      <button
                        key={emp.id}
                        onClick={() => handleSelectResult("/desktop-view/employees")}
                        className="w-full p-2.5 rounded-xl flex items-center gap-3 hover:bg-slate-50 transition-colors text-left group border border-transparent hover:border-slate-100"
                      >
                        <div className="w-9 h-9 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold flex items-center justify-center text-sm shrink-0">
                          {emp.full_name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                            {emp.full_name}
                          </h5>
                          <p className="text-[11px] text-slate-500 truncate">
                            {emp.position || "Employee"} • {emp.department_name || "General"}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                          {emp.employee_code || "EMP"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Document Results */}
              {matchingDocuments.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase text-emerald-600">
                    Documents & Visas ({matchingDocuments.length})
                  </div>
                  <div className="space-y-1">
                    {matchingDocuments.slice(0, 5).map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => handleSelectResult("/desktop-view/documents")}
                        className="w-full p-2.5 rounded-xl flex items-center gap-3 hover:bg-slate-50 transition-colors text-left group border border-transparent hover:border-slate-100"
                      >
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px]">description</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h5 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                              {doc.document_type_name}
                            </h5>
                            <span
                              className={cn(
                                "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase shrink-0",
                                doc.status === "expired"
                                  ? "bg-red-100 text-red-700 border border-red-200"
                                  : doc.status === "expiring_soon"
                                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                                  : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                              )}
                            >
                              {doc.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">
                            Holder: {getEmpName(doc.employee_id)} • Exp: {formatDisplayDate(doc.expiry_date)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
