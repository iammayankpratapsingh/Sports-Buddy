import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, User } from '../types';
import { USERS } from '../data/mockData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  
  // Check for saved auth on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('sportsBuddyUser');
    if (savedUser) {
      setAuthState({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching email
      const user = USERS.find(u => u.email === email);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // In a real app, we would validate the password here
      
      // Save to localStorage
      localStorage.setItem('sportsBuddyUser', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user with this email already exists
      if (USERS.some(u => u.email === email)) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user (this is mock data - in a real app we would save to a database)
      const newUser: User = {
        id: `${USERS.length + 1}`,
        name,
        email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        location: '',
        bio: '',
        skills: [],
        events: [],
      };
      
      // Save to localStorage
      localStorage.setItem('sportsBuddyUser', JSON.stringify(newUser));
      
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('sportsBuddyUser');
    setAuthState(initialState);
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!authState.user) {
        throw new Error('Not authenticated');
      }
      
      const updatedUser = { ...authState.user, ...userData };
      
      // Save to localStorage
      localStorage.setItem('sportsBuddyUser', JSON.stringify(updatedUser));
      
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
      }));
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  };

  const value = {
    ...authState,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};