import { httpClientAuth } from '../@axios';

export async function searchCity(city: string): Promise<SearchCityResponse[]> {
  const response = await httpClientAuth.get(`/location/`, { params: { city } });
  return response.data;
}

export async function getStatesByCountry(): Promise<Map<number, string>[]> {
  const response = await httpClientAuth.get(`/location/states`, {
    params: { countryId: 1 },
  });
  return response.data;
}

export async function getCitiesByState(
  stateId: number,
): Promise<Map<number, string>[]> {
  const response = await httpClientAuth.get(`/location/cities`, {
    params: { stateId },
  });
  return response.data;
}
