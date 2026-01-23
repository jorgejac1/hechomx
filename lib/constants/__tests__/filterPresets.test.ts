import { describe, it, expect } from 'vitest';
import {
  FILTER_PRESETS,
  getFilterPreset,
  matchesPreset,
  type FilterPreset,
} from '../filterPresets';
import { FILTER_PARAM_NAMES } from '../filters';

describe('Filter Presets Constants', () => {
  describe('FILTER_PRESETS', () => {
    it('should contain expected presets', () => {
      const presetIds = FILTER_PRESETS.map((p) => p.id);
      expect(presetIds).toContain('popular');
      expect(presetIds).toContain('budget');
      expect(presetIds).toContain('premium');
      expect(presetIds).toContain('featured');
      expect(presetIds).toContain('new-arrivals');
    });

    it('should have 5 presets', () => {
      expect(FILTER_PRESETS).toHaveLength(5);
    });

    it('should have required properties for each preset', () => {
      FILTER_PRESETS.forEach((preset: FilterPreset) => {
        expect(preset.id).toBeDefined();
        expect(preset.name).toBeDefined();
        expect(preset.description).toBeDefined();
        expect(preset.icon).toBeDefined();
        expect(preset.params).toBeDefined();
        expect(typeof preset.params).toBe('object');
      });
    });

    it('should have correct params for popular preset', () => {
      const popular = FILTER_PRESETS.find((p) => p.id === 'popular');
      expect(popular?.params[FILTER_PARAM_NAMES.SORT]).toBe('popular');
      expect(popular?.params[FILTER_PARAM_NAMES.VERIFIED]).toBe('si');
    });

    it('should have correct params for budget preset', () => {
      const budget = FILTER_PRESETS.find((p) => p.id === 'budget');
      expect(budget?.params[FILTER_PARAM_NAMES.SORT]).toBe('price-asc');
      expect(budget?.params[FILTER_PARAM_NAMES.PRICE]).toBe('1000');
    });

    it('should have correct params for premium preset', () => {
      const premium = FILTER_PRESETS.find((p) => p.id === 'premium');
      expect(premium?.params[FILTER_PARAM_NAMES.SORT]).toBe('rating-desc');
      expect(premium?.params[FILTER_PARAM_NAMES.VERIFIED]).toBe('si');
      expect(premium?.params[FILTER_PARAM_NAMES.FEATURED]).toBe('si');
    });

    it('should have correct params for featured preset', () => {
      const featured = FILTER_PRESETS.find((p) => p.id === 'featured');
      expect(featured?.params[FILTER_PARAM_NAMES.FEATURED]).toBe('si');
      expect(featured?.params[FILTER_PARAM_NAMES.IN_STOCK]).toBe('si');
    });

    it('should have correct params for new-arrivals preset', () => {
      const newArrivals = FILTER_PRESETS.find((p) => p.id === 'new-arrivals');
      expect(newArrivals?.params[FILTER_PARAM_NAMES.SORT]).toBe('newest');
      expect(newArrivals?.params[FILTER_PARAM_NAMES.IN_STOCK]).toBe('si');
    });
  });

  describe('getFilterPreset', () => {
    it('should return preset by ID', () => {
      const popular = getFilterPreset('popular');
      expect(popular).toBeDefined();
      expect(popular?.id).toBe('popular');
      expect(popular?.name).toBe('Más Populares');
    });

    it('should return budget preset', () => {
      const budget = getFilterPreset('budget');
      expect(budget?.id).toBe('budget');
      expect(budget?.name).toBe('Económicos');
    });

    it('should return premium preset', () => {
      const premium = getFilterPreset('premium');
      expect(premium?.id).toBe('premium');
      expect(premium?.name).toBe('Premium');
    });

    it('should return undefined for invalid ID', () => {
      const invalid = getFilterPreset('nonexistent');
      expect(invalid).toBeUndefined();
    });

    it('should return undefined for empty string', () => {
      const empty = getFilterPreset('');
      expect(empty).toBeUndefined();
    });
  });

  describe('matchesPreset', () => {
    it('should return true when params match preset', () => {
      const params = new URLSearchParams();
      params.set(FILTER_PARAM_NAMES.SORT, 'popular');
      params.set(FILTER_PARAM_NAMES.VERIFIED, 'si');

      const popular = FILTER_PRESETS.find((p) => p.id === 'popular')!;
      expect(matchesPreset(params, popular)).toBe(true);
    });

    it('should return true for budget preset match', () => {
      const params = new URLSearchParams();
      params.set(FILTER_PARAM_NAMES.SORT, 'price-asc');
      params.set(FILTER_PARAM_NAMES.PRICE, '1000');

      const budget = FILTER_PRESETS.find((p) => p.id === 'budget')!;
      expect(matchesPreset(params, budget)).toBe(true);
    });

    it('should return false when params do not match', () => {
      const params = new URLSearchParams();
      params.set(FILTER_PARAM_NAMES.SORT, 'newest');

      const popular = FILTER_PRESETS.find((p) => p.id === 'popular')!;
      expect(matchesPreset(params, popular)).toBe(false);
    });

    it('should return false when some params are missing', () => {
      const params = new URLSearchParams();
      params.set(FILTER_PARAM_NAMES.SORT, 'popular');
      // Missing verified param

      const popular = FILTER_PRESETS.find((p) => p.id === 'popular')!;
      expect(matchesPreset(params, popular)).toBe(false);
    });

    it('should return false when extra params are present', () => {
      const params = new URLSearchParams();
      params.set(FILTER_PARAM_NAMES.SORT, 'popular');
      params.set(FILTER_PARAM_NAMES.VERIFIED, 'si');
      params.set(FILTER_PARAM_NAMES.CATEGORY, 'Joyería'); // Extra param

      const popular = FILTER_PRESETS.find((p) => p.id === 'popular')!;
      // Should return false because extra params mean the user has customized the filters
      expect(matchesPreset(params, popular)).toBe(false);
    });

    it('should return false when values do not match', () => {
      const params = new URLSearchParams();
      params.set(FILTER_PARAM_NAMES.SORT, 'popular');
      params.set(FILTER_PARAM_NAMES.VERIFIED, 'no'); // Wrong value

      const popular = FILTER_PRESETS.find((p) => p.id === 'popular')!;
      expect(matchesPreset(params, popular)).toBe(false);
    });
  });
});
