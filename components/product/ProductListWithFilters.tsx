/**
 * @fileoverview Product listing page with integrated filtering functionality
 * Full-featured product browsing component with search, sort, and filter capabilities.
 * Includes a filter drawer for detailed filtering options and active filter display.
 * @module components/product/ProductListWithFilters
 */

'use client';

import { useState } from 'react';
import { SearchX, SlidersHorizontal, Search, Package } from 'lucide-react';
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
    toggleMaterial,
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Productos Artesanales
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Descubre auténticas artesanías mexicanas
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xs border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Buscar productos, artesanos, categorías..."
                value={filters.searchQuery}
                onChange={(e) => updateSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
              />
            </div>

            {/* Sort */}
            <div className="sm:w-64">
              <select
                value={filters.sortBy}
                onChange={(e) => updateSortBy(e.target.value as SortOption)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer transition-all"
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
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Filtros activos:
                </span>
                {filters.categories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {cat}
                  </span>
                ))}
                {filters.states.map((state) => (
                  <span
                    key={state}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                  >
                    {state}
                  </span>
                ))}
                {filters.materials.map((material) => (
                  <span
                    key={material}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium"
                  >
                    {material}
                  </span>
                ))}
                {filters.minRating > 0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-medium">
                    {filters.minRating}+ estrellas
                  </span>
                )}
                {filters.inStock === true && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                    En stock
                  </span>
                )}
                {filters.verified === true && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                    Verificados
                  </span>
                )}
                {filters.featured === true && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">
                    Destacados
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium hover:underline"
                >
                  Limpiar todo
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredProducts.length === products.length ? (
              <>
                Mostrando{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {filteredProducts.length}
                </span>{' '}
                productos
              </>
            ) : (
              <>
                Mostrando{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {filteredProducts.length}
                </span>{' '}
                de{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {products.length}
                </span>{' '}
                productos
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xs border border-gray-200 dark:border-gray-700 p-12 text-center">
            {/* Empty State Illustration */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full mb-6">
              {filters.searchQuery ? (
                <SearchX className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              ) : (
                <Package className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              )}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {filters.searchQuery
                ? `No hay resultados para "${filters.searchQuery}"`
                : 'No se encontraron productos'}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {filters.searchQuery
                ? 'Intenta con otras palabras clave o revisa los filtros aplicados.'
                : 'No hay productos que coincidan con tus criterios de búsqueda. Intenta ajustar los filtros.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" size="lg" onClick={resetFilters}>
                Limpiar todos los filtros
              </Button>
              {filters.searchQuery && (
                <Button variant="outline" size="lg" onClick={() => updateSearchQuery('')}>
                  Limpiar búsqueda
                </Button>
              )}
            </div>

            {/* Suggestions */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Sugerencias:</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Revisa la ortografía de tu búsqueda</li>
                <li>• Usa palabras más generales</li>
                <li>• Prueba con sinónimos o términos relacionados</li>
              </ul>
            </div>
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
        onToggleMaterial={toggleMaterial}
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
