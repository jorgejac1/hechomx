import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FeedbackWidget from '@/components/common/FeedbackWidget';

/**
 * FeedbackWidget component for collecting user feedback during testing.
 * Displays a floating button that opens a modal with a feedback form.
 */
const meta: Meta<typeof FeedbackWidget> = {
  title: 'Feedback/FeedbackWidget',
  component: FeedbackWidget,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A floating feedback widget for collecting user feedback. Opens a modal with role selection, feedback type, and message input. Submits to Formspree.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  render: () => (
    <div className="h-screen bg-gray-50 p-8">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Página de ejemplo</h1>
        <p className="text-gray-600 mb-4">
          El widget de feedback aparece en la esquina inferior derecha de la pantalla. Haz clic en
          el botón &quot;Opinar&quot; para abrir el formulario.
        </p>
        <p className="text-gray-600">
          Este widget es útil durante la fase de testing para recopilar opiniones de usuarios sobre
          la experiencia de navegación.
        </p>
      </div>
      <FeedbackWidget />
    </div>
  ),
};

// On product page
export const OnProductPage: Story = {
  render: () => (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-100 rounded-lg" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Rebozo de Seda Oaxaqueño</h1>
            <p className="text-gray-500 mb-4">Por María García</p>
            <p className="text-3xl font-bold text-primary-600 mb-6">$2,500 MXN</p>
            <p className="text-gray-600 mb-6">
              Hermoso rebozo de seda tejido a mano por artesanas oaxaqueñas utilizando técnicas
              tradicionales de telar de cintura.
            </p>
            <button className="w-full py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
      <FeedbackWidget />
    </div>
  ),
};

// On checkout page
export const OnCheckoutPage: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Información de envío</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Dirección"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Resumen del pedido</h2>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>$2,500 MXN</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-4">
            <span>Envío</span>
            <span>$150 MXN</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 border-t pt-4">
            <span>Total</span>
            <span>$2,650 MXN</span>
          </div>
        </div>
      </div>
      <FeedbackWidget />
    </div>
  ),
};

// On dashboard
export const OnDashboard: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard del vendedor</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500 mb-1">Ventas del mes</p>
            <p className="text-2xl font-bold text-gray-900">$15,420 MXN</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500 mb-1">Pedidos pendientes</p>
            <p className="text-2xl font-bold text-gray-900">8</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500 mb-1">Productos activos</p>
            <p className="text-2xl font-bold text-gray-900">45</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Actividad reciente</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-100">
                <div className="w-10 h-10 bg-gray-100 rounded-lg" />
                <div>
                  <p className="font-medium text-gray-900">Nuevo pedido recibido</p>
                  <p className="text-sm text-gray-500">
                    Hace {i} hora{i > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FeedbackWidget />
    </div>
  ),
};

// Mobile view simulation
export const MobileView: Story = {
  render: () => (
    <div className="max-w-sm mx-auto h-screen bg-white border-x">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Productos</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 p-3 border rounded-lg">
              <div className="w-20 h-20 bg-gray-100 rounded-lg shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Producto {i}</p>
                <p className="text-sm text-gray-500">Categoría</p>
                <p className="font-bold text-primary-600 mt-1">$1,{i}00 MXN</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FeedbackWidget />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// With dark background
export const WithDarkBackground: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-white mb-4">Modo oscuro</h1>
        <p className="text-gray-300 mb-4">
          El widget de feedback también funciona correctamente sobre fondos oscuros.
        </p>
        <p className="text-gray-400">
          El contraste del botón flotante permite que sea visible en cualquier contexto.
        </p>
      </div>
      <FeedbackWidget />
    </div>
  ),
};
