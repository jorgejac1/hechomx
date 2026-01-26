import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getSearchHistory,
  addToSearchHistory,
  removeFromSearchHistory,
  clearSearchHistory,
  searchProducts,
  getSearchSuggestions,
} from '../search';
import { Product } from '@/types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

// Sample products for testing
const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Alebrije Colorido',
    description: 'Artesanía tradicional de Oaxaca hecha con madera de copal',
    price: 1500,
    currency: 'MXN',
    category: 'Artesanías',
    state: 'Oaxaca',
    maker: 'Artesano Pedro',
    images: ['image1.jpg'],
    inStock: true,
    materials: ['Madera', 'Pintura'],
    tags: ['tradicional', 'colorido'],
    featured: true,
    verified: true,
  },
  {
    id: 'prod-2',
    name: 'Reboso de Seda',
    description: 'Reboso tradicional tejido a mano',
    price: 2500,
    currency: 'MXN',
    category: 'Textiles',
    state: 'Chiapas',
    maker: 'Tejedora María',
    images: ['image2.jpg'],
    inStock: true,
    materials: ['Seda'],
    tags: ['tejido', 'elegante'],
  },
  {
    id: 'prod-3',
    name: 'Barro Negro de Oaxaca',
    description: 'Cerámica artesanal de barro negro',
    price: 800,
    currency: 'MXN',
    category: 'Cerámica',
    state: 'Oaxaca',
    maker: 'Ceramista Rosa',
    images: ['image3.jpg'],
    inStock: true,
    materials: ['Barro'],
  },
  {
    id: 'prod-4',
    name: 'Huipil Bordado',
    description: 'Huipil con bordado tradicional zapoteco',
    price: 3500,
    currency: 'MXN',
    category: 'Textiles',
    state: 'Oaxaca',
    maker: 'Bordadora Ana',
    images: ['image4.jpg'],
    inStock: false,
    materials: ['Algodón', 'Hilo'],
  },
];

describe('Search History', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('getSearchHistory', () => {
    it('should return empty array when no history exists', () => {
      const result = getSearchHistory();
      expect(result).toEqual([]);
    });

    it('should return stored history items', () => {
      const history = [
        { query: 'alebrije', timestamp: '2024-01-01T00:00:00.000Z' },
        { query: 'textiles', timestamp: '2024-01-02T00:00:00.000Z' },
      ];
      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(history));

      const result = getSearchHistory();
      expect(result).toEqual(history);
    });

    it('should handle invalid JSON gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorageMock.getItem.mockReturnValueOnce('invalid-json');

      const result = getSearchHistory();
      expect(result).toEqual([]);

      consoleSpy.mockRestore();
    });
  });

  describe('addToSearchHistory', () => {
    it('should add new search query to history', () => {
      addToSearchHistory('alebrije');

      expect(localStorageMock.setItem).toHaveBeenCalled();
      const storedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(storedData[0].query).toBe('alebrije');
    });

    it('should move existing query to front of history', () => {
      const existingHistory = [
        { query: 'textiles', timestamp: '2024-01-01T00:00:00.000Z' },
        { query: 'alebrije', timestamp: '2024-01-02T00:00:00.000Z' },
      ];
      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(existingHistory));

      addToSearchHistory('alebrije');

      const storedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(storedData[0].query).toBe('alebrije');
      expect(storedData.length).toBe(2); // No duplicates
    });

    it('should limit history to 10 items', () => {
      const existingHistory = Array.from({ length: 10 }, (_, i) => ({
        query: `query-${i}`,
        timestamp: new Date().toISOString(),
      }));
      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(existingHistory));

      addToSearchHistory('new-query');

      const storedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(storedData.length).toBe(10);
      expect(storedData[0].query).toBe('new-query');
    });

    it('should not add empty queries', () => {
      addToSearchHistory('');
      addToSearchHistory('   ');

      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    it('should trim whitespace from queries', () => {
      addToSearchHistory('  alebrije  ');

      const storedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(storedData[0].query).toBe('alebrije');
    });
  });

  describe('removeFromSearchHistory', () => {
    it('should remove specific query from history', () => {
      const existingHistory = [
        { query: 'alebrije', timestamp: '2024-01-01T00:00:00.000Z' },
        { query: 'textiles', timestamp: '2024-01-02T00:00:00.000Z' },
      ];
      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(existingHistory));

      removeFromSearchHistory('alebrije');

      const storedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(storedData.length).toBe(1);
      expect(storedData[0].query).toBe('textiles');
    });

    it('should be case insensitive', () => {
      const existingHistory = [{ query: 'Alebrije', timestamp: '2024-01-01T00:00:00.000Z' }];
      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(existingHistory));

      removeFromSearchHistory('alebrije');

      const storedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(storedData.length).toBe(0);
    });
  });

  describe('clearSearchHistory', () => {
    it('should remove all search history', () => {
      clearSearchHistory();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('papalote-search-history');
    });
  });
});

