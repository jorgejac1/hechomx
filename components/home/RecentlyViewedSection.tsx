'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, ChevronRight, X } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';
import { getRecentlyViewedIds, clearRecentlyViewed } from '@/lib/utils/recently-viewed';

interface RecentlyViewedSectionProps {
  allProducts: Product[];
}

export default function RecentlyViewedSection({ allProducts }: RecentlyViewedSectionProps) {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const recentIds = getRecentlyViewedIds();

    if (recentIds.length === 0) {
      setIsLoading(false);
      return;
    }

    // Map IDs to products, maintaining order
    const products = recentIds
      .map((item) => allProducts.find((p) => p.id === item.id))
      .filter((p): p is Product => p !== undefined)
      .slice(0, 8);

    setRecentProducts(products);
    setIsLoading(false);
  }, [allProducts]);

  const handleClearHistory = () => {
    clearRecentlyViewed();
    setRecentProducts([]);
  };

  // Don't render if no recently viewed products
  if (isLoading || recentProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Vistos Recientemente</h2>
              <p className="text-sm text-gray-600 hidden sm:block">
                Productos que has visto últimamente
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Limpiar</span>
            </button>
            <Link
              href="/productos"
              className="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base"
            >
              Ver todos
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {recentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
