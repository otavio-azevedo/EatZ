export interface GetOrdersFromCurrentUserResponse {
  id: number;
  storeName: string;
  status: StatusOrderEnum;
  creationDate: string;
  netUnitPrice: number;
  quantity: number;
  total: number;
  reviewRate: number;
}

export enum StatusOrderEnum {
  Reserved = 'Reservado',
  PickUp = 'Retirado',
  Canceled = 'Cancelado',
}
