import ROUTES from './routes';
import { refreshTokenService } from '../services/AuthService';
import LocalStorageService from '../services/LocalStorageService';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {
  FailResponse,
  IFailResponse,
  ValidationErrorResponse,
} from '../classes/Response';

const localStorageService = LocalStorageService.getInstance();

export function handleSuccess<T>(success: AxiosResponse<T>): AxiosResponse<T> {
  return success;
}

export async function handleError(error: AxiosError) {
  switch (error.response?.status) {
    case 400:
      _handle400(error);
      break;

    case 401:
      _handle401();
    default:
      console.log('Unhandled Error', error);
      break;
  }
}

export function handleRequest(
  request: InternalAxiosRequestConfig<unknown>
): InternalAxiosRequestConfig<unknown> {
  const localStorageService = LocalStorageService.getInstance();

  const user = localStorageService.getUser();

  request.headers['Authorization'] = `Bearer ${user?.accessToken}`;

  return request;
}

async function _handle401() {
  // Try to fetch a new access token
  const newAccessToken = await refreshTokenService();

  if (newAccessToken) {
    return localStorageService.saveUser({ accessToken: newAccessToken });
  }

  localStorageService.deleteUser();
  window.location.href = ROUTES['sign-in'];
  return;
}

async function _handle400(error: AxiosError) {
  const data = error.response?.data;

  if (_isValidationError(data)) {
    // Dispatch a toast with `msg` value
    const validationErrors = data.map(
      (error) => new ValidationErrorResponse(error)
    );

    console.log(validationErrors);
  }
  if (_isFailResponse(data)) {
    // Dispatch a toast with `message` value
    const failResponse = new FailResponse(data);

    console.log(failResponse);
  }
}

function _isValidationError(
  error: unknown
): error is ValidationErrorResponse[] {
  return (
    Array.isArray(error) &&
    error.length > 0 &&
    'location' in error[0] &&
    'msg' in error[0]
  );
}

function _isFailResponse(error: unknown): error is IFailResponse {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  const failResponse = error as Partial<IFailResponse>;

  return (
    typeof failResponse.message === 'string' &&
    (failResponse.exception === undefined ||
      typeof failResponse.exception === 'string')
  );
}
