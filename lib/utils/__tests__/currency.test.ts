import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatCurrencyWithDecimals,
  parseCurrency,
  formatCompactCurrency,
  calculateDiscount,
  formatDiscount,
} from '../currency';

describe('Currency Utilities', () => {
  describe('formatCurrency', () => {
    it('should format amount as MXN currency', () => {
      const result = formatCurrency(1234);
      expect(result).toMatch(/\$1,234/);
    });

    it('should format amount without decimals by default', () => {
      const result = formatCurrency(1234.56);
      expect(result).toMatch(/\$1,235/); // Rounds to nearest integer
    });

    it('should handle zero', () => {
      const result = formatCurrency(0);
      expect(result).toMatch(/\$0/);
    });

    it('should handle large numbers', () => {
      const result = formatCurrency(1000000);
      expect(result).toMatch(/\$1,000,000/);
    });

    it('should accept different currency codes', () => {
      const result = formatCurrency(100, 'USD');
      expect(result).toContain('100');
    });

    it('should handle negative amounts', () => {
      const result = formatCurrency(-500);
      expect(result).toContain('500');
      expect(result).toContain('-');
    });
  });

  describe('formatCurrencyWithDecimals', () => {
    it('should format amount with 2 decimal places', () => {
      const result = formatCurrencyWithDecimals(1234.56);
      expect(result).toMatch(/1,234\.56/);
    });

    it('should add trailing zeros for whole numbers', () => {
      const result = formatCurrencyWithDecimals(100);
      expect(result).toMatch(/100\.00/);
    });

    it('should round to 2 decimal places', () => {
      const result = formatCurrencyWithDecimals(99.999);
      expect(result).toMatch(/100\.00/);
    });
  });

  describe('parseCurrency', () => {
    it('should parse currency string to number', () => {
      expect(parseCurrency('$1,234')).toBe(1234);
    });

    it('should handle decimal amounts', () => {
      expect(parseCurrency('$1,234.56')).toBe(1234.56);
    });

    it('should remove currency symbols', () => {
      expect(parseCurrency('$500 MXN')).toBe(500);
    });

    it('should handle negative amounts', () => {
      expect(parseCurrency('-$500')).toBe(-500);
    });

    it('should handle plain numbers', () => {
      expect(parseCurrency('1000')).toBe(1000);
    });
  });

  describe('formatCompactCurrency', () => {
    it('should format thousands as K', () => {
      const result = formatCompactCurrency(1500);
      // Compact notation varies by locale, just check it's shorter
      expect(result.length).toBeLessThan(10);
    });

    it('should format millions as M', () => {
      const result = formatCompactCurrency(1500000);
      expect(result.length).toBeLessThan(15);
    });

    it('should handle small numbers without compact notation', () => {
      const result = formatCompactCurrency(100);
      expect(result).toMatch(/100/);
    });
  });

  describe('calculateDiscount', () => {
    it('should calculate discount percentage', () => {
      expect(calculateDiscount(100, 80)).toBe(20);
    });

    it('should calculate 50% discount', () => {
      expect(calculateDiscount(200, 100)).toBe(50);
    });

    it('should round to nearest integer', () => {
      expect(calculateDiscount(100, 67)).toBe(33);
    });

    it('should handle 100% discount', () => {
      expect(calculateDiscount(100, 0)).toBe(100);
    });

    it('should handle no discount', () => {
      expect(calculateDiscount(100, 100)).toBe(0);
    });

    it('should handle large price differences', () => {
      expect(calculateDiscount(1000, 250)).toBe(75);
    });
  });

  describe('formatDiscount', () => {
    it('should format discount percentage with OFF suffix', () => {
      expect(formatDiscount(20)).toBe('20% OFF');
    });

    it('should handle 0% discount', () => {
      expect(formatDiscount(0)).toBe('0% OFF');
    });

    it('should handle 100% discount', () => {
      expect(formatDiscount(100)).toBe('100% OFF');
    });
  });
});
