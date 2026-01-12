import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCustomers, getCustomersPurchases } from './customer.api';
import httpClient from './httpClient';

vi.mock('./httpClient');

describe('customer.api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCustomers', () => {
    it('고객 목록을 조회하고 변환된 응답을 반환한다', async () => {
      const mockResponse = {
        data: {
          data: [
            { id: 1, name: '홍길동', count: 5, totalAmount: 150000 },
            { id: 2, name: '김철수', count: 3, totalAmount: 80000 },
          ],
          pagination: { page: 1, limit: 20, total: 2, totalPages: 1 },
        },
      };
      vi.mocked(httpClient.get).mockResolvedValue(mockResponse);

      const result = await getCustomers();

      expect(httpClient.get).toHaveBeenCalledWith('/customers', { params: undefined });
      expect(result.data).toHaveLength(2);
      expect(result.data[0].count).toBe(5);
      expect(result.pagination.page).toBe(1);
    });

    it('검색 및 정렬 파라미터를 전달한다', async () => {
      const mockResponse = {
        data: {
          data: [{ id: 1, name: '홍길동', count: 5, totalAmount: 150000 }],
          pagination: { page: 2, limit: 20, total: 1, totalPages: 1 },
        },
      };
      vi.mocked(httpClient.get).mockResolvedValue(mockResponse);

      await getCustomers({
        page: 2,
        sortBy: 'desc',
        name: '홍',
      });

      expect(httpClient.get).toHaveBeenCalledWith('/customers', {
        params: {
          page: 2,
          sortBy: 'desc',
          name: '홍',
        },
      });
    });
  });

  describe('getCustomersPurchases', () => {
    it('특정 고객의 구매 내역을 조회하고 변환된 응답을 반환한다', async () => {
      const mockResponse = {
        data: [
          { date: '2025-10-15', quantity: 2, product: '티셔츠', price: 25000, imgSrc: '' },
          { date: '2025-10-16', quantity: 1, product: '바지', price: 45000, imgSrc: '' },
        ],
      };
      vi.mocked(httpClient.get).mockResolvedValue(mockResponse);

      const result = await getCustomersPurchases(1, { from: '2025-10-01', to: '2025-12-31' });

      expect(httpClient.get).toHaveBeenCalledWith('/customers/1/purchases', {
        params: { from: '2025-10-01', to: '2025-12-31' },
      });
      expect(result).toHaveLength(2);
      expect(result[0].product).toBe('티셔츠');
      expect(result[0].price).toBe(25000);
    });
  });
});
