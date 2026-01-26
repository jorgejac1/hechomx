import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProductRecommendations from '@/components/product/ProductRecommendations';
import { Product } from '@/types/product';
import { ToastProvider } from '@/contexts/ToastContext';
import { ComparisonProvider } from '@/contexts/ComparisonContext';

// Wrapper component that provides required contexts
const StorybookWrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>
    <ComparisonProvider>{children}</ComparisonProvider>
  </ToastProvider>
);

// Different image URLs for variety in stories
const productImages = {
  barroNegro: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
  alebrije: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
  textiles: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800',
  mascara: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800',
  canasta: 'https://images.unsplash.com/photo-1595412890248-13b93f1f07d4?w=800',
  joyeria: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
  bolsa: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
  huipil: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
  cocina: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
  arte: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800',
};

// Current product being viewed
const currentProduct: Product = {
  id: 'current-1',
  name: 'Alebrije Colorido',
  description: 'Alebrije artesanal hecho a mano en Oaxaca',
  price: 1500,
  currency: 'MXN',
  category: 'Artesanías',
  state: 'Oaxaca',
  maker: 'Artesano Pedro',
  images: [productImages.alebrije],
  inStock: true,
  featured: true,
  verified: true,
  materials: ['Madera', 'Pintura'],
  rating: 4.8,
  reviewCount: 45,
  status: 'published',
  createdAt: new Date().toISOString(),
};

// Similar products (same category)
const similarProducts: Product[] = [
  {
    id: 'sim-1',
    name: 'Alebrije Pequeño',
    description: 'Mini alebrije decorativo',
    price: 800,
    currency: 'MXN',
    category: 'Artesanías',
    state: 'Oaxaca',
    maker: 'Artesano Pedro',
    images: [productImages.mascara],
    inStock: true,
    materials: ['Madera', 'Pintura'],
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sim-2',
    name: 'Alebrije Grande',
    description: 'Alebrije de tamaño grande',
    price: 2500,
    currency: 'MXN',
    category: 'Artesanías',
    state: 'Oaxaca',
    maker: 'Artesano Juan',
    images: [productImages.arte],
    inStock: true,
    featured: true,
    materials: ['Madera', 'Pintura'],
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sim-3',
    name: 'Figura de Madera',
    description: 'Figura tallada a mano',
    price: 1200,
    currency: 'MXN',
    category: 'Artesanías',
    state: 'Oaxaca',
    maker: 'Artesana María',
    images: [productImages.canasta],
    inStock: true,
    verified: true,
    materials: ['Madera'],
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sim-4',
    name: 'Artesanía Tradicional',
    description: 'Pieza tradicional oaxaqueña',
    price: 950,
    currency: 'MXN',
    category: 'Artesanías',
    state: 'Oaxaca',
    maker: 'Artesano Pedro',
    images: [productImages.barroNegro],
    inStock: true,
    materials: ['Madera', 'Pintura'],
    status: 'published',
    createdAt: new Date().toISOString(),
  },
];

// Cross-category products (different categories but shared attributes)
const crossCategoryProducts: Product[] = [
  {
    id: 'cross-1',
    name: 'Reboso de Seda',
    description: 'Reboso tradicional tejido a mano',
    price: 2500,
    currency: 'MXN',
    category: 'Textiles',
    state: 'Oaxaca',
    maker: 'Tejedora María',
    images: [productImages.textiles],
    inStock: true,
    featured: true,
    materials: ['Seda'],
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cross-2',
    name: 'Collar de Plata',
    description: 'Joyería artesanal oaxaqueña',
    price: 1800,
    currency: 'MXN',
    category: 'Joyería',
    state: 'Oaxaca',
    maker: 'Platero José',
    images: [productImages.joyeria],
    inStock: true,
    verified: true,
    materials: ['Plata'],
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cross-3',
    name: 'Bolsa de Cuero',
    description: 'Bolsa artesanal de piel',
    price: 2200,
    currency: 'MXN',
    category: 'Marroquinería',
    state: 'Jalisco',
    maker: 'Artesano Luis',
    images: [productImages.bolsa],
    inStock: true,
    materials: ['Cuero'],
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cross-4',
    name: 'Huipil Bordado',
    description: 'Huipil con bordado tradicional',
    price: 3500,
    currency: 'MXN',
    category: 'Textiles',
    state: 'Chiapas',
    maker: 'Bordadora Ana',
    images: [productImages.huipil],
    inStock: true,
    featured: true,
    verified: true,
    materials: ['Algodón', 'Hilo'],
    status: 'published',
    createdAt: new Date().toISOString(),
  },
];

