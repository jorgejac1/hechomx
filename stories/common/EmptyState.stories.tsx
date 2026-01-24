import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Package,
  ShoppingCart,
  Search,
  Heart,
  FileText,
  Users,
  Bell,
  Inbox,
  Plus,
  RefreshCw,
} from 'lucide-react';
import EmptyState from '@/components/common/EmptyState';

/**
 * EmptyState component for displaying placeholder content when no data is available.
 * Provides consistent empty state UI with customizable icons, titles, descriptions, and action buttons.
 */
const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component for displaying empty states with customizable icons, text, and action buttons. Supports multiple sizes and bordered styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    bordered: {
      control: 'boolean',
      description: 'Show dashed border',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    title: 'No hay productos',
    description: 'Aún no has agregado ningún producto a tu tienda.',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// With action
export const WithAction: Story = {
  args: {
    title: 'No hay productos',
    description: 'Comienza agregando tu primer producto artesanal.',
    action: {
      label: 'Agregar producto',
      onClick: () => alert('Agregar producto'),
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// With link action
export const WithLinkAction: Story = {
  args: {
    title: 'No hay productos',
    description: 'Explora nuestra selección de artesanías.',
    action: {
      label: 'Ver productos',
      href: '/productos',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// With two actions
export const WithTwoActions: Story = {
  args: {
    title: 'No hay resultados',
    description: 'No encontramos productos que coincidan con tu búsqueda.',
    action: {
      label: 'Limpiar filtros',
      onClick: () => alert('Limpiar filtros'),
    },
    secondaryAction: {
      label: 'Ver todos los productos',
      href: '/productos',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// With custom icon
export const WithCustomIcon: Story = {
  args: {
    title: 'Carrito vacío',
    description: 'Agrega productos artesanales a tu carrito.',
    icon: <ShoppingCart className="w-8 h-8 text-gray-400" />,
    action: {
      label: 'Explorar productos',
      href: '/productos',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// Sizes
export const SizeSmall: Story = {
  args: {
    title: 'Sin resultados',
    description: 'Intenta con otros términos de búsqueda.',
    size: 'sm',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const SizeMedium: Story = {
  args: {
    title: 'Sin resultados',
    description: 'Intenta con otros términos de búsqueda.',
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const SizeLarge: Story = {
  args: {
    title: 'Sin resultados',
    description: 'Intenta con otros términos de búsqueda.',
    size: 'lg',
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

// Bordered
export const Bordered: Story = {
  args: {
    title: 'Arrastra archivos aquí',
    description: 'O haz clic para seleccionar archivos de tu dispositivo.',
    bordered: true,
    action: {
      label: 'Seleccionar archivos',
      onClick: () => alert('Seleccionar'),
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// With icon in action
export const ActionWithIcon: Story = {
  args: {
    title: 'No hay productos',
    description: 'Comienza agregando tu primer producto.',
    action: {
      label: 'Agregar producto',
      icon: <Plus className="w-4 h-4" />,
      onClick: () => alert('Agregar'),
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// Empty cart
export const EmptyCart: Story = {
  render: () => (
    <div className="w-96">
      <EmptyState
        title="Tu carrito está vacío"
        description="Explora nuestra colección de artesanías mexicanas y encuentra piezas únicas."
        icon={<ShoppingCart className="w-8 h-8 text-gray-400" />}
        action={{
          label: 'Explorar productos',
          href: '/productos',
        }}
      />
    </div>
  ),
};

// No search results
export const NoSearchResults: Story = {
  render: () => (
    <div className="w-96">
      <EmptyState
        title="No se encontraron resultados"
        description='No hay productos que coincidan con "rebozo azul". Intenta con otros términos.'
        icon={<Search className="w-8 h-8 text-gray-400" />}
        action={{
          label: 'Limpiar búsqueda',
          onClick: () => {},
        }}
        secondaryAction={{
          label: 'Ver todos los productos',
          href: '/productos',
        }}
      />
    </div>
  ),
};

// Empty favorites
export const EmptyFavorites: Story = {
  render: () => (
    <div className="w-96">
      <EmptyState
        title="Sin favoritos"
        description="Guarda tus productos favoritos para encontrarlos fácilmente después."
        icon={<Heart className="w-8 h-8 text-gray-400" />}
        action={{
          label: 'Descubrir productos',
          href: '/productos',
        }}
      />
    </div>
  ),
};

// Empty orders
export const EmptyOrders: Story = {
  render: () => (
    <div className="w-96">
      <EmptyState
        title="Sin pedidos"
        description="Aún no has realizado ningún pedido. Cuando compres algo, aparecerá aquí."
        icon={<Package className="w-8 h-8 text-gray-400" />}
        action={{
          label: 'Ir a comprar',
          href: '/productos',
        }}
      />
    </div>
  ),
};

// Empty notifications
export const EmptyNotifications: Story = {
  render: () => (
    <div className="w-80">
      <EmptyState
        title="Sin notificaciones"
        description="No tienes notificaciones nuevas."
        icon={<Bell className="w-8 h-8 text-gray-400" />}
        size="sm"
      />
    </div>
  ),
};

// Empty inbox
export const EmptyInbox: Story = {
  render: () => (
    <div className="w-96">
      <EmptyState
        title="Bandeja vacía"
        description="No tienes mensajes. Los mensajes de compradores y artesanos aparecerán aquí."
        icon={<Inbox className="w-8 h-8 text-gray-400" />}
      />
    </div>
  ),
};

// No customers yet
export const NoCustomers: Story = {
  render: () => (
    <div className="w-96">
      <EmptyState
        title="Sin clientes aún"
        description="Cuando realices tu primera venta, tus clientes aparecerán aquí."
        icon={<Users className="w-8 h-8 text-gray-400" />}
        action={{
          label: 'Promocionar tienda',
          onClick: () => {},
        }}
      />
    </div>
  ),
};

// File upload area
export const FileUploadArea: Story = {
  render: () => (
    <div className="w-96">
      <EmptyState
        title="Arrastra imágenes aquí"
        description="Sube fotos de tu producto. Formatos: JPG, PNG. Máximo 5MB por imagen."
        icon={<FileText className="w-8 h-8 text-gray-400" />}
        bordered
        action={{
          label: 'Seleccionar archivos',
          onClick: () => {},
        }}
      />
    </div>
  ),
};

// Error state
export const ErrorState: Story = {
  render: () => (
    <div className="w-96">
      <EmptyState
        title="Error al cargar"
        description="No pudimos cargar los productos. Por favor intenta de nuevo."
        icon={<RefreshCw className="w-8 h-8 text-red-400" />}
        action={{
          label: 'Reintentar',
          onClick: () => {},
          icon: <RefreshCw className="w-4 h-4" />,
        }}
      />
    </div>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-2">Small</p>
        <div className="w-72 border rounded-lg">
          <EmptyState title="Sin resultados" description="Intenta con otra búsqueda." size="sm" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-2">Medium</p>
        <div className="w-96 border rounded-lg">
          <EmptyState title="Sin resultados" description="Intenta con otra búsqueda." size="md" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-2">Large</p>
        <div className="w-[500px] border rounded-lg">
          <EmptyState title="Sin resultados" description="Intenta con otra búsqueda." size="lg" />
        </div>
      </div>
    </div>
  ),
};

// With children
export const WithChildren: Story = {
  render: () => (
    <div className="w-96">
      <EmptyState
        title="Conecta tu tienda"
        description="Integra tu tienda con redes sociales para aumentar tus ventas."
      >
        <div className="flex gap-3 justify-center">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            Facebook
          </button>
          <button className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700">
            Instagram
          </button>
        </div>
      </EmptyState>
    </div>
  ),
};
