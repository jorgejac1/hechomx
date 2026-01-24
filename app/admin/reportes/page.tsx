'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BarChart3,
  Users,
  ShoppingBag,
  DollarSign,
  Calendar,
  Download,
  Filter,
  ArrowLeft,
  Store,
  FileCheck,
  Eye,
  ShoppingCart,
  Loader2,
  X,
} from 'lucide-react';
import DatePicker from '@/components/common/DatePicker';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants/routes';
import {
  MetricCard,
  HorizontalBarChart,
  ConversionFunnel,
  RankedList,
  DataTable,
  TrendCell,
  CurrencyCell,
  DonutChart,
  ProgressStat,
} from '@/components/charts';
import type { TableColumn } from '@/components/charts';

type TimeRange = '7d' | '30d' | '90d' | '12m' | 'custom';

interface ProductRow {
  rank: number;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  trend: number;
}

export default function AdminReportesPage() {
  const router = useRouter();
  const { isAdmin, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [customDateRange, setCustomDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  // Auth check
  useEffect(() => {
    if (!authLoading) {
      if (!isAdmin) {
        router.push(ROUTES.HOME);
      } else {
        setLoading(false);
      }
    }
  }, [authLoading, isAdmin, router]);

  // Mock data - in production, fetch based on timeRange
  const revenueByDay = [
    { label: 'Lun', value: 12500 },
    { label: 'Mar', value: 18200 },
    { label: 'Mié', value: 15800 },
    { label: 'Jue', value: 22100 },
    { label: 'Vie', value: 28500 },
    { label: 'Sáb', value: 35200 },
    { label: 'Dom', value: 19800 },
  ];

  const revenueByCategory = [
    { label: 'Textiles', value: 45200 },
    { label: 'Cerámica', value: 38500 },
    { label: 'Joyería', value: 32100 },
    { label: 'Madera', value: 28700 },
    { label: 'Otros', value: 15600 },
  ];

  const topProducts: ProductRow[] = [
    {
      rank: 1,
      name: 'Huipil Bordado de Chiapas',
      category: 'Textiles',
      sales: 156,
      revenue: 343200,
      trend: 23,
    },
    {
      rank: 2,
      name: 'Alebrije de Madera Tallada',
      category: 'Madera',
      sales: 134,
      revenue: 335000,
      trend: 15,
    },
    {
      rank: 3,
      name: 'Collar de Plata con Turquesa',
      category: 'Joyería',
      sales: 189,
      revenue: 283500,
      trend: 8,
    },
    {
      rank: 4,
      name: 'Jarrón de Talavera',
      category: 'Cerámica',
      sales: 98,
      revenue: 176400,
      trend: -5,
    },
    {
      rank: 5,
      name: 'Rebozo de Seda',
      category: 'Textiles',
      sales: 67,
      revenue: 234500,
      trend: 31,
    },
  ];

  const productColumns: TableColumn<ProductRow>[] = [
    { header: '#', accessor: 'rank', width: 'w-12' },
    { header: 'Producto', accessor: 'name' },
    { header: 'Categoría', accessor: 'category', hideOnMobile: true },
    { header: 'Ventas', accessor: 'sales', align: 'right' },
    { header: 'Ingresos', accessor: (row) => <CurrencyCell value={row.revenue} />, align: 'right' },
    {
      header: 'Tendencia',
      accessor: (row) => <TrendCell value={row.trend} />,
      align: 'right',
      hideOnMobile: true,
    },
  ];

  const topSellers = [
    {
      name: 'Artesanías de México',
      subtitle: 'Guadalajara, Jalisco',
      value: '$389,200',
      trend: 28,
    },
    { name: 'Alebrijes Don Pedro', subtitle: 'Oaxaca', value: '$245,600', trend: 15 },
    { name: 'Tejidos Sofía', subtitle: 'CDMX', value: '$156,800', trend: 32 },
    { name: 'Cerámica Tradicional Carmen', subtitle: 'Puebla', value: '$98,500', trend: 12 },
    { name: 'Plata y Piedras Lucía', subtitle: 'Guerrero', value: '$124,300', trend: -5 },
  ];

  const funnelSteps = [
    {
      label: 'Visitantes',
      value: 45678,
      icon: <Eye className="w-8 h-8" />,
      variant: 'gray' as const,
    },
    {
      label: 'Agregaron al Carrito',
      value: 12456,
      icon: <ShoppingCart className="w-8 h-8" />,
      variant: 'blue' as const,
    },
    {
      label: 'Iniciaron Checkout',
      value: 4567,
      icon: <FileCheck className="w-8 h-8" />,
      variant: 'purple' as const,
    },
    {
      label: 'Compraron',
      value: 2345,
      icon: <DollarSign className="w-8 h-8" />,
      variant: 'green' as const,
    },
  ];

  const categoryDistribution = [
    { label: 'Textiles', value: 35, color: 'purple-500' },
    { label: 'Cerámica', value: 25, color: 'blue-500' },
    { label: 'Joyería', value: 20, color: 'amber-500' },
    { label: 'Madera', value: 12, color: 'green-500' },
    { label: 'Otros', value: 8, color: 'gray-400' },
  ];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Cargando reportes...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={ROUTES.ADMIN}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Panel
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-8 h-8 text-purple-600" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Reportes y Análisis
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Estadísticas detalladas de la plataforma
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Time Range Filter */}
              <div className="flex items-center gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                {(['7d', '30d', '90d', '12m'] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setTimeRange(range);
                      setShowCustomPicker(false);
                    }}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                      timeRange === range
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {range === '7d' && '7 días'}
                    {range === '30d' && '30 días'}
                    {range === '90d' && '90 días'}
                    {range === '12m' && '12 meses'}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setTimeRange('custom');
                    setShowCustomPicker(true);
                  }}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                    timeRange === 'custom'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Personalizado
                </button>
              </div>

              {/* Export Button */}
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm font-medium">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Exportar</span>
              </button>
            </div>
          </div>

          {/* Custom Date Range Picker */}
          {showCustomPicker && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm dark:shadow-gray-900/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Seleccionar rango de fechas
                </h3>
                <button
                  onClick={() => setShowCustomPicker(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
                >
                  <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DatePicker
                  label="Fecha inicio"
                  value={customDateRange.start}
                  onChange={(date) => setCustomDateRange((prev) => ({ ...prev, start: date }))}
                  placeholder="Seleccionar fecha"
                  maxDate={customDateRange.end || new Date()}
                />
                <DatePicker
                  label="Fecha fin"
                  value={customDateRange.end}
                  onChange={(date) => setCustomDateRange((prev) => ({ ...prev, end: date }))}
                  placeholder="Seleccionar fecha"
                  minDate={customDateRange.start || undefined}
                  maxDate={new Date()}
                />
              </div>
              {customDateRange.start && customDateRange.end && (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Mostrando datos del{' '}
                  <span className="font-medium">
                    {customDateRange.start.toLocaleDateString('es-MX')}
                  </span>{' '}
                  al{' '}
                  <span className="font-medium">
                    {customDateRange.end.toLocaleDateString('es-MX')}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Ingresos Totales"
            value="$234,567"
            change={12.5}
            changeLabel="vs período anterior"
            icon={<DollarSign className="w-6 h-6 text-green-600" />}
          />
          <MetricCard
            title="Pedidos"
            value="1,234"
            change={8.3}
            changeLabel="vs período anterior"
            icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
          />
          <MetricCard
            title="Usuarios"
            value="5,678"
            change={15.2}
            changeLabel="nuevos usuarios"
            icon={<Users className="w-6 h-6 text-purple-600" />}
          />
          <MetricCard
            title="Ticket Promedio"
            value="$190"
            change={-2.1}
            changeLabel="vs período anterior"
            icon={<ShoppingBag className="w-6 h-6 text-amber-600" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue by Day */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs dark:shadow-gray-900/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Ingresos por Día
              </h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <HorizontalBarChart
              data={revenueByDay}
              maxValue={40000}
              color="bg-purple-500"
              formatValue={(v) => `$${v.toLocaleString()}`}
            />
          </div>

          {/* Revenue by Category */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs dark:shadow-gray-900/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Ingresos por Categoría
              </h2>
              <Filter className="w-5 h-5 text-gray-400" />
            </div>
            <HorizontalBarChart
              data={revenueByCategory}
              maxValue={50000}
              color="bg-blue-500"
              formatValue={(v) => `$${v.toLocaleString()}`}
            />
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs dark:shadow-gray-900/30 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
            Embudo de Conversión
          </h2>
          <ConversionFunnel steps={funnelSteps} showPercentage />
        </div>

        {/* Category Distribution & Progress Stats */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Donut Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs dark:shadow-gray-900/30 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
              Distribución por Categoría
            </h2>
            <DonutChart
              segments={categoryDistribution}
              size="md"
              centerValue="100%"
              centerLabel="Total"
              legendPosition="right"
            />
          </div>

          {/* Progress Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs dark:shadow-gray-900/30 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
              Metas del Mes
            </h2>
            <div className="space-y-6">
              <ProgressStat
                label="Meta de Ventas"
                value={234567}
                maxValue={300000}
                formatValue={(v) => `$${v.toLocaleString()}`}
                color="green"
              />
              <ProgressStat
                label="Nuevos Usuarios"
                value={5678}
                maxValue={8000}
                formatValue={(v) => v.toLocaleString()}
                color="purple"
              />
              <ProgressStat
                label="Verificaciones Completadas"
                value={45}
                maxValue={60}
                formatValue={(v) => v.toString()}
                color="blue"
              />
              <ProgressStat
                label="Tasa de Conversión"
                value={5.1}
                maxValue={8}
                formatValue={(v) => `${v}%`}
                showPercentage={false}
                color="amber"
              />
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Top Products */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs dark:shadow-gray-900/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Productos Más Vendidos
              </h2>
              <Link
                href={ROUTES.PRODUCTS}
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-sm font-medium"
              >
                Ver todos
              </Link>
            </div>
            <DataTable columns={productColumns} data={topProducts} keyAccessor="rank" />
          </div>

          {/* Top Sellers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs dark:shadow-gray-900/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Top Vendedores</h2>
              <Store className="w-5 h-5 text-gray-400" />
            </div>
            <RankedList items={topSellers} showRank showTrend rankColor="purple" />
          </div>
        </div>
      </div>
    </div>
  );
}
