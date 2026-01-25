import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProductGridSkeleton from '@/components/common/loading/ProductGridSkeleton';

/**
 * ProductGridSkeleton displays animated placeholders for product grids.
 * Supports configurable count and responsive column layouts.
 */
const meta: Meta<typeof ProductGridSkeleton> = {
  title: 'Loading/ProductGridSkeleton',
  component: ProductGridSkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Product grid loading placeholder with configurable item count and column layout.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Number of skeleton cards to display',
    },
    columns: {
      control: 'select',
      options: ['default', 'compact', 'wide'],
      description: 'Grid columns configuration',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default grid
export const Default: Story = {
  args: {
    count: 8,
    columns: 'default',
  },
};

// Four items
export const FourItems: Story = {
  args: {
    count: 4,
    columns: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid with 4 skeleton items (single row on large screens).',
      },
    },
  },
};

// Twelve items
export const TwelveItems: Story = {
  args: {
    count: 12,
    columns: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid with 12 skeleton items (3 rows on large screens).',
      },
    },
  },
};

// Compact columns
export const CompactColumns: Story = {
  args: {
    count: 10,
    columns: 'compact',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact layout with more columns (5 on large screens).',
      },
    },
  },
};

// Wide columns
export const WideColumns: Story = {
  args: {
    count: 6,
    columns: 'wide',
  },
  parameters: {
    docs: {
      description: {
        story: 'Wide layout with fewer columns (3 on large screens).',
      },
    },
  },
};

// Single row
export const SingleRow: Story = {
  args: {
    count: 4,
    columns: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Single row of product skeletons.',
      },
    },
  },
};

// In page context
export const InPageContext: Story = {
  render: () => (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-[600px] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Productos</h1>
          <div className="flex gap-2">
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          </div>
        </div>
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Product grid skeleton in a typical page layout.',
      },
    },
  },
};

// With filters sidebar
export const WithFiltersSidebar: Story = {
  render: () => (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-[600px] p-6">
      <div className="max-w-7xl mx-auto flex gap-6">
        {/* Filters skeleton */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-4">
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-6" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
        {/* Grid */}
        <div className="flex-1">
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Product grid with a filters sidebar skeleton.',
      },
    },
  },
};

// Dark mode
export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-gray-900 p-6 rounded-lg">
      <ProductGridSkeleton count={4} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Product grid skeleton in dark mode.',
      },
    },
  },
};
