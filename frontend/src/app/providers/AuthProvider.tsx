import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export type Role = 'learner' | 'trainer' | 'admin' | 'superadmin';

interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, mockRole?: Role) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      // Always check localStorage first — supports both mock and real-auth fallback persistence
      const storedUser = localStorage.getItem('magnus_mock_user');

      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          // Real Supabase session found — use it
          const roleMatch = session.user.user_metadata?.role || 'learner';
          const realUser = {
            id: session.user.id,
            email: session.user.email || '',
            role: roleMatch as Role,
            name: session.user.user_metadata?.name || 'User',
          };
          setUser(realUser);
          localStorage.setItem('magnus_mock_user', JSON.stringify(realUser));
        } else if (storedUser) {
          // No Supabase session, but we have a stored mock session — use it
          setUser(JSON.parse(storedUser));
        }
      } else if (storedUser) {
        // No Supabase at all — pure mock mode
        setUser(JSON.parse(storedUser));
      }
      
      setIsLoading(false);
    };

    getSession();

    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          const updatedUser = {
            id: session.user.id,
            email: session.user.email || '',
            role: (session.user.user_metadata?.role || 'learner') as Role,
            name: session.user.user_metadata?.name || 'User',
          };
          setUser(updatedUser);
          localStorage.setItem('magnus_mock_user', JSON.stringify(updatedUser));
        }
        // NOTE: We intentionally do NOT set user=null on SIGNED_OUT here,
        // because we handle logout explicitly. This prevents Supabase's
        // onAuthStateChange from wiping mock sessions.
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  const login = async (email: string, password: string, mockRole: Role = 'learner') => {
    setIsLoading(true);

    const doMockLogin = () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          const mockUser = {
            id: 'mock-user-123',
            email,
            role: mockRole,
            name: mockRole === 'learner' ? 'Ananya Sharma' : mockRole === 'trainer' ? 'Dr. Rahul Verma' : 'Vikram Singh',
          };
          setUser(mockUser);
          localStorage.setItem('magnus_mock_user', JSON.stringify(mockUser));
          setIsLoading(false);
          resolve();
        }, 600);
      });
    };

    if (supabase) {
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          console.warn('Supabase auth failed — using SIH Demo Mock Auth.');
          return doMockLogin();
        }
        // Real login handled by onAuthStateChange above
        setIsLoading(false);
      } catch {
        console.warn('Supabase threw — using SIH Demo Mock Auth.');
        return doMockLogin();
      }
    } else {
      return doMockLogin();
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('magnus_mock_user');
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
