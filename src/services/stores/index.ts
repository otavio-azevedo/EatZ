import { httpClientAuth } from '../@axios';

export async function searchStoresByCity(
  cityId: number,
): Promise<SearchStoresByCityResponse[]> {
  const response = await httpClientAuth.get(`/store/`, { params: { cityId } });
  return response.data;
}
