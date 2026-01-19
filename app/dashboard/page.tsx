'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
import { CompleteOrder } from '@/lib/types/checkout';
import { getNewOrdersForSeller, markAllOrdersAsSeen } from '@/lib/utils/orders';
import { SellerProduct, Review, MakerStats } from '@/lib/types/seller-types';
import { Order } from '@/lib/types/order';

interface DashboardContentProps {
  user: {
    email: string;
    makerProfile: {
      shopName: string;
      products: SellerProduct[];
      recentOrders: Order[];
      reviews: Review[];
      stats: MakerStats;
    };
  };
}

function DashboardContent({ user }: DashboardContentProps) {
  const { makerProfile } = user;
  const shopName = makerProfile.shopName;

  const [activeTab, setActiveTab] = useState<
    'overview' | 'analytics' | 'customers' | 'orders' | 'products' | 'reviews'
  >('overview');
  const [newOrders, setNewOrders] = useState<CompleteOrder[]>([]);
  const hasLoadedOrders = useRef(false);

  useEffect(() => {
    if (shopName && !hasLoadedOrders.current && typeof window !== 'undefined') {
      const orders = getNewOrdersForSeller(shopName);
      setNewOrders(orders);
      hasLoadedOrders.current = true;
    }
  }, [shopName]);

  const handleViewOrders = useCallback(() => {
    setActiveTab('orders');
    if (newOrders.length > 0) {
      markAllOrdersAsSeen(shopName);
      setNewOrders([]);
    }
  }, [newOrders.length, shopName]);

  const handleTabChange = useCallback(
    (tab: 'overview' | 'analytics' | 'customers' | 'orders' | 'products' | 'reviews') => {
      setActiveTab(tab);
      if (tab === 'orders' && newOrders.length > 0) {
        markAllOrdersAsSeen(shopName);
        setNewOrders([]);
      }
    },
    [newOrders.length, shopName]
  );

  const lowStockProducts = makerProfile.products.filter((p) => p.stock > 0 && p.stock <= 5);
  const outOfStockProducts = makerProfile.products.filter((p) => p.stock === 0);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader shopName={shopName} newOrderCount={newOrders.length} />
        <AlertsSection
          lowStockProducts={lowStockProducts}
          outOfStockProducts={outOfStockProducts}
          newOrders={newOrders}
          sellerName={shopName}
          onViewOrders={handleViewOrders}
        />
        <StatsGrid stats={makerProfile.stats} />
        <div className="bg-white rounded-xl shadow-md mb-6">
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            orderCount={makerProfile.recentOrders.length}
            productCount={makerProfile.products.length}
            reviewCount={makerProfile.reviews.length}
            newOrderCount={newOrders.length}
          />
          <div className="p-6">
            {activeTab === 'overview' && (
              <OverviewTab
                userEmail={user.email}
                shopName={shopName}
                products={makerProfile.products}
                recentOrders={makerProfile.recentOrders}
              />
            )}
            {activeTab === 'analytics' && <AnalyticsDashboard userEmail={user.email} />}
            {activeTab === 'customers' && <CustomerInsights userEmail={user.email} />}
            {activeTab === 'orders' && <OrdersTab orders={makerProfile.recentOrders} />}
            {activeTab === 'products' && <ProductsTab products={makerProfile.products} />}
            {activeTab === 'reviews' && <ReviewsTab reviews={makerProfile.reviews} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthPageWrapper requireSeller loadingText="Cargando dashboard...">
      {(user) => <DashboardContent user={user as DashboardContentProps['user']} />}
    </AuthPageWrapper>
  );
}
