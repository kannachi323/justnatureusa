import { createContext } from 'react';

interface AuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  user: { id: string; username: string } | null;
  setUser: ( user: { id: string; username: string } | null) => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);