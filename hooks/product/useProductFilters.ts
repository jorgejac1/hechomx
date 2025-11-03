import { useState, useCallback, useMemo } from 'react';
import { Product } from '@/types';
import { ProductFilters, SortOption, PriceRange } from '@/types/filters';

const DEFAULT_FILTERS: ProductFilters = {
  categories: [],
  subcategories: [],
  states: [],
  priceRange: { min: 0, max: 10000 },
  minRating: 0,
  inStock: null,
  verified: null,
  featured: null,
  searchQuery: '',
  sortBy: 'relevance',
};

export function useProductFilters(initialProducts: Product[] = []) {
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);

  // Calculate price range from products
  const priceRange = useMemo(() => {
    if (initialProducts.length === 0) {
      return { min: 0, max: 10000 };
    }
    const prices = initialProducts.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices) / 100) * 100,
      max: Math.ceil(Math.max(...prices) / 100) * 100,
    };
  }, [initialProducts]);

  // Extract unique categories, states, etc. from products
  const filterOptions = useMemo(() => {
    const categories = new Set<string>();
    const subcategories = new Set<string>();
    const states = new Set<string>();

    initialProducts.forEach((product) => {
      if (product.category) categories.add(product.category);
      if (product.subcategory) subcategories.add(product.subcategory);
      if (product.state) states.add(product.state);
    });

    return {
      categories: Array.from(categories).sort(),
      subcategories: Array.from(subcategories).sort(),
      states: Array.from(states).sort(),
    };
  }, [initialProducts]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.subcategories.length > 0) count++;
    if (filters.states.length > 0) count++;
    if (filters.priceRange.min > priceRange.min || filters.priceRange.max < priceRange.max) count++;
    if (filters.minRating > 0) count++;
    if (filters.inStock !== null) count++;
    if (filters.verified !== null) count++;
    if (filters.featured !== null) count++;
    if (filters.searchQuery.trim() !== '') count++;
    return count;
  }, [filters, priceRange]);

  // Check if any filters are active
  const isFilterActive = activeFilterCount > 0;

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts];

    // Search query
    if (filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.maker.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // Subcategories
    if (filters.subcategories.length > 0) {
      filtered = filtered.filter((product) =>
        product.subcategory ? filters.subcategories.includes(product.subcategory) : false
      );
    }

    // States
    if (filters.states.length > 0) {
      filtered = filtered.filter((product) =>
        filters.states.includes(product.state)
      );
    }

    // Price range
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
    );

    // Rating
    if (filters.minRating > 0) {
      filtered = filtered.filter(
        (product) => product.rating && product.rating >= filters.minRating
      );
    }

    // In stock
    if (filters.inStock !== null) {
      filtered = filtered.filter((product) => product.inStock === filters.inStock);
    }

    // Verified
    if (filters.verified !== null) {
      filtered = filtered.filter((product) => product.verified === filters.verified);
    }

    // Featured
    if (filters.featured !== null) {
      filtered = filtered.filter((product) => product.featured === filters.featured);
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        // Assuming products have an id that increases over time
        filtered.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      case 'popular':
        // Sort by review count
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      case 'relevance':
      default:
        // Keep current order for relevance
        break;
    }

    return filtered;
  }, [initialProducts, filters]);

  // Update individual filter
  const updateFilter = useCallback(
    <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Toggle category - SINGLE SELECT
  const toggleCategory = useCallback((category: string) => {
    setFilters((prev) => {
      // If clicking the same category, deselect it
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: [],
        };
      }
      // Otherwise, replace with the new category (single-select)
      return {
        ...prev,
        categories: [category],
      };
    });
  }, []);

  // Toggle subcategory
  const toggleSubcategory = useCallback((subcategory: string) => {
    setFilters((prev) => ({
      ...prev,
      subcategories: prev.subcategories.includes(subcategory)
        ? prev.subcategories.filter((s) => s !== subcategory)
        : [...prev.subcategories, subcategory],
    }));
  }, []);

  // Toggle state - MULTI SELECT
  const toggleState = useCallback((state: string) => {
    setFilters((prev) => ({
      ...prev,
      states: prev.states.includes(state)
        ? prev.states.filter((s) => s !== state)
        : [...prev.states, state],
    }));
  }, []);

  // Update price range
  const updatePriceRange = useCallback((range: PriceRange) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
  }, []);

  // Update minimum rating
  const updateMinRating = useCallback((rating: number) => {
    setFilters((prev) => ({ ...prev, minRating: rating }));
  }, []);

  // Update sort option
  const updateSortBy = useCallback((sortBy: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  // Update search query
  const updateSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  // Toggle boolean filters
  const toggleInStock = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      inStock: prev.inStock === null ? true : prev.inStock === true ? false : null,
    }));
  }, []);

  const toggleVerified = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      verified: prev.verified === null ? true : prev.verified === true ? false : null,
    }));
  }, []);

  const toggleFeatured = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      featured: prev.featured === null ? true : prev.featured === true ? false : null,
    }));
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters({
      ...DEFAULT_FILTERS,
      priceRange: priceRange,
    });
  }, [priceRange]);

  // Reset specific filter
  const resetFilter = useCallback(
    (key: keyof ProductFilters) => {
      setFilters((prev) => ({
        ...prev,
        [key]: DEFAULT_FILTERS[key],
      }));
    },
    []
  );

  return {
    // State
    filters,
    filteredProducts,
    activeFilterCount,
    isFilterActive,
    
    // Options
    filterOptions,
    priceRange,
    
    // Actions
    updateFilter,
    toggleCategory,
    toggleSubcategory,
    toggleState,
    updatePriceRange,
    updateMinRating,
    updateSortBy,
    updateSearchQuery,
    toggleInStock,
    toggleVerified,
    toggleFeatured,
    resetFilters,
    resetFilter,
  };
}