// All products combined for the component
const allProducts: Product[] = [currentProduct, ...similarProducts, ...crossCategoryProducts];

/**
 * ProductRecommendations displays intelligent product suggestions.
 * Shows three sections: Similar Products, Cross-Category ("También te puede gustar"),
 * and Recently Viewed (requires client-side localStorage).
 */
const meta: Meta<typeof ProductRecommendations> = {
  title: 'Product/ProductRecommendations',
  component: ProductRecommendations,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Displays intelligent product recommendations in three sections: Similar Products (same category), "También te puede gustar" (cross-category based on shared attributes like maker, region, materials), and Recently Viewed (from localStorage). Uses a smart scoring algorithm for relevance.',
      },
    },
    backgrounds: {
      default: 'gray',
      values: [
        { name: 'gray', value: '#f3f4f6' },
        { name: 'dark', value: '#111827' },
      ],
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <StorybookWrapper>
        <div className="max-w-7xl mx-auto">
          <Story />
        </div>
      </StorybookWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default with all sections
export const Default: Story = {
  args: {
    currentProduct,
    allProducts,
    showRecentlyViewed: false, // Disabled in Storybook (requires localStorage)
    showCrossCategory: true,
  },
};

// Only similar products
export const SimilarOnly: Story = {
  args: {
    currentProduct,
    allProducts,
    showRecentlyViewed: false,
    showCrossCategory: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows only the Similar Products section, hiding cross-category and recently viewed.',
      },
    },
  },
};

// With cross-category recommendations
export const WithCrossCategory: Story = {
  args: {
    currentProduct,
    allProducts,
    showRecentlyViewed: false,
    showCrossCategory: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows Similar Products and "También te puede gustar" sections. Cross-category recommendations are based on shared attributes like region, maker, or materials.',
      },
    },
  },
};

// Empty state (no recommendations)
export const NoRecommendations: Story = {
  args: {
    currentProduct: {
      ...currentProduct,
      category: 'Unique Category',
      state: 'Unique State',
      maker: 'Unique Maker',
      materials: ['Unique Material'],
    },
    allProducts: [currentProduct], // Only the current product, no others to recommend
    showRecentlyViewed: false,
    showCrossCategory: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When there are no recommendations available, the component renders nothing (returns null).',
      },
    },
  },
};

// Dark mode
export const DarkMode: Story = {
  args: {
    currentProduct,
    allProducts,
    showRecentlyViewed: false,
    showCrossCategory: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <StorybookWrapper>
        <div className="dark max-w-7xl mx-auto bg-gray-900 p-4 rounded-lg">
          <Story />
        </div>
      </StorybookWrapper>
    ),
  ],
};

// Limited products (fewer than 4)
export const LimitedProducts: Story = {
  args: {
    currentProduct,
    allProducts: [currentProduct, similarProducts[0], similarProducts[1], crossCategoryProducts[0]],
    showRecentlyViewed: false,
    showCrossCategory: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When there are fewer products available, the component shows only what is available.',
      },
    },
  },
};

// Mobile view simulation
export const Mobile: Story = {
  args: {
    currentProduct,
    allProducts,
    showRecentlyViewed: false,
    showCrossCategory: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile-responsive view with 2-column grid for product cards.',
      },
    },
  },
  decorators: [
    (Story) => (
      <StorybookWrapper>
        <div className="max-w-sm mx-auto">
          <Story />
        </div>
      </StorybookWrapper>
    ),
  ],
};
