'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { getUserFavorites, type FavoriteProduct } from '@/lib/api/sellerApi';
import { formatCurrency, ROUTES } from '@/lib';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import type { Product } from '@/types';
import type { User } from '@/contexts/AuthContext';
import {
  Heart,
  ShoppingCart,
  Grid3x3,
  List,
  Share2,
  Filter,
  SortAsc,
  Package,
  Search,
  X,
  AlertCircle,
} from 'lucide-react';
import EmptyState from '@/components/common/EmptyState';
import FavoriteCard from '@/components/product/FavoriteCard';
import FavoriteListItem from '@/components/product/FavoriteListItem';

type ViewMode = 'grid' | 'list';
type SortOption = 'recent' | 'name' | 'price-low' | 'price-high';

export default function FavoritesPage() {
  return (
    <AuthPageWrapper loadingText="Cargando favoritos...">
      {(user) => <FavoritesContent user={user} />}
    </AuthPageWrapper>
  );
}

function FavoritesContent({ user }: { user: User }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priceRangeFilter, setPriceRangeFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');

  useEffect(() => {
    async function loadFavorites() {
      setIsLoading(true);
      const data = await getUserFavorites(user.email);
      setFavorites(data);
      setIsLoading(false);
    }
    loadFavorites();
  }, [user.email]);

  const handleRemoveFavorite = useCallback(
    (productId: string) => {
      setFavorites((prev) => prev.filter((item) => item.id !== productId));
      showToast('Producto eliminado de favoritos', 'success');
    },
    [showToast]
  );

  const handleAddToCart = useCallback(
    (favorite: FavoriteProduct) => {
      const product: Product = {
        id: favorite.id,
        name: favorite.name,
        description: favorite.description,
        price: favorite.price,
        currency: favorite.currency,
        category: favorite.category,
        subcategory: favorite.subcategory,
        state: favorite.state,
        maker: favorite.maker,
        images: favorite.images,
        inStock: favorite.inStock,
        featured: favorite.featured,
        verified: favorite.verified,
        rating: favorite.rating,
        reviewCount: favorite.reviewCount,
      };

      addToCart(product, 1);
      showToast('Producto agregado al carrito', 'success');
    },
    [addToCart, showToast]
  );

  if (isLoading) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando favoritos..." />;
  }

  const handleAddAllToCart = () => {
    let itemsAdded = 0;
    const filteredItems = getFilteredFavorites();

    filteredItems.forEach((favorite) => {
      if (favorite.inStock) {
        const product: Product = {
          id: favorite.id,
          name: favorite.name,
          description: favorite.description,
          price: favorite.price,
          currency: favorite.currency,
          category: favorite.category,
          subcategory: favorite.subcategory,
          state: favorite.state,
          maker: favorite.maker,
          images: favorite.images,
          inStock: favorite.inStock,
          featured: favorite.featured,
          verified: favorite.verified,
          rating: favorite.rating,
          reviewCount: favorite.reviewCount,
        };
        addToCart(product, 1);
        itemsAdded++;
      }
    });

    if (itemsAdded > 0) {
      showToast(
        `${itemsAdded} ${itemsAdded === 1 ? 'producto agregado' : 'productos agregados'} al carrito`,
        'success'
      );
      router.push(ROUTES.CART);
    } else {
      showToast('No hay productos disponibles para agregar', 'info');
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}${ROUTES.WISHLIST}`;
    navigator.clipboard.writeText(url);
    showToast('Enlace de lista copiado al portapapeles', 'success');
  };

  const clearFilters = () => {
    setCategoryFilter('all');
    setPriceRangeFilter('all');
    setStockFilter('all');
  };

  // Get unique categories from favorites
  const categories = Array.from(new Set(favorites.map((f) => f.category)));

  // Filter favorites
  const getFilteredFavorites = () => {
    return favorites.filter((fav) => {
      // Category filter
      if (categoryFilter !== 'all' && fav.category !== categoryFilter) {
        return false;
      }

      // Price range filter
      if (priceRangeFilter !== 'all') {
        const price = fav.price;
        switch (priceRangeFilter) {
          case 'under-500':
            if (price >= 500) return false;
            break;
          case '500-1500':
            if (price < 500 || price >= 1500) return false;
            break;
          case '1500-3000':
            if (price < 1500 || price >= 3000) return false;
            break;
          case 'over-3000':
            if (price < 3000) return false;
            break;
        }
      }

      // Stock filter
      if (stockFilter === 'instock' && !fav.inStock) {
        return false;
      }
      if (stockFilter === 'outofstock' && fav.inStock) {
        return false;
      }

      return true;
    });
  };

  const filteredFavorites = getFilteredFavorites();

  // Sort favorites
  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const hasActiveFilters =
    categoryFilter !== 'all' || priceRangeFilter !== 'all' || stockFilter !== 'all';

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                Mis Favoritos
              </h1>
              <p className="text-gray-600 mt-1">
                {favorites.length} {favorites.length === 1 ? 'producto' : 'productos'} guardados
              </p>
            </div>

            {favorites.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Compartir</span>
                </button>
                <button
                  onClick={handleAddAllToCart}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Agregar Todo al Carrito</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md">
            <EmptyState
              title="Tu lista de favoritos está vacía"
              description="Explora productos artesanales y guarda tus favoritos para verlos más tarde"
              icon={<Heart className="w-12 h-12" />}
              size="lg"
              action={{
                label: 'Explorar Productos',
                href: ROUTES.PRODUCTS,
                icon: <Package className="w-5 h-5" />,
              }}
            />
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex flex-col gap-4">
                {/* Top Row - View & Sort Controls */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Filter Toggle Button */}
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                        showFilters || hasActiveFilters
                          ? 'bg-primary-600 text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Filter className="w-5 h-5" />
                      Filtros
                      {hasActiveFilters && (
                        <span className="px-2 py-0.5 bg-white text-primary-600 rounded-full text-xs font-bold">
                          {
                            [
                              categoryFilter !== 'all',
                              priceRangeFilter !== 'all',
                              stockFilter !== 'all',
                            ].filter(Boolean).length
                          }
                        </span>
                      )}
                    </button>

                    {/* View Toggle */}
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded transition ${
                          viewMode === 'grid'
                            ? 'bg-white shadow-xs text-primary-600'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <Grid3x3 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded transition ${
                          viewMode === 'list'
                            ? 'bg-white shadow-xs text-primary-600'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <List className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2">
                      <SortAsc className="w-5 h-5 text-gray-600" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                      >
                        <option value="recent">Agregados recientemente</option>
                        <option value="name">Nombre (A-Z)</option>
                        <option value="price-low">Precio: Menor a Mayor</option>
                        <option value="price-high">Precio: Mayor a Menor</option>
                      </select>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{sortedFavorites.filter((f) => f.inStock).length} disponibles</span>
                    <span>•</span>
                    <span>
                      Total:{' '}
                      <strong className="text-primary-600">
                        {formatCurrency(sortedFavorites.reduce((sum, f) => sum + f.price, 0))}
                      </strong>
                    </span>
                  </div>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Category Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Categoría
                        </label>
                        <select
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        >
                          <option value="all">Todas las categorías</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Price Range Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rango de Precio
                        </label>
                        <select
                          value={priceRangeFilter}
                          onChange={(e) => setPriceRangeFilter(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        >
                          <option value="all">Todos los precios</option>
                          <option value="under-500">Menos de $500</option>
                          <option value="500-1500">$500 - $1,500</option>
                          <option value="1500-3000">$1,500 - $3,000</option>
                          <option value="over-3000">Más de $3,000</option>
                        </select>
                      </div>

                      {/* Stock Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Disponibilidad
                        </label>
                        <select
                          value={stockFilter}
                          onChange={(e) => setStockFilter(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        >
                          <option value="all">Todos</option>
                          <option value="instock">En stock</option>
                          <option value="outofstock">Agotados</option>
                        </select>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <AlertCircle className="w-4 h-4" />
                          <span>
                            Mostrando {sortedFavorites.length} de {favorites.length} productos
                          </span>
                        </div>
                        <button
                          onClick={clearFilters}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
                        >
                          <X className="w-4 h-4" />
                          Limpiar filtros
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* No Results Message */}
            {sortedFavorites.length === 0 && hasActiveFilters && (
              <div className="bg-white rounded-xl shadow-md">
                <EmptyState
                  title="No se encontraron productos"
                  description="Intenta ajustar los filtros para ver más resultados"
                  icon={<Search className="w-12 h-12" />}
                  action={{
                    label: 'Limpiar Filtros',
                    onClick: clearFilters,
                    icon: <X className="w-5 h-5" />,
                  }}
                />
              </div>
            )}

            {/* Products Grid/List */}
            {sortedFavorites.length > 0 && (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedFavorites.map((favorite) => (
                      <FavoriteCard
                        key={favorite.id}
                        favorite={favorite}
                        onAddToCart={handleAddToCart}
                        onRemove={handleRemoveFavorite}
                      />
                    ))}
                  </div>
                ) : (
                  // List View
                  <div className="space-y-4">
                    {sortedFavorites.map((favorite) => (
                      <FavoriteListItem
                        key={favorite.id}
                        favorite={favorite}
                        onAddToCart={handleAddToCart}
                        onRemove={handleRemoveFavorite}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
