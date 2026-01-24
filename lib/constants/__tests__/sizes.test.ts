/**
 * @fileoverview Tests for size constants and utility functions.
 * Tests clothing, shoe, and ring size definitions and helper functions.
 * @module lib/constants/__tests__/sizes.test
 */

import { describe, it, expect } from 'vitest';
import {
  CLOTHING_SIZES,
  CLOTHING_SIZES_INTERNATIONAL,
  SHOE_SIZES_MX,
  RING_SIZES,
  SIZE_REQUIRED_CATEGORIES,
  SHOE_SIZE_SUBCATEGORIES,
  RING_SIZE_SUBCATEGORIES,
  getSizeTypeForProduct,
  getSizesForType,
  productRequiresSize,
} from '../sizes';
import type { SizeOption } from '../sizes';

describe('Size Constants', () => {
  describe('CLOTHING_SIZES', () => {
    it('should contain Mexican clothing sizes', () => {
      const sizeValues = CLOTHING_SIZES.map((s) => s.value);
      expect(sizeValues).toContain('XCH');
      expect(sizeValues).toContain('CH');
      expect(sizeValues).toContain('M');
      expect(sizeValues).toContain('G');
      expect(sizeValues).toContain('XG');
      expect(sizeValues).toContain('XXG');
    });

    it('should have 6 sizes', () => {
      expect(CLOTHING_SIZES).toHaveLength(6);
    });

    it('should have label and description for each size', () => {
      CLOTHING_SIZES.forEach((size: SizeOption) => {
        expect(size.value).toBeDefined();
        expect(size.label).toBeDefined();
        expect(size.description).toBeDefined();
      });
    });

    it('should have correct descriptions', () => {
      const xch = CLOTHING_SIZES.find((s) => s.value === 'XCH');
      expect(xch?.description).toBe('Extra Chica');

      const g = CLOTHING_SIZES.find((s) => s.value === 'G');
      expect(g?.description).toBe('Grande');
    });
  });

  describe('CLOTHING_SIZES_INTERNATIONAL', () => {
    it('should contain international clothing sizes', () => {
      const sizeValues = CLOTHING_SIZES_INTERNATIONAL.map((s) => s.value);
      expect(sizeValues).toContain('XS');
      expect(sizeValues).toContain('S');
      expect(sizeValues).toContain('M');
      expect(sizeValues).toContain('L');
      expect(sizeValues).toContain('XL');
      expect(sizeValues).toContain('XXL');
    });

    it('should have 6 sizes', () => {
      expect(CLOTHING_SIZES_INTERNATIONAL).toHaveLength(6);
    });
  });

  describe('SHOE_SIZES_MX', () => {
    it('should contain Mexican shoe sizes from 22 to 30', () => {
      const sizeValues = SHOE_SIZES_MX.map((s) => s.value);
      expect(sizeValues).toContain('22');
      expect(sizeValues).toContain('25');
      expect(sizeValues).toContain('27');
      expect(sizeValues).toContain('30');
    });

    it('should include half sizes', () => {
      const sizeValues = SHOE_SIZES_MX.map((s) => s.value);
      expect(sizeValues).toContain('22.5');
      expect(sizeValues).toContain('25.5');
      expect(sizeValues).toContain('27.5');
    });

    it('should have 17 sizes', () => {
      expect(SHOE_SIZES_MX).toHaveLength(17);
    });

    it('should have MX prefix in description', () => {
      const size25 = SHOE_SIZES_MX.find((s) => s.value === '25');
      expect(size25?.description).toBe('MX 25');
    });
  });

  describe('RING_SIZES', () => {
    it('should contain ring sizes from 4 to 12', () => {
      const sizeValues = RING_SIZES.map((s) => s.value);
      expect(sizeValues).toContain('4');
      expect(sizeValues).toContain('7');
      expect(sizeValues).toContain('12');
    });

    it('should have 9 sizes', () => {
      expect(RING_SIZES).toHaveLength(9);
    });
  });

  describe('SIZE_REQUIRED_CATEGORIES', () => {
    it('should map Ropa to clothing', () => {
      expect(SIZE_REQUIRED_CATEGORIES['Ropa']).toBe('clothing');
    });

    it('should map clothing subcategories', () => {
      expect(SIZE_REQUIRED_CATEGORIES['huipiles']).toBe('clothing');
      expect(SIZE_REQUIRED_CATEGORIES['blusas']).toBe('clothing');
      expect(SIZE_REQUIRED_CATEGORIES['vestidos']).toBe('clothing');
      expect(SIZE_REQUIRED_CATEGORIES['faldas']).toBe('clothing');
    });

    it('should map rebozos to one_size', () => {
      expect(SIZE_REQUIRED_CATEGORIES['rebozos']).toBe('one_size');
    });
  });

  describe('SHOE_SIZE_SUBCATEGORIES', () => {
    it('should include Huaraches', () => {
      expect(SHOE_SIZE_SUBCATEGORIES).toContain('Huaraches');
      expect(SHOE_SIZE_SUBCATEGORIES).toContain('huaraches');
    });
  });

  describe('RING_SIZE_SUBCATEGORIES', () => {
    it('should include Anillos', () => {
      expect(RING_SIZE_SUBCATEGORIES).toContain('Anillos');
      expect(RING_SIZE_SUBCATEGORIES).toContain('anillos');
    });
  });
});

