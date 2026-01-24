import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Check, Star, Clock, AlertTriangle, Tag, X } from 'lucide-react';
import Badge from '@/components/common/Badge';

/**
 * Badge component for displaying status indicators, labels, and tags.
 * Supports multiple variants, sizes, icons, and interactive features.
 */
const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile badge component for status indicators, tags, and labels. Supports icons, remove buttons, and click interactions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info', 'neutral', 'category'],
      description: 'Color variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    rounded: {
      control: 'select',
      options: ['default', 'full', 'none'],
      description: 'Border radius style',
    },
    removable: {
      control: 'boolean',
      description: 'Show remove button',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Icon position',
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Variants
export const Primary: Story = {
  args: {
    children: 'Destacado',
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    children: 'Verificado',
    variant: 'success',
    icon: <Check />,
  },
};

export const Warning: Story = {
  args: {
    children: 'Pocas unidades',
    variant: 'warning',
    icon: <AlertTriangle />,
  },
};

export const Danger: Story = {
  args: {
    children: 'Agotado',
    variant: 'danger',
  },
};

export const Info: Story = {
  args: {
    children: 'Nuevo',
    variant: 'info',
  },
};

export const Neutral: Story = {
  args: {
    children: 'Categoría',
    variant: 'neutral',
  },
};

export const Category: Story = {
  args: {
    children: 'Textiles',
    variant: 'category',
    icon: <Tag />,
  },
};

// Sizes
export const Small: Story = {
  args: {
    children: 'Pequeño',
    size: 'sm',
    variant: 'info',
  },
};

export const Medium: Story = {
  args: {
    children: 'Mediano',
    size: 'md',
    variant: 'info',
  },
};

export const Large: Story = {
  args: {
    children: 'Grande',
    size: 'lg',
    variant: 'info',
  },
};

// With icons
export const WithLeftIcon: Story = {
  args: {
    children: 'Artesano verificado',
    variant: 'success',
    icon: <Check />,
    iconPosition: 'left',
  },
};

export const WithRightIcon: Story = {
  args: {
    children: '4.8',
    variant: 'warning',
    icon: <Star fill="currentColor" />,
    iconPosition: 'right',
  },
};

// Rounded options
export const RoundedDefault: Story = {
  args: {
    children: 'Bordes suaves',
    rounded: 'default',
    variant: 'info',
  },
};

export const RoundedFull: Story = {
  args: {
    children: 'Píldora',
    rounded: 'full',
    variant: 'info',
  },
};

export const RoundedNone: Story = {
  args: {
    children: 'Sin bordes',
    rounded: 'none',
    variant: 'info',
  },
};

// Interactive
export const Clickable: Story = {
  args: {
    children: 'Haz clic aquí',
    variant: 'primary',
    onClick: () => alert('¡Clic!'),
  },
};

export const Removable: Story = {
  args: {
    children: 'Filtro activo',
    variant: 'info',
    removable: true,
    onRemove: () => alert('Eliminado'),
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="category">Category</Badge>
    </div>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm" variant="info">
        Small
      </Badge>
      <Badge size="md" variant="info">
        Medium
      </Badge>
      <Badge size="lg" variant="info">
        Large
      </Badge>
    </div>
  ),
};

// Real-world examples
export const VerificationBadge: Story = {
  args: {
    children: 'Artesano Maestro',
    variant: 'success',
    icon: <Check />,
    size: 'md',
  },
};

export const StockStatus: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Badge variant="success" icon={<Check />}>
        En stock
      </Badge>
      <Badge variant="warning" icon={<Clock />}>
        Últimas 3 unidades
      </Badge>
      <Badge variant="danger" icon={<X />}>
        Agotado
      </Badge>
    </div>
  ),
};

export const ProductTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="category" icon={<Tag />} size="sm">
        Textiles
      </Badge>
      <Badge variant="category" icon={<Tag />} size="sm">
        Oaxaca
      </Badge>
      <Badge variant="category" icon={<Tag />} size="sm">
        Hecho a mano
      </Badge>
    </div>
  ),
};

export const FilterTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="info" removable onRemove={() => {}}>
        Precio: $100-500
      </Badge>
      <Badge variant="info" removable onRemove={() => {}}>
        Categoría: Textiles
      </Badge>
      <Badge variant="info" removable onRemove={() => {}}>
        Envío gratis
      </Badge>
    </div>
  ),
};

export const RatingBadge: Story = {
  args: {
    children: '4.9',
    variant: 'warning',
    icon: <Star fill="currentColor" />,
    size: 'sm',
  },
};
