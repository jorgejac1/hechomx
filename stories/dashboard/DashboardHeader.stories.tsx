import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

/**
 * DashboardHeader displays the seller dashboard title, shop name,
 * new order notifications, and a link to view the public shop page.
 */
const meta: Meta<typeof DashboardHeader> = {
  title: 'Dashboard/DashboardHeader',
  component: DashboardHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Header component for the seller dashboard showing shop name, notifications, and shop link.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    shopName: {
      control: 'text',
      description: "Name of the seller's shop",
    },
    newOrderCount: {
      control: 'number',
      description: 'Number of new orders for notification display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default header
export const Default: Story = {
  args: {
    shopName: 'Artesanías Oaxaqueñas',
    newOrderCount: 0,
  },
};

// With new order notification
export const WithNewOrder: Story = {
  args: {
    shopName: 'Tejidos Tradicionales',
    newOrderCount: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header showing a single new order notification.',
      },
    },
  },
};

// With multiple new orders
export const WithMultipleOrders: Story = {
  args: {
    shopName: 'Cerámica y Talavera',
    newOrderCount: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header showing multiple new order notifications.',
      },
    },
  },
};

// Long shop name
export const LongShopName: Story = {
  args: {
    shopName: 'Artesanías y Productos Tradicionales Mexicanos de Oaxaca',
    newOrderCount: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with a longer shop name to test text wrapping.',
      },
    },
  },
};

// In dashboard context
export const InDashboardContext: Story = {
  render: () => (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-[300px] p-6">
      <DashboardHeader shopName="Mi Tienda Artesanal" newOrderCount={2} />
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-400">Dashboard content goes here...</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Header shown in a typical dashboard context with background.',
      },
    },
  },
};
