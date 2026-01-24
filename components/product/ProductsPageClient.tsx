/**
 * @fileoverview Products page client component
 * Main client-side component for the products listing page with full filtering,
 * sorting, pagination, and view toggle functionality. Syncs state with URL params.
 * @module components/product/ProductsPageClient
 */

'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProductFilters } from '@/hooks/product/useProductFilters';
import FiltersDrawer from '@/components/product/FiltersDrawer';
import ProductsGrid from '@/components/product/ProductsGrid';
import Pagination from '@/components/common/Pagination';
import ViewToggle from '@/components/product/ViewToggle';
import FilterBadge from '@/components/product/FilterBadge';
import { Product } from '@/types';
import type { SortOption } from '@/types/filters';
import { Filter, Search } from 'lucide-react';
import EmptyState from '@/components/common/EmptyState';
import { formatCurrency, pluralize, ROUTES } from '@/lib';
import { FILTER_PARAM_NAMES, ITEMS_PER_PAGE, SORT_OPTIONS } from '@/lib/constants/filters';
import {
  validatePriceParam,
  validateSortParam,
  validateBooleanParam,
  validateStateParam,
} from '@/validators/product';
import { removeFilterParam, buildFilterParams } from '@/lib/utils/filters';
import {
  trackFilterUsage,
  trackSortChange,
  trackFilterReset,
  trackSearchQuery,
} from '@/lib/utils/analytics';

/**
 * Props for the ProductsPageClient component
 * @interface ProductsPageClientProps
 */
interface ProductsPageClientProps {
  /** All products to filter and display */
  products: Product[];
}

