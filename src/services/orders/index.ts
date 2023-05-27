import { CreateOrderRequest } from '../../types/orders/requests/createOrderRequest';
import { UpdateOrderStatusRequest } from '../../types/orders/requests/updateOrderStatusRequest';
import { GetOrdersFromCurrentUserResponse } from '../../types/orders/responses/getOrdersFromCurrentUserResponse';
import { httpClientAuth } from '../@axios';

export async function createOrder(
  request: CreateOrderRequest,
): Promise<string> {
  const response = await httpClientAuth.post(`/orders/`, request);
  return response.data;
}

export async function getOrdersFromCurrentUser(): Promise<
  GetOrdersFromCurrentUserResponse[]
> {
  const response = await httpClientAuth.get(`/orders/`);
  return response.data;
}

export async function updateOrderStatus(
  request: UpdateOrderStatusRequest,
): Promise<string> {
  console.log(request);
  const response = await httpClientAuth.put(`/orders/`, request);
  return response.data;
}
