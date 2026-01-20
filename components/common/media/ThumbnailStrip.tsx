'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface ThumbnailStripProps {
  items: Array<{ type: 'image' | 'video'; url: string }>;
  currentIndex: number;
  onSelect: (index: number) => void;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-20 h-20',
};

export default function ThumbnailStrip({
  items,
  currentIndex,
  onSelect,
  orientation = 'horizontal',
  size = 'md',
  className = '',
}: ThumbnailStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (index: number) => {
    onSelect(index);

    // Scroll selected thumbnail into view
    if (containerRef.current) {
      const thumbnail = containerRef.current.children[index] as HTMLElement;
      thumbnail?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`
        flex gap-2 overflow-auto scrollbar-hide
        ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}
        ${className}
      `}
      role="tablist"
      aria-orientation={orientation}
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => handleSelect(index)}
          className={`
            relative shrink-0 rounded-lg overflow-hidden border-2 transition-all
            ${sizeClasses[size]}
            ${
              currentIndex === index
                ? 'border-primary-600 ring-2 ring-primary-200'
                : 'border-gray-200 hover:border-gray-300'
            }
          `}
          role="tab"
          aria-selected={currentIndex === index}
          aria-label={`${item.type === 'video' ? 'Video' : 'Imagen'} ${index + 1}`}
        >
          {item.type === 'image' ? (
            <Image
              src={item.url}
              alt=""
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <div className="relative w-full h-full bg-gray-900">
              <video src={item.url} className="w-full h-full object-cover" muted />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                  <Play className="w-3 h-3 text-gray-900 ml-0.5" />
                </div>
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}