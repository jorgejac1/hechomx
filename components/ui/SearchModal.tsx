/**
 * @fileoverview Global search modal with product and category search.
 * Provides instant search results with keyboard navigation support.
 * Displays matching products and category suggestions.
 * @module components/ui/SearchModal
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUrlState } from '@/hooks/common/useUrlState';
import { FILTER_PARAM_NAMES } from '@/lib/constants/filters';
import { Product } from '@/types';
import { formatCurrency } from '@/lib';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  categories: string[];
}

export default function SearchModal({ isOpen, onClose, products, categories }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setUrlParams } = useUrlState('/productos');

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts([]);
      setFilteredCategories(categories);
      return;
    }

    const query = searchQuery.toLowerCase();

    const matchingProducts = products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.state.toLowerCase().includes(query) ||
          product.maker.toLowerCase().includes(query)
      )
      .slice(0, 6);

    const matchingCategories = categories.filter((category) =>
      category.toLowerCase().includes(query)
    );

    setFilteredProducts(matchingProducts);
    setFilteredCategories(matchingCategories);
  }, [searchQuery, products, categories]);

  if (!isOpen) return null;

  const handleClose = () => {
    setSearchQuery('');
    onClose();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setUrlParams({
        [FILTER_PARAM_NAMES.QUERY]: searchQuery.trim(),
        [FILTER_PARAM_NAMES.PAGE]: undefined,
      });
      handleClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleClose} />

      {/* Modal */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-2xl dark:shadow-gray-950/50">
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
                placeholder="Buscar productos, artesanos..."
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:outline-hidden"
              />
              <svg
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
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
          <div className="max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
            {searchQuery.trim() === '' ? (
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3 sm:mb-4">
                  Buscar por Categoría
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/productos?${FILTER_PARAM_NAMES.CATEGORY}=${encodeURIComponent(category)}`}
                      onClick={handleClose}
                      className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition text-center"
                    >
                      <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100">
                        {category}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
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
                          onClick={handleClose}
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
                      {filteredProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/productos/${product.id}`}
                          onClick={handleClose}
                          className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
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
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={`/productos?${FILTER_PARAM_NAMES.QUERY}=${encodeURIComponent(searchQuery)}`}
                      onClick={handleClose}
                      className="block mt-3 sm:mt-4 text-center py-2 sm:py-3 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm sm:text-base"
                    >
                      Ver todos los resultados para "{searchQuery}" →
                    </Link>
                  </div>
                ) : (
                  filteredCategories.length === 0 && (
                    <div className="text-center py-8 sm:py-12">
                      <svg
                        className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 dark:text-gray-600 mx-auto mb-3 sm:mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                        No se encontraron resultados para "{searchQuery}"
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-2">
                        Intenta con otros términos de búsqueda
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
