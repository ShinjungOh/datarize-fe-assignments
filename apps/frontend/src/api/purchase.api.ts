import httpClient from './httpClient';
import { DateRangeParams, Purchase, PurchaseFrequency } from '@/types/purchase.type';

export const getPurchaseFrequency = async (params?: DateRangeParams) => {
  const response = await httpClient.get<PurchaseFrequency[]>('/purchase-frequency', { params });
  return response.data;
};

export const getPurchases = async (params?: DateRangeParams) => {
  const response = await httpClient.get<Purchase[]>('/purchases', { params });
  return response.data;
};
