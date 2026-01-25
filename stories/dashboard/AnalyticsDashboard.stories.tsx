import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  MapPin,
  Clock,
  Target,
  Loader2,
  Calendar,
  BarChart3,
} from 'lucide-react';

/**
 * AnalyticsDashboard displays comprehensive sales analytics including
 * revenue overview, sales trends, top products, traffic sources,
 * peak selling times, and customer demographics.
 *
 * Note: The actual component loads data asynchronously. These stories demonstrate
 * the UI states with static mock data.
 */

// Types for the static component
interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  trend: 'up' | 'down' | 'stable';
}

interface TrafficSource {
  source: string;
  percentage: number;
  visits: number;
  conversions: number;
}

interface SalesTrendDay {
  date: string;
  revenue: number;
  sales: number;
}

interface AnalyticsDashboardStaticProps {
  isLoading?: boolean;
  timeRange?: 'week' | 'month';
  currentRevenue?: number;
  previousRevenue?: number;
  averageOrderValue?: number;
  conversionRate?: number;
  topProducts?: TopProduct[];
  trafficSources?: TrafficSource[];
  salesTrend?: SalesTrendDay[];
  peakTimes?: {
    bestDay: string;
    bestHour: string;
    weekday: number;
    weekend: number;
  };
  topCities?: { city: string; percentage: number }[];
  forecastAmount?: number;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

function AnalyticsDashboardStatic({
  isLoading = false,
  timeRange: initialTimeRange = 'week',
  currentRevenue = 45000,
  previousRevenue = 38000,
  averageOrderValue = 1850,
  conversionRate = 3.2,
  topProducts = [],
  trafficSources = [],
  salesTrend = [],
  peakTimes = { bestDay: 'Sábado', bestHour: '18:00 - 20:00', weekday: 65, weekend: 35 },
  topCities = [],
  forecastAmount = 52000,
}: AnalyticsDashboardStaticProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>(initialTimeRange);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
      </div>
    );
  }

  const revenueChange =
    previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;
  const isPositiveChange = revenueChange >= 0;
  const comparisonText = timeRange === 'week' ? 'vs. semana anterior' : 'vs. mes anterior';
  const trendTitle = timeRange === 'week' ? 'Últimos 7 días' : 'Últimas 5 semanas';

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
              {formatCurrency(currentRevenue)}
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
              {formatCurrency(averageOrderValue)}
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
              {conversionRate}%
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              De visitantes a compradores
            </p>
          </div>
        </div>

        {/* Sales Trend Mini Chart */}
        {salesTrend.length > 0 && (
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Tendencia de Ventas ({trendTitle})
            </h4>
            <div
              className="flex items-end justify-between gap-1 sm:gap-2 min-w-[300px]"
              style={{ height: '100px' }}
            >
              {salesTrend.map((day, index) => {
                const maxRevenue = Math.max(...salesTrend.map((d) => d.revenue));
                const heightPercentage = maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0;
                const heightPx = Math.max((heightPercentage / 100) * 100, 8);

                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center gap-1 sm:gap-2 min-w-[36px]"
                  >
                    <div
                      className="relative w-full group flex items-end"
                      style={{ height: '100px' }}
                    >
                      <div
                        className="w-full bg-linear-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all hover:from-primary-700 hover:to-primary-500 cursor-pointer"
                        style={{ height: `${heightPx}px` }}
                      />
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium truncate w-full text-center">
                      {day.date}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Top Products */}
      {topProducts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
            Productos Más Vendidos
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {topProducts.map((product, index) => (
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
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                    )}
                    {product.trend === 'down' && (
                      <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        {trafficSources.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
              Fuentes de Tráfico
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {trafficSources.map((source) => (
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
        )}

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
                {peakTimes.bestDay}
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-700">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                Mejor horario
              </p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                {peakTimes.bestHour}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Entre semana
                </p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  {peakTimes.weekday}%
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Fin de semana
                </p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  {peakTimes.weekend}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Cities */}
        {topCities.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" />
              Ciudades Principales
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {topCities.map((city, index) => (
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
        )}

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
              {formatCurrency(forecastAmount)}
            </p>
            <div className="flex items-center gap-2">
              <div className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                Confianza: Alta
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof AnalyticsDashboardStatic> = {
  title: 'Dashboard/AnalyticsDashboard',
  component: AnalyticsDashboardStatic,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Comprehensive analytics dashboard for sellers. The actual component loads data via API.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleTopProducts: TopProduct[] = [
  { id: '1', name: 'Alebrije Dragón Multicolor', sales: 45, revenue: 112500, trend: 'up' },
  { id: '2', name: 'Rebozo de Seda Oaxaqueño', sales: 32, revenue: 112000, trend: 'up' },
  { id: '3', name: 'Set de Talavera (12 piezas)', sales: 28, revenue: 50400, trend: 'stable' },
  { id: '4', name: 'Collar de Plata con Ámbar', sales: 24, revenue: 22800, trend: 'down' },
];

const sampleTrafficSources: TrafficSource[] = [
  { source: 'Búsqueda Orgánica', percentage: 42, visits: 1250, conversions: 45 },
  { source: 'Redes Sociales', percentage: 28, visits: 840, conversions: 28 },
  { source: 'Directo', percentage: 18, visits: 540, conversions: 22 },
  { source: 'Referencias', percentage: 12, visits: 360, conversions: 15 },
];

const sampleSalesTrend: SalesTrendDay[] = [
  { date: 'Lun', revenue: 5200, sales: 3 },
  { date: 'Mar', revenue: 7800, sales: 5 },
  { date: 'Mié', revenue: 4500, sales: 2 },
  { date: 'Jue', revenue: 8900, sales: 6 },
  { date: 'Vie', revenue: 12500, sales: 8 },
  { date: 'Sáb', revenue: 15200, sales: 10 },
  { date: 'Dom', revenue: 9800, sales: 7 },
];

const sampleTopCities = [
  { city: 'Ciudad de México', percentage: 35 },
  { city: 'Guadalajara', percentage: 18 },
  { city: 'Monterrey', percentage: 15 },
  { city: 'Puebla', percentage: 12 },
  { city: 'Querétaro', percentage: 8 },
];

// Default with all data
export const Default: Story = {
  args: {
    currentRevenue: 45000,
    previousRevenue: 38000,
    averageOrderValue: 1850,
    conversionRate: 3.2,
    topProducts: sampleTopProducts,
    trafficSources: sampleTrafficSources,
    salesTrend: sampleSalesTrend,
    topCities: sampleTopCities,
    forecastAmount: 52000,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

// Week view (default)
export const WeekView: Story = {
  args: {
    timeRange: 'week',
    currentRevenue: 45000,
    previousRevenue: 38000,
    averageOrderValue: 1850,
    conversionRate: 3.2,
    topProducts: sampleTopProducts,
    trafficSources: sampleTrafficSources,
    salesTrend: sampleSalesTrend,
    forecastAmount: 52000,
  },
};

// Month view
export const MonthView: Story = {
  args: {
    timeRange: 'month',
    currentRevenue: 185000,
    previousRevenue: 165000,
    averageOrderValue: 2100,
    conversionRate: 3.8,
    topProducts: sampleTopProducts,
    trafficSources: sampleTrafficSources,
    salesTrend: [
      { date: 'Sem 1', revenue: 42000, sales: 22 },
      { date: 'Sem 2', revenue: 38000, sales: 19 },
      { date: 'Sem 3', revenue: 52000, sales: 28 },
      { date: 'Sem 4', revenue: 48000, sales: 25 },
      { date: 'Sem 5', revenue: 5000, sales: 3 },
    ],
    forecastAmount: 210000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Monthly analytics view with weekly sales trend.',
      },
    },
  },
};

// Declining sales
export const DecliningSales: Story = {
  args: {
    currentRevenue: 32000,
    previousRevenue: 45000,
    averageOrderValue: 1500,
    conversionRate: 2.1,
    topProducts: sampleTopProducts.map((p) => ({ ...p, trend: 'down' as const })),
    trafficSources: sampleTrafficSources,
    salesTrend: sampleSalesTrend.map((d, i) => ({
      ...d,
      revenue: d.revenue * (1 - i * 0.1),
    })),
    forecastAmount: 28000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard showing declining sales trend.',
      },
    },
  },
};

// High performance
export const HighPerformance: Story = {
  args: {
    currentRevenue: 250000,
    previousRevenue: 180000,
    averageOrderValue: 3500,
    conversionRate: 5.8,
    topProducts: [
      { id: '1', name: 'Colección Especial Alebrijes', sales: 120, revenue: 420000, trend: 'up' },
      { id: '2', name: 'Textiles de Lujo', sales: 85, revenue: 297500, trend: 'up' },
      { id: '3', name: 'Joyería de Diseñador', sales: 65, revenue: 162500, trend: 'up' },
    ],
    trafficSources: sampleTrafficSources,
    salesTrend: sampleSalesTrend.map((d) => ({ ...d, revenue: d.revenue * 3 })),
    topCities: sampleTopCities,
    forecastAmount: 320000,
  },
  parameters: {
    docs: {
      description: {
        story: 'High-performing seller analytics.',
      },
    },
  },
};

// New seller with minimal data
export const NewSeller: Story = {
  args: {
    currentRevenue: 5500,
    previousRevenue: 0,
    averageOrderValue: 1100,
    conversionRate: 1.5,
    topProducts: [
      { id: '1', name: 'Mi Primer Producto', sales: 5, revenue: 5500, trend: 'stable' },
    ],
    trafficSources: [
      { source: 'Redes Sociales', percentage: 80, visits: 120, conversions: 2 },
      { source: 'Directo', percentage: 20, visits: 30, conversions: 1 },
    ],
    salesTrend: [
      { date: 'Lun', revenue: 0, sales: 0 },
      { date: 'Mar', revenue: 1100, sales: 1 },
      { date: 'Mié', revenue: 0, sales: 0 },
      { date: 'Jue', revenue: 2200, sales: 2 },
      { date: 'Vie', revenue: 1100, sales: 1 },
      { date: 'Sáb', revenue: 1100, sales: 1 },
      { date: 'Dom', revenue: 0, sales: 0 },
    ],
    forecastAmount: 8000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Analytics for a new seller just starting out.',
      },
    },
  },
};

// Minimal view (revenue only)
export const MinimalView: Story = {
  args: {
    currentRevenue: 45000,
    previousRevenue: 38000,
    averageOrderValue: 1850,
    conversionRate: 3.2,
    topProducts: [],
    trafficSources: [],
    salesTrend: [],
    topCities: [],
    forecastAmount: 52000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal view showing only revenue metrics.',
      },
    },
  },
};
