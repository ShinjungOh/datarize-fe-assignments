import { describe, it, expect } from 'vitest';
import { dateUtils } from './dateUtils';

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('Date 객체를 yyyy-MM-dd 형식 문자열로 변환한다', () => {
      const date = new Date(2025, 0, 15);

      expect(dateUtils.formatDate(date)).toBe('2025-01-15');
    });
  });

  describe('parseDate', () => {
    it('yyyy-MM-dd 형식 문자열을 Date 객체로 변환한다', () => {
      const result = dateUtils.parseDate('2025-01-15');

      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
    });
  });
});
