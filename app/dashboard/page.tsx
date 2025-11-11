'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsGrid from '@/components/dashboard/StatsGrid';
import AlertsSection from '@/components/dashboard/AlertsSection';
import TabNavigation from '@/components/dashboard/TabNavigation';
import OverviewTab from '@/components/dashboard/tabs/OverviewTab';
import OrdersTab from '@/components/dashboard/tabs/OrdersTab';
import ProductsTab from '@/components/dashboard/tabs/ProductsTab';
import ReviewsTab from '@/components/dashboard/tabs/ReviewsTab';
import AnalyticsDashboard from '@/components/dashboard/AnalyticsDashboard';
import CustomerInsights from '@/components/dashboard/CustomerInsights';
import { Store } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'analytics' | 'customers' | 'orders' | 'products' | 'reviews'
  >('overview');

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(ROUTES.LOGIN);
      } else if (user && !user.makerProfile) {
        router.push(ROUTES.HOME);
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || !user) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando dashboard..." />;
  }

  if (!isAuthenticated || !user.makerProfile) {
    return null;
  }

  if (!user.makerProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sin Tienda Activa</h2>
          <p className="text-gray-600 mb-6">
            Necesitas activar tu tienda para acceder al dashboard de vendedor.
          </p>
          <button
            onClick={() => router.push(ROUTES.PROFILE)}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
          >
            Ir a Mi Perfil
          </button>
        </div>
      </div>
    );
  }

  const { makerProfile } = user;

  // Check for low stock products
  const lowStockProducts = makerProfile.products.filter((p) => p.stock > 0 && p.stock <= 5);
  const outOfStockProducts = makerProfile.products.filter((p) => p.stock === 0);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <DashboardHeader shopName={makerProfile.shopName} />

        {/* Alerts */}
        <AlertsSection
          lowStockProducts={lowStockProducts}
          outOfStockProducts={outOfStockProducts}
        />

        {/* Stats Grid */}
        <StatsGrid stats={makerProfile.stats} />

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            orderCount={makerProfile.recentOrders.length}
            productCount={makerProfile.products.length}
            reviewCount={makerProfile.reviews.length}
          />

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <OverviewTab
                userEmail={user.email}
                shopName={makerProfile.shopName}
                products={makerProfile.products}
                recentOrders={makerProfile.recentOrders}
              />
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && <AnalyticsDashboard userEmail={user.email} />}

            {/* Customer Insights Tab */}
            {activeTab === 'customers' && <CustomerInsights userEmail={user.email} />}

            {/* Orders Tab */}
            {activeTab === 'orders' && <OrdersTab orders={makerProfile.recentOrders} />}

            {/* Products Tab */}
            {activeTab === 'products' && <ProductsTab products={makerProfile.products} />}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && <ReviewsTab reviews={makerProfile.reviews} />}
          </div>
        </div>
      </div>
    </div>
  );
}
