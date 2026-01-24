import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import VirtualList from '@/components/common/VirtualList';
import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import { Package, ShoppingBag, Check, Clock, User } from 'lucide-react';

/**
 * VirtualList component for efficiently rendering large datasets.
 * Uses TanStack Virtual for windowed rendering, only rendering visible items.
 */
const meta: Meta<typeof VirtualList> = {
  title: 'Data Display/VirtualList',
  component: VirtualList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A virtualized list component that efficiently renders large datasets by only rendering visible items. Supports list/compact layouts, loading states, and item click handlers.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['list', 'compact'],
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
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    height: {
      control: 'number',
      description: 'Height of the virtualized container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof VirtualList>;

// Generate sample data
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  seller: string;
}

const generateProducts = (count: number): Product[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `product-${i + 1}`,
    name: `Producto artesanal #${i + 1}`,
    category: ['Textiles', 'Cerámica', 'Joyería', 'Madera', 'Vidrio'][i % 5],
    price: 500 + (i % 20) * 100,
    seller: ['María García', 'Pedro Hernández', 'Juana Martínez', 'Carlos López'][i % 4],
  }));

const products = generateProducts(1000);

// Default
export const Default: Story = {
  render: () => (
    <div className="max-w-md border rounded-lg">
      <VirtualList
        data={products.slice(0, 100)}
        keyAccessor="id"
        height={400}
        renderItem={(product) => (
          <VirtualList.Item
            leading={
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-primary-600" />
              </div>
            }
            primary={product.name}
            secondary={`${product.category} • ${product.seller}`}
            trailing={<span className="font-bold text-primary-600">${product.price}</span>}
          />
        )}
      />
    </div>
  ),
};

// Large dataset (1000 items)
export const LargeDataset: Story = {
  render: () => (
    <div className="max-w-lg border rounded-lg">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-semibold text-gray-900">1,000 productos</h3>
        <p className="text-sm text-gray-500">Solo se renderizan los elementos visibles</p>
      </div>
      <VirtualList
        data={products}
        keyAccessor="id"
        height={400}
        renderItem={(product) => (
          <VirtualList.Item
            leading={
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                <Package className="w-5 h-5" />
              </div>
            }
            primary={product.name}
            secondary={`${product.category} • ${product.seller}`}
            trailing={<span className="font-medium">${product.price}</span>}
          />
        )}
      />
    </div>
  ),
};

// Compact layout
export const Compact: Story = {
  render: () => (
    <div className="max-w-md border rounded-lg">
      <VirtualList
        data={products.slice(0, 50)}
        keyAccessor="id"
        layout="compact"
        height={300}
        renderItem={(product) => (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">{product.name}</span>
            <span className="text-sm text-gray-500">${product.price}</span>
          </div>
        )}
      />
    </div>
  ),
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <div className="border rounded-lg">
        <div className="p-2 border-b bg-gray-50 text-xs font-medium text-gray-500">Small</div>
        <VirtualList
          data={products.slice(0, 20)}
          keyAccessor="id"
          size="sm"
          height={250}
          renderItem={(product) => (
            <VirtualList.Item primary={product.name} secondary={product.category} />
          )}
        />
      </div>
      <div className="border rounded-lg">
        <div className="p-2 border-b bg-gray-50 text-xs font-medium text-gray-500">Medium</div>
        <VirtualList
          data={products.slice(0, 20)}
          keyAccessor="id"
          size="md"
          height={250}
          renderItem={(product) => (
            <VirtualList.Item primary={product.name} secondary={product.category} />
          )}
        />
      </div>
      <div className="border rounded-lg">
        <div className="p-2 border-b bg-gray-50 text-xs font-medium text-gray-500">Large</div>
        <VirtualList
          data={products.slice(0, 20)}
          keyAccessor="id"
          size="lg"
          height={250}
          renderItem={(product) => (
            <VirtualList.Item primary={product.name} secondary={product.category} />
          )}
        />
      </div>
    </div>
  ),
};

// With click handler
export const WithClickHandler: Story = {
  render: function ClickableList() {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="max-w-md border rounded-lg">
        <VirtualList
          data={products.slice(0, 50)}
          keyAccessor="id"
          height={400}
          onItemClick={(product) => setSelected(product.id)}
          renderItem={(product) => (
            <VirtualList.Item
              leading={<Package className="w-5 h-5 text-gray-400" />}
              primary={product.name}
              secondary={product.category}
              trailing={
                selected === product.id ? <Check className="w-5 h-5 text-green-600" /> : null
              }
            />
          )}
        />
        {selected && (
          <div className="p-3 border-t bg-gray-50 text-sm text-gray-600">
            Seleccionado: {selected}
          </div>
        )}
      </div>
    );
  },
};

// Loading state
export const Loading: Story = {
  render: () => (
    <div className="max-w-md border rounded-lg">
      <VirtualList
        data={[]}
        keyAccessor="id"
        loading
        loadingItems={6}
        height={400}
        renderItem={() => null}
      />
    </div>
  ),
};

// Empty state
export const Empty: Story = {
  render: () => (
    <div className="max-w-md border rounded-lg">
      <VirtualList
        data={[]}
        keyAccessor="id"
        height={300}
        emptyMessage="No hay productos disponibles"
        emptyIcon={<ShoppingBag className="w-12 h-12 text-gray-400" />}
        renderItem={() => null}
      />
    </div>
  ),
};

