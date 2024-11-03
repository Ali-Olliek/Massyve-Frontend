'use client';
import './page.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInService } from '../../services/AuthService';
import ROUTES from '../../config/routes';

export default function SignIn() {
  const navigate = useRouter();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await signInService(credentials);

    // Handle Sign In Failure
    if (!user) return navigate.push(ROUTES['sign-in']);

    navigate.push(ROUTES['main']);
  };

  return (
    <div className='sign-in-page'>
      <div className='sign-in'>
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className='inputs'>
            <label>
              Email
              <input
                type='email'
                name='email'
                placeholder='Insert your email'
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </label>
            <label>
              Password
              <input
                type='password'
                name='password'
                placeholder='Insert your password'
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </label>
          </div>
          <button type='submit'>Sign In</button>
        </form>
        <p>
          New user?{' '}
          <a onClick={() => navigate.push(ROUTES['sign-up'])}>Create Account</a>
        </p>
      </div>
    </div>
  );
}
