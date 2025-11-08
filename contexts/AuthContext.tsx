'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants/routes';
import {
  ExtendedMakerProfile,
  mockIndividualSeller,
  mockArtisan,
  mockCompany,
} from '@/lib/data/mockUsers';

// User type with extended maker profile
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
  makerProfile?: ExtendedMakerProfile;
}

// Mock users database (basic users + seller users)
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@ejemplo.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
    phone: '+52 555 123 4567',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'María González',
    email: 'maria@ejemplo.com',
    avatar: 'https://i.pravatar.cc/150?img=45',
    phone: '+52 555 987 6543',
    createdAt: '2024-02-20T14:20:00Z',
  },
  // Add seller users
  mockIndividualSeller,
  mockArtisan,
  mockCompany,
];

// Mock passwords (in real app, these would be hashed on backend)
const MOCK_PASSWORDS: Record<string, string> = {
  'juan@ejemplo.com': 'Password123',
  'maria@ejemplo.com': 'Password123',
  'sofia@ejemplo.com': 'Password123',
  'pedro@ejemplo.com': 'Password123',
  'ventas@artesaniasdemexico.com': 'Password123',
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Mock login
  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check credentials
    const mockUser = MOCK_USERS.find((u) => u.email === email);
    if (!mockUser) {
      throw new Error('Usuario no encontrado');
    }

    if (MOCK_PASSWORDS[email] !== password) {
      throw new Error('Contraseña incorrecta');
    }

    // Store user
    setUser(mockUser);
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
  };

  // Mock register
  const register = async (name: string, email: string, password: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user exists
    if (MOCK_USERS.find((u) => u.email === email)) {
      throw new Error('El correo electrónico ya está registrado');
    }

    // Create new user
    const newUser: User = {
      id: String(MOCK_USERS.length + 1),
      name,
      email,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      createdAt: new Date().toISOString(),
    };

    // Add to mock database
    MOCK_USERS.push(newUser);
    MOCK_PASSWORDS[email] = password;

    // Store user
    setUser(newUser);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    router.push(ROUTES.HOME);
  };

  // Update profile
  const updateProfile = async (data: Partial<User>): Promise<void> => {
    if (!user) throw new Error('No user logged in');

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
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
