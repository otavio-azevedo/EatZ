import { StatusOrderEnum } from '../enums';

export interface UpdateOrderStatusRequest {
  orderId: number;
  status: StatusOrderEnum;
}
