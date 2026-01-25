import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ErrorState from '@/components/common/feedback/ErrorState';
import Button from '@/components/common/Button';

/**
 * ErrorState displays user-friendly error messages with icons and retry actions.
 * Supports error, warning, network, and server error types.
 */
const meta: Meta<typeof ErrorState> = {
  title: 'Feedback/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component for displaying error states with contextual icons, messages, and optional retry actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['error', 'warning', 'network', 'server'],
      description: 'Type of error to display',
    },
    title: {
      control: 'text',
      description: 'Custom title text',
    },
    message: {
      control: 'text',
      description: 'Custom message text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default error
export const Default: Story = {
  args: {
    type: 'error',
  },
};

// Error type
export const Error: Story = {
  args: {
    type: 'error',
    title: 'Error al cargar productos',
    message: 'No pudimos cargar los productos. Por favor, intenta de nuevo.',
    onRetry: () => console.log('Retry clicked'),
  },
};

// Warning type
export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Información incompleta',
    message: 'Algunos campos del formulario necesitan atención.',
  },
};

// Network error
export const NetworkError: Story = {
  args: {
    type: 'network',
    onRetry: () => console.log('Retry clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shown when there is no internet connection.',
      },
    },
  },
};

// Server error
export const ServerError: Story = {
  args: {
    type: 'server',
    onRetry: () => console.log('Retry clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shown when the server is unavailable.',
      },
    },
  },
};

// With retry button
export const WithRetry: Story = {
  args: {
    type: 'error',
    title: 'Error de conexión',
    message: 'No se pudo conectar al servidor.',
    onRetry: () => alert('Reintentando...'),
  },
};

// With custom action
export const WithCustomAction: Story = {
  args: {
    type: 'warning',
    title: 'Sesión expirada',
    message: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
    action: (
      <Button variant="primary" onClick={() => alert('Go to login')}>
        Iniciar Sesión
      </Button>
    ),
  },
};

// With retry and custom action
export const WithRetryAndAction: Story = {
  args: {
    type: 'error',
    title: 'Error al procesar pago',
    message: 'Hubo un problema con tu método de pago.',
    onRetry: () => alert('Reintentando...'),
    action: (
      <Button variant="outline" onClick={() => alert('Change payment')}>
        Cambiar Método de Pago
      </Button>
    ),
  },
};

// In card context
export const InCardContext: Story = {
  render: () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 max-w-md">
      <ErrorState
        type="error"
        title="Error al cargar pedidos"
        message="No pudimos cargar tus pedidos."
        onRetry={() => console.log('Retry')}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'ErrorState displayed inside a card container.',
      },
    },
  },
};

// All types
export const AllTypes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-2 text-center">Error</h3>
        <ErrorState type="error" />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-2 text-center">Warning</h3>
        <ErrorState type="warning" />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-2 text-center">Network</h3>
        <ErrorState type="network" />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-2 text-center">Server</h3>
        <ErrorState type="server" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'All available error state types.',
      },
    },
  },
};
