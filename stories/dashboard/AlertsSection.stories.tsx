import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AlertsSection from '@/components/dashboard/AlertsSection';
import type { CompleteOrder } from '@/lib/types/checkout';

/**
 * AlertsSection displays important notifications including new orders,
 * out-of-stock products, and low stock warnings with color-coded severity.
 */
const meta: Meta<typeof AlertsSection> = {
  title: 'Dashboard/AlertsSection',
  component: AlertsSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Alerts section showing new orders, out-of-stock, and low stock warnings for sellers.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample order data for stories
const sampleOrders: CompleteOrder[] = [
  {
    id: 'order-1',
    orderNumber: 'ORD-001',
    items: [
      {
        id: 'prod-1',
        name: 'Alebrije Dragón Multicolor',
        price: 2500,
        quantity: 1,
        maker: 'Artesanías Oaxaca',
        images: ['/images/products/alebrije.jpg'],
      },
    ],
    total: 2500,
    subtotal: 2500,
    shippingCost: 0,
    discount: 0,
    giftWrapFee: 0,
    shippingAddress: {
      firstName: 'María',
      lastName: 'García',
      email: 'maria@ejemplo.com',
      phone: '555-1234-5678',
      street: 'Av. Reforma',
      streetNumber: '123',
      neighborhood: 'Juárez',
      city: 'Ciudad de México',
      state: 'Ciudad de México',
      postalCode: '06600',
    },
    paymentMethod: 'card',
    paymentStatus: 'completed',
    giftWrap: false,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'user-1',
  },
  {
    id: 'order-2',
    orderNumber: 'ORD-002',
    items: [
      {
        id: 'prod-2',
        name: 'Rebozo de Seda',
        price: 3500,
        quantity: 2,
        maker: 'Artesanías Oaxaca',
        images: ['/images/products/rebozo.jpg'],
      },
    ],
    total: 7000,
    subtotal: 7000,
    shippingCost: 0,
    discount: 0,
    giftWrapFee: 0,
    shippingAddress: {
      firstName: 'Carlos',
      lastName: 'López',
      email: 'carlos@ejemplo.com',
      phone: '333-9876-5432',
      street: 'Calle 5 de Mayo',
      streetNumber: '456',
      neighborhood: 'Centro',
      city: 'Guadalajara',
      state: 'Jalisco',
      postalCode: '44100',
    },
    paymentMethod: 'card',
    paymentStatus: 'completed',
    giftWrap: false,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'user-2',
  },
];

// No alerts (returns null)
export const NoAlerts: Story = {
  args: {
    lowStockProducts: [],
    outOfStockProducts: [],
    newOrders: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'When there are no alerts, the component renders nothing.',
      },
    },
  },
};

// New orders only
export const WithNewOrders: Story = {
  args: {
    lowStockProducts: [],
    outOfStockProducts: [],
    newOrders: sampleOrders,
    sellerName: 'Artesanías Oaxaca',
    onViewOrders: () => console.log('View orders clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert section showing new orders notification.',
      },
    },
  },
};

// Single new order
export const SingleNewOrder: Story = {
  args: {
    lowStockProducts: [],
    outOfStockProducts: [],
    newOrders: [sampleOrders[0]],
    sellerName: 'Artesanías Oaxaca',
    onViewOrders: () => console.log('View orders clicked'),
  },
};

// Out of stock only
export const OutOfStock: Story = {
  args: {
    lowStockProducts: [],
    outOfStockProducts: [
      { name: 'Alebrije Dragón Multicolor', stock: 0 },
      { name: 'Collar de Plata con Ámbar', stock: 0 },
    ],
    newOrders: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert for products that are completely out of stock.',
      },
    },
  },
};

// Low stock only
export const LowStock: Story = {
  args: {
    lowStockProducts: [
      { name: 'Rebozo de Seda Oaxaqueño', stock: 2 },
      { name: 'Set de Talavera', stock: 3 },
      { name: 'Huipil Bordado a Mano', stock: 1 },
    ],
    outOfStockProducts: [],
    newOrders: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert for products with low stock levels.',
      },
    },
  },
};

// All alert types
export const AllAlertTypes: Story = {
  args: {
    lowStockProducts: [
      { name: 'Rebozo de Seda Oaxaqueño', stock: 2 },
      { name: 'Set de Talavera', stock: 3 },
    ],
    outOfStockProducts: [{ name: 'Alebrije Dragón Multicolor', stock: 0 }],
    newOrders: sampleOrders,
    sellerName: 'Artesanías Oaxaca',
    onViewOrders: () => console.log('View orders clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'All three alert types displayed together.',
      },
    },
  },
};

// Single item alerts
export const SingleItemAlerts: Story = {
  args: {
    lowStockProducts: [{ name: 'Huipil Bordado a Mano', stock: 1 }],
    outOfStockProducts: [{ name: 'Alebrije Dragón Multicolor', stock: 0 }],
    newOrders: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Single item in each alert category (correct pluralization).',
      },
    },
  },
};

// Many new orders
export const ManyNewOrders: Story = {
  args: {
    lowStockProducts: [],
    outOfStockProducts: [],
    newOrders: [
      ...sampleOrders,
      {
        ...sampleOrders[0],
        id: 'order-3',
        orderNumber: 'ORD-003',
        total: 1500,
      },
      {
        ...sampleOrders[0],
        id: 'order-4',
        orderNumber: 'ORD-004',
        total: 3200,
      },
      {
        ...sampleOrders[0],
        id: 'order-5',
        orderNumber: 'ORD-005',
        total: 4500,
      },
    ],
    sellerName: 'Artesanías Oaxaca',
    onViewOrders: () => console.log('View orders clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Many new orders showing the "+X más" indicator.',
      },
    },
  },
};

// In dashboard context
export const InDashboardContext: Story = {
  render: () => (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-[400px] p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Dashboard de Vendedor
      </h1>
      <AlertsSection
        lowStockProducts={[{ name: 'Rebozo de Seda Oaxaqueño', stock: 2 }]}
        outOfStockProducts={[{ name: 'Alebrije Dragón Multicolor', stock: 0 }]}
        newOrders={sampleOrders.slice(0, 1)}
        sellerName="Artesanías Oaxaca"
        onViewOrders={() => console.log('View orders clicked')}
      />
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-400">Dashboard content continues here...</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Alerts section in typical dashboard context.',
      },
    },
  },
};
