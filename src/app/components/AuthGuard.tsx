// components/AuthGuard.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthService from '../services/AuthService';
import ROUTES from '../config/routes';
import LocalStorageService from '../services/LocalStorageService';

interface AuthGuardProps {
  children: React.ReactNode;
}
const localStorageService = LocalStorageService.getInstance();

//TODO Add Styles
export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = localStorageService.getUser();

        if (!user) {
          router.push(ROUTES['sign-in']);
          return;
        }

        if (!user.accessToken && user.refreshToken) {
          try {
            await AuthService.refreshToken();
            setIsAuthenticated(true);
          } catch (error) {
            localStorageService.deleteUser();
            router.push(ROUTES['sign-in']);
          }
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push(ROUTES['sign-in']);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading state while checking auth
  if (!isAuthenticated) {
    return <div>Loading...</div>; // Or your loading component
  }

  return <>{children}</>;
}
