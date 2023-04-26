import { httpClientAuth } from '../@axios';

export async function searchOffersByCity(
  cityId: number,
): Promise<SearchOffersByCityResponse[]> {
  const response = await httpClientAuth.get(`/offers/city`, {
    params: { cityId },
  });
  return response.data;
}
