'use client';
import './page.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInService } from '../../services/AuthService';
import ROUTES from '../../config/routes';

function SignIn() {
  const navigate = useRouter();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await signInService(credentials);

    //# Handle Sign In Failure
    if (!user) return navigate.push(ROUTES['sign-in']);

    navigate.push(ROUTES['main']);
  };

  return (
    <div className='sign-in-page'>
      <div className='sign-in'>
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
              ></input>
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
              ></input>
            </label>
          </div>
          <div>
            <button type='submit'>Sign In</button>
          </div>
        </form>
        <p>
          New user? Create Account{' '}
          <a onClick={() => navigate.push(ROUTES['sign-up'])}>Here</a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
