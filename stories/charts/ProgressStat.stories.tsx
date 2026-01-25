import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProgressStat, { MultiProgressStat } from '@/components/charts/ProgressStat';

/**
 * ProgressStat displays a labeled progress bar with current/max values and optional percentage.
 * Supports multiple color themes and size variants. Used for goals, quotas, and metric tracking.
 */
const meta: Meta<typeof ProgressStat> = {
  title: 'Charts/ProgressStat',
  component: ProgressStat,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A progress statistic component with animated bar, label, and value display. Supports multiple colors and sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['purple', 'blue', 'green', 'amber', 'red', 'pink'],
      description: 'Bar color variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Bar height',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Show percentage next to value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default progress stat
export const Default: Story = {
  args: {
    label: 'Meta de ventas',
    value: 7500,
    maxValue: 10000,
    color: 'purple',
    size: 'md',
    showPercentage: true,
  },
};

// Sales goal
export const SalesGoal: Story = {
  args: {
    label: 'Ventas del mes',
    value: 45000,
    maxValue: 50000,
    formatValue: (v) => `$${v.toLocaleString('es-MX')}`,
    color: 'green',
    size: 'md',
    showPercentage: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Sales goal tracking with currency formatting.',
      },
    },
  },
};

// Orders target
export const OrdersTarget: Story = {
  args: {
    label: 'Pedidos completados',
    value: 28,
    maxValue: 50,
    formatValue: (v) => `${v} pedidos`,
    color: 'blue',
    size: 'md',
    showPercentage: true,
  },
};

// Low progress
export const LowProgress: Story = {
  args: {
    label: 'Progreso del objetivo',
    value: 150,
    maxValue: 1000,
    color: 'red',
    size: 'md',
    showPercentage: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Low progress indicator (15%) using red color variant.',
      },
    },
  },
};

// High progress
export const HighProgress: Story = {
  args: {
    label: 'Meta casi completada',
    value: 950,
    maxValue: 1000,
    color: 'green',
    size: 'md',
    showPercentage: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'High progress indicator (95%) using green color variant.',
      },
    },
  },
};

// Different sizes
export const SmallSize: Story = {
  args: {
    label: 'Tamaño pequeño',
    value: 60,
    maxValue: 100,
    color: 'purple',
    size: 'sm',
    showPercentage: true,
  },
};

export const MediumSize: Story = {
  args: {
    label: 'Tamaño mediano',
    value: 60,
    maxValue: 100,
    color: 'purple',
    size: 'md',
    showPercentage: true,
  },
};

export const LargeSize: Story = {
  args: {
    label: 'Tamaño grande',
    value: 60,
    maxValue: 100,
    color: 'purple',
    size: 'lg',
    showPercentage: true,
  },
};

// All colors
export const AllColors: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <ProgressStat label="Purple" value={75} maxValue={100} color="purple" />
      <ProgressStat label="Blue" value={65} maxValue={100} color="blue" />
      <ProgressStat label="Green" value={85} maxValue={100} color="green" />
      <ProgressStat label="Amber" value={55} maxValue={100} color="amber" />
      <ProgressStat label="Red" value={45} maxValue={100} color="red" />
      <ProgressStat label="Pink" value={70} maxValue={100} color="pink" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available color variants.',
      },
    },
  },
};

// Without percentage
export const NoPercentage: Story = {
  args: {
    label: 'Sin porcentaje',
    value: 750,
    maxValue: 1000,
    color: 'blue',
    size: 'md',
    showPercentage: false,
  },
};

// Multiple stats in a card
export const InDashboardCard: Story = {
  render: () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 max-w-md">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Metas del Mes</h3>
      <div className="space-y-4">
        <ProgressStat
          label="Ventas"
          value={45000}
          maxValue={50000}
          formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
          color="green"
        />
        <ProgressStat label="Pedidos" value={38} maxValue={50} color="blue" />
        <ProgressStat label="Nuevos clientes" value={12} maxValue={20} color="purple" />
        <ProgressStat label="Reseñas 5 estrellas" value={8} maxValue={15} color="amber" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple ProgressStat components in a dashboard goals card.',
      },
    },
  },
};

// Over 100% (capped at 100)
export const OverTarget: Story = {
  args: {
    label: '¡Meta superada!',
    value: 1200,
    maxValue: 1000,
    formatValue: (v) => `$${v.toLocaleString('es-MX')}`,
    color: 'green',
    size: 'lg',
    showPercentage: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'When value exceeds maxValue, the bar caps at 100% but shows actual value.',
      },
    },
  },
};

// Multi-segment progress
export const MultiSegment: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <MultiProgressStat
        label="Ventas por categoría"
        segments={[
          { value: 45, color: 'purple', label: 'Textiles' },
          { value: 30, color: 'blue', label: 'Cerámica' },
          { value: 15, color: 'green', label: 'Joyería' },
          { value: 10, color: 'amber', label: 'Otros' },
        ]}
        total={100}
        showLegend={true}
      />
      <MultiProgressStat
        label="Estado de pedidos"
        segments={[
          { value: 25, color: 'green', label: 'Entregados' },
          { value: 12, color: 'blue', label: 'En tránsito' },
          { value: 8, color: 'amber', label: 'Preparando' },
          { value: 3, color: 'red', label: 'Pendientes' },
        ]}
        total={48}
        showLegend={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'MultiProgressStat shows multiple segments in a single bar with legend.',
      },
    },
  },
};

// Multi-segment without legend
export const MultiSegmentNoLegend: Story = {
  render: () => (
    <MultiProgressStat
      label="Distribución"
      segments={[
        { value: 60, color: 'purple' },
        { value: 25, color: 'blue' },
        { value: 15, color: 'green' },
      ]}
      total={100}
      showLegend={false}
      className="max-w-md"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'MultiProgressStat without legend for compact displays.',
      },
    },
  },
};

// Multi-segment sizes
export const MultiSegmentSizes: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <MultiProgressStat
        label="Pequeño"
        segments={[
          { value: 50, color: 'purple' },
          { value: 30, color: 'blue' },
          { value: 20, color: 'green' },
        ]}
        total={100}
        showLegend={false}
        size="sm"
      />
      <MultiProgressStat
        label="Mediano"
        segments={[
          { value: 50, color: 'purple' },
          { value: 30, color: 'blue' },
          { value: 20, color: 'green' },
        ]}
        total={100}
        showLegend={false}
        size="md"
      />
      <MultiProgressStat
        label="Grande"
        segments={[
          { value: 50, color: 'purple' },
          { value: 30, color: 'blue' },
          { value: 20, color: 'green' },
        ]}
        total={100}
        showLegend={false}
        size="lg"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'MultiProgressStat in different size variants.',
      },
    },
  },
};
