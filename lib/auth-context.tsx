"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { User, UserRole, Category } from "./types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => Promise<void>;
  completeOnboarding: (role: UserRole, interests: Category[]) => Promise<void>;
  updateInterests: (interests: Category[]) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Mock data for development
const mockUsers: User[] = [
  {
    id: "1",
    email: "ong@example.com",
    role: "beneficiary",
    name: "Fundación Esperanza",
    onboardingCompleted: true,
    interests: ["Educación", "Salud"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    email: "donor@example.com",
    role: "donor",
    name: "María González",
    onboardingCompleted: true,
    interests: ["Educación", "Medio Ambiente", "Animales"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    email: "admin@example.com",
    role: "admin",
    name: "Admin User",
    onboardingCompleted: true,
    interests: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("crowdheart_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock login - in real app, this would be an API call
      const foundUser = mockUsers.find((u) => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("crowdheart_user", JSON.stringify(foundUser));
      } else {
        throw new Error("Usuario no encontrado");
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => {
    setLoading(true);
    try {
      // Mock registration - in real app, this would be an API call
      const newUser: User = {
        id: Date.now().toString(),
        email,
        role,
        name,
        onboardingCompleted: false,
        interests: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setUser(newUser);
      localStorage.setItem("crowdheart_user", JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const completeOnboarding = async (role: UserRole, interests: Category[]) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      role,
      interests,
      onboardingCompleted: true,
      updatedAt: new Date(),
    };

    setUser(updatedUser);
    localStorage.setItem("crowdheart_user", JSON.stringify(updatedUser));
  };

  const updateInterests = async (interests: Category[]) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      interests,
      updatedAt: new Date(),
    };

    setUser(updatedUser);
    localStorage.setItem("crowdheart_user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("crowdheart_user");
  };

  const value = {
    user,
    login,
    register,
    completeOnboarding,
    updateInterests,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
