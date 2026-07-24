"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { typography } from "@/config/typography";
import { useEmployees, useConfig } from "@/backend/useHooks";
import { Employee } from "@/backend/data-types/models";

const inputCls =
  "w-full bg-surface-container/50 border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all";

export default function EmployeesPage() {
  const { employees, isLive, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const { departments, branches } = useConfig();

  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingEmp, setEditingEmp] = useState<Employee | null>(null);

  // Form state
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
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

  const handleSaveEmployee = async () => {
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
      const generatedCode = code.trim() || `NEX-${Math.floor(1000 + Math.random() * 9000)}`;
      await addEmployee({
        employee_code: generatedCode,
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

  // Filtering
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.full_name.toLowerCase().includes(search.toLowerCase()) ||
      emp.employee_code.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === "all" || emp.department_name === selectedDept;
    return matchesSearch && matchesDept;
  });

  const getDocStatusBadge = (emp: Employee) => {
    const docs = emp.documents || [];
    if (docs.some((d) => d.status === "expired")) {
      return (
        <span className={cn(typography.label.sm, "inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-200")}>
          Expired
        </span>
      );
    }
    if (docs.some((d) => d.status === "expiring_soon")) {
      return (
        <span className={cn(typography.label.sm, "inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200")}>
          Expiring Soon
        </span>
      );
    }
    return (
      <span className={cn(typography.label.sm, "inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200")}>
        Valid
      </span>
    );
  };

  return (
    <>
      {/* Employee Modal (Add or Edit) */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm" />
          <div className="relative glass-modal rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className={cn(typography.heading.h2, "text-on-surface")}>
                {editingEmp ? "Edit Employee" : "Add New Employee"}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1")}>Full Name *</label>
                <input className={inputCls} placeholder="e.g. Sarah Jenkins" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1")}>Employee Code</label>
                  <input className={inputCls} placeholder="e.g. NEX-5012" value={code} onChange={(e) => setCode(e.target.value)} />
                </div>
                <div>
                  <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1")}>Department</label>
                  <select className={inputCls} value={dept || (departments[0]?.name || "")} onChange={(e) => setDept(e.target.value)}>
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
              </div>
              <div>
                <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1")}>Location (Branch)</label>
                <select className={inputCls} value={location || (branches[0]?.name || "")} onChange={(e) => setLocation(e.target.value)}>
                  {branches.length === 0 ? (
                    <option value="Global Headquarters">Global Headquarters</option>
                  ) : (
                    branches.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name} {b.subtitle ? `(${b.subtitle})` : ""}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1")}>Email</label>
                  <input className={inputCls} placeholder="sarah.j@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1")}>Phone</label>
                  <input className={inputCls} placeholder="+971 50 123 4567" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <div>
                <label className={cn(typography.label.md, "block text-on-surface-variant uppercase mb-1")}>Position</label>
                <input className={inputCls} placeholder="e.g. Senior Specialist" value={position} onChange={(e) => setPosition(e.target.value)} />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className={cn(typography.button.md, "flex-1 py-2.5 rounded-xl border border-outline-variant/40 text-on-surface-variant")}>
                Cancel
              </button>
              <button onClick={handleSaveEmployee} className={cn(typography.button.md, "flex-1 py-2.5 rounded-xl bg-primary text-white shadow-lg")}>
                {editingEmp ? "Update Employee" : "Save Employee"}
              </button>
            </div>
          </div>
        </div>
      )}

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
            <h2 className={cn(typography.heading.h1, "text-on-background")}>Employees</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-primary animate-pulse"}`}></span>
              <p className={cn(typography.body.md, "text-on-surface-variant")}>
                {employees.length} active team members {isLive ? "(Supabase DB)" : "(Local)"}
              </p>
            </div>
          </div>
          <button
            onClick={openAddModal}
            className={cn(typography.button.md, "flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all")}
          >
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            <span>Add Employee</span>
          </button>
        </div>

        {/* Main Glass Container */}
        <div className="glass-card rounded-xl overflow-hidden flex flex-col border border-white/40">
          {/* Filters Row */}
          <div className="p-6 border-b border-white/20 flex flex-wrap items-center gap-4">
            <div className="relative min-w-[240px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input
                className={cn(typography.body.md, "w-full bg-white/40 border border-white/40 rounded-full py-2 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20")}
                placeholder="Search by name or code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className={cn(typography.button.md, "bg-white/40 px-4 py-2 rounded-full border border-white/40 cursor-pointer outline-none")}
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5">
                  <th className={cn(typography.label.md, "px-6 py-4 text-on-surface-variant uppercase tracking-widest")}>Employee</th>
                  <th className={cn(typography.label.md, "px-6 py-4 text-on-surface-variant uppercase tracking-widest")}>Department</th>
                  <th className={cn(typography.label.md, "px-6 py-4 text-on-surface-variant uppercase tracking-widest")}>Documents</th>
                  <th className={cn(typography.label.md, "px-6 py-4 text-on-surface-variant uppercase tracking-widest")}>Expiry Status</th>
                  <th className={cn(typography.label.md, "px-6 py-4 text-on-surface-variant uppercase tracking-widest text-right")}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                      No employees found.
                    </td>
                  </tr>
                )}
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-white/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-surface-container flex items-center justify-center font-bold text-primary">
                          {emp.avatar_url ? (
                            <img className="w-full h-full object-cover" alt={emp.full_name} src={emp.avatar_url} />
                          ) : (
                            emp.full_name.charAt(0)
                          )}
                        </div>
                        <div>
                          <p className={cn(typography.heading.h3, "text-on-background")}>{emp.full_name}</p>
                          <p className={cn(typography.body.md, "text-on-surface-variant")}>ID: {emp.employee_code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={cn(typography.body.lg, "font-semibold text-on-background")}>{emp.department_name || "General"}</span>
                        <span className={cn(typography.body.md, "text-on-surface-variant")}>{emp.location || "Global Headquarters"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-help" title="Visa">
                          <span className="material-symbols-outlined text-[18px]">airplane_ticket</span>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-help" title="Passport">
                          <span className="material-symbols-outlined text-[18px]">public</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getDocStatusBadge(emp)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(emp)}
                          className="p-2 hover:bg-primary/10 rounded-full text-on-surface-variant hover:text-primary transition-all"
                          title="Edit Employee"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          onClick={() => deleteEmployee(emp.id)}
                          className="p-2 hover:bg-error/10 rounded-full text-on-surface-variant hover:text-error transition-all"
                          title="Delete Employee"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Info */}
          <div className="p-6 border-t border-white/20 flex items-center justify-between">
            <p className={cn(typography.caption.md, "font-semibold text-on-surface-variant")}>
              Showing {filteredEmployees.length} of {employees.length} team members
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
