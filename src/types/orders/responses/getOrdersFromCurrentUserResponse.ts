import { StatusOrderEnum } from '../enums';

export interface GetOrdersFromCurrentUserResponse {
  id: number;
  storeName: string;
  status: StatusOrderEnum;
  creationDate: string;
  pickUpDate: string;
  netUnitPrice: number;
  quantity: number;
  total: number;
  reviewRate: number;
}
