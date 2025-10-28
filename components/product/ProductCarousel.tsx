'use client';

import { useState } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  viewAllLink?: string;
  itemsToShow?: number;
}

export default function ProductCarousel({
  products,
  title,
  viewAllLink,
  itemsToShow = 4
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(0, products.length - itemsToShow);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            
            {viewAllLink && (
              <a
                href={viewAllLink}
                className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1"
              >
                Ver todos
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>
        )}

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {products.length > itemsToShow && (
            <>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                aria-label="Anterior"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                aria-label="Siguiente"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Products Grid/Carousel */}
          <div className="overflow-hidden pb-4">
            <div
              className="flex gap-6 transition-transform duration-300 ease-in-out items-stretch"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsToShow + 1.5)}%)`
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / itemsToShow}% - ${(itemsToShow - 1) * 24 / itemsToShow}px)` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}