import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import VerificationBadge, {
  VerificationIcon,
  VerificationBadgeWithTooltip,
} from '@/components/common/VerificationBadge';

/**
 * VerificationBadge components for displaying seller verification status.
 * Includes badge with label, icon-only, and badge with tooltip variants.
 */
const meta: Meta<typeof VerificationBadge> = {
  title: 'Data Display/VerificationBadge',
  component: VerificationBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Badge components displaying seller verification levels. Includes full badge, icon-only, and tooltip variants for different contexts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: ['basic_seller', 'verified_artisan', 'master_artisan', 'certified_workshop'],
      description: 'Verification level',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show text label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    level: 'verified_artisan',
  },
};

// All levels
export const BasicSeller: Story = {
  args: {
    level: 'basic_seller',
  },
};

export const VerifiedArtisan: Story = {
  args: {
    level: 'verified_artisan',
  },
};

export const MasterArtisan: Story = {
  args: {
    level: 'master_artisan',
  },
};

export const CertifiedWorkshop: Story = {
  args: {
    level: 'certified_workshop',
  },
};

// Sizes
export const SizeSmall: Story = {
  args: {
    level: 'verified_artisan',
    size: 'sm',
  },
};

export const SizeMedium: Story = {
  args: {
    level: 'verified_artisan',
    size: 'md',
  },
};

export const SizeLarge: Story = {
  args: {
    level: 'verified_artisan',
    size: 'lg',
  },
};

// Without label
export const WithoutLabel: Story = {
  args: {
    level: 'verified_artisan',
    showLabel: false,
  },
};

// All levels showcase
export const AllLevels: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <VerificationBadge level="basic_seller" />
        <span className="text-sm text-gray-500">Comisión: 10%</span>
      </div>
      <div className="flex items-center gap-4">
        <VerificationBadge level="verified_artisan" />
        <span className="text-sm text-gray-500">Comisión: 8%</span>
      </div>
      <div className="flex items-center gap-4">
        <VerificationBadge level="master_artisan" />
        <span className="text-sm text-gray-500">Comisión: 5%</span>
      </div>
      <div className="flex items-center gap-4">
        <VerificationBadge level="certified_workshop" />
        <span className="text-sm text-gray-500">Comisión: 7%</span>
      </div>
    </div>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <VerificationBadge level="verified_artisan" size="sm" />
      <VerificationBadge level="verified_artisan" size="md" />
      <VerificationBadge level="verified_artisan" size="lg" />
    </div>
  ),
};

// Icon only
export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <VerificationIcon level="basic_seller" />
      <VerificationIcon level="verified_artisan" />
      <VerificationIcon level="master_artisan" />
      <VerificationIcon level="certified_workshop" />
    </div>
  ),
};

// Icon sizes
export const IconSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <VerificationIcon level="verified_artisan" size="sm" />
      <VerificationIcon level="verified_artisan" size="md" />
      <VerificationIcon level="verified_artisan" size="lg" />
    </div>
  ),
};

// With tooltip
export const WithTooltip: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <VerificationBadgeWithTooltip level="basic_seller" />
      <VerificationBadgeWithTooltip level="verified_artisan" />
      <VerificationBadgeWithTooltip level="master_artisan" />
      <VerificationBadgeWithTooltip level="certified_workshop" />
    </div>
  ),
};

// Product card example
export const ProductCardExample: Story = {
  render: () => (
    <div className="w-72 p-4 border rounded-lg">
      <div className="aspect-square bg-gray-100 rounded-lg mb-4" />
      <div className="flex items-center gap-2 mb-2">
        <span className="font-semibold text-gray-900">Rebozo de Seda</span>
        <VerificationIcon level="verified_artisan" size="sm" />
      </div>
      <p className="text-sm text-gray-500 mb-2">Por María García</p>
      <p className="font-bold text-primary-600">$2,500 MXN</p>
    </div>
  ),
};

// Artisan profile example
export const ArtisanProfileExample: Story = {
  render: () => (
    <div className="w-80 p-6 border rounded-lg">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full" />
        <div>
          <h3 className="font-bold text-gray-900">María García</h3>
          <p className="text-sm text-gray-500">Oaxaca, México</p>
        </div>
      </div>
      <VerificationBadgeWithTooltip level="master_artisan" size="md" />
      <p className="text-sm text-gray-600 mt-4">
        Artesana textil con más de 20 años de experiencia en la técnica de telar de cintura.
      </p>
    </div>
  ),
};

// Seller dashboard example
export const SellerDashboardExample: Story = {
  render: () => (
    <div className="w-96 p-4 bg-white border rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">Tu nivel de verificación</h3>
          <p className="text-sm text-gray-500">Sube de nivel para obtener mejores comisiones</p>
        </div>
        <VerificationBadge level="verified_artisan" />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Comisión actual</span>
          <span className="font-medium text-gray-900">8%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Próximo nivel</span>
          <VerificationBadge level="master_artisan" size="sm" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Comisión con próximo nivel</span>
          <span className="font-medium text-green-600">5%</span>
        </div>
      </div>
    </div>
  ),
};

// Order confirmation example
export const OrderConfirmationExample: Story = {
  render: () => (
    <div className="w-80 p-4 border rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-4">Vendedor</h3>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">Pedro López</span>
            <VerificationIcon level="verified_artisan" size="sm" />
          </div>
          <p className="text-sm text-gray-500">Chiapas, México</p>
        </div>
      </div>
    </div>
  ),
};

// Search results example
export const SearchResultsExample: Story = {
  render: () => (
    <div className="space-y-3 w-96">
      {[
        {
          name: 'Rebozo de Seda',
          seller: 'María García',
          level: 'master_artisan' as const,
          price: 2500,
        },
        {
          name: 'Vasija de Barro',
          seller: 'Pedro López',
          level: 'verified_artisan' as const,
          price: 1200,
        },
        {
          name: 'Collar de Plata',
          seller: 'Ana Martínez',
          level: 'basic_seller' as const,
          price: 850,
        },
      ].map((product) => (
        <div
          key={product.name}
          className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">{product.name}</p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span>{product.seller}</span>
              <VerificationIcon level={product.level} size="sm" />
            </div>
          </div>
          <span className="font-bold text-primary-600">${product.price.toLocaleString()}</span>
        </div>
      ))}
    </div>
  ),
};
