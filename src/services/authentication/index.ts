import {
  RegisterRequest,
  AccessTokenResponse,
  LoginRequest,
} from '../../types';
import { httpClientAuth, httpClientPublic } from '../@axios';

export async function register(
  request: RegisterRequest,
): Promise<AccessTokenResponse> {
  const response = await httpClientPublic.post(`/auth/register`, request);

  return response.data;
}

export async function login(
  request: LoginRequest,
): Promise<AccessTokenResponse> {
  const response = await httpClientPublic.post(`/auth/login`, request);

  return response.data;
}

export async function refresh(): Promise<AccessTokenResponse> {
  const response = await httpClientAuth.post(`/auth/refresh`);

  return response.data;
}
