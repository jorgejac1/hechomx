import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DollarSign, ShoppingBag, Users, Star, Package, Eye, TrendingUp } from 'lucide-react';
import MetricCard from '@/components/charts/MetricCard';

/**
 * MetricCard displays a single KPI with optional trend indicator, icon, and change percentage.
 * Used in dashboards to show key business metrics.
 */
const meta: Meta<typeof MetricCard> = {
  title: 'Charts/MetricCard',
  component: MetricCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A card component for displaying key performance indicators (KPIs) with trend indicators and icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'purple', 'blue'],
      description: 'Visual variant/color scheme',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Revenue metric
export const Default: Story = {
  args: {
    title: 'Ingresos del Mes',
    value: '$45,230',
    change: 12.5,
    changeLabel: 'vs mes anterior',
    icon: <DollarSign className="w-6 h-6 text-green-600" />,
    variant: 'default',
  },
};

// Orders metric
export const Orders: Story = {
  args: {
    title: 'Pedidos',
    value: '156',
    change: 8,
    changeLabel: 'esta semana',
    icon: <ShoppingBag className="w-6 h-6 text-blue-600" />,
    variant: 'blue',
  },
};

// Customers metric
export const Customers: Story = {
  args: {
    title: 'Clientes Nuevos',
    value: '48',
    change: -3,
    changeLabel: 'vs mes anterior',
    icon: <Users className="w-6 h-6 text-purple-600" />,
    variant: 'purple',
  },
  parameters: {
    docs: {
      description: {
        story: 'Metric with negative change showing decline.',
      },
    },
  },
};

// Rating metric
export const Rating: Story = {
  args: {
    title: 'Calificación Promedio',
    value: '4.8',
    change: 0.2,
    changeLabel: 'este mes',
    icon: <Star className="w-6 h-6 text-amber-500" />,
    variant: 'warning',
  },
};

// Products metric
export const Products: Story = {
  args: {
    title: 'Productos Activos',
    value: '32',
    icon: <Package className="w-6 h-6 text-purple-600" />,
    variant: 'purple',
  },
  parameters: {
    docs: {
      description: {
        story: 'Metric without change indicator.',
      },
    },
  },
};

// Views metric with success variant
export const Views: Story = {
  args: {
    title: 'Visitas al Perfil',
    value: '2,845',
    change: 25,
    changeLabel: 'vs semana anterior',
    icon: <Eye className="w-6 h-6 text-green-600" />,
    variant: 'success',
  },
};

// Without icon
export const WithoutIcon: Story = {
  args: {
    title: 'Conversión',
    value: '3.2%',
    change: 0.5,
    changeLabel: 'mejora',
  },
  parameters: {
    docs: {
      description: {
        story: 'Metric card without an icon.',
      },
    },
  },
};

// Without change
export const WithoutChange: Story = {
  args: {
    title: 'Stock Total',
    value: '1,245',
    icon: <Package className="w-6 h-6 text-gray-600" />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metric card without change/trend indicator.',
      },
    },
  },
};

// With link
export const WithLink: Story = {
  args: {
    title: 'Ver Todos los Pedidos',
    value: '156',
    change: 12,
    icon: <ShoppingBag className="w-6 h-6 text-blue-600" />,
    variant: 'blue',
    href: '/dashboard/orders',
  },
  parameters: {
    docs: {
      description: {
        story: 'Clickable metric card that links to a details page.',
      },
    },
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <MetricCard
        title="Default"
        value="$12,500"
        change={5}
        icon={<DollarSign className="w-6 h-6 text-gray-600" />}
        variant="default"
      />
      <MetricCard
        title="Success"
        value="156"
        change={12}
        icon={<TrendingUp className="w-6 h-6 text-green-600" />}
        variant="success"
      />
      <MetricCard
        title="Warning"
        value="4.5"
        change={-2}
        icon={<Star className="w-6 h-6 text-amber-600" />}
        variant="warning"
      />
      <MetricCard
        title="Purple"
        value="32"
        change={8}
        icon={<Package className="w-6 h-6 text-purple-600" />}
        variant="purple"
      />
      <MetricCard
        title="Blue"
        value="2,845"
        change={15}
        icon={<Eye className="w-6 h-6 text-blue-600" />}
        variant="blue"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'All available color variants.',
      },
    },
  },
};

// Dashboard grid
export const DashboardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl">
      <MetricCard
        title="Ventas Hoy"
        value="$2,450"
        change={12}
        changeLabel="vs ayer"
        icon={<DollarSign className="w-6 h-6 text-green-600" />}
        variant="success"
      />
      <MetricCard
        title="Pedidos"
        value="23"
        change={-5}
        changeLabel="vs ayer"
        icon={<ShoppingBag className="w-6 h-6 text-blue-600" />}
        variant="blue"
      />
      <MetricCard
        title="Productos"
        value="12"
        icon={<Package className="w-6 h-6 text-purple-600" />}
        variant="purple"
      />
      <MetricCard
        title="Calificación"
        value="4.7"
        change={0.1}
        changeLabel="este mes"
        icon={<Star className="w-6 h-6 text-amber-500" />}
        variant="warning"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Typical dashboard metrics grid layout.',
      },
    },
  },
};
