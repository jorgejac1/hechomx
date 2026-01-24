import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ScrollToTop from '@/components/common/ScrollToTop';

/**
 * ScrollToTop component providing a floating button to scroll to page top.
 * Appears after scrolling down 300px and smoothly scrolls to the top when clicked.
 */
const meta: Meta<typeof ScrollToTop> = {
  title: 'Navigation/ScrollToTop',
  component: ScrollToTop,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A floating button that appears when the user scrolls down and smoothly scrolls to the top when clicked. Positioned in the bottom-right corner with responsive positioning for mobile.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default - need to scroll to see the button
export const Default: Story = {
  render: () => (
    <div className="min-h-[200vh] p-8 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Desplázate hacia abajo</h1>
        <p className="text-gray-600 mb-8">
          El botón de &quot;Volver arriba&quot; aparecerá después de desplazarte 300px hacia abajo.
          Aparece en la esquina inferior derecha de la pantalla.
        </p>

        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="mb-8 p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Sección {i + 1}</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris.
            </p>
          </div>
        ))}
      </div>

      <ScrollToTop />
    </div>
  ),
};

// Simulated product listing page
export const ProductListingPage: Story = {
  render: () => (
    <div className="min-h-[250vh] bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">Artesanías Mexicanas</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-500">Mostrando 48 productos</p>
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>Ordenar por: Más recientes</option>
            <option>Precio: menor a mayor</option>
            <option>Precio: mayor a menor</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <div
                className="aspect-square rounded-lg mb-3 flex items-center justify-center text-white text-2xl font-bold"
                style={{
                  background: `linear-gradient(135deg, hsl(${(i * 15) % 360}, 70%, 60%), hsl(${(i * 15 + 60) % 360}, 70%, 50%))`,
                }}
              >
                {i + 1}
              </div>
              <h3 className="font-medium text-gray-900 text-sm mb-1">Producto artesanal</h3>
              <p className="text-xs text-gray-500 mb-2">Oaxaca, México</p>
              <p className="font-bold text-primary-600">${(500 + i * 100).toLocaleString()} MXN</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 text-gray-500">Mostrando 48 de 156 productos</div>
      </main>

      <ScrollToTop />
    </div>
  ),
};

// Long article page
export const ArticlePage: Story = {
  render: () => (
    <div className="min-h-[300vh] bg-white">
      {/* Article header */}
      <header className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-primary-600 font-medium mb-4">Artesanías • 10 min de lectura</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          La historia detrás del barro negro de Oaxaca
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Descubre la fascinante tradición del barro negro oaxaqueño, una técnica ancestral que ha
          sido perfeccionada durante generaciones por las familias de San Bartolo Coyotepec.
        </p>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full" />
          <div>
            <p className="font-medium text-gray-900">María González</p>
            <p className="text-sm text-gray-500">15 de enero, 2024</p>
          </div>
        </div>
      </header>

      {/* Featured image */}
      <div className="w-full h-[400px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white text-2xl">
        Imagen destacada
      </div>

      {/* Article content */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sección {i + 1}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>
        ))}
      </article>

      <ScrollToTop />
    </div>
  ),
};

// With other floating elements
export const WithOtherFloatingElements: Story = {
  render: () => (
    <div className="min-h-[200vh] bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Página con elementos flotantes</h1>
        <p className="text-gray-600 mb-8">
          El botón de ScrollToTop coexiste con otros elementos flotantes como el widget de feedback
          o chats de soporte.
        </p>

        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="mb-6 p-4 bg-white rounded-lg shadow">
            <p className="text-gray-600">Contenido de ejemplo {i + 1}</p>
          </div>
        ))}
      </div>

      {/* Simulated chat widget */}
      <button className="fixed bottom-8 right-20 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 z-40">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <ScrollToTop />
    </div>
  ),
};
