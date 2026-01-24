import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LazyLoad, { useViewportLazy } from '@/components/common/LazyLoad';

/**
 * LazyLoad utilities for deferred content rendering.
 * Provides viewport-based lazy loading using Intersection Observer
 * and Suspense-based loading for code splitting.
 */
const meta: Meta<typeof LazyLoad> = {
  title: 'Layout/LazyLoad',
  component: LazyLoad,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A lazy loading component that defers rendering of content until it enters the viewport or using React Suspense. Includes useViewportLazy hook and withLazyLoad HOC.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    useViewport: {
      control: 'boolean',
      description: 'Whether to use intersection observer for viewport-based loading',
    },
    rootMargin: {
      control: 'text',
      description: 'Root margin for intersection observer',
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height to prevent layout shift',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Heavy component simulation
function HeavyComponent() {
  return (
    <div className="p-6 bg-gradient-to-r from-primary-100 to-primary-200 rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-2">Componente pesado cargado</h3>
      <p className="text-gray-600">
        Este componente simula contenido que toma tiempo en cargar, como gráficas, imágenes grandes,
        o componentes complejos.
      </p>
    </div>
  );
}

// Default
export const Default: Story = {
  render: () => (
    <div className="max-w-md">
      <LazyLoad>
        <HeavyComponent />
      </LazyLoad>
    </div>
  ),
};

// With custom fallback
export const WithCustomFallback: Story = {
  render: () => (
    <div className="max-w-md">
      <LazyLoad
        fallback={
          <div className="p-6 bg-gray-100 rounded-lg animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3 mt-2" />
          </div>
        }
      >
        <HeavyComponent />
      </LazyLoad>
    </div>
  ),
};

// Viewport-based loading
export const ViewportBased: Story = {
  render: () => (
    <div className="space-y-8">
      <p className="text-gray-600">
        Desplázate hacia abajo para ver cómo los componentes se cargan al entrar en el viewport.
      </p>

      <div className="h-[300px] overflow-auto border rounded-lg p-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <LazyLoad
            key={i}
            useViewport
            rootMargin="50px"
            minHeight={100}
            fallback={
              <div className="h-24 bg-gray-100 rounded-lg mb-4 animate-pulse flex items-center justify-center">
                <span className="text-gray-400">Cargando elemento {i + 1}...</span>
              </div>
            }
          >
            <div className="p-4 bg-green-100 rounded-lg mb-4">
              <p className="font-medium text-green-800">Elemento {i + 1} cargado</p>
              <p className="text-sm text-green-600">
                Este contenido se cargó cuando entró en el viewport
              </p>
            </div>
          </LazyLoad>
        ))}
      </div>
    </div>
  ),
};

// With min height
export const WithMinHeight: Story = {
  render: () => (
    <div className="max-w-md">
      <LazyLoad useViewport minHeight={200}>
        <div className="h-[200px] bg-blue-100 rounded-lg flex items-center justify-center">
          <p className="text-blue-800 font-medium">Contenido con altura mínima</p>
        </div>
      </LazyLoad>
    </div>
  ),
};

// Multiple lazy items
export const MultipleLazyItems: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-2xl">
      {Array.from({ length: 6 }).map((_, i) => (
        <LazyLoad
          key={i}
          useViewport
          minHeight={120}
          fallback={<div className="h-[120px] bg-gray-100 rounded-lg animate-pulse" />}
        >
          <div className="h-[120px] bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg p-4 flex flex-col justify-center">
            <p className="font-semibold text-gray-900">Tarjeta {i + 1}</p>
            <p className="text-sm text-gray-600">Contenido cargado dinámicamente</p>
          </div>
        </LazyLoad>
      ))}
    </div>
  ),
};

