"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  Info,
  Download,
  Share2,
} from "lucide-react";
import { useFocusTrap } from "@/hooks/common/useFocusTrap";
import { useKeyboardShortcuts } from "@/hooks/common/useKeyboardShortcuts";
import { useSlideshow } from "@/hooks/media/useSlideshow";
import { useZoomControls } from "@/hooks/media/useZoomControls";
import { usePrefersReducedMotion } from "@/hooks/common/usePrefersReducedMotion";

interface MediaItem {
  type: "image" | "video";
  url: string;
  index: number;
}

interface ProductGalleryModalProps {
  mediaItems: MediaItem[];
  selectedIndex: number;
  productName: string;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSelectImage: (index: number) => void;
  onShare: () => void;
  onDownload: () => void;
}

export function ProductGalleryModal({
  mediaItems,
  selectedIndex,
  productName,
  onClose,
  onNext,
  onPrevious,
  onSelectImage,
  onShare,
  onDownload,
}: ProductGalleryModalProps) {
  const [showImageInfo, setShowImageInfo] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Zoom controls - fixed to match hook signature
  const zoomControls = useZoomControls(1, 3, 0.5);

  // Slideshow - fixed to match hook signature
  const slideshow = useSlideshow(mediaItems.length, 3000, onSelectImage);

  // Focus trap - fixed to match hook signature
  useFocusTrap(modalRef as React.RefObject<HTMLElement>, {
    enabled: true,
    returnFocus: true,
  });

  // Keyboard shortcuts
  useKeyboardShortcuts({
    Escape: onClose,
    ArrowLeft: onPrevious,
    ArrowRight: onNext,
    " ": slideshow.toggle,
    "+": zoomControls.zoomIn,
    "=": zoomControls.zoomIn,
    "-": zoomControls.zoomOut,
  });

  // Save previous focus and restore on close
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    return () => {
      setTimeout(() => {
        previousFocusRef.current?.focus();
      }, 0);
    };
  }, []);

  const currentMediaItem = mediaItems[selectedIndex];

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada de imagen"
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
      onClick={onClose}
    >
      {/* Top toolbar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowImageInfo(!showImageInfo);
            }}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Información de imagen"
            aria-pressed={showImageInfo}
          >
            <Info className="w-5 h-5" aria-hidden="true" />
          </button>

          {showImageInfo && (
            <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
              Imagen {selectedIndex + 1} de {mediaItems.length}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls - to use zoom instead of zoomLevel */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              zoomControls.zoomOut();
            }}
            disabled={!zoomControls.canZoomOut}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Alejar zoom"
          >
            <ZoomOut className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="bg-white/10 text-white px-3 py-1 rounded-full text-sm">
            {Math.round(zoomControls.zoom * 100)}%
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              zoomControls.zoomIn();
            }}
            disabled={!zoomControls.canZoomIn}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Acercar zoom"
          >
            <ZoomIn className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Slideshow toggle to use slideshow.isPlaying */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              slideshow.toggle();
            }}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={
              slideshow.isPlaying
                ? "Pausar presentación"
                : "Iniciar presentación"
            }
            aria-pressed={slideshow.isPlaying}
          >
            {slideshow.isPlaying ? (
              <Pause className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Play className="w-5 h-5" aria-hidden="true" />
            )}
          </button>

          {/* Share button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare();
            }}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Compartir imagen"
          >
            <Share2 className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Download button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload();
            }}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Descargar imagen"
          >
            <Download className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Cerrar vista ampliada (Presiona Escape)"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Main image area to use zoomControls.zoom */}
      <div className="flex-1 flex items-center justify-center p-4 pt-20 pb-32">
        <div
          className="relative w-full h-full max-w-6xl"
          onClick={(e) => e.stopPropagation()}
          style={{
            transform: `scale(${zoomControls.zoom})`,
            transition: prefersReducedMotion ? "none" : "transform 0.3s ease",
          }}
        >
          <Image
            src={currentMediaItem.url}
            alt={`${productName} - Vista ampliada, imagen ${
              selectedIndex + 1
            } de ${mediaItems.length}`}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </div>

      {/* Navigation arrows */}
      {mediaItems.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={`Imagen anterior. Actual: ${selectedIndex + 1} de ${
              mediaItems.length
            }`}
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={`Siguiente imagen. Actual: ${selectedIndex + 1} de ${
              mediaItems.length
            }`}
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>
        </>
      )}

      {/* Bottom thumbnail strip */}
      {mediaItems.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-center">
            {mediaItems.map((item, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectImage(index);
                }}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedIndex === index
                    ? "border-white ring-2 ring-white/50"
                    : "border-white/30 hover:border-white/60"
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              >
                <Image
                  src={item.url}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Counter */}
      <div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 text-white text-sm rounded-full"
        role="status"
        aria-live="polite"
      >
        Imagen {selectedIndex + 1} de {mediaItems.length}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
