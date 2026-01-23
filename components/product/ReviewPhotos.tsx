/**
 * @fileoverview Review photos gallery component
 * Displays review photo thumbnails with lightbox modal for viewing full images.
 * Supports navigation between photos in fullscreen mode.
 * @module components/product/ReviewPhotos
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageSkeleton from '@/components/common/loading/ImageSkeleton';

/**
 * Props for the ReviewPhotos component
 * @interface ReviewPhotosProps
 */
interface ReviewPhotosProps {
  /** Array of photo URLs to display */
  photos: string[];
}

export default function ReviewPhotos({ photos }: ReviewPhotosProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  if (photos.length === 0) return null;

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex < photos.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
    <>
      {/* Photo Count Header */}
      <div className="flex items-center gap-2 mb-2">
        <Camera className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          {photos.length} {photos.length === 1 ? 'foto' : 'fotos'}
        </span>
      </div>

      {/* Photo Thumbnails */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {photos.map((photo, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-primary-500 transition-colors group"
          >
            {!loadedImages.has(idx) && <ImageSkeleton aspectRatio="square" rounded={false} />}
            <Image
              src={photo}
              alt={`Foto de reseña ${idx + 1}`}
              fill
              sizes="80px"
              className={`object-cover group-hover:scale-110 transition-transform duration-200 ${
                loadedImages.has(idx) ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => handleImageLoad(idx)}
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Photo Modal with Navigation */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 hover:bg-white/10 rounded-full transition-colors z-10"
            onClick={() => setSelectedIndex(null)}
            aria-label="Cerrar"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 rounded-full text-white text-sm">
            {selectedIndex + 1} / {photos.length}
          </div>

          {/* Previous button */}
          {selectedIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Next button */}
          {selectedIndex < photos.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full h-full max-w-4xl max-h-[90vh] m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[selectedIndex]}
              alt={`Foto ampliada ${selectedIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
