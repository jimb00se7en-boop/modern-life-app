import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { SecureStorage } from '../utils/SecureStorage';
import { PerformanceMonitor } from '../utils/PerformanceMonitor';

// ═══════════════════════════════════════════════════════════
// AUTH CONTEXT - Secure Authentication & Navigation
// ═══════════════════════════════════════════════════════════

interface User {
  id: string;
  email: string;
  name: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  onboardingComplete: boolean;
  createdAt: string;
  lastLogin: string;
  preferences?: {
    theme?: 'light' | 'dark';
    notifications?: boolean;
    chakraIntensity?: 'subtle' | 'bold';
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ═══════════════════════════════════════════════════════════
// AUTH PROVIDER COMPONENT
// ═══════════════════════════════════════════════════════════

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from secure storage
  useEffect(() => {
    const initAuth = async () => {
      const perfMonitor = PerformanceMonitor.start('auth-init');
      
      try {
        const storedUser = SecureStorage.getItem<User>('ml_user');
        const sessionToken = SecureStorage.getItem<string>('ml_session_token');
        
        if (storedUser && sessionToken) {
          // Validate session is still valid (not expired)
          const sessionExpiry = SecureStorage.getItem<number>('ml_session_expiry');
          if (sessionExpiry && Date.now() < sessionExpiry) {
            setUser(storedUser);
          } else {
            // Session expired - clear storage
            await handleLogout();
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        await handleLogout();
      } finally {
        setIsLoading(false);
        perfMonitor.end();
      }
    };

    initAuth();
  }, []);

  // ═══════════════════════════════════════════════════════════
  // LOGIN
  // ═══════════════════════════════════════════════════════════
  
  const login = async (email: string, password: string): Promise<void> => {
    const perfMonitor = PerformanceMonitor.start('login');
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();

      // MOCK: Simulate API response
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        tier: 'Bronze',
        onboardingComplete: false,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      // Store user and session
      SecureStorage.setItem('ml_user', mockUser);
      SecureStorage.setItem('ml_session_token', `token_${Date.now()}`);
      SecureStorage.setItem('ml_session_expiry', Date.now() + (7 * 24 * 60 * 60 * 1000)); // 7 days

      setUser(mockUser);
      
      // Track login event
      PerformanceMonitor.trackEvent('user_login', { userId: mockUser.id });
      
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
      perfMonitor.end();
    }
  };

  // ═══════════════════════════════════════════════════════════
  // SIGNUP
  // ═══════════════════════════════════════════════════════════
  
  const signup = async (email: string, password: string, name: string): Promise<void> => {
    const perfMonitor = PerformanceMonitor.start('signup');
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, name })
      // });

      // MOCK: Simulate API response
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        tier: 'Bronze',
        onboardingComplete: false,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      // Store user and session
      SecureStorage.setItem('ml_user', newUser);
      SecureStorage.setItem('ml_session_token', `token_${Date.now()}`);
      SecureStorage.setItem('ml_session_expiry', Date.now() + (7 * 24 * 60 * 60 * 1000));

      setUser(newUser);
      
      // Track signup event
      PerformanceMonitor.trackEvent('user_signup', { userId: newUser.id });
      
    } catch (error) {
      console.error('Signup failed:', error);
      throw new Error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
      perfMonitor.end();
    }
  };

  // ═══════════════════════════════════════════════════════════
  // LOGOUT
  // ═══════════════════════════════════════════════════════════
  
  const handleLogout = async () => {
    SecureStorage.removeItem('ml_user');
    SecureStorage.removeItem('ml_session_token');
    SecureStorage.removeItem('ml_session_expiry');
    setUser(null);
  };

  const logout = async (): Promise<void> => {
    const perfMonitor = PerformanceMonitor.start('logout');
    setIsLoading(true);

    try {
      // TODO: API call to invalidate session
      // await fetch('/api/auth/logout', { method: 'POST' });
      
      await handleLogout();
      
      PerformanceMonitor.trackEvent('user_logout', { userId: user?.id });
      
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
      perfMonitor.end();
    }
  };

  // ═══════════════════════════════════════════════════════════
  // UPDATE USER
  // ═══════════════════════════════════════════════════════════
  
  const updateUser = async (updates: Partial<User>): Promise<void> => {
    if (!user) return;

    const perfMonitor = PerformanceMonitor.start('update-user');
    
    try {
      // TODO: API call to update user
      // await fetch('/api/user/update', {
      //   method: 'PATCH',
      //   body: JSON.stringify(updates)
      // });

      const updatedUser = { ...user, ...updates };
      SecureStorage.setItem('ml_user', updatedUser);
      setUser(updatedUser);
      
      PerformanceMonitor.trackEvent('user_updated', { 
        userId: user.id,
        fields: Object.keys(updates)
      });
      
    } catch (error) {
      console.error('User update failed:', error);
      throw new Error('Failed to update user profile.');
    } finally {
      perfMonitor.end();
    }
  };

  // ═══════════════════════════════════════════════════════════
  // REFRESH SESSION
  // ═══════════════════════════════════════════════════════════
  
  const refreshSession = async (): Promise<void> => {
    if (!user) return;

    try {
      // TODO: API call to refresh token
      // const response = await fetch('/api/auth/refresh');
      // const { token, expiry } = await response.json();

      // Update session expiry
      SecureStorage.setItem('ml_session_expiry', Date.now() + (7 * 24 * 60 * 60 * 1000));
      
    } catch (error) {
      console.error('Session refresh failed:', error);
      await handleLogout();
    }
  };

  // Auto-refresh session before expiry
  useEffect(() => {
    if (!user) return;

    const checkSession = () => {
      const expiry = SecureStorage.getItem<number>('ml_session_expiry');
      if (expiry) {
        const timeUntilExpiry = expiry - Date.now();
        // Refresh if less than 1 day remaining
        if (timeUntilExpiry < 24 * 60 * 60 * 1000) {
          refreshSession();
        }
      }
    };

    // Check every hour
    const interval = setInterval(checkSession, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup,
    updateUser,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ═══════════════════════════════════════════════════════════
// CUSTOM HOOK
// ═══════════════════════════════════════════════════════════

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// ═══════════════════════════════════════════════════════════
// ROUTE GUARD COMPONENT
// ═══════════════════════════════════════════════════════════

interface ProtectedRouteProps {
  children: ReactNode;
  requireOnboarding?: boolean;
  minTier?: User['tier'];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireOnboarding = false,
  minTier 
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (requireOnboarding && !user?.onboardingComplete) {
        navigate('/onboarding');
      } else if (minTier && !checkTierAccess(user?.tier, minTier)) {
        navigate('/upgrade');
      }
    }
  }, [isAuthenticated, isLoading, user, navigate, requireOnboarding, minTier]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

// ═══════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════

const tierOrder = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'];

function checkTierAccess(userTier: string | undefined, requiredTier: string): boolean {
  if (!userTier) return false;
  return tierOrder.indexOf(userTier) >= tierOrder.indexOf(requiredTier);
}
