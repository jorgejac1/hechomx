/**
 * @fileoverview Mobile product gallery component
 * Touch-optimized gallery with swipeable thumbnails, navigation arrows,
 * and fullscreen modal support for mobile devices.
 * @module components/product/ProductGallery/ProductGalleryMobile
 */

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { ProductGalleryImage } from './ProductGalleryImage';
import { ProductGalleryActions } from './ProductGalleryActions';
import { usePrefersReducedMotion } from '@/hooks/common/usePrefersReducedMotion';

/**
 * Media item type for gallery content
 * @interface MediaItem
 */
interface MediaItem {
  /** Type of media (image or video) */
  type: 'image' | 'video';
  /** Media URL */
  url: string;
  /** Index in the media array */
  index: number;
}

/**
 * Props for the ProductGalleryMobile component
 * @interface ProductGalleryMobileProps
 */
interface ProductGalleryMobileProps {
  /** Array of media items to display */
  mediaItems: MediaItem[];
  /** Currently selected media index */
  selectedIndex: number;
  /** Product name for accessibility */
  productName: string;
  /** Set of loaded image indices */
  loadedImages: Set<number>;
  /** Set of errored image indices */
  imageErrors: Set<number>;
  /** Navigate to next item */
  onNext: () => void;
  /** Navigate to previous item */
  onPrevious: () => void;
  /** Handle thumbnail selection */
  onThumbnailClick: (index: number) => void;
  /** Handle image load event */
  onImageLoad: (index: number) => void;
  /** Handle image error event */
  onImageError: (index: number) => void;
  /** Open fullscreen modal */
  onOpenModal: () => void;
  /** Share current image */
  onShare: () => void;
  /** Download current image */
  onDownload: () => void;
}

export function ProductGalleryMobile({
  mediaItems,
  selectedIndex,
  productName,
  loadedImages,
  imageErrors,
  onNext,
  onPrevious,
  onThumbnailClick,
  onImageLoad,
  onImageError,
  onOpenModal,
  onShare,
  onDownload,
}: ProductGalleryMobileProps) {
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const currentItem = mediaItems[selectedIndex];

  const handleThumbnailClick = (index: number) => {
    onThumbnailClick(index);

    if (thumbnailsRef.current) {
      const thumbnail = thumbnailsRef.current.children[index] as HTMLElement;
      if (thumbnail) {
        thumbnail.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  return (
    <div className="md:hidden">
      <section
        role="region"
        aria-label={`Galería de ${productName}`}
        aria-roledescription="carrusel de imágenes"
        className="relative w-full bg-gray-50 rounded-lg overflow-hidden mb-3"
      >
        <div className="relative w-full aspect-square">
          {currentItem.type === 'image' ? (
            <div
              className="relative w-full h-full focus:outline-hidden focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 rounded-lg group cursor-pointer"
              onClick={onOpenModal}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenModal();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Ampliar imagen ${selectedIndex + 1} de ${mediaItems.length}`}
            >
              <ProductGalleryImage
                url={currentItem.url}
                alt={`${productName} - Imagen ${selectedIndex + 1} de ${mediaItems.length}`}
                index={selectedIndex}
                isLoaded={loadedImages.has(selectedIndex)}
                hasError={imageErrors.has(selectedIndex)}
                onLoad={() => onImageLoad(selectedIndex)}
                onError={() => onImageError(selectedIndex)}
                priority={selectedIndex === 0}
                sizes="100vw"
              />

              {/* Action buttons */}
              <ProductGalleryActions
                onShare={onShare}
                onDownload={onDownload}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              />
            </div>
          ) : (
            <video
              src={currentItem.url}
              controls
              className="absolute inset-0 w-full h-full object-contain"
              poster={mediaItems[0]?.url}
              aria-label={`Video ${selectedIndex + 1} de ${mediaItems.length}: ${productName}`}
            >
              <track kind="captions" />
              Tu navegador no soporta videos.
            </video>
          )}

          {/* Navigation arrows */}
          {mediaItems.length > 1 && (
            <>
              <button
                onClick={onPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all z-10 focus:outline-hidden focus:ring-2 focus:ring-primary-600 active:scale-95"
                aria-label={`Imagen anterior. Actual: ${selectedIndex + 1} de ${mediaItems.length}`}
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" aria-hidden="true" />
              </button>
              <button
                onClick={onNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all z-10 focus:outline-hidden focus:ring-2 focus:ring-primary-600 active:scale-95"
                aria-label={`Siguiente imagen. Actual: ${selectedIndex + 1} de ${mediaItems.length}`}
              >
                <ChevronRight className="w-5 h-5 text-gray-700" aria-hidden="true" />
              </button>
            </>
          )}

          {/* Counter */}
          {mediaItems.length > 1 && (
            <div
              className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/70 text-white text-sm font-medium rounded-full z-10"
              aria-hidden="true"
            >
              {selectedIndex + 1} / {mediaItems.length}
            </div>
          )}
        </div>
      </section>

      {/* Thumbnails */}
      {mediaItems.length > 1 && (
        <nav
          ref={thumbnailsRef}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory mb-4"
          aria-label="Miniaturas de imágenes"
          role="tablist"
        >
          {mediaItems.map((item, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={selectedIndex === index}
              aria-controls={`image-${index}`}
              onClick={() => handleThumbnailClick(index)}
              className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all snap-center focus:outline-hidden focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 active:scale-95 ${
                selectedIndex === index
                  ? 'border-primary-600 ring-2 ring-primary-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              aria-label={`${item.type === 'video' ? 'Video' : 'Imagen'} ${index + 1} de ${mediaItems.length}`}
            >
              {item.type === 'image' ? (
                <>
                  {!loadedImages.has(index) && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  )}
                  <Image
                    src={item.url}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                    loading="lazy"
                    onLoad={() => onImageLoad(index)}
                    onError={() => onImageError(index)}
                  />
                </>
              ) : (
                <div className="relative w-full h-full bg-gray-900">
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    muted
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-3 h-3 text-gray-900 ml-0.5" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </nav>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .snap-x {
          scroll-snap-type: x mandatory;
        }
        .snap-center {
          scroll-snap-align: center;
        }
      `}</style>
    </div>
  );
}
