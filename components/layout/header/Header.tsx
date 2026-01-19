'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield,
  FileCheck,
  Menu,
  X,
  Search,
  ShoppingCart,
  Gift,
  ShoppingBag,
  User,
} from 'lucide-react';
import SearchModal from '@/components/ui/SearchModal';
import AdminBanner from './AdminBanner';
import UserDropdown from './UserDropdown';
import MobileMenu from './MobileMenu';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types';
import { ROUTES } from '@/lib/constants/routes';
import { SITE_NAME } from '@/config/site';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const { cartCount } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  // Load products and categories for search
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        const result = await response.json();
        const productsArray: Product[] = result.data || [];
        setProducts(productsArray);
        setCategories([...new Set(productsArray.map((p) => p.category))]);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        {isAdmin && <AdminBanner />}

        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center gap-3">
            {/* Logo */}
            <Link href={ROUTES.HOME} className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="/logos/papalote-logo.png"
                alt="Papalote Market"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10"
                priority
              />
              <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 hidden sm:block">
                {SITE_NAME}
              </span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-xl xl:max-w-2xl mx-4">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-left"
                aria-label="Abrir búsqueda"
              >
                <Search className="w-5 h-5 text-gray-400" aria-hidden="true" />
                <span className="text-gray-500 truncate">Buscar productos...</span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-6">
              {/* Search - Medium screens */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="lg:hidden text-gray-700 hover:text-primary-600"
                aria-label="Buscar"
              >
                <Search className="h-6 w-6" />
              </button>

              {/* Admin: Verificaciones */}
              {isAdmin && (
                <Link
                  href={ROUTES.ADMIN_VERIFICACIONES}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition"
                >
                  <FileCheck className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span className="font-medium hidden lg:block">Verificaciones</span>
                </Link>
              )}

              {/* Regular: Regalos */}
              {!isAdmin && (
                <Link
                  href="/regalos"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition"
                >
                  <Gift className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span className="font-medium hidden lg:block">Regalos</span>
                </Link>
              )}

              {/* Productos */}
              <Link
                href={ROUTES.PRODUCTS}
                className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition"
              >
                <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="font-medium hidden lg:block">Productos</span>
              </Link>

              {/* Cart - Regular users only */}
              {!isAdmin && (
                <Link
                  href={ROUTES.CART}
                  className="relative flex items-center text-gray-700 hover:text-primary-600 transition"
                  aria-label={`Carrito${cartCount > 0 ? `, ${cartCount} productos` : ''}`}
                >
                  <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}

              {/* User Menu */}
              {isAuthenticated && user ? (
                <UserDropdown user={user} isAdmin={isAdmin} onLogout={handleLogout} />
              ) : (
                <Link
                  href={ROUTES.LOGIN}
                  className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition"
                >
                  <User className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span className="font-medium hidden lg:block">Iniciar Sesión</span>
                </Link>
              )}

              {/* CTA Button */}
              {isAdmin ? (
                <Link
                  href={ROUTES.ADMIN}
                  className="flex items-center gap-2 bg-purple-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-purple-700 transition font-medium text-sm lg:text-base"
                >
                  <Shield className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span>Admin</span>
                </Link>
              ) : (
                <Link
                  href="/vender"
                  className="flex items-center gap-2 bg-primary-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-primary-700 transition font-medium text-sm lg:text-base"
                >
                  <svg
                    className="w-4 h-4 lg:w-5 lg:h-5"
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
              )}
            </div>

            {/* Mobile Icons */}
            <div className="md:hidden flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="text-gray-700 hover:text-primary-600"
                aria-label="Buscar"
              >
                <Search className="h-6 w-6" />
              </button>

              {!isAdmin && (
                <Link
                  href={ROUTES.CART}
                  className="relative text-gray-700 hover:text-primary-600"
                  aria-label={`Carrito${cartCount > 0 ? `, ${cartCount} productos` : ''}`}
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`hover:text-primary-600 ${isAdmin ? 'text-purple-600' : 'text-gray-700'}`}
                aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <MobileMenu
              user={user}
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
              onClose={() => setMobileMenuOpen(false)}
              onLogout={handleLogout}
            />
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
