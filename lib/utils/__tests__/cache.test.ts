import { describe, it, expect } from 'vitest';
import { CACHE_DURATIONS, createCacheHeaders, CACHE_HEADERS } from '../cache';

type CacheHeaders = Record<string, string>;

describe('Cache Utilities', () => {
  describe('CACHE_DURATIONS', () => {
    it('should have correct duration values in seconds', () => {
      expect(CACHE_DURATIONS.NONE).toBe(0);
      expect(CACHE_DURATIONS.SHORT).toBe(60);
      expect(CACHE_DURATIONS.MEDIUM).toBe(300);
      expect(CACHE_DURATIONS.LONG).toBe(3600);
      expect(CACHE_DURATIONS.EXTENDED).toBe(86400);
    });
  });

  describe('createCacheHeaders', () => {
    it('should return no-cache headers for duration 0', () => {
      const headers = createCacheHeaders(0) as CacheHeaders;

      expect(headers['Cache-Control']).toBe('no-store, no-cache, must-revalidate');
      expect(headers['Pragma']).toBe('no-cache');
    });

    it('should return public cache headers by default', () => {
      const headers = createCacheHeaders(60) as CacheHeaders;

      expect(headers['Cache-Control']).toContain('public');
      expect(headers['Cache-Control']).toContain('max-age=60');
      expect(headers['Cache-Control']).toContain('s-maxage=60');
    });

    it('should return private cache headers when specified', () => {
      const headers = createCacheHeaders(300, { private: true }) as CacheHeaders;

      expect(headers['Cache-Control']).toContain('private');
      expect(headers['Cache-Control']).toContain('max-age=300');
      expect(headers['Cache-Control']).not.toContain('s-maxage');
    });

    it('should include stale-while-revalidate when specified', () => {
      const headers = createCacheHeaders(60, { staleWhileRevalidate: 300 }) as CacheHeaders;

      expect(headers['Cache-Control']).toContain('stale-while-revalidate=300');
    });

    it('should combine all options correctly', () => {
      const headers = createCacheHeaders(120, {
        private: true,
        staleWhileRevalidate: 600,
      }) as CacheHeaders;

      const cacheControl = headers['Cache-Control'];
      expect(cacheControl).toContain('private');
      expect(cacheControl).toContain('max-age=120');
      expect(cacheControl).toContain('stale-while-revalidate=600');
      expect(cacheControl).not.toContain('s-maxage');
    });
  });

  describe('CACHE_HEADERS presets', () => {
    it('PUBLIC_LISTINGS should have short cache with stale-while-revalidate', () => {
      const headers = CACHE_HEADERS.PUBLIC_LISTINGS as CacheHeaders;
      const cacheControl = headers['Cache-Control'];

      expect(cacheControl).toContain('public');
      expect(cacheControl).toContain('max-age=60');
      expect(cacheControl).toContain('stale-while-revalidate=300');
    });

    it('USER_DATA should have no-cache headers', () => {
      const headers = CACHE_HEADERS.USER_DATA as CacheHeaders;
      expect(headers['Cache-Control']).toBe('no-store, no-cache, must-revalidate');
      expect(headers['Pragma']).toBe('no-cache');
    });

    it('REFERENCE_DATA should have long cache', () => {
      const headers = CACHE_HEADERS.REFERENCE_DATA as CacheHeaders;
      const cacheControl = headers['Cache-Control'];

      expect(cacheControl).toContain('public');
      expect(cacheControl).toContain('max-age=3600');
      expect(cacheControl).toContain('stale-while-revalidate=86400');
    });

    it('ANALYTICS should have private medium cache', () => {
      const headers = CACHE_HEADERS.ANALYTICS as CacheHeaders;
      const cacheControl = headers['Cache-Control'];

      expect(cacheControl).toContain('private');
      expect(cacheControl).toContain('max-age=300');
      expect(cacheControl).toContain('stale-while-revalidate=3600');
    });
  });
});
