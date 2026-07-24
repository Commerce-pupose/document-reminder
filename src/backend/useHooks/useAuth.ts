"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authService, AuthUser } from '../supabase/services/authService';

export function useAuth(requireAuth = true) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = useCallback(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);

    if (requireAuth && !currentUser && pathname && !pathname.includes('/login')) {
      router.push('/login');
    }
  }, [requireAuth, pathname, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, pass: string) => {
    setError(null);
    setLoading(true);
    try {
      const loggedUser = await authService.signIn(email, pass);
      setUser(loggedUser);
      router.push('/');
      return loggedUser;
    } catch (err: any) {
      const msg = err?.message || 'Authentication failed. Please check credentials.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.signOut();
      setUser(null);
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };
}
