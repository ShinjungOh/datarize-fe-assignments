import httpClient from './httpClient';
import { CustomerList, CustomerPurchase, CustomersParams } from '@/types/customer.type.ts';
import { DateRangeParams } from '@/types/purchase.type';

export const getCustomers = async (params?: CustomersParams) => {
  const response = await httpClient.get<CustomerList>('/customers', { params });
  return response.data;
};

export const getCustomersPurchases = async (customerId: number, params?: DateRangeParams) => {
  const response = await httpClient.get<CustomerPurchase[]>(`/customers/${customerId}/purchases`, { params });
  return response.data;
};
