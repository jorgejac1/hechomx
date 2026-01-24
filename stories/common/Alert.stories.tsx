import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Package, CreditCard, Truck, ShoppingBag } from 'lucide-react';
import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';

/**
 * Alert component for displaying informational, success, warning, and error messages.
 * Supports multiple layout styles, custom icons, and dismissible option.
 */
const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An accessible alert component for displaying status messages, notifications, and important information. Supports multiple variants and layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Alert color variant',
    },
    layout: {
      control: 'select',
      options: ['default', 'bordered', 'sidebar'],
      description: 'Layout style',
    },
    title: {
      control: 'text',
      description: 'Alert title',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show dismiss button',
    },
    hideIcon: {
      control: 'boolean',
      description: 'Hide the icon',
    },
    children: {
      control: 'text',
      description: 'Alert content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Tu pedido está siendo procesado. Recibirás un correo de confirmación.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: '¡Pedido realizado con éxito! Tu número de orden es #12345.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Solo quedan 3 unidades de este producto. ¡No te lo pierdas!',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Hubo un error al procesar tu pago. Por favor, intenta de nuevo.',
  },
};

// With title
export const WithTitle: Story = {
  args: {
    variant: 'info',
    title: 'Información importante',
    children:
      'Los tiempos de envío pueden variar durante temporada alta. Consulta la estimación al momento de comprar.',
  },
};

export const SuccessWithTitle: Story = {
  args: {
    variant: 'success',
    title: '¡Producto agregado!',
    children: 'El producto ha sido agregado a tu carrito de compras.',
  },
};

export const WarningWithTitle: Story = {
  args: {
    variant: 'warning',
    title: 'Verificación pendiente',
    children:
      'Tu cuenta de vendedor está en proceso de verificación. Podrás publicar productos una vez aprobada.',
  },
};

export const ErrorWithTitle: Story = {
  args: {
    variant: 'error',
    title: 'Error de conexión',
    children: 'No pudimos conectar con el servidor. Verifica tu conexión a internet.',
  },
};

// Layouts
export const DefaultLayout: Story = {
  args: {
    variant: 'info',
    layout: 'default',
    title: 'Layout por defecto',
    children: 'Este es el estilo de alerta predeterminado con bordes redondeados.',
  },
};

export const BorderedLayout: Story = {
  args: {
    variant: 'success',
    layout: 'bordered',
    title: 'Layout bordeado',
    children: 'Este estilo tiene bordes más pronunciados y mayor énfasis visual.',
  },
};

export const SidebarLayout: Story = {
  args: {
    variant: 'warning',
    layout: 'sidebar',
    title: 'Layout con barra lateral',
    children: 'Este estilo tiene un acento en el borde izquierdo para mayor visibilidad.',
  },
};

// Dismissible
export const Dismissible: Story = {
  args: {
    variant: 'info',
    dismissible: true,
    children: 'Esta alerta puede ser cerrada haciendo clic en la X.',
    onDismiss: () => alert('Alerta cerrada'),
  },
};

export const DismissibleWithTitle: Story = {
  args: {
    variant: 'success',
    title: 'Notificación',
    dismissible: true,
    children: 'Tu perfil ha sido actualizado correctamente.',
    onDismiss: () => alert('Alerta cerrada'),
  },
};

// Custom icon
export const CustomIcon: Story = {
  args: {
    variant: 'info',
    icon: Package,
    title: 'Seguimiento de envío',
    children: 'Tu paquete está en camino. Llegará entre el 25 y 27 de enero.',
  },
};

// Without icon
export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    hideIcon: true,
    children: 'Esta alerta no muestra ícono para un diseño más limpio.',
  },
};

// With actions
export const WithActions: Story = {
  args: {
    variant: 'warning',
    title: 'Sesión por expirar',
    children: 'Tu sesión expirará en 5 minutos. ¿Deseas continuar?',
    actions: (
      <>
        <Button size="sm" variant="ghost">
          Cerrar sesión
        </Button>
        <Button size="sm">Continuar</Button>
      </>
    ),
  },
};

export const ErrorWithActions: Story = {
  args: {
    variant: 'error',
    title: 'Error de pago',
    children: 'No pudimos procesar tu tarjeta de crédito.',
    actions: (
      <>
        <Button size="sm" variant="outline">
          Usar otro método
        </Button>
        <Button size="sm">Reintentar</Button>
      </>
    ),
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info">Este es un mensaje informativo para el usuario.</Alert>
      <Alert variant="success">Operación completada exitosamente.</Alert>
      <Alert variant="warning">Advertencia: revisa la información antes de continuar.</Alert>
      <Alert variant="error">Error: algo salió mal, intenta de nuevo.</Alert>
    </div>
  ),
};

// All layouts showcase
export const AllLayouts: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" layout="default" title="Layout por defecto">
        Estilo predeterminado con bordes suaves.
      </Alert>
      <Alert variant="info" layout="bordered" title="Layout bordeado">
        Estilo con bordes más pronunciados.
      </Alert>
      <Alert variant="info" layout="sidebar" title="Layout sidebar">
        Estilo con acento en el borde izquierdo.
      </Alert>
    </div>
  ),
};

// Real-world examples
export const ShippingNotification: Story = {
  args: {
    variant: 'info',
    icon: Truck,
    title: 'Envío en proceso',
    children:
      'Tu pedido ha sido enviado y llegará entre 3-5 días hábiles. Número de guía: ABC123456789',
    dismissible: true,
  },
};

export const PaymentSuccess: Story = {
  args: {
    variant: 'success',
    icon: CreditCard,
    title: 'Pago confirmado',
    children:
      'Hemos recibido tu pago de $1,650.00 MXN. Recibirás un correo con los detalles de tu compra.',
  },
};

export const LowStockWarning: Story = {
  args: {
    variant: 'warning',
    icon: ShoppingBag,
    title: 'Últimas unidades',
    children: 'Solo quedan 2 unidades de este producto. ¡Agrégalo a tu carrito ahora!',
    actions: <Button size="sm">Agregar al carrito</Button>,
  },
};

export const OutOfStockError: Story = {
  args: {
    variant: 'error',
    icon: Package,
    title: 'Producto agotado',
    children:
      'Lo sentimos, este producto ya no está disponible. Te avisaremos cuando vuelva a estar en stock.',
    actions: (
      <Button size="sm" variant="outline">
        Notificarme
      </Button>
    ),
  },
};
