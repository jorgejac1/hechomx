import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import SearchModal from '@/components/ui/SearchModal';
import { Product } from '@/types/product';
import { ToastProvider } from '@/contexts/ToastContext';
import { ComparisonProvider } from '@/contexts/ComparisonContext';

// Wrapper component that provides required contexts
const StorybookWrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>
    <ComparisonProvider>{children}</ComparisonProvider>
  </ToastProvider>
);

// Different image URLs for variety
const productImages = {
  barroNegro: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
  alebrije: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
  textiles: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800',
  mascara: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800',
  canasta: 'https://images.unsplash.com/photo-1595412890248-13b93f1f07d4?w=800',
  joyeria: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
  bolsa: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
  huipil: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
};

// Sample products for search
const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Alebrije Colorido',
    description: 'Artesanía tradicional de Oaxaca hecha con madera de copal',
    price: 1500,
    currency: 'MXN',
    category: 'Artesanías',
    state: 'Oaxaca',
    maker: 'Artesano Pedro',
    images: [productImages.alebrije],
    inStock: true,
    materials: ['Madera', 'Pintura'],
    tags: ['tradicional', 'colorido'],
    featured: true,
    verified: true,
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-2',
    name: 'Reboso de Seda',
    description: 'Reboso tradicional tejido a mano',
    price: 2500,
    currency: 'MXN',
    category: 'Textiles',
    state: 'Chiapas',
    maker: 'Tejedora María',
    images: [productImages.textiles],
    inStock: true,
    materials: ['Seda'],
    tags: ['tejido', 'elegante'],
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-3',
    name: 'Barro Negro de Oaxaca',
    description: 'Cerámica artesanal de barro negro',
    price: 800,
    currency: 'MXN',
    category: 'Cerámica',
    state: 'Oaxaca',
    maker: 'Ceramista Rosa',
    images: [productImages.barroNegro],
    inStock: true,
    materials: ['Barro'],
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-4',
    name: 'Huipil Bordado',
    description: 'Huipil con bordado tradicional zapoteco',
    price: 3500,
    currency: 'MXN',
    category: 'Textiles',
    state: 'Oaxaca',
    maker: 'Bordadora Ana',
    images: [productImages.huipil],
    inStock: true,
    materials: ['Algodón', 'Hilo'],
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-5',
    name: 'Collar de Plata Oaxaqueña',
    description: 'Joyería artesanal de plata',
    price: 1200,
    currency: 'MXN',
    category: 'Joyería',
    state: 'Oaxaca',
    maker: 'Platero José',
    images: [productImages.joyeria],
    inStock: true,
    materials: ['Plata'],
    featured: true,
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-6',
    name: 'Bolsa de Cuero Artesanal',
    description: 'Bolsa hecha a mano con cuero de alta calidad',
    price: 2800,
    currency: 'MXN',
    category: 'Cuero y Piel',
    state: 'Jalisco',
    maker: 'Artesano Luis',
    images: [productImages.bolsa],
    inStock: true,
    materials: ['Cuero'],
    verified: true,
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-7',
    name: 'Canasta de Palma Tejida',
    description: 'Canasta tradicional tejida con palma',
    price: 450,
    currency: 'MXN',
    category: 'Decoración del Hogar',
    state: 'Chiapas',
    maker: 'Artesanas de Chiapas',
    images: [productImages.canasta],
    inStock: true,
    materials: ['Palma'],
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-8',
    name: 'Máscara Ceremonial',
    description: 'Máscara tradicional de madera tallada',
    price: 1800,
    currency: 'MXN',
    category: 'Arte',
    state: 'Guerrero',
    maker: 'Artesano Miguel',
    images: [productImages.mascara],
    inStock: true,
    materials: ['Madera'],
    status: 'published',
    createdAt: new Date().toISOString(),
  },
];

// Sample categories
const categories = [
  'Cocina',
  'Arte',
  'Decoración del Hogar',
  'Ropa',
  'Joyería',
  'Cuero y Piel',
  'Textiles',
  'Artesanías',
  'Cerámica',
];

// Interactive wrapper for controlling modal state
function SearchModalWrapper({
  products,
  categories,
  initialOpen = true,
}: {
  products: Product[];
  categories: string[];
  initialOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <div className="min-h-[600px] bg-gray-100 dark:bg-gray-900">
      <div className="p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          Abrir búsqueda
        </button>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
          Click the button above or press Cmd/Ctrl + K to open search
        </p>
      </div>
      <SearchModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        products={products}
        categories={categories}
      />
    </div>
  );
}

/**
 * SearchModal provides global search functionality with:
 * - Debounced search (300ms delay)
 * - Fuzzy matching for typo tolerance
 * - Search history persistence
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Category suggestions
 */
const meta: Meta<typeof SearchModal> = {
  title: 'UI/SearchModal',
  component: SearchModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Enhanced global search modal with intelligent autocomplete. Features debounced search (300ms), fuzzy matching for typo tolerance, search history persistence in localStorage, keyboard navigation support (Arrow keys, Enter, Escape), and category/product suggestions.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <StorybookWrapper>
        <Story />
      </StorybookWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default open state
export const Default: Story = {
  render: () => <SearchModalWrapper products={mockProducts} categories={categories} />,
  parameters: {
    docs: {
      description: {
        story:
          'Default search modal showing categories when empty. Type to search products with fuzzy matching.',
      },
    },
  },
};

// Closed state with button to open
export const Closed: Story = {
  render: () => (
    <SearchModalWrapper products={mockProducts} categories={categories} initialOpen={false} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Search modal in closed state. Click the button to open.',
      },
    },
  },
};

// Few categories
export const FewCategories: Story = {
  render: () => (
    <SearchModalWrapper
      products={mockProducts}
      categories={['Artesanías', 'Textiles', 'Joyería']}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Search modal with limited category options.',
      },
    },
  },
};

// Many products
export const ManyProducts: Story = {
  render: () => {
    // Generate more products
    const moreProducts = [...mockProducts];
    for (let i = 0; i < 20; i++) {
      moreProducts.push({
        ...mockProducts[i % mockProducts.length],
        id: `extra-${i}`,
        name: `Producto Artesanal ${i + 1}`,
      });
    }
    return <SearchModalWrapper products={moreProducts} categories={categories} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Search modal with many products to demonstrate scrolling and limiting results.',
      },
    },
  },
};

// Empty products
export const NoProducts: Story = {
  render: () => <SearchModalWrapper products={[]} categories={categories} />,
  parameters: {
    docs: {
      description: {
        story: 'Search modal with no products. Shows empty state when searching.',
      },
    },
  },
};

// Dark mode
export const DarkMode: Story = {
  render: () => (
    <div className="dark">
      <SearchModalWrapper products={mockProducts} categories={categories} />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Search modal in dark mode with proper contrast and colors.',
      },
    },
  },
};

// Mobile view
export const Mobile: Story = {
  render: () => <SearchModalWrapper products={mockProducts} categories={categories} />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile-responsive search modal with adapted layout.',
      },
    },
  },
};

// Tablet view
export const Tablet: Story = {
  render: () => <SearchModalWrapper products={mockProducts} categories={categories} />,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet-responsive search modal.',
      },
    },
  },
};
