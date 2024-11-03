import LocalStorageService, { AuthenticatedUser } from './LocalStorageService';
import {
  refreshTokenApi,
  signInApi,
  // signOutApi,
  signUpApi,
} from '../apis/AuthApis';
import { ISignIn, ISignUp } from '../apis/AuthApis';
import { setUserExternally } from '../context/AuthContext';

// Initialize LocalStorage Service Outside
const localStorageService = LocalStorageService.getInstance();

const signin = async (
  credentials: ISignIn
): Promise<AuthenticatedUser | null> => {
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

    const { accessToken } = await refreshTokenApi(user?.refreshToken);

    localStorageService.saveUser({ ...user, accessToken: accessToken });

    setUserExternally({ ...user, accessToken: accessToken });

    return accessToken;
  } catch (error) {
    throw error;
  }
};

function _removeUser() {
  setUserExternally(null), localStorageService.deleteUser();
}

export {
  signin as signInService,
  signup as signUpService,
  signout as signOutService,
  refreshToken as refreshTokenService,
};

export default {
  signin,
  signup,
  signout,
  refreshToken,
};

