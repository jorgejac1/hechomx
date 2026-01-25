import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProductConversions from '@/components/dashboard/ProductConversions';
import type { ProductConversion } from '@/lib/types/seller-types';

/**
 * ProductConversions displays a table of per-product conversion metrics
 * helping sellers identify their best and worst performing products.
 * Features responsive design with desktop table and mobile cards.
 */
const meta: Meta<typeof ProductConversions> = {
  title: 'Dashboard/ProductConversions',
  component: ProductConversions,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Per-product conversion metrics table showing views, add-to-cart, purchases, and conversion rates with color-coded performance indicators.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample products with varying conversion rates
const sampleProducts: ProductConversion[] = [
  {
    productId: 'p1',
    productName: 'Cojín Tejido Geométrico',
    views: 890,
    addToCart: 156,
    purchases: 45,
    viewToCartRate: 17.5,
    cartToPurchaseRate: 28.8,
  },
  {
    productId: 'p2',
    productName: 'Alebrije Dragón Multicolor',
    views: 1250,
    addToCart: 89,
    purchases: 28,
    viewToCartRate: 7.1,
    cartToPurchaseRate: 31.5,
  },
  {
    productId: 'p3',
    productName: 'Rebozo de Seda Oaxaqueño',
    views: 456,
    addToCart: 78,
    purchases: 12,
    viewToCartRate: 17.1,
    cartToPurchaseRate: 15.4,
  },
  {
    productId: 'p4',
    productName: 'Collar de Plata con Ámbar',
    views: 2100,
    addToCart: 315,
    purchases: 89,
    viewToCartRate: 15.0,
    cartToPurchaseRate: 28.3,
  },
  {
    productId: 'p5',
    productName: 'Máscara de Barro Negro',
    views: 320,
    addToCart: 28,
    purchases: 5,
    viewToCartRate: 8.8,
    cartToPurchaseRate: 17.9,
  },
];

// Default story with multiple products
export const Default: Story = {
  args: {
    products: sampleProducts,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default view showing multiple products with varying conversion rates. Color coding: Green (high), Yellow (medium), Red (low).',
      },
    },
  },
};

// High performing products
const highPerformers: ProductConversion[] = [
  {
    productId: 'hp1',
    productName: 'Bolsa de Cuero Artesanal',
    views: 1500,
    addToCart: 375,
    purchases: 150,
    viewToCartRate: 25.0,
    cartToPurchaseRate: 40.0,
  },
  {
    productId: 'hp2',
    productName: 'Huaraches Tradicionales',
    views: 980,
    addToCart: 196,
    purchases: 68,
    viewToCartRate: 20.0,
    cartToPurchaseRate: 34.7,
  },
  {
    productId: 'hp3',
    productName: 'Tequilero de Vidrio Soplado',
    views: 750,
    addToCart: 135,
    purchases: 45,
    viewToCartRate: 18.0,
    cartToPurchaseRate: 33.3,
  },
];

export const HighPerformers: Story = {
  args: {
    products: highPerformers,
  },
  parameters: {
    docs: {
      description: {
        story: 'Products with high conversion rates. All metrics show green indicators.',
      },
    },
  },
};

// Low performing products (need attention)
const lowPerformers: ProductConversion[] = [
  {
    productId: 'lp1',
    productName: 'Tapete de Lana Grande',
    views: 2500,
    addToCart: 125,
    purchases: 8,
    viewToCartRate: 5.0,
    cartToPurchaseRate: 6.4,
  },
  {
    productId: 'lp2',
    productName: 'Escultura de Madera',
    views: 1800,
    addToCart: 72,
    purchases: 5,
    viewToCartRate: 4.0,
    cartToPurchaseRate: 6.9,
  },
  {
    productId: 'lp3',
    productName: 'Vajilla de Talavera (Set 12)',
    views: 3200,
    addToCart: 192,
    purchases: 12,
    viewToCartRate: 6.0,
    cartToPurchaseRate: 6.3,
  },
];

export const LowPerformers: Story = {
  args: {
    products: lowPerformers,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Products with low conversion rates that need optimization. Red indicators show areas for improvement.',
      },
    },
  },
};

// Single product
export const SingleProduct: Story = {
  args: {
    products: [sampleProducts[0]],
  },
  parameters: {
    docs: {
      description: {
        story: 'Single product view, useful for detailed product analytics.',
      },
    },
  },
};

// Many products
const manyProducts: ProductConversion[] = [
  ...sampleProducts,
  {
    productId: 'p6',
    productName: 'Canasta de Palma Tejida',
    views: 580,
    addToCart: 87,
    purchases: 23,
    viewToCartRate: 15.0,
    cartToPurchaseRate: 26.4,
  },
  {
    productId: 'p7',
    productName: 'Vestido Bordado a Mano',
    views: 1890,
    addToCart: 284,
    purchases: 56,
    viewToCartRate: 15.0,
    cartToPurchaseRate: 19.7,
  },
  {
    productId: 'p8',
    productName: 'Guitarra de Paracho',
    views: 420,
    addToCart: 42,
    purchases: 8,
    viewToCartRate: 10.0,
    cartToPurchaseRate: 19.0,
  },
];

export const ManyProducts: Story = {
  args: {
    products: manyProducts,
  },
  parameters: {
    docs: {
      description: {
        story: 'View with many products showing the scrollable table behavior.',
      },
    },
  },
};

// Empty state
export const Empty: Story = {
  args: {
    products: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no products are available. Component returns null.',
      },
    },
  },
};

// In dashboard context
export const InDashboardCard: Story = {
  render: () => (
    <div className="max-w-4xl">
      <ProductConversions products={sampleProducts} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'ProductConversions as it appears in the seller dashboard, with its built-in card styling.',
      },
    },
  },
};

// Mobile view hint
export const MobileNote: Story = {
  args: {
    products: sampleProducts.slice(0, 3),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'On mobile devices, the component displays as cards instead of a table for better readability.',
      },
    },
  },
};
