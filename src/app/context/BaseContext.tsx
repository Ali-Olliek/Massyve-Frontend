// client/src/contexts/BaseContext.tsx
import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';

interface BaseProviderProps {
  children: ReactNode;
}

export const BaseProvider: React.FC<BaseProviderProps> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
