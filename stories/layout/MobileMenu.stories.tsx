import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MobileMenu from '@/components/layout/header/MobileMenu';
import { mockIndividualSellerAuth } from '@/lib/data/mockUsersAuth';
import type { User } from '@/contexts/AuthContext';

/**
 * MobileMenu provides responsive mobile navigation for the site header.
 * Shows different layouts for admin and regular users, with seller tools for makers.
 */
const meta: Meta<typeof MobileMenu> = {
  title: 'Layout/MobileMenu',
  component: MobileMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Mobile navigation menu with role-based menu items, seller tools, and authentication actions.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Use the full mock seller user from auth module
const sellerUser: User = mockIndividualSellerAuth;

// Buyer user (no makerProfile)
const buyerUser: User = {
  id: 'user-2',
  email: 'carlos@ejemplo.com',
  name: 'Carlos López',
  avatar: undefined,
  createdAt: '2023-06-01T00:00:00Z',
};

// Admin user (no makerProfile)
const adminUser: User = {
  id: 'admin-1',
  email: 'admin@papalote.com',
  name: 'Admin Usuario',
  avatar: 'https://i.pravatar.cc/150?img=68',
  createdAt: '2022-01-01T00:00:00Z',
  isAdmin: true,
};

// Unauthenticated user
export const Unauthenticated: Story = {
  args: {
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    onClose: () => console.log('Close menu'),
    onLogout: () => console.log('Logout'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu for users who are not logged in.',
      },
    },
  },
};

// Authenticated buyer
export const AuthenticatedBuyer: Story = {
  args: {
    user: buyerUser,
    isAuthenticated: true,
    isAdmin: false,
    onClose: () => console.log('Close menu'),
    onLogout: () => console.log('Logout'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu for a logged-in buyer without a shop.',
      },
    },
  },
};

// Authenticated seller
export const AuthenticatedSeller: Story = {
  args: {
    user: sellerUser,
    isAuthenticated: true,
    isAdmin: false,
    onClose: () => console.log('Close menu'),
    onLogout: () => console.log('Logout'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu for a seller with shop and seller tools.',
      },
    },
  },
};

// Admin user
export const AdminMenu: Story = {
  args: {
    user: adminUser,
    isAuthenticated: true,
    isAdmin: true,
    onClose: () => console.log('Close menu'),
    onLogout: () => console.log('Logout'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Admin menu with administration panel links.',
      },
    },
  },
};

// In drawer context
export const InDrawerContext: Story = {
  render: () => (
    <div className="relative">
      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Page content behind the drawer...
        </p>
      </div>
      <div className="absolute top-0 right-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menú</h2>
          <button className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="p-6">
          <MobileMenu
            user={sellerUser}
            isAuthenticated={true}
            isAdmin={false}
            onClose={() => console.log('Close')}
            onLogout={() => console.log('Logout')}
          />
        </div>
      </div>
    </div>
  ),
  decorators: [],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'MobileMenu displayed inside a drawer component.',
      },
    },
  },
};

// Admin drawer context
export const AdminDrawerContext: Story = {
  render: () => (
    <div className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4 border-b border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/30 rounded-t-lg">
        <h2 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Panel Admin</h2>
        <button className="text-purple-500 hover:text-purple-700">✕</button>
      </div>
      <div className="p-6">
        <MobileMenu
          user={adminUser}
          isAuthenticated={true}
          isAdmin={true}
          onClose={() => console.log('Close')}
          onLogout={() => console.log('Logout')}
        />
      </div>
    </div>
  ),
  decorators: [],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Admin MobileMenu inside a drawer with purple styling.',
      },
    },
  },
};
