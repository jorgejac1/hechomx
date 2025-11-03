'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useProductFilters } from '@/hooks/product/useProductFilters';
import FiltersDrawer from '@/components/product/FiltersDrawer';
import ProductsGrid from '@/components/product/ProductsGrid';
import Button from '@/components/common/Button';
import { Product } from '@/types';
import { Filter, Grid3x3, List } from 'lucide-react';

interface ProductsPageClientProps {
  products: Product[];
  currentCategory?: string;
  currentState?: string;
  currentQuery?: string;
  currentSort?: string;
}

const ITEMS_PER_PAGE = 20;

// Define sort options type
type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating-desc' | 'newest' | 'popular';

export default function ProductsPageClient({
  products,
  currentCategory,
  currentState,
  currentQuery,
  currentSort,
}: ProductsPageClientProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const hasInitialized = useRef(false);

  // Initialize filtering hook
  const {
    filters,
    filteredProducts,
    activeFilterCount,
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

  // Initialize filters from URL params only once
  useEffect(() => {
    if (hasInitialized.current) return;

    if (currentCategory && !filters.categories.includes(currentCategory)) {
      toggleCategory(currentCategory);
    }

    if (currentState && !filters.states.includes(currentState)) {
      toggleState(currentState);
    }

    if (currentSort && currentSort !== filters.sortBy) {
      updateSortBy(currentSort as SortOption);
    }

    hasInitialized.current = true;
  }, [
    currentCategory,
    currentState,
    currentSort,
    filters.categories,
    filters.states,
    filters.sortBy,
    toggleCategory,
    toggleState,
    updateSortBy,
  ]);

  // Calculate pagination for filtered products
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

  // Reset to page 1 when filters change
  const handleFilterChange = (filterFn: () => void) => {
    filterFn();
    setCurrentPage(1);
  };

  return (
    <>
      {/* Single Row Filter Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Left: Filter Button + Product Count */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:border-primary-500 hover:text-primary-600 transition"
            >
              <Filter className="w-5 h-5" />
              Filtros
              {activeFilterCount > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-semibold bg-primary-600 text-white rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <p className="text-base text-gray-600 font-medium">
              <span className="font-bold text-gray-900">{filteredProducts.length}</span> productos
            </p>
          </div>

          {/* Right: View Toggle + Sort Dropdown */}
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
                onChange={(e) => {
                  updateSortBy(e.target.value as SortOption);
                  setCurrentPage(1);
                }}
                className="appearance-none pl-10 pr-10 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer transition-all font-medium text-gray-900 text-base min-w-[280px]"
              >
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="rating-desc">Mejor Calificados</option>
                <option value="newest">Más Recientes</option>
                <option value="popular">Más Populares</option>
              </select>

              {/* Sort Icon */}
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

              {/* Chevron Icon */}
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

        {/* Active Filters */}
        {(filters.categories.length > 0 ||
          filters.states.length > 0 ||
          filters.minRating > 0 ||
          filters.inStock !== null ||
          filters.verified !== null ||
          filters.featured !== null ||
          currentQuery) && (
          <div className="mt-4 p-4 bg-white rounded-xl border-2 border-gray-200">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-gray-700">Filtros activos:</span>

              {/* Categories */}
              {filters.categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium"
                >
                  {category}
                  <button
                    onClick={() => handleFilterChange(() => toggleCategory(category))}
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

              {/* States */}
              {filters.states.map((state) => (
                <span
                  key={state}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                >
                  {state}
                  <button
                    onClick={() => handleFilterChange(() => toggleState(state))}
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

              {/* Rating */}
              {filters.minRating > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                  {filters.minRating}+ ⭐
                  <button
                    onClick={() => handleFilterChange(() => updateMinRating(0))}
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

              {/* In Stock */}
              {filters.inStock === true && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  En stock
                  <button
                    onClick={() => handleFilterChange(toggleInStock)}
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

              {/* Verified */}
              {filters.verified === true && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                  Verificados
                  <button
                    onClick={() => handleFilterChange(toggleVerified)}
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

              {/* Featured */}
              {filters.featured === true && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                  Destacados
                  <button
                    onClick={() => handleFilterChange(toggleFeatured)}
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

              {/* Search Query */}
              {currentQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium">
                  "{currentQuery}"
                  <button
                    onClick={() => {
                      window.location.href = '/productos';
                    }}
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

              <button
                onClick={() => {
                  resetFilters();
                  setCurrentPage(1);
                }}
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
        {displayProducts.length > 0 ? (
          <>
            <ProductsGrid products={displayProducts} view={view} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {/* Previous Button */}
                <button
                  onClick={() => {
                    setCurrentPage(Math.max(1, currentPage - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg border font-medium transition ${
                    currentPage === 1
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Anterior
                </button>

                {/* Page Numbers - Desktop */}
                <div className="hidden sm:flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg font-medium transition ${
                          pageNum === currentPage
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Mobile: Just show current page */}
                <div className="sm:hidden flex items-center gap-2">
                  <span className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium">
                    {currentPage}
                  </span>
                  <span className="text-gray-600">de {totalPages}</span>
                </div>

                {/* Next Button */}
                <button
                  onClick={() => {
                    setCurrentPage(Math.min(totalPages, currentPage + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg border font-medium transition ${
                    currentPage === totalPages
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Siguiente
                </button>
              </div>
            )}
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
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                resetFilters();
                setCurrentPage(1);
              }}
            >
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
        onToggleCategory={(cat) => handleFilterChange(() => toggleCategory(cat))}
        onToggleState={(state) => handleFilterChange(() => toggleState(state))}
        onUpdatePriceRange={(range) => handleFilterChange(() => updatePriceRange(range))}
        onUpdateMinRating={(rating) => handleFilterChange(() => updateMinRating(rating))}
        onToggleInStock={() => handleFilterChange(toggleInStock)}
        onToggleVerified={() => handleFilterChange(toggleVerified)}
        onToggleFeatured={() => handleFilterChange(toggleFeatured)}
        onResetFilters={() => {
          resetFilters();
          setCurrentPage(1);
        }}
        activeFilterCount={activeFilterCount}
      />
    </>
  );
}
