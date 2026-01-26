/**
 * @fileoverview Enhanced global search modal with autocomplete features.
 * Provides intelligent search with:
 * - Debounced search (300ms delay)
 * - Search history persistence
 * - Fuzzy matching for typo tolerance
 * - Keyboard navigation support
 * - Category and product suggestions
 * @module components/ui/SearchModal
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUrlState } from '@/hooks/common/useUrlState';
import { FILTER_PARAM_NAMES } from '@/lib/constants/filters';
import { Product } from '@/types';
import { formatCurrency } from '@/lib';
import {
  searchProducts,
  getSearchHistory,
  addToSearchHistory,
  removeFromSearchHistory,
  clearSearchHistory,
  SearchHistoryItem,
} from '@/lib/utils/search';
import { Clock, X, Search, TrendingUp, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  categories: string[];
}

// Debounce delay in milliseconds
const DEBOUNCE_DELAY = 300;

export default function SearchModal({ isOpen, onClose, products, categories }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { setUrlParams } = useUrlState('/productos');

  // Load search history on mount
  useEffect(() => {
    if (isOpen) {
      setSearchHistory(getSearchHistory());
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Debounce search query
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsSearching(false);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Search products with fuzzy matching
  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      setFilteredProducts([]);
      setFilteredCategories(categories);
      return;
    }

    // Use fuzzy search
    const results = searchProducts(products, debouncedQuery, { limit: 6 });
    setFilteredProducts(results.map((r) => r.product));

    // Filter categories with simple matching
    const query = debouncedQuery.toLowerCase();
    const matchingCategories = categories.filter((category) =>
      category.toLowerCase().includes(query)
    );
    setFilteredCategories(matchingCategories);

    // Reset selection when results change
    setSelectedIndex(-1);
  }, [debouncedQuery, products, categories]);

  // Define handlers before useCallback that uses them
  const handleClose = useCallback(() => {
    setSearchQuery('');
    setDebouncedQuery('');
    setSelectedIndex(-1);
    onClose();
  }, [onClose]);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        addToSearchHistory(searchQuery.trim());
        setUrlParams({
          [FILTER_PARAM_NAMES.QUERY]: searchQuery.trim(),
          [FILTER_PARAM_NAMES.PAGE]: undefined,
        });
        handleClose();
      }
    },
    [searchQuery, setUrlParams, handleClose]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const totalItems =
        filteredProducts.length + filteredCategories.length + (searchHistory.length > 0 ? 1 : 0);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
          break;
        case 'Escape':
          handleClose();
          break;
        case 'Enter':
          if (selectedIndex === -1 && searchQuery.trim()) {
            handleSearchSubmit(e as unknown as React.FormEvent);
          }
          break;
      }
    },
    [
      filteredProducts.length,
      filteredCategories.length,
      searchHistory.length,
      selectedIndex,
      searchQuery,
      handleClose,
      handleSearchSubmit,
    ]
  );

  if (!isOpen) return null;

  const handleHistoryClick = (query: string) => {
    setSearchQuery(query);
    addToSearchHistory(query);
    setUrlParams({
      [FILTER_PARAM_NAMES.QUERY]: query,
      [FILTER_PARAM_NAMES.PAGE]: undefined,
    });
    handleClose();
  };

  const handleRemoveHistoryItem = (e: React.MouseEvent, query: string) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromSearchHistory(query);
    setSearchHistory(getSearchHistory());
  };

  const handleClearHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
  };

  const handleProductClick = () => {
    if (searchQuery.trim()) {
      addToSearchHistory(searchQuery.trim());
    }
    handleClose();
  };

  const handleCategoryClick = () => {
    if (searchQuery.trim()) {
      addToSearchHistory(searchQuery.trim());
    }
    handleClose();
  };

  const showHistory = searchQuery.trim() === '' && searchHistory.length > 0;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={handleClose} aria-hidden="true" />

      {/* Modal */}
      <div
        className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-2xl dark:shadow-gray-950/50"
        role="dialog"
        aria-modal="true"
        aria-label="Búsqueda"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Search Input */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6"
          >
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar productos, artesanos..."
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:outline-hidden"
                aria-label="Buscar productos"
                autoComplete="off"
              />
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                {isSearching && searchQuery.trim() ? (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 dark:text-gray-500" />
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm sm:text-base font-medium whitespace-nowrap"
            >
              Cancelar
            </button>
          </form>

          {/* Results */}
          <div ref={resultsRef} className="max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
            {/* Search History */}
            {showHistory && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Búsquedas recientes
                  </h3>
                  <button
                    onClick={handleClearHistory}
                    className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    Limpiar
                  </button>
                </div>
                <div className="space-y-1">
                  {searchHistory.slice(0, 5).map((item, index) => (
                    <button
                      key={`${item.query}-${index}`}
                      onClick={() => handleHistoryClick(item.query)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition group ${
                        selectedIndex === index
                          ? 'bg-primary-50 dark:bg-primary-900/30'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                          {item.query}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleRemoveHistoryItem(e, item.query)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label={`Eliminar "${item.query}" del historial`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Categories when empty */}
            {searchQuery.trim() === '' && (
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3 sm:mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Buscar por Categoría
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/productos?${FILTER_PARAM_NAMES.CATEGORY}=${encodeURIComponent(category)}`}
                      onClick={handleCategoryClick}
                      className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition text-center"
                    >
                      <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100">
                        {category}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {searchQuery.trim() !== '' && (
              <>
                {/* Matching Categories */}
                {filteredCategories.length > 0 && (
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2 sm:mb-3">
                      Categorías
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {filteredCategories.map((category) => (
                        <Link
                          key={category}
                          href={`/productos?${FILTER_PARAM_NAMES.CATEGORY}=${encodeURIComponent(category)}`}
                          onClick={handleCategoryClick}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full hover:bg-primary-200 dark:hover:bg-primary-800/50 transition text-sm sm:text-base"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matching Products */}
                {filteredProducts.length > 0 ? (
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2 sm:mb-3">
                      Productos ({filteredProducts.length})
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {filteredProducts.map((product, index) => (
                        <Link
                          key={product.id}
                          href={`/productos/${product.id}`}
                          onClick={handleProductClick}
                          className={`flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg transition ${
                            selectedIndex === filteredCategories.length + index
                              ? 'bg-primary-50 dark:bg-primary-900/30'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 truncate">
                              {product.name}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                              {product.category} • {product.state}
                            </p>
                            <p className="text-primary-600 dark:text-primary-400 font-bold text-sm sm:text-base">
                              {formatCurrency(product.price)} MXN
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={`/productos?${FILTER_PARAM_NAMES.QUERY}=${encodeURIComponent(searchQuery)}`}
                      onClick={handleProductClick}
                      className="flex items-center justify-center gap-2 mt-3 sm:mt-4 py-2 sm:py-3 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm sm:text-base"
                    >
                      Ver todos los resultados para &quot;{searchQuery}&quot;
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  !isSearching &&
                  filteredCategories.length === 0 && (
                    <div className="text-center py-8 sm:py-12">
                      <Search className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 dark:text-gray-600 mx-auto mb-3 sm:mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                        No se encontraron resultados para &quot;{searchQuery}&quot;
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-2">
                        Intenta con otros términos de búsqueda o revisa la ortografía
                      </p>
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
