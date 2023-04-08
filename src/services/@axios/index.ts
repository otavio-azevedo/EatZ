import axios from 'axios';
import { getValue } from '../../storage';
import { StorageKey } from '../../types';

const defaultUrl = 'https://eatz-services.azurewebsites.net/api';

const httpClientAuth = axios.create({
  baseURL: defaultUrl,
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
  baseURL: defaultUrl,
  timeout: 60000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { httpClientAuth, httpClientPublic };
