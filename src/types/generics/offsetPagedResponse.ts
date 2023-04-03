export interface OffSetPagedResponse<T> {
  items: T[];
  offset: number;
  limit: number;
  total: number;
}
