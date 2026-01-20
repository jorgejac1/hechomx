"use client";

import { useState, useRef, type MouseEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, ZoomIn } from "lucide-react";
import { ProductGalleryImage } from "./ProductGalleryImage";
import { ProductGalleryActions } from "./ProductGalleryActions";

interface MediaItem {
  type: "image" | "video";
  url: string;
  index: number;
}

interface ProductGalleryDesktopProps {
  mediaItems: MediaItem[];
  selectedIndex: number;
  productName: string;
  loadedImages: Set<number>;
  imageErrors: Set<number>;
  onNext: () => void;
  onPrevious: () => void;
  onThumbnailClick: (index: number) => void;
  onImageLoad: (index: number) => void;
  onImageError: (index: number) => void;
  onOpenModal: () => void;
  onShare: () => void;
  onDownload: () => void;
}

export function ProductGalleryDesktop({
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
}: ProductGalleryDesktopProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const currentItem = mediaItems[selectedIndex];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isHovering) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (currentItem.type === "image") {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="hidden md:block">
      <section
        role="region"
        aria-label={`Galería de ${productName}`}
        aria-roledescription="carrusel de imágenes"
        tabIndex={0}
      >
        <div className="flex gap-4 h-[450px] lg:h-[500px] xl:h-[550px]">
          {/* Thumbnails sidebar */}
          <nav
            className="shrink-0 w-20 lg:w-24 h-full"
            aria-label="Miniaturas de imágenes"
            role="tablist"
            aria-orientation="vertical"
          >
            <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar h-full w-full">
              {mediaItems.map((item, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={selectedIndex === index}
                  aria-controls={`image-${index}`}
                  onClick={() => onThumbnailClick(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all shrink-0 focus:outline-hidden focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 active:scale-95 ${
                    selectedIndex === index
                      ? "border-primary-600 ring-2 ring-primary-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  aria-label={`${item.type === "video" ? "Video" : "Imagen"} ${index + 1} de ${mediaItems.length}`}
                >
                  {item.type === "image" ? (
                    <>
                      {!loadedImages.has(index) && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                      )}
                      <Image
                        src={item.url}
                        alt=""
                        fill
                        sizes="96px"
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
                        <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-4 h-4 text-gray-900 ml-0.5" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Main image area */}
          <div className="flex-1 h-full">
            <div
              id={`image-${selectedIndex}`}
              role="tabpanel"
              className="relative w-full h-full bg-gray-100 rounded-xl overflow-hidden group"
            >
              {currentItem.type === "image" ? (
                <div
                  ref={imageRef}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative w-full h-full cursor-zoom-in focus:outline-hidden focus:ring-2 focus:ring-primary-600 focus:ring-inset rounded-xl"
                  onClick={onOpenModal}
                  tabIndex={0}
                  role="button"
                  aria-label={`Ampliar imagen ${selectedIndex + 1} de ${mediaItems.length}. Presiona Enter para ver en pantalla completa`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onOpenModal();
                    }
                  }}
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                    className={`transition-all duration-300 ${
                      isHovering ? "scale-150" : "scale-100"
                    }`}
                    style={
                      isHovering
                        ? {
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          }
                        : undefined
                    }
                  />

                  {/* Zoom indicator */}
                  {isHovering && (
                    <div
                      className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full flex items-center gap-1"
                      role="status"
                      aria-live="polite"
                    >
                      <ZoomIn className="w-4 h-4" aria-hidden="true" />
                      <span>Zoom activo</span>
                    </div>
                  )}

                  {/* Action buttons */}
                  <ProductGalleryActions
                    onShare={onShare}
                    onDownload={onDownload}
                    className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              ) : (
                <video
                  src={currentItem.url}
                  controls
                  className="w-full h-full object-contain"
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-primary-600"
                    aria-label={`Imagen anterior. Actual: ${selectedIndex + 1} de ${mediaItems.length}`}
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" aria-hidden="true" />
                  </button>
                  <button
                    onClick={onNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-primary-600"
                    aria-label={`Siguiente imagen. Actual: ${selectedIndex + 1} de ${mediaItems.length}`}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" aria-hidden="true" />
                  </button>
                </>
              )}

              {/* Counter */}
              {mediaItems.length > 1 && (
                <div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-sm rounded-full"
                  aria-hidden="true"
                >
                  {selectedIndex + 1} / {mediaItems.length}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
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