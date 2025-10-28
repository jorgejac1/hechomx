// components/product/ProductGallery.tsx
'use client';

import { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn, Play, X, Sparkles, Shield, Package } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  videos?: string[];
  productName: string;
}

export default function ProductGallery({ images, videos = [], productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Combine images and videos into media array
  const mediaItems = [
    ...images.map((url, index) => ({ type: 'image' as const, url, index })),
    ...videos.map((url, index) => ({ type: 'video' as const, url, index: images.length + index }))
  ];

  const currentItem = mediaItems[selectedIndex];

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const previousImage = () => {
    setSelectedIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isHovering) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (currentItem.type === 'image') {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-start">
        {/* Thumbnail Gallery - Vertical (Etsy-style) */}
        <div className="flex-shrink-0 w-20 sm:w-24">
          <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar" style={{ maxHeight: '448px' }}>
            {mediaItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                  selectedIndex === index
                    ? 'border-primary-600 ring-2 ring-primary-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                aria-label={`Ver ${item.type === 'video' ? 'video' : 'imagen'} ${index + 1}`}
              >
                {item.type === 'image' ? (
                  <Image
                    src={item.url}
                    alt={`${productName} - Miniatura ${index + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <div className="relative w-full h-full bg-gray-900">
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-gray-900 ml-0.5" />
                      </div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Display Area */}
        <div className="flex-1">
          {/* Main Image/Video */}
          <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group">
            {currentItem.type === 'image' ? (
              <div
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-full cursor-zoom-in"
                onClick={() => setIsZoomed(true)}
              >
                <Image
                  src={currentItem.url}
                  alt={`${productName} - Imagen ${selectedIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover transition-transform duration-200 ${
                    isHovering ? 'scale-150' : 'scale-100'
                  }`}
                  style={
                    isHovering
                      ? {
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        }
                      : undefined
                  }
                  priority={selectedIndex === 0}
                />

                {/* Zoom Indicator */}
                {isHovering && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full flex items-center gap-1">
                    <ZoomIn className="w-4 h-4" />
                    <span>Zoom activo</span>
                  </div>
                )}
              </div>
            ) : (
              <video
                src={currentItem.url}
                controls
                className="w-full h-full object-cover"
                poster={images[0]}
              >
                Tu navegador no soporta videos.
              </video>
            )}

            {/* Navigation Arrows (only if multiple items) */}
            {mediaItems.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </>
            )}

            {/* Counter */}
            {mediaItems.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
                {selectedIndex + 1} / {mediaItems.length}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full font-medium border border-primary-100">
          <Sparkles className="w-3.5 h-3.5" />
          100% Hecho a Mano
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full font-medium border border-green-100">
          <Shield className="w-3.5 h-3.5" />
          Artesano Verificado
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full font-medium border border-blue-100">
          <Package className="w-3.5 h-3.5" />
          Envío Nacional
        </span>
        <span className="text-gray-400 hidden sm:inline">•</span>
        <span className="text-gray-500 hidden sm:inline">
          {currentItem.type === 'image' ? 'Pasa el cursor para zoom' : 'Reproduce el video'}
        </span>
      </div>

      {/* Zoom Modal - Full Screen */}
      {isZoomed && currentItem.type === 'image' && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            onClick={() => setIsZoomed(false)}
            aria-label="Cerrar zoom"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Navigation in Modal */}
          {mediaItems.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  previousImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Counter in Modal */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 text-white text-sm rounded-full">
            {selectedIndex + 1} / {mediaItems.length}
          </div>

          <div className="relative w-full h-full max-w-6xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={currentItem.url}
              alt={`${productName} - Ampliado`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}