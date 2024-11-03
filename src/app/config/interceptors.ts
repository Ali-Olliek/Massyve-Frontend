import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import LocalStorageService from '../services/LocalStorageService';
import { refreshTokenApi } from '../apis/authApis';
import { refreshTokenService } from '../services/AuthService';

export function handleSuccess<T>(success: AxiosResponse<T>): AxiosResponse<T> {
  return success;
}

export async function handleError(error: AxiosError) {
  const localStorageService = LocalStorageService.getInstance();

  switch (error.response?.status) {
    case 400:
      break;

    case 401:
      // Try to refresh token before logging out
      console.log('Ordering a new access token');
      const newAccessToken = await refreshTokenService();
      console.log('new access token: ', newAccessToken);
      if (
        newAccessToken?.accessToken !== undefined ||
        newAccessToken?.accessToken !== null
      ) {
        localStorageService.saveUser({
          accessToken: newAccessToken.accessToken,
        });
        return;
      }

      localStorageService.deleteUser();
      window.location.href = '/signin';
      break;

    default:
      console.log('Unhandled Error', error);
      break;
  }
}

export function handleRequest(
  request: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> {
  const localStorageService = LocalStorageService.getInstance();

  const user = localStorageService.getUser();

  request.headers['Authorization'] = `Bearer ${user?.accessToken}`;

  return request;
}
