'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

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

    // Filter products
    const matchingProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.state.toLowerCase().includes(query) ||
        product.maker.toLowerCase().includes(query)
    ).slice(0, 6); // Limit to 6 results

    // Filter categories
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

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Input */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos, artesanos, categorías..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
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
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              Cancelar
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[70vh] overflow-y-auto">
            {searchQuery.trim() === '' ? (
              // Show all categories when no search
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                  Buscar por Categoría
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/productos?categoria=${encodeURIComponent(category)}`}
                      onClick={handleClose}
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition text-center"
                    >
                      <p className="font-medium text-gray-900">{category}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Matching Categories */}
                {filteredCategories.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                      Categorías
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {filteredCategories.map((category) => (
                        <Link
                          key={category}
                          href={`/productos?categoria=${encodeURIComponent(category)}`}
                          onClick={handleClose}
                          className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition"
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
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                      Productos ({filteredProducts.length})
                    </h3>
                    <div className="space-y-3">
                      {filteredProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/productos/${product.id}`}
                          onClick={handleClose}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition"
                        >
                          <div className="relative w-16 h-16 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-500 truncate">
                              {product.category} • {product.state}
                            </p>
                            <p className="text-primary-600 font-bold">
                              ${product.price.toLocaleString('es-MX')} MXN
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={`/productos?q=${encodeURIComponent(searchQuery)}`}
                      onClick={handleClose}
                      className="block mt-4 text-center py-3 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Ver todos los resultados para "{searchQuery}" →
                    </Link>
                  </div>
                ) : (
                  filteredCategories.length === 0 && (
                    <div className="text-center py-12">
                      <svg
                        className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
                      <p className="text-gray-500">
                        No se encontraron resultados para "{searchQuery}"
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
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