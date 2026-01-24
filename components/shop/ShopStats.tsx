/**
 * @fileoverview Shop statistics display component
 * Renders a grid of shop performance metrics including product count, rating,
 * sales count, response time, and response rate. Supports both mock and actual
 * data values with fallback behavior.
 * @module components/shop/ShopStats
 */

'use client';

import { Package, Star, ShoppingBag, Clock, TrendingUp } from 'lucide-react';
import type { ExtendedMakerProfile } from '@/lib/data/mockUsers';

/**
 * Props for the ShopStats component
 * @interface ShopStatsProps
 */
interface ShopStatsProps {
  /** Mock statistics from the maker profile */
  stats: ExtendedMakerProfile['stats'];
  /** Actual product count (overrides mock if provided) */
  actualProductCount?: number;
  /** Actual rating calculated from reviews (overrides mock if provided) */
  actualRating?: number;
  /** Actual number of reviews (for display purposes) */
  actualReviewCount?: number;
  /** Actual sales count from orders (overrides mock if provided) */
  actualSalesCount?: number;
}

export default function ShopStats({
  stats,
  actualProductCount,
  actualRating,
  actualReviewCount,
  actualSalesCount,
}: ShopStatsProps) {
  // Use actual values if provided, otherwise fall back to mock stats
  const productCount = actualProductCount ?? stats.productsCount;
  const rating = actualRating ?? stats.rating;
  const salesCount = actualSalesCount ?? stats.salesCount;

  // For response time and rate, we don't have real data yet
  const responseTime = stats.responseTime;
  const responseRate = stats.responseRate;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full mx-auto mb-2">
          <Package className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{productCount}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Productos</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mx-auto mb-2">
          <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {rating > 0 ? rating.toFixed(1) : '—'}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Calificación
          {actualReviewCount !== undefined && actualReviewCount > 0 && ` (${actualReviewCount})`}
        </p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-2">
          <ShoppingBag className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{salesCount}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Ventas</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto mb-2">
          <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{responseTime}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Respuesta</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mx-auto mb-2">
          <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{responseRate}%</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Tasa de Respuesta</p>
      </div>
    </div>
  );
}
