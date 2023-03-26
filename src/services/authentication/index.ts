import {
  RegisterRequest,
  AccessTokenResponse,
  LoginRequest,
} from '../../types';
import HttpClientInstance from '../@axios';

export async function register(
  request: RegisterRequest,
): Promise<AccessTokenResponse> {
  const response = await HttpClientInstance.post(`/auth/register`, request);

  return response.data;
}

export async function login(
  request: LoginRequest,
): Promise<AccessTokenResponse> {
  const response = await HttpClientInstance.post(`/auth/login`, request);

  return response.data;
}
