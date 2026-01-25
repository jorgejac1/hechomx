import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Pencil } from 'lucide-react';
import QuickEditModal from '@/components/dashboard/QuickEditModal';
import Button from '@/components/common/Button';
import type { SellerProduct } from '@/lib/types';

/**
 * QuickEditModal allows sellers to quickly edit product name, price, and stock
 * without leaving the dashboard. Features form validation, loading states, and dark mode support.
 */
const meta: Meta<typeof QuickEditModal> = {
  title: 'Dashboard/QuickEditModal',
  component: QuickEditModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An inline modal for quick product editing from the seller dashboard. Allows editing name, price, and stock with validation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is visible',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockProduct: SellerProduct = {
  id: 'prod-1',
  name: 'Cojín Tejido Geométrico',
  image: '/images/products/cushion.jpg',
  price: 450,
  stock: 12,
  sold: 5,
  views: 89,
  favorites: 15,
  status: 'active',
};

const lowStockProduct: SellerProduct = {
  id: 'prod-2',
  name: 'Alebrije Dragón Multicolor',
  image: '/images/products/alebrije.jpg',
  price: 2500,
  stock: 2,
  sold: 28,
  views: 456,
  favorites: 89,
  status: 'active',
};

const outOfStockProduct: SellerProduct = {
  id: 'prod-3',
  name: 'Rebozo de Seda Oaxaqueño',
  image: '/images/products/rebozo.jpg',
  price: 3500,
  stock: 0,
  sold: 15,
  views: 234,
  favorites: 45,
  status: 'out_of_stock',
};

// Interactive wrapper component
const QuickEditDemo = ({ product }: { product: SellerProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(product);

  const handleSave = async (
    productId: string,
    data: { name: string; price: number; stock: number }
  ) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentProduct((prev) => ({
      ...prev,
      name: data.name,
      price: data.price,
      stock: data.stock,
    }));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-80">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
              {currentProduct.name}
            </h4>
            <p className="text-primary-600 font-bold">
              ${currentProduct.price.toLocaleString('es-MX')}
            </p>
            <p className="text-sm text-gray-500">Stock: {currentProduct.stock}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={<Pencil className="w-4 h-4" />}
          onClick={() => setIsOpen(true)}
          fullWidth
        >
          Edición Rápida
        </Button>
      </div>

      <QuickEditModal
        product={currentProduct}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

// Default story
export const Default: Story = {
  render: () => <QuickEditDemo product={mockProduct} />,
};

// Low stock product
export const LowStock: Story = {
  render: () => <QuickEditDemo product={lowStockProduct} />,
  parameters: {
    docs: {
      description: {
        story: 'Product with low stock (2 units). Seller may want to update stock quantity.',
      },
    },
  },
};

// Out of stock product
export const OutOfStock: Story = {
  render: () => <QuickEditDemo product={outOfStockProduct} />,
  parameters: {
    docs: {
      description: {
        story: 'Product with zero stock. Seller can add new inventory.',
      },
    },
  },
};

// Open by default (for documentation)
export const OpenState: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <QuickEditModal
        product={mockProduct}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal in open state showing the edit form.',
      },
    },
  },
};

// With validation error simulation
export const ValidationExample: Story = {
  render: () => (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Try these validation scenarios:
      </p>
      <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1 mb-4">
        <li>Empty product name → &quot;El nombre es requerido&quot;</li>
        <li>Price of 0 or negative → &quot;Ingresa un precio válido mayor a 0&quot;</li>
        <li>Empty stock field → &quot;El stock debe ser 0 o mayor&quot;</li>
      </ul>
      <QuickEditDemo product={mockProduct} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form validation examples with Spanish error messages.',
      },
    },
  },
};
