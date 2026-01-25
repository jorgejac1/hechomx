import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DonutChart from '@/components/charts/DonutChart';

/**
 * DonutChart renders a circular chart with multiple segments using CSS conic gradients.
 * Supports center value display, legends, and various sizes.
 */
const meta: Meta<typeof DonutChart> = {
  title: 'Charts/DonutChart',
  component: DonutChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A donut chart component using CSS conic gradients. Displays segments with labels, percentages, and optional center content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Chart size',
    },
    showLegend: {
      control: 'boolean',
      description: 'Show legend with segment labels',
    },
    legendPosition: {
      control: 'select',
      options: ['bottom', 'right'],
      description: 'Legend position',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default sales by category
export const Default: Story = {
  args: {
    segments: [
      { label: 'Textiles', value: 45, color: 'purple-500' },
      { label: 'Cerámica', value: 30, color: 'blue-500' },
      { label: 'Joyería', value: 15, color: 'green-500' },
      { label: 'Otros', value: 10, color: 'gray-400' },
    ],
    size: 'md',
    centerValue: '100',
    centerLabel: 'Productos',
    showLegend: true,
    legendPosition: 'bottom',
  },
};

// Revenue distribution
export const RevenueDistribution: Story = {
  args: {
    segments: [
      { label: 'Alebrijes', value: 35000, color: 'purple-600' },
      { label: 'Rebozos', value: 28000, color: 'pink-500' },
      { label: 'Talavera', value: 22000, color: 'blue-500' },
      { label: 'Plata', value: 15000, color: 'amber-500' },
    ],
    size: 'lg',
    centerValue: '$100k',
    centerLabel: 'Total',
    showLegend: true,
    legendPosition: 'right',
  },
  parameters: {
    docs: {
      description: {
        story: 'Revenue distribution with legend on the right side.',
      },
    },
  },
};

// Order status
export const OrderStatus: Story = {
  args: {
    segments: [
      { label: 'Entregados', value: 156, color: 'green-500' },
      { label: 'En tránsito', value: 42, color: 'blue-500' },
      { label: 'Preparando', value: 18, color: 'amber-500' },
      { label: 'Pendientes', value: 8, color: 'red-500' },
    ],
    size: 'md',
    centerValue: '224',
    centerLabel: 'Pedidos',
    showLegend: true,
  },
};

// Small size
export const SmallSize: Story = {
  args: {
    segments: [
      { label: 'A', value: 60, color: 'purple-500' },
      { label: 'B', value: 40, color: 'blue-500' },
    ],
    size: 'sm',
    centerValue: '100',
    showLegend: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Small donut chart without legend, suitable for compact displays.',
      },
    },
  },
};

// Large size with right legend
export const LargeWithRightLegend: Story = {
  args: {
    segments: [
      { label: 'Oaxaca', value: 40, color: 'purple-500' },
      { label: 'Chiapas', value: 25, color: 'blue-500' },
      { label: 'Michoacán', value: 20, color: 'green-500' },
      { label: 'Guerrero', value: 10, color: 'amber-500' },
      { label: 'Otros', value: 5, color: 'gray-400' },
    ],
    size: 'lg',
    centerValue: '32',
    centerLabel: 'Estados',
    showLegend: true,
    legendPosition: 'right',
  },
};

// No center content
export const NoCenterContent: Story = {
  args: {
    segments: [
      { label: 'Categoría A', value: 50, color: 'purple-500' },
      { label: 'Categoría B', value: 30, color: 'blue-500' },
      { label: 'Categoría C', value: 20, color: 'green-500' },
    ],
    size: 'md',
    showLegend: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Donut chart without center value display.',
      },
    },
  },
};

// Two segments
export const TwoSegments: Story = {
  args: {
    segments: [
      { label: 'Completado', value: 75, color: 'green-500' },
      { label: 'Pendiente', value: 25, color: 'gray-400' },
    ],
    size: 'md',
    centerValue: '75%',
    centerLabel: 'Progreso',
    showLegend: true,
  },
};

// Many segments
export const ManySegments: Story = {
  args: {
    segments: [
      { label: 'Textiles', value: 25, color: 'purple-500' },
      { label: 'Cerámica', value: 18, color: 'blue-500' },
      { label: 'Joyería', value: 15, color: 'green-500' },
      { label: 'Madera', value: 12, color: 'amber-500' },
      { label: 'Cuero', value: 10, color: 'red-500' },
      { label: 'Vidrio', value: 8, color: 'teal-500' },
      { label: 'Metal', value: 7, color: 'indigo-500' },
      { label: 'Otros', value: 5, color: 'gray-400' },
    ],
    size: 'lg',
    centerValue: '8',
    centerLabel: 'Categorías',
    showLegend: true,
    legendPosition: 'right',
  },
  parameters: {
    docs: {
      description: {
        story: 'Donut chart with many segments showing all color options.',
      },
    },
  },
};

// In dashboard card
export const InDashboardCard: Story = {
  render: () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 w-80">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
        Ventas por Categoría
      </h3>
      <DonutChart
        segments={[
          { label: 'Textiles', value: 45, color: 'purple-500' },
          { label: 'Cerámica', value: 30, color: 'blue-500' },
          { label: 'Joyería', value: 15, color: 'green-500' },
          { label: 'Otros', value: 10, color: 'gray-400' },
        ]}
        size="sm"
        centerValue="$85k"
        centerLabel="Total"
        showLegend={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'DonutChart displayed inside a dashboard card.',
      },
    },
  },
};
