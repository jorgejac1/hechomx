import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StatsGrid from '@/components/dashboard/StatsGrid';

/**
 * StatsGrid displays key performance metrics including total sales,
 * product count, average rating, and response rate in a responsive grid.
 */
const meta: Meta<typeof StatsGrid> = {
  title: 'Dashboard/StatsGrid',
  component: StatsGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Statistics grid component showing key seller metrics in a responsive 4-column layout.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default stats grid
export const Default: Story = {
  args: {
    stats: {
      salesCount: 156,
      productsCount: 24,
      rating: 4.8,
      reviewsCount: 89,
      responseRate: 95,
    },
  },
};

// New seller stats
export const NewSeller: Story = {
  args: {
    stats: {
      salesCount: 0,
      productsCount: 3,
      rating: 0,
      reviewsCount: 0,
      responseRate: 100,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Stats for a new seller just starting out.',
      },
    },
  },
};

// High performer stats
export const HighPerformer: Story = {
  args: {
    stats: {
      salesCount: 1250,
      productsCount: 48,
      rating: 4.9,
      reviewsCount: 342,
      responseRate: 98,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Stats for a high-performing seller.',
      },
    },
  },
};

// Low rating example
export const LowRating: Story = {
  args: {
    stats: {
      salesCount: 45,
      productsCount: 12,
      rating: 3.2,
      reviewsCount: 15,
      responseRate: 67,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Stats showing a seller with lower performance metrics.',
      },
    },
  },
};

// Perfect rating
export const PerfectRating: Story = {
  args: {
    stats: {
      salesCount: 89,
      productsCount: 8,
      rating: 5.0,
      reviewsCount: 45,
      responseRate: 100,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Stats with perfect 5.0 rating and 100% response rate.',
      },
    },
  },
};

// In dashboard context
export const InDashboardContext: Story = {
  render: () => (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-[400px] p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Dashboard de Vendedor
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Artesanías Oaxaqueñas</p>
      <StatsGrid
        stats={{
          salesCount: 156,
          productsCount: 24,
          rating: 4.8,
          reviewsCount: 89,
          responseRate: 95,
        }}
      />
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-400">Additional dashboard content...</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Stats grid shown in a typical dashboard context.',
      },
    },
  },
};

// Large numbers
export const LargeNumbers: Story = {
  args: {
    stats: {
      salesCount: 15678,
      productsCount: 256,
      rating: 4.7,
      reviewsCount: 4523,
      responseRate: 92,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Stats with large numbers to test display formatting.',
      },
    },
  },
};
