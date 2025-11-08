'use client';

import { useState, useEffect } from 'react';
import { AnalyticsData, getSellerAnalytics } from '@/lib/api/sellerApi';
import { formatCurrency } from '@/lib';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  MapPin,
  Clock,
  Target,
  Loader2,
  Calendar,
  BarChart3,
} from 'lucide-react';

interface AnalyticsDashboardProps {
  userEmail: string;
}

export default function AnalyticsDashboard({ userEmail }: AnalyticsDashboardProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const result = await getSellerAnalytics(userEmail);
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
        <p className="text-center text-gray-600">No hay datos de análisis disponibles</p>
      </div>
    );
  }

  // Fix: Ensure we're working with numbers and handle potential division by zero
  const thisWeek = Number(data.revenue.thisWeek) || 0;
  const lastWeek = Number(data.revenue.lastWeek) || 1; // Avoid division by zero
  const revenueChange = lastWeek > 0 ? ((thisWeek - lastWeek) / lastWeek) * 100 : 0;
  const isPositiveChange = revenueChange >= 0;

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Análisis de Ventas</h3>
            <p className="text-sm text-gray-600">Desempeño de tu tienda</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                timeRange === 'week'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Esta Semana
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                timeRange === 'month'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Este Mes
            </button>
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-600 rounded-lg">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-700">
                {timeRange === 'week' ? 'Esta Semana' : 'Este Mes'}
              </p>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {formatCurrency(
                timeRange === 'week' ? data.revenue.thisWeek : data.revenue.thisMonth
              )}
            </p>
            <div className="flex items-center gap-2">
              {isPositiveChange ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span
                className={`text-sm font-semibold ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}
              >
                {isPositiveChange ? '+' : ''}
                {revenueChange.toFixed(1)}%
              </span>
              <span className="text-sm text-gray-600">vs. semana anterior</span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-700">Ticket Promedio</p>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {formatCurrency(data.averageOrderValue)}
            </p>
            <p className="text-sm text-gray-600">Por pedido</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-700">Conversión</p>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">{data.conversionRate}%</p>
            <p className="text-sm text-gray-600">De visitantes a compradores</p>
          </div>
        </div>

        {/* Sales Trend Mini Chart */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Tendencia de Ventas (Últimos 7 días)
          </h4>
          <div className="flex items-end justify-between h-32 gap-2">
            {data.salesTrend.map((day, index) => {
              const maxRevenue = Math.max(...data.salesTrend.map((d) => Number(d.revenue)));
              const height = maxRevenue > 0 ? (Number(day.revenue) / maxRevenue) * 100 : 0;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full group">
                    <div
                      className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all hover:from-primary-700 hover:to-primary-500 cursor-pointer"
                      style={{ height: `${height}%`, minHeight: '8px' }}
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      <p className="font-semibold">{formatCurrency(day.revenue)}</p>
                      <p>{day.sales} ventas</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">
                    {new Date(day.date).toLocaleDateString('es-MX', { weekday: 'short' })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Productos Más Vendidos
        </h3>
        <div className="space-y-3">
          {data.topProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full">
                <span className="text-sm font-bold text-primary-700">#{index + 1}</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">{product.sales} unidades vendidas</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{formatCurrency(product.revenue)}</p>
                <div className="flex items-center gap-1 justify-end">
                  {product.trend === 'up' && (
                    <>
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-600 font-semibold">En aumento</span>
                    </>
                  )}
                  {product.trend === 'down' && (
                    <>
                      <TrendingDown className="w-4 h-4 text-red-600" />
                      <span className="text-xs text-red-600 font-semibold">En descenso</span>
                    </>
                  )}
                  {product.trend === 'stable' && (
                    <span className="text-xs text-gray-600 font-semibold">Estable</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Fuentes de Tráfico</h3>
          <div className="space-y-4">
            {data.trafficSources.map((source) => (
              <div key={source.source}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">{source.source}</span>
                  <span className="text-sm font-bold text-primary-600">{source.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-600">{source.visits} visitas</span>
                  <span className="text-xs text-green-600 font-semibold">
                    {source.conversions} conversiones
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Times */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Mejores Horarios de Venta
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Mejor día</p>
              <p className="text-2xl font-bold text-gray-900">{data.peakTimes.bestDay}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Mejor horario</p>
              <p className="text-2xl font-bold text-gray-900">{data.peakTimes.bestHour}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Entre semana</p>
                <p className="text-xl font-bold text-gray-900">
                  {data.peakTimes.weekdayVsWeekend.weekday}%
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Fin de semana</p>
                <p className="text-xl font-bold text-gray-900">
                  {data.peakTimes.weekdayVsWeekend.weekend}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Cities */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-600" />
            Ciudades Principales
          </h3>
          <div className="space-y-3">
            {data.customerDemographics.topCities.map((city, index) => (
              <div key={city.city} className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-400 w-6">#{index + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900">{city.city}</span>
                    <span className="text-sm font-bold text-gray-900">{city.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-red-500 h-1.5 rounded-full"
                      style={{ width: `${city.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Age Groups - NEW! Uses the Users icon */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            Grupos de Edad
          </h3>
          <div className="space-y-3">
            {data.customerDemographics.ageGroups.map((group, index) => (
              <div key={group.range} className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-400 w-6">#{index + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900">{group.range} años</span>
                    <span className="text-sm font-bold text-gray-900">{group.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-indigo-500 h-1.5 rounded-full"
                      style={{ width: `${group.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Forecast */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Pronóstico
          </h3>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
            <p className="text-sm text-gray-600 mb-2">Estimado para el próximo mes</p>
            <p className="text-4xl font-bold text-gray-900 mb-3">
              {formatCurrency(data.forecast.nextMonth)}
            </p>
            <div className="flex items-center gap-2">
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  data.forecast.confidence === 'high'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                Confianza: {data.forecast.confidence === 'high' ? 'Alta' : 'Media'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
