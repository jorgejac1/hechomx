import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import ZoomControls from '@/components/common/media/ZoomControls';

/**
 * ZoomControls provides zoom in/out buttons with percentage display.
 * Integrates with useZoomControls hook for state management.
 */
const meta: Meta<typeof ZoomControls> = {
  title: 'Media/ZoomControls',
  component: ZoomControls,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Zoom controls with customizable range and step. Shows current zoom percentage.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
      description: 'Minimum zoom level',
    },
    max: {
      control: 'number',
      description: 'Maximum zoom level',
    },
    step: {
      control: 'number',
      description: 'Zoom step increment',
    },
    initial: {
      control: 'number',
      description: 'Initial zoom level',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Show zoom percentage display',
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-800 p-4 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default zoom controls
export const Default: Story = {
  args: {
    min: 1,
    max: 3,
    step: 0.5,
  },
};

// Starting at 200%
export const InitialZoom200: Story = {
  args: {
    min: 1,
    max: 3,
    step: 0.5,
    initial: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Zoom controls starting at 200%.',
      },
    },
  },
};

// Fine step control
export const FineSteps: Story = {
  args: {
    min: 1,
    max: 2,
    step: 0.1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Fine-grained zoom with 10% steps.',
      },
    },
  },
};

// Wide range
export const WideRange: Story = {
  args: {
    min: 0.5,
    max: 5,
    step: 0.5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Wide zoom range from 50% to 500%.',
      },
    },
  },
};

// Without percentage display
export const NoPercentage: Story = {
  args: {
    min: 1,
    max: 3,
    step: 0.5,
    showPercentage: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Zoom controls without percentage display.',
      },
    },
  },
};

// At minimum zoom
export const AtMinimum: Story = {
  args: {
    min: 1,
    max: 3,
    step: 0.5,
    initial: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Controls at minimum zoom (zoom out disabled).',
      },
    },
  },
};

// At maximum zoom
export const AtMaximum: Story = {
  args: {
    min: 1,
    max: 3,
    step: 0.5,
    initial: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Controls at maximum zoom (zoom in disabled).',
      },
    },
  },
};

// Interactive with image
function InteractiveZoomDemo() {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <div className="relative w-80 h-60 overflow-hidden bg-black rounded-lg mb-4">
        <img
          src="https://picsum.photos/seed/zoom/600/400"
          alt="Zoomable"
          className="absolute top-1/2 left-1/2 transition-transform duration-200"
          style={{
            transform: `translate(-50%, -50%) scale(${zoom})`,
            maxWidth: 'none',
          }}
        />
      </div>
      <div className="flex justify-center">
        <ZoomControls min={1} max={3} step={0.25} onZoomChange={setZoom} />
      </div>
    </div>
  );
}

export const InteractiveWithImage: Story = {
  render: () => <InteractiveZoomDemo />,
  decorators: [], // Remove default decorator
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with zoomable image.',
      },
    },
  },
};

// In toolbar context
export const InToolbarContext: Story = {
  render: () => (
    <div className="bg-gray-900 rounded-lg">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2 text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm">producto-01.jpg</span>
        </div>
        <ZoomControls min={1} max={3} step={0.5} />
        <button className="text-white hover:text-gray-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="h-64 bg-black" />
    </div>
  ),
  decorators: [], // Remove default decorator
  parameters: {
    docs: {
      description: {
        story: 'Zoom controls in a modal toolbar.',
      },
    },
  },
};

// Bottom positioned
export const BottomPositioned: Story = {
  render: () => (
    <div className="relative w-80 h-60 bg-gray-900 rounded-lg overflow-hidden">
      <img
        src="https://picsum.photos/seed/bottom/600/400"
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <ZoomControls min={1} max={3} step={0.5} />
      </div>
    </div>
  ),
  decorators: [], // Remove default decorator
  parameters: {
    docs: {
      description: {
        story: 'Zoom controls positioned at bottom of image.',
      },
    },
  },
};

// Corner positioned
export const CornerPositioned: Story = {
  render: () => (
    <div className="relative w-80 h-60 bg-gray-900 rounded-lg overflow-hidden">
      <img
        src="https://picsum.photos/seed/corner/600/400"
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-4 right-4">
        <ZoomControls min={1} max={3} step={0.5} showPercentage={false} />
      </div>
    </div>
  ),
  decorators: [], // Remove default decorator
  parameters: {
    docs: {
      description: {
        story: 'Compact zoom controls in corner without percentage.',
      },
    },
  },
};
