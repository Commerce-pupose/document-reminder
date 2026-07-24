import { getSupabaseClient, isSupabaseConfigured } from '../client';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

const AUTH_STORAGE_KEY = 'hr_portal_auth_user';

export const authService = {
  async signIn(email: string, password: string): Promise<AuthUser> {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      throw new Error('Please enter both your email address and password.');
    }

    if (!cleanEmail.includes('@')) {
      throw new Error('Invalid email format. Please enter a valid email address.');
    }

    // Strict authentication when Supabase is configured
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (error) {
          console.error('Supabase authentication error:', error.message);
          throw new Error(error.message || 'Invalid login credentials. Access denied.');
        }

        if (!data.user) {
          throw new Error('Invalid login credentials. User account not found.');
        }

        const authUser: AuthUser = {
          id: data.user.id,
          email: data.user.email || cleanEmail,
          name: data.user.user_metadata?.full_name || cleanEmail.split('@')[0],
          role: 'HR Admin',
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
        }

        return authUser;
      }
    }

    // Fallback mode when Supabase Auth URL is unconfigured
    throw new Error('Supabase authentication service unavailable. Please check configuration.');
  },

  async signOut(): Promise<void> {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  },

  getCurrentUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as AuthUser;
    } catch {
      return null;
    }
  },
};
