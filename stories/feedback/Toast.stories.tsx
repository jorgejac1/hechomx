import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Toast from '@/components/common/feedback/Toast';

/**
 * Toast displays temporary notification messages with auto-dismiss and close button.
 * Supports success, error, info, and warning variants.
 */
const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toast notification component for displaying temporary feedback messages to users.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'info', 'warning'],
      description: 'Toast type/variant',
    },
    message: {
      control: 'text',
      description: 'Toast message content',
    },
    duration: {
      control: 'number',
      description: 'Auto-dismiss duration in milliseconds (0 = no auto-dismiss)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Success toast
export const Success: Story = {
  args: {
    id: 'success-1',
    message: '¡Producto agregado al carrito!',
    type: 'success',
    duration: 0,
    onClose: () => console.log('Toast closed'),
  },
};

// Error toast
export const Error: Story = {
  args: {
    id: 'error-1',
    message: 'Error al procesar el pago. Por favor, intenta de nuevo.',
    type: 'error',
    duration: 0,
    onClose: () => console.log('Toast closed'),
  },
};

// Info toast
export const Info: Story = {
  args: {
    id: 'info-1',
    message: 'Tu pedido está siendo procesado.',
    type: 'info',
    duration: 0,
    onClose: () => console.log('Toast closed'),
  },
};

// Warning toast
export const Warning: Story = {
  args: {
    id: 'warning-1',
    message: 'Stock bajo - solo quedan 3 unidades.',
    type: 'warning',
    duration: 0,
    onClose: () => console.log('Toast closed'),
  },
};

// Long message
export const LongMessage: Story = {
  args: {
    id: 'long-1',
    message:
      'Tu pedido #12345 ha sido confirmado y se encuentra en preparación. Recibirás un correo con los detalles del envío.',
    type: 'success',
    duration: 0,
    onClose: () => console.log('Toast closed'),
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Toast
        id="success"
        message="Operación exitosa"
        type="success"
        duration={0}
        onClose={() => {}}
      />
      <Toast
        id="error"
        message="Ha ocurrido un error"
        type="error"
        duration={0}
        onClose={() => {}}
      />
      <Toast
        id="info"
        message="Información importante"
        type="info"
        duration={0}
        onClose={() => {}}
      />
      <Toast
        id="warning"
        message="Advertencia: verifica los datos"
        type="warning"
        duration={0}
        onClose={() => {}}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All toast variants displayed together.',
      },
    },
  },
};

// Interactive example
const InteractiveToast = () => {
  const [toasts, setToasts] = useState<
    Array<{ id: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }>
  >([]);

  const addToast = (type: 'success' | 'error' | 'info' | 'warning') => {
    const messages = {
      success: '¡Acción completada exitosamente!',
      error: 'Ha ocurrido un error inesperado.',
      info: 'Información actualizada.',
      warning: 'Por favor, revisa los datos ingresados.',
    };
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message: messages[type], type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => addToast('success')}
          className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm"
        >
          Add Success
        </button>
        <button
          onClick={() => addToast('error')}
          className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm"
        >
          Add Error
        </button>
        <button
          onClick={() => addToast('info')}
          className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Add Info
        </button>
        <button
          onClick={() => addToast('warning')}
          className="px-3 py-2 bg-yellow-600 text-white rounded-lg text-sm"
        >
          Add Warning
        </button>
      </div>
      <div className="space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            duration={3000}
            onClose={removeToast}
          />
        ))}
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveToast />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example - click buttons to add toasts that auto-dismiss after 3 seconds.',
      },
    },
  },
};

// In corner position (simulating toast container)
export const InCornerPosition: Story = {
  render: () => (
    <div className="relative w-full h-[300px] bg-gray-100 dark:bg-gray-900 rounded-lg">
      <div className="absolute top-4 right-4 space-y-2">
        <Toast
          id="corner-1"
          message="Nuevo pedido recibido"
          type="success"
          duration={0}
          onClose={() => {}}
        />
        <Toast
          id="corner-2"
          message="Stock actualizado"
          type="info"
          duration={0}
          onClose={() => {}}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Toasts positioned in the corner, simulating typical toast container placement.',
      },
    },
  },
};

// Real-world examples
export const ProductAddedToCart: Story = {
  args: {
    id: 'cart-1',
    message: '¡Alebrije Dragón agregado al carrito!',
    type: 'success',
    duration: 0,
    onClose: () => console.log('Toast closed'),
  },
};

export const PaymentError: Story = {
  args: {
    id: 'payment-1',
    message: 'Error al procesar el pago. Verifica los datos de tu tarjeta.',
    type: 'error',
    duration: 0,
    onClose: () => console.log('Toast closed'),
  },
};

export const OrderShipped: Story = {
  args: {
    id: 'order-1',
    message: 'Tu pedido #ORD-12345 ha sido enviado.',
    type: 'info',
    duration: 0,
    onClose: () => console.log('Toast closed'),
  },
};

export const LowStock: Story = {
  args: {
    id: 'stock-1',
    message: '¡Últimas 2 unidades disponibles!',
    type: 'warning',
    duration: 0,
    onClose: () => console.log('Toast closed'),
  },
};
