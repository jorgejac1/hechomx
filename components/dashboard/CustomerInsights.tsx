'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CustomerInsightsData, getCustomerInsights } from '@/lib/api/sellerApi';
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
} from 'lucide-react';

interface CustomerInsightsProps {
  userEmail: string;
}

const LIFETIME_VALUE_CONFIG = {
  vip: {
    label: 'VIP',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    icon: Crown,
  },
  high: {
    label: 'Alto Valor',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    icon: Award,
  },
  medium: {
    label: 'Valor Medio',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    icon: ShoppingBag,
  },
  low: {
    label: 'Nuevo',
    color: 'bg-gray-100 text-gray-800 border-gray-300',
    icon: Users,
  },
};

export default function CustomerInsights({ userEmail }: CustomerInsightsProps) {
  const [data, setData] = useState<CustomerInsightsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const result = await getCustomerInsights(userEmail);
      setData(result);
      setIsLoading(false);
    }
    loadData();
  }, [userEmail]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-center text-gray-600">No hay datos de clientes disponibles</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Customers Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Crown className="w-6 h-6 text-yellow-600" />
          Mejores Clientes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.topCustomers.slice(0, 3).map((customer, index) => (
            <div
              key={customer.id}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border-2 border-yellow-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-yellow-600 text-white rounded-full font-bold">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{customer.name}</p>
                  <p className="text-sm text-gray-600">{customer.purchases} compras</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(customer.totalSpent)}
              </p>
              <p className="text-xs text-gray-600 mt-1">Total gastado</p>
            </div>
          ))}
        </div>
      </div>

      {/* Repeat Customers */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-600" />
          Clientes Recurrentes ({data.repeatCustomers.length})
        </h3>
        <div className="space-y-4">
          {data.repeatCustomers.map((customer) => {
            const lvConfig = LIFETIME_VALUE_CONFIG[customer.lifetimeValue];
            const LvIcon = lvConfig.icon;
            return (
              <div
                key={customer.id}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                {customer.avatar ? (
                  <Image
                    src={customer.avatar}
                    alt={customer.name}
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="w-7 h-7 text-primary-600" />
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-bold text-gray-900">{customer.name}</p>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${lvConfig.color}`}
                    >
                      <LvIcon className="w-3 h-3" />
                      {lvConfig.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-xs text-gray-600">Compras</p>
                      <p className="font-bold text-gray-900">{customer.totalPurchases}</p>
                    </div>
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-xs text-gray-600">Total Gastado</p>
                      <p className="font-bold text-gray-900">
                        {formatCurrency(customer.totalSpent)}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-xs text-gray-600">Última Compra</p>
                      <p className="text-xs font-semibold text-gray-900">
                        {formatRelativeTime(customer.lastPurchase)}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-xs text-gray-600">Promedio</p>
                      <p className="font-bold text-gray-900">
                        {formatCurrency(customer.totalSpent / customer.totalPurchases)}
                      </p>
                    </div>
                  </div>

                  {customer.favoriteProducts.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-600" />
                      <p className="text-xs text-gray-600">
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
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            Productos que se Compran Juntos
          </h3>
          <div className="space-y-3">
            {data.purchasePatterns.mostCommonCombinations.map((combo, index) => (
              <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-blue-600">Combo #{index + 1}</span>
                </div>
                <div className="space-y-1">
                  {combo.map((product, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <p className="text-sm text-gray-900">{product}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-900">
              <strong>💡 Sugerencia:</strong> Considera crear paquetes o promociones con estos
              productos
            </p>
          </div>
        </div>

        {/* Seasonal Trends */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Tendencias Estacionales
          </h3>
          <div className="space-y-4">
            {data.purchasePatterns.seasonalTrends.map((trend, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">{trend.season}</span>
                  <span className="text-sm font-bold text-green-600">+{trend.increase}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                    style={{ width: `${trend.increase}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <p className="text-sm font-semibold text-purple-900">Frecuencia de Compra</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {data.purchasePatterns.averageTimeBetweenPurchases} días
            </p>
            <p className="text-xs text-gray-600">Tiempo promedio entre compras</p>
          </div>
        </div>
      </div>

      {/* Upcoming Birthdays */}
      {data.upcomingBirthdays.length > 0 && (
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl shadow-md p-6 border-2 border-pink-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            🎂 Cumpleaños Próximos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.upcomingBirthdays.map((birthday) => (
              <div key={birthday.id} className="bg-white rounded-lg p-4">
                <p className="font-bold text-gray-900">{birthday.name}</p>
                <p className="text-sm text-gray-600">
                  {new Date(birthday.date).toLocaleDateString('es-MX', {
                    day: 'numeric',
                    month: 'long',
                  })}
                </p>
                <p className="text-xs text-pink-600 font-semibold mt-1">
                  En {birthday.daysUntil} días
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-4">
            💡 Envía un mensaje personalizado o un descuento especial
          </p>
        </div>
      )}
    </div>
  );
}
