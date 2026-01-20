import { describe, it, expect } from 'vitest';
import {
  CATEGORIES,
  CATEGORY_ICONS,
  CATEGORY_COLORS,
  CATEGORY_OPTIONS,
  getSubcategoriesByCategory,
  getCategoryNames,
} from '../categories';

describe('Categories Constants', () => {
  describe('CATEGORIES', () => {
    it('should contain all expected categories', () => {
      expect(CATEGORIES.TEXTILES).toBe('Textiles y Ropa');
      expect(CATEGORIES.CERAMICA).toBe('Cerámica y Alfarería');
      expect(CATEGORIES.JOYERIA).toBe('Joyería');
      expect(CATEGORIES.MADERA).toBe('Madera y Tallado');
      expect(CATEGORIES.CUERO).toBe('Cuero y Piel');
      expect(CATEGORIES.PAPEL).toBe('Papel y Cartón');
      expect(CATEGORIES.METAL).toBe('Metalistería');
      expect(CATEGORIES.VIDRIO).toBe('Vidrio y Cristal');
    });

    it('should have 8 categories', () => {
      expect(Object.keys(CATEGORIES)).toHaveLength(8);
    });
  });

  describe('CATEGORY_ICONS', () => {
    it('should have icon for each category', () => {
      expect(CATEGORY_ICONS[CATEGORIES.TEXTILES]).toBe('🧵');
      expect(CATEGORY_ICONS[CATEGORIES.CERAMICA]).toBe('🏺');
      expect(CATEGORY_ICONS[CATEGORIES.JOYERIA]).toBe('💍');
      expect(CATEGORY_ICONS[CATEGORIES.MADERA]).toBe('🪵');
      expect(CATEGORY_ICONS[CATEGORIES.CUERO]).toBe('👜');
      expect(CATEGORY_ICONS[CATEGORIES.PAPEL]).toBe('📄');
      expect(CATEGORY_ICONS[CATEGORIES.METAL]).toBe('⚒️');
      expect(CATEGORY_ICONS[CATEGORIES.VIDRIO]).toBe('🔮');
    });
  });

  describe('CATEGORY_COLORS', () => {
    it('should have color classes for each category', () => {
      expect(CATEGORY_COLORS[CATEGORIES.TEXTILES]).toBe('bg-purple-100 text-purple-700');
      expect(CATEGORY_COLORS[CATEGORIES.CERAMICA]).toBe('bg-orange-100 text-orange-700');
      expect(CATEGORY_COLORS[CATEGORIES.JOYERIA]).toBe('bg-pink-100 text-pink-700');
      expect(CATEGORY_COLORS[CATEGORIES.MADERA]).toBe('bg-amber-100 text-amber-700');
      expect(CATEGORY_COLORS[CATEGORIES.CUERO]).toBe('bg-yellow-100 text-yellow-700');
      expect(CATEGORY_COLORS[CATEGORIES.PAPEL]).toBe('bg-blue-100 text-blue-700');
      expect(CATEGORY_COLORS[CATEGORIES.METAL]).toBe('bg-gray-100 text-gray-700');
      expect(CATEGORY_COLORS[CATEGORIES.VIDRIO]).toBe('bg-cyan-100 text-cyan-700');
    });
  });

  describe('CATEGORY_OPTIONS', () => {
    it('should have 8 category options', () => {
      expect(CATEGORY_OPTIONS).toHaveLength(8);
    });

    it('should have name and subcategories for each option', () => {
      CATEGORY_OPTIONS.forEach((option) => {
        expect(option.name).toBeDefined();
        expect(Array.isArray(option.subcategories)).toBe(true);
        expect(option.subcategories.length).toBeGreaterThan(0);
      });
    });

    it('should have textiles subcategories', () => {
      const textiles = CATEGORY_OPTIONS.find((c) => c.name === CATEGORIES.TEXTILES);
      expect(textiles?.subcategories).toContain('Sarapes y Rebozos');
      expect(textiles?.subcategories).toContain('Huipiles y Vestimenta');
    });

    it('should have joyería subcategories', () => {
      const joyeria = CATEGORY_OPTIONS.find((c) => c.name === CATEGORIES.JOYERIA);
      expect(joyeria?.subcategories).toContain('Plata');
      expect(joyeria?.subcategories).toContain('Filigrana');
      expect(joyeria?.subcategories).toContain('Collares');
    });
  });

  describe('getSubcategoriesByCategory', () => {
    it('should return subcategories for valid category', () => {
      const subcategories = getSubcategoriesByCategory(CATEGORIES.TEXTILES);
      expect(Array.isArray(subcategories)).toBe(true);
      expect(subcategories).toContain('Sarapes y Rebozos');
    });

    it('should return subcategories for joyería', () => {
      const subcategories = getSubcategoriesByCategory(CATEGORIES.JOYERIA);
      expect(subcategories).toContain('Plata');
      expect(subcategories).toContain('Anillos');
    });

    it('should return empty array for invalid category', () => {
      const subcategories = getSubcategoriesByCategory('Invalid Category');
      expect(subcategories).toEqual([]);
    });

    it('should return empty array for empty string', () => {
      const subcategories = getSubcategoriesByCategory('');
      expect(subcategories).toEqual([]);
    });
  });

  describe('getCategoryNames', () => {
    it('should return all category names', () => {
      const names = getCategoryNames();
      expect(Array.isArray(names)).toBe(true);
      expect(names).toHaveLength(8);
    });

    it('should include all categories', () => {
      const names = getCategoryNames();
      expect(names).toContain(CATEGORIES.TEXTILES);
      expect(names).toContain(CATEGORIES.CERAMICA);
      expect(names).toContain(CATEGORIES.JOYERIA);
      expect(names).toContain(CATEGORIES.MADERA);
      expect(names).toContain(CATEGORIES.CUERO);
      expect(names).toContain(CATEGORIES.PAPEL);
      expect(names).toContain(CATEGORIES.METAL);
      expect(names).toContain(CATEGORIES.VIDRIO);
    });
  });
});
