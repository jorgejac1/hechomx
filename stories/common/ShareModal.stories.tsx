import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import ShareModal from '@/components/common/ShareModal';
import Button from '@/components/common/Button';
import { Share2 } from 'lucide-react';

/**
 * ShareModal component for sharing content to social platforms.
 * Provides buttons for WhatsApp, Facebook, Twitter/X, and email sharing.
 */
const meta: Meta<typeof ShareModal> = {
  title: 'Overlays/ShareModal',
  component: ShareModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A share modal with social platform buttons (WhatsApp, Facebook, Twitter, Email) and a copy-to-clipboard feature.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  render: function DefaultShareModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button icon={<Share2 className="w-4 h-4" />} onClick={() => setIsOpen(true)}>
          Compartir
        </Button>
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          url="https://papalotemarket.com/productos/rebozo-de-seda"
          title="Rebozo de Seda Oaxaqueño - Papalote Market"
        />
      </>
    );
  },
};

// With text
export const WithText: Story = {
  render: function WithTextShareModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button icon={<Share2 className="w-4 h-4" />} onClick={() => setIsOpen(true)}>
          Compartir producto
        </Button>
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          url="https://papalotemarket.com/productos/rebozo-de-seda"
          title="Rebozo de Seda Oaxaqueño"
          text="Mira este hermoso rebozo de seda hecho a mano por artesanos oaxaqueños. ¡Te encantará!"
        />
      </>
    );
  },
};

// Product share example
export const ProductShareExample: Story = {
  render: function ProductShareModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-72 p-4 border rounded-lg">
        <div className="aspect-square bg-gray-100 rounded-lg mb-4" />
        <h3 className="font-semibold text-gray-900 mb-1">Rebozo de Seda Oaxaqueño</h3>
        <p className="text-sm text-gray-500 mb-2">Por María García</p>
        <p className="font-bold text-primary-600 mb-4">$2,500 MXN</p>
        <div className="flex gap-2">
          <Button fullWidth>Agregar al carrito</Button>
          <Button
            variant="outline"
            icon={<Share2 className="w-4 h-4" />}
            onClick={() => setIsOpen(true)}
          />
        </div>
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          url="https://papalotemarket.com/productos/rebozo-de-seda"
          title="Rebozo de Seda Oaxaqueño - Papalote Market"
          text="Descubre este hermoso rebozo de seda tejido a mano por artesanos de Oaxaca."
        />
      </div>
    );
  },
};

// Artisan profile share
export const ArtisanProfileShare: Story = {
  render: function ArtisanShareModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-80 p-6 border rounded-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
          <div>
            <h3 className="font-bold text-gray-900">María García</h3>
            <p className="text-sm text-gray-500">Oaxaca, México</p>
            <p className="text-sm text-gray-500">45 productos</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Artesana textil con más de 20 años de experiencia en técnicas tradicionales oaxaqueñas.
        </p>
        <Button
          variant="outline"
          icon={<Share2 className="w-4 h-4" />}
          onClick={() => setIsOpen(true)}
          fullWidth
        >
          Compartir perfil
        </Button>
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          url="https://papalotemarket.com/artesano/maria-garcia"
          title="María García - Artesana en Papalote Market"
          text="Conoce el trabajo de María García, artesana textil de Oaxaca con más de 20 años de experiencia."
        />
      </div>
    );
  },
};

// Shop share
export const ShopShare: Story = {
  render: function ShopShareModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button
          variant="outline"
          icon={<Share2 className="w-4 h-4" />}
          onClick={() => setIsOpen(true)}
        >
          Compartir tienda
        </Button>
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          url="https://papalotemarket.com/tienda/artesanias-oaxaquenas"
          title="Artesanías Oaxaqueñas - Papalote Market"
          text="Descubre la tienda de Artesanías Oaxaqueñas con productos auténticos hechos a mano."
        />
      </>
    );
  },
};

// Order confirmation share
export const OrderConfirmationShare: Story = {
  render: function OrderShareModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-80 p-6 border rounded-lg text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-bold text-gray-900 mb-2">¡Pedido confirmado!</h3>
        <p className="text-sm text-gray-500 mb-4">
          Tu pedido #ORD-2024-001 ha sido procesado exitosamente.
        </p>
        <div className="space-y-2">
          <Button fullWidth>Ver detalles del pedido</Button>
          <Button
            variant="outline"
            icon={<Share2 className="w-4 h-4" />}
            onClick={() => setIsOpen(true)}
            fullWidth
          >
            Compartir mi compra
          </Button>
        </div>
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          url="https://papalotemarket.com"
          title="¡Acabo de comprar en Papalote Market!"
          text="Descubrí artesanías mexicanas auténticas en Papalote Market. ¡Echa un vistazo!"
        />
      </div>
    );
  },
};

// Collection share
export const CollectionShare: Story = {
  render: function CollectionShareModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button
          variant="secondary"
          icon={<Share2 className="w-4 h-4" />}
          onClick={() => setIsOpen(true)}
        >
          Compartir colección
        </Button>
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          url="https://papalotemarket.com/colecciones/dia-de-muertos"
          title="Colección Día de Muertos - Papalote Market"
          text="Explora nuestra colección especial de Día de Muertos con artesanías tradicionales mexicanas."
        />
      </>
    );
  },
};

// Blog post share
export const BlogPostShare: Story = {
  render: function BlogShareModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-96 border rounded-lg overflow-hidden">
        <div className="aspect-video bg-gray-100" />
        <div className="p-4">
          <p className="text-sm text-primary-600 font-medium mb-2">Artesanías</p>
          <h3 className="font-bold text-gray-900 mb-2">
            La historia detrás del barro negro de Oaxaca
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Descubre la técnica ancestral que hace único al barro negro oaxaqueño...
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">5 min de lectura</span>
            <Button
              variant="ghost"
              size="sm"
              icon={<Share2 className="w-4 h-4" />}
              onClick={() => setIsOpen(true)}
            >
              Compartir
            </Button>
          </div>
        </div>
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          url="https://papalotemarket.com/blog/historia-barro-negro"
          title="La historia detrás del barro negro de Oaxaca"
          text="Lee sobre la fascinante historia y técnica del barro negro oaxaqueño en el blog de Papalote Market."
        />
      </div>
    );
  },
};

// Small share button
export const SmallShareButton: Story = {
  render: function SmallShareModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Compartir"
        >
          <Share2 className="w-5 h-5" />
        </button>
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          url="https://papalotemarket.com/productos/alebrije"
          title="Alebrije de Madera - Papalote Market"
        />
      </>
    );
  },
};
