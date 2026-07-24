"use client";

import { useState } from "react";
import MobileEmployeesTopAppBar from "../components/MobileEmployeesTopAppBar";
import MobileBottomNavBar from "../components/MobileBottomNavBar";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useEmployees, useConfig } from "@/backend/useHooks";
import { Employee } from "@/backend/data-types/models";

export default function MobileEmployeesPage() {
  const { employees, isLive, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const { departments, branches } = useConfig();

  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingEmp, setEditingEmp] = useState<Employee | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [dept, setDept] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");

  const openAddModal = () => {
    setEditingEmp(null);
    setName("");
    setCode("");
    setDept(departments[0]?.name || "");
    setLocation(branches[0]?.name || "");
    setEmail("");
    setPhone("");
    setPosition("");
    setShowModal(true);
  };

  const openEditModal = (emp: Employee) => {
    setEditingEmp(emp);
    setName(emp.full_name || "");
    setCode(emp.employee_code || "");
    setDept(emp.department_name || (departments[0]?.name || ""));
    setLocation(emp.location || (branches[0]?.name || ""));
    setEmail(emp.email || "");
    setPhone(emp.phone || "");
    setPosition(emp.position || "");
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    const selectedDepartment = dept || (departments.length > 0 ? departments[0].name : "General");
    const selectedLocation = location || (branches.length > 0 ? branches[0].name : "Global Headquarters");

    if (editingEmp) {
      await updateEmployee(editingEmp.id, {
        employee_code: code.trim() || editingEmp.employee_code,
        full_name: name.trim(),
        department_name: selectedDepartment,
        location: selectedLocation,
        email: email.trim(),
        phone: phone.trim(),
        position: position.trim(),
      });
    } else {
      await addEmployee({
        employee_code: code.trim() || `NEX-${Math.floor(1000 + Math.random() * 9000)}`,
        full_name: name.trim(),
        department_name: selectedDepartment,
        location: selectedLocation,
        email: email.trim(),
        phone: phone.trim(),
        position: position.trim() || "Team Member",
        status: "active",
        avatar_url: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150`,
      });
    }

    setShowModal(false);
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.full_name.toLowerCase().includes(search.toLowerCase()) ||
      emp.employee_code.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === "All" || emp.department_name === selectedDept;
    return matchesSearch && matchesDept;
  });

  const getStatusTag = (emp: any) => {
    const docs = emp.documents || [];
    if (docs.some((d: any) => d.status === "expired")) {
      return (
        <span className={cn(typography.label.sm, "flex items-center gap-1 text-error font-bold")}>
          <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
          EXPIRED
        </span>
      );
    }
    if (docs.some((d: any) => d.status === "expiring_soon")) {
      return (
        <span className={cn(typography.label.sm, "flex items-center gap-1 text-amber-500 font-bold")}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          EXPIRING SOON
        </span>
      );
    }
    return (
      <span className={cn(typography.label.sm, "flex items-center gap-1 text-primary font-bold")}>
        <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_rgba(70,72,212,0.6)]"></span>
        VALID
      </span>
    );
  };

  const departmentOptions = ["All", ...departments.map((d) => d.name)];

  return (
    <div className="bg-background text-on-surface min-h-screen relative z-[100] pb-32 overflow-x-hidden">
      {/* Background layer covering desktop sidebar */}
      <div className="fixed inset-0 bg-background z-[99]"></div>

      {/* Atmospheric Ambient Elements */}
      <div className="fixed top-1/4 -right-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full z-[100] animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-1/4 -left-20 w-64 h-64 bg-tertiary/10 blur-[100px] rounded-full z-[100] pointer-events-none"></div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm" />
          <div className="relative glass-modal rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto hide-scrollbar" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md pb-2 z-10 border-b border-outline-variant/20">
              <h3 className={cn(typography.heading.h3, "text-on-surface")}>
                {editingEmp ? "Edit Employee" : "Add Employee"}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-on-surface-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-3 pt-2">
              <div>
                <label className={cn(typography.caption.sm, "block text-on-surface-variant mb-1 font-semibold")}>Full Name *</label>
                <input
                  className="w-full bg-white/60 border border-outline-variant/30 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="e.g. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className={cn(typography.caption.sm, "block text-on-surface-variant mb-1 font-semibold")}>Employee Code</label>
                <input
                  className="w-full bg-white/60 border border-outline-variant/30 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="Code (e.g. NEX-1090)"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>

              <div>
                <label className={cn(typography.caption.sm, "block text-on-surface-variant mb-1 font-semibold")}>Department</label>
                <select
                  className="w-full bg-white/60 border border-outline-variant/30 rounded-xl px-3 py-2 text-sm outline-none"
                  value={dept || (departments[0]?.name || "")}
                  onChange={(e) => setDept(e.target.value)}
                >
                  {departments.length === 0 ? (
                    <option value="">General</option>
                  ) : (
                    departments.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className={cn(typography.caption.sm, "block text-on-surface-variant mb-1 font-semibold")}>Location (Branch)</label>
                <select
                  className="w-full bg-white/60 border border-outline-variant/30 rounded-xl px-3 py-2 text-sm outline-none"
                  value={location || (branches[0]?.name || "")}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {branches.length === 0 ? (
                    <option value="Global Headquarters">Global Headquarters</option>
                  ) : (
                    branches.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className={cn(typography.caption.sm, "block text-on-surface-variant mb-1 font-semibold")}>Email Address</label>
                <input
                  className="w-full bg-white/60 border border-outline-variant/30 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="sarah.j@company.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className={cn(typography.caption.sm, "block text-on-surface-variant mb-1 font-semibold")}>Phone Number</label>
                <input
                  className="w-full bg-white/60 border border-outline-variant/30 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="+971 50 123 4567"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <label className={cn(typography.caption.sm, "block text-on-surface-variant mb-1 font-semibold")}>Job Position / Title</label>
                <input
                  className="w-full bg-white/60 border border-outline-variant/30 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="e.g. Senior Specialist"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>

              <button onClick={handleSave} className="w-full py-3 bg-primary text-white rounded-xl font-medium shadow-md active:scale-95 transition-transform mt-2">
                {editingEmp ? "Update Employee" : "Save Employee"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-[100]">
        <MobileEmployeesTopAppBar />

        <main className="pt-24 px-4 max-w-md mx-auto space-y-6">
          {/* Search Section */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className={cn(typography.body.md, "w-full h-14 pl-12 pr-4 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-outline-variant outline-none shadow-sm")}
              placeholder="Find team members..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Department Filters */}
          <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 py-2">
            {departmentOptions.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDept(d)}
                className={cn(
                  typography.button.sm,
                  "px-6 py-2.5 rounded-full whitespace-nowrap active:scale-95 transition-transform",
                  selectedDept === d
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white/40 backdrop-blur-md border border-white/60 text-on-surface-variant hover:bg-white/60"
                )}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Staff List Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className={cn(typography.heading.h2, "text-on-surface")}>Team Directory</h2>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                <span className={cn(typography.caption.md, "text-outline font-bold")}>
                  {filteredEmployees.length} Total
                </span>
              </div>
            </div>

            {filteredEmployees.length === 0 && (
              <div className={cn(typography.body.md, "text-center py-8 text-on-surface-variant bg-white/30 rounded-2xl")}>
                No team members found.
              </div>
            )}

            {filteredEmployees.map((emp) => (
              <div key={emp.id} className="bg-white/40 backdrop-blur-md border border-white/50 p-4 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all duration-300 shadow-sm cursor-pointer hover:bg-white/60">
                <div className="flex items-center gap-4">
                  <div className="profile-ring">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center font-bold text-primary">
                      {emp.avatar_url ? (
                        <img className="w-full h-full object-cover" alt={emp.full_name} src={emp.avatar_url} />
                      ) : (
                        emp.full_name.charAt(0)
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className={cn(typography.heading.h3, "text-on-surface")}>{emp.full_name}</h3>
                    <p className={cn(typography.body.md, "text-outline")}>ID: {emp.employee_code}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className={cn(typography.label.sm, "px-2 py-0.5 bg-blue-100/50 text-blue-700 rounded")}>
                        {emp.department_name || "Staff"}
                      </span>
                      {getStatusTag(emp)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEditModal(emp)} className="p-2 text-on-surface-variant hover:text-primary">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button onClick={() => deleteEmployee(emp.id)} className="p-2 text-on-surface-variant hover:text-error">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </section>
        </main>

        {/* FAB */}
        <button
          onClick={openAddModal}
          className="fixed bottom-32 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center fab-glow active:scale-90 transition-transform z-[110] animate-float"
        >
          <span className="material-symbols-outlined text-[28px]">add</span>
        </button>

        <MobileBottomNavBar />
      </div>
    </div>
  );
}
