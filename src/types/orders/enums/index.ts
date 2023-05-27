export enum StatusOrderEnum {
  Reserved = 'Reserved',
  PickedUp = 'PickedUp',
  Canceled = 'Canceled',
}

export const formatStatusOrderEnum = (status: StatusOrderEnum) => {
  switch (status) {
    case StatusOrderEnum.Reserved:
      return 'Reservado';
    case StatusOrderEnum.PickedUp:
      return 'Retirado';
    case StatusOrderEnum.Canceled:
      return 'Cancelado';
    default:
      return '';
  }
};
