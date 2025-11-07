'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import SearchModal from '@/components/ui/SearchModal';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import { ROUTES } from '@/lib/constants/routes';
import { SITE_NAME } from '@/config/site';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const { cartCount } = useCart();

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data: { data: Product[] }) => {
        const productData = data.data || [];
        setProducts(productData);
        const uniqueCategories: string[] = [...new Set(productData.map((p) => p.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

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

                {/* Iniciar Sesión */}
                <Link
                  href="/login"
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

                <Link
                  href="/login"
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
