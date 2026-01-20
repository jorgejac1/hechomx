'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User } from '@/contexts/AuthContext';
import { getAllShops, getShopSlug } from '@/lib/utils/shop';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import {
  Store,
  MapPin,
  Star,
  Package,
  Search,
  Filter,
  CheckCircle2,
  Award,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

type ShopFilter = 'all' | 'individual' | 'artisan' | 'company';

export default function TiendasPage() {
  const [shops, setShops] = useState<User[]>([]);
  const [filteredShops, setFilteredShops] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ShopFilter>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Load all shops
    const allShops = getAllShops();
    setShops(allShops);
    setFilteredShops(allShops);
    setIsLoading(false);
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

  const getBadgeInfo = (badge?: string) => {
    switch (badge) {
      case 'verified':
        return { icon: CheckCircle2, label: 'Verificado', color: 'text-blue-600 bg-blue-100' };
      case 'top_seller':
        return { icon: TrendingUp, label: 'Top Vendedor', color: 'text-green-600 bg-green-100' };
      case 'artisan_certified':
        return {
          icon: Award,
          label: 'Artesano Certificado',
          color: 'text-purple-600 bg-purple-100',
        };
      case 'eco_friendly':
        return { icon: Sparkles, label: 'Eco-Friendly', color: 'text-emerald-600 bg-emerald-100' };
      default:
        return null;
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando tiendas..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, ubicación o descripción..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Filter className="w-5 h-5" />
              Filtros
            </button>
          </div>

          {/* Filter Buttons */}
          <div
            className={`${
              showFilters ? 'flex' : 'hidden'
            } sm:flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200`}
          >
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeFilter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas ({shops.length})
            </button>
            <button
              onClick={() => setActiveFilter('individual')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeFilter === 'individual'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Artesanos ({shops.filter((s) => s.makerProfile?.sellerType === 'artisan').length})
            </button>
            <button
              onClick={() => setActiveFilter('company')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeFilter === 'company'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Empresas ({shops.filter((s) => s.makerProfile?.sellerType === 'company').length})
            </button>
          </div>

          {/* Active Filters Summary */}
          {(searchQuery || activeFilter !== 'all') && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Mostrando {filteredShops.length} de {shops.length} tiendas
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('all');
                  }}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
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
            {filteredShops.map((shop) => {
              const profile = shop.makerProfile!;
              const badgeInfo = getBadgeInfo(profile.verificationBadge);
              const BadgeIcon = badgeInfo?.icon;

              return (
                <Link
                  key={shop.id}
                  href={`/tienda/${getShopSlug(profile.shopName)}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group"
                >
                  {/* Shop Header with Avatar */}
                  <div className="relative h-32 bg-linear-to-br from-primary-100 to-primary-200">
                    <div className="absolute -bottom-12 left-6">
                      <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                        {shop.avatar ? (
                          <Image
                            src={shop.avatar}
                            alt={profile.shopName}
                            width={96}
                            height={96}
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <Store className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>
                    {badgeInfo && BadgeIcon && (
                      <div
                        className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 ${badgeInfo.color} rounded-full text-xs font-semibold`}
                      >
                        <BadgeIcon className="w-3 h-3" />
                        {badgeInfo.label}
                      </div>
                    )}
                  </div>

                  {/* Shop Info */}
                  <div className="pt-14 px-6 pb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">
                      {profile.shopName}
                    </h3>

                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 shrink-0" />
                      {profile.location}
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{profile.description}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <p className="font-bold text-gray-900">
                            {profile.stats.rating.toFixed(1)}
                          </p>
                        </div>
                        <p className="text-xs text-gray-600">
                          {profile.stats.reviewsCount} reseñas
                        </p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="font-bold text-gray-900 mb-1">
                          {profile.stats.productsCount}
                        </p>
                        <p className="text-xs text-gray-600">Productos</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="font-bold text-gray-900 mb-1">{profile.stats.salesCount}</p>
                        <p className="text-xs text-gray-600">Ventas</p>
                      </div>
                    </div>

                    {/* Specialties */}
                    {profile.specialties && profile.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {profile.specialties.slice(0, 2).map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                        {profile.specialties.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-sm">
                            +{profile.specialties.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron tiendas</h3>
            <p className="text-gray-600 mb-6">Intenta ajustar tus filtros o búsqueda</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
            >
              Ver todas las tiendas
            </button>
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
