import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MediaViewer from '@/components/common/media/MediaViewer';

/**
 * MediaViewer displays images and videos with support for playback.
 * Used as the main content area in product galleries.
 */

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  alt?: string;
}

const meta: Meta<typeof MediaViewer> = {
  title: 'Media/MediaViewer',
  component: MediaViewer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Media viewer for images and videos. Shows play button overlay for videos.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentIndex: {
      control: 'number',
      description: 'Index of the current media item',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImages: MediaItem[] = [
  { type: 'image', url: 'https://picsum.photos/seed/mv1/800/600', alt: 'Producto 1' },
  { type: 'image', url: 'https://picsum.photos/seed/mv2/800/600', alt: 'Producto 2' },
  { type: 'image', url: 'https://picsum.photos/seed/mv3/800/600', alt: 'Producto 3' },
];

// Default image viewer
export const Default: Story = {
  args: {
    items: sampleImages,
    currentIndex: 0,
    className: 'w-[500px] h-[400px]',
  },
};

// Second image
export const SecondImage: Story = {
  args: {
    items: sampleImages,
    currentIndex: 1,
    className: 'w-[500px] h-[400px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Viewer showing the second image.',
      },
    },
  },
};

// Single image
export const SingleImage: Story = {
  args: {
    items: [
      { type: 'image', url: 'https://picsum.photos/seed/single/800/600', alt: 'Single product' },
    ],
    currentIndex: 0,
    className: 'w-[500px] h-[400px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Viewer with a single image.',
      },
    },
  },
};

// Portrait orientation
export const PortraitImage: Story = {
  args: {
    items: [{ type: 'image', url: 'https://picsum.photos/seed/portrait/400/600', alt: 'Portrait' }],
    currentIndex: 0,
    className: 'w-[400px] h-[500px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Viewer with portrait-oriented image.',
      },
    },
  },
};

// In gallery context
export const InGalleryContext: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="w-[500px] h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <MediaViewer items={sampleImages} currentIndex={0} className="w-full h-full" />
      </div>
      <div className="flex flex-col gap-2">
        {sampleImages.map((item, index) => (
          <div
            key={index}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
              index === 0 ? 'border-primary-600' : 'border-gray-200'
            }`}
          >
            <img src={item.url} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'MediaViewer with thumbnail navigation (simulated).',
      },
    },
  },
};

// Large viewer
export const LargeViewer: Story = {
  args: {
    items: sampleImages,
    currentIndex: 0,
    className: 'w-[800px] h-[600px]',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Large media viewer for detailed view.',
      },
    },
  },
};

// Square aspect ratio
export const SquareViewer: Story = {
  args: {
    items: [
      { type: 'image', url: 'https://picsum.photos/seed/sq1/600/600', alt: 'Square 1' },
      { type: 'image', url: 'https://picsum.photos/seed/sq2/600/600', alt: 'Square 2' },
    ],
    currentIndex: 0,
    className: 'w-[400px] h-[400px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Viewer with square aspect ratio.',
      },
    },
  },
};

// In modal context
export const InModalContext: Story = {
  render: () => (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center"
      style={{ position: 'relative', width: '800px', height: '600px' }}
    >
      <button className="absolute top-4 right-4 text-white hover:text-gray-300 z-10">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <MediaViewer items={sampleImages} currentIndex={0} className="w-[700px] h-[500px]" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'MediaViewer in a lightbox/modal context.',
      },
    },
  },
};

// Dark background
export const DarkBackground: Story = {
  render: () => (
    <div className="bg-gray-900 p-8 rounded-lg">
      <MediaViewer items={sampleImages} currentIndex={0} className="w-[500px] h-[400px]" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'MediaViewer on dark background.',
      },
    },
  },
};
