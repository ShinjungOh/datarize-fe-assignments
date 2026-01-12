import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPurchaseFrequency, getPurchases } from './purchase.api';
import httpClient from './httpClient';

vi.mock('./httpClient');

describe('purchase.api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPurchaseFrequency', () => {
    it('가격대별 구매 빈도를 조회하고 변환된 응답을 반환한다', async () => {
      const mockResponse = {
        data: [
          { range: '0 - 20000', count: 15 },
          { range: '20001 - 30000', count: 20 },
          { range: '30001 - 40000', count: 10 },
        ],
      };
      vi.mocked(httpClient.get).mockResolvedValue(mockResponse);

      const result = await getPurchaseFrequency({ from: '2025-10-01', to: '2025-12-31' });

      expect(httpClient.get).toHaveBeenCalledWith('/purchase-frequency', {
        params: { from: '2025-10-01', to: '2025-12-31' },
      });
      expect(result).toHaveLength(3);
      expect(result[0].range).toBe('0 - 20000');
      expect(result[0].count).toBe(15);
    });
  });

  describe('getPurchases', () => {
    it('구매 목록을 조회하고 변환된 응답을 반환한다', async () => {
      const mockResponse = {
        data: [
          { date: '2025-10-15', customerName: '홍길동', productName: '티셔츠', price: 25000, quantity: 2 },
          { date: '2025-10-16', customerName: '김철수', productName: '바지', price: 45000, quantity: 1 },
        ],
      };
      vi.mocked(httpClient.get).mockResolvedValue(mockResponse);

      const result = await getPurchases({ from: '2025-10-01', to: '2025-12-31' });

      expect(httpClient.get).toHaveBeenCalledWith('/purchases', {
        params: { from: '2025-10-01', to: '2025-12-31' },
      });
      expect(result).toHaveLength(2);
      expect(result[0].customerName).toBe('홍길동');
      expect(result[0].price).toBe(25000);
    });
  });
});
