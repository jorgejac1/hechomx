import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import ErrorBoundary from '@/components/common/feedback/ErrorBoundary';
import ErrorState from '@/components/common/feedback/ErrorState';
import Button from '@/components/common/Button';

/**
 * ErrorBoundary catches React errors and displays a fallback UI.
 * Prevents the entire app from crashing when a component throws an error.
 */

// Component that throws an error
function BuggyComponent({ shouldThrow = false }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error('Este es un error de prueba');
  }
  return (
    <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
      <p className="text-green-700 dark:text-green-300 font-medium">
        ✓ Componente funcionando correctamente
      </p>
    </div>
  );
}

// Interactive demo component
function ErrorBoundaryDemo() {
  const [key, setKey] = useState(0);
  const [shouldThrow, setShouldThrow] = useState(false);

  const triggerError = () => {
    setShouldThrow(true);
  };

  const reset = () => {
    setShouldThrow(false);
    setKey((k) => k + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={triggerError} variant="secondary" disabled={shouldThrow}>
          Provocar Error
        </Button>
        <Button onClick={reset} variant="outline">
          Reiniciar
        </Button>
      </div>
      <ErrorBoundary key={key}>
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </div>
  );
}

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Feedback/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Error boundary that catches JavaScript errors in child components and displays a fallback UI instead of crashing the entire app.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default with working component
export const Default: Story = {
  render: () => (
    <ErrorBoundary>
      <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Contenido Normal</h3>
        <p className="text-gray-600 dark:text-gray-400">Este componente funciona correctamente.</p>
      </div>
    </ErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ErrorBoundary with normally functioning children.',
      },
    },
  },
};

// Interactive demo
export const Interactive: Story = {
  render: () => <ErrorBoundaryDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo - click "Provocar Error" to trigger an error and see the fallback UI.',
      },
    },
  },
};

// Showing error state (simulated)
export const ErrorState_: Story = {
  render: () => (
    <div className="w-96">
      <ErrorState
        type="error"
        title="Algo salió mal"
        message="Hubo un error al cargar esta página. Por favor intenta de nuevo."
        onRetry={() => alert('Retry clicked')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The default fallback UI shown when an error is caught.',
      },
    },
  },
};

// With custom fallback
export const WithCustomFallback: Story = {
  render: () => {
    const customFallback = (
      <div className="p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-center">
        <div className="text-4xl mb-4">🔧</div>
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">
          Oops! Algo no funcionó
        </h3>
        <p className="text-red-600 dark:text-red-400 mb-4">Estamos trabajando para solucionarlo.</p>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Recargar Página
        </Button>
      </div>
    );

    return (
      <ErrorBoundary fallback={customFallback}>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300">
            Este componente usa un fallback personalizado.
          </p>
        </div>
      </ErrorBoundary>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'ErrorBoundary with a custom fallback component.',
      },
    },
  },
};

// Custom fallback displayed
export const CustomFallbackDisplayed: Story = {
  render: () => (
    <div className="p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-center">
      <div className="text-4xl mb-4">🔧</div>
      <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">
        Oops! Algo no funcionó
      </h3>
      <p className="text-red-600 dark:text-red-400 mb-4">Estamos trabajando para solucionarlo.</p>
      <Button variant="secondary" onClick={() => alert('Reload')}>
        Recargar Página
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of a custom fallback UI design.',
      },
    },
  },
};

// In card context
export const InCardContext: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[600px]">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <ErrorBoundary>
          <div className="h-40 bg-gray-100 dark:bg-gray-700" />
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Producto 1</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Funciona correctamente</p>
          </div>
        </ErrorBoundary>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <ErrorState type="error" title="Error" message="No se pudo cargar" onRetry={() => {}} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ErrorBoundary wrapping individual cards - one working, one with error.',
      },
    },
  },
};

// Nested boundaries
export const NestedBoundaries: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Múltiples ErrorBoundaries pueden aislar errores en diferentes partes de la UI.
      </p>
      <ErrorBoundary>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Sección Principal</h3>
          <div className="grid grid-cols-2 gap-2">
            <ErrorBoundary>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded text-sm text-green-700 dark:text-green-300">
                Widget A ✓
              </div>
            </ErrorBoundary>
            <ErrorBoundary>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded text-sm text-green-700 dark:text-green-300">
                Widget B ✓
              </div>
            </ErrorBoundary>
            <ErrorBoundary>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded text-sm text-red-700 dark:text-red-300">
                Widget C ⚠️ (error simulado)
              </div>
            </ErrorBoundary>
            <ErrorBoundary>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded text-sm text-green-700 dark:text-green-300">
                Widget D ✓
              </div>
            </ErrorBoundary>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Nested error boundaries isolate failures to specific sections.',
      },
    },
  },
};

// With error callback
export const WithErrorCallback: Story = {
  render: () => (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.log('Error logged:', error.message);
        console.log('Component stack:', errorInfo.componentStack);
        // In production, send to error tracking service
      }}
    >
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
        <p className="text-gray-700 dark:text-gray-300">
          Este boundary tiene un callback onError para logging.
        </p>
      </div>
    </ErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ErrorBoundary with onError callback for error tracking/logging.',
      },
    },
  },
};

// Dark mode
export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-gray-900 p-6 rounded-lg">
      <ErrorState
        type="error"
        title="Algo salió mal"
        message="Hubo un error al cargar esta página. Por favor intenta de nuevo."
        onRetry={() => alert('Retry')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Error fallback UI in dark mode.',
      },
    },
  },
};
