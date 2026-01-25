import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import ThumbnailStrip from '@/components/common/media/ThumbnailStrip';

/**
 * ThumbnailStrip displays a scrollable strip of image/video thumbnails.
 * Supports horizontal and vertical orientations with multiple sizes.
 */
const meta: Meta<typeof ThumbnailStrip> = {
  title: 'Media/ThumbnailStrip',
  component: ThumbnailStrip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Scrollable thumbnail strip for media galleries. Supports horizontal/vertical orientation and multiple sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Strip orientation',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Thumbnail size',
    },
    currentIndex: {
      control: 'number',
      description: 'Currently selected index',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  { type: 'image' as const, url: 'https://picsum.photos/seed/t1/200/200' },
  { type: 'image' as const, url: 'https://picsum.photos/seed/t2/200/200' },
  { type: 'image' as const, url: 'https://picsum.photos/seed/t3/200/200' },
  { type: 'image' as const, url: 'https://picsum.photos/seed/t4/200/200' },
  { type: 'image' as const, url: 'https://picsum.photos/seed/t5/200/200' },
];

// Default horizontal
export const Default: Story = {
  args: {
    items: sampleItems,
    currentIndex: 0,
    onSelect: () => {},
    orientation: 'horizontal',
    size: 'md',
  },
};

// Different selected index
export const ThirdSelected: Story = {
  args: {
    items: sampleItems,
    currentIndex: 2,
    onSelect: () => {},
    orientation: 'horizontal',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Strip with third thumbnail selected.',
      },
    },
  },
};

// Vertical orientation
export const Vertical: Story = {
  args: {
    items: sampleItems,
    currentIndex: 0,
    onSelect: () => {},
    orientation: 'vertical',
    size: 'md',
    className: 'h-80',
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical thumbnail strip.',
      },
    },
  },
};

// Small size
export const SmallSize: Story = {
  args: {
    items: sampleItems,
    currentIndex: 0,
    onSelect: () => {},
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small thumbnail size (48x48px).',
      },
    },
  },
};

// Large size
export const LargeSize: Story = {
  args: {
    items: sampleItems,
    currentIndex: 0,
    onSelect: () => {},
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large thumbnail size (80x80px).',
      },
    },
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Small (sm)</p>
        <ThumbnailStrip items={sampleItems} currentIndex={0} onSelect={() => {}} size="sm" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Medium (md)</p>
        <ThumbnailStrip items={sampleItems} currentIndex={0} onSelect={() => {}} size="md" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Large (lg)</p>
        <ThumbnailStrip items={sampleItems} currentIndex={0} onSelect={() => {}} size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available thumbnail sizes.',
      },
    },
  },
};

// Many items (scrollable)
export const ManyItems: Story = {
  args: {
    items: [
      ...sampleItems,
      { type: 'image' as const, url: 'https://picsum.photos/seed/t6/200/200' },
      { type: 'image' as const, url: 'https://picsum.photos/seed/t7/200/200' },
      { type: 'image' as const, url: 'https://picsum.photos/seed/t8/200/200' },
      { type: 'image' as const, url: 'https://picsum.photos/seed/t9/200/200' },
      { type: 'image' as const, url: 'https://picsum.photos/seed/t10/200/200' },
    ],
    currentIndex: 0,
    onSelect: () => {},
    className: 'max-w-md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Strip with many items showing scroll behavior.',
      },
    },
  },
};

// Interactive example
function InteractiveThumbnailStrip() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Selected: <span className="font-bold">Image {currentIndex + 1}</span>
        </p>
        <img
          src={sampleItems[currentIndex].url}
          alt={`Selected ${currentIndex + 1}`}
          className="w-48 h-48 object-cover rounded-lg mx-auto mt-2"
        />
      </div>
      <ThumbnailStrip
        items={sampleItems}
        currentIndex={currentIndex}
        onSelect={setCurrentIndex}
        size="md"
      />
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveThumbnailStrip />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive thumbnail strip - click to select.',
      },
    },
  },
};

// In gallery layout
export const InGalleryLayout: Story = {
  render: () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
      <div className="flex gap-4">
        <div className="w-96 h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <img src={sampleItems[currentIndex].url} alt="" className="w-full h-full object-cover" />
        </div>
        <ThumbnailStrip
          items={sampleItems}
          currentIndex={currentIndex}
          onSelect={setCurrentIndex}
          orientation="vertical"
          size="md"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Thumbnail strip in a product gallery layout.',
      },
    },
  },
};

// Vertical gallery layout
export const VerticalGalleryLeft: Story = {
  render: () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
      <div className="flex gap-4">
        <ThumbnailStrip
          items={sampleItems}
          currentIndex={currentIndex}
          onSelect={setCurrentIndex}
          orientation="vertical"
          size="sm"
        />
        <div className="w-80 h-80 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <img src={sampleItems[currentIndex].url} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical thumbnails on the left side.',
      },
    },
  },
};

// Dark mode
export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-gray-900 p-6 rounded-lg">
      <ThumbnailStrip items={sampleItems} currentIndex={1} onSelect={() => {}} size="md" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Thumbnail strip in dark mode.',
      },
    },
  },
};
