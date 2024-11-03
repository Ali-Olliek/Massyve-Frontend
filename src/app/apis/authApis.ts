import axios from 'axios';
import { Config } from '../config/app.config';
import { AuthenticatedUser } from '../services/LocalStorageService';
import { authenticatedApi, unAuthenticatedApi } from '../config/api';

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp {
  email: string;
  password: string;
  username: string;
}

const signin = async (
  credentials: ISignIn
): Promise<AuthenticatedUser | undefined> => {
  try {
    const { data } = await unAuthenticatedApi.post(
      '/auth/sign-in',
      credentials
    );
    console.log('API', data.data);
    return data?.data;
  } catch (error) {
    console.error(error);
  }
};

const signup = async (
  credentials: ISignUp
): Promise<AuthenticatedUser | undefined> => {
  try {
    const { data } = await unAuthenticatedApi.post(
      '/auth/sign-up',
      credentials
    );

    return data?.data;
  } catch (error) {
    console.error(error);
  }
};

// const signout = async (): Promise<any> => {
//   try {
//     const { data } = await authenticatedApi.post('/auth/sign-out');

//     return data;
//   } catch (error) {}
// };

const refreshToken = async (refreshToken: string): Promise<any> => {
  try {
    const { data } = await axios.post(
      `${Config.baseUrl}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        },
        timeout: 50000,
        withCredentials: true,
      }
    );

    return data?.data;
  } catch (error) {
    console.error(error);
  }
};

export {
  signin as signInApi,
  // signout as signOutApi,
  signup as signUpApi,
  refreshToken as refreshTokenApi,
};
