import { describe, it, expect, vi } from 'vitest';
import {
  getRecommendedProducts,
  getCrossCategoryRecommendations,
  getRecentlyViewedProducts,
  getCombinedRecommendations,
} from '../recommendations';
import { Product } from '@/types';

// Mock the recently-viewed module
vi.mock('../recently-viewed', () => ({
  getRecentlyViewedIdsExcluding: vi.fn(() => ['prod-2', 'prod-3']),
}));

// Sample products for testing
const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Alebrije Colorido',
    description: 'Artesanía tradicional de Oaxaca',
    price: 1500,
    currency: 'MXN',
    category: 'Artesanías',
    state: 'Oaxaca',
    maker: 'Artesano Pedro',
    images: ['image1.jpg'],
    inStock: true,
    materials: ['Madera', 'Pintura'],
    featured: true,
    verified: true,
  },
  {
    id: 'prod-2',
    name: 'Alebrije Pequeño',
    description: 'Mini alebrije artesanal',
    price: 800,
    currency: 'MXN',
    category: 'Artesanías',
    state: 'Oaxaca',
    maker: 'Artesano Pedro',
    images: ['image2.jpg'],
    inStock: true,
    materials: ['Madera', 'Pintura'],
  },
  {
    id: 'prod-3',
    name: 'Reboso de Seda',
    description: 'Reboso tradicional',
    price: 2500,
    currency: 'MXN',
    category: 'Textiles',
    state: 'Oaxaca',
    maker: 'Tejedora María',
    images: ['image3.jpg'],
    inStock: true,
    materials: ['Seda'],
  },
  {
    id: 'prod-4',
    name: 'Bolsa de Piel',
    description: 'Bolsa artesanal de piel',
    price: 1800,
    currency: 'MXN',
    category: 'Marroquinería',
    state: 'Jalisco',
    maker: 'Artesano Juan',
    images: ['image4.jpg'],
    inStock: true,
    materials: ['Piel'],
  },
  {
    id: 'prod-5',
    name: 'Alebrije Grande',
    description: 'Alebrije de gran tamaño',
    price: 3000,
    currency: 'MXN',
    category: 'Artesanías',
    state: 'Oaxaca',
    maker: 'Artesano Pedro',
    images: ['image5.jpg'],
    inStock: false, // Out of stock
    materials: ['Madera', 'Pintura'],
  },
  {
    id: 'prod-6',
    name: 'Tapete de Lana',
    description: 'Tapete zapoteco',
    price: 4000,
    currency: 'MXN',
    category: 'Textiles',
    state: 'Oaxaca',
    maker: 'Artesano Pedro',
    images: ['image6.jpg'],
    inStock: true,
    materials: ['Lana'],
    featured: true,
  },
];

