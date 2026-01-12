import { describe, it, expect } from 'vitest';
import { purchaseUtils } from './purchaseUtils';

describe('purchaseUtils', () => {
  describe('parseRange', () => {
    it('범위 문자열을 min, max 객체로 파싱한다', () => {
      expect(purchaseUtils.parseRange('0 - 20000')).toEqual({ min: 0, max: 20000 });
    });

    it('Infinity를 처리한다', () => {
      expect(purchaseUtils.parseRange('100000 - Infinity')).toEqual({ min: 100000, max: Infinity });
    });
  });

  describe('formatPriceRange', () => {
    it('가격 범위를 포맷한다', () => {
      expect(purchaseUtils.formatPriceRange('0 - 20000')).toBe('0 ~ 20,000원');
    });

    it('최대값이 Infinity면 "이상"으로 표시한다', () => {
      expect(purchaseUtils.formatPriceRange('100000 - Infinity')).toBe('100,000원 이상');
    });
  });
});
