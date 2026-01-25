import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 * Footer is the main site footer with navigation, social links, and legal information.
 * This story shows a static version since the actual Footer uses config imports.
 *
 * Note: The actual Footer component uses footerNavigation and siteConfig.
 * This story demonstrates the UI with static mock data.
 */

function FooterStatic() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Shop Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Comprar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-300 hover:text-white transition cursor-pointer">
                  Todos los Productos
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-white transition cursor-pointer">
                  Artesanos
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-white transition cursor-pointer">
                  Categorías
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-white transition cursor-pointer">
                  Ofertas
                </span>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nosotros</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-300 hover:text-white transition cursor-pointer">
                  Nuestra Historia
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-white transition cursor-pointer">
                  Misión
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-white transition cursor-pointer">
                  Impacto Social
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-white transition cursor-pointer">
                  Prensa
                </span>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-300 hover:text-white transition cursor-pointer">
                  Centro de Ayuda
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-white transition cursor-pointer">
                  Envíos
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-white transition cursor-pointer">
                  Devoluciones
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-white transition cursor-pointer">
                  Contacto
                </span>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-300 hover:text-white transition cursor-pointer">
                  Términos
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-white transition cursor-pointer">
                  Privacidad
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-white transition cursor-pointer">
                  Cookies
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-white transition cursor-pointer">
                  Accesibilidad
                </span>
              </li>
            </ul>
          </div>

          {/* Social & App Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex gap-4 mb-6">
              {/* Instagram */}
              <span className="text-gray-300 hover:text-white transition cursor-pointer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </span>

              {/* Facebook */}
              <span className="text-gray-300 hover:text-white transition cursor-pointer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </span>

              {/* YouTube */}
              <span className="text-gray-300 hover:text-white transition cursor-pointer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </span>

              {/* Pinterest */}
              <span className="text-gray-300 hover:text-white transition cursor-pointer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 0 0-4.37 23.17c-.05-.89-.1-2.26.02-3.24l.81-3.45s-.2-.4-.2-1c0-.92.54-1.61 1.21-1.61.57 0 .85.43.85.94 0 .57-.37 1.43-.56 2.22-.16.67.34 1.22 1 1.22 1.2 0 2.13-1.27 2.13-3.1 0-1.62-1.16-2.75-2.82-2.75-1.92 0-3.05 1.44-3.05 2.93 0 .58.22 1.2.5 1.54.05.06.06.12.04.18l-.19.78c-.03.11-.1.14-.22.08-.82-.38-1.33-1.58-1.33-2.54 0-2.13 1.55-4.09 4.47-4.09 2.35 0 4.17 1.67 4.17 3.91 0 2.33-1.47 4.21-3.51 4.21-.69 0-1.33-.36-1.55-.78l-.42 1.61c-.15.59-.56 1.33-.84 1.78a12 12 0 1 0 0-24z" />
                </svg>
              </span>
            </div>

            <span className="inline-block px-6 py-3 bg-primary-600 rounded-full text-sm font-semibold hover:bg-primary-700 transition cursor-pointer">
              Descargar la App
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇲🇽</span>
                <span>México</span>
              </div>
              <span>|</span>
              <span>Español (es-MX)</span>
              <span>|</span>
              <span>$ (MXN)</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <span>© {currentYear} Papalote Market</span>
              <span className="hover:text-white transition cursor-pointer">Términos de Uso</span>
              <span className="hover:text-white transition cursor-pointer">Privacidad</span>
              <span className="hover:text-white transition cursor-pointer">Cookies</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 text-center text-sm text-gray-400">
            <p>
              Contacto:{' '}
              <span className="hover:text-white transition cursor-pointer">
                hola@papalotemarket.com
              </span>
              {' | '}
              <span className="hover:text-white transition cursor-pointer">+52 (55) 1234-5678</span>
            </p>
            <p className="mt-2 text-xs">Papalote Market S.A. de C.V.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

const meta: Meta<typeof FooterStatic> = {
  title: 'Layout/Footer',
  component: FooterStatic,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Site footer with navigation sections, social links, and legal information. The actual component uses site configuration.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default footer
export const Default: Story = {};

// With page content above
export const WithPageContent: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Contenido de la Página
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            El footer aparece al final de la página.
          </p>
        </div>
      </main>
      <FooterStatic />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer at the bottom of a full-page layout.',
      },
    },
  },
};

// Dark mode
export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Footer in dark mode.',
      },
    },
  },
};
