/**
 * @fileoverview Seasonal Products Section Component
 * Displays products filtered by seasonal themes (e.g., holidays, special occasions).
 * Automatically detects current and upcoming seasonal events and filters products
 * based on categories and keywords. Features a dynamic grid layout with theme selection.
 * @module components/home/SeasonalSection
 */

'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { SeasonalTheme, getCurrentSeasonalTheme, seasonalThemes, formatCurrency } from '@/lib';

/**
 * @interface SeasonalSectionProps
 * Props for the SeasonalSection component
 */
interface SeasonalSectionProps {
  /** Array of products to filter by seasonal theme */
  products: Product[];
}

/**
 * Adds days to a date string in MM-DD format
 * @param {string} dateStr - Date string in MM-DD format
 * @param {number} days - Number of days to add
 * @returns {string} New date string in MM-DD format
 */
const addDays = (dateStr: string, days: number): string => {
  const [month, day] = dateStr.split('-').map(Number);
  const date = new Date(2024, month - 1, day + days);
  const newMonth = String(date.getMonth() + 1).padStart(2, '0');
  const newDay = String(date.getDate()).padStart(2, '0');
  return `${newMonth}-${newDay}`;
};

/**
 * Checks if a seasonal theme is upcoming within the next 30 days
 * @param {SeasonalTheme} theme - The seasonal theme to check
 * @returns {boolean} True if the theme starts within 30 days
 */
const isUpcoming = (theme: SeasonalTheme): boolean => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const currentDate = `${month}-${day}`;

  const themeStart = theme.startDate;
  return themeStart >= currentDate && themeStart <= addDays(currentDate, 30);
};

/**
 * Renders a seasonal products section with theme filtering and dynamic grid layout.
 * @param {SeasonalSectionProps} props - Component props
 * @returns {JSX.Element | null} The SeasonalSection component or null if no active themes
 */
export default function SeasonalSection({ products }: SeasonalSectionProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [activeThemes, setActiveThemes] = useState<SeasonalTheme[]>([]);

  useEffect(() => {
    const active = seasonalThemes.filter((theme) => {
      const current = getCurrentSeasonalTheme();
      return current?.id === theme.id || isUpcoming(theme);
    });

    setActiveThemes(active);

    if (active.length > 0) {
      setSelectedTheme(active[0].id);
    }
  }, []);

  // Filter products based on selected seasonal theme
  const seasonalProducts = useMemo(() => {
    const theme = activeThemes.find((t) => t.id === selectedTheme);
    if (!theme) return [];

    return products
      .filter((product) => {
        // Match by category
        const categoryMatch = theme.categories.some((cat) =>
          product.category.toLowerCase().includes(cat.toLowerCase())
        );

        // Match by keywords in name or description
        const keywordMatch = theme.keywords.some(
          (keyword) =>
            product.name.toLowerCase().includes(keyword.toLowerCase()) ||
            product.description.toLowerCase().includes(keyword.toLowerCase())
        );

        return categoryMatch || keywordMatch;
      })
      .slice(0, 6); // Limit to 6 products for the grid
  }, [products, selectedTheme, activeThemes]);

  if (activeThemes.length === 0) {
    return null;
  }

  const currentTheme = activeThemes.find((t) => t.id === selectedTheme) || activeThemes[0];

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seasonal Filters */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Compra por temporada:
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {activeThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-semibold transition-all ${
                  selectedTheme === theme.id
                    ? `${theme.bgColor} ${theme.color} shadow-md`
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {theme.icon} {theme.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {seasonalProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-3 md:h-[400px]">
              {/* Left Panel - Info Card */}
              <div
                className={`md:col-span-4 ${currentTheme.bgColor} rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-between shadow-md dark:shadow-gray-900/50`}
              >
                <div>
                  <span className="inline-block bg-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase text-gray-900 mb-2 sm:mb-3">
                    {currentTheme.categories[0]}
                  </span>
                  <h3
                    className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 ${currentTheme.color}`}
                  >
                    Regalos especiales para {currentTheme.name}
                  </h3>
                  <p className="text-gray-700 text-sm mb-3 sm:mb-4">{currentTheme.description}</p>
                </div>
                <Link
                  href={`/productos?q=${currentTheme.keywords[0]}`}
                  className="block bg-white text-center text-gray-900 px-4 sm:px-5 py-2 rounded-full font-bold hover:bg-gray-100 transition text-sm shadow-xs"
                >
                  Inspírate
                </Link>
              </div>

              {/* Product Grid */}
              <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
                {seasonalProducts.map((product, index) => {
                  const sizes = [
                    'md:col-span-4 md:row-span-2', // Large
                    'md:col-span-2 md:row-span-1', // Small
                    'md:col-span-2 md:row-span-2', // Tall
                    'md:col-span-2 md:row-span-1', // Small
                    'md:col-span-2 md:row-span-1', // Small
                    'md:col-span-2 md:row-span-1', // Small
                  ];

                  const sizeClass = sizes[index % sizes.length];

                  return (
                    <Link
                      key={product.id}
                      href={`/productos/${product.id}`}
                      className={`${sizeClass} col-span-1 group relative rounded-lg sm:rounded-xl overflow-hidden shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300 h-32 sm:h-40 md:h-auto`}
                    >
                      {/* Image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                      </div>

                      {/* Price Badge */}
                      <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 bg-white text-gray-900 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                        {formatCurrency(product.price)}
                      </div>

                      {/* Product Name */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-white sm:transform sm:translate-y-full sm:group-hover:translate-y-0 sm:transition-transform sm:duration-300 bg-linear-to-t from-black/60 to-transparent sm:bg-transparent">
                        <p className="font-semibold text-xs sm:text-sm line-clamp-2">
                          {product.name}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* View All Link */}
            <div className="mt-4 sm:mt-6 text-center">
              <Link
                href={`/productos?q=${currentTheme.keywords[0]}`}
                className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold text-sm sm:text-base"
              >
                Ver toda la colección
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
            <p className="text-gray-600 dark:text-gray-400">
              No hay productos disponibles para esta temporada.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
