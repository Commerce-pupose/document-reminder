"use client";

import { useState, useEffect, useCallback } from 'react';
import { Employee } from '../data-types/models';
import { employeesService } from '../supabase/services/employeesService';
import { isSupabaseConfigured } from '../supabase/client';

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (isSupabaseConfigured()) {
        const data = await employeesService.getEmployees();
        setEmployees(data || []);
        setIsLive(true);
      } else {
        setIsLive(false);
        setEmployees([]);
      }
    } catch (err: any) {
      console.error('Supabase employees fetch error:', err);
      setError(err?.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const addEmployee = async (newEmp: Omit<Employee, 'id'>) => {
    if (!isSupabaseConfigured()) {
      const mockEmp: Employee = {
        id: `emp-local-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        ...newEmp,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setEmployees((prev) => [mockEmp, ...prev]);
      return mockEmp;
    }
    try {
      const created = await employeesService.createEmployee(newEmp);
      if (created) {
        setEmployees((prev) => [created, ...prev]);
        return created;
      }
    } catch (err) {
      console.error('Failed to create employee on Supabase, fallback to local:', err);
      const fallbackEmp: Employee = {
        id: `emp-local-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        ...newEmp,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setEmployees((prev) => [fallbackEmp, ...prev]);
      return fallbackEmp;
    }
    return null;
  };

  const updateEmployee = async (id: string, updates: Partial<Employee>) => {
    if (isSupabaseConfigured()) {
      try {
        await employeesService.updateEmployee(id, updates);
      } catch (err) {
        console.error('Failed to update employee on Supabase:', err);
      }
    }
    setEmployees((prev) => prev.map((e) => (String(e.id) === String(id) ? { ...e, ...updates } : e)));
  };

  const deleteEmployee = async (id: string) => {
    if (isSupabaseConfigured()) {
      try {
        await employeesService.deleteEmployee(id);
      } catch (err) {
        console.error('Failed to delete employee on Supabase:', err);
      }
    }
    setEmployees((prev) => prev.filter((e) => String(e.id) !== String(id)));
  };

  return {
    employees,
    loading,
    error,
    isLive,
    refresh: fetchEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };
}
