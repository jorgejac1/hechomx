import { describe, it, expect } from 'vitest';
import {
  getShopSlug,
  getShopBySlug,
  getProductsByShop,
  getShopUrlFromMaker,
  hasShop,
  getAllShops,
} from '../shop';
import type { Product } from '@/types/product';

describe('Shop Utilities', () => {
  describe('getShopSlug', () => {
    it('should convert shop name to lowercase slug', () => {
      expect(getShopSlug('Tejidos Sofía')).toBe('tejidos-sofia');
    });

    it('should remove accents', () => {
      expect(getShopSlug('Artesanías de México')).toBe('artesanias-de-mexico');
    });

    it('should replace spaces with hyphens', () => {
      expect(getShopSlug('Alebrijes Don Pedro')).toBe('alebrijes-don-pedro');
    });

    it('should remove special characters', () => {
      // The regex [^a-z0-9-] removes special chars but not spaces converted to hyphens
      expect(getShopSlug('Shop & Store!')).toBe('shop--store');
    });

    it('should handle multiple spaces', () => {
      expect(getShopSlug('Shop   Name')).toBe('shop-name');
    });

    it('should handle empty string', () => {
      expect(getShopSlug('')).toBe('');
    });

    it('should handle Spanish characters', () => {
      expect(getShopSlug('Cerámica y Barro Ñandú')).toBe('ceramica-y-barro-nandu');
    });
  });

  describe('getShopBySlug', () => {
    it('should return shop for valid slug', () => {
      const shop = getShopBySlug('tejidos-sofia');
      expect(shop).not.toBeNull();
      expect(shop?.makerProfile?.shopName).toBe('Tejidos Sofía');
    });

    it('should return shop for another valid slug', () => {
      const shop = getShopBySlug('alebrijes-don-pedro');
      expect(shop).not.toBeNull();
      expect(shop?.makerProfile?.shopName).toBe('Alebrijes Don Pedro');
    });

    it('should return null for invalid slug', () => {
      const shop = getShopBySlug('nonexistent-shop');
      expect(shop).toBeNull();
    });

    it('should handle normalized input', () => {
      const shop = getShopBySlug('Tejidos Sofía');
      expect(shop).not.toBeNull();
    });
  });

  describe('getProductsByShop', () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        slug: 'product-1',
        description: 'Test product',
        price: 100,
        category: 'Joyería',
        state: 'Oaxaca',
        maker: 'Tejidos Sofía',
        images: ['image1.jpg'],
        rating: 4.5,
        reviewCount: 10,
        inStock: true,
      } as Product,
      {
        id: '2',
        name: 'Product 2',
        slug: 'product-2',
        description: 'Test product 2',
        price: 200,
        category: 'Arte',
        state: 'Oaxaca',
        maker: 'Alebrijes Don Pedro',
        images: ['image2.jpg'],
        rating: 5.0,
        reviewCount: 20,
        inStock: true,
      } as Product,
      {
        id: '3',
        name: 'Product 3',
        slug: 'product-3',
        description: 'Test product 3',
        price: 150,
        category: 'Textiles',
        state: 'Oaxaca',
        maker: 'Tejidos Sofía',
        images: ['image3.jpg'],
        rating: 4.8,
        reviewCount: 15,
        inStock: true,
      } as Product,
    ];

    it('should return products for valid shop', () => {
      const products = getProductsByShop('tejidos-sofia', mockProducts);
      expect(products.length).toBe(2);
      expect(products.every((p) => p.maker === 'Tejidos Sofía')).toBe(true);
    });

    it('should return empty array for invalid shop', () => {
      const products = getProductsByShop('nonexistent-shop', mockProducts);
      expect(products).toEqual([]);
    });

    it('should return empty array for empty products array', () => {
      const products = getProductsByShop('tejidos-sofia', []);
      expect(products).toEqual([]);
    });
  });

  describe('getShopUrlFromMaker', () => {
    it('should return shop URL for known maker', () => {
      expect(getShopUrlFromMaker('Taller de Barro Negro')).toBe('/tienda/alebrijes-don-pedro');
    });

    it('should return shop URL for another known maker', () => {
      expect(getShopUrlFromMaker('Plata Oaxaqueña')).toBe('/tienda/tejidos-sofia');
    });

    it('should return null for unknown maker', () => {
      expect(getShopUrlFromMaker('Unknown Maker')).toBeNull();
    });

    it('should return shop URL for company maker', () => {
      expect(getShopUrlFromMaker('Artesanos de Pátzcuaro')).toBe('/tienda/artesanias-de-mexico');
    });
  });

  describe('hasShop', () => {
    it('should return true for makers with shops', () => {
      expect(hasShop('Taller de Barro Negro')).toBe(true);
      expect(hasShop('Plata Oaxaqueña')).toBe(true);
      expect(hasShop('Artesanos de Pátzcuaro')).toBe(true);
    });

    it('should return false for unknown makers', () => {
      expect(hasShop('Unknown Maker')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(hasShop('')).toBe(false);
    });
  });

  describe('getAllShops', () => {
    it('should return array of shops', () => {
      const shops = getAllShops();
      expect(Array.isArray(shops)).toBe(true);
      expect(shops.length).toBeGreaterThan(0);
    });

    it('should return shops with makerProfile', () => {
      const shops = getAllShops();
      expect(shops.every((shop) => shop.makerProfile !== undefined)).toBe(true);
    });

    it('should include expected shops', () => {
      const shops = getAllShops();
      const shopNames = shops.map((s) => s.makerProfile?.shopName);
      expect(shopNames).toContain('Tejidos Sofía');
      expect(shopNames).toContain('Alebrijes Don Pedro');
      expect(shopNames).toContain('Artesanías de México');
    });
  });
});
