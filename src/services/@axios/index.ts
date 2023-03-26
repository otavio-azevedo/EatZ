import axios from 'axios';
import { getValue } from '../../storage';
import { StorageKey } from '../../types';

const httpClientAuth = axios.create({
  baseURL: 'https://fea9-179-177-212-91.sa.ngrok.io/api',
  timeout: 60000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClientAuth.interceptors.request.use(
  async (config) => {
    const accessToken = await getValue(StorageKey.AccessToken);
    if (!config.headers.Authorization && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const httpClientPublic = axios.create({
  baseURL: 'https://fea9-179-177-212-91.sa.ngrok.io/api',
  timeout: 60000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { httpClientAuth, httpClientPublic };
