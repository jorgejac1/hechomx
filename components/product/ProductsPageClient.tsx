'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProductFilters } from '@/hooks/product/useProductFilters';
import FiltersDrawer from '@/components/product/FiltersDrawer';
import ProductsGrid from '@/components/product/ProductsGrid';
import Button from '@/components/common/Button';
import Pagination from '@/components/common/Pagination';
import CardSkeleton from '@/components/common/loading/CardSkeleton';
import { Product } from '@/types';
import type { SortOption } from '@/types/filters';
import { Filter, Grid3x3, List } from 'lucide-react';
import { formatCurrency, pluralize, ROUTES } from '@/lib';
import { FILTER_PARAM_NAMES, ITEMS_PER_PAGE, SORT_OPTIONS } from '@/lib/constants/filters';
import { validatePriceParam, validateSortParam, validateBooleanParam } from '@/validators/product';
import { removeFilterParam } from '@/lib/utils/filters';
import {
  trackFilterUsage,
  trackSortChange,
  trackFilterReset,
  trackSearchQuery,
} from '@/lib/utils/analytics';

interface ProductsPageClientProps {
  products: Product[];
}

export default function ProductsPageClient({ products }: ProductsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Read current page from URL
  const currentPageFromUrl = parseInt(searchParams.get(FILTER_PARAM_NAMES.PAGE) || '1', 10);
  const currentPage = isNaN(currentPageFromUrl) ? 1 : Math.max(1, currentPageFromUrl);

  // Read and validate filter values from URL
  const currentCategory = searchParams.get(FILTER_PARAM_NAMES.CATEGORY) || undefined;
  const currentState = searchParams.get(FILTER_PARAM_NAMES.STATE) || undefined;
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

  const {
    filters,
    filteredProducts,
    filterOptions,
    priceRange,
    toggleCategory,
    toggleState,
    updatePriceRange,
    updateMinRating,
    updateSortBy,
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

  // Sync filter state with URL params
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

    // Track transition state for boolean filters
    const needsTransition =
      currentFeatured !== filters.featured ||
      currentVerified !== filters.verified ||
      currentInStock !== filters.inStock;

    if (needsTransition) {
      setIsTransitioning(true);
    }

    // Toggle boolean filters until they match URL state
    if (currentFeatured !== filters.featured) {
      toggleFeatured();
    }

    if (currentVerified !== filters.verified) {
      toggleVerified();
    }

    if (currentInStock !== filters.inStock) {
      toggleInStock();
    }

    // Clear transition when all filters match
    if (
      currentFeatured === filters.featured &&
      currentVerified === filters.verified &&
      currentInStock === filters.inStock
    ) {
      setIsTransitioning(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentCategory,
    currentState,
    currentSort,
    currentPrice,
    currentFeatured,
    currentVerified,
    currentInStock,
    filters.featured,
    filters.verified,
    filters.inStock,
  ]);

  // Calculate active filter count
  const getTotalActiveFilters = () => {
    let count = 0;

    count += filters.categories.length;
    count += filters.states.length;

    if (filters.priceRange.max < priceRange.max) count++;
    if (filters.minRating > 0) count++;
    if (filters.inStock === true) count++;
    if (filters.verified === true) count++;
    if (filters.featured === true) count++;
    if (currentQuery) count++;

    return count;
  };

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
              {getTotalActiveFilters() > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-semibold bg-primary-600 text-white rounded-full">
                  {getTotalActiveFilters()}
                </span>
              )}
            </button>

            <p className="text-base text-gray-600 font-medium">
              <span className="font-bold text-gray-900">{filteredProducts.length}</span>{' '}
              {pluralize(filteredProducts.length, 'producto', 'productos')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setView('grid')}
                className={`p-2 transition-colors ${
                  view === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
                aria-label="Vista de cuadrícula"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 transition-colors ${
                  view === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
                aria-label="Vista de lista"
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="appearance-none pl-10 pr-10 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer transition-all font-medium text-gray-900 text-base min-w-[280px]"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-600"
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
                  className="w-5 h-5 text-gray-600"
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
        {(filters.categories.length > 0 ||
          filters.states.length > 0 ||
          filters.minRating > 0 ||
          filters.inStock === true ||
          filters.verified === true ||
          filters.featured === true ||
          filters.priceRange.max < priceRange.max ||
          currentQuery) && (
          <div className="mt-4 p-4 bg-white rounded-xl border-2 border-gray-200">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-gray-700">Filtros activos:</span>

              {/* Category Badges */}
              {filters.categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium"
                >
                  {category}
                  <button
                    onClick={() =>
                      handleFilterChange(() => toggleCategory(category), 'category', category)
                    }
                    className="hover:text-primary-900"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              ))}

              {/* State Badges */}
              {filters.states.map((state) => (
                <span
                  key={state}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                >
                  {state}
                  <button
                    onClick={() => handleFilterChange(() => toggleState(state), 'state', state)}
                    className="hover:text-blue-900"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              ))}

              {/* Price Badge */}
              {filters.priceRange.max < priceRange.max && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  Menos de {formatCurrency(filters.priceRange.max)}
                  <button
                    onClick={() => handleRemoveFilter('price')}
                    className="hover:text-green-900"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              )}

              {/* Rating Badge */}
              {filters.minRating > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                  {filters.minRating}+ ⭐
                  <button
                    onClick={() => handleFilterChange(() => updateMinRating(0), 'rating', 0)}
                    className="hover:text-yellow-900"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              )}

              {/* In Stock Badge */}
              {filters.inStock === true && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  En stock
                  <button
                    onClick={() => handleRemoveFilter('inStock')}
                    className="hover:text-green-900"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              )}

              {/* Verified Badge */}
              {filters.verified === true && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                  Verificados
                  <button
                    onClick={() => handleRemoveFilter('verified')}
                    className="hover:text-purple-900"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              )}

              {/* Featured Badge */}
              {filters.featured === true && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                  Destacados
                  <button
                    onClick={() => handleRemoveFilter('featured')}
                    className="hover:text-orange-900"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              )}

              {/* Search Query Badge */}
              {currentQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium">
                  "{currentQuery}"
                  <button
                    onClick={() => router.push(ROUTES.PRODUCTS, { scroll: false })}
                    className="hover:text-primary-900"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              )}

              {/* Clear All Button */}
              <button
                onClick={handleResetFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-semibold hover:underline ml-auto"
              >
                Limpiar todo
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div>
        {isTransitioning ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : displayProducts.length > 0 ? (
          <>
            <ProductsGrid products={displayProducts} view={view} />
            <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/productos" />
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Filter className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              No hay productos que coincidan con tus criterios de búsqueda. Intenta ajustar los
              filtros o realizar una búsqueda diferente.
            </p>
            <Button variant="primary" size="lg" onClick={handleResetFilters}>
              Limpiar todos los filtros
            </Button>
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
        activeFilterCount={getTotalActiveFilters()}
      />
    </>
  );
}
