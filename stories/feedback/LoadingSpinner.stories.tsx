import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';

/**
 * LoadingSpinner displays an animated spinner for async operations.
 * Supports multiple sizes, colors, and full-screen mode with optional text.
 */
const meta: Meta<typeof LoadingSpinner> = {
  title: 'Feedback/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An animated loading spinner with configurable size, color, and optional full-screen overlay.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Spinner size',
    },
    color: {
      control: 'select',
      options: ['primary', 'white', 'gray'],
      description: 'Spinner color',
    },
    fullScreen: {
      control: 'boolean',
      description: 'Show full-screen loading overlay',
    },
    text: {
      control: 'text',
      description: 'Optional loading text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default spinner
export const Default: Story = {
  args: {
    size: 'md',
    color: 'primary',
  },
};

// Small size
export const Small: Story = {
  args: {
    size: 'sm',
    color: 'primary',
  },
};

// Medium size
export const Medium: Story = {
  args: {
    size: 'md',
    color: 'primary',
  },
};

// Large size
export const Large: Story = {
  args: {
    size: 'lg',
    color: 'primary',
  },
};

// Primary color
export const PrimaryColor: Story = {
  args: {
    size: 'md',
    color: 'primary',
  },
};

// White color (on dark background)
export const WhiteColor: Story = {
  render: () => (
    <div className="bg-gray-800 p-8 rounded-lg">
      <LoadingSpinner size="md" color="white" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'White spinner for use on dark backgrounds.',
      },
    },
  },
};

// Gray color
export const GrayColor: Story = {
  args: {
    size: 'md',
    color: 'gray',
  },
};

// Full screen
export const FullScreen: Story = {
  args: {
    size: 'lg',
    color: 'primary',
    fullScreen: true,
    text: 'Cargando...',
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Full-screen loading overlay with text.',
      },
    },
  },
};

// Full screen without text
export const FullScreenNoText: Story = {
  args: {
    size: 'lg',
    color: 'primary',
    fullScreen: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <LoadingSpinner size="sm" />
        <p className="text-xs mt-2 text-gray-600">Small</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="md" />
        <p className="text-xs mt-2 text-gray-600">Medium</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="text-xs mt-2 text-gray-600">Large</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all spinner sizes.',
      },
    },
  },
};

// All colors comparison
export const AllColors: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center p-4">
        <LoadingSpinner size="md" color="primary" />
        <p className="text-xs mt-2 text-gray-600">Primary</p>
      </div>
      <div className="text-center p-4 bg-gray-800 rounded-lg">
        <LoadingSpinner size="md" color="white" />
        <p className="text-xs mt-2 text-gray-300">White</p>
      </div>
      <div className="text-center p-4">
        <LoadingSpinner size="md" color="gray" />
        <p className="text-xs mt-2 text-gray-600">Gray</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all spinner colors.',
      },
    },
  },
};

// In button context
export const InButton: Story = {
  render: () => (
    <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg">
      <LoadingSpinner size="sm" color="white" />
      <span>Procesando...</span>
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner used inside a button during loading state.',
      },
    },
  },
};

// In card context
export const InCard: Story = {
  render: () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 flex flex-col items-center justify-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando productos...</p>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Spinner displayed inside a card container.',
      },
    },
  },
};
