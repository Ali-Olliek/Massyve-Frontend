'use client';
import './page.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ROUTES from '@/app/config/routes';
import { signUpService } from '../../services/AuthService';

function SignUp() {
  const navigate = useRouter();

  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await signUpService(credentials);

    if (!user) return setCredentials({ username: '', email: '', password: '' });

    navigate.push(ROUTES['sign-in']);
  };

  //TODO Add form validation
  return (
    <div className='sign-up-page'>
      <div className='sign-up'>
        <form onSubmit={handleSignUp}>
          <div className='inputs'>
            <label>
              Username
              <input
                autoComplete='username'
                type='text'
                name='username'
                placeholder='Insert a username'
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
            </label>
            <label>
              Email
              <input
                type='email'
                name='email'
                placeholder='Insert an email'
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
                placeholder='Insert a password'
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <button type='submit'>Sign Up</button>
          </div>
        </form>
        <p>
          Alread have an account?{' '}
          <a onClick={() => navigate.push(ROUTES['sign-in'])}>Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
