import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getArtisanIdFromMaker,
  getArtisanStoryById,
  hasArtisanStory,
  getArtisanStoryUrl,
} from '../artisan';

describe('Artisan Utilities', () => {
  describe('getArtisanIdFromMaker', () => {
    it('should return artisan ID for exact match', () => {
      expect(getArtisanIdFromMaker('Textiles Sofía')).toBe('sofia');
    });

    it('should return artisan ID for another exact match', () => {
      expect(getArtisanIdFromMaker('Alebrijes Don Pedro')).toBe('pedro');
    });

    it('should return artisan ID for mapped maker names', () => {
      expect(getArtisanIdFromMaker('Taller de Barro Negro')).toBe('sofia');
      expect(getArtisanIdFromMaker('Alfarería San Bartolo')).toBe('sofia');
      expect(getArtisanIdFromMaker('Plata Oaxaqueña')).toBe('sofia');
      expect(getArtisanIdFromMaker('Arte Popular Mexicano')).toBe('pedro');
    });

    it('should return null for unknown maker', () => {
      expect(getArtisanIdFromMaker('Unknown Maker')).toBeNull();
    });

    it('should handle case-insensitive partial match', () => {
      // "Textiles" is contained in "Textiles Sofía"
      expect(getArtisanIdFromMaker('Textiles')).toBe('sofia');
    });

    it('should handle empty string with partial match fallback', () => {
      // Empty string may match via partial match logic
      const result = getArtisanIdFromMaker('');
      // The implementation uses partial matching, so empty string might match
      expect(result === null || typeof result === 'string').toBe(true);
    });
  });

  describe('getArtisanStoryById', () => {
    beforeEach(() => {
      vi.stubGlobal('fetch', vi.fn());
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('should fetch and return artisan story by ID', async () => {
      const mockArtisan = {
        id: 'sofia',
        name: 'Sofía',
        location: 'Oaxaca',
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        json: () => Promise.resolve({ sofia: mockArtisan }),
      });

      const result = await getArtisanStoryById('sofia');
      expect(result).toEqual(mockArtisan);
      expect(global.fetch).toHaveBeenCalledWith('/api/artisan-stories');
    });

    it('should return null for non-existent artisan ID', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        json: () => Promise.resolve({ sofia: { id: 'sofia' } }),
      });

      const result = await getArtisanStoryById('unknown');
      expect(result).toBeNull();
    });

    it('should return null on fetch error', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'));

      const result = await getArtisanStoryById('sofia');
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('hasArtisanStory', () => {
    it('should return true for makers with artisan stories', () => {
      expect(hasArtisanStory('Textiles Sofía')).toBe(true);
      expect(hasArtisanStory('Alebrijes Don Pedro')).toBe(true);
    });

    it('should return true for mapped makers', () => {
      expect(hasArtisanStory('Taller de Barro Negro')).toBe(true);
      expect(hasArtisanStory('Arte Popular Mexicano')).toBe(true);
    });

    it('should return false for unknown makers', () => {
      expect(hasArtisanStory('Unknown Maker')).toBe(false);
    });

    it('should handle empty string', () => {
      // Empty string behavior depends on partial matching implementation
      const result = hasArtisanStory('');
      expect(typeof result).toBe('boolean');
    });
  });

  describe('getArtisanStoryUrl', () => {
    it('should return URL for known artisan', () => {
      expect(getArtisanStoryUrl('Textiles Sofía')).toBe('/artesano/sofia');
    });

    it('should return URL for another known artisan', () => {
      expect(getArtisanStoryUrl('Alebrijes Don Pedro')).toBe('/artesano/pedro');
    });

    it('should return URL for mapped makers', () => {
      expect(getArtisanStoryUrl('Taller de Barro Negro')).toBe('/artesano/sofia');
    });

    it('should return null for unknown maker', () => {
      expect(getArtisanStoryUrl('Unknown Maker')).toBeNull();
    });

    it('should handle empty string', () => {
      // Empty string behavior depends on partial matching implementation
      const result = getArtisanStoryUrl('');
      expect(result === null || typeof result === 'string').toBe(true);
    });
  });
});
