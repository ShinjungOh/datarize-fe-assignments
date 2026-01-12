export type CustomersParams = {
  sortBy?: 'asc' | 'desc';
  name?: string;
  page?: number;
  limit?: number;
  from?: string;
  to?: string;
};

export type Customer = {
  id: number;
  name: string;
  count: number;
  totalAmount: number;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type CustomerList = {
  data: Customer[];
  pagination: Pagination;
};

export type CustomerPurchase = {
  date: string;
  quantity: number;
  product: string;
  price: number;
  imgSrc: string;
};
