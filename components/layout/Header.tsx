'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import SearchModal from '@/components/ui/SearchModal';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types';
import { ROUTES } from '@/lib/constants/routes';
import { getShopSlug } from '@/lib/utils/shop';
import { SITE_NAME } from '@/config/site';
import {
  User,
  LogOut,
  Heart,
  Package,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Store,
} from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  // Load products and categories for search
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        const result = await response.json();

        // API returns { success, count, data }
        const productsArray: Product[] = result.data || [];
        setProducts(productsArray);

        // Extract unique categories
        const uniqueCategories: string[] = [...new Set(productsArray.map((p) => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center gap-3">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href={ROUTES.HOME} className="flex items-center gap-2">
                <span className="text-2xl">🇲🇽</span>
                <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 hidden sm:block">
                  {SITE_NAME}
                </span>
              </Link>
            </div>

            {/* Search Bar - DESKTOP */}
            <div className="hidden lg:flex flex-1 max-w-xl xl:max-w-2xl mx-4">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-left"
              >
                <svg
                  className="w-5 h-5 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-gray-500 truncate">Buscar productos...</span>
              </button>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 lg:gap-4">
              {/* Search Icon - MEDIUM SCREENS */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="hidden md:flex lg:hidden text-gray-700 hover:text-primary-600 flex-shrink-0"
                aria-label="Buscar"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex md:items-center md:gap-3 lg:gap-4 xl:gap-6">
                {/* Regalos */}
                <Link
                  href="/regalos"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition"
                  title="Regalos"
                >
                  <svg
                    className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                  <span className="font-medium hidden lg:block">Regalos</span>
                </Link>

                {/* Productos */}
                <Link
                  href={ROUTES.PRODUCTS}
                  className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition"
                  title="Productos"
                >
                  <svg
                    className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span className="font-medium hidden lg:block">Productos</span>
                </Link>

                {/* Carrito */}
                <Link
                  href={ROUTES.CART}
                  className="relative flex items-center text-gray-700 hover:text-primary-600 transition"
                  title="Carrito"
                >
                  <svg
                    className="w-5 h-5 lg:w-6 lg:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* User Menu - Desktop */}
                {isAuthenticated ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-1.5 text-gray-700 hover:text-primary-600 transition"
                      title={user?.name}
                    >
                      {user?.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <User className="w-6 h-6" />
                      )}
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* User Dropdown */}
                    {isUserMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setIsUserMenuOpen(false)}
                        />
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                          <div className="px-4 py-3 border-b border-gray-200">
                            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                          </div>
                          <Link
                            href={ROUTES.PROFILE}
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <User className="w-4 h-4" />
                            Mi Perfil
                          </Link>
                          {user?.makerProfile && (
                            <Link
                              href={`/tienda/${getShopSlug(user.makerProfile.shopName)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 font-medium"
                            >
                              <Store className="w-4 h-4" />
                              Ver Mi Tienda
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          )}
                          <Link
                            href={ROUTES.ORDERS}
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Package className="w-4 h-4" />
                            Mis Pedidos
                          </Link>
                          <Link
                            href={ROUTES.WISHLIST}
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Heart className="w-4 h-4" />
                            Favoritos
                          </Link>
                          <Link
                            href={ROUTES.MY_IMPACT}
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Sparkles className="w-4 h-4" />
                            Mi Impacto
                          </Link>

                          {/* Seller Tools Section - NEW */}
                          {user?.makerProfile && (
                            <>
                              <div className="border-t border-gray-200 my-2" />
                              <div className="px-4 py-2">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                  Herramientas
                                </p>
                              </div>
                              <Link
                                href={ROUTES.MY_STORY}
                                onClick={() => setIsUserMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition"
                              >
                                <Sparkles className="w-4 h-4" />
                                Mi Historia Artesanal
                              </Link>
                              <Link
                                href={ROUTES.PRICING_CALCULATOR}
                                onClick={() => setIsUserMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                  />
                                </svg>
                                Calculadora de Precios
                              </Link>
                            </>
                          )}

                          <div className="border-t border-gray-200 my-2" />
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            Cerrar Sesión
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <Link
                    href={ROUTES.LOGIN}
                    className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition"
                    title="Iniciar Sesión"
                  >
                    <svg
                      className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="font-medium hidden lg:block">Iniciar Sesión</span>
                  </Link>
                )}

                {/* Vender Button */}
                <Link
                  href="/vender"
                  className="flex items-center gap-1.5 lg:gap-2 bg-primary-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-primary-700 transition font-medium text-sm lg:text-base whitespace-nowrap flex-shrink-0"
                >
                  <svg
                    className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Vender</span>
                </Link>
              </div>

              {/* Mobile Icons */}
              <div className="md:hidden flex items-center gap-3 sm:gap-4">
                {/* Mobile Search */}
                <button
                  onClick={() => setSearchModalOpen(true)}
                  className="text-gray-700 hover:text-primary-600"
                  aria-label="Buscar"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                {/* Mobile Cart */}
                <Link
                  href={ROUTES.CART}
                  className="relative text-gray-700 hover:text-primary-600"
                  aria-label="Carrito"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-700 hover:text-primary-600"
                  aria-label="Menú"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {mobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 pt-2 border-t">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/regalos"
                  className="flex items-center gap-3 text-gray-700 hover:text-primary-600 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                  Regalos
                </Link>

                <Link
                  href={ROUTES.PRODUCTS}
                  className="flex items-center gap-3 text-gray-700 hover:text-primary-600 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Productos
                </Link>

                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3 pt-2 pb-4 border-t border-gray-200">
                      {user?.avatar && (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      )}
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-600">{user?.email}</p>
                      </div>
                    </div>
                    {user?.makerProfile && (
                      <Link
                        href={`/tienda/${getShopSlug(user.makerProfile.shopName)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-primary-50 text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-100 font-semibold"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Store className="w-5 h-5" />
                        Ver Mi Tienda
                        <ExternalLink className="w-4 h-4 ml-auto" />
                      </Link>
                    )}
                    <Link
                      href={ROUTES.PROFILE}
                      className="flex items-center gap-3 text-gray-700 hover:text-primary-600 font-medium py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      Mi Perfil
                    </Link>
                    <Link
                      href={ROUTES.ORDERS}
                      className="flex items-center gap-3 text-gray-700 hover:text-primary-600 font-medium py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Package className="w-5 h-5" />
                      Mis Pedidos
                    </Link>
                    <Link
                      href={ROUTES.WISHLIST}
                      className="flex items-center gap-3 text-gray-700 hover:text-primary-600 font-medium py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Heart className="w-5 h-5" />
                      Favoritos
                    </Link>
                    <Link
                      href={ROUTES.MY_IMPACT}
                      className="flex items-center gap-3 text-gray-700 hover:text-primary-600 font-medium py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Sparkles className="w-5 h-5" />
                      Mi Impacto
                    </Link>

                    {/* Seller Tools - Mobile - NEW */}
                    {user?.makerProfile && (
                      <>
                        <div className="border-t border-gray-200 my-2" />
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                          Herramientas de Vendedor
                        </p>
                        <Link
                          href={ROUTES.MY_STORY}
                          className="flex items-center gap-3 text-purple-600 hover:text-purple-700 font-medium py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Sparkles className="w-5 h-5" />
                          Mi Historia Artesanal
                        </Link>
                        <Link
                          href={ROUTES.PRICING_CALCULATOR}
                          className="flex items-center gap-3 text-blue-600 hover:text-blue-700 font-medium py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          Calculadora de Precios
                        </Link>
                      </>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 text-red-600 hover:text-red-700 font-medium py-2"
                    >
                      <LogOut className="w-5 h-5" />
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <Link
                    href={ROUTES.LOGIN}
                    className="flex items-center gap-3 text-gray-700 hover:text-primary-600 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Iniciar Sesión
                  </Link>
                )}

                <Link
                  href="/vender"
                  className="flex items-center gap-3 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Vender
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        products={products}
        categories={categories}
      />
    </>
  );
}
