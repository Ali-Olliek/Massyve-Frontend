'use client';
import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { AuthGuard } from './components/AuthGuard';
import { refreshTokenService, signOutService } from './services/AuthService';
import { useRouter } from 'next/navigation';
import ROUTES from './config/routes';

export default function Home() {
  const userContext = useContext(AuthContext);
  if (!userContext) {
    throw new Error('User context is not defined');
  }

  const { user } = userContext;

  const navigate = useRouter();

  const handleRefreshToken = async () => {
    await refreshTokenService();
  };

  const handleLogout = async () => {
    await signOutService();

    navigate.push(ROUTES['sign-in']);
  };

  return (
    <AuthGuard>
      <main>
        <h1>Hello, {user?.username}</h1>
        <h3>Your Access Token is: {user?.accessToken}</h3>
        <button onClick={handleRefreshToken}>Request a new access token</button>
        <br />
        <button onClick={handleLogout}>Logout</button>
      </main>
    </AuthGuard>
  );
}
