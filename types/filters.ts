/**
 * @fileoverview Product filtering and sorting type definitions
 * Defines interfaces for price ranges, product filters, sort options, and filter state management
 * @module types/filters
 */

export interface PriceRange {
  min: number;
  max: number;
}

export interface ProductFilters {
  // Category filters
  categories: string[];
  subcategories: string[];

  // Location filters
  states: string[];

  // Price filters
  priceRange: PriceRange;

  // Rating filters
  minRating: number;

  // Boolean filters
  inStock: boolean | null; // null = both, true = in stock only, false = out of stock only
  verified: boolean | null; // null = both, true = verified only, false = unverified only
  featured: boolean | null; // null = both, true = featured only

  // Search
  searchQuery: string;

  // Sorting
  sortBy: SortOption;
}

export type SortOption =
  | 'relevance'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'newest'
  | 'popular';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterState {
  filters: ProductFilters;
  activeFilterCount: number;
  isFilterActive: boolean;
}
