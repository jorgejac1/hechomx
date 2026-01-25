import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Shield, Menu, Search, ShoppingCart, Gift, ShoppingBag, User } from 'lucide-react';
import ThemeToggle from '@/components/common/ThemeToggle';
import AdminBanner from '@/components/layout/header/AdminBanner';
import Avatar from '@/components/common/Avatar';

/**
 * Header is the main site navigation component.
 * This story shows static versions since the actual Header uses contexts.
 *
 * Note: The actual Header component uses AuthContext and CartContext.
 * These stories demonstrate the UI states with static mock data.
 */

interface HeaderStaticProps {
  isAuthenticated?: boolean;
  isAdmin?: boolean;
  userName?: string;
  userAvatar?: string;
  cartCount?: number;
}

function HeaderStatic({
  isAuthenticated = false,
  isAdmin = false,
  userName = 'María García',
  userAvatar,
  cartCount = 0,
}: HeaderStaticProps) {
  return (
    <header className="bg-white dark:bg-gray-950 shadow-md dark:shadow-gray-800/50 sticky top-0 z-50 transition-colors">
      {isAdmin && <AdminBanner />}

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
              P
            </div>
            <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
              Papalote Market
            </span>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-xl xl:max-w-2xl mx-4">
            <button className="w-full flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition text-left">
              <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <span className="text-gray-500 dark:text-gray-400 truncate">Buscar productos...</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-6">
            {/* Search - Medium screens */}
            <button className="lg:hidden text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              <Search className="h-6 w-6" />
            </button>

            {/* Regular: Regalos */}
            {!isAdmin && (
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition cursor-pointer">
                <Gift className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="font-medium hidden lg:block">Regalos</span>
              </div>
            )}

            {/* Productos */}
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition cursor-pointer">
              <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6" />
              <span className="font-medium hidden lg:block">Productos</span>
            </div>

            {/* Cart - Regular users only */}
            {!isAdmin && (
              <div className="relative flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition cursor-pointer">
                <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 cursor-pointer">
                <Avatar
                  name={userName}
                  src={userAvatar}
                  size="sm"
                  ring={isAdmin ? 'primary' : 'none'}
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition cursor-pointer">
                <User className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="font-medium hidden lg:block">Iniciar Sesión</span>
              </div>
            )}

            {/* Theme Toggle */}
            <ThemeToggle size="md" />

            {/* CTA Button */}
            {isAdmin ? (
              <div className="flex items-center gap-2 bg-purple-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-purple-700 transition font-medium text-sm lg:text-base cursor-pointer">
                <Shield className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>Admin</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-primary-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-primary-700 transition font-medium text-sm lg:text-base cursor-pointer">
                <svg
                  className="w-4 h-4 lg:w-5 lg:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Vender</span>
              </div>
            )}
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center gap-3 sm:gap-4">
            <button className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              <Search className="h-6 w-6" />
            </button>

            {!isAdmin && (
              <div className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            )}

            <ThemeToggle size="sm" />

            <button
              className={`hover:text-primary-600 dark:hover:text-primary-400 ${isAdmin ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300'}`}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

const meta: Meta<typeof HeaderStatic> = {
  title: 'Layout/Header',
  component: HeaderStatic,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Main site header with responsive navigation, search, cart, and user menu. The actual component uses AuthContext and CartContext.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isAuthenticated: {
      control: 'boolean',
      description: 'Whether the user is logged in',
    },
    isAdmin: {
      control: 'boolean',
      description: 'Whether the user is an admin',
    },
    cartCount: {
      control: 'number',
      description: 'Number of items in the cart',
    },
    userName: {
      control: 'text',
      description: 'User name for avatar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default unauthenticated
export const Default: Story = {
  args: {
    isAuthenticated: false,
    isAdmin: false,
    cartCount: 0,
  },
};

// Authenticated user
export const Authenticated: Story = {
  args: {
    isAuthenticated: true,
    isAdmin: false,
    userName: 'María García',
    cartCount: 3,
  },
};

// Authenticated with empty cart
export const AuthenticatedEmptyCart: Story = {
  args: {
    isAuthenticated: true,
    isAdmin: false,
    userName: 'Carlos López',
    cartCount: 0,
  },
};

// Admin user
export const Admin: Story = {
  args: {
    isAuthenticated: true,
    isAdmin: true,
    userName: 'Admin Usuario',
    cartCount: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header in admin mode with purple admin banner.',
      },
    },
  },
};

// With many cart items
export const ManyCartItems: Story = {
  args: {
    isAuthenticated: true,
    isAdmin: false,
    userName: 'María García',
    cartCount: 12,
  },
};

// With page content below
export const WithPageContent: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <HeaderStatic isAuthenticated={true} cartCount={2} userName="María García" />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Contenido de la Página
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            El header es sticky y permanece visible al hacer scroll.
          </p>
        </div>
      </main>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header with page content below to show sticky behavior.',
      },
    },
  },
};
