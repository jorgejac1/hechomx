import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Package, Star, MapPin, Eye, MoreVertical } from 'lucide-react';
import DataList from '@/components/common/DataList';
import Badge from '@/components/common/Badge';
import Avatar from '@/components/common/Avatar';

/**
 * DataList component for rendering collections of items.
 * Supports list, grid, and compact layouts with loading and empty states.
 */
const meta: Meta<typeof DataList> = {
  title: 'Data Display/DataList',
  component: DataList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flexible data list component supporting list, grid, and compact layouts with loading skeletons, empty states, and click handlers.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['list', 'grid', 'compact'],
      description: 'Layout mode',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover effect',
    },
    divided: {
      control: 'boolean',
      description: 'Show dividers between items',
    },
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 6],
      description: 'Grid columns',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

const sampleProducts: Product[] = [
  { id: '1', name: 'Rebozo de Seda', category: 'Textiles', price: 2500, image: '' },
  { id: '2', name: 'Vasija de Barro Negro', category: 'Cerámica', price: 1200, image: '' },
  { id: '3', name: 'Collar de Plata', category: 'Joyería', price: 850, image: '' },
  { id: '4', name: 'Alebrije Mediano', category: 'Madera', price: 650, image: '' },
  { id: '5', name: 'Cinturón Piteado', category: 'Cuero', price: 1800, image: '' },
];

