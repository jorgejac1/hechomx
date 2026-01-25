import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CardSkeleton from '@/components/common/loading/CardSkeleton';

/**
 * CardSkeleton is a loading placeholder for product/content cards.
 * Configurable to show/hide different sections.
 */
const meta: Meta<typeof CardSkeleton> = {
  title: 'Loading/CardSkeleton',
  component: CardSkeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card loading placeholder with configurable sections: image, title, description, price, and actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showImage: {
      control: 'boolean',
      description: 'Show image placeholder',
    },
    showTitle: {
      control: 'boolean',
      description: 'Show title placeholder',
    },
    showDescription: {
      control: 'boolean',
      description: 'Show description placeholder',
    },
    showPrice: {
      control: 'boolean',
      description: 'Show price placeholder',
    },
    showActions: {
      control: 'boolean',
      description: 'Show action buttons placeholder',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default full card
export const Default: Story = {
  args: {
    className: 'w-64',
  },
};

// With all sections
export const FullCard: Story = {
  args: {
    showImage: true,
    showTitle: true,
    showDescription: true,
    showPrice: true,
    showActions: true,
    className: 'w-64',
  },
  parameters: {
    docs: {
      description: {
        story: 'Card skeleton showing all sections.',
      },
    },
  },
};

// Without image
export const NoImage: Story = {
  args: {
    showImage: false,
    className: 'w-64',
  },
  parameters: {
    docs: {
      description: {
        story: 'Card skeleton without the image section.',
      },
    },
  },
};

// Without actions
export const NoActions: Story = {
  args: {
    showActions: false,
    className: 'w-64',
  },
  parameters: {
    docs: {
      description: {
        story: 'Card skeleton without action buttons.',
      },
    },
  },
};

// Image and title only
export const Minimal: Story = {
  args: {
    showImage: true,
    showTitle: true,
    showDescription: false,
    showPrice: false,
    showActions: false,
    className: 'w-64',
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal card with only image and title.',
      },
    },
  },
};

// Product card style
export const ProductCard: Story = {
  args: {
    showImage: true,
    showTitle: true,
    showDescription: false,
    showPrice: true,
    showActions: true,
    className: 'w-64',
  },
  parameters: {
    docs: {
      description: {
        story: 'Product card style skeleton.',
      },
    },
  },
};

// Article card style
export const ArticleCard: Story = {
  args: {
    showImage: true,
    showTitle: true,
    showDescription: true,
    showPrice: false,
    showActions: false,
    className: 'w-64',
  },
  parameters: {
    docs: {
      description: {
        story: 'Article/blog card style skeleton.',
      },
    },
  },
};

// Grid of cards
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <CardSkeleton className="w-64" />
      <CardSkeleton className="w-64" />
      <CardSkeleton className="w-64" />
      <CardSkeleton className="w-64" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple card skeletons in a grid.',
      },
    },
  },
};

// Different sizes
export const DifferentSizes: Story = {
  render: () => (
    <div className="flex gap-6 items-start">
      <CardSkeleton className="w-48" />
      <CardSkeleton className="w-64" />
      <CardSkeleton className="w-80" />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Card skeletons at different widths.',
      },
    },
  },
};

// Dark mode
export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-gray-900 p-6 rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <CardSkeleton className="w-56" />
        <CardSkeleton className="w-56" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card skeletons in dark mode.',
      },
    },
  },
};
