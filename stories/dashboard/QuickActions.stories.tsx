import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Package,
  AlertTriangle,
  MessageSquare,
  Star,
  ArrowRight,
  Loader2,
  Sparkles,
  Calculator,
  Store,
  ExternalLink,
} from 'lucide-react';

/**
 * QuickActions displays actionable items for sellers including pending orders,
 * low stock alerts, unanswered messages, and promotional features.
 *
 * Note: The actual component loads data asynchronously. These stories demonstrate
 * the UI states with static mock data.
 */

// Static mock component for Storybook (avoids API calls)
interface QuickActionsStaticProps {
  hasStory: boolean;
  pendingOrders: number;
  lowStockCount: number;
  unansweredMessages: number;
  pendingReviews: number;
  isLoading?: boolean;
}

function QuickActionsStatic({
  hasStory,
  pendingOrders,
  lowStockCount,
  unansweredMessages,
  pendingReviews,
  isLoading = false,
}: QuickActionsStaticProps) {
  const totalPendingTasks = pendingOrders + lowStockCount + unansweredMessages + pendingReviews;

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Acciones Rápidas</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {totalPendingTasks === 0 ? 'Todo al día' : `${totalPendingTasks} pendientes`}
          </p>
        </div>
        {totalPendingTasks > 0 && (
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-sm font-semibold rounded-full">
            {totalPendingTasks}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {/* Mi Historia Artesanal - Show if they don't have a story yet */}
        {!hasStory && (
          <div className="block w-full p-4 bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border-2 border-purple-300 dark:border-purple-600 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 transition text-left cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    Comparte Tu Historia Artesanal
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Conecta emocionalmente con tus clientes mostrando tu herencia y proceso
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
            </div>
          </div>
        )}

        {/* Pricing Calculator Promo */}
        <div className="block w-full p-4 bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg border-2 border-blue-300 dark:border-blue-600 hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/50 dark:hover:to-cyan-900/50 transition text-left cursor-pointer">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  Calcula Precios Justos
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Herramienta para calcular precios con salario digno
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          </div>
        </div>

        {/* View My Shop */}
        <div className="block w-full p-4 bg-linear-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-lg border-2 border-emerald-300 dark:border-emerald-600 hover:from-emerald-100 hover:to-green-100 dark:hover:from-emerald-900/50 dark:hover:to-green-900/50 transition text-left cursor-pointer">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <Store className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">Vista de Cliente</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ve cómo los clientes ven tu tienda
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          </div>
        </div>

        {/* Edit Story - Show if they already have a story */}
        {hasStory && (
          <div className="block w-full p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border-l-4 border-purple-500 dark:border-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition text-left cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    Editar Mi Historia
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Actualiza tu historia artesanal y fotos
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
            </div>
          </div>
        )}

        {/* Pending Orders */}
        {pendingOrders > 0 && (
          <div className="block w-full p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-500 dark:border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition text-left cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Package className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {pendingOrders} pedido{pendingOrders > 1 ? 's' : ''} por procesar
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    María García - $2,500.00
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            </div>
          </div>
        )}

        {/* Low Stock */}
        {lowStockCount > 0 && (
          <div className="block w-full p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border-l-4 border-red-500 dark:border-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 transition text-left cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    Productos sin stock
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Alebrije Dragón Multicolor
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
            </div>
          </div>
        )}

        {/* Unanswered Messages */}
        {unansweredMessages > 0 && (
          <div className="block w-full p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border-l-4 border-yellow-500 dark:border-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 transition text-left cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <MessageSquare className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {unansweredMessages} mensaje{unansweredMessages > 1 ? 's' : ''} sin responder
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Responde para mantener tu tasa de respuesta
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0" />
            </div>
          </div>
        )}

        {/* Pending Reviews */}
        {pendingReviews > 0 && (
          <div className="block w-full p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border-l-4 border-purple-500 dark:border-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition text-left cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Star className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {pendingReviews} reseña{pendingReviews > 1 ? 's' : ''} por responder
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Carlos López - 3 días</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
            </div>
          </div>
        )}

        {/* All Clear */}
        {totalPendingTasks === 0 && hasStory && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
              ¡Todo al día!
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No hay acciones pendientes en este momento
            </p>
          </div>
        )}

        {/* View All Tasks Button */}
        <div className="block w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition text-center cursor-pointer">
          <p className="font-semibold text-gray-700 dark:text-gray-300">Ver Todas las Tareas</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Centro completo de gestión
          </p>
        </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof QuickActionsStatic> = {
  title: 'Dashboard/QuickActions',
  component: QuickActionsStatic,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Quick actions widget showing pending tasks and promotional features. The actual component loads data via API.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    hasStory: {
      control: 'boolean',
      description: 'Whether the seller has created their artisan story',
    },
    pendingOrders: {
      control: 'number',
      description: 'Number of pending orders',
    },
    lowStockCount: {
      control: 'number',
      description: 'Number of products with low/no stock',
    },
    unansweredMessages: {
      control: 'number',
      description: 'Number of unanswered messages',
    },
    pendingReviews: {
      control: 'number',
      description: 'Number of reviews needing response',
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default with some pending tasks
export const Default: Story = {
  args: {
    hasStory: true,
    pendingOrders: 2,
    lowStockCount: 1,
    unansweredMessages: 3,
    pendingReviews: 1,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    hasStory: false,
    pendingOrders: 0,
    lowStockCount: 0,
    unansweredMessages: 0,
    pendingReviews: 0,
    isLoading: true,
  },
};

// New seller without story
export const NewSellerNoStory: Story = {
  args: {
    hasStory: false,
    pendingOrders: 0,
    lowStockCount: 0,
    unansweredMessages: 0,
    pendingReviews: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "New seller who hasn't created their artisan story yet.",
      },
    },
  },
};

// All clear state
export const AllClear: Story = {
  args: {
    hasStory: true,
    pendingOrders: 0,
    lowStockCount: 0,
    unansweredMessages: 0,
    pendingReviews: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'All tasks completed - shows "Todo al día" state.',
      },
    },
  },
};

// Many pending tasks
export const ManyPendingTasks: Story = {
  args: {
    hasStory: true,
    pendingOrders: 5,
    lowStockCount: 3,
    unansweredMessages: 8,
    pendingReviews: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Seller with many pending tasks across all categories.',
      },
    },
  },
};

// Only orders pending
export const OnlyOrdersPending: Story = {
  args: {
    hasStory: true,
    pendingOrders: 3,
    lowStockCount: 0,
    unansweredMessages: 0,
    pendingReviews: 0,
  },
};

// Low stock alert only
export const LowStockOnly: Story = {
  args: {
    hasStory: true,
    pendingOrders: 0,
    lowStockCount: 2,
    unansweredMessages: 0,
    pendingReviews: 0,
  },
};

// In dashboard context
export const InDashboardContext: Story = {
  render: () => (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-[600px] p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActionsStatic
          hasStory={true}
          pendingOrders={2}
          lowStockCount={1}
          unansweredMessages={3}
          pendingReviews={1}
        />
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            Other Dashboard Widget
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Content would go here...</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Quick actions in a typical dashboard grid layout.',
      },
    },
  },
};
