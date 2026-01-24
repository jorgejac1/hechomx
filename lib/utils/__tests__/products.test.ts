import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  generateProductId,
  setDuplicateProduct,
  getDuplicateProduct,
  clearDuplicateProduct,
} from '../products';

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

describe('Product Utilities', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('generateProductId', () => {
    it('should generate a unique ID with PROD prefix', () => {
      const id = generateProductId();
      expect(id).toMatch(/^PROD-[A-Z0-9]+-[A-Z0-9]+$/);
    });

    it('should generate different IDs on multiple calls', () => {
      const id1 = generateProductId();
      const id2 = generateProductId();
      expect(id1).not.toBe(id2);
    });

    it('should generate uppercase IDs', () => {
      const id = generateProductId();
      expect(id).toBe(id.toUpperCase());
    });
  });

  describe('Product Duplication', () => {
    const mockProduct = {
      id: 'PROD-123',
      name: 'Alebrije Colorido',
      description: 'Artesanía tradicional de Oaxaca',
      price: 1500,
      currency: 'MXN',
      category: 'Artesanías',
      state: 'Oaxaca',
      images: ['image1.jpg', 'image2.jpg'],
      stock: 5,
      inStock: true,
      materials: ['Madera', 'Pintura'],
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-15T00:00:00.000Z',
      sellerId: 'seller-123',
      sellerName: 'Artesano Pedro',
      status: 'published' as const,
    };

    describe('setDuplicateProduct', () => {
      it('should store product data in localStorage without metadata', () => {
        setDuplicateProduct(mockProduct);

        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'papalote-duplicate-product',
          expect.any(String)
        );

        // Parse the stored data and verify excluded fields
        const storedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
        expect(storedData).not.toHaveProperty('id');
        expect(storedData).not.toHaveProperty('createdAt');
        expect(storedData).not.toHaveProperty('updatedAt');
        expect(storedData).not.toHaveProperty('sellerId');
        expect(storedData).not.toHaveProperty('sellerName');
        expect(storedData).not.toHaveProperty('status');
      });

      it('should preserve product data fields', () => {
        setDuplicateProduct(mockProduct);

        const storedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
        expect(storedData.name).toBe('Alebrije Colorido');
        expect(storedData.description).toBe('Artesanía tradicional de Oaxaca');
        expect(storedData.price).toBe(1500);
        expect(storedData.category).toBe('Artesanías');
        expect(storedData.state).toBe('Oaxaca');
        expect(storedData.images).toEqual(['image1.jpg', 'image2.jpg']);
        expect(storedData.materials).toEqual(['Madera', 'Pintura']);
      });

      it('should handle partial product data', () => {
        const partialProduct = {
          name: 'Partial Product',
          price: 500,
        };

        setDuplicateProduct(partialProduct);

        const storedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
        expect(storedData.name).toBe('Partial Product');
        expect(storedData.price).toBe(500);
      });

      it('should handle localStorage errors gracefully', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        localStorageMock.setItem.mockImplementationOnce(() => {
          throw new Error('Storage full');
        });

        // Should not throw
        expect(() => setDuplicateProduct(mockProduct)).not.toThrow();
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
      });
    });

    describe('getDuplicateProduct', () => {
      it('should return stored product data', () => {
        const productData = {
          name: 'Stored Product',
          price: 1000,
          materials: ['Barro'],
        };
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(productData));

        const result = getDuplicateProduct();

        expect(result).toEqual(productData);
      });

      it('should return null when no data stored', () => {
        localStorageMock.getItem.mockReturnValueOnce(null);

        const result = getDuplicateProduct();

        expect(result).toBeNull();
      });

      it('should handle invalid JSON gracefully', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        localStorageMock.getItem.mockReturnValueOnce('invalid-json');

        const result = getDuplicateProduct();

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
      });
    });

    describe('clearDuplicateProduct', () => {
      it('should remove duplicate product data from localStorage', () => {
        clearDuplicateProduct();

        expect(localStorageMock.removeItem).toHaveBeenCalledWith('papalote-duplicate-product');
      });

      it('should handle errors gracefully', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        localStorageMock.removeItem.mockImplementationOnce(() => {
          throw new Error('Storage error');
        });

        // Should not throw
        expect(() => clearDuplicateProduct()).not.toThrow();
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
      });
    });

    describe('Duplication workflow integration', () => {
      it('should support complete duplication workflow', () => {
        // 1. Set duplicate from original product
        setDuplicateProduct(mockProduct);

        // 2. Read the stored value (simulate the actual storage behavior)
        const storedJson = localStorageMock.setItem.mock.calls[0][1];
        localStorageMock.getItem.mockReturnValueOnce(storedJson);

        // 3. Get duplicate data
        const duplicate = getDuplicateProduct();

        // 4. Verify it has product data but no metadata
        expect(duplicate).not.toBeNull();
        expect(duplicate!.name).toBe('Alebrije Colorido');
        expect(duplicate).not.toHaveProperty('id');
        expect(duplicate).not.toHaveProperty('status');

        // 5. Clear after use
        clearDuplicateProduct();
        expect(localStorageMock.removeItem).toHaveBeenCalled();
      });
    });
  });
});