// No hover/dividers
export const NoHoverNoDividers: Story = {
  render: () => (
    <div className="max-w-md border rounded-lg">
      <VirtualList
        data={products.slice(0, 30)}
        keyAccessor="id"
        hoverable={false}
        divided={false}
        height={300}
        renderItem={(product) => (
          <VirtualList.Item primary={product.name} secondary={product.category} />
        )}
      />
    </div>
  ),
};

// Real-world: Order list
export const OrderList: Story = {
  render: () => {
    interface Order {
      id: string;
      orderNumber: string;
      customer: string;
      total: number;
      status: 'pending' | 'processing' | 'shipped' | 'delivered';
      date: string;
    }

    const orders: Order[] = Array.from({ length: 200 }, (_, i) => ({
      id: `order-${i + 1}`,
      orderNumber: `ORD-2024-${String(i + 1).padStart(4, '0')}`,
      customer: ['María García', 'Pedro López', 'Ana Martínez', 'Carlos Ruiz'][i % 4],
      total: 500 + (i % 10) * 250,
      status: (['pending', 'processing', 'shipped', 'delivered'] as const)[i % 4],
      date: `${(i % 28) + 1} ene 2024`,
    }));

    const statusColors = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
    } as const;

    const statusLabels = {
      pending: 'Pendiente',
      processing: 'Procesando',
      shipped: 'Enviado',
      delivered: 'Entregado',
    };

    return (
      <div className="max-w-2xl border rounded-lg">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Pedidos recientes</h3>
          <span className="text-sm text-gray-500">{orders.length} pedidos</span>
        </div>
        <VirtualList
          data={orders}
          keyAccessor="id"
          height={450}
          renderItem={(order) => (
            <VirtualList.Item
              leading={
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-gray-500" />
                </div>
              }
              primary={
                <div className="flex items-center gap-2">
                  <span>{order.orderNumber}</span>
                  <Badge variant={statusColors[order.status]} size="sm">
                    {statusLabels[order.status]}
                  </Badge>
                </div>
              }
              secondary={`${order.customer} • ${order.date}`}
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

// Real-world: User list
export const UserList: Story = {
  render: () => {
    interface UserItem {
      id: string;
      name: string;
      email: string;
      role: string;
      lastActive: string;
    }

    const users: UserItem[] = Array.from({ length: 500 }, (_, i) => ({
      id: `user-${i + 1}`,
      name: ['María García', 'Pedro López', 'Ana Martínez', 'Carlos Ruiz', 'Sofía Hernández'][
        i % 5
      ],
      email: `usuario${i + 1}@ejemplo.com`,
      role: ['Comprador', 'Vendedor', 'Admin'][i % 3],
      lastActive: `Hace ${(i % 24) + 1}h`,
    }));

    return (
      <div className="max-w-lg border rounded-lg">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-900">Usuarios activos</h3>
        </div>
        <VirtualList
          data={users}
          keyAccessor="id"
          height={400}
          renderItem={(user) => (
            <VirtualList.Item
              leading={<Avatar name={user.name} size="md" />}
              primary={user.name}
              secondary={user.email}
              trailing={
                <div className="text-right">
                  <span className="text-xs font-medium text-primary-600">{user.role}</span>
                  <p className="text-xs text-gray-400">{user.lastActive}</p>
                </div>
              }
            />
          )}
        />
      </div>
    );
  },
};

// Real-world: Notification list
export const NotificationList: Story = {
  render: () => {
    interface Notification {
      id: string;
      type: 'order' | 'message' | 'system';
      title: string;
      description: string;
      time: string;
      read: boolean;
    }

    const notifications: Notification[] = Array.from({ length: 100 }, (_, i) => ({
      id: `notif-${i + 1}`,
      type: (['order', 'message', 'system'] as const)[i % 3],
      title: ['Nuevo pedido recibido', 'Mensaje de un comprador', 'Actualización del sistema'][
        i % 3
      ],
      description: [
        'Tienes un nuevo pedido por $1,500 MXN',
        'María te envió un mensaje sobre tu producto',
        'Nuevas funciones disponibles en tu panel',
      ][i % 3],
      time: `Hace ${(i % 59) + 1} min`,
      read: i % 3 === 0,
    }));

    const icons = {
      order: <ShoppingBag className="w-5 h-5" />,
      message: <User className="w-5 h-5" />,
      system: <Clock className="w-5 h-5" />,
    };

    const iconColors = {
      order: 'bg-green-100 text-green-600',
      message: 'bg-blue-100 text-blue-600',
      system: 'bg-gray-100 text-gray-600',
    };

    return (
      <div className="max-w-md border rounded-lg">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-900">Notificaciones</h3>
        </div>
        <VirtualList
          data={notifications}
          keyAccessor="id"
          height={400}
          renderItem={(notif) => (
            <div className={`flex gap-3 ${!notif.read ? 'bg-blue-50/50' : ''}`}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconColors[notif.type]}`}
              >
                {icons[notif.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm ${!notif.read ? 'font-semibold' : 'font-medium'} text-gray-900 truncate`}
                >
                  {notif.title}
                </p>
                <p className="text-sm text-gray-500 truncate">{notif.description}</p>
                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
              </div>
              {!notif.read && <div className="w-2 h-2 bg-blue-600 rounded-full shrink-0 mt-2" />}
            </div>
          )}
        />
      </div>
    );
  },
};
