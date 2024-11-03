import { SuccessResponse } from '../classes/Response';
import { authenticatedApi, unAuthenticatedApi } from '../config/api';
import { AuthenticatedUser } from '../services/LocalStorageService';

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
    const { data } = await authenticatedApi.post('/auth/sign-in', credentials);

    return data?.data;
  } catch (error) {}
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
  } catch (error) {}
};

const signout = async (): Promise<any> => {
  try {
    const { data } = await authenticatedApi.post('/auth/sign-out');

    return data;
  } catch (error) {}
};

const refreshToken = async (): Promise<any> => {
  try {
    const { data } = await authenticatedApi.post('/auth/refresh');

    return data;
  } catch (error) {}
};

export {
  signin as signInApi,
  signout as signOutApi,
  signup as signUpApi,
  refreshToken as refreshTokenApi,
};
