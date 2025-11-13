'use client';

import { useState } from 'react';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'analytics' | 'customers' | 'orders' | 'products' | 'reviews'
  >('overview');

  return (
    <AuthPageWrapper requireSeller loadingText="Cargando dashboard...">
      {(user) => {
        const { makerProfile } = user;

        // Check for low stock products
        const lowStockProducts = makerProfile!.products.filter((p) => p.stock > 0 && p.stock <= 5);
        const outOfStockProducts = makerProfile!.products.filter((p) => p.stock === 0);

        return (
          <div className="min-h-screen bg-gray-50 py-6 px-4">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <DashboardHeader shopName={makerProfile!.shopName} />

              {/* Alerts */}
              <AlertsSection
                lowStockProducts={lowStockProducts}
                outOfStockProducts={outOfStockProducts}
              />

              {/* Stats Grid */}
              <StatsGrid stats={makerProfile!.stats} />

              {/* Tabs */}
              <div className="bg-white rounded-xl shadow-md mb-6">
                <TabNavigation
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  orderCount={makerProfile!.recentOrders.length}
                  productCount={makerProfile!.products.length}
                  reviewCount={makerProfile!.reviews.length}
                />

                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <OverviewTab
                      userEmail={user.email}
                      shopName={makerProfile!.shopName}
                      products={makerProfile!.products}
                      recentOrders={makerProfile!.recentOrders}
                    />
                  )}

                  {/* Analytics Tab */}
                  {activeTab === 'analytics' && <AnalyticsDashboard userEmail={user.email} />}

                  {/* Customer Insights Tab */}
                  {activeTab === 'customers' && <CustomerInsights userEmail={user.email} />}

                  {/* Orders Tab */}
                  {activeTab === 'orders' && <OrdersTab orders={makerProfile!.recentOrders} />}

                  {/* Products Tab */}
                  {activeTab === 'products' && <ProductsTab products={makerProfile!.products} />}

                  {/* Reviews Tab */}
                  {activeTab === 'reviews' && <ReviewsTab reviews={makerProfile!.reviews} />}
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </AuthPageWrapper>
  );
}
