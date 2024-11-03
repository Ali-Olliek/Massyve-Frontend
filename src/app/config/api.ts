import axios from 'axios';
import { handleRequest, handleError, handleSuccess } from './interceptors';
import { Config } from './app.config';

const unAuthenticatedApi = axios.create({
  baseURL: Config.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 50000,
  withCredentials: true,
});

const authenticatedApi = axios.create({
  baseURL: Config.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 50000,
  withCredentials: true,
});

authenticatedApi.interceptors.request.use(handleRequest);
authenticatedApi.interceptors.response.use(handleSuccess, handleError);

unAuthenticatedApi.interceptors.response.use(handleSuccess, handleError);
export { unAuthenticatedApi, authenticatedApi };
