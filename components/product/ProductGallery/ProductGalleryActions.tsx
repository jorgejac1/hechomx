/**
 * @fileoverview Product gallery action buttons component
 * Provides share and download action buttons for product images.
 * @module components/product/ProductGallery/ProductGalleryActions
 */

import { Share2, Download } from 'lucide-react';

/**
 * Props for the ProductGalleryActions component
 * @interface ProductGalleryActionsProps
 */
interface ProductGalleryActionsProps {
  /** Callback function for share action */
  onShare: () => void;
  /** Callback function for download action */
  onDownload: () => void;
  /** Additional CSS classes */
  className?: string;
}

export function ProductGalleryActions({
  onShare,
  onDownload,
  className = '',
}: ProductGalleryActionsProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onShare();
        }}
        className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
        aria-label="Compartir imagen"
      >
        <Share2 className="w-4 h-4 text-gray-700" aria-hidden="true" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDownload();
        }}
        className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
        aria-label="Descargar imagen"
      >
        <Download className="w-4 h-4 text-gray-700" aria-hidden="true" />
      </button>
    </div>
  );
}