// Using useViewportLazy hook
export const UsingHook: Story = {
  render: function UsingHookExample() {
    const { ref, isVisible } = useViewportLazy({ triggerOnce: true });

    return (
      <div className="max-w-md">
        <p className="text-gray-600 mb-4">Este ejemplo usa el hook useViewportLazy directamente.</p>
        <div ref={ref} className="min-h-[150px]">
          {isVisible ? (
            <div className="p-6 bg-green-100 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">✓ Visible en viewport</h3>
              <p className="text-green-600">
                El contenido se renderizó porque el elemento entró en el viewport.
              </p>
            </div>
          ) : (
            <div className="p-6 bg-gray-100 rounded-lg animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
          )}
        </div>
      </div>
    );
  },
};

// Real-world: Image gallery
export const ImageGallery: Story = {
  render: () => (
    <div className="max-w-4xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Galería de productos</h3>
      <div className="h-[400px] overflow-auto border rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <LazyLoad
              key={i}
              useViewport
              rootMargin="100px"
              minHeight={150}
              fallback={<div className="aspect-square bg-gray-100 rounded-lg animate-pulse" />}
            >
              <div
                className="aspect-square rounded-lg flex items-center justify-center text-white font-bold text-2xl"
                style={{
                  background: `linear-gradient(135deg, hsl(${(i * 30) % 360}, 70%, 60%), hsl(${(i * 30 + 60) % 360}, 70%, 50%))`,
                }}
              >
                {i + 1}
              </div>
            </LazyLoad>
          ))}
        </div>
      </div>
    </div>
  ),
};

// Real-world: Product cards
export const ProductCards: Story = {
  render: () => (
    <div className="max-w-4xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos destacados</h3>
      <div className="h-[500px] overflow-auto border rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {Array.from({ length: 15 }).map((_, i) => (
            <LazyLoad
              key={i}
              useViewport
              rootMargin="50px"
              minHeight={280}
              fallback={
                <div className="border rounded-lg p-4 animate-pulse">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-1/2 mb-3" />
                  <div className="h-6 bg-gray-200 rounded w-1/3" />
                </div>
              }
            >
              <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div
                  className="aspect-square rounded-lg mb-3 flex items-center justify-center text-white font-bold"
                  style={{
                    background: `linear-gradient(135deg, hsl(${(i * 25) % 360}, 60%, 55%), hsl(${(i * 25 + 40) % 360}, 60%, 45%))`,
                  }}
                >
                  Producto {i + 1}
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Artesanía #{i + 1}</h4>
                <p className="text-sm text-gray-500 mb-2">Hecho a mano en Oaxaca</p>
                <p className="font-bold text-primary-600">
                  ${(1000 + i * 250).toLocaleString()} MXN
                </p>
              </div>
            </LazyLoad>
          ))}
        </div>
      </div>
    </div>
  ),
};

// With different root margins
export const DifferentRootMargins: Story = {
  render: () => (
    <div className="space-y-8">
      <p className="text-gray-600">
        Diferentes márgenes de anticipación para la carga. Desplázate para ver la diferencia.
      </p>

      <div className="h-[300px] overflow-auto border rounded-lg p-4 space-y-4">
        <LazyLoad
          useViewport
          rootMargin="0px"
          minHeight={80}
          fallback={
            <div className="h-20 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
              rootMargin: 0px - Esperando...
            </div>
          }
        >
          <div className="h-20 bg-red-200 rounded-lg flex items-center justify-center text-red-800 font-medium">
            rootMargin: 0px - Cargado exactamente al entrar
          </div>
        </LazyLoad>

        <LazyLoad
          useViewport
          rootMargin="50px"
          minHeight={80}
          fallback={
            <div className="h-20 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
              rootMargin: 50px - Esperando...
            </div>
          }
        >
          <div className="h-20 bg-yellow-200 rounded-lg flex items-center justify-center text-yellow-800 font-medium">
            rootMargin: 50px - Pre-cargado 50px antes
          </div>
        </LazyLoad>

        <LazyLoad
          useViewport
          rootMargin="150px"
          minHeight={80}
          fallback={
            <div className="h-20 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
              rootMargin: 150px - Esperando...
            </div>
          }
        >
          <div className="h-20 bg-green-200 rounded-lg flex items-center justify-center text-green-800 font-medium">
            rootMargin: 150px - Pre-cargado 150px antes
          </div>
        </LazyLoad>
      </div>
    </div>
  ),
};
