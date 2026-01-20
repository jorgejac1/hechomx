import { describe, it, expect } from 'vitest';
import * as libExports from '../index';

describe('lib/index.ts exports', () => {
  describe('Constants exports', () => {
    it('should export ROUTES', () => {
      expect(libExports.ROUTES).toBeDefined();
      expect(libExports.ROUTES.HOME).toBe('/');
    });

    it('should export API_ROUTES', () => {
      expect(libExports.API_ROUTES).toBeDefined();
      expect(libExports.API_ROUTES.PRODUCTS).toBe('/api/products');
    });

    it('should export FILTER_PARAM_NAMES', () => {
      expect(libExports.FILTER_PARAM_NAMES).toBeDefined();
      expect(libExports.FILTER_PARAM_NAMES.CATEGORY).toBe('categoria');
    });

    it('should export CATEGORIES', () => {
      expect(libExports.CATEGORIES).toBeDefined();
      expect(libExports.CATEGORIES.TEXTILES).toBe('Textiles y Ropa');
    });

    it('should export MEXICAN_STATES', () => {
      expect(libExports.MEXICAN_STATES).toBeDefined();
      expect(Array.isArray(libExports.MEXICAN_STATES)).toBe(true);
    });

    it('should export FILTER_PRESETS', () => {
      expect(libExports.FILTER_PRESETS).toBeDefined();
      expect(Array.isArray(libExports.FILTER_PRESETS)).toBe(true);
    });
  });

  describe('Utility exports', () => {
    it('should export currency utilities', () => {
      expect(libExports.formatCurrency).toBeDefined();
      expect(typeof libExports.formatCurrency).toBe('function');
    });

    it('should export string utilities', () => {
      expect(libExports.capitalize).toBeDefined();
      expect(typeof libExports.capitalize).toBe('function');
    });

    it('should export date utilities', () => {
      expect(libExports.formatDate).toBeDefined();
      expect(typeof libExports.formatDate).toBe('function');
    });

    it('should export filter utilities', () => {
      expect(libExports.buildProductsUrl).toBeDefined();
      expect(typeof libExports.buildProductsUrl).toBe('function');
    });

    it('should export analytics utilities', () => {
      expect(libExports.trackFilterUsage).toBeDefined();
      expect(typeof libExports.trackFilterUsage).toBe('function');
    });

    it('should export SEO utilities', () => {
      expect(libExports.buildTitleFromFilters).toBeDefined();
      expect(typeof libExports.buildTitleFromFilters).toBe('function');
    });

    it('should export season utilities', () => {
      expect(libExports.getCurrentSeasonalTheme).toBeDefined();
      expect(typeof libExports.getCurrentSeasonalTheme).toBe('function');
    });

    it('should export URL utilities', () => {
      expect(libExports.parseQueryString).toBeDefined();
      expect(typeof libExports.parseQueryString).toBe('function');
    });
  });

  describe('Artisan utilities exports', () => {
    it('should export getArtisanIdFromMaker', () => {
      expect(libExports.getArtisanIdFromMaker).toBeDefined();
      expect(typeof libExports.getArtisanIdFromMaker).toBe('function');
    });

    it('should export hasArtisanStory', () => {
      expect(libExports.hasArtisanStory).toBeDefined();
      expect(typeof libExports.hasArtisanStory).toBe('function');
    });

    it('should export getArtisanStoryUrl', () => {
      expect(libExports.getArtisanStoryUrl).toBeDefined();
      expect(typeof libExports.getArtisanStoryUrl).toBe('function');
    });

    it('should export getArtisanStoryById', () => {
      expect(libExports.getArtisanStoryById).toBeDefined();
      expect(typeof libExports.getArtisanStoryById).toBe('function');
    });
  });

  describe('Shop utilities exports', () => {
    it('should export getShopSlug', () => {
      expect(libExports.getShopSlug).toBeDefined();
      expect(typeof libExports.getShopSlug).toBe('function');
    });

    it('should export getShopBySlug', () => {
      expect(libExports.getShopBySlug).toBeDefined();
      expect(typeof libExports.getShopBySlug).toBe('function');
    });

    it('should export getShopUrlFromMaker', () => {
      expect(libExports.getShopUrlFromMaker).toBeDefined();
      expect(typeof libExports.getShopUrlFromMaker).toBe('function');
    });

    it('should export hasShop', () => {
      expect(libExports.hasShop).toBeDefined();
      expect(typeof libExports.hasShop).toBe('function');
    });

    it('should export getAllShops', () => {
      expect(libExports.getAllShops).toBeDefined();
      expect(typeof libExports.getAllShops).toBe('function');
    });
  });

  describe('API exports', () => {
    it('should export getArtisanStoryByEmail', () => {
      expect(libExports.getArtisanStoryByEmail).toBeDefined();
      expect(typeof libExports.getArtisanStoryByEmail).toBe('function');
    });

    it('should export getAllArtisanStories', () => {
      expect(libExports.getAllArtisanStories).toBeDefined();
      expect(typeof libExports.getAllArtisanStories).toBe('function');
    });
  });
});
