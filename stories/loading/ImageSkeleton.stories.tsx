import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ImageSkeleton from '@/components/common/loading/ImageSkeleton';

/**
 * ImageSkeleton is a loading placeholder for images.
 * Supports different aspect ratios: square, video, wide, and portrait.
 */
const meta: Meta<typeof ImageSkeleton> = {
  title: 'Loading/ImageSkeleton',
  component: ImageSkeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Image loading placeholder with configurable aspect ratio and rounded corners.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    aspectRatio: {
      control: 'select',
      options: ['square', 'video', 'wide', 'portrait'],
      description: 'Aspect ratio of the skeleton',
    },
    rounded: {
      control: 'boolean',
      description: 'Whether to show rounded corners',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default square
export const Default: Story = {
  args: {
    aspectRatio: 'square',
    className: 'w-48',
  },
};

// Square aspect ratio
export const Square: Story = {
  args: {
    aspectRatio: 'square',
    className: 'w-48',
  },
  parameters: {
    docs: {
      description: {
        story: '1:1 aspect ratio, ideal for product thumbnails.',
      },
    },
  },
};

// Video aspect ratio
export const Video: Story = {
  args: {
    aspectRatio: 'video',
    className: 'w-64',
  },
  parameters: {
    docs: {
      description: {
        story: '16:9 aspect ratio, ideal for video thumbnails.',
      },
    },
  },
};

// Wide aspect ratio
export const Wide: Story = {
  args: {
    aspectRatio: 'wide',
    className: 'w-80',
  },
  parameters: {
    docs: {
      description: {
        story: '21:9 aspect ratio, ideal for banners.',
      },
    },
  },
};

// Portrait aspect ratio
export const Portrait: Story = {
  args: {
    aspectRatio: 'portrait',
    className: 'w-40',
  },
  parameters: {
    docs: {
      description: {
        story: '3:4 aspect ratio, ideal for profile photos.',
      },
    },
  },
};

// Without rounded corners
export const NoRounded: Story = {
  args: {
    aspectRatio: 'square',
    rounded: false,
    className: 'w-48',
  },
  parameters: {
    docs: {
      description: {
        story: 'Skeleton without rounded corners.',
      },
    },
  },
};

// All aspect ratios
export const AllAspectRatios: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-end">
      <div className="flex flex-col gap-2 items-center">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Square</span>
        <ImageSkeleton aspectRatio="square" className="w-32" />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Video</span>
        <ImageSkeleton aspectRatio="video" className="w-40" />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Wide</span>
        <ImageSkeleton aspectRatio="wide" className="w-48" />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Portrait</span>
        <ImageSkeleton aspectRatio="portrait" className="w-24" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All aspect ratio options side by side.',
      },
    },
  },
};

// Grid of images
export const ImageGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-80">
      {[...Array(6)].map((_, i) => (
        <ImageSkeleton key={i} aspectRatio="square" />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Image skeletons in a grid layout.',
      },
    },
  },
};

// Gallery layout
export const GalleryLayout: Story = {
  render: () => (
    <div className="flex gap-4">
      <ImageSkeleton aspectRatio="square" className="w-64" />
      <div className="flex flex-col gap-2">
        <ImageSkeleton aspectRatio="square" className="w-16" />
        <ImageSkeleton aspectRatio="square" className="w-16" />
        <ImageSkeleton aspectRatio="square" className="w-16" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Image skeletons in a gallery layout with main image and thumbnails.',
      },
    },
  },
};

// Dark mode
export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-gray-900 p-6 rounded-lg">
      <div className="grid grid-cols-2 gap-4 w-64">
        <ImageSkeleton aspectRatio="square" />
        <ImageSkeleton aspectRatio="square" />
        <ImageSkeleton aspectRatio="square" />
        <ImageSkeleton aspectRatio="square" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Image skeletons in dark mode.',
      },
    },
  },
};
