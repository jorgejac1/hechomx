/**
 * @fileoverview Shop products grid component with sorting functionality
 * Displays a sortable grid of products belonging to a shop. Supports sorting
 * by newest, price (ascending/descending), and popularity. Shows an empty state
 * when no products are available.
 * @module components/shop/ShopProducts
 */

'use client';

import { useState } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import EmptyState from '@/components/common/EmptyState';
import { Package } from 'lucide-react';

/**
 * Props for the ShopProducts component
 * @interface ShopProductsProps
 */
interface ShopProductsProps {
  /** Array of products to display in the grid */
  products: Product[];
  /** Shop name used for display in empty state */
  shopName: string;
}

/**
 * Available sorting options for the products grid
 * @typedef {'newest' | 'price-asc' | 'price-desc' | 'popular'} SortOption
 */
type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular';

export default function ShopProducts({ products, shopName }: ShopProductsProps) {
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'popular':
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      case 'newest':
      default:
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    }
  });

  if (products.length === 0) {
    return (
      <EmptyState
        icon={<Package className="w-12 h-12" />}
        title="Sin productos disponibles"
        description={`${shopName} aún no tiene productos publicados.`}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-gray-100">{products.length}</span>{' '}
          productos disponibles
        </p>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer transition-all font-medium text-gray-900 dark:text-gray-100"
        >
          <option value="newest">Más recientes</option>
          <option value="popular">Más populares</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
