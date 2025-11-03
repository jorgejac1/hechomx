'use client';

import { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarousel } from '@/hooks/media';

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
}

export default function Carousel<T>({
  items,
  renderItem,
  loop = false,
  autoPlay = false,
  autoPlayInterval = 3000,
  showControls = true,
  showIndicators = true,
  className = '',
}: CarouselProps<T>) {
  const { currentIndex, next, previous, goTo, isFirst, isLast } = useCarousel(items.length, {
    loop,
    autoPlay,
    autoPlayInterval,
  });

  if (!items.length) return null;

  return (
    <div className={`relative group ${className}`}>
      {/* Main content */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {showControls && items.length > 1 && (
        <>
          {(!isFirst || loop) && (
            <button
              onClick={previous}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {(!isLast || loop) && (
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </>
      )}

      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
