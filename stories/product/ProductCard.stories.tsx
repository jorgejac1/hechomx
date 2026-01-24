import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProductCard from '@/components/product/ProductCard';
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
  barroNegro: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800', // pottery
  alebrije: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', // colorful art
  textiles: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800', // fabric
  mascara: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800', // mask
  canasta: 'https://images.unsplash.com/photo-1595412890248-13b93f1f07d4?w=800', // basket
  joyeria: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800', // jewelry
  bolsa: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800', // leather bag
  huipil: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800', // embroidered
  cocina: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800', // kitchen
  arte: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800', // art
  decoracion: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800', // home decor
  accesorios: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800', // accessories
};

// Mock product data for stories
const mockProduct: Product = {
  id: '1',
  name: 'Tajín de Barro Negro',
  description:
    'Tajín artesanal de barro negro de Oaxaca, perfecto para cocinar moles y guisos tradicionales.',
  price: 850,
  currency: 'MXN',
  category: 'Cocina',
  subcategory: 'platos',
  state: 'Oaxaca',
  maker: 'Artesanías de México',
  images: [productImages.barroNegro],
  inStock: true,
  featured: true,
  verified: true,
  rating: 4.8,
  reviewCount: 127,
  status: 'published',
  createdAt: new Date().toISOString(),
};

const mockProductFeatured: Product = {
  ...mockProduct,
  id: '2',
  name: 'Alebrije de Madera Tallada',
  price: 2500,
  category: 'Arte',
  state: 'Oaxaca',
  maker: 'Alebrijes Don Pedro',
  images: [productImages.alebrije],
  featured: true,
  verified: true,
  rating: 5.0,
  reviewCount: 89,
};

const mockProductOutOfStock: Product = {
  ...mockProduct,
  id: '3',
  name: 'Rebozo de Seda Oaxaqueño',
  price: 3200,
  category: 'Textiles',
  state: 'Oaxaca',
  maker: 'Tejidos Tradicionales',
  images: [productImages.textiles],
  inStock: false,
  featured: false,
  verified: false,
};

const mockProductNew: Product = {
  ...mockProduct,
  id: '4',
  name: 'Máscara Ceremonial de Madera',
  price: 1800,
  category: 'Arte',
  state: 'Guerrero',
  maker: 'Artesanos de Guerrero',
  images: [productImages.mascara],
  featured: false,
  verified: true,
  createdAt: new Date().toISOString(), // Today = New
};

const mockProductSimple: Product = {
  ...mockProduct,
  id: '5',
  name: 'Canasta de Palma Tejida',
  price: 450,
  category: 'Decoración del Hogar',
  state: 'Chiapas',
  maker: 'Artesanas de Chiapas',
  images: [productImages.canasta],
  featured: false,
  verified: false,
  rating: 4.2,
  reviewCount: 34,
};

/**
 * ProductCard component for displaying products in grid layouts.
 * Features image, badges, rating, price, comparison toggle, and artisan story links.
 */
