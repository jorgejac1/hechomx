import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Skeleton from '@/components/common/loading/Skeleton';

/**
 * Skeleton is the base loading placeholder component.
 * Supports text, circular, and rectangular variants with pulse or wave animations.
 */
const meta: Meta<typeof Skeleton> = {
  title: 'Loading/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Base skeleton loading placeholder with configurable shape and animation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
      description: 'Shape variant of the skeleton',
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
      description: 'Animation type',
    },
    width: {
      control: 'text',
      description: 'Width (number for px, string for any unit)',
    },
    height: {
      control: 'text',
      description: 'Height (number for px, string for any unit)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default rectangular skeleton
export const Default: Story = {
  args: {
    className: 'w-48 h-6',
  },
};

// Text variant
export const Text: Story = {
  args: {
    variant: 'text',
    className: 'w-64 h-4',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text variant with subtle rounded corners.',
      },
    },
  },
};

// Circular variant
export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 64,
    height: 64,
  },
  parameters: {
    docs: {
      description: {
        story: 'Circular variant for avatars and icons.',
      },
    },
  },
};

// Rectangular variant
export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    className: 'w-48 h-32',
  },
  parameters: {
    docs: {
      description: {
        story: 'Rectangular variant with rounded corners.',
      },
    },
  },
};

// Wave animation
export const WaveAnimation: Story = {
  args: {
    animation: 'wave',
    className: 'w-48 h-6',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shimmer/wave animation effect.',
      },
    },
  },
};

// No animation
export const NoAnimation: Story = {
  args: {
    animation: 'none',
    className: 'w-48 h-6',
  },
  parameters: {
    docs: {
      description: {
        story: 'Static skeleton without animation.',
      },
    },
  },
};

// Custom dimensions
export const CustomDimensions: Story = {
  args: {
    width: 200,
    height: 100,
  },
  parameters: {
    docs: {
      description: {
        story: 'Skeleton with explicit pixel dimensions.',
      },
    },
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex flex-col gap-2 items-center">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Text</span>
        <Skeleton variant="text" className="w-48 h-4" />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Circular</span>
        <Skeleton variant="circular" width={64} height={64} />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Rectangular</span>
        <Skeleton variant="rectangular" className="w-48 h-24" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All skeleton variants side by side.',
      },
    },
  },
};

// Text block composition
export const TextBlock: Story = {
  render: () => (
    <div className="space-y-3 w-64">
      <Skeleton variant="text" className="h-6 w-3/4" />
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-5/6" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple skeletons composed as a text block.',
      },
    },
  },
};

// Profile composition
export const ProfileComposition: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="space-y-2">
        <Skeleton variant="text" className="h-5 w-32" />
        <Skeleton variant="text" className="h-4 w-24" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeletons composed as a profile/user card.',
      },
    },
  },
};

// Dark mode
export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-gray-900 p-6 rounded-lg">
      <div className="space-y-4">
        <Skeleton variant="rectangular" className="w-48 h-32" />
        <Skeleton variant="text" className="h-5 w-3/4" />
        <Skeleton variant="text" className="h-4 w-full" />
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" className="h-4 w-24" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton components in dark mode.',
      },
    },
  },
};
