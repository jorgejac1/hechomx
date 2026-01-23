/**
 * @fileoverview Product listing page with integrated filtering functionality
 * Full-featured product browsing component with search, sort, and filter capabilities.
 * Includes a filter drawer for detailed filtering options and active filter display.
 * @module components/product/ProductListWithFilters
 */

'use client';

import { useState } from 'react';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';
import { Product } from '@/types';
import { useProductFilters } from '@/hooks/product/useProductFilters';
import FiltersDrawer from './FiltersDrawer';
import ProductCard from './ProductCard';
import Button from '@/components/common/Button';

/**
 * Props for the ProductListWithFilters component
 * @interface ProductListWithFiltersProps
 */
interface ProductListWithFiltersProps {
  /** Array of all products to filter and display */
  products: Product[];
}

/**
 * Sort option values for product ordering
 * @typedef {'relevance' | 'price-asc' | 'price-desc' | 'rating-desc' | 'newest' | 'popular'} SortOption
 */
type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating-desc' | 'newest' | 'popular';

export default function ProductListWithFilters({ products }: ProductListWithFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    filters,
    filteredProducts,
    activeFilterCount,
    isFilterActive,
    filterOptions,
    priceRange,
    toggleCategory,
    toggleState,
    updatePriceRange,
    updateMinRating,
    updateSortBy,
    updateSearchQuery,
    toggleInStock,
    toggleVerified,
    toggleFeatured,
    resetFilters,
  } = useProductFilters(products);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Productos Artesanales
          </h1>
          <p className="text-gray-600">Descubre auténticas artesanías mexicanas</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos, artesanos, categorías..."
                value={filters.searchQuery}
                onChange={(e) => updateSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>

            {/* Sort */}
            <div className="sm:w-64">
              <select
                value={filters.sortBy}
                onChange={(e) => updateSortBy(e.target.value as SortOption)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white cursor-pointer transition-all"
              >
                <option value="relevance">Más relevantes</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="rating-desc">Mejor calificados</option>
                <option value="newest">Más recientes</option>
                <option value="popular">Más populares</option>
              </select>
            </div>

            {/* Filter Button */}
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsFilterOpen(true)}
              icon={<SlidersHorizontal className="w-5 h-5" />}
            >
              <span className="hidden sm:inline">Filtros</span>
              {activeFilterCount > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-primary-600 text-white rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>

          {/* Active Filters Summary */}
          {isFilterActive && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-gray-700">Filtros activos:</span>
                {filters.categories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {cat}
                  </span>
                ))}
                {filters.states.map((state) => (
                  <span
                    key={state}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {state}
                  </span>
                ))}
                {filters.minRating > 0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                    {filters.minRating}+ estrellas
                  </span>
                )}
                {filters.inStock === true && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    En stock
                  </span>
                )}
                {filters.verified === true && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    Verificados
                  </span>
                )}
                {filters.featured === true && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                    Destacados
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium hover:underline"
                >
                  Limpiar todo
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredProducts.length === products.length ? (
              <>
                Mostrando <span className="font-semibold">{filteredProducts.length}</span> productos
              </>
            ) : (
              <>
                Mostrando <span className="font-semibold">{filteredProducts.length}</span> de{' '}
                <span className="font-semibold">{products.length}</span> productos
              </>
            )}
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-12 text-center">
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
            <Button variant="primary" size="lg" onClick={resetFilters}>
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
    </div>
  );
}
