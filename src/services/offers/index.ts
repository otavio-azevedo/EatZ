import { httpClientAuth } from '../@axios';

export async function searchOffersByCity(
  cityId: number,
): Promise<SearchOffersByCityResponse[]> {
  const response = await httpClientAuth.get(`/offers/city`, {
    params: { cityId },
  });
  return response.data;
}

export async function searchOffersByStore(
  storeId: string,
): Promise<SearchOffersByStoreResponse[]> {
  const response = await httpClientAuth.get(`/offers/store`, {
    params: { storeId },
  });
  return response.data;
}

export async function createOffer(
  request: CreateOfferRequest,
): Promise<string> {
  const response = await httpClientAuth.post(`/offers`, request);
  return response.data;
}

export async function deleteOfferById(offerId: string): Promise<void> {
  await httpClientAuth.delete(`/offers/${offerId}`);
}
