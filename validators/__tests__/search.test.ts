import { describe, it, expect } from 'vitest';
import { searchQuerySchema, filterSchema } from '../search';

describe('Search Validators', () => {
  describe('searchQuerySchema', () => {
    it('should accept valid search query', () => {
      const result = searchQuerySchema.safeParse({
        q: 'alebrije',
      });
      expect(result.success).toBe(true);
    });

    it('should default page to 1', () => {
      const result = searchQuerySchema.safeParse({
        q: 'alebrije',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
      }
    });

    it('should default limit to 20', () => {
      const result = searchQuerySchema.safeParse({
        q: 'alebrije',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.limit).toBe(20);
      }
    });

    it('should accept full search parameters', () => {
      const result = searchQuerySchema.safeParse({
        q: 'textiles oaxaca',
        category: 'Textiles',
        state: 'Oaxaca',
        minPrice: 100,
        maxPrice: 5000,
        sortBy: 'price-asc',
        page: 2,
        limit: 50,
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty search query', () => {
      const result = searchQuerySchema.safeParse({
        q: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject search query exceeding 100 characters', () => {
      const result = searchQuerySchema.safeParse({
        q: 'A'.repeat(101),
      });
      expect(result.success).toBe(false);
    });

    it('should accept all valid sort options', () => {
      const sortOptions = ['relevance', 'price-asc', 'price-desc', 'rating-desc', 'newest'];
      sortOptions.forEach((sortBy) => {
        const result = searchQuerySchema.safeParse({
          q: 'test',
          sortBy,
        });
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid sort option', () => {
      const result = searchQuerySchema.safeParse({
        q: 'test',
        sortBy: 'invalid-sort',
      });
      expect(result.success).toBe(false);
    });

    it('should reject negative minPrice', () => {
      const result = searchQuerySchema.safeParse({
        q: 'test',
        minPrice: -100,
      });
      expect(result.success).toBe(false);
    });

    it('should reject non-positive maxPrice', () => {
      const result = searchQuerySchema.safeParse({
        q: 'test',
        maxPrice: 0,
      });
      expect(result.success).toBe(false);
    });

    it('should reject minPrice greater than maxPrice', () => {
      const result = searchQuerySchema.safeParse({
        q: 'test',
        minPrice: 1000,
        maxPrice: 500,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'El precio mínimo debe ser menor que el máximo'
        );
      }
    });

    it('should accept minPrice equal to maxPrice', () => {
      const result = searchQuerySchema.safeParse({
        q: 'test',
        minPrice: 500,
        maxPrice: 500,
      });
      expect(result.success).toBe(true);
    });

    it('should reject negative page', () => {
      const result = searchQuerySchema.safeParse({
        q: 'test',
        page: -1,
      });
      expect(result.success).toBe(false);
    });

    it('should reject zero page', () => {
      const result = searchQuerySchema.safeParse({
        q: 'test',
        page: 0,
      });
      expect(result.success).toBe(false);
    });

    it('should reject limit exceeding 100', () => {
      const result = searchQuerySchema.safeParse({
        q: 'test',
        limit: 101,
      });
      expect(result.success).toBe(false);
    });

    it('should reject non-integer page', () => {
      const result = searchQuerySchema.safeParse({
        q: 'test',
        page: 1.5,
      });
      expect(result.success).toBe(false);
    });

    it('should accept boundary values', () => {
      const result = searchQuerySchema.safeParse({
        q: 'test',
        minPrice: 0,
        maxPrice: 1,
        page: 1,
        limit: 100,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('filterSchema', () => {
    it('should accept empty filter (all optional)', () => {
      const result = filterSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it('should accept categories array', () => {
      const result = filterSchema.safeParse({
        categories: ['Textiles', 'Cerámica', 'Madera'],
      });
      expect(result.success).toBe(true);
    });

    it('should accept states array', () => {
      const result = filterSchema.safeParse({
        states: ['Oaxaca', 'Chiapas', 'Michoacán'],
      });
      expect(result.success).toBe(true);
    });

    it('should accept valid price range tuple', () => {
      const result = filterSchema.safeParse({
        priceRange: [100, 5000],
      });
      expect(result.success).toBe(true);
    });

    it('should accept minRating between 0 and 5', () => {
      [0, 1, 2, 3, 4, 4.5, 5].forEach((minRating) => {
        const result = filterSchema.safeParse({ minRating });
        expect(result.success).toBe(true);
      });
    });

    it('should reject minRating below 0', () => {
      const result = filterSchema.safeParse({
        minRating: -1,
      });
      expect(result.success).toBe(false);
    });

    it('should reject minRating above 5', () => {
      const result = filterSchema.safeParse({
        minRating: 6,
      });
      expect(result.success).toBe(false);
    });

    it('should accept boolean filters', () => {
      const result = filterSchema.safeParse({
        inStock: true,
        verified: true,
        featured: false,
      });
      expect(result.success).toBe(true);
    });

    it('should accept full filter object', () => {
      const result = filterSchema.safeParse({
        categories: ['Textiles'],
        states: ['Oaxaca'],
        priceRange: [0, 10000],
        minRating: 4,
        inStock: true,
        verified: true,
        featured: false,
      });
      expect(result.success).toBe(true);
    });

    it('should reject negative price in range', () => {
      const result = filterSchema.safeParse({
        priceRange: [-100, 5000],
      });
      expect(result.success).toBe(false);
    });

    it('should reject non-positive max price in range', () => {
      const result = filterSchema.safeParse({
        priceRange: [0, 0],
      });
      expect(result.success).toBe(false);
    });

    it('should accept empty arrays for categories and states', () => {
      const result = filterSchema.safeParse({
        categories: [],
        states: [],
      });
      expect(result.success).toBe(true);
    });
  });
});
