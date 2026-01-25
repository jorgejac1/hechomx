import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import TabNavigation from '@/components/dashboard/TabNavigation';

/**
 * TabNavigation provides navigation between different dashboard sections
 * including overview, analytics, customers, orders, products, and reviews.
 */
const meta: Meta<typeof TabNavigation> = {
  title: 'Dashboard/TabNavigation',
  component: TabNavigation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tab navigation component for the seller dashboard with count badges and notification indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeTab: {
      control: 'select',
      options: [
        'overview',
        'analytics',
        'customers',
        'achievements',
        'orders',
        'products',
        'reviews',
      ],
      description: 'Currently active tab',
    },
    orderCount: {
      control: 'number',
      description: 'Total number of orders',
    },
    productCount: {
      control: 'number',
      description: 'Total number of products',
    },
    reviewCount: {
      control: 'number',
      description: 'Total number of reviews',
    },
    newOrderCount: {
      control: 'number',
      description: 'Number of new orders for badge',
    },
    achievementBadge: {
      control: 'number',
      description: 'Number of unseen achievements',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TabNavigation>;

// Default overview tab
export const Default: Story = {
  args: {
    activeTab: 'overview',
    setActiveTab: () => {},
    orderCount: 45,
    productCount: 12,
    reviewCount: 28,
    newOrderCount: 0,
    achievementBadge: 0,
  },
};

// With new order badge
export const WithNewOrders: Story = {
  args: {
    activeTab: 'overview',
    setActiveTab: () => {},
    orderCount: 45,
    productCount: 12,
    reviewCount: 28,
    newOrderCount: 3,
    achievementBadge: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab navigation showing new order notification badge.',
      },
    },
  },
};

// With achievement badge
export const WithAchievements: Story = {
  args: {
    activeTab: 'overview',
    setActiveTab: () => {},
    orderCount: 45,
    productCount: 12,
    reviewCount: 28,
    newOrderCount: 0,
    achievementBadge: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab navigation with unseen achievement notifications.',
      },
    },
  },
};

// With all badges
export const WithAllBadges: Story = {
  args: {
    activeTab: 'overview',
    setActiveTab: () => {},
    orderCount: 156,
    productCount: 32,
    reviewCount: 89,
    newOrderCount: 5,
    achievementBadge: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab navigation with both order and achievement badges.',
      },
    },
  },
};

// Analytics tab active
export const AnalyticsActive: Story = {
  args: {
    activeTab: 'analytics',
    setActiveTab: () => {},
    orderCount: 45,
    productCount: 12,
    reviewCount: 28,
  },
};

// Products tab active
export const ProductsActive: Story = {
  args: {
    activeTab: 'products',
    setActiveTab: () => {},
    orderCount: 45,
    productCount: 12,
    reviewCount: 28,
  },
};

// Interactive example
const InteractiveTabNavigation = () => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'analytics' | 'customers' | 'achievements' | 'orders' | 'products' | 'reviews'
  >('overview');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        orderCount={45}
        productCount={12}
        reviewCount={28}
        newOrderCount={2}
        achievementBadge={1}
      />
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-400">
          Active tab: <strong className="text-gray-900 dark:text-gray-100">{activeTab}</strong>
        </p>
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTabNavigation />,
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive tab navigation - click tabs to switch.',
      },
    },
  },
};

// New seller with no data
export const NewSeller: Story = {
  args: {
    activeTab: 'overview',
    setActiveTab: () => {},
    orderCount: 0,
    productCount: 0,
    reviewCount: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab navigation for a new seller with no orders, products, or reviews yet.',
      },
    },
  },
};
