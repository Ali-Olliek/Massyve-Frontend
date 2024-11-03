import LocalStorageService, { AuthenticatedUser } from './LocalStorageService';
import {
  refreshTokenApi,
  signInApi,
  signOutApi,
  signUpApi,
} from '../apis/authApis';
import { ISignIn, ISignUp } from '../apis/authApis';

// Initialize LocalStorage Service Outside
const localStorageService = LocalStorageService.getInstance();

const signin = async (
  credentials: ISignIn
): Promise<AuthenticatedUser | null> => {
  try {
    const userData = await signInApi(credentials);

    if (!userData) return null;

    localStorageService.saveUser(userData);

    return userData;
  } catch (error) {
    throw error;
  }
};

const signup = async (
  credentials: ISignUp
): Promise<AuthenticatedUser | null> => {
  try {
    const userData = await signUpApi(credentials);

    if (!userData) return null;

    localStorageService.saveUser(userData);

    return userData;
  } catch (error) {
    throw error;
  }
};

const signout = async () => {
  try {
    await signOutApi();

    localStorageService.deleteUser();
  } catch (error) {
    throw error;
  }
};

const refreshToken = async () => {
  try {
    const user = localStorageService.getUser();

    const newAccessToken = await refreshTokenApi();

    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

export {
  signin as signInService,
  signup as signUpService,
  signout as signOutService,
  refreshToken as refreshTokenService,
};