export default function ProductsPageClient({ products }: ProductsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Read current page from URL
  const currentPageFromUrl = parseInt(searchParams.get(FILTER_PARAM_NAMES.PAGE) || '1', 10);
  const currentPage = isNaN(currentPageFromUrl) ? 1 : Math.max(1, currentPageFromUrl);

  // Read and validate filter values from URL
  const currentCategory = searchParams.get(FILTER_PARAM_NAMES.CATEGORY) || undefined;
  const currentState = validateStateParam(searchParams.get(FILTER_PARAM_NAMES.STATE)) || undefined;
  const currentQuery = searchParams.get(FILTER_PARAM_NAMES.QUERY) || undefined;
  const currentSort = validateSortParam(searchParams.get(FILTER_PARAM_NAMES.SORT));
  const currentPrice = validatePriceParam(searchParams.get(FILTER_PARAM_NAMES.PRICE));
  const currentFeatured = searchParams.has(FILTER_PARAM_NAMES.FEATURED)
    ? validateBooleanParam(searchParams.get(FILTER_PARAM_NAMES.FEATURED))
    : null;
  const currentVerified = searchParams.has(FILTER_PARAM_NAMES.VERIFIED)
    ? validateBooleanParam(searchParams.get(FILTER_PARAM_NAMES.VERIFIED))
    : null;
  const currentInStock = searchParams.has(FILTER_PARAM_NAMES.IN_STOCK)
    ? validateBooleanParam(searchParams.get(FILTER_PARAM_NAMES.IN_STOCK))
    : null;
  const currentMaterials = searchParams.getAll(FILTER_PARAM_NAMES.MATERIAL);

  const {
    filters,
    filteredProducts,
    filterOptions,
    priceRange,
    toggleCategory,
    toggleState,
    toggleMaterial,
    updatePriceRange,
    updateMinRating,
    updateSortBy,
    updateFilter,
    toggleInStock,
    toggleVerified,
    toggleFeatured,
    resetFilters,
  } = useProductFilters(products);

  // Track search query on mount/change
  useEffect(() => {
    if (currentQuery) {
      trackSearchQuery(currentQuery, filteredProducts.length);
    }
  }, [currentQuery, filteredProducts.length]);

  // Memoize materials array to avoid re-renders
  const materialsDep = currentMaterials.join(',');

  // Sync filter state with URL params (only when URL params change)
  useEffect(() => {
    // Handle category filters
    if (currentCategory && !filters.categories.includes(currentCategory)) {
      toggleCategory(currentCategory);
    } else if (!currentCategory && filters.categories.length > 0) {
      filters.categories.forEach((cat) => toggleCategory(cat));
    }

    // Handle state filters
    if (currentState && !filters.states.includes(currentState)) {
      toggleState(currentState);
    } else if (!currentState && filters.states.length > 0) {
      filters.states.forEach((state) => toggleState(state));
    }

    // Handle material filters (multi-select via URL)
    if (currentMaterials.length > 0) {
      // Add materials from URL that aren't in filters
      currentMaterials.forEach((material) => {
        if (!filters.materials.includes(material)) {
          toggleMaterial(material);
        }
      });
      // Remove materials from filters that aren't in URL
      filters.materials.forEach((material) => {
        if (!currentMaterials.includes(material)) {
          toggleMaterial(material);
        }
      });
    } else if (filters.materials.length > 0) {
      // Clear all materials if URL has none
      filters.materials.forEach((material) => toggleMaterial(material));
    }

    // Handle sort with validation
    if (currentSort && currentSort !== filters.sortBy) {
      updateSortBy(currentSort);
    }

    // Handle price range with validation
    if (currentPrice !== null) {
      if (filters.priceRange.max !== currentPrice) {
        updatePriceRange({ min: 0, max: currentPrice });
      }
    } else if (filters.priceRange.max !== priceRange.max) {
      updatePriceRange(priceRange);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, currentState, materialsDep, currentSort, currentPrice]);

  // Separate effect for boolean filters from URL - only runs on URL param changes
  useEffect(() => {
    // Only sync from URL if there's a URL param set
    // This prevents overriding local drawer selections
    if (searchParams.has(FILTER_PARAM_NAMES.FEATURED) && currentFeatured !== filters.featured) {
      updateFilter('featured', currentFeatured);
    }

    if (searchParams.has(FILTER_PARAM_NAMES.VERIFIED) && currentVerified !== filters.verified) {
      updateFilter('verified', currentVerified);
    }

    if (searchParams.has(FILTER_PARAM_NAMES.IN_STOCK) && currentInStock !== filters.inStock) {
      updateFilter('inStock', currentInStock);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFeatured, currentVerified, currentInStock]);

  // Ref to track if we should skip URL sync (e.g., during initial load)
  const isInitialMount = useRef(true);
  const isSyncingFromUrl = useRef(false);

  // Sync filter state TO URL (for shareable/bookmarkable URLs)
  const syncFiltersToUrl = useCallback(() => {
    if (isInitialMount.current || isSyncingFromUrl.current) {
      isInitialMount.current = false;
      return;
    }

    const newParams = buildFilterParams(filters, priceRange.max, searchParams);
    const newUrl = newParams.toString() ? `/productos?${newParams.toString()}` : '/productos';
    const currentUrl = searchParams.toString()
      ? `/productos?${searchParams.toString()}`
      : '/productos';

    // Only update if URL actually changed
    if (newUrl !== currentUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [filters, priceRange.max, searchParams, router]);

  // Debounced URL sync to avoid excessive URL updates during rapid filter changes
  useEffect(() => {
    const timeoutId = setTimeout(syncFiltersToUrl, 300);
    return () => clearTimeout(timeoutId);
  }, [syncFiltersToUrl]);

  // Mark URL read operations to prevent sync loops
  useEffect(() => {
    isSyncingFromUrl.current = true;
    const timeoutId = setTimeout(() => {
      isSyncingFromUrl.current = false;
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [currentCategory, currentState, materialsDep, currentSort, currentPrice]);

  // Calculate active filter count - memoized to avoid recalculation on each render
  const totalActiveFilters = useMemo(() => {
    let count = 0;

    count += filters.categories.length;
    count += filters.states.length;
    count += filters.materials.length;

    if (filters.priceRange.max < priceRange.max) count++;
    if (filters.minRating > 0) count++;
    if (filters.inStock === true) count++;
    if (filters.verified === true) count++;
    if (filters.featured === true) count++;
    if (currentQuery) count++;

    return count;
  }, [
    filters.categories.length,
    filters.states.length,
    filters.materials.length,
    filters.priceRange.max,
    priceRange.max,
    filters.minRating,
    filters.inStock,
    filters.verified,
    filters.featured,
    currentQuery,
  ]);

  // Paginate filtered products
  const { paginatedProducts: displayProducts, totalPages } = useMemo(() => {
    const total = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginated = filteredProducts.slice(startIndex, endIndex);

    return {
      paginatedProducts: paginated,
      totalPages: total,
    };
  }, [filteredProducts, currentPage]);

  const handleFilterChange = (
    filterFn: () => void,
    filterType?: string,
    filterValue?: string | number | boolean | { min: number; max: number }
  ) => {
    filterFn();

    // Track filter usage
    if (filterType && filterValue !== undefined) {
      // Convert range object to trackable value
      const trackableValue =
        typeof filterValue === 'object'
          ? filterValue.max // Track the max value for price ranges
          : filterValue;

      trackFilterUsage(filterType, trackableValue);
    }
  };

  // Remove individual filter
  const handleRemoveFilter = (filterType: 'featured' | 'verified' | 'inStock' | 'price') => {
    const params = removeFilterParam(searchParams, filterType);
    params.delete(FILTER_PARAM_NAMES.PAGE);
    const queryString = params.toString();
    const newUrl = queryString ? `/productos?${queryString}` : '/productos';

    trackFilterUsage(filterType, 'removed');
    router.push(newUrl, { scroll: false });
  };

  // Clear all filters
  const handleResetFilters = () => {
    resetFilters();
    trackFilterReset();
    router.push(ROUTES.PRODUCTS, { scroll: false });
  };

  // Handle sort change with analytics
  const handleSortChange = (sortOption: SortOption) => {
    updateSortBy(sortOption);
    trackSortChange(sortOption);
  };

  return (
    <>
      {/* Filter Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:border-primary-500 hover:text-primary-600 transition"
            >
              <Filter className="w-5 h-5" />
              Filtros
              {totalActiveFilters > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-semibold bg-primary-600 text-white rounded-full">
                  {totalActiveFilters}
                </span>
              )}
            </button>

            <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
              <span className="font-bold text-gray-900 dark:text-gray-100">
                {filteredProducts.length}
              </span>{' '}
              {pluralize(filteredProducts.length, 'producto', 'productos')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <ViewToggle view={view} onViewChange={setView} />

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="appearance-none pl-10 pr-10 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 cursor-pointer transition-all font-medium text-gray-900 dark:text-gray-100 text-base min-w-[280px]"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {totalActiveFilters > 0 && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Filtros activos:
              </span>

              {/* Category Badges */}
              {filters.categories.map((category) => (
                <FilterBadge
                  key={category}
                  label={category}
                  variant="primary"
                  onRemove={() =>
                    handleFilterChange(() => toggleCategory(category), 'category', category)
                  }
                />
              ))}

              {/* State Badges */}
              {filters.states.map((state) => (
                <FilterBadge
                  key={state}
                  label={state}
                  variant="blue"
                  onRemove={() => handleFilterChange(() => toggleState(state), 'state', state)}
                />
              ))}

              {/* Material Badges */}
              {filters.materials.map((material) => (
                <FilterBadge
                  key={material}
                  label={material}
                  variant="teal"
                  onRemove={() =>
                    handleFilterChange(() => toggleMaterial(material), 'material', material)
                  }
                />
              ))}

              {/* Price Badge */}
              {filters.priceRange.max < priceRange.max && (
                <FilterBadge
                  label={`Menos de ${formatCurrency(filters.priceRange.max)}`}
                  variant="green"
                  onRemove={() => handleRemoveFilter('price')}
                />
              )}

              {/* Rating Badge */}
              {filters.minRating > 0 && (
                <FilterBadge
                  label={`${filters.minRating}+ estrellas`}
                  variant="yellow"
                  onRemove={() => handleFilterChange(() => updateMinRating(0), 'rating', 0)}
                />
              )}

              {/* In Stock Badge */}
              {filters.inStock === true && (
                <FilterBadge
                  label="En stock"
                  variant="green"
                  onRemove={() => handleRemoveFilter('inStock')}
                />
              )}

              {/* Verified Badge */}
              {filters.verified === true && (
                <FilterBadge
                  label="Verificados"
                  variant="purple"
                  onRemove={() => handleRemoveFilter('verified')}
                />
              )}

              {/* Featured Badge */}
              {filters.featured === true && (
                <FilterBadge
                  label="Destacados"
                  variant="orange"
                  onRemove={() => handleRemoveFilter('featured')}
                />
              )}

              {/* Search Query Badge */}
              {currentQuery && (
                <FilterBadge
                  label={`"${currentQuery}"`}
                  variant="primary"
                  onRemove={() => router.push(ROUTES.PRODUCTS, { scroll: false })}
                />
              )}

              {/* Clear All Button */}
              <button
                onClick={handleResetFilters}
                className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold hover:underline ml-auto"
              >
                Limpiar todo
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div>
        {displayProducts.length > 0 ? (
          <>
            <ProductsGrid products={displayProducts} view={view} />
            <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/productos" />
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-xs border-2 border-gray-200">
            <EmptyState
              icon={<Search className="w-12 h-12" />}
              title="No se encontraron productos"
              description="No hay productos que coincidan con tus criterios de búsqueda. Intenta ajustar los filtros o realizar una búsqueda diferente."
              size="lg"
              action={{
                label: 'Limpiar todos los filtros',
                onClick: handleResetFilters,
              }}
            />
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <FiltersDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        filterOptions={filterOptions}
        priceRange={priceRange}
        onToggleCategory={(cat) => handleFilterChange(() => toggleCategory(cat), 'category', cat)}
        onToggleState={(state) => handleFilterChange(() => toggleState(state), 'state', state)}
        onToggleMaterial={(material) =>
          handleFilterChange(() => toggleMaterial(material), 'material', material)
        }
        onUpdatePriceRange={(range) =>
          handleFilterChange(() => updatePriceRange(range), 'price', range.max)
        }
        onUpdateMinRating={(rating) =>
          handleFilterChange(() => updateMinRating(rating), 'rating', rating)
        }
        onToggleInStock={() => handleFilterChange(toggleInStock, 'inStock', !filters.inStock)}
        onToggleVerified={() => handleFilterChange(toggleVerified, 'verified', !filters.verified)}
        onToggleFeatured={() => handleFilterChange(toggleFeatured, 'featured', !filters.featured)}
        onResetFilters={handleResetFilters}
        activeFilterCount={totalActiveFilters}
      />
    </>
  );
}
