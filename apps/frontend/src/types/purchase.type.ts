export type DateRangeParams = {
  from?: string;
  to?: string;
};

export type PurchaseFrequency = {
  range: string;
  count: number;
};

export type Purchase = {
  date: string;
  customerName: string;
  productName: string;
  price: number;
  quantity: number;
};
