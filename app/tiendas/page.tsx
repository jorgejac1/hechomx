'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { User } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Store, Package, Search, Filter, Award, X } from 'lucide-react';
import Drawer from '@/components/common/Drawer';
import EmptyState from '@/components/common/EmptyState';
import ShopCard from '@/components/shop/ShopCard';

type ShopFilter = 'all' | 'individual' | 'artisan' | 'company';

export default function TiendasPage() {
  const [shops, setShops] = useState<User[]>([]);
  const [filteredShops, setFilteredShops] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ShopFilter>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Fetch shops from API to avoid bundling mock data
    async function fetchShops() {
      try {
        const response = await fetch('/api/shops');
        const data = await response.json();
        if (data.success) {
          setShops(data.data);
          setFilteredShops(data.data);
        }
      } catch (error) {
        console.error('[tiendas] Failed to fetch shops:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchShops();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = shops;

    // Filter by seller type
    if (activeFilter !== 'all') {
      filtered = filtered.filter((shop) => shop.makerProfile?.sellerType === activeFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (shop) =>
          shop.makerProfile?.shopName.toLowerCase().includes(query) ||
          shop.makerProfile?.location.toLowerCase().includes(query) ||
          shop.makerProfile?.description.toLowerCase().includes(query)
      );
    }

    setFilteredShops(filtered);
  }, [activeFilter, searchQuery, shops]);

  if (isLoading) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando tiendas..." />;
  }

  const breadcrumbItems = [{ label: 'Inicio', href: '/' }, { label: 'Tiendas' }];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumbs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-linear-to-r from-primary-600 to-primary-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Store className="w-8 h-8" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Tiendas Artesanales</h1>
            </div>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Descubre talleres y artesanos de toda México. Cada tienda cuenta una historia única.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                <span>{shops.length} Tiendas</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                <span>
                  {shops.reduce(
                    (acc, shop) => acc + (shop.makerProfile?.stats.productsCount || 0),
                    0
                  )}{' '}
                  Productos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>100% Auténtico</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Buscar por nombre, ubicación o descripción..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle Button (Mobile) */}
            <button
              onClick={() => setShowFilters(true)}
              className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <Filter className="w-5 h-5" />
              Filtros
              {activeFilter !== 'all' && (
                <span className="px-2 py-0.5 bg-primary-600 text-white rounded-full text-xs font-bold">
                  1
                </span>
              )}
            </button>
          </div>

          {/* Filter Buttons (Desktop) */}
          <div className="hidden sm:flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeFilter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Todas ({shops.length})
            </button>
            <button
              onClick={() => setActiveFilter('individual')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeFilter === 'individual'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Individuales (
              {shops.filter((s) => s.makerProfile?.sellerType === 'individual').length})
            </button>
            <button
              onClick={() => setActiveFilter('artisan')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeFilter === 'artisan'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Artesanos ({shops.filter((s) => s.makerProfile?.sellerType === 'artisan').length})
            </button>
            <button
              onClick={() => setActiveFilter('company')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeFilter === 'company'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Empresas ({shops.filter((s) => s.makerProfile?.sellerType === 'company').length})
            </button>
          </div>

          {/* Mobile Filters Drawer */}
          <Drawer
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            title="Filtrar Tiendas"
            position="bottom"
            size="md"
          >
            <div className="space-y-3">
              <button
                onClick={() => {
                  setActiveFilter('all');
                  setShowFilters(false);
                }}
                className={`w-full px-4 py-3 rounded-lg font-medium transition text-left ${
                  activeFilter === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Todas las tiendas ({shops.length})
              </button>
              <button
                onClick={() => {
                  setActiveFilter('individual');
                  setShowFilters(false);
                }}
                className={`w-full px-4 py-3 rounded-lg font-medium transition text-left ${
                  activeFilter === 'individual'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Individuales (
                {shops.filter((s) => s.makerProfile?.sellerType === 'individual').length})
              </button>
              <button
                onClick={() => {
                  setActiveFilter('artisan');
                  setShowFilters(false);
                }}
                className={`w-full px-4 py-3 rounded-lg font-medium transition text-left ${
                  activeFilter === 'artisan'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Artesanos ({shops.filter((s) => s.makerProfile?.sellerType === 'artisan').length})
              </button>
              <button
                onClick={() => {
                  setActiveFilter('company');
                  setShowFilters(false);
                }}
                className={`w-full px-4 py-3 rounded-lg font-medium transition text-left ${
                  activeFilter === 'company'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Empresas ({shops.filter((s) => s.makerProfile?.sellerType === 'company').length})
              </button>
            </div>
          </Drawer>

          {/* Active Filters Summary */}
          {(searchQuery || activeFilter !== 'all') && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mostrando {filteredShops.length} de {shops.length} tiendas
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('all');
                  }}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Shops Grid */}
        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50">
            <EmptyState
              title="No se encontraron tiendas"
              description="Intenta ajustar tus filtros o búsqueda"
              icon={<Store className="w-12 h-12" />}
              action={{
                label: 'Ver todas las tiendas',
                onClick: () => {
                  setSearchQuery('');
                  setActiveFilter('all');
                },
                icon: <X className="w-5 h-5" />,
              }}
            />
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-r from-primary-600 to-primary-800 text-white py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">¿Eres artesano? Abre tu tienda</h2>
          <p className="text-lg text-primary-100 mb-6">
            Únete a nuestra comunidad y comparte tus creaciones con miles de clientes
          </p>
          <Link
            href="/vender"
            className="inline-block px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition font-bold"
          >
            Empezar a Vender
          </Link>
        </div>
      </div>
    </div>
  );
}
