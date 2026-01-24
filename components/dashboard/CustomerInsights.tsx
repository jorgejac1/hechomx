/**
 * @fileoverview Customer insights component for the seller dashboard.
 * Displays detailed customer analytics including top customers, repeat buyers,
 * purchase patterns, seasonal trends, product combinations frequently bought
 * together, and upcoming customer birthdays for personalized marketing.
 * @module components/dashboard/CustomerInsights
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { getCustomerInsights } from '@/lib/api/sellerApi';
import type { CustomerInsightsData } from '@/lib/types';
import { formatCurrency, formatRelativeTime } from '@/lib';
import {
  Users,
  TrendingUp,
  ShoppingBag,
  Heart,
  Crown,
  Award,
  Calendar,
  Package,
  Loader2,
  Sparkles,
  Cake,
} from 'lucide-react';
import Avatar from '@/components/common/Avatar';
import Progress from '@/components/common/Progress';
import ErrorState from '@/components/common/feedback/ErrorState';

/**
 * @interface CustomerInsightsProps
 * Props for the CustomerInsights component.
 */
interface CustomerInsightsProps {
  /** Email of the seller to load customer insights for */
  userEmail: string;
}

/**
 * Configuration for customer lifetime value tier display.
 * Maps tier levels to labels, colors, and icons.
 */
const LIFETIME_VALUE_CONFIG = {
  vip: {
    label: 'VIP',
    color:
      'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 border-purple-300 dark:border-purple-700',
    icon: Crown,
  },
  high: {
    label: 'Alto Valor',
    color:
      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700',
    icon: Award,
  },
  medium: {
    label: 'Valor Medio',
    color:
      'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-300 dark:border-blue-700',
    icon: ShoppingBag,
  },
  low: {
    label: 'Nuevo',
    color:
      'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-600',
    icon: Users,
  },
};

export default function CustomerInsights({ userEmail }: CustomerInsightsProps) {
  const [data, setData] = useState<CustomerInsightsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    try {
      const result = await getCustomerInsights(userEmail);
      setData(result);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
        <ErrorState
          type="error"
          title="Error al cargar datos"
          message="No pudimos cargar la información de clientes. Por favor, intenta de nuevo."
          onRetry={loadData}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
        <p className="text-center text-gray-600 dark:text-gray-400">
          No hay datos de clientes disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Customers Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Crown className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          Mejores Clientes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.topCustomers.slice(0, 3).map((customer, index) => (
            <div
              key={customer.id}
              className="bg-linear-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg p-6 border-2 border-yellow-200 dark:border-yellow-700"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-yellow-600 text-white rounded-full font-bold">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-gray-100">{customer.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {customer.purchases} compras
                  </p>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(customer.totalSpent)}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Total gastado</p>
            </div>
          ))}
        </div>
      </div>

      {/* Repeat Customers */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
          Clientes Recurrentes ({data.repeatCustomers.length})
        </h3>
        <div className="space-y-4">
          {data.repeatCustomers.map((customer) => {
            const lvConfig = LIFETIME_VALUE_CONFIG[customer.lifetimeValue];
            const LvIcon = lvConfig.icon;
            return (
              <div
                key={customer.id}
                className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                <Avatar src={customer.avatar} name={customer.name} alt={customer.name} size="xl" />

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-bold text-gray-900 dark:text-gray-100">{customer.name}</p>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${lvConfig.color}`}
                    >
                      <LvIcon className="w-3 h-3" />
                      {lvConfig.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-2">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Compras</p>
                      <p className="font-bold text-gray-900 dark:text-gray-100">
                        {customer.totalPurchases}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-2">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Total Gastado</p>
                      <p className="font-bold text-gray-900 dark:text-gray-100">
                        {formatCurrency(customer.totalSpent)}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-2">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Última Compra</p>
                      <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                        {formatRelativeTime(customer.lastPurchase)}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-2">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Promedio</p>
                      <p className="font-bold text-gray-900 dark:text-gray-100">
                        {formatCurrency(customer.totalSpent / customer.totalPurchases)}
                      </p>
                    </div>
                  </div>

                  {customer.favoriteProducts.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Favoritos: {customer.favoriteProducts.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Purchase Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Common Product Combinations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Productos que se Compran Juntos
          </h3>
          <div className="space-y-3">
            {data.purchasePatterns.mostCommonCombinations.map((combo, index) => (
              <div
                key={index}
                className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    Combo #{index + 1}
                  </span>
                </div>
                <div className="space-y-1">
                  {combo.map((product, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                      <p className="text-sm text-gray-900 dark:text-gray-100">{product}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg">
            <p className="text-xs text-yellow-900 dark:text-yellow-400">
              <strong>Sugerencia:</strong> Considera crear paquetes o promociones con estos
              productos
            </p>
          </div>
        </div>

        {/* Seasonal Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Tendencias Estacionales
          </h3>
          <div className="space-y-4">
            {data.purchasePatterns.seasonalTrends.map((trend, index) => {
              const displayWidth = Math.min(trend.increase, 100);

              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {trend.season}
                    </span>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">
                      +{trend.increase}%
                    </span>
                  </div>
                  <Progress
                    value={displayWidth}
                    max={100}
                    size="lg"
                    variant="primary"
                    animated
                    barClassName="bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-700">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <p className="text-sm font-semibold text-purple-900 dark:text-purple-400">
                Frecuencia de Compra
              </p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {data.purchasePatterns.averageTimeBetweenPurchases} días
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Tiempo promedio entre compras
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Birthdays */}
      {data.upcomingBirthdays.length > 0 && (
        <div className="bg-linear-to-br from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/30 rounded-xl shadow-md dark:shadow-gray-900/50 p-6 border-2 border-pink-200 dark:border-pink-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Cake className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            Cumpleaños Próximos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.upcomingBirthdays.map((birthday) => (
              <div key={birthday.id} className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-bold text-gray-900 dark:text-gray-100">{birthday.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(birthday.date).toLocaleDateString('es-MX', {
                    day: 'numeric',
                    month: 'long',
                  })}
                </p>
                <p className="text-xs text-pink-600 dark:text-pink-400 font-semibold mt-1">
                  En {birthday.daysUntil} días
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
            Envía un mensaje personalizado o un descuento especial
          </p>
        </div>
      )}
    </div>
  );
}
