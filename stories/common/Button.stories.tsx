import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ShoppingCart, Heart, ArrowRight, Plus } from 'lucide-react';
import Button from '@/components/common/Button';

/**
 * Button component with multiple variants, sizes, and icon support.
 * Used throughout the application for primary actions, navigation, and form submissions.
 */
const meta: Meta<typeof Button> = {
  title: 'Buttons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component supporting multiple variants, sizes, icons, and accessibility features. Can render as a button or Next.js Link.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the icon',
    },
    children: {
      control: 'text',
      description: 'Button text content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Primary: Story = {
  args: {
    children: 'Agregar al carrito',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Ver detalles',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Cancelar',
    variant: 'ghost',
  },
};

export const Outline: Story = {
  args: {
    children: 'Ver más',
    variant: 'outline',
  },
};

// Sizes
export const Small: Story = {
  args: {
    children: 'Pequeño',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Mediano',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Grande',
    size: 'lg',
  },
};

// With icons
export const WithLeftIcon: Story = {
  args: {
    children: 'Agregar al carrito',
    icon: <ShoppingCart />,
    iconPosition: 'left',
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Continuar',
    icon: <ArrowRight />,
    iconPosition: 'right',
  },
};

export const IconOnly: Story = {
  args: {
    icon: <Heart />,
    ariaLabel: 'Agregar a favoritos',
    variant: 'outline',
  },
};

// States
export const Disabled: Story = {
  args: {
    children: 'No disponible',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Proceder al pago',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// As link
export const AsLink: Story = {
  args: {
    children: 'Ver todos los productos',
    href: '/productos',
    icon: <ArrowRight />,
    iconPosition: 'right',
  },
};

// Showcase all variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};

// Showcase all sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// Real-world examples
export const AddToCartButton: Story = {
  args: {
    children: 'Agregar al carrito',
    icon: <ShoppingCart />,
    variant: 'primary',
    size: 'lg',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const FavoriteButton: Story = {
  args: {
    icon: <Heart />,
    variant: 'ghost',
    ariaLabel: 'Agregar a favoritos',
  },
};

export const LoadMoreButton: Story = {
  args: {
    children: 'Cargar más productos',
    icon: <Plus />,
    variant: 'outline',
    size: 'md',
  },
};
