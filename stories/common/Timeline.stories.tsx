import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Package, Truck, CheckCircle, Clock, AlertCircle, MapPin } from 'lucide-react';
import Timeline from '@/components/common/Timeline';

/**
 * Timeline component for displaying chronological events or processes.
 * Supports default, alternate, and right-aligned layouts with status indicators.
 */
const meta: Meta<typeof Timeline> = {
  title: 'Data Display/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A timeline component for displaying events chronologically with support for multiple layouts, status indicators, custom icons, and additional content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'alternate', 'right'],
      description: 'Layout variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    showConnector: {
      control: 'boolean',
      description: 'Show connector lines',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const orderTrackingItems = [
  {
    id: '1',
    title: 'Pedido confirmado',
    description: 'Tu pedido ha sido recibido y confirmado.',
    timestamp: '15 Ene, 10:30',
    status: 'completed' as const,
  },
  {
    id: '2',
    title: 'En preparación',
    description: 'El artesano está preparando tu pedido.',
    timestamp: '15 Ene, 14:00',
    status: 'completed' as const,
  },
  {
    id: '3',
    title: 'Enviado',
    description: 'Tu pedido ha sido enviado.',
    timestamp: '16 Ene, 09:00',
    status: 'current' as const,
  },
  {
    id: '4',
    title: 'En camino',
    description: 'El paquete está en tránsito.',
    status: 'pending' as const,
  },
  {
    id: '5',
    title: 'Entregado',
    description: 'Entrega estimada: 18-20 Ene.',
    status: 'pending' as const,
  },
];

// Default
export const Default: Story = {
  args: {
    items: orderTrackingItems,
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

// Alternate layout
export const AlternateLayout: Story = {
  args: {
    items: orderTrackingItems,
    variant: 'alternate',
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

// Right layout
export const RightLayout: Story = {
  args: {
    items: orderTrackingItems,
    variant: 'right',
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

// Sizes
export const SizeSmall: Story = {
  args: {
    items: orderTrackingItems,
    size: 'sm',
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const SizeMedium: Story = {
  args: {
    items: orderTrackingItems,
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const SizeLarge: Story = {
  args: {
    items: orderTrackingItems,
    size: 'lg',
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

// With custom icons
export const WithCustomIcons: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Pedido confirmado',
        description: 'Tu pedido ha sido recibido.',
        timestamp: '15 Ene, 10:30',
        status: 'completed' as const,
        icon: CheckCircle,
      },
      {
        id: '2',
        title: 'En preparación',
        description: 'El artesano está trabajando en tu pedido.',
        timestamp: '15 Ene, 14:00',
        status: 'completed' as const,
        icon: Package,
      },
      {
        id: '3',
        title: 'Enviado',
        description: 'Tu pedido está en camino.',
        timestamp: '16 Ene, 09:00',
        status: 'current' as const,
        icon: Truck,
      },
      {
        id: '4',
        title: 'Entrega',
        description: 'Entrega estimada: 18-20 Ene.',
        status: 'pending' as const,
        icon: MapPin,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

// All statuses
export const AllStatuses: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Completado',
        description: 'Este paso ha sido completado exitosamente.',
        status: 'completed' as const,
      },
      {
        id: '2',
        title: 'En progreso',
        description: 'Este paso está actualmente en curso.',
        status: 'current' as const,
      },
      {
        id: '3',
        title: 'Pendiente',
        description: 'Este paso aún no ha comenzado.',
        status: 'pending' as const,
      },
      {
        id: '4',
        title: 'Error',
        description: 'Este paso encontró un problema.',
        status: 'error' as const,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

// Without connector
export const WithoutConnector: Story = {
  args: {
    items: orderTrackingItems.slice(0, 3),
    showConnector: false,
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

// With custom colors
export const WithCustomColors: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Paso 1',
        description: 'Primer paso completado.',
        color: '#8B5CF6', // Purple
      },
      {
        id: '2',
        title: 'Paso 2',
        description: 'Segundo paso completado.',
        color: '#EC4899', // Pink
      },
      {
        id: '3',
        title: 'Paso 3',
        description: 'Tercer paso en progreso.',
        color: '#F59E0B', // Amber
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

// With additional content
export const WithAdditionalContent: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Pedido recibido',
        description: 'Tu pedido ha sido confirmado.',
        timestamp: '15 Ene, 10:30',
        status: 'completed' as const,
        content: (
          <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm">
            <p className="text-gray-600">Pedido #ORD-2024-001</p>
            <p className="text-gray-600">Total: $2,500 MXN</p>
          </div>
        ),
      },
      {
        id: '2',
        title: 'Enviado',
        description: 'Tu pedido está en camino.',
        timestamp: '16 Ene, 09:00',
        status: 'current' as const,
        content: (
          <div className="mt-2 p-3 bg-primary-50 rounded-lg text-sm">
            <p className="text-primary-700 font-medium">Número de guía: 1Z999AA10123456784</p>
            <button className="text-primary-600 hover:text-primary-700 font-medium mt-1">
              Rastrear envío →
            </button>
          </div>
        ),
      },
      {
        id: '3',
        title: 'Entrega',
        description: 'Entrega estimada.',
        status: 'pending' as const,
        content: <div className="mt-2 text-sm text-gray-500">18-20 de Enero, 2024</div>,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

// Order history example
export const OrderHistoryExample: Story = {
  render: () => (
    <div className="max-w-md p-4 border rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-4">Historial del pedido</h3>
      <Timeline
        items={[
          {
            id: '1',
            title: 'Pedido confirmado',
            description: 'Pago recibido exitosamente.',
            timestamp: '15 Ene, 10:30',
            status: 'completed',
            icon: CheckCircle,
          },
          {
            id: '2',
            title: 'En preparación',
            description: 'El artesano María García está preparando tu pedido.',
            timestamp: '15 Ene, 14:00',
            status: 'completed',
            icon: Package,
          },
          {
            id: '3',
            title: 'Enviado',
            description: 'Enviado con Estafeta. Guía: 1Z999AA1.',
            timestamp: '16 Ene, 09:00',
            status: 'current',
            icon: Truck,
          },
          {
            id: '4',
            title: 'En tránsito',
            description: 'El paquete está en camino a tu dirección.',
            status: 'pending',
          },
          {
            id: '5',
            title: 'Entrega',
            description: 'Entrega estimada: 18-20 Ene.',
            status: 'pending',
            icon: MapPin,
          },
        ]}
        size="sm"
      />
    </div>
  ),
};

// Verification process example
export const VerificationProcessExample: Story = {
  render: () => (
    <div className="max-w-md p-4 border rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-4">Proceso de verificación</h3>
      <Timeline
        items={[
          {
            id: '1',
            title: 'Registro completado',
            description: 'Tu cuenta ha sido creada.',
            status: 'completed',
          },
          {
            id: '2',
            title: 'Email verificado',
            description: 'Confirmaste tu correo electrónico.',
            status: 'completed',
          },
          {
            id: '3',
            title: 'Identificación',
            description: 'Estamos revisando tu identificación.',
            status: 'current',
          },
          {
            id: '4',
            title: 'Fotos del taller',
            description: 'Sube fotos de tu espacio de trabajo.',
            status: 'pending',
          },
          {
            id: '5',
            title: 'Verificación completa',
            description: 'Obtendrás el badge de artesano verificado.',
            status: 'pending',
          },
        ]}
      />
    </div>
  ),
};

// Activity log example
export const ActivityLogExample: Story = {
  render: () => (
    <div className="max-w-lg p-4 border rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-4">Actividad reciente</h3>
      <Timeline
        items={[
          {
            id: '1',
            title: 'Producto publicado',
            description: 'Rebozo de Seda Oaxaqueño',
            timestamp: 'Hoy, 14:30',
            status: 'completed',
          },
          {
            id: '2',
            title: 'Nuevo pedido',
            description: 'Juan López compró Vasija de Barro Negro',
            timestamp: 'Hoy, 12:15',
            status: 'completed',
          },
          {
            id: '3',
            title: 'Reseña recibida',
            description: '⭐⭐⭐⭐⭐ "Excelente calidad"',
            timestamp: 'Ayer, 18:00',
            status: 'completed',
          },
          {
            id: '4',
            title: 'Producto actualizado',
            description: 'Se actualizó el precio del Collar de Plata',
            timestamp: 'Ayer, 10:30',
            status: 'completed',
          },
        ]}
        size="sm"
        variant="default"
      />
    </div>
  ),
};
