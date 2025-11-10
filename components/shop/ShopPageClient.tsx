'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { User } from '@/contexts/AuthContext';
import ShopHeader from './ShopHeader';
import ShopStats from './ShopStats';
import ShopAbout from './ShopAbout';
import ShopProducts from './ShopProducts';
import ShopReviews from './ShopReviews';
import ShopPolicies from './ShopPolicies';

interface ShopPageClientProps {
  shop: User;
  products: Product[];
}

export default function ShopPageClient({ shop, products }: ShopPageClientProps) {
  const [activeTab, setActiveTab] = useState<'productos' | 'resenas' | 'info'>('productos');

  const profile = shop.makerProfile!;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop Header */}
      <ShopHeader shop={shop} />

      {/* Shop Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ShopStats stats={profile.stats} />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('productos')}
              className={`py-4 font-medium text-sm border-b-2 transition ${
                activeTab === 'productos'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Productos ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('resenas')}
              className={`py-4 font-medium text-sm border-b-2 transition ${
                activeTab === 'resenas'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Reseñas ({profile.reviews.length})
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`py-4 font-medium text-sm border-b-2 transition ${
                activeTab === 'info'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Información
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'productos' && (
          <ShopProducts products={products} shopName={profile.shopName} />
        )}
        {activeTab === 'resenas' && <ShopReviews reviews={profile.reviews} />}
        {activeTab === 'info' && (
          <div className="space-y-8">
            <ShopAbout profile={profile} />
            <ShopPolicies profile={profile} />
          </div>
        )}
      </div>
    </div>
  );
}
