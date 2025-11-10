'use client';

import { Package, Star, ShoppingBag, Clock, TrendingUp } from 'lucide-react';
import { ExtendedMakerProfile } from '@/lib/data/mockUsers';

interface ShopStatsProps {
  stats: ExtendedMakerProfile['stats'];
}

export default function ShopStats({ stats }: ShopStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mx-auto mb-2">
          <Package className="w-6 h-6 text-primary-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.productsCount}</p>
        <p className="text-sm text-gray-600">Productos</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2">
          <Star className="w-6 h-6 text-yellow-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.rating.toFixed(1)}</p>
        <p className="text-sm text-gray-600">Calificación</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
          <ShoppingBag className="w-6 h-6 text-green-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.salesCount}</p>
        <p className="text-sm text-gray-600">Ventas</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
          <Clock className="w-6 h-6 text-blue-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.responseTime}</p>
        <p className="text-sm text-gray-600">Respuesta</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
          <TrendingUp className="w-6 h-6 text-purple-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.responseRate}%</p>
        <p className="text-sm text-gray-600">Tasa de Respuesta</p>
      </div>
    </div>
  );
}
