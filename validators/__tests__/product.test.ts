import { describe, it, expect } from 'vitest';
import {
  productSchema,
  productQuerySchema,
  productReviewSchema,
  validatePriceParam,
  validateSortParam,
  validateBooleanParam,
  validateStateParam,
} from '../product';

describe('Product Validators', () => {
  describe('productSchema', () => {
    const validProduct = {
      id: 'prod-123',
      name: 'Alebrije de Madera',
      description: 'Hermoso alebrije tallado a mano en madera de copal',
      price: 1500,
      category: 'Artesanías',
      state: 'Oaxaca',
      maker: 'Artesano Juan',
      images: ['https://example.com/image1.jpg'],
    };

    it('should accept valid product data', () => {
      const result = productSchema.safeParse(validProduct);
      expect(result.success).toBe(true);
    });

    it('should default currency to MXN', () => {
      const result = productSchema.safeParse(validProduct);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.currency).toBe('MXN');
      }
    });

    it('should default inStock to true', () => {
      const result = productSchema.safeParse(validProduct);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.inStock).toBe(true);
      }
    });

    it('should accept product with optional fields', () => {
      const result = productSchema.safeParse({
        ...validProduct,
        subcategory: 'Alebrijes',
        subSubcategory: 'Madera',
        videos: ['https://example.com/video.mp4'],
        featured: true,
        verified: true,
        rating: 4.5,
        reviewCount: 10,
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty id', () => {
      const result = productSchema.safeParse({
        ...validProduct,
        id: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject short name', () => {
      const result = productSchema.safeParse({
        ...validProduct,
        name: 'AB',
      });
      expect(result.success).toBe(false);
    });

    it('should reject short description', () => {
      const result = productSchema.safeParse({
        ...validProduct,
        description: 'Corto',
      });
      expect(result.success).toBe(false);
    });

    it('should reject zero price', () => {
      const result = productSchema.safeParse({
        ...validProduct,
        price: 0,
      });
      expect(result.success).toBe(false);
    });

    it('should reject negative price', () => {
      const result = productSchema.safeParse({
        ...validProduct,
        price: -100,
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty images array', () => {
      const result = productSchema.safeParse({
        ...validProduct,
        images: [],
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid image URLs', () => {
      const result = productSchema.safeParse({
        ...validProduct,
        images: ['not-a-url'],
      });
      expect(result.success).toBe(false);
    });

    it('should reject rating below 0', () => {
      const result = productSchema.safeParse({
        ...validProduct,
        rating: -1,
      });
      expect(result.success).toBe(false);
    });

    it('should reject rating above 5', () => {
      const result = productSchema.safeParse({
        ...validProduct,
        rating: 6,
      });
      expect(result.success).toBe(false);
    });

    it('should accept rating from 0 to 5', () => {
      [0, 1, 2.5, 4.5, 5].forEach((rating) => {
        const result = productSchema.safeParse({
          ...validProduct,
          rating,
        });
        expect(result.success).toBe(true);
      });
    });
  });

  describe('productQuerySchema', () => {
    it('should accept empty query (all optional)', () => {
      const result = productQuerySchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it('should accept valid query parameters', () => {
      const result = productQuerySchema.safeParse({
        categoria: 'Textiles',
        estado: 'Oaxaca',
        q: 'alebrije',
        ordenar: 'price-asc',
        pagina: '2',
      });
      expect(result.success).toBe(true);
    });

    it('should transform pagina to number', () => {
      const result = productQuerySchema.safeParse({
        pagina: '5',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.pagina).toBe(5);
      }
    });

    it('should accept all valid sort options', () => {
      const sortOptions = [
        'relevance',
        'price-asc',
        'price-desc',
        'rating-desc',
        'newest',
        'popular',
      ];
      sortOptions.forEach((ordenar) => {
        const result = productQuerySchema.safeParse({ ordenar });
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid sort option', () => {
      const result = productQuerySchema.safeParse({
        ordenar: 'invalid-sort',
      });
      expect(result.success).toBe(false);
    });

    it('should accept boolean params as si/no', () => {
      const result = productQuerySchema.safeParse({
        destacado: 'si',
        verificado: 'no',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid boolean params', () => {
      const result = productQuerySchema.safeParse({
        destacado: 'true',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('productReviewSchema', () => {
    const validReview = {
      rating: 5,
      comment: 'Excelente producto, muy bien hecho y de gran calidad.',
    };

    it('should accept valid review', () => {
      const result = productReviewSchema.safeParse(validReview);
      expect(result.success).toBe(true);
    });

    it('should accept review with title', () => {
      const result = productReviewSchema.safeParse({
        ...validReview,
        title: 'Muy recomendado',
      });
      expect(result.success).toBe(true);
    });

    it('should reject rating below 1', () => {
      const result = productReviewSchema.safeParse({
        ...validReview,
        rating: 0,
      });
      expect(result.success).toBe(false);
    });

    it('should reject rating above 5', () => {
      const result = productReviewSchema.safeParse({
        ...validReview,
        rating: 6,
      });
      expect(result.success).toBe(false);
    });

    it('should accept ratings from 1 to 5', () => {
      [1, 2, 3, 4, 5].forEach((rating) => {
        const result = productReviewSchema.safeParse({
          ...validReview,
          rating,
        });
        expect(result.success).toBe(true);
      });
    });

    it('should reject short comment', () => {
      const result = productReviewSchema.safeParse({
        ...validReview,
        comment: 'Corto',
      });
      expect(result.success).toBe(false);
    });

    it('should reject comment exceeding 1000 characters', () => {
      const result = productReviewSchema.safeParse({
        ...validReview,
        comment: 'A'.repeat(1001),
      });
      expect(result.success).toBe(false);
    });

    it('should reject title exceeding 100 characters', () => {
      const result = productReviewSchema.safeParse({
        ...validReview,
        title: 'A'.repeat(101),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('validatePriceParam', () => {
    it('should return null for null input', () => {
      expect(validatePriceParam(null)).toBeNull();
    });

    it('should return null for empty string', () => {
      expect(validatePriceParam('')).toBeNull();
    });

    it('should parse valid price', () => {
      expect(validatePriceParam('100')).toBe(100);
    });

    it('should return null for negative price', () => {
      expect(validatePriceParam('-100')).toBeNull();
    });

    it('should return null for price above 1000000', () => {
      expect(validatePriceParam('1000001')).toBeNull();
    });

    it('should accept price at boundary (0)', () => {
      expect(validatePriceParam('0')).toBe(0);
    });

    it('should accept price at boundary (1000000)', () => {
      expect(validatePriceParam('1000000')).toBe(1000000);
    });

    it('should return null for non-numeric string', () => {
      expect(validatePriceParam('abc')).toBeNull();
    });
  });

  describe('validateSortParam', () => {
    it('should return relevance for null input', () => {
      expect(validateSortParam(null)).toBe('relevance');
    });

    it('should return relevance for invalid sort', () => {
      expect(validateSortParam('invalid')).toBe('relevance');
    });

    it('should accept all valid sort options', () => {
      expect(validateSortParam('relevance')).toBe('relevance');
      expect(validateSortParam('price-asc')).toBe('price-asc');
      expect(validateSortParam('price-desc')).toBe('price-desc');
      expect(validateSortParam('rating-desc')).toBe('rating-desc');
      expect(validateSortParam('newest')).toBe('newest');
      expect(validateSortParam('popular')).toBe('popular');
    });
  });

  describe('validateBooleanParam', () => {
    it('should return null for null input', () => {
      expect(validateBooleanParam(null)).toBeNull();
    });

    it('should return true for "si"', () => {
      expect(validateBooleanParam('si')).toBe(true);
    });

    it('should return false for "no"', () => {
      expect(validateBooleanParam('no')).toBe(false);
    });

    it('should return false for other values', () => {
      expect(validateBooleanParam('yes')).toBe(false);
      expect(validateBooleanParam('true')).toBe(false);
    });
  });

  describe('validateStateParam', () => {
    it('should return null for null input', () => {
      expect(validateStateParam(null)).toBeNull();
    });

    it('should return state for valid Mexican state', () => {
      expect(validateStateParam('Oaxaca')).toBe('Oaxaca');
      expect(validateStateParam('Chiapas')).toBe('Chiapas');
      expect(validateStateParam('Ciudad de México')).toBe('Ciudad de México');
      expect(validateStateParam('Nuevo León')).toBe('Nuevo León');
    });

    it('should return null for invalid state', () => {
      expect(validateStateParam('California')).toBeNull();
      expect(validateStateParam('Texas')).toBeNull();
      expect(validateStateParam('Invalid State')).toBeNull();
    });

    it('should be case-sensitive', () => {
      expect(validateStateParam('oaxaca')).toBeNull();
      expect(validateStateParam('OAXACA')).toBeNull();
    });
  });
});
