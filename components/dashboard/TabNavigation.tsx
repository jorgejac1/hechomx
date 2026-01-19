import { BarChart3, Users } from 'lucide-react';

type TabType = 'overview' | 'analytics' | 'customers' | 'orders' | 'products' | 'reviews';

interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  orderCount: number;
  productCount: number;
  reviewCount: number;
  newOrderCount?: number;
}

export default function TabNavigation({
  activeTab,
  setActiveTab,
  orderCount,
  productCount,
  reviewCount,
  newOrderCount = 0,
}: TabNavigationProps) {
  const tabs = [
    { id: 'overview' as TabType, label: 'Resumen', count: null, icon: null, badge: null },
    { id: 'analytics' as TabType, label: 'Análisis', count: null, icon: BarChart3, badge: null },
    { id: 'customers' as TabType, label: 'Clientes', count: null, icon: Users, badge: null },
    {
      id: 'orders' as TabType,
      label: 'Pedidos',
      count: orderCount,
      icon: null,
      badge: newOrderCount > 0 ? newOrderCount : null,
    },
    { id: 'products' as TabType, label: 'Productos', count: productCount, icon: null, badge: null },
    { id: 'reviews' as TabType, label: 'Reseñas', count: reviewCount, icon: null, badge: null },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />}
                {tab.label}
                {tab.count !== null && ` (${tab.count})`}
                {tab.badge !== null && (
                  <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold text-white bg-green-500 rounded-full animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
