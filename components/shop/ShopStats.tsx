'use client';

import { Package, Star, ShoppingBag, Clock, TrendingUp } from 'lucide-react';
import { ExtendedMakerProfile } from '@/lib/data/mockUsers';

interface ShopStatsProps {
  stats: ExtendedMakerProfile['stats'];
  actualProductCount?: number;
  actualRating?: number;
  actualReviewCount?: number;
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
        <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mx-auto mb-2">
          <Package className="w-6 h-6 text-primary-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{productCount}</p>
        <p className="text-sm text-gray-600">Productos</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2">
          <Star className="w-6 h-6 text-yellow-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{rating > 0 ? rating.toFixed(1) : '—'}</p>
        <p className="text-sm text-gray-600">
          Calificación
          {actualReviewCount !== undefined && actualReviewCount > 0 && ` (${actualReviewCount})`}
        </p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
          <ShoppingBag className="w-6 h-6 text-green-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{salesCount}</p>
        <p className="text-sm text-gray-600">Ventas</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
          <Clock className="w-6 h-6 text-blue-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{responseTime}</p>
        <p className="text-sm text-gray-600">Respuesta</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
          <TrendingUp className="w-6 h-6 text-purple-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{responseRate}%</p>
        <p className="text-sm text-gray-600">Tasa de Respuesta</p>
      </div>
    </div>
  );
}
