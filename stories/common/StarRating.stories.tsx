import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StarRating from '@/components/common/StarRating';

/**
 * StarRating component for displaying product or seller ratings.
 * Renders filled, half-filled, and empty stars with optional numeric value and review count.
 */
const meta: Meta<typeof StarRating> = {
  title: 'Inputs/StarRating',
  component: StarRating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A star rating display component supporting full, half, and empty stars. Shows numeric rating value and optional review count.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'range', min: 0, max: 5, step: 0.1 },
      description: 'Rating value (supports decimals)',
    },
    maxRating: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum number of stars',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    showValue: {
      control: 'boolean',
      description: 'Show numeric rating value',
    },
    reviewCount: {
      control: 'number',
      description: 'Number of reviews to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    rating: 4.5,
    reviewCount: 128,
  },
};

// Full stars
export const FiveStars: Story = {
  args: {
    rating: 5,
    reviewCount: 256,
  },
};

// Four stars
export const FourStars: Story = {
  args: {
    rating: 4,
    reviewCount: 89,
  },
};

// Half star
export const HalfStar: Story = {
  args: {
    rating: 3.5,
    reviewCount: 45,
  },
};

// Low rating
export const LowRating: Story = {
  args: {
    rating: 2.5,
    reviewCount: 12,
  },
};

// One star
export const OneStar: Story = {
  args: {
    rating: 1,
    reviewCount: 3,
  },
};

// Zero stars
export const ZeroStars: Story = {
  args: {
    rating: 0,
    reviewCount: 0,
  },
};

// Sizes
export const SizeSmall: Story = {
  args: {
    rating: 4.5,
    size: 'sm',
    reviewCount: 42,
  },
};

export const SizeMedium: Story = {
  args: {
    rating: 4.5,
    size: 'md',
    reviewCount: 42,
  },
};

export const SizeLarge: Story = {
  args: {
    rating: 4.5,
    size: 'lg',
    reviewCount: 42,
  },
};

// Without value
export const WithoutValue: Story = {
  args: {
    rating: 4.5,
    showValue: false,
  },
};

// Without review count
export const WithoutReviewCount: Story = {
  args: {
    rating: 4.5,
    showValue: true,
  },
};

// Custom max rating
export const TenStarScale: Story = {
  args: {
    rating: 8.5,
    maxRating: 10,
    showValue: true,
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-16">Small:</span>
        <StarRating rating={4.5} size="sm" reviewCount={128} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-16">Medium:</span>
        <StarRating rating={4.5} size="md" reviewCount={128} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-16">Large:</span>
        <StarRating rating={4.5} size="lg" reviewCount={128} />
      </div>
    </div>
  ),
};

// Rating scale showcase
export const RatingScale: Story = {
  render: () => (
    <div className="space-y-3">
      <StarRating rating={5} productId="scale-5" />
      <StarRating rating={4.5} productId="scale-4.5" />
      <StarRating rating={4} productId="scale-4" />
      <StarRating rating={3.5} productId="scale-3.5" />
      <StarRating rating={3} productId="scale-3" />
      <StarRating rating={2.5} productId="scale-2.5" />
      <StarRating rating={2} productId="scale-2" />
      <StarRating rating={1.5} productId="scale-1.5" />
      <StarRating rating={1} productId="scale-1" />
      <StarRating rating={0.5} productId="scale-0.5" />
    </div>
  ),
};

// Product card example
export const ProductCardExample: Story = {
  render: () => (
    <div className="w-72 p-4 border rounded-lg bg-white">
      <div className="w-full h-40 bg-gray-100 rounded-lg mb-3" />
      <h3 className="font-medium text-gray-900">Vasija de Barro Negro</h3>
      <p className="text-sm text-gray-500 mb-2">Artesanías Don Pedro</p>
      <StarRating rating={4.8} size="sm" reviewCount={127} productId="product-card" />
      <p className="text-lg font-bold text-gray-900 mt-2">$850 MXN</p>
    </div>
  ),
};

// Review summary example
export const ReviewSummary: Story = {
  render: () => (
    <div className="w-80 p-4 border rounded-lg bg-white">
      <h3 className="font-semibold text-gray-900 mb-4">Opiniones de clientes</h3>

      <div className="flex items-center gap-4 mb-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-gray-900">4.8</p>
          <StarRating rating={4.8} showValue={false} productId="summary" />
          <p className="text-sm text-gray-500 mt-1">256 opiniones</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 w-12">5 ⭐</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full">
            <div className="h-full w-4/5 bg-yellow-400 rounded-full" />
          </div>
          <span className="text-sm text-gray-500 w-8">80%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 w-12">4 ⭐</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full">
            <div className="h-full w-1/6 bg-yellow-400 rounded-full" />
          </div>
          <span className="text-sm text-gray-500 w-8">15%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 w-12">3 ⭐</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full">
            <div className="h-full w-[3%] bg-yellow-400 rounded-full" />
          </div>
          <span className="text-sm text-gray-500 w-8">3%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 w-12">2 ⭐</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full">
            <div className="h-full w-[1%] bg-yellow-400 rounded-full" />
          </div>
          <span className="text-sm text-gray-500 w-8">1%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 w-12">1 ⭐</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full">
            <div className="h-full w-[1%] bg-yellow-400 rounded-full" />
          </div>
          <span className="text-sm text-gray-500 w-8">1%</span>
        </div>
      </div>
    </div>
  ),
};

// Artisan profile example
export const ArtisanProfile: Story = {
  render: () => (
    <div className="w-80 p-4 border rounded-lg bg-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full" />
        <div>
          <h3 className="font-semibold text-gray-900">Artesanías Don Pedro</h3>
          <p className="text-sm text-gray-500">Oaxaca, México</p>
          <StarRating rating={4.9} size="sm" reviewCount={312} productId="artisan" />
        </div>
      </div>
      <div className="flex justify-around text-center text-sm">
        <div>
          <p className="font-semibold text-gray-900">156</p>
          <p className="text-gray-500">Productos</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">1,240</p>
          <p className="text-gray-500">Ventas</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">98%</p>
          <p className="text-gray-500">Positivas</p>
        </div>
      </div>
    </div>
  ),
};

// Comparison example
export const ComparisonExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 border rounded-lg w-80">
        <span className="font-medium">Producto A</span>
        <StarRating rating={4.8} size="sm" reviewCount={256} productId="compare-a" />
      </div>
      <div className="flex items-center justify-between p-3 border rounded-lg w-80">
        <span className="font-medium">Producto B</span>
        <StarRating rating={4.5} size="sm" reviewCount={189} productId="compare-b" />
      </div>
      <div className="flex items-center justify-between p-3 border rounded-lg w-80">
        <span className="font-medium">Producto C</span>
        <StarRating rating={4.2} size="sm" reviewCount={78} productId="compare-c" />
      </div>
    </div>
  ),
};

// Inline with text
export const InlineWithText: Story = {
  render: () => (
    <p className="text-gray-600">
      Este producto tiene una calificación de{' '}
      <span className="inline-flex items-center">
        <StarRating rating={4.5} size="sm" showValue={false} productId="inline" />
      </span>{' '}
      <span className="font-semibold">4.5</span> basada en{' '}
      <span className="font-semibold">128 opiniones</span>.
    </p>
  ),
};
