'use client';

import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency, CATEGORY_ICONS } from '@/lib';

interface ProductFilters {
  categories: string[];
  states: string[];
  priceRange: {
    min: number;
    max: number;
  };
  minRating: number;
  inStock: boolean | null;
  verified: boolean | null;
  featured: boolean | null;
}

interface FilterOptions {
  categories: string[];
  states: string[];
}

interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ProductFilters;
  filterOptions: FilterOptions;
  priceRange: { min: number; max: number };
  onToggleCategory: (category: string) => void;
  onToggleState: (state: string) => void;
  onUpdatePriceRange: (range: { min: number; max: number }) => void;
  onUpdateMinRating: (rating: number) => void;
  onToggleInStock: () => void;
  onToggleVerified: () => void;
  onToggleFeatured: () => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

export default function FiltersDrawer({
  isOpen,
  onClose,
  filters,
  filterOptions,
  priceRange,
  onToggleCategory,
  onToggleState,
  onUpdatePriceRange,
  onUpdateMinRating,
  onToggleInStock,
  onToggleVerified,
  onToggleFeatured,
  onResetFilters,
  activeFilterCount,
}: FiltersDrawerProps) {
  // State for show more/less
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllStates, setShowAllStates] = useState(false);

  // Get visible items (first 3 or all)
  const visibleCategories = showAllCategories
    ? filterOptions.categories
    : filterOptions.categories.slice(0, 3);

  const visibleStates = showAllStates ? filterOptions.states : filterOptions.states.slice(0, 3);

  // Check if we have more than 3 items
  const hasMoreCategories = filterOptions.categories.length > 3;
  const hasMoreStates = filterOptions.states.length > 3;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Drawer - Left Side */}
      <div
        className={`fixed top-0 left-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Filtros</h2>
              {activeFilterCount > 0 && (
                <p className="text-sm text-gray-600 mt-0.5">
                  {activeFilterCount}{' '}
                  {activeFilterCount === 1 ? 'filtro activo' : 'filtros activos'}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Cerrar filtros"
            >
              <X className="w-6 h-6 text-gray-900" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Categories Section */}
            <div className="px-6 py-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Categorías</h3>
              <div className="space-y-1">
                {/* All Categories Option */}
                <button
                  onClick={() => {
                    // Clear all categories
                    filters.categories.forEach((cat: string) => onToggleCategory(cat));
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-base ${
                    filters.categories.length === 0
                      ? 'bg-primary-100 text-primary-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Todas las categorías
                </button>

                {/* Category Options (First 3 or All) */}
                {visibleCategories.map((category: string) => {
                  const icon = CATEGORY_ICONS[category] || '🎨';
                  return (
                    <button
                      key={category}
                      onClick={() => onToggleCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-base flex items-center gap-2 ${
                        filters.categories.includes(category)
                          ? 'bg-primary-100 text-primary-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">{icon}</span>
                      <span>{category}</span>
                    </button>
                  );
                })}

                {/* Show More/Less Button for Categories */}
                {hasMoreCategories && (
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="w-full text-left px-4 py-3 rounded-lg transition-colors text-base text-primary-600 hover:bg-primary-50 font-medium flex items-center justify-between"
                  >
                    <span>
                      {showAllCategories
                        ? 'Ver menos'
                        : `Ver ${filterOptions.categories.length - 3} más`}
                    </span>
                    {showAllCategories ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* States Section */}
            <div className="px-6 py-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Estados</h3>
              <div className="space-y-1">
                {/* All States Option */}
                <button
                  onClick={() => {
                    // Clear all states
                    filters.states.forEach((state: string) => onToggleState(state));
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-base ${
                    filters.states.length === 0
                      ? 'bg-primary-100 text-primary-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Todos los estados
                </button>

                {/* State Options (First 3 or All) */}
                {visibleStates.map((state: string) => (
                  <button
                    key={state}
                    onClick={() => onToggleState(state)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-base flex items-center gap-2 ${
                      filters.states.includes(state)
                        ? 'bg-primary-100 text-primary-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>📍</span>
                    <span>{state}</span>
                  </button>
                ))}

                {/* Show More/Less Button for States */}
                {hasMoreStates && (
                  <button
                    onClick={() => setShowAllStates(!showAllStates)}
                    className="w-full text-left px-4 py-3 rounded-lg transition-colors text-base text-primary-600 hover:bg-primary-50 font-medium flex items-center justify-between"
                  >
                    <span>
                      {showAllStates ? 'Ver menos' : `Ver ${filterOptions.states.length - 3} más`}
                    </span>
                    {showAllStates ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Price Range Section */}
            <div className="px-6 py-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Precio</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-2 font-medium">Mínimo</label>
                    <input
                      type="number"
                      value={filters.priceRange.min}
                      onChange={(e) =>
                        onUpdatePriceRange({
                          ...filters.priceRange,
                          min: Number(e.target.value),
                        })
                      }
                      min={priceRange.min}
                      max={priceRange.max}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <span className="text-gray-400 mt-8">-</span>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-2 font-medium">Máximo</label>
                    <input
                      type="number"
                      value={filters.priceRange.max}
                      onChange={(e) =>
                        onUpdatePriceRange({
                          ...filters.priceRange,
                          max: Number(e.target.value),
                        })
                      }
                      min={priceRange.min}
                      max={priceRange.max}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-600 text-center bg-gray-50 py-2 rounded-lg">
                  {formatCurrency(filters.priceRange.min)} -{' '}
                  {formatCurrency(filters.priceRange.max)} MXN
                </div>
              </div>
            </div>

            {/* Rating Section */}
            <div className="px-6 py-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Calificación mínima</h3>
              <div className="space-y-1">
                {/* Clear rating filter */}
                <button
                  onClick={() => onUpdateMinRating(0)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-base ${
                    filters.minRating === 0
                      ? 'bg-primary-100 text-primary-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Todas las calificaciones
                </button>

                {[4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => onUpdateMinRating(filters.minRating === rating ? 0 : rating)}
                    className={`w-full px-4 py-3 rounded-lg transition-colors ${
                      filters.minRating === rating
                        ? 'bg-primary-100 text-primary-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span
                        className={`text-base ${filters.minRating === rating ? 'font-semibold' : ''}`}
                      >
                        y más
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Other Filters Section */}
            <div className="px-6 py-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Otros</h3>
              <div className="space-y-1">
                <button
                  onClick={onToggleInStock}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-base ${
                    filters.inStock === true
                      ? 'bg-primary-100 text-primary-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Solo productos en stock
                </button>
                <button
                  onClick={onToggleVerified}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-base ${
                    filters.verified === true
                      ? 'bg-primary-100 text-primary-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Solo vendedores verificados
                </button>
                <button
                  onClick={onToggleFeatured}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-base ${
                    filters.featured === true
                      ? 'bg-primary-100 text-primary-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Solo productos destacados
                </button>
              </div>
            </div>
          </div>

          {/* Footer - Sticky */}
          <div className="px-6 py-4 border-t border-gray-200 bg-white">
            <button
              onClick={onResetFilters}
              disabled={activeFilterCount === 0}
              className="w-full py-3 text-center text-base font-semibold text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
