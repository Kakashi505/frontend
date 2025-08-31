'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'user' | 'creator' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: UserRole;
  isVerified: boolean;
  subscribedTo: string[];
  followers: number;
  following: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    role: 'user',
    isVerified: true,
    subscribedTo: ['creator1', 'creator2'],
    followers: 1250,
    following: 45,
  });

  const login = async (email: string, password: string) => {
    // Mock login logic
    setUser({
      id: '1',
      username: 'john_doe',
      email,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      role: 'user',
      isVerified: true,
      subscribedTo: ['creator1', 'creator2'],
      followers: 1250,
      following: 45,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (userData: Partial<User>) => {
    // Mock registration logic
    setUser({
      id: Math.random().toString(36),
      username: userData.username || 'new_user',
      email: userData.email || '',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      role: userData.role || 'user',
      isVerified: false,
      subscribedTo: [],
      followers: 0,
      following: 0,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}