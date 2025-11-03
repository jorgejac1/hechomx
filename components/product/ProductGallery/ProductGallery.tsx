"use client";

import { useState } from "react";
import { ProductGalleryMobile } from "./ProductGalleryMobile";
import { ProductGalleryDesktop } from "./ProductGalleryDesktop";
import { ProductGalleryModal } from "./ProductGalleryModal";
import { ProductGalleryBadges } from "./ProductGalleryBadges";
import { useImageGallery } from "@/hooks/media/useImageGallery";
import { useProductGalleryAnalytics } from "@/hooks/product/useProductGalleryAnalytics";
import { useMediaQuery } from "@/hooks/common/useMediaQuery";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Combine images and videos into media items
  const mediaItems = [
    ...images.map((url, index) => ({ type: "image" as const, url, index })),
    ...videos.map((url, index) => ({
      type: "video" as const,
      url,
      index: images.length + index,
    })),
  ];

  // Gallery state management
  const gallery = useImageGallery(images, {
    enableZoom: true,
    enableSlideshow: true,
    enablePreload: true,
    slideshowInterval: 3000,
  });

  const selectedIndex = gallery.selectedIndex;

  // Analytics tracking
  const productId = images[0] || productName;
  const { trackImageView, trackImageZoom, trackImageDownload, trackImageShare } =
    useProductGalleryAnalytics(productId, productName);

  const currentItem = mediaItems[selectedIndex];

  // Handle navigation with analytics
  const handleNext = () => {
    gallery.next();
    const nextIndex = (selectedIndex + 1) % mediaItems.length;
    trackImageView(nextIndex);
  };

  const handlePrevious = () => {
    gallery.previous();
    const prevIndex = selectedIndex - 1 < 0 ? mediaItems.length - 1 : selectedIndex - 1;
    trackImageView(prevIndex);
  };

  const handleThumbnailSelect = (index: number) => {
    gallery.setSelectedIndex(index);
    trackImageView(index);
  };

  const openModal = () => {
    setIsModalOpen(true);
    trackImageZoom();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Wrap analytics functions to match expected signatures
  const handleShare = () => {
    trackImageShare("native");
  };

  const handleDownload = () => {
    trackImageDownload();
  };

  return (
    <div className="space-y-4">
      {/* Screen reader announcement */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {currentItem.type === "image" ? "Imagen" : "Video"} {selectedIndex + 1}{" "}
        de {mediaItems.length}: {productName}
      </div>

      {/* Mobile Layout */}
      {isMobile ? (
        <ProductGalleryMobile
          mediaItems={mediaItems}
          selectedIndex={selectedIndex}
          productName={productName}
          loadedImages={gallery.loading.loaded}
          imageErrors={gallery.loading.errors}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onThumbnailClick={handleThumbnailSelect}
          onImageLoad={gallery.loading.handleLoad}
          onImageError={gallery.loading.handleError}
          onOpenModal={openModal}
          onShare={handleShare}
          onDownload={handleDownload}
        />
      ) : (
        <ProductGalleryDesktop
          mediaItems={mediaItems}
          selectedIndex={selectedIndex}
          productName={productName}
          loadedImages={gallery.loading.loaded}
          imageErrors={gallery.loading.errors}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onThumbnailClick={handleThumbnailSelect}
          onImageLoad={gallery.loading.handleLoad}
          onImageError={gallery.loading.handleError}
          onOpenModal={openModal}
          onShare={handleShare}
          onDownload={handleDownload}
        />
      )}

      {/* Info Badges */}
      <ProductGalleryBadges />

      {/* Fullscreen Modal */}
      {isModalOpen && currentItem.type === "image" && (
        <ProductGalleryModal
          mediaItems={mediaItems.filter((item) => item.type === "image")}
          selectedIndex={selectedIndex}
          productName={productName}
          onClose={closeModal}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSelectImage={handleThumbnailSelect}
          onShare={handleShare}
          onDownload={handleDownload}
        />
      )}

      {/* Global styles */}
      <style jsx global>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        *:focus-visible {
          outline: 2px solid #0d9488;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}