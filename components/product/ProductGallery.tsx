"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Play,
  X,
  Sparkles,
  Shield,
  Package,
} from "lucide-react";
import Badge from "@/components/common/Badge";

interface ProductGalleryProps {
  images: string[];
  videos?: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  videos = [],
  productName,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Combine images and videos into media array
  const mediaItems = [
    ...images.map((url, index) => ({ type: "image" as const, url, index })),
    ...videos.map((url, index) => ({
      type: "video" as const,
      url,
      index: images.length + index,
    })),
  ];

  const currentItem = mediaItems[selectedIndex];

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const previousImage = () => {
    setSelectedIndex(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length
    );
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    // Scroll thumbnail into view on mobile
    if (thumbnailsRef.current && window.innerWidth < 768) {
      const thumbnail = thumbnailsRef.current.children[index] as HTMLElement;
      if (thumbnail) {
        thumbnail.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest', 
          inline: 'center' 
        });
      }
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isHovering) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (currentItem.type === "image" && window.innerWidth >= 768) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="space-y-4">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Main Image - Mobile */}
        <div className="relative w-full bg-gray-50 rounded-lg overflow-hidden mb-3">
          <div className="relative w-full aspect-square">
            {currentItem.type === "image" ? (
              <div
                className="relative w-full h-full"
                onClick={() => setIsZoomed(true)}
              >
                <Image
                  src={currentItem.url}
                  alt={`${productName} - Imagen ${selectedIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={selectedIndex === 0}
                />
              </div>
            ) : (
              <video
                src={currentItem.url}
                controls
                className="absolute inset-0 w-full h-full object-contain"
                poster={images[0]}
              >
                Tu navegador no soporta videos.
              </video>
            )}

            {/* Navigation Arrows - Mobile */}
            {mediaItems.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all z-10"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all z-10"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </>
            )}

            {/* Counter - Mobile */}
            {mediaItems.length > 1 && (
              <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/70 text-white text-sm font-medium rounded-full z-10">
                {selectedIndex + 1} / {mediaItems.length}
              </div>
            )}
          </div>
        </div>

        {/* Horizontal Thumbnails - Mobile */}
        {mediaItems.length > 1 && (
          <div 
            ref={thumbnailsRef}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory mb-4"
          >
            {mediaItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all snap-center ${
                  selectedIndex === index
                    ? "border-primary-600 ring-2 ring-primary-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                aria-label={`Ver ${
                  item.type === "video" ? "video" : "imagen"
                } ${index + 1}`}
              >
                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt={`${productName} - Miniatura ${index + 1}`}
                    fill
                    sizes="64px"
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
                      <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-3 h-3 text-gray-900 ml-0.5" />
                      </div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="flex gap-4 items-stretch">
          {/* Thumbnail Gallery - Desktop */}
          <div className="flex-shrink-0 w-20 lg:w-24 flex">
            <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar h-full w-full">

              {mediaItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedIndex === index
                      ? "border-primary-600 ring-2 ring-primary-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  aria-label={`Ver ${
                    item.type === "video" ? "video" : "imagen"
                  } ${index + 1}`}
                >
                  {item.type === "image" ? (
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

          {/* Main Display Area - Desktop */}
          <div className="flex-1">
            {/* Main Image/Video */}
            <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group">
              {currentItem.type === "image" ? (
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                    className={`object-contain transition-transform duration-200 ${
                      isHovering ? "scale-150" : "scale-100"
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
                  className="w-full h-full object-contain"
                  poster={images[0]}
                >
                  Tu navegador no soporta videos.
                </video>
              )}

              {/* Navigation Arrows - Desktop */}
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

              {/* Counter - Desktop */}
              {mediaItems.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
                  {selectedIndex + 1} / {mediaItems.length}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <Badge
          variant="primary"
          size="sm"
          icon={<Sparkles className="w-3 h-3" />}
          className="text-xs"
        >
          100% Hecho a Mano
        </Badge>

        <Badge
          variant="success"
          size="sm"
          icon={<Shield className="w-3 h-3" />}
          className="text-xs"
        >
          Artesano Verificado
        </Badge>

        <Badge
          variant="info"
          size="sm"
          icon={<Package className="w-3 h-3" />}
          className="text-xs"
        >
          Envío Nacional
        </Badge>
      </div>

      {/* Zoom Modal - Full Screen */}
      {isZoomed && currentItem.type === "image" && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
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

          <div
            className="relative w-full h-full max-w-6xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
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

        /* Mobile thumbnail scrollbar hiding */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Smooth scroll snap for mobile thumbnails */
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