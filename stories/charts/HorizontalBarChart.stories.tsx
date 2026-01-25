import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HorizontalBarChart from '@/components/charts/HorizontalBarChart';

/**
 * HorizontalBarChart displays data as horizontal bars with labels and values.
 * Supports animated transitions, custom colors, and various sizes.
 */
const meta: Meta<typeof HorizontalBarChart> = {
  title: 'Charts/HorizontalBarChart',
  component: HorizontalBarChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A horizontal bar chart for comparing values across categories. Supports animation, custom formatting, and multiple sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    barHeight: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Height of the bars',
    },
    showValues: {
      control: 'boolean',
      description: 'Show values on the right side',
    },
    animated: {
      control: 'boolean',
      description: 'Animate bars on load',
    },
    color: {
      control: 'text',
      description: 'Default bar color (Tailwind class)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Top selling products
export const Default: Story = {
  args: {
    data: [
      { label: 'Alebrije Dragón', value: 15000 },
      { label: 'Rebozo Seda', value: 12500 },
      { label: 'Talavera Set', value: 9800 },
      { label: 'Collar Plata', value: 7200 },
      { label: 'Huipil', value: 5400 },
    ],
    color: 'bg-purple-500',
    showValues: true,
    barHeight: 'md',
    animated: true,
  },
};

// Sales by state
export const SalesByState: Story = {
  args: {
    data: [
      { label: 'Oaxaca', value: 45000 },
      { label: 'Chiapas', value: 32000 },
      { label: 'Michoacán', value: 28000 },
      { label: 'Guerrero', value: 18000 },
      { label: 'Puebla', value: 15000 },
    ],
    color: 'bg-blue-500',
    showValues: true,
    barHeight: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Sales by Mexican state with large bars.',
      },
    },
  },
};

// Order counts (custom formatting)
export const OrderCounts: Story = {
  args: {
    data: [
      { label: 'Enero', value: 156 },
      { label: 'Febrero', value: 142 },
      { label: 'Marzo', value: 189 },
      { label: 'Abril', value: 167 },
      { label: 'Mayo', value: 201 },
    ],
    color: 'bg-green-500',
    formatValue: (v) => `${v} pedidos`,
    showValues: true,
    barHeight: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Order counts with custom value formatting.',
      },
    },
  },
};

// With custom colors per bar
export const CustomColorsPerBar: Story = {
  args: {
    data: [
      { label: 'Excelente', value: 120, color: 'bg-green-500' },
      { label: 'Bueno', value: 85, color: 'bg-blue-500' },
      { label: 'Regular', value: 45, color: 'bg-amber-500' },
      { label: 'Malo', value: 12, color: 'bg-red-500' },
    ],
    showValues: true,
    formatValue: (v) => `${v} reseñas`,
    barHeight: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Each bar can have its own color for categorical data.',
      },
    },
  },
};

// Small bars
export const SmallBars: Story = {
  args: {
    data: [
      { label: 'A', value: 80 },
      { label: 'B', value: 65 },
      { label: 'C', value: 45 },
      { label: 'D', value: 30 },
    ],
    color: 'bg-purple-500',
    showValues: true,
    barHeight: 'sm',
    formatValue: (v) => `${v}%`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Small bars for compact displays.',
      },
    },
  },
};

// Large bars
export const LargeBars: Story = {
  args: {
    data: [
      { label: 'Producto A', value: 8500 },
      { label: 'Producto B', value: 6200 },
      { label: 'Producto C', value: 4100 },
    ],
    color: 'bg-amber-500',
    showValues: true,
    barHeight: 'lg',
  },
};

// Without values
export const WithoutValues: Story = {
  args: {
    data: [
      { label: 'Textiles', value: 45 },
      { label: 'Cerámica', value: 30 },
      { label: 'Joyería', value: 15 },
      { label: 'Otros', value: 10 },
    ],
    color: 'bg-purple-500',
    showValues: false,
    barHeight: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Bars without value labels for cleaner look.',
      },
    },
  },
};

// Without animation
export const WithoutAnimation: Story = {
  args: {
    data: [
      { label: 'Item 1', value: 100 },
      { label: 'Item 2', value: 75 },
      { label: 'Item 3', value: 50 },
    ],
    color: 'bg-blue-500',
    showValues: true,
    animated: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Bars without animation for instant display.',
      },
    },
  },
};

// Top products in dashboard card
export const InDashboardCard: Story = {
  render: () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 max-w-md">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
        Productos Más Vendidos
      </h3>
      <HorizontalBarChart
        data={[
          { label: 'Alebrije Dragón', value: 15000 },
          { label: 'Rebozo Seda', value: 12500 },
          { label: 'Talavera Set', value: 9800 },
          { label: 'Collar Plata', value: 7200 },
          { label: 'Huipil', value: 5400 },
        ]}
        color="bg-purple-500"
        showValues={true}
        labelWidth="w-28"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'HorizontalBarChart in a dashboard card context.',
      },
    },
  },
};

// Custom max value
export const CustomMaxValue: Story = {
  args: {
    data: [
      { label: 'Completado', value: 75 },
      { label: 'En proceso', value: 15 },
      { label: 'Pendiente', value: 10 },
    ],
    maxValue: 100,
    color: 'bg-green-500',
    formatValue: (v) => `${v}%`,
    showValues: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Using custom maxValue for percentage-based display.',
      },
    },
  },
};
