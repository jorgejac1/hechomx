import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import UserDropdown from '@/components/layout/header/UserDropdown';
import { mockIndividualSellerAuth } from '@/lib/data/mockUsersAuth';
import type { User } from '@/contexts/AuthContext';

/**
 * UserDropdown provides a dropdown menu for authenticated users.
 * Shows different menu items based on user role (admin vs regular user).
 */
const meta: Meta<typeof UserDropdown> = {
  title: 'Layout/UserDropdown',
  component: UserDropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'User dropdown menu with role-based navigation, profile links, and logout functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isAdmin: {
      control: 'boolean',
      description: 'Whether the user is an admin',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Use the full mock seller user from auth module
const regularUser: User = mockIndividualSellerAuth;

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

// Regular seller user
export const SellerUser: Story = {
  args: {
    user: regularUser,
    isAdmin: false,
    onLogout: () => console.log('Logout clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown for a seller with a shop profile.',
      },
    },
  },
};

// Buyer user (no shop)
export const BuyerUser: Story = {
  args: {
    user: buyerUser,
    isAdmin: false,
    onLogout: () => console.log('Logout clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown for a regular buyer without seller tools.',
      },
    },
  },
};

// Admin user
export const AdminUser: Story = {
  args: {
    user: adminUser,
    isAdmin: true,
    onLogout: () => console.log('Logout clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown for an administrator with admin panel links.',
      },
    },
  },
};

// With avatar
export const WithAvatar: Story = {
  args: {
    user: {
      ...regularUser,
      avatar: '/images/avatars/maria.jpg',
    },
    isAdmin: false,
    onLogout: () => console.log('Logout clicked'),
  },
};

// In header context
export const InHeaderContext: Story = {
  render: () => (
    <div className="bg-white dark:bg-gray-950 shadow-md rounded-lg">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">Papalote Market</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Productos</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Carrito</span>
            <UserDropdown
              user={regularUser}
              isAdmin={false}
              onLogout={() => console.log('Logout')}
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'UserDropdown positioned in a header context.',
      },
    },
  },
};

// Admin in header context
export const AdminInHeaderContext: Story = {
  render: () => (
    <div className="bg-white dark:bg-gray-950 shadow-md rounded-lg">
      <div className="bg-purple-600 text-white text-center py-1.5 text-sm font-medium rounded-t-lg">
        Modo Administrador
      </div>
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">Papalote Market</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-purple-600 dark:text-purple-400">Verificaciones</span>
            <UserDropdown user={adminUser} isAdmin={true} onLogout={() => console.log('Logout')} />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Admin UserDropdown in header with admin banner.',
      },
    },
  },
};
