import { CreateOrderRequest } from '../../types/orders/requests/createOrderRequest';
import { httpClientAuth } from '../@axios';

export async function createOrder(
  request: CreateOrderRequest,
): Promise<string> {
  const response = await httpClientAuth.post(`/orders/`, request);
  return response.data;
}
