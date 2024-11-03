// client/src/contexts/UserContext.tsx
'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { User } from '../classes/User';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Initialize the UserContext with an undefined default value for typing
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Define props type for the provider
interface AuthProviderProps {
  children: ReactNode;
}

// External setter placeholders
let externalSetUser: (user: User | null) => void;

// AuthProvider component that provides user and accessToken states and setters
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'user') {
        setUser(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Set the external functions to the state setters
  externalSetUser = setUser;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the setter functions for external use
export const setUserExternally = (user: User | null) => {
  if (externalSetUser) externalSetUser(user);
};

// Custom hook for using AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
