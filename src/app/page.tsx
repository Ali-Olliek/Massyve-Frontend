'use client';
import './page.css';
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
      <div className='container'>
        <h1>Hello, {user?.username}</h1>
        <p>Your Access Token is:</p>
        <div className='token-box'>{user?.accessToken}</div>
        <button onClick={handleRefreshToken}>Request a new access token</button>
        <button className='logout' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </AuthGuard>
  );
}
