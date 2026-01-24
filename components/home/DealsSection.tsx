/**
 * @fileoverview Daily Deals Section Component
 * Displays a carousel of discounted products with a countdown timer for deal expiration.
 * Features responsive design with horizontal scroll on mobile and carousel navigation on desktop.
 * @module components/home/DealsSection
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

/**
 * @interface DealProduct
 * @extends Product
 * Extended product interface for deal items with additional pricing information
 */
interface DealProduct extends Product {
  /** Original price before discount */
  originalPrice: number;
  /** Discount percentage */
  discount: number;
  /** Optional promotional tag (e.g., "Mayor venta en 60+ dias") */
  dealTag?: string;
}

const DEAL_PRODUCTS: DealProduct[] = [
  {
    id: '1',
    name: 'Llavero Personalizado de Cuero',
    description: 'Llavero artesanal de cuero con grabado personalizado',
    price: 245,
    originalPrice: 490,
    discount: 50,
    currency: 'MXN',
    category: 'Joyería',
    state: 'Jalisco',
    maker: 'Taller de Cuero MX',
    images: ['https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=400'],
    inStock: true,
    featured: true,
    verified: true,
    dealTag: 'Mayor venta en 60+ días',
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: '2',
    name: 'Collar con Nombre Personalizado',
    description: 'Collar de plata con nombre grabado',
    price: 202,
    originalPrice: 270,
    discount: 25,
    currency: 'MXN',
    category: 'Joyería',
    state: 'Guerrero',
    maker: 'Platería Artesanal',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400'],
    inStock: true,
    featured: true,
    verified: true,
    dealTag: 'Mayor venta en 60+ días',
    rating: 4.9,
    reviewCount: 203,
  },
  {
    id: '3',
    name: 'Set de Ganchos de Madera',
    description: 'Ganchos artesanales de madera de nogal',
    price: 458,
    originalPrice: 655,
    discount: 30,
    currency: 'MXN',
    category: 'Decoración del Hogar',
    state: 'Michoacán',
    maker: 'Carpintería Tradicional',
    images: ['https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=400'],
    inStock: true,
    featured: true,
    verified: true,
    dealTag: 'Mayor venta en 60+ días',
    rating: 4.9,
    reviewCount: 94,
  },
  {
    id: '4',
    name: 'Conejito de Tela Relleno',
    description: 'Muñeco artesanal de tela con ropa intercambiable',
    price: 287,
    originalPrice: 1150,
    discount: 75,
    currency: 'MXN',
    category: 'Arte',
    state: 'Oaxaca',
    maker: 'Textiles Infantiles',
    images: ['https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=400'],
    inStock: true,
    featured: true,
    verified: true,
    dealTag: 'Mayor venta en 60+ días',
    rating: 4.9,
    reviewCount: 178,
  },
  {
    id: '5',
    name: 'Vela Aromática Artesanal',
    description: 'Vela de cera de soya con tapa de cobre',
    price: 139,
    originalPrice: 186,
    discount: 25,
    currency: 'MXN',
    category: 'Decoración del Hogar',
    state: 'Ciudad de México',
    maker: 'Aromas Mexicanos',
    images: ['https://images.unsplash.com/photo-1603006905003-be475563bc59?w=200'],
    inStock: true,
    featured: true,
    verified: true,
    dealTag: 'Mayor venta en 60+ días',
    rating: 4.5,
    reviewCount: 112,
  },
];

/** Number of items visible in the carousel at once */
const ITEMS_TO_SHOW = 4;

/**
 * Renders a deals carousel section with countdown timer and navigation.
 * Features horizontal scroll on mobile and animated carousel on desktop.
 * @returns {JSX.Element} The DealsSection component
 */
export default function DealsSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 1,
    minutes: 47,
    seconds: 32,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const maxIndex = Math.max(0, DEAL_PRODUCTS.length - ITEMS_TO_SHOW);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Ofertas del día
            </h2>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs sm:text-sm">
                Ofertas frescas en{' '}
                <span className="font-mono font-bold">
                  {String(timeLeft.hours).padStart(2, '0')}:
                  {String(timeLeft.minutes).padStart(2, '0')}:
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </span>
            </div>
          </div>

          {/* Navigation Arrows - Hidden on mobile */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
              aria-label="Anterior"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="p-2 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
              aria-label="Siguiente"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Products Carousel - Mobile: Horizontal Scroll, Desktop: Carousel */}
        <div className="overflow-hidden pb-2">
          {/* Mobile: Scrollable Grid */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-3 pb-2">
              {DEAL_PRODUCTS.map((product) => (
                <Link
                  key={product.id}
                  href={`/productos/${product.id}`}
                  className="shrink-0 w-[70vw] max-w-[280px]"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-3 flex-1 flex flex-col">
                      {/* Product Name */}
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 min-h-[40px]">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                          {product.rating}
                        </span>
                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                          ${product.price}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                        <span className="text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-sm">
                          {product.discount}% off
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="mt-auto space-y-1">
                        {product.dealTag && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                            {product.dealTag}
                          </p>
                        )}
                        {product.discount >= 30 && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                            Envío gratis
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop: Carousel */}
          <div className="hidden md:block">
            <div
              className="flex gap-4 lg:gap-6 transition-transform duration-300 ease-in-out items-stretch"
              style={{ transform: `translateX(-${currentIndex * 25.5}%)` }}
            >
              {DEAL_PRODUCTS.map((product) => (
                <Link
                  key={product.id}
                  href={`/productos/${product.id}`}
                  className="shrink-0 w-[calc(25%-18px)] min-w-[240px] group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col h-full">
                    {/* Image */}
                    <div className="relative h-56 lg:h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col min-h-0">
                      {/* Product Name */}
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 h-10 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                          {product.rating}
                        </span>
                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          ${product.price}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                        <span className="text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-sm">
                          {product.discount}% off
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="mt-auto space-y-1">
                        {product.dealTag && (
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {product.dealTag}
                          </p>
                        )}
                        {product.discount >= 30 && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                            Envío gratis
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* View All Link - Mobile Optimized */}
        <div className="mt-6 sm:mt-8 text-center">
          <Link
            href="/ofertas"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold text-base sm:text-lg"
          >
            Ver todas las ofertas
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
      </div>
    </section>
  );
}