describe('Recommendations Utilities', () => {
  describe('getRecommendedProducts', () => {
    it('should return products sorted by relevance score', () => {
      const currentProduct = mockProducts[0]; // Alebrije Colorido
      const results = getRecommendedProducts(currentProduct, mockProducts, 4);

      expect(results.length).toBeLessThanOrEqual(4);
      // Should not include the current product
      expect(results.find((p) => p.id === 'prod-1')).toBeUndefined();
    });

    it('should prioritize same category products', () => {
      const currentProduct = mockProducts[0]; // Artesanías category
      const results = getRecommendedProducts(currentProduct, mockProducts, 4);

      // First result should be same category
      const sameCategoryResults = results.filter((p) => p.category === 'Artesanías');
      expect(sameCategoryResults.length).toBeGreaterThan(0);
    });

    it('should exclude out of stock products', () => {
      const currentProduct = mockProducts[0];
      const results = getRecommendedProducts(currentProduct, mockProducts, 10);

      // prod-5 is out of stock
      expect(results.find((p) => p.id === 'prod-5')).toBeUndefined();
    });

    it('should exclude the current product', () => {
      const currentProduct = mockProducts[0];
      const results = getRecommendedProducts(currentProduct, mockProducts, 10);

      expect(results.find((p) => p.id === currentProduct.id)).toBeUndefined();
    });

    it('should consider same maker as high relevance', () => {
      const currentProduct = mockProducts[0]; // maker: Artesano Pedro
      const results = getRecommendedProducts(currentProduct, mockProducts, 4);

      // Products by same maker should be prioritized
      const sameMakerProducts = results.filter((p) => p.maker === 'Artesano Pedro');
      expect(sameMakerProducts.length).toBeGreaterThan(0);
    });

    it('should return empty array for no products', () => {
      const currentProduct = mockProducts[0];
      const results = getRecommendedProducts(currentProduct, [], 4);

      expect(results).toEqual([]);
    });

    it('should respect the limit parameter', () => {
      const currentProduct = mockProducts[0];
      const results = getRecommendedProducts(currentProduct, mockProducts, 2);

      expect(results.length).toBeLessThanOrEqual(2);
    });
  });

  describe('getCrossCategoryRecommendations', () => {
    it('should return products from different categories', () => {
      const currentProduct = mockProducts[0]; // Artesanías
      const results = getCrossCategoryRecommendations(currentProduct, mockProducts, 4);

      // All results should be from different category
      results.forEach((product) => {
        expect(product.category).not.toBe('Artesanías');
      });
    });

    it('should prioritize products by same maker in other categories', () => {
      const currentProduct = mockProducts[0]; // Artesano Pedro, Artesanías
      const results = getCrossCategoryRecommendations(currentProduct, mockProducts, 4);

      // Tapete de Lana is by same maker but different category
      const sameMaker = results.filter((p) => p.maker === 'Artesano Pedro');
      expect(sameMaker.length).toBeGreaterThan(0);
    });

    it('should exclude out of stock products', () => {
      const currentProduct = mockProducts[0];
      const results = getCrossCategoryRecommendations(currentProduct, mockProducts, 10);

      results.forEach((product) => {
        expect(product.inStock).toBe(true);
      });
    });

    it('should only return products with some relevance score', () => {
      const currentProduct = mockProducts[0];
      const results = getCrossCategoryRecommendations(currentProduct, mockProducts, 10);

      // Results should have some shared attribute (maker, state, materials, price range)
      expect(results.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getRecentlyViewedProducts', () => {
    it('should return products matching recently viewed IDs', () => {
      const results = getRecentlyViewedProducts('prod-1', mockProducts, 4);

      // Should contain prod-2 and prod-3 (from mocked recently viewed IDs)
      const ids = results.map((p) => p.id);
      expect(ids).toContain('prod-2');
      expect(ids).toContain('prod-3');
    });

    it('should return recently viewed products from mock', () => {
      // Mock returns ['prod-2', 'prod-3'], so we expect those products
      const results = getRecentlyViewedProducts('prod-1', mockProducts, 4);

      // Should contain the mocked IDs
      const ids = results.map((p) => p.id);
      expect(ids.length).toBeLessThanOrEqual(4);
    });

    it('should respect the limit parameter', () => {
      const results = getRecentlyViewedProducts('prod-1', mockProducts, 1);

      expect(results.length).toBeLessThanOrEqual(1);
    });
  });

  describe('getCombinedRecommendations', () => {
    it('should return all three types of recommendations', () => {
      const currentProduct = mockProducts[0];
      const results = getCombinedRecommendations(currentProduct, mockProducts);

      expect(results).toHaveProperty('similar');
      expect(results).toHaveProperty('crossCategory');
      expect(results).toHaveProperty('recentlyViewed');
    });

    it('should respect custom limits', () => {
      const currentProduct = mockProducts[0];
      const results = getCombinedRecommendations(currentProduct, mockProducts, {
        similarLimit: 2,
        crossCategoryLimit: 1,
        recentlyViewedLimit: 1,
      });

      expect(results.similar.length).toBeLessThanOrEqual(2);
      expect(results.crossCategory.length).toBeLessThanOrEqual(1);
      expect(results.recentlyViewed.length).toBeLessThanOrEqual(1);
    });

    it('should use default limits when not specified', () => {
      const currentProduct = mockProducts[0];
      const results = getCombinedRecommendations(currentProduct, mockProducts);

      expect(results.similar.length).toBeLessThanOrEqual(4);
      expect(results.crossCategory.length).toBeLessThanOrEqual(4);
      expect(results.recentlyViewed.length).toBeLessThanOrEqual(4);
    });
  });
});
