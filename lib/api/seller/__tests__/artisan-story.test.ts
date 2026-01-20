import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getArtisanStoryByEmail,
  getArtisanStoryById,
  getAllArtisanStories,
} from '../artisan-story';

describe('Artisan Story API', () => {
  const mockArtisanData = {
    sofia: {
      id: 'sofia',
      name: 'Sofía',
      location: 'Oaxaca',
      craft: 'Textiles',
    },
    pedro: {
      id: 'pedro',
      name: 'Pedro',
      location: 'Oaxaca',
      craft: 'Alebrijes',
    },
  };

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('getArtisanStoryByEmail', () => {
    it('should fetch artisan story by email', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        json: () => Promise.resolve(mockArtisanData),
      });

      const result = await getArtisanStoryByEmail('sofia@ejemplo.com');
      expect(result).toEqual(mockArtisanData.sofia);
      expect(global.fetch).toHaveBeenCalledWith('/api/artisan-stories');
    });

    it('should extract artisan ID from email correctly', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        json: () => Promise.resolve(mockArtisanData),
      });

      const result = await getArtisanStoryByEmail('pedro@otro-dominio.com');
      expect(result).toEqual(mockArtisanData.pedro);
    });

    it('should return null for non-existent artisan', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        json: () => Promise.resolve(mockArtisanData),
      });

      const result = await getArtisanStoryByEmail('unknown@ejemplo.com');
      expect(result).toBeNull();
    });

    it('should return null on fetch error', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'));

      const result = await getArtisanStoryByEmail('sofia@ejemplo.com');
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('getArtisanStoryById', () => {
    it('should fetch artisan story by ID', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        json: () => Promise.resolve(mockArtisanData),
      });

      const result = await getArtisanStoryById('sofia');
      expect(result).toEqual(mockArtisanData.sofia);
      expect(global.fetch).toHaveBeenCalledWith('/api/artisan-stories');
    });

    it('should return null for non-existent ID', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        json: () => Promise.resolve(mockArtisanData),
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

  describe('getAllArtisanStories', () => {
    it('should fetch all artisan stories', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        json: () => Promise.resolve(mockArtisanData),
      });

      const result = await getAllArtisanStories();
      expect(result).toEqual(mockArtisanData);
      expect(global.fetch).toHaveBeenCalledWith('/api/artisan-stories');
    });

    it('should return empty object on fetch error', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'));

      const result = await getAllArtisanStories();
      expect(result).toEqual({});
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
});
