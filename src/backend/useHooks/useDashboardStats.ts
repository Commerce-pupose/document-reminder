"use client";

import { useState, useEffect, useCallback } from 'react';
import { DashboardStats } from '../data-types/models';
import { useEmployees } from './useEmployees';
import { useDocuments } from './useDocuments';

export function useDashboardStats() {
  const { employees, loading: empLoading } = useEmployees();
  const { documents, loading: docLoading } = useDocuments();

  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    expiringDocumentsCount: 0,
    expiredDocumentsCount: 0,
    validDocumentsCount: 0,
    activeRemindersCount: 0,
  });

  const calculateStats = useCallback(() => {
    const totalEmployees = employees.length;
    let expiringDocumentsCount = 0;
    let expiredDocumentsCount = 0;
    let validDocumentsCount = 0;

    documents.forEach((doc) => {
      if (doc.status === 'expiring_soon') expiringDocumentsCount++;
      else if (doc.status === 'expired') expiredDocumentsCount++;
      else if (doc.status === 'valid') validDocumentsCount++;
    });

    setStats({
      totalEmployees,
      expiringDocumentsCount,
      expiredDocumentsCount,
      validDocumentsCount,
      activeRemindersCount: expiringDocumentsCount + expiredDocumentsCount,
    });
  }, [employees, documents]);

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  return {
    stats,
    loading: empLoading || docLoading,
  };
}
