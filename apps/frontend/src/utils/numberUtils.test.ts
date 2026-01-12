import { describe, it, expect } from 'vitest';
import { numberUtils } from './numberUtils';

describe('numberUtils', () => {
  describe('formatNumber', () => {
    it('천 단위 콤마를 추가한다', () => {
      expect(numberUtils.formatNumber(1000)).toBe('1,000');
      expect(numberUtils.formatNumber(1234567)).toBe('1,234,567');
    });
  });
});
