"use client";

import { useState } from "react";
import { useProductFilters } from "@/hooks/product/useProductFilters";
import FiltersDrawer from "@/components/product/FiltersDrawer";
import ProductsGrid from "@/components/product/ProductsGrid";
import Button from "@/components/common/Button";
import { Product } from "@/types";
import { Filter, Grid3x3, List } from "lucide-react";

interface ProductsPageClientProps {
  products: Product[];
  paginatedProducts: Product[];
  categories: string[];
  states: string[];
  currentCategory?: string;
  currentState?: string;
  currentQuery?: string;
  currentSort?: string;
  currentPage: number;
  totalPages: number;
}

export default function ProductsPageClient({
  products,
  paginatedProducts,
  categories,
  states,
  currentCategory,
  currentState,
  currentQuery,
  currentSort,
  currentPage,
  totalPages,
}: ProductsPageClientProps) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Initialize the filtering hook with server-filtered products
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
    toggleInStock,
    toggleVerified,
    toggleFeatured,
    resetFilters,
  } = useProductFilters(products);

  // Use filtered products from the hook
  const displayProducts = filteredProducts;

  // Sort option labels
  const getSortLabel = (sortValue: string) => {
    switch (sortValue) {
      case 'relevance':
        return 'Relevancia';
      case 'price-asc':
        return 'Precio: Menor a Mayor';
      case 'price-desc':
        return 'Precio: Mayor a Menor';
      case 'rating-desc':
        return 'Mejor Calificados';
      case 'newest':
        return 'Más Recientes';
      case 'popular':
        return 'Más Populares';
      default:
        return 'Destacados';
    }
  };

  return (
    <>
      {/* Compact Filter Bar */}
      <div className="flex items-center justify-between mb-6 gap-4">
        {/* Left Side - Filter Button + Product Count */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all text-gray-900 font-medium"
          >
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs font-semibold bg-primary-600 text-white rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>

          <p className="text-gray-600 font-medium">
            <span className="font-bold text-gray-900">{displayProducts.length}</span>{" "}
            {displayProducts.length === 1 ? 'producto' : 'productos'}
          </p>
        </div>

        {/* Right Side - View Toggle + Sort */}
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-white border-2 border-gray-300 rounded-xl overflow-hidden">
            <button
              onClick={() => setView("grid")}
              className={`p-3 transition-colors ${
                view === "grid"
                  ? "bg-primary-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              aria-label="Vista de cuadrícula"
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-3 transition-colors ${
                view === "list"
                  ? "bg-primary-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
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
              onChange={(e) => updateSortBy(e.target.value as any)}
              className="appearance-none pl-12 pr-10 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer transition-all font-medium text-gray-900 min-w-[280px]"
            >
              <option value="relevance">Relevancia</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating-desc">Mejor Calificados</option>
              <option value="newest">Más Recientes</option>
              <option value="popular">Más Populares</option>
            </select>
            {/* Custom Label */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
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

      {/* Active Filters Summary */}
      {isFilterActive && (
        <div className="mb-6 p-4 bg-white rounded-xl border-2 border-gray-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-700">
              Filtros activos:
            </span>
            {filters.categories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium"
              >
                {cat}
                <button
                  onClick={() => toggleCategory(cat)}
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
            {filters.states.map((state) => (
              <span
                key={state}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
              >
                {state}
                <button
                  onClick={() => toggleState(state)}
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
            {filters.minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                {filters.minRating}+ ⭐
                <button
                  onClick={() => updateMinRating(0)}
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
            {filters.inStock === true && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                En stock
                <button onClick={toggleInStock} className="hover:text-green-900">
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
            {filters.verified === true && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                Verificados
                <button onClick={toggleVerified} className="hover:text-purple-900">
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
            {filters.featured === true && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                Destacados
                <button onClick={toggleFeatured} className="hover:text-orange-900">
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
              onClick={resetFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-semibold hover:underline ml-2"
            >
              Limpiar todo
            </button>
          </div>
        </div>
      )}

      {/* Products Grid/List */}
      <div>
        {displayProducts.length > 0 ? (
          <ProductsGrid products={displayProducts} view={view} />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Filter className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              No hay productos que coincidan con tus criterios de búsqueda.
              Intenta ajustar los filtros o realizar una búsqueda diferente.
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
    </>
  );
}