describe('Size Utility Functions', () => {
  describe('getSizeTypeForProduct', () => {
    it('should return clothing for Ropa category', () => {
      expect(getSizeTypeForProduct('Ropa')).toBe('clothing');
    });

    it('should return clothing for clothing subcategories', () => {
      expect(getSizeTypeForProduct('Ropa', 'blusas')).toBe('clothing');
      expect(getSizeTypeForProduct('Ropa', 'vestidos')).toBe('clothing');
      expect(getSizeTypeForProduct('Ropa', 'faldas')).toBe('clothing');
      expect(getSizeTypeForProduct('Ropa', 'huipiles')).toBe('clothing');
    });

    it('should return one_size for rebozos', () => {
      expect(getSizeTypeForProduct('Ropa', 'rebozos')).toBe('one_size');
    });

    it('should return shoes for Huaraches subcategory', () => {
      expect(getSizeTypeForProduct('Cuero y Piel', 'Huaraches')).toBe('shoes');
      expect(getSizeTypeForProduct('Cuero y Piel', 'huaraches')).toBe('shoes');
    });

    it('should return rings for Anillos subcategory', () => {
      expect(getSizeTypeForProduct('Joyería', 'Anillos')).toBe('rings');
      expect(getSizeTypeForProduct('Joyería', 'anillos')).toBe('rings');
    });

    it('should return null for categories without sizes', () => {
      expect(getSizeTypeForProduct('Arte')).toBeNull();
      expect(getSizeTypeForProduct('Cocina')).toBeNull();
      expect(getSizeTypeForProduct('Decoración del Hogar')).toBeNull();
    });

    it('should return null for jewelry without ring subcategory', () => {
      expect(getSizeTypeForProduct('Joyería', 'collares')).toBeNull();
      expect(getSizeTypeForProduct('Joyería', 'aretes')).toBeNull();
      expect(getSizeTypeForProduct('Joyería', 'pulseras')).toBeNull();
    });

    it('should prioritize subcategory over category', () => {
      // Even if category has sizes, subcategory takes precedence
      expect(getSizeTypeForProduct('Cuero y Piel', 'Huaraches')).toBe('shoes');
    });

    it('should handle undefined subcategory', () => {
      expect(getSizeTypeForProduct('Ropa', undefined)).toBe('clothing');
      expect(getSizeTypeForProduct('Arte', undefined)).toBeNull();
    });
  });

  describe('getSizesForType', () => {
    it('should return clothing sizes for clothing type', () => {
      const sizes = getSizesForType('clothing');
      expect(sizes).toEqual(CLOTHING_SIZES);
      expect(sizes).toHaveLength(6);
    });

    it('should return shoe sizes for shoes type', () => {
      const sizes = getSizesForType('shoes');
      expect(sizes).toEqual(SHOE_SIZES_MX);
      expect(sizes).toHaveLength(17);
    });

    it('should return ring sizes for rings type', () => {
      const sizes = getSizesForType('rings');
      expect(sizes).toEqual(RING_SIZES);
      expect(sizes).toHaveLength(9);
    });

    it('should return one size option for one_size type', () => {
      const sizes = getSizesForType('one_size');
      expect(sizes).toHaveLength(1);
      expect(sizes[0].value).toBe('unica');
      expect(sizes[0].label).toBe('Talla Única');
    });

    it('should return empty array for unknown type', () => {
      // @ts-expect-error testing unknown type
      const sizes = getSizesForType('unknown');
      expect(sizes).toEqual([]);
    });
  });

  describe('productRequiresSize', () => {
    it('should return true for clothing products', () => {
      expect(productRequiresSize('Ropa')).toBe(true);
      expect(productRequiresSize('Ropa', 'blusas')).toBe(true);
      expect(productRequiresSize('Ropa', 'vestidos')).toBe(true);
    });

    it('should return true for shoe products', () => {
      expect(productRequiresSize('Cuero y Piel', 'Huaraches')).toBe(true);
    });

    it('should return true for ring products', () => {
      expect(productRequiresSize('Joyería', 'Anillos')).toBe(true);
    });

    it('should return true for one_size products', () => {
      expect(productRequiresSize('Ropa', 'rebozos')).toBe(true);
    });

    it('should return false for products without sizes', () => {
      expect(productRequiresSize('Arte')).toBe(false);
      expect(productRequiresSize('Cocina')).toBe(false);
      expect(productRequiresSize('Joyería', 'collares')).toBe(false);
    });
  });
});

describe('Size Data Integrity', () => {
  it('should have unique values in CLOTHING_SIZES', () => {
    const values = CLOTHING_SIZES.map((s) => s.value);
    const uniqueValues = new Set(values);
    expect(values.length).toBe(uniqueValues.size);
  });

  it('should have unique values in SHOE_SIZES_MX', () => {
    const values = SHOE_SIZES_MX.map((s) => s.value);
    const uniqueValues = new Set(values);
    expect(values.length).toBe(uniqueValues.size);
  });

  it('should have unique values in RING_SIZES', () => {
    const values = RING_SIZES.map((s) => s.value);
    const uniqueValues = new Set(values);
    expect(values.length).toBe(uniqueValues.size);
  });

  it('shoe sizes should be in ascending order', () => {
    const numericValues = SHOE_SIZES_MX.map((s) => parseFloat(s.value));
    for (let i = 1; i < numericValues.length; i++) {
      expect(numericValues[i]).toBeGreaterThan(numericValues[i - 1]);
    }
  });

  it('ring sizes should be in ascending order', () => {
    const numericValues = RING_SIZES.map((s) => parseInt(s.value, 10));
    for (let i = 1; i < numericValues.length; i++) {
      expect(numericValues[i]).toBeGreaterThan(numericValues[i - 1]);
    }
  });
});
