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
import AchievementsTab from '@/components/dashboard/tabs/AchievementsTab';
import LazyLoad from '@/components/common/LazyLoad';
import Skeleton from '@/components/common/loading/Skeleton';
import { CompleteOrder } from '@/lib/types/checkout';
import { getNewOrdersForSeller, markAllOrdersAsSeen } from '@/lib/utils/orders';
import { SellerProduct, Review, MakerStats } from '@/lib/types/seller-types';
import { Order } from '@/lib/types/order';

// Loading skeleton for heavy dashboard sections
function DashboardSectionSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton width={200} height={24} className="mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
          >
            <Skeleton width={80} height={32} className="mb-2" />
            <Skeleton width={120} height={16} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Skeleton height={300} className="rounded-xl" />
        <Skeleton height={300} className="rounded-xl" />
      </div>
    </div>
  );
}

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
  const shopName = makerProfile?.shopName || '';

  // Defensive defaults for makerProfile properties
  const products = makerProfile?.products || [];
  const recentOrders = makerProfile?.recentOrders || [];
  const reviews = makerProfile?.reviews || [];
  const stats = makerProfile?.stats || {
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    averageRating: 0,
    totalReviews: 0,
  };

  const [activeTab, setActiveTab] = useState<
    'overview' | 'analytics' | 'customers' | 'achievements' | 'orders' | 'products' | 'reviews'
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
    (
      tab:
        | 'overview'
        | 'analytics'
        | 'customers'
        | 'achievements'
        | 'orders'
        | 'products'
        | 'reviews'
    ) => {
      setActiveTab(tab);
      if (tab === 'orders' && newOrders.length > 0) {
        markAllOrdersAsSeen(shopName);
        setNewOrders([]);
      }
    },
    [newOrders.length, shopName]
  );

  const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 5);
  const outOfStockProducts = products.filter((p) => p.stock === 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader shopName={shopName} newOrderCount={newOrders.length} />
        <AlertsSection
          lowStockProducts={lowStockProducts}
          outOfStockProducts={outOfStockProducts}
          newOrders={newOrders}
          sellerName={shopName}
          onViewOrders={handleViewOrders}
        />
        <StatsGrid stats={stats} />
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md mb-6">
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            orderCount={recentOrders.length}
            productCount={products.length}
            reviewCount={reviews.length}
            newOrderCount={newOrders.length}
          />
          <div className="p-6">
            {activeTab === 'overview' && (
              <OverviewTab
                userEmail={user.email}
                shopName={shopName}
                products={products}
                recentOrders={recentOrders}
              />
            )}
            {activeTab === 'analytics' && (
              <LazyLoad fallback={<DashboardSectionSkeleton />}>
                <AnalyticsDashboard userEmail={user.email} />
              </LazyLoad>
            )}
            {activeTab === 'customers' && (
              <LazyLoad fallback={<DashboardSectionSkeleton />}>
                <CustomerInsights userEmail={user.email} />
              </LazyLoad>
            )}
            {activeTab === 'achievements' && (
              <LazyLoad fallback={<DashboardSectionSkeleton />}>
                <AchievementsTab userEmail={user.email} />
              </LazyLoad>
            )}
            {activeTab === 'orders' && <OrdersTab orders={recentOrders} />}
            {activeTab === 'products' && <ProductsTab products={products} />}
            {activeTab === 'reviews' && <ReviewsTab reviews={reviews} />}
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
