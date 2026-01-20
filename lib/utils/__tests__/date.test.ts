import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  formatDate,
  formatShortDate,
  formatRelativeTime,
  calculateDeliveryDate,
  formatDeliveryRange,
  isPast,
  isToday,
} from '../date';

describe('Date Utilities', () => {
  describe('formatDate', () => {
    it('should format date in Spanish locale', () => {
      const date = new Date(2024, 2, 15); // March 15, 2024 (months are 0-indexed)
      const result = formatDate(date);
      // Should contain day, month in Spanish
      expect(result).toMatch(/15/);
      expect(result.toLowerCase()).toMatch(/marzo/i);
      expect(result).toMatch(/2024/);
    });

    it('should accept date string and convert to Date', () => {
      const result = formatDate('2024-03-15T12:00:00');
      expect(result).toMatch(/15/);
      expect(result.toLowerCase()).toMatch(/marzo/i);
    });

    it('should accept Date object directly', () => {
      const result = formatDate(new Date(2024, 2, 15));
      expect(result).toMatch(/15/);
    });

    it('should accept custom options', () => {
      const date = new Date(2024, 2, 15);
      const result = formatDate(date, { month: 'short', day: 'numeric' });
      expect(result).toMatch(/15/);
    });
  });

  describe('formatShortDate', () => {
    it('should format date as DD/MM/YYYY', () => {
      const date = new Date(2024, 2, 15); // March 15, 2024
      const result = formatShortDate(date);
      expect(result).toMatch(/15/);
      expect(result).toMatch(/03/);
      expect(result).toMatch(/2024/);
    });

    it('should accept date string and convert to Date', () => {
      const result = formatShortDate('2024-03-15T12:00:00');
      expect(result).toMatch(/15/);
      expect(result).toMatch(/03/);
    });

    it('should accept Date object directly', () => {
      const result = formatShortDate(new Date(2024, 2, 15));
      expect(result).toMatch(/15/);
    });
  });

  describe('formatRelativeTime', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-03-15T12:00:00'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return "hace un momento" for recent times', () => {
      const date = new Date('2024-03-15T11:59:30'); // 30 seconds ago
      const result = formatRelativeTime(date);
      expect(result).toBe('hace un momento');
    });

    it('should format minutes ago', () => {
      const date = new Date('2024-03-15T11:55:00'); // 5 minutes ago
      const result = formatRelativeTime(date);
      expect(result.toLowerCase()).toMatch(/minuto/);
    });

    it('should format hours ago', () => {
      const date = new Date('2024-03-15T09:00:00'); // 3 hours ago
      const result = formatRelativeTime(date);
      expect(result.toLowerCase()).toMatch(/hora/);
    });

    it('should format days ago', () => {
      const date = new Date('2024-03-12T12:00:00'); // 3 days ago
      const result = formatRelativeTime(date);
      expect(result.toLowerCase()).toMatch(/día/);
    });

    it('should format months ago', () => {
      const date = new Date('2024-01-15T12:00:00'); // 2 months ago
      const result = formatRelativeTime(date);
      expect(result.toLowerCase()).toMatch(/mes/);
    });

    it('should format years ago', () => {
      const date = new Date('2022-03-15T12:00:00'); // 2 years ago
      const result = formatRelativeTime(date);
      expect(result.toLowerCase()).toMatch(/año/);
    });

    it('should accept date string', () => {
      const result = formatRelativeTime('2024-03-15T11:55:00');
      expect(result.toLowerCase()).toMatch(/minuto/);
    });
  });

  describe('calculateDeliveryDate', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should add business days skipping weekends', () => {
      // Start on Monday March 11, 2024
      vi.setSystemTime(new Date('2024-03-11T10:00:00'));

      const result = calculateDeliveryDate(5);
      // 5 business days from Monday = next Monday (March 18)
      expect(result.getDate()).toBe(18);
      expect(result.getMonth()).toBe(2); // March
    });

    it('should skip Saturday and Sunday', () => {
      // Start on Friday March 15, 2024
      vi.setSystemTime(new Date('2024-03-15T10:00:00'));

      const result = calculateDeliveryDate(1);
      // 1 business day from Friday = Monday (March 18)
      expect(result.getDay()).toBe(1); // Monday
    });

    it('should handle zero business days', () => {
      vi.setSystemTime(new Date('2024-03-15T10:00:00'));
      const result = calculateDeliveryDate(0);
      expect(result.getDate()).toBe(15);
    });

    it('should handle starting on weekend', () => {
      // Start on Saturday March 16, 2024
      vi.setSystemTime(new Date(2024, 2, 16, 10, 0, 0));

      const result = calculateDeliveryDate(1);
      // From Saturday, adds days until 1 business day is reached
      // Sunday is skipped, Monday counts as 1 business day
      expect(result.getDay()).toBe(1); // Monday
    });
  });

  describe('formatDeliveryRange', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-03-11T10:00:00')); // Monday
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should format delivery range', () => {
      const result = formatDeliveryRange(3, 5);
      // Should contain two dates
      expect(result).toContain('-');
    });

    it('should use short month format', () => {
      const result = formatDeliveryRange(1, 2);
      // Short month format should be used
      expect(result.length).toBeLessThan(30);
    });
  });

  describe('isPast', () => {
    it('should return true for past dates', () => {
      const pastDate = new Date('2020-01-01');
      expect(isPast(pastDate)).toBe(true);
    });

    it('should return false for future dates', () => {
      const futureDate = new Date('2030-01-01');
      expect(isPast(futureDate)).toBe(false);
    });

    it('should accept date string', () => {
      expect(isPast('2020-01-01')).toBe(true);
    });
  });

  describe('isToday', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-03-15T12:00:00'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return true for today', () => {
      const today = new Date('2024-03-15T09:00:00');
      expect(isToday(today)).toBe(true);
    });

    it('should return true for today at different times', () => {
      expect(isToday(new Date('2024-03-15T00:00:00'))).toBe(true);
      expect(isToday(new Date('2024-03-15T23:59:59'))).toBe(true);
    });

    it('should return false for yesterday', () => {
      const yesterday = new Date('2024-03-14T12:00:00');
      expect(isToday(yesterday)).toBe(false);
    });

    it('should return false for tomorrow', () => {
      const tomorrow = new Date('2024-03-16T12:00:00');
      expect(isToday(tomorrow)).toBe(false);
    });

    it('should accept Date object created from components', () => {
      expect(isToday(new Date(2024, 2, 15, 10, 0, 0))).toBe(true);
    });

    it('should accept date string and convert to Date', () => {
      expect(isToday('2024-03-15T10:00:00')).toBe(true);
    });

    it('should return false for string date that is not today', () => {
      expect(isToday('2024-03-14T10:00:00')).toBe(false);
    });
  });
});