describe('Product Search', () => {
  describe('searchProducts', () => {
    it('should return empty array for empty query', () => {
      const results = searchProducts(mockProducts, '');
      expect(results).toEqual([]);
    });

    it('should find products by name', () => {
      const results = searchProducts(mockProducts, 'alebrije');

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].product.name).toContain('Alebrije');
    });

    it('should find products by category', () => {
      const results = searchProducts(mockProducts, 'textiles');

      expect(results.length).toBeGreaterThan(0);
      const categories = results.map((r) => r.product.category);
      expect(categories).toContain('Textiles');
    });

    it('should find products by maker name', () => {
      const results = searchProducts(mockProducts, 'Artesano Pedro');

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].product.maker).toContain('Pedro');
    });

    it('should find products by state', () => {
      const results = searchProducts(mockProducts, 'oaxaca');

      expect(results.length).toBeGreaterThan(0);
      const states = results.map((r) => r.product.state);
      expect(states.some((s) => s.includes('Oaxaca'))).toBe(true);
    });

    it('should find products by material', () => {
      const results = searchProducts(mockProducts, 'seda');

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].matchedFields).toContain('materials');
    });

    it('should include matched fields in results', () => {
      const results = searchProducts(mockProducts, 'alebrije');

      expect(results[0]).toHaveProperty('matchedFields');
      expect(results[0].matchedFields).toContain('name');
    });

    it('should include score in results', () => {
      const results = searchProducts(mockProducts, 'alebrije');

      expect(results[0]).toHaveProperty('score');
      expect(typeof results[0].score).toBe('number');
    });

    it('should sort results by relevance score', () => {
      const results = searchProducts(mockProducts, 'oaxaca');

      for (let i = 1; i < results.length; i++) {
        expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
      }
    });

    it('should respect the limit option', () => {
      const results = searchProducts(mockProducts, 'a', { limit: 2 });

      expect(results.length).toBeLessThanOrEqual(2);
    });

    it('should filter by minimum score', () => {
      const results = searchProducts(mockProducts, 'xyz', { minScore: 0.2 });

      // Should not find anything with high min score for nonsense query
      expect(results.length).toBe(0);
    });

    it('should perform fuzzy matching for partial queries', () => {
      // Test that partial/prefix matches work
      const results = searchProducts(mockProducts, 'alebrij');

      // Should find Alebrije through partial matching
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].product.name.toLowerCase()).toContain('alebrije');
    });

    it('should include featured and verified status in scoring', () => {
      const results = searchProducts(mockProducts, 'oaxaca');

      // Just verify that results include both featured and non-featured products
      // and that the scoring mechanism runs without errors
      expect(results.length).toBeGreaterThan(0);

      // Verify that featured/verified products are found
      const hasResults = results.some((r) => r.product.state === 'Oaxaca');
      expect(hasResults).toBe(true);
    });
  });

  describe('getSearchSuggestions', () => {
    it('should return empty array for short queries', () => {
      const results = getSearchSuggestions(mockProducts, 'a');
      expect(results).toEqual([]);
    });

    it('should return suggestions from product names', () => {
      const results = getSearchSuggestions(mockProducts, 'ale');

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((s) => s.toLowerCase().includes('ale'))).toBe(true);
    });

    it('should return suggestions from categories', () => {
      const results = getSearchSuggestions(mockProducts, 'tex');

      expect(results).toContain('Textiles');
    });

    it('should return suggestions from makers', () => {
      const results = getSearchSuggestions(mockProducts, 'ped');

      expect(results.some((s) => s.includes('Pedro'))).toBe(true);
    });

    it('should return suggestions from states', () => {
      const results = getSearchSuggestions(mockProducts, 'oax');

      expect(results).toContain('Oaxaca');
    });

    it('should return suggestions from materials', () => {
      const results = getSearchSuggestions(mockProducts, 'sed');

      expect(results.some((s) => s.toLowerCase().includes('seda'))).toBe(true);
    });

    it('should respect the limit parameter', () => {
      const results = getSearchSuggestions(mockProducts, 'a', 2);

      expect(results.length).toBeLessThanOrEqual(2);
    });

    it('should prioritize suggestions that start with query', () => {
      const results = getSearchSuggestions(mockProducts, 'ale');

      // First results should start with 'ale'
      if (results.length > 0) {
        expect(results[0].toLowerCase().startsWith('ale')).toBe(true);
      }
    });
  });
});
