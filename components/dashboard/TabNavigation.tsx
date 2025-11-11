import { BarChart3, Users } from 'lucide-react';

type TabType = 'overview' | 'analytics' | 'customers' | 'orders' | 'products' | 'reviews';

interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  orderCount: number;
  productCount: number;
  reviewCount: number;
}

export default function TabNavigation({
  activeTab,
  setActiveTab,
  orderCount,
  productCount,
  reviewCount,
}: TabNavigationProps) {
  const tabs = [
    { id: 'overview' as TabType, label: 'Resumen', count: null, icon: null },
    { id: 'analytics' as TabType, label: 'Análisis', count: null, icon: BarChart3 },
    { id: 'customers' as TabType, label: 'Clientes', count: null, icon: Users },
    { id: 'orders' as TabType, label: 'Pedidos', count: orderCount, icon: null },
    { id: 'products' as TabType, label: 'Productos', count: productCount, icon: null },
    { id: 'reviews' as TabType, label: 'Reseñas', count: reviewCount, icon: null },
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
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />}
                {tab.label}
                {tab.count !== null && ` (${tab.count})`}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
