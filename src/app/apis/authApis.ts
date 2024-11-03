import axios from 'axios';
import { User } from '../classes/User';
import { Config } from '../config/app.config';
import { unAuthenticatedApi } from '../config/api';

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp {
  email: string;
  password: string;
  username: string;
}

const signin = async (credentials: ISignIn): Promise<User | undefined> => {
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

const signup = async (credentials: ISignUp): Promise<User | undefined> => {
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

interface IRefreshToken {
  accessToken: string;
}

const refreshToken = async (
  refreshToken: string
): Promise<IRefreshToken | undefined> => {
  try {
    const data = await axios.post(
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

    if (!data.data.accessToken) throw new Error('No access token');

    return data.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export {
  signin as signInApi,
  // signout as signOutApi,
  signup as signUpApi,
  refreshToken as refreshTokenApi,
};
