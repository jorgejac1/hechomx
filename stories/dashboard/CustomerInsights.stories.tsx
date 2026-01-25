import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
import Avatar from '@/components/common/Avatar';
import Progress from '@/components/common/Progress';

/**
 * CustomerInsights displays detailed customer analytics including top customers,
 * repeat buyers, purchase patterns, and seasonal trends.
 *
 * Note: The actual component loads data asynchronously. These stories demonstrate
 * the UI states with static mock data.
 */

// Types for the static component
interface TopCustomer {
  id: string;
  name: string;
  purchases: number;
  totalSpent: number;
}

interface RepeatCustomer {
  id: string;
  name: string;
  avatar?: string;
  totalPurchases: number;
  totalSpent: number;
  lastPurchase: string;
  favoriteProducts: string[];
  lifetimeValue: 'vip' | 'high' | 'medium' | 'low';
}

interface SeasonalTrend {
  season: string;
  increase: number;
}

interface CustomerInsightsStaticProps {
  isLoading?: boolean;
  topCustomers?: TopCustomer[];
  repeatCustomers?: RepeatCustomer[];
  productCombos?: string[][];
  seasonalTrends?: SeasonalTrend[];
  avgDaysBetweenPurchases?: number;
}

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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount);
};

function CustomerInsightsStatic({
  isLoading = false,
  topCustomers = [],
  repeatCustomers = [],
  productCombos = [],
  seasonalTrends = [],
  avgDaysBetweenPurchases = 45,
}: CustomerInsightsStaticProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
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
          {topCustomers.slice(0, 3).map((customer, index) => (
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
      {repeatCustomers.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
            Clientes Recurrentes ({repeatCustomers.length})
          </h3>
          <div className="space-y-4">
            {repeatCustomers.map((customer) => {
              const lvConfig = LIFETIME_VALUE_CONFIG[customer.lifetimeValue];
              const LvIcon = lvConfig.icon;
              return (
                <div
                  key={customer.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                >
                  <Avatar
                    src={customer.avatar}
                    name={customer.name}
                    alt={customer.name}
                    size="xl"
                  />

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
                          {customer.lastPurchase}
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
      )}

      {/* Purchase Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Common Product Combinations */}
        {productCombos.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Productos que se Compran Juntos
            </h3>
            <div className="space-y-3">
              {productCombos.map((combo, index) => (
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
        )}

        {/* Seasonal Trends */}
        {seasonalTrends.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Tendencias Estacionales
            </h3>
            <div className="space-y-4">
              {seasonalTrends.map((trend, index) => {
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
                {avgDaysBetweenPurchases} días
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Tiempo promedio entre compras
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const meta: Meta<typeof CustomerInsightsStatic> = {
  title: 'Dashboard/CustomerInsights',
  component: CustomerInsightsStatic,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Customer insights dashboard showing top customers, repeat buyers, and purchase patterns. The actual component loads data via API.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleTopCustomers: TopCustomer[] = [
  { id: '1', name: 'María García', purchases: 12, totalSpent: 45000 },
  { id: '2', name: 'Carlos López', purchases: 8, totalSpent: 32000 },
  { id: '3', name: 'Ana Martínez', purchases: 6, totalSpent: 28000 },
];

const sampleRepeatCustomers: RepeatCustomer[] = [
  {
    id: '1',
    name: 'María García',
    totalPurchases: 12,
    totalSpent: 45000,
    lastPurchase: 'Hace 5 días',
    favoriteProducts: ['Alebrijes', 'Rebozos'],
    lifetimeValue: 'vip',
  },
  {
    id: '2',
    name: 'Carlos López',
    totalPurchases: 8,
    totalSpent: 32000,
    lastPurchase: 'Hace 2 semanas',
    favoriteProducts: ['Talavera'],
    lifetimeValue: 'high',
  },
  {
    id: '3',
    name: 'Ana Martínez',
    totalPurchases: 4,
    totalSpent: 15000,
    lastPurchase: 'Hace 1 mes',
    favoriteProducts: ['Joyería de plata'],
    lifetimeValue: 'medium',
  },
];

const sampleProductCombos = [
  ['Alebrije Dragón', 'Base de Madera'],
  ['Rebozo de Seda', 'Aretes de Plata'],
  ['Set de Talavera', 'Mantel Bordado'],
];

const sampleSeasonalTrends: SeasonalTrend[] = [
  { season: 'Día de Muertos', increase: 85 },
  { season: 'Navidad', increase: 65 },
  { season: 'San Valentín', increase: 45 },
  { season: 'Día de las Madres', increase: 55 },
];

// Default with all data
export const Default: Story = {
  args: {
    topCustomers: sampleTopCustomers,
    repeatCustomers: sampleRepeatCustomers,
    productCombos: sampleProductCombos,
    seasonalTrends: sampleSeasonalTrends,
    avgDaysBetweenPurchases: 45,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

// Top customers only
export const TopCustomersOnly: Story = {
  args: {
    topCustomers: sampleTopCustomers,
    repeatCustomers: [],
    productCombos: [],
    seasonalTrends: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Showing only top customers section.',
      },
    },
  },
};

// With repeat customers
export const WithRepeatCustomers: Story = {
  args: {
    topCustomers: sampleTopCustomers,
    repeatCustomers: sampleRepeatCustomers,
    productCombos: [],
    seasonalTrends: [],
  },
};

// Full purchase patterns
export const FullPurchasePatterns: Story = {
  args: {
    topCustomers: sampleTopCustomers,
    repeatCustomers: [],
    productCombos: sampleProductCombos,
    seasonalTrends: sampleSeasonalTrends,
    avgDaysBetweenPurchases: 30,
  },
  parameters: {
    docs: {
      description: {
        story: 'Focus on purchase patterns with product combos and seasonal trends.',
      },
    },
  },
};

// VIP customers
export const VIPCustomers: Story = {
  args: {
    topCustomers: [
      { id: '1', name: 'María García', purchases: 25, totalSpent: 125000 },
      { id: '2', name: 'Roberto Hernández', purchases: 20, totalSpent: 98000 },
      { id: '3', name: 'Elena Rodríguez', purchases: 18, totalSpent: 87000 },
    ],
    repeatCustomers: [
      {
        id: '1',
        name: 'María García',
        totalPurchases: 25,
        totalSpent: 125000,
        lastPurchase: 'Ayer',
        favoriteProducts: ['Alebrijes de Colección', 'Textiles Finos'],
        lifetimeValue: 'vip',
      },
    ],
    productCombos: sampleProductCombos,
    seasonalTrends: sampleSeasonalTrends,
  },
  parameters: {
    docs: {
      description: {
        story: 'High-value VIP customer data.',
      },
    },
  },
};

// New seller with few customers
export const NewSellerData: Story = {
  args: {
    topCustomers: [{ id: '1', name: 'Primer Cliente', purchases: 2, totalSpent: 3500 }],
    repeatCustomers: [],
    productCombos: [],
    seasonalTrends: [],
    avgDaysBetweenPurchases: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Data for a new seller with minimal customer history.',
      },
    },
  },
};
