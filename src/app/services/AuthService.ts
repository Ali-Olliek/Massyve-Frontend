import { User } from '../classes/User';
import { ISignIn, ISignUp } from '../apis/authApis';
import LocalStorageService from './LocalStorageService';
import { setUserExternally } from '../context/AuthContext';
import {
  refreshTokenApi,
  signInApi,
  // signOutApi,
  signUpApi,
} from '../apis/authApis';

// Initialize LocalStorage Service Outside
const localStorageService = LocalStorageService.getInstance();

const signin = async (credentials: ISignIn): Promise<User | null> => {
  try {
    const userData = await signInApi(credentials);

    if (!userData) return null;

    setUserExternally(userData);
    localStorageService.saveUser(userData);

    return userData;
  } catch (error) {
    throw error;
  }
};

const signup = async (credentials: ISignUp): Promise<User | null> => {
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
    // await signOutApi();
    //TODO Add SignOut functionality on server side
    _removeUser();
  } catch (error) {
    throw error;
  }
};

const refreshToken = async (): Promise<string> => {
  try {
    const user = localStorageService.getUser();

    if (!user?.refreshToken) {
      _removeUser();
      throw new Error('User Logged Out');
    }

    const data = await refreshTokenApi(user?.refreshToken);

    if (!data?.accessToken) throw new Error('No Access Token');

    localStorageService.saveUser({ ...user, accessToken: data.accessToken });

    setUserExternally({ ...user, accessToken: data.accessToken });

    return data.accessToken;
  } catch (error) {
    throw error;
  }
};

function _removeUser() {
  setUserExternally(null);
  localStorageService.deleteUser();
}

export {
  signin as signInService,
  signup as signUpService,
  signout as signOutService,
  refreshToken as refreshTokenService,
};

const services = {
  signin,
  signup,
  refreshToken,
  signout,
};

export default services;
