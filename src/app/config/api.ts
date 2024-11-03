import axios from 'axios';
import { handleRequest, handleError, handleSuccess } from './interceptors';

const unAuthenticatedApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 50000,
  withCredentials: true,
});

const authenticatedApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    Content: 'application/json',
  },
  timeout: 50000,
});

authenticatedApi.interceptors.request.use(handleRequest);
authenticatedApi.interceptors.response.use(handleSuccess, handleError);

unAuthenticatedApi.interceptors.response.use(handleSuccess, handleError);
export { unAuthenticatedApi, authenticatedApi };
