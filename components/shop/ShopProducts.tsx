'use client';

import { useState } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import EmptyState from '@/components/common/feedback/EmptyState';
import { Package } from 'lucide-react';

interface ShopProductsProps {
  products: Product[];
  shopName: string;
}

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
        icon={<Package className="w-full h-full" />}
        title="Sin productos disponibles"
        description={`${shopName} aún no tiene productos publicados.`}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          <span className="font-semibold text-gray-900">{products.length}</span> productos
          disponibles
        </p>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer transition-all font-medium text-gray-900"
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