const meta: Meta<typeof ProductCard> = {
  title: 'Product/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A feature-rich product card with image, badges (new, featured, verified), star rating, price display, comparison toggle, and links to artisan stories. Memoized for performance in large product grids.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      // Grid stories handle their own wrapper and layout
      if (context.name.includes('Grid') || context.name.includes('Variations')) {
        return <Story />;
      }
      // Single card stories get the w-72 wrapper
      return (
        <StorybookWrapper>
          <div className="w-72">
            <Story />
          </div>
        </StorybookWrapper>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic card
export const Default: Story = {
  args: {
    product: mockProduct,
  },
};

// Featured and verified
export const FeaturedVerified: Story = {
  args: {
    product: mockProductFeatured,
  },
};

// Out of stock
export const OutOfStock: Story = {
  args: {
    product: mockProductOutOfStock,
  },
};

// New product (added within 7 days)
export const NewProduct: Story = {
  args: {
    product: mockProductNew,
  },
};

// Simple product (no badges)
export const Simple: Story = {
  args: {
    product: mockProductSimple,
  },
};

// All badges (New + Featured + Verified)
export const AllBadges: Story = {
  args: {
    product: {
      ...mockProduct,
      featured: true,
      verified: true,
      createdAt: new Date().toISOString(),
    },
  },
};

// High rating
export const HighRating: Story = {
  args: {
    product: {
      ...mockProduct,
      rating: 5.0,
      reviewCount: 500,
    },
  },
};

// Low stock indicator (via stock count)
export const WithStock: Story = {
  args: {
    product: {
      ...mockProduct,
      stock: 3,
    },
  },
};

// Grid showcase
export const ProductGrid: Story = {
  parameters: {
    layout: 'padded',
  },
  decorators: [], // Override default decorator
  render: () => (
    <StorybookWrapper>
      <div className="w-[1200px] max-w-full">
        <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50">
          <ProductCard product={mockProduct} />
          <ProductCard product={mockProductFeatured} />
          <ProductCard product={mockProductOutOfStock} />
          <ProductCard product={mockProductNew} />
          <ProductCard product={mockProductSimple} />
          <ProductCard
            product={{
              ...mockProduct,
              id: '6',
              name: 'Collar de Plata Oaxaqueña',
              category: 'Joyería',
              price: 1200,
              images: [productImages.joyeria],
            }}
          />
          <ProductCard
            product={{
              ...mockProduct,
              id: '7',
              name: 'Bolsa de Cuero Artesanal',
              category: 'Accesorios',
              price: 2800,
              images: [productImages.bolsa],
            }}
          />
          <ProductCard
            product={{
              ...mockProduct,
              id: '8',
              name: 'Huipil Bordado a Mano',
              category: 'Textiles',
              price: 4500,
              featured: true,
              images: [productImages.huipil],
            }}
          />
        </div>
      </div>
    </StorybookWrapper>
  ),
};

// Different categories
export const CategoryVariations: Story = {
  parameters: {
    layout: 'padded',
  },
  decorators: [], // Override default decorator
  render: () => (
    <StorybookWrapper>
      <div className="w-[900px] max-w-full">
        <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50">
          <ProductCard
            product={{
              ...mockProduct,
              category: 'Cocina',
              name: 'Olla de Barro',
              images: [productImages.cocina],
            }}
          />
          <ProductCard
            product={{
              ...mockProduct,
              id: '2',
              category: 'Arte',
              name: 'Alebrije Pintado',
              images: [productImages.arte],
            }}
          />
          <ProductCard
            product={{
              ...mockProduct,
              id: '3',
              category: 'Textiles',
              name: 'Rebozo de Seda',
              images: [productImages.textiles],
            }}
          />
          <ProductCard
            product={{
              ...mockProduct,
              id: '4',
              category: 'Joyería',
              name: 'Collar de Plata',
              images: [productImages.joyeria],
            }}
          />
          <ProductCard
            product={{
              ...mockProduct,
              id: '5',
              category: 'Decoración del Hogar',
              name: 'Florero Artesanal',
              images: [productImages.decoracion],
            }}
          />
          <ProductCard
            product={{
              ...mockProduct,
              id: '6',
              category: 'Accesorios',
              name: 'Bolsa de Cuero',
              images: [productImages.accesorios],
            }}
          />
        </div>
      </div>
    </StorybookWrapper>
  ),
};

// Price variations
export const PriceVariations: Story = {
  parameters: {
    layout: 'padded',
  },
  decorators: [], // Override default decorator
  render: () => (
    <StorybookWrapper>
      <div className="w-[900px] max-w-full">
        <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50">
          <ProductCard
            product={{
              ...mockProduct,
              price: 150,
              name: 'Producto económico',
              images: [productImages.canasta],
            }}
          />
          <ProductCard
            product={{
              ...mockProduct,
              id: '2',
              price: 850,
              name: 'Producto medio',
              images: [productImages.barroNegro],
            }}
          />
          <ProductCard
            product={{
              ...mockProduct,
              id: '3',
              price: 5500,
              name: 'Producto premium',
              images: [productImages.joyeria],
            }}
          />
        </div>
      </div>
    </StorybookWrapper>
  ),
};

// Different states
export const StateVariations: Story = {
  parameters: {
    layout: 'padded',
  },
  decorators: [], // Override default decorator
  render: () => (
    <StorybookWrapper>
      <div className="w-[900px] max-w-full">
        <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50">
          <ProductCard
            product={{
              ...mockProduct,
              state: 'Oaxaca',
              name: 'Barro Negro Oaxaqueño',
              images: [productImages.barroNegro],
            }}
          />
          <ProductCard
            product={{
              ...mockProduct,
              id: '2',
              state: 'Chiapas',
              name: 'Textil de Chiapas',
              images: [productImages.textiles],
            }}
          />
          <ProductCard
            product={{
              ...mockProduct,
              id: '3',
              state: 'Puebla',
              name: 'Talavera Poblana',
              images: [productImages.cocina],
            }}
          />
          <ProductCard
            product={{
              ...mockProduct,
              id: '4',
              state: 'Michoacán',
              name: 'Lacas de Michoacán',
              images: [productImages.decoracion],
            }}
          />
          <ProductCard
            product={{
              ...mockProduct,
              id: '5',
              state: 'Guerrero',
              name: 'Máscara de Guerrero',
              images: [productImages.mascara],
            }}
          />
          <ProductCard
            product={{
              ...mockProduct,
              id: '6',
              state: 'Jalisco',
              name: 'Huichol de Jalisco',
              images: [productImages.arte],
            }}
          />
        </div>
      </div>
    </StorybookWrapper>
  ),
};
