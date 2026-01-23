/**
 * @fileoverview Analytics tracking utilities for Google Analytics integration.
 * Provides functions for tracking filter usage, search queries, sort changes,
 * pagination clicks, and filter resets via gtag events.
 * @module lib/utils/analytics
 */

export const trackFilterUsage = (filterType: string, filterValue: string | boolean | number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'filter_applied', {
      event_category: 'Product Filters',
      event_label: filterType,
      filter_type: filterType,
      filter_value: String(filterValue),
    });
  }
};

export const trackSearchQuery = (query: string, resultsCount: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      event_category: 'Product Search',
      search_term: query,
      results_count: resultsCount,
    });
  }
};

export const trackSortChange = (sortOption: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'sort_applied', {
      event_category: 'Product Sorting',
      sort_option: sortOption,
    });
  }
};

export const trackPaginationClick = (page: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'pagination_click', {
      event_category: 'Product Browsing',
      page_number: page,
    });
  }
};

export const trackFilterReset = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'filters_reset', {
      event_category: 'Product Filters',
    });
  }
};
