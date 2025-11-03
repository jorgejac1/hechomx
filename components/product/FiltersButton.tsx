'use client';

import { useState, useEffect, useRef } from 'react';
import { useProductFilters } from '@/hooks/product/useProductFilters';
import FiltersDrawer from './FiltersDrawer';
import SortDropdown from './SortDropdown';
import ViewToggle from './ViewToggle';
import { Product } from '@/types';

interface FiltersButtonProps {
  products: Product[];
  currentCategory?: string;
  currentState?: string;
  currentQuery?: string;
  currentSort?: string;
  totalProducts: number;
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export default function FiltersButton({
  products,
  currentCategory,
  currentState,
  currentQuery,
  currentSort,
  totalProducts,
  view,
  onViewChange,
}: FiltersButtonProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const hasInitialized = useRef(false);

  // Initialize filtering hook
  const {
    filters,
    activeFilterCount,
    filterOptions,
    priceRange,
    toggleCategory,
    toggleState,
    updatePriceRange,
    updateMinRating,
    toggleInStock,
    toggleVerified,
    toggleFeatured,
    resetFilters,
  } = useProductFilters(products);

  // Initialize filters from URL params only once
  useEffect(() => {
    if (hasInitialized.current) return;

    if (currentCategory && !filters.categories.includes(currentCategory)) {
      toggleCategory(currentCategory);
    }

    if (currentState && !filters.states.includes(currentState)) {
      toggleState(currentState);
    }

    hasInitialized.current = true;
  }, [
    currentCategory,
    currentState,
    filters.categories,
    filters.states,
    toggleCategory,
    toggleState,
  ]);

  // Calculate total active filters including URL params
  const getTotalActiveFilters = () => {
    let count = activeFilterCount;
    if (currentQuery) count++;
    return count;
  };

  const handleRemoveUrlFilter = (type: 'category' | 'state' | 'query') => {
    const url = new URL(window.location.href);
    if (type === 'category') {
      url.searchParams.delete('category');
      if (currentCategory) {
        toggleCategory(currentCategory);
      }
    } else if (type === 'state') {
      url.searchParams.delete('state');
      if (currentState) {
        toggleState(currentState);
      }
    } else if (type === 'query') {
      url.searchParams.delete('q');
    }
    window.history.pushState({}, '', url.toString());
    window.location.reload();
  };

  return (
    <>
      {/* Top Bar: Everything in one row */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Left side: Filters Button & Count */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFiltersOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:border-primary-500 hover:text-primary-600 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filtros
              {getTotalActiveFilters() > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-semibold bg-primary-600 text-white rounded-full">
                  {getTotalActiveFilters()}
                </span>
              )}
            </button>

            {/* Product Count */}
            <div className="text-sm">
              <span className="text-gray-900 font-bold text-lg">{totalProducts}</span>{' '}
              <span className="text-gray-600">
                {totalProducts === 1 ? 'producto' : 'productos'}
              </span>
            </div>
          </div>

          {/* Right side: View Toggle & Sort */}
          <div className="flex items-center gap-3">
            <ViewToggle view={view} onViewChange={onViewChange} />
            <SortDropdown currentSort={currentSort} />
          </div>
        </div>

        {/* Active Filters */}
        {(filters.categories.length > 0 ||
          filters.states.length > 0 ||
          filters.minRating > 0 ||
          filters.inStock !== null ||
          filters.verified !== null ||
          filters.featured !== null ||
          currentCategory ||
          currentState ||
          currentQuery) && (
          <div className="flex items-center gap-2 flex-wrap mt-4">
            <span className="text-sm text-gray-600 font-medium">Filtros activos:</span>

            {/* URL Category (if not in hook filters) */}
            {currentCategory && !filters.categories.includes(currentCategory) && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                {currentCategory}
                <button
                  onClick={() => handleRemoveUrlFilter('category')}
                  className="hover:text-primary-900"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            )}

            {/* URL State (if not in hook filters) */}
            {currentState && !filters.states.includes(currentState) && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {currentState}
                <button
                  onClick={() => handleRemoveUrlFilter('state')}
                  className="hover:text-blue-900"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            )}

            {/* Hook Categories */}
            {filters.categories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
              >
                {category}
                <button onClick={() => toggleCategory(category)} className="hover:text-primary-900">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}

            {/* Hook States */}
            {filters.states.map((state) => (
              <span
                key={state}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {state}
                <button onClick={() => toggleState(state)} className="hover:text-blue-900">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}

            {/* Rating */}
            {filters.minRating > 0 && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                {filters.minRating}+ ⭐
                <button onClick={() => updateMinRating(0)} className="hover:text-yellow-900">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            )}

            {/* In Stock */}
            {filters.inStock === true && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                En stock
                <button onClick={toggleInStock} className="hover:text-green-900">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            )}

            {/* Verified */}
            {filters.verified === true && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Verificados
                <button onClick={toggleVerified} className="hover:text-purple-900">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            )}

            {/* Featured */}
            {filters.featured === true && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                Destacados
                <button onClick={toggleFeatured} className="hover:text-orange-900">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            )}

            {/* Search Query (from URL) */}
            {currentQuery && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Búsqueda: "{currentQuery}"
                <button
                  onClick={() => handleRemoveUrlFilter('query')}
                  className="hover:text-primary-900"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium underline"
            >
              Limpiar todo
            </button>
          </div>
        )}
      </div>

      {/* Filters Drawer */}
      <FiltersDrawer
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={filters}
        filterOptions={filterOptions}
        priceRange={priceRange}
        onToggleCategory={toggleCategory}
        onToggleState={toggleState}
        onUpdatePriceRange={updatePriceRange}
        onUpdateMinRating={updateMinRating}
        onToggleInStock={toggleInStock}
        onToggleVerified={toggleVerified}
        onToggleFeatured={toggleFeatured}
        onResetFilters={resetFilters}
        activeFilterCount={activeFilterCount}
      />
    </>
  );
}