// Default list
export const Default: Story = {
  args: {
    data: sampleProducts,
    keyAccessor: 'id',
    renderItem: (item: Product) => (
      <DataList.Item
        leading={<div className="w-12 h-12 bg-gray-100 rounded-lg" />}
        primary={item.name}
        secondary={item.category}
        trailing={
          <span className="font-bold text-primary-600">${item.price.toLocaleString()}</span>
        }
      />
    ),
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
};

// Grid layout
export const GridLayout: Story = {
  args: {
    data: sampleProducts,
    keyAccessor: 'id',
    layout: 'grid',
    columns: 3,
    renderItem: (item: Product) => (
      <div className="text-center">
        <div className="w-full aspect-square bg-gray-100 rounded-lg mb-3" />
        <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
        <p className="text-sm text-gray-500">{item.category}</p>
        <p className="font-bold text-primary-600 mt-1">${item.price.toLocaleString()}</p>
      </div>
    ),
  },
};

// Compact layout
export const CompactLayout: Story = {
  args: {
    data: sampleProducts,
    keyAccessor: 'id',
    layout: 'compact',
    renderItem: (item: Product) => (
      <DataList.Item
        primary={item.name}
        secondary={item.category}
        trailing={<span className="text-sm text-gray-500">${item.price}</span>}
      />
    ),
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

// Sizes
export const SizeSmall: Story = {
  args: {
    data: sampleProducts.slice(0, 3),
    keyAccessor: 'id',
    size: 'sm',
    renderItem: (item: Product) => <DataList.Item primary={item.name} secondary={item.category} />,
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const SizeMedium: Story = {
  args: {
    data: sampleProducts.slice(0, 3),
    keyAccessor: 'id',
    size: 'md',
    renderItem: (item: Product) => <DataList.Item primary={item.name} secondary={item.category} />,
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const SizeLarge: Story = {
  args: {
    data: sampleProducts.slice(0, 3),
    keyAccessor: 'id',
    size: 'lg',
    renderItem: (item: Product) => <DataList.Item primary={item.name} secondary={item.category} />,
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

// Without dividers
export const WithoutDividers: Story = {
  args: {
    data: sampleProducts.slice(0, 3),
    keyAccessor: 'id',
    divided: false,
    renderItem: (item: Product) => (
      <DataList.Item
        leading={<div className="w-10 h-10 bg-gray-100 rounded-lg" />}
        primary={item.name}
        secondary={item.category}
      />
    ),
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

// Without hover
export const WithoutHover: Story = {
  args: {
    data: sampleProducts.slice(0, 3),
    keyAccessor: 'id',
    hoverable: false,
    renderItem: (item: Product) => <DataList.Item primary={item.name} secondary={item.category} />,
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

// Loading
export const Loading: Story = {
  args: {
    data: [],
    keyAccessor: 'id',
    loading: true,
    loadingItems: 5,
    renderItem: () => null,
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
};

// Loading grid
export const LoadingGrid: Story = {
  args: {
    data: [],
    keyAccessor: 'id',
    layout: 'grid',
    columns: 3,
    loading: true,
    loadingItems: 6,
    renderItem: () => null,
  },
};

// Empty state
export const EmptyState: Story = {
  args: {
    data: [],
    keyAccessor: 'id',
    emptyMessage: 'No hay productos disponibles',
    emptyIcon: <Package className="w-10 h-10 text-gray-300" />,
    renderItem: () => null,
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
};

// With click handler
export const WithClickHandler: Story = {
  render: function WithClickHandlerExample() {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="max-w-lg">
        <p className="text-sm text-gray-500 mb-4">Seleccionado: {selected || 'ninguno'}</p>
        <DataList
          data={sampleProducts}
          keyAccessor="id"
          onItemClick={(item) => setSelected(item.name)}
          renderItem={(item: Product) => (
            <DataList.Item
              leading={<div className="w-10 h-10 bg-gray-100 rounded-lg" />}
              primary={item.name}
              secondary={item.category}
              trailing={
                <span className="text-sm font-medium text-primary-600">
                  ${item.price.toLocaleString()}
                </span>
              }
            />
          )}
        />
      </div>
    );
  },
};

// Grid columns
export const Grid2Columns: Story = {
  args: {
    data: sampleProducts,
    keyAccessor: 'id',
    layout: 'grid',
    columns: 2,
    renderItem: (item: Product) => (
      <div>
        <div className="aspect-square bg-gray-100 rounded-lg mb-2" />
        <h4 className="font-medium text-gray-900">{item.name}</h4>
        <p className="text-sm text-gray-500">${item.price}</p>
      </div>
    ),
  },
};

export const Grid4Columns: Story = {
  args: {
    data: sampleProducts,
    keyAccessor: 'id',
    layout: 'grid',
    columns: 4,
    renderItem: (item: Product) => (
      <div>
        <div className="aspect-square bg-gray-100 rounded-lg mb-2" />
        <h4 className="font-medium text-gray-900 text-sm truncate">{item.name}</h4>
        <p className="text-xs text-gray-500">${item.price}</p>
      </div>
    ),
  },
};

// Orders list example
export const OrdersListExample: Story = {
  render: () => {
    interface Order {
      id: string;
      orderNumber: string;
      customer: string;
      total: number;
      status: 'pending' | 'shipped' | 'delivered';
      date: string;
    }

    const orders: Order[] = [
      {
        id: '1',
        orderNumber: 'ORD-001',
        customer: 'María García',
        total: 2500,
        status: 'delivered',
        date: '15 Ene',
      },
      {
        id: '2',
        orderNumber: 'ORD-002',
        customer: 'Juan López',
        total: 1850,
        status: 'shipped',
        date: '14 Ene',
      },
      {
        id: '3',
        orderNumber: 'ORD-003',
        customer: 'Ana Martínez',
        total: 3200,
        status: 'pending',
        date: '13 Ene',
      },
    ];

    const statusVariants = {
      pending: 'warning',
      shipped: 'info',
      delivered: 'success',
    } as const;

    const statusLabels = {
      pending: 'Pendiente',
      shipped: 'Enviado',
      delivered: 'Entregado',
    };

    return (
      <div className="max-w-lg border rounded-lg">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-900">Pedidos recientes</h3>
        </div>
        <DataList
          data={orders}
          keyAccessor="id"
          size="md"
          renderItem={(order: Order) => (
            <DataList.Item
              leading={
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary-600" />
                </div>
              }
              primary={
                <span className="flex items-center gap-2">
                  {order.orderNumber}
                  <Badge variant={statusVariants[order.status]} size="sm">
                    {statusLabels[order.status]}
                  </Badge>
                </span>
              }
              secondary={`${order.customer} · ${order.date}`}
              trailing={
                <span className="font-bold text-gray-900">${order.total.toLocaleString()}</span>
              }
            />
          )}
        />
      </div>
    );
  },
};

// Artisans list example
export const ArtisansListExample: Story = {
  render: () => {
    interface Artisan {
      id: string;
      name: string;
      location: string;
      rating: number;
      products: number;
      avatar: string;
    }

    const artisans: Artisan[] = [
      { id: '1', name: 'María García', location: 'Oaxaca', rating: 4.9, products: 45, avatar: '' },
      { id: '2', name: 'Pedro López', location: 'Chiapas', rating: 4.7, products: 32, avatar: '' },
      { id: '3', name: 'Ana Martínez', location: 'Puebla', rating: 4.8, products: 28, avatar: '' },
    ];

    return (
      <div className="max-w-md">
        <DataList
          data={artisans}
          keyAccessor="id"
          renderItem={(artisan: Artisan) => (
            <DataList.Item
              leading={<Avatar name={artisan.name} size="md" />}
              primary={artisan.name}
              secondary={
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-3 h-3" />
                  {artisan.location}
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    {artisan.rating}
                  </span>
                </span>
              }
              trailing={<span className="text-sm text-gray-500">{artisan.products} productos</span>}
            />
          )}
        />
      </div>
    );
  },
};

// Products grid example
export const ProductsGridExample: Story = {
  render: () => (
    <DataList
      data={sampleProducts}
      keyAccessor="id"
      layout="grid"
      columns={3}
      renderItem={(item: Product) => (
        <div className="group">
          <div className="relative aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <button className="opacity-0 group-hover:opacity-100 p-2 bg-white rounded-full shadow-lg transition-opacity">
                <Eye className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                {item.name}
              </h4>
              <p className="text-sm text-gray-500">{item.category}</p>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <p className="font-bold text-primary-600 mt-1">${item.price.toLocaleString()} MXN</p>
        </div>
      )}
    />
  ),
};
