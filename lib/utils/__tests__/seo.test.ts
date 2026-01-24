import { describe, it, expect } from 'vitest';
import {
  buildTitleFromFilters,
  buildDescriptionFromFilters,
  generateProductsMetadata,
  generateProductListingStructuredData,
} from '../seo';

describe('SEO Utilities', () => {
  describe('buildTitleFromFilters', () => {
    it('should return default title when no filters', () => {
      const title = buildTitleFromFilters({
        categories: [],
        states: [],
      });
      expect(title).toBe('Productos Artesanales Mexicanos | Papalote Market');
    });

    it('should include query in title', () => {
      const title = buildTitleFromFilters({
        categories: [],
        states: [],
        query: 'alebrije',
      });
      expect(title).toContain('Resultados para "alebrije"');
      expect(title).toContain('Papalote Market');
    });

    it('should include categories in title', () => {
      const title = buildTitleFromFilters({
        categories: ['Joyería', 'Arte'],
        states: [],
      });
      expect(title).toContain('Joyería, Arte');
    });

    it('should include states in title', () => {
      const title = buildTitleFromFilters({
        categories: [],
        states: ['Oaxaca', 'Chiapas'],
      });
      expect(title).toContain('de Oaxaca, Chiapas');
    });

    it('should include featured filter in title', () => {
      const title = buildTitleFromFilters({
        categories: [],
        states: [],
        featured: true,
      });
      expect(title).toContain('Destacados');
    });

    it('should include verified filter in title', () => {
      const title = buildTitleFromFilters({
        categories: [],
        states: [],
        verified: true,
      });
      expect(title).toContain('Verificados');
    });

    it('should combine multiple filters in title', () => {
      const title = buildTitleFromFilters({
        categories: ['Joyería'],
        states: ['Oaxaca'],
        featured: true,
        verified: true,
      });
      expect(title).toContain('Joyería');
      expect(title).toContain('Oaxaca');
      expect(title).toContain('Destacados');
      expect(title).toContain('Verificados');
    });
  });

  describe('buildDescriptionFromFilters', () => {
    it('should return default description when no filters', () => {
      const description = buildDescriptionFromFilters({
        categories: [],
        states: [],
      });
      expect(description).toBe('Descubre productos artesanales hechos en México.');
    });

    it('should mention verified products', () => {
      const description = buildDescriptionFromFilters({
        categories: [],
        states: [],
        verified: true,
      });
      expect(description).toContain('productos verificados');
    });

    it('should mention featured products when not verified', () => {
      const description = buildDescriptionFromFilters({
        categories: [],
        states: [],
        featured: true,
      });
      expect(description).toContain('productos destacados');
    });

    it('should include categories in description', () => {
      const description = buildDescriptionFromFilters({
        categories: ['Joyería', 'Textiles'],
        states: [],
      });
      expect(description).toContain('en Joyería, Textiles');
    });

    it('should include states in description', () => {
      const description = buildDescriptionFromFilters({
        categories: [],
        states: ['Oaxaca', 'Chiapas'],
      });
      expect(description).toContain('de Oaxaca, Chiapas');
    });

    it('should include price max in description', () => {
      const description = buildDescriptionFromFilters({
        categories: [],
        states: [],
        priceMax: 500,
      });
      expect(description).toContain('Con precios desde $500');
    });

    it('should always end with hechos en México', () => {
      const description = buildDescriptionFromFilters({
        categories: ['Arte'],
        states: ['Oaxaca'],
      });
      expect(description).toContain('hechos en México.');
    });
  });

  describe('generateProductsMetadata', () => {
    it('should generate metadata with title and description', () => {
      const metadata = generateProductsMetadata({ categories: [], states: [] }, 100);

      expect(metadata.title).toBeDefined();
      expect(metadata.description).toBeDefined();
    });

    it('should include openGraph metadata', () => {
      const metadata = generateProductsMetadata({ categories: ['Joyería'], states: [] }, 50);

      expect(metadata.openGraph).toBeDefined();
      const og = metadata.openGraph as Record<string, unknown>;
      expect(og?.title).toBeDefined();
      expect(og?.description).toBeDefined();
      expect(og?.type).toBe('website');
      expect(og?.locale).toBe('es_MX');
      expect(og?.siteName).toBe('Papalote Market');
    });

    it('should include twitter card metadata', () => {
      const metadata = generateProductsMetadata({ categories: [], states: [] }, 25);

      expect(metadata.twitter).toBeDefined();
      const twitter = metadata.twitter as Record<string, unknown>;
      expect(twitter?.card).toBe('summary_large_image');
      expect(twitter?.title).toBeDefined();
      expect(twitter?.description).toBeDefined();
    });

    it('should include canonical URL', () => {
      const metadata = generateProductsMetadata({ categories: [], states: [] }, 10);

      expect(metadata.alternates?.canonical).toBe('/productos');
    });

    it('should include product count in other metadata', () => {
      const metadata = generateProductsMetadata({ categories: [], states: [] }, 42);

      expect(metadata.other?.['product:count']).toBe('42');
    });
  });

  describe('generateProductListingStructuredData', () => {
    it('should generate CollectionPage structured data', () => {
      const structuredData = generateProductListingStructuredData(
        { categories: [], states: [] },
        100
      );

      expect(structuredData['@context']).toBe('https://schema.org');
      expect(structuredData['@type']).toBe('CollectionPage');
    });

    it('should include name from filters', () => {
      const structuredData = generateProductListingStructuredData(
        { categories: ['Joyería'], states: [] },
        50
      );

      expect(structuredData.name).toContain('Joyería');
    });

    it('should include description from filters', () => {
      const structuredData = generateProductListingStructuredData(
        { categories: [], states: ['Oaxaca'] },
        30
      );

      expect(structuredData.description).toContain('Oaxaca');
    });

    it('should include numberOfItems', () => {
      const structuredData = generateProductListingStructuredData(
        { categories: [], states: [] },
        75
      );

      expect(structuredData.numberOfItems).toBe(75);
    });
  });
});
