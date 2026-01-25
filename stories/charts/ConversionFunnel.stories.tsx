import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Eye, ShoppingCart, CreditCard, Package, Users, MousePointer, Heart } from 'lucide-react';
import ConversionFunnel from '@/components/charts/ConversionFunnel';

/**
 * ConversionFunnel displays a step-by-step funnel visualization showing customer journey
 * from visit to purchase. Used in seller analytics dashboards to track conversion rates.
 */
const meta: Meta<typeof ConversionFunnel> = {
  title: 'Charts/ConversionFunnel',
  component: ConversionFunnel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A visual funnel showing customer journey stages with conversion rates. Supports icons, color variants, and percentage display.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showPercentage: {
      control: 'boolean',
      description: 'Show percentage relative to first step',
    },
    showConversionRate: {
      control: 'boolean',
      description: 'Show conversion rate between steps',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default funnel - "De Visita a Compra"
export const Default: Story = {
  args: {
    steps: [
      { label: 'Visitas', value: 1250, icon: <Eye className="w-full h-full" />, variant: 'blue' },
      {
        label: 'Al carrito',
        value: 180,
        icon: <ShoppingCart className="w-full h-full" />,
        variant: 'purple',
      },
      {
        label: 'Checkout',
        value: 85,
        icon: <CreditCard className="w-full h-full" />,
        variant: 'amber',
      },
      {
        label: 'Compras',
        value: 62,
        icon: <Package className="w-full h-full" />,
        variant: 'green',
      },
    ],
    showPercentage: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default "De Visita a Compra" funnel showing customer journey from product views to completed purchases.',
      },
    },
  },
};

// With conversion rates between steps
export const WithConversionRates: Story = {
  args: {
    steps: [
      { label: 'Visitas', value: 1250, icon: <Eye className="w-full h-full" />, variant: 'blue' },
      {
        label: 'Al carrito',
        value: 180,
        icon: <ShoppingCart className="w-full h-full" />,
        variant: 'purple',
      },
      {
        label: 'Checkout',
        value: 85,
        icon: <CreditCard className="w-full h-full" />,
        variant: 'amber',
      },
      {
        label: 'Compras',
        value: 62,
        icon: <Package className="w-full h-full" />,
        variant: 'green',
      },
    ],
    showPercentage: true,
    showConversionRate: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Funnel with conversion rates shown between each step (visible on desktop).',
      },
    },
  },
};

// Simple funnel without icons
export const SimpleNoIcons: Story = {
  args: {
    steps: [
      { label: 'Visitors', value: 5000, variant: 'gray' },
      { label: 'Leads', value: 1200, variant: 'blue' },
      { label: 'Opportunities', value: 300, variant: 'purple' },
      { label: 'Customers', value: 75, variant: 'green' },
    ],
    showPercentage: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple funnel without icons, using only color variants.',
      },
    },
  },
};

// Marketing funnel
export const MarketingFunnel: Story = {
  args: {
    steps: [
      {
        label: 'Impresiones',
        value: 50000,
        icon: <Users className="w-full h-full" />,
        variant: 'gray',
      },
      {
        label: 'Clics',
        value: 2500,
        icon: <MousePointer className="w-full h-full" />,
        variant: 'blue',
      },
      {
        label: 'Interés',
        value: 450,
        icon: <Heart className="w-full h-full" />,
        variant: 'purple',
      },
      {
        label: 'Conversión',
        value: 125,
        icon: <Package className="w-full h-full" />,
        variant: 'green',
      },
    ],
    showPercentage: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Marketing funnel showing ad impressions to conversions.',
      },
    },
  },
};

// High conversion funnel
export const HighConversion: Story = {
  args: {
    steps: [
      { label: 'Visitas', value: 500, icon: <Eye className="w-full h-full" />, variant: 'blue' },
      {
        label: 'Al carrito',
        value: 150,
        icon: <ShoppingCart className="w-full h-full" />,
        variant: 'purple',
      },
      {
        label: 'Checkout',
        value: 120,
        icon: <CreditCard className="w-full h-full" />,
        variant: 'amber',
      },
      {
        label: 'Compras',
        value: 100,
        icon: <Package className="w-full h-full" />,
        variant: 'green',
      },
    ],
    showPercentage: true,
    showConversionRate: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'A high-converting funnel with 20% overall conversion rate.',
      },
    },
  },
};

// Low conversion funnel (needs improvement)
export const LowConversion: Story = {
  args: {
    steps: [
      { label: 'Visitas', value: 10000, icon: <Eye className="w-full h-full" />, variant: 'blue' },
      {
        label: 'Al carrito',
        value: 200,
        icon: <ShoppingCart className="w-full h-full" />,
        variant: 'purple',
      },
      {
        label: 'Checkout',
        value: 50,
        icon: <CreditCard className="w-full h-full" />,
        variant: 'amber',
      },
      { label: 'Compras', value: 15, icon: <Package className="w-full h-full" />, variant: 'red' },
    ],
    showPercentage: true,
    showConversionRate: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A low-converting funnel (0.15%) that needs optimization. Note the red variant on the final step.',
      },
    },
  },
};

// Custom value formatting
export const CustomFormatting: Story = {
  args: {
    steps: [
      { label: 'Revenue', value: 125000, variant: 'green' },
      { label: 'Costs', value: 45000, variant: 'red' },
      { label: 'Profit', value: 80000, variant: 'blue' },
      { label: 'Reinvested', value: 40000, variant: 'purple' },
    ],
    showPercentage: false,
    formatValue: (v: number) => `$${(v / 1000).toFixed(0)}k`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Funnel with custom value formatting (currency with K suffix).',
      },
    },
  },
};

// In context (dashboard card)
export const InDashboardCard: Story = {
  render: () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 max-w-3xl">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary-600" />
          De Visita a Compra
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Embudo de conversión - Esta semana
        </p>
      </div>
      <ConversionFunnel
        steps={[
          {
            label: 'Visitas',
            value: 1250,
            icon: <Eye className="w-full h-full" />,
            variant: 'blue',
          },
          {
            label: 'Al carrito',
            value: 180,
            icon: <ShoppingCart className="w-full h-full" />,
            variant: 'purple',
          },
          {
            label: 'Checkout',
            value: 85,
            icon: <CreditCard className="w-full h-full" />,
            variant: 'amber',
          },
          {
            label: 'Compras',
            value: 62,
            icon: <Package className="w-full h-full" />,
            variant: 'green',
          },
        ]}
        showPercentage={true}
      />
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Tasa de conversión total</span>
          <span className="font-bold text-green-600 dark:text-green-400">4.96%</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ConversionFunnel displayed inside a dashboard card with header and summary.',
      },
    },
  },
};
