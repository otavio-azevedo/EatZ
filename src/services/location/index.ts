import { httpClientAuth } from '../@axios';

export async function searchCity(city: string): Promise<SearchCityResponse[]> {
  const response = await httpClientAuth.get(`/location/`, { params: { city } });
  return response.data;
}
