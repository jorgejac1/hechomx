import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  buildUrl,
  parseQueryString,
  getQueryParam,
  updateQueryParams,
  getAbsoluteUrl,
  isExternalUrl,
  extractDomain,
} from '../url';

describe('URL Utilities', () => {
  describe('buildUrl', () => {
    beforeEach(() => {
      vi.stubGlobal('window', {
        location: {
          origin: 'https://example.com',
        },
      });
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('should build URL with query parameters', () => {
      const url = buildUrl('/products', { category: 'jewelry', page: 1 });
      expect(url).toBe('https://example.com/products?category=jewelry&page=1');
    });

    it('should handle string, number, and boolean params', () => {
      const url = buildUrl('/search', {
        q: 'alebrije',
        limit: 20,
        featured: true,
      });
      expect(url).toContain('q=alebrije');
      expect(url).toContain('limit=20');
      expect(url).toContain('featured=true');
    });

    it('should skip undefined and null params', () => {
      const url = buildUrl('/products', {
        category: 'art',
        state: undefined,
        featured: null,
      });
      expect(url).toBe('https://example.com/products?category=art');
    });

    it('should skip empty string params', () => {
      const url = buildUrl('/products', { category: '', state: 'Oaxaca' });
      expect(url).toBe('https://example.com/products?state=Oaxaca');
    });

    it('should handle base URL without params', () => {
      const url = buildUrl('/products', {});
      expect(url).toBe('https://example.com/products');
    });
  });

  describe('parseQueryString', () => {
    it('should parse query string to object', () => {
      const result = parseQueryString('?category=art&state=Oaxaca');
      expect(result).toEqual({ category: 'art', state: 'Oaxaca' });
    });

    it('should handle query string without leading ?', () => {
      const result = parseQueryString('category=art&state=Oaxaca');
      expect(result).toEqual({ category: 'art', state: 'Oaxaca' });
    });

    it('should handle empty query string', () => {
      const result = parseQueryString('');
      expect(result).toEqual({});
    });

    it('should handle single parameter', () => {
      const result = parseQueryString('?search=alebrije');
      expect(result).toEqual({ search: 'alebrije' });
    });

    it('should handle encoded values', () => {
      const result = parseQueryString('?name=Caf%C3%A9');
      expect(result).toEqual({ name: 'Café' });
    });
  });

  describe('getQueryParam', () => {
    beforeEach(() => {
      vi.stubGlobal('window', {
        location: {
          search: '?category=art&page=2',
        },
      });
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('should get query parameter value', () => {
      expect(getQueryParam('category')).toBe('art');
      expect(getQueryParam('page')).toBe('2');
    });

    it('should return null for non-existent param', () => {
      expect(getQueryParam('nonexistent')).toBeNull();
    });

    it('should return null when window is undefined', () => {
      vi.stubGlobal('window', undefined);
      expect(getQueryParam('category')).toBeNull();
    });
  });

  describe('updateQueryParams', () => {
    let mockPushState: ReturnType<typeof vi.fn>;
    let mockReplaceState: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      mockPushState = vi.fn();
      mockReplaceState = vi.fn();
      vi.stubGlobal('window', {
        location: {
          href: 'https://example.com/products?page=1',
        },
        history: {
          pushState: mockPushState,
          replaceState: mockReplaceState,
        },
      });
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('should update query params with pushState by default', () => {
      updateQueryParams({ category: 'art' });
      expect(mockPushState).toHaveBeenCalledWith(
        {},
        '',
        'https://example.com/products?page=1&category=art'
      );
    });

    it('should use replaceState when replace is true', () => {
      updateQueryParams({ category: 'art' }, true);
      expect(mockReplaceState).toHaveBeenCalledWith(
        {},
        '',
        'https://example.com/products?page=1&category=art'
      );
    });

    it('should remove params with undefined/null/empty values', () => {
      updateQueryParams({ page: undefined });
      expect(mockPushState).toHaveBeenCalledWith({}, '', 'https://example.com/products');
    });

    it('should do nothing when window is undefined', () => {
      vi.stubGlobal('window', undefined);
      updateQueryParams({ category: 'art' });
      expect(mockPushState).not.toHaveBeenCalled();
    });
  });

  describe('getAbsoluteUrl', () => {
    it('should create absolute URL from relative path', () => {
      const url = getAbsoluteUrl('/products/alebrije');
      expect(url).toMatch(/\/products\/alebrije$/);
    });

    it('should handle path with query string', () => {
      const url = getAbsoluteUrl('/search?q=art');
      expect(url).toContain('/search?q=art');
    });

    it('should handle root path', () => {
      const url = getAbsoluteUrl('/');
      expect(url).toMatch(/\/$/);
    });
  });

  describe('isExternalUrl', () => {
    beforeEach(() => {
      vi.stubGlobal('window', {
        location: {
          origin: 'https://example.com',
        },
      });
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('should return true for external URL', () => {
      expect(isExternalUrl('https://google.com')).toBe(true);
    });

    it('should return false for internal URL', () => {
      expect(isExternalUrl('https://example.com/products')).toBe(false);
    });

    it('should return false for relative URL', () => {
      expect(isExternalUrl('/products')).toBe(false);
    });

    it('should return false for invalid URL', () => {
      expect(isExternalUrl('not-a-url')).toBe(false);
    });
  });

  describe('extractDomain', () => {
    it('should extract domain from full URL', () => {
      expect(extractDomain('https://www.example.com/path')).toBe('www.example.com');
    });

    it('should extract domain without www', () => {
      expect(extractDomain('https://example.com/path?query=1')).toBe('example.com');
    });

    it('should handle subdomain', () => {
      expect(extractDomain('https://api.example.com')).toBe('api.example.com');
    });

    it('should return empty string for invalid URL', () => {
      expect(extractDomain('not-a-valid-url')).toBe('');
    });

    it('should return empty string for empty input', () => {
      expect(extractDomain('')).toBe('');
    });
  });
});
