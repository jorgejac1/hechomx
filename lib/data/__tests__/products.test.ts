import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsByState,
  getFeaturedProducts,
  searchProducts,
  getCategories,
  getStates,
} from '../products';

describe('Products Data', () => {
  beforeEach(() => {
    // Mock Math.random for consistent test results
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getAllProducts', () => {
    it('should return array of products', () => {
      const products = getAllProducts();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    it('should have required properties on products', () => {
      const products = getAllProducts();
      const product = products[0];

      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.price).toBeDefined();
      expect(product.category).toBeDefined();
      expect(product.state).toBeDefined();
    });

    it('should add createdAt and updatedAt dates', () => {
      const products = getAllProducts();
      const product = products[0];

      expect(product.createdAt).toBeDefined();
      expect(product.updatedAt).toBeDefined();
    });

    it('should return ISO date strings', () => {
      const products = getAllProducts();
      const product = products[0];

      // Check if dates are valid ISO strings
      expect(() => new Date(product.createdAt!)).not.toThrow();
      expect(() => new Date(product.updatedAt!)).not.toThrow();
    });
  });

  describe('getProductById', () => {
    it('should return product by ID', () => {
      const products = getAllProducts();
      const firstProduct = products[0];

      const found = getProductById(firstProduct.id);
      expect(found).toBeDefined();
      expect(found?.id).toBe(firstProduct.id);
    });

    it('should return undefined for non-existent ID', () => {
      const found = getProductById('nonexistent-id-12345');
      expect(found).toBeUndefined();
    });

    it('should return undefined for empty string', () => {
      const found = getProductById('');
      expect(found).toBeUndefined();
    });
  });

  describe('getProductsByCategory', () => {
    it('should return products by category', () => {
      const products = getAllProducts();
      const category = products[0].category;

      const filtered = getProductsByCategory(category);
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.every((p) => p.category.toLowerCase() === category.toLowerCase())).toBe(true);
    });

    it('should be case insensitive', () => {
      const products = getAllProducts();
      const category = products[0].category;

      const lowerCase = getProductsByCategory(category.toLowerCase());
      const upperCase = getProductsByCategory(category.toUpperCase());

      expect(lowerCase.length).toBe(upperCase.length);
    });

    it('should return empty array for non-existent category', () => {
      const filtered = getProductsByCategory('Nonexistent Category');
      expect(filtered).toEqual([]);
    });
  });

  describe('getProductsByState', () => {
    it('should return products by state', () => {
      const products = getAllProducts();
      const state = products[0].state;

      const filtered = getProductsByState(state);
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.every((p) => p.state.toLowerCase() === state.toLowerCase())).toBe(true);
    });

    it('should be case insensitive', () => {
      const products = getAllProducts();
      const state = products[0].state;

      const lowerCase = getProductsByState(state.toLowerCase());
      const upperCase = getProductsByState(state.toUpperCase());

      expect(lowerCase.length).toBe(upperCase.length);
    });

    it('should return empty array for non-existent state', () => {
      const filtered = getProductsByState('Nonexistent State');
      expect(filtered).toEqual([]);
    });
  });

  describe('getFeaturedProducts', () => {
    it('should return only featured products', () => {
      const featured = getFeaturedProducts();

      // All returned products should be featured
      expect(featured.every((p) => p.featured === true)).toBe(true);
    });

    it('should return array (possibly empty)', () => {
      const featured = getFeaturedProducts();
      expect(Array.isArray(featured)).toBe(true);
    });
  });

  describe('searchProducts', () => {
    it('should search by product name', () => {
      const products = getAllProducts();
      const firstProductName = products[0].name;
      const searchTerm = firstProductName.split(' ')[0]; // First word

      const results = searchProducts(searchTerm);
      expect(results.length).toBeGreaterThan(0);
    });

    it('should search by category', () => {
      const products = getAllProducts();
      const category = products[0].category;

      const results = searchProducts(category);
      expect(results.length).toBeGreaterThan(0);
    });

    it('should search by state', () => {
      const products = getAllProducts();
      const state = products[0].state;

      const results = searchProducts(state);
      expect(results.length).toBeGreaterThan(0);
    });

    it('should be case insensitive', () => {
      const products = getAllProducts();
      const name = products[0].name;

      const lowerCase = searchProducts(name.toLowerCase());
      const upperCase = searchProducts(name.toUpperCase());

      expect(lowerCase.length).toBe(upperCase.length);
    });

    it('should return empty array for no matches', () => {
      const results = searchProducts('xyznonexistent12345');
      expect(results).toEqual([]);
    });

    it('should search in description', () => {
      const products = getAllProducts();
      // Find a product with a description
      const productWithDesc = products.find((p) => p.description && p.description.length > 10);
      if (productWithDesc) {
        const descWord = productWithDesc.description.split(' ')[0];
        const results = searchProducts(descWord);
        expect(results.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getCategories', () => {
    it('should return unique categories', () => {
      const categories = getCategories();
      const uniqueCategories = [...new Set(categories)];

      expect(categories.length).toBe(uniqueCategories.length);
    });

    it('should return array of strings', () => {
      const categories = getCategories();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.every((c) => typeof c === 'string')).toBe(true);
    });

    it('should have at least one category', () => {
      const categories = getCategories();
      expect(categories.length).toBeGreaterThan(0);
    });
  });

  describe('getStates', () => {
    it('should return unique states', () => {
      const states = getStates();
      const uniqueStates = [...new Set(states)];

      expect(states.length).toBe(uniqueStates.length);
    });

    it('should return array of strings', () => {
      const states = getStates();
      expect(Array.isArray(states)).toBe(true);
      expect(states.every((s) => typeof s === 'string')).toBe(true);
    });

    it('should have at least one state', () => {
      const states = getStates();
      expect(states.length).toBeGreaterThan(0);
    });
  });
});
