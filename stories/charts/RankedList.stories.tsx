import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RankedList from '@/components/charts/RankedList';

/**
 * RankedList displays items in a leaderboard-style list with rank badges,
 * optional avatars, values, and trend indicators.
 */
const meta: Meta<typeof RankedList> = {
  title: 'Charts/RankedList',
  component: RankedList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A leaderboard-style ranked list for showing top sellers, products, customers, etc.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showRank: {
      control: 'boolean',
      description: 'Show rank numbers',
    },
    showTrend: {
      control: 'boolean',
      description: 'Show trend indicators',
    },
    rankColor: {
      control: 'select',
      options: ['purple', 'blue', 'green', 'amber', 'gray'],
      description: 'Rank badge color',
    },
    maxItems: {
      control: 'number',
      description: 'Maximum items to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Top selling products
export const Default: Story = {
  args: {
    items: [
      { name: 'Alebrije Dragón Multicolor', value: '$15,000', trend: 12 },
      { name: 'Rebozo de Seda Oaxaqueño', value: '$12,500', trend: 8 },
      { name: 'Set de Talavera (12 piezas)', value: '$9,800', trend: -3 },
      { name: 'Collar de Plata con Ámbar', value: '$7,200', trend: 15 },
      { name: 'Huipil Bordado a Mano', value: '$5,400', trend: -5 },
    ],
    showRank: true,
    showTrend: true,
    rankColor: 'purple',
  },
};

// Top customers
export const TopCustomers: Story = {
  args: {
    items: [
      { name: 'María García', subtitle: 'Ciudad de México', value: '$45,000', trend: 20 },
      { name: 'Carlos Rodríguez', subtitle: 'Guadalajara', value: '$38,500', trend: 12 },
      { name: 'Ana Martínez', subtitle: 'Monterrey', value: '$32,000', trend: 5 },
      { name: 'Juan López', subtitle: 'Puebla', value: '$28,000', trend: -2 },
      { name: 'Laura Sánchez', subtitle: 'Querétaro', value: '$25,500', trend: 8 },
    ],
    showRank: true,
    showTrend: true,
    rankColor: 'blue',
  },
  parameters: {
    docs: {
      description: {
        story: 'Top customers with subtitles showing location.',
      },
    },
  },
};

// With avatars
export const WithAvatars: Story = {
  args: {
    items: [
      {
        name: 'Artesanías Oaxaca',
        subtitle: 'Oaxaca de Juárez',
        value: '$125,000',
        trend: 15,
        avatar: '/images/avatars/shop1.jpg',
      },
      {
        name: 'Tejidos Chiapas',
        subtitle: 'San Cristóbal',
        value: '$98,000',
        trend: 8,
        avatar: '/images/avatars/shop2.jpg',
      },
      {
        name: 'Talavera Puebla',
        subtitle: 'Puebla',
        value: '$87,500',
        trend: -3,
        avatar: '/images/avatars/shop3.jpg',
      },
    ],
    showRank: true,
    showTrend: true,
    rankColor: 'green',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ranked list with avatar images (images may not load in Storybook).',
      },
    },
  },
};

// Without trends
export const WithoutTrends: Story = {
  args: {
    items: [
      { name: 'Oaxaca', value: '156 pedidos' },
      { name: 'Chiapas', value: '124 pedidos' },
      { name: 'Michoacán', value: '98 pedidos' },
      { name: 'Guerrero', value: '87 pedidos' },
      { name: 'Puebla', value: '76 pedidos' },
    ],
    showRank: true,
    showTrend: false,
    rankColor: 'amber',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ranked list without trend indicators.',
      },
    },
  },
};

// Without ranks
export const WithoutRanks: Story = {
  args: {
    items: [
      { name: 'Textiles', value: '45%', trend: 5 },
      { name: 'Cerámica', value: '28%', trend: -2 },
      { name: 'Joyería', value: '15%', trend: 8 },
      { name: 'Madera', value: '12%', trend: 3 },
    ],
    showRank: false,
    showTrend: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'List without rank badges.',
      },
    },
  },
};

// Limited items
export const LimitedItems: Story = {
  args: {
    items: [
      { name: 'Producto 1', value: '$10,000', trend: 15 },
      { name: 'Producto 2', value: '$8,500', trend: 10 },
      { name: 'Producto 3', value: '$7,200', trend: 5 },
      { name: 'Producto 4', value: '$6,000', trend: 2 },
      { name: 'Producto 5', value: '$5,500', trend: -1 },
      { name: 'Producto 6', value: '$4,800', trend: -3 },
      { name: 'Producto 7', value: '$4,200', trend: -5 },
    ],
    showRank: true,
    showTrend: true,
    maxItems: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Limiting display to top 5 items from a longer list.',
      },
    },
  },
};

// All rank colors
export const AllRankColors: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {(['purple', 'blue', 'green', 'amber', 'gray'] as const).map((color) => (
        <div key={color} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
          <h4 className="font-semibold mb-2 capitalize">{color}</h4>
          <RankedList
            items={[
              { name: 'Item 1', value: '$100' },
              { name: 'Item 2', value: '$80' },
              { name: 'Item 3', value: '$60' },
            ]}
            showRank={true}
            showTrend={false}
            rankColor={color}
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available rank badge colors.',
      },
    },
  },
};

// In dashboard card
export const InDashboardCard: Story = {
  render: () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Productos Más Vendidos
        </h3>
        <a href="#" className="text-sm text-purple-600 hover:underline">
          Ver todos
        </a>
      </div>
      <RankedList
        items={[
          { name: 'Alebrije Dragón', subtitle: 'Oaxaca', value: '$15,000', trend: 12 },
          { name: 'Rebozo de Seda', subtitle: 'Chiapas', value: '$12,500', trend: 8 },
          { name: 'Set de Talavera', subtitle: 'Puebla', value: '$9,800', trend: -3 },
          { name: 'Collar de Plata', subtitle: 'Taxco', value: '$7,200', trend: 15 },
          { name: 'Huipil Bordado', subtitle: 'Oaxaca', value: '$5,400', trend: -5 },
        ]}
        showRank={true}
        showTrend={true}
        rankColor="purple"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'RankedList inside a dashboard card with header.',
      },
    },
  },
};

// Simple list
export const SimpleList: Story = {
  args: {
    items: [
      { name: 'Primera opción', value: '45%' },
      { name: 'Segunda opción', value: '32%' },
      { name: 'Tercera opción', value: '18%' },
      { name: 'Otras', value: '5%' },
    ],
    showRank: false,
    showTrend: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal list without ranks or trends.',
      },
    },
  },
};
