/**
 * @fileoverview Analytics dashboard component displaying comprehensive sales data.
 * Features revenue overview, sales trends, top products, traffic sources,
 * peak selling times, customer demographics, and sales forecasts.
 * Supports weekly and monthly time range filtering.
 * @module components/dashboard/AnalyticsDashboard
 */

'use client';

import { useState, useEffect } from 'react';
import { getSellerAnalytics } from '@/lib/api/sellerApi';
import type { AnalyticsData } from '@/lib/types';
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
import ConversionFunnel from './ConversionFunnel';
import ProductConversions from './ProductConversions';

/**
 * @interface AnalyticsDashboardProps
 * Props for the AnalyticsDashboard component.
 */
interface AnalyticsDashboardProps {
  /** Email of the seller to load analytics for */
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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
        <p className="text-center text-gray-600 dark:text-gray-400">
          No hay datos de análisis disponibles
        </p>
      </div>
    );
  }

  // Get data based on selected time range
  const currentRevenue = timeRange === 'week' ? data.revenue.thisWeek : data.revenue.thisMonth;
  const previousRevenue = timeRange === 'week' ? data.revenue.lastWeek : data.revenue.lastMonth;
  const revenueChange =
    previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;
  const isPositiveChange = revenueChange >= 0;

  // Get period-specific stats (with fallback to legacy fields)
  const periodStats = data.stats?.[timeRange] || {
    averageOrderValue: data.averageOrderValue,
    conversionRate: data.conversionRate,
  };

  // Get sales trend data for the selected period (with fallback)
  const salesTrendData =
    data.salesTrend?.[timeRange] ||
    (Array.isArray(data.salesTrend) ? data.salesTrend : data.salesTrend?.week) ||
    [];

  const comparisonText = timeRange === 'week' ? 'vs. semana anterior' : 'vs. mes anterior';
  const trendTitle = timeRange === 'week' ? 'Últimos 7 días' : 'Últimas 5 semanas';

  // Get conversion funnel data for the selected period
  const funnelData = data.conversionFunnel?.[timeRange] || [];
  const funnelPeriodLabel = timeRange === 'week' ? 'Esta semana' : 'Este mes';

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
              Análisis de Ventas
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Desempeño de tu tienda
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeRange('week')}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition min-h-[44px] ${
                timeRange === 'week'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Esta Semana
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition min-h-[44px] ${
                timeRange === 'month'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Este Mes
            </button>
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg p-4 sm:p-6 border-2 border-green-200 dark:border-green-700 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="p-1.5 sm:p-2 bg-green-600 rounded-lg">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                {timeRange === 'week' ? 'Esta Semana' : 'Este Mes'}
              </p>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {formatCurrency(
                timeRange === 'week' ? data.revenue.thisWeek : data.revenue.thisMonth
              )}
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              {isPositiveChange ? (
                <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
              )}
              <span
                className={`text-xs sm:text-sm font-semibold ${isPositiveChange ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
              >
                {isPositiveChange ? '+' : ''}
                {revenueChange.toFixed(1)}%
              </span>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {comparisonText}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                Ticket Promedio
              </p>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">
              {formatCurrency(periodStats.averageOrderValue)}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Por pedido</p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 sm:p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="p-1.5 sm:p-2 bg-purple-600 rounded-lg">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                Conversión
              </p>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">
              {periodStats.conversionRate}%
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              De visitantes a compradores
            </p>
          </div>
        </div>

        {/* Sales Trend Mini Chart */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Tendencia de Ventas ({trendTitle})
          </h4>
          <div
            className="flex items-end justify-between gap-1 sm:gap-2 min-w-[300px]"
            style={{ height: '100px' }}
          >
            {salesTrendData.map((day, index) => {
              const maxRevenue = Math.max(...salesTrendData.map((d) => Number(d.revenue)));
              const heightPercentage =
                maxRevenue > 0 ? (Number(day.revenue) / maxRevenue) * 100 : 0;
              const heightPx = Math.max((heightPercentage / 100) * 100, 8);

              // Format label based on time range
              const dateLabel =
                timeRange === 'week'
                  ? new Date(day.date).toLocaleDateString('es-MX', { weekday: 'short' })
                  : new Date(day.date).toLocaleDateString('es-MX', {
                      day: 'numeric',
                      month: 'short',
                    });

              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-1 sm:gap-2 min-w-[36px]"
                >
                  <div className="relative w-full group flex items-end" style={{ height: '100px' }}>
                    <div
                      className="w-full bg-linear-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all hover:from-primary-700 hover:to-primary-500 cursor-pointer"
                      style={{ height: `${heightPx}px` }}
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      <p className="font-semibold">{formatCurrency(day.revenue)}</p>
                      <p>{day.sales} ventas</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium truncate w-full text-center">
                    {dateLabel}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
          Productos Más Vendidos
        </h3>
        <div className="space-y-2 sm:space-y-3">
          {data.topProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full shrink-0">
                <span className="text-xs sm:text-sm font-bold text-primary-700 dark:text-primary-400">
                  #{index + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base truncate">
                  {product.name}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {product.sales} unidades
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                  {formatCurrency(product.revenue)}
                </p>
                <div className="flex items-center gap-1 justify-end">
                  {product.trend === 'up' && (
                    <>
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                      <span className="text-[10px] sm:text-xs text-green-600 dark:text-green-400 font-semibold hidden sm:inline">
                        En aumento
                      </span>
                    </>
                  )}
                  {product.trend === 'down' && (
                    <>
                      <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-red-400" />
                      <span className="text-[10px] sm:text-xs text-red-600 dark:text-red-400 font-semibold hidden sm:inline">
                        En descenso
                      </span>
                    </>
                  )}
                  {product.trend === 'stable' && (
                    <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-semibold hidden sm:inline">
                      Estable
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversion Funnel */}
      {funnelData.length > 0 && (
        <ConversionFunnel stages={funnelData} periodLabel={funnelPeriodLabel} />
      )}

      {/* Product Conversions */}
      {data.productConversions && data.productConversions.length > 0 && (
        <ProductConversions products={data.productConversions} />
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
            Fuentes de Tráfico
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {data.trafficSources.map((source) => (
              <div key={source.source}>
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {source.source}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-primary-600 dark:text-primary-400">
                    {source.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                  <div
                    className="bg-primary-600 h-1.5 sm:h-2 rounded-full transition-all"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                    {source.visits} visitas
                  </span>
                  <span className="text-[10px] sm:text-xs text-green-600 dark:text-green-400 font-semibold">
                    {source.conversions} conv.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Times */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
            Mejores Horarios
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Mejor día</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                {data.peakTimes.bestDay}
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-700">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                Mejor horario
              </p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                {data.peakTimes.bestHour}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Entre semana
                </p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  {data.peakTimes.weekdayVsWeekend.weekday}%
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Fin de semana
                </p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  {data.peakTimes.weekdayVsWeekend.weekend}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Cities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" />
            Ciudades Principales
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {data.customerDemographics.topCities.map((city, index) => (
              <div key={city.city} className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm font-bold text-gray-400 w-5 sm:w-6">
                  #{index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {city.city}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 ml-2">
                      {city.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 sm:h-1.5">
                    <div
                      className="bg-red-500 h-1 sm:h-1.5 rounded-full"
                      style={{ width: `${city.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Age Groups */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
            Grupos de Edad
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {data.customerDemographics.ageGroups.map((group, index) => (
              <div key={group.range} className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm font-bold text-gray-400 w-5 sm:w-6">
                  #{index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {group.range} años
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100">
                      {group.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 sm:h-1.5">
                    <div
                      className="bg-indigo-500 h-1 sm:h-1.5 rounded-full"
                      style={{ width: `${group.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Forecast */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
            Pronóstico
          </h3>
          <div className="p-4 sm:p-6 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border-2 border-purple-200 dark:border-purple-700">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">
              Estimado próximo mes
            </p>
            <p className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
              {formatCurrency(data.forecast.nextMonth)}
            </p>
            <div className="flex items-center gap-2">
              <div
                className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                  data.forecast.confidence === 'high'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
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
