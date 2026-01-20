import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  trackFilterUsage,
  trackSearchQuery,
  trackSortChange,
  trackPaginationClick,
  trackFilterReset,
} from '../analytics';

describe('Analytics Utilities', () => {
  const mockGtag = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('window', {
      gtag: mockGtag,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    mockGtag.mockClear();
  });

  describe('trackFilterUsage', () => {
    it('should track filter usage with string value', () => {
      trackFilterUsage('category', 'Joyería');

      expect(mockGtag).toHaveBeenCalledWith('event', 'filter_applied', {
        event_category: 'Product Filters',
        event_label: 'category',
        filter_type: 'category',
        filter_value: 'Joyería',
      });
    });

    it('should track filter usage with boolean value', () => {
      trackFilterUsage('featured', true);

      expect(mockGtag).toHaveBeenCalledWith('event', 'filter_applied', {
        event_category: 'Product Filters',
        event_label: 'featured',
        filter_type: 'featured',
        filter_value: 'true',
      });
    });

    it('should track filter usage with number value', () => {
      trackFilterUsage('price', 500);

      expect(mockGtag).toHaveBeenCalledWith('event', 'filter_applied', {
        event_category: 'Product Filters',
        event_label: 'price',
        filter_type: 'price',
        filter_value: '500',
      });
    });

    it('should not track when window is undefined', () => {
      vi.stubGlobal('window', undefined);
      trackFilterUsage('category', 'test');
      expect(mockGtag).not.toHaveBeenCalled();
    });

    it('should not track when gtag is undefined', () => {
      vi.stubGlobal('window', {});
      trackFilterUsage('category', 'test');
      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe('trackSearchQuery', () => {
    it('should track search query with results count', () => {
      trackSearchQuery('alebrije', 25);

      expect(mockGtag).toHaveBeenCalledWith('event', 'search', {
        event_category: 'Product Search',
        search_term: 'alebrije',
        results_count: 25,
      });
    });

    it('should track search with zero results', () => {
      trackSearchQuery('nonexistent', 0);

      expect(mockGtag).toHaveBeenCalledWith('event', 'search', {
        event_category: 'Product Search',
        search_term: 'nonexistent',
        results_count: 0,
      });
    });

    it('should not track when window is undefined', () => {
      vi.stubGlobal('window', undefined);
      trackSearchQuery('test', 10);
      expect(mockGtag).not.toHaveBeenCalled();
    });

    it('should not track when gtag is undefined', () => {
      vi.stubGlobal('window', {});
      trackSearchQuery('test', 10);
      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe('trackSortChange', () => {
    it('should track sort option change', () => {
      trackSortChange('price-asc');

      expect(mockGtag).toHaveBeenCalledWith('event', 'sort_applied', {
        event_category: 'Product Sorting',
        sort_option: 'price-asc',
      });
    });

    it('should track different sort options', () => {
      trackSortChange('newest');

      expect(mockGtag).toHaveBeenCalledWith('event', 'sort_applied', {
        event_category: 'Product Sorting',
        sort_option: 'newest',
      });
    });

    it('should not track when window is undefined', () => {
      vi.stubGlobal('window', undefined);
      trackSortChange('price-asc');
      expect(mockGtag).not.toHaveBeenCalled();
    });

    it('should not track when gtag is undefined', () => {
      vi.stubGlobal('window', {});
      trackSortChange('price-asc');
      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe('trackPaginationClick', () => {
    it('should track pagination click with page number', () => {
      trackPaginationClick(3);

      expect(mockGtag).toHaveBeenCalledWith('event', 'pagination_click', {
        event_category: 'Product Browsing',
        page_number: 3,
      });
    });

    it('should track first page click', () => {
      trackPaginationClick(1);

      expect(mockGtag).toHaveBeenCalledWith('event', 'pagination_click', {
        event_category: 'Product Browsing',
        page_number: 1,
      });
    });

    it('should not track when window is undefined', () => {
      vi.stubGlobal('window', undefined);
      trackPaginationClick(1);
      expect(mockGtag).not.toHaveBeenCalled();
    });

    it('should not track when gtag is undefined', () => {
      vi.stubGlobal('window', {});
      trackPaginationClick(1);
      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe('trackFilterReset', () => {
    it('should track filter reset', () => {
      trackFilterReset();

      expect(mockGtag).toHaveBeenCalledWith('event', 'filters_reset', {
        event_category: 'Product Filters',
      });
    });

    it('should not track when window is undefined', () => {
      vi.stubGlobal('window', undefined);
      trackFilterReset();
      expect(mockGtag).not.toHaveBeenCalled();
    });

    it('should not track when gtag is undefined', () => {
      vi.stubGlobal('window', {});
      trackFilterReset();
      expect(mockGtag).not.toHaveBeenCalled();
    });
  });
});
