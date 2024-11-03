// client/src/contexts/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../classes/User';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

// Initialize the UserContext with an undefined default value for typing
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props type for the provider
interface AuthProviderProps {
  children: ReactNode;
}

// UserProvider component that provides user and accessToken states and setters
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{ user, setUser, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
