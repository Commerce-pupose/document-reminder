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
      throw new Error('Please enter both email address and password.');
    }

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      if (supabase) {
        // Attempt Supabase authentication first
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (!error && data.user) {
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

        // If Supabase Auth returns error, check if email matches authorized employees or system settings
        const { data: empData } = await supabase
          .from('employees')
          .select('id, full_name, email')
          .eq('email', cleanEmail)
          .maybeSingle();

        if (empData) {
          const authUser: AuthUser = {
            id: empData.id,
            email: empData.email || cleanEmail,
            name: empData.full_name,
            role: 'Authorized Employee',
          };
          if (typeof window !== 'undefined') {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
          }
          return authUser;
        }
      }
    }

    // Fallback mode authorization: allow valid email logins
    if (!cleanEmail.includes('@')) {
      throw new Error('Invalid email format. Please enter a valid email address.');
    }
    if (password.length < 4) {
      throw new Error('Password must be at least 4 characters long.');
    }

    const authUser: AuthUser = {
      id: 'local_user_' + Date.now(),
      email: cleanEmail,
      name: cleanEmail.split('@')[0].replace('.', ' '),
      role: 'HR Admin',
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
    }
    return authUser;
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
