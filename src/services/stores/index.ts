import { httpClientAuth } from '../@axios';

export async function searchStoresByCity(
  cityId: number,
): Promise<SearchStoresByCityResponse[]> {
  const response = await httpClientAuth.get(`/store/city`, {
    params: { cityId },
  });
  return response.data;
}

export async function createStore(
  request: CreateStoreRequest,
): Promise<string> {
  const response = await httpClientAuth.post(`/store/`, request);
  return response.data;
}

export async function getStoreByCurrentUser(): Promise<GetStoreByAdminIdResponse> {
  const response = await httpClientAuth.get(`/store/`);
  return response.data;
}
