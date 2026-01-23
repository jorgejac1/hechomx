/**
 * @fileoverview Product gallery analytics tracking hook
 * Tracks user interactions with product images including views, zooms, downloads, and shares via Google Analytics
 * @module hooks/product/useProductGalleryAnalytics
 */

/**
 * Product-specific analytics tracking for gallery
 *
 * @param productId - Product ID
 * @param productName - Product name
 * @returns Analytics event handlers
 *
 * @example
 * const analytics = useProductGalleryAnalytics('123', 'Product Name');
 * analytics.trackImageView(0);
 */
export interface ProductGalleryAnalytics {
  trackImageView: (index: number) => void;
  trackImageZoom: () => void;
  trackImageDownload: () => void;
  trackImageShare: (method: 'native' | 'clipboard') => void;
}

export function useProductGalleryAnalytics(
  productId: string,
  productName: string
): ProductGalleryAnalytics {
  const trackImageView = (index: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'product_image_view', {
        product_id: productId,
        product_name: productName,
        image_index: index,
      });
    }
  };

  const trackImageZoom = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'product_image_zoom', {
        product_id: productId,
        product_name: productName,
      });
    }
  };

  const trackImageDownload = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'product_image_download', {
        product_id: productId,
        product_name: productName,
      });
    }
  };

  const trackImageShare = (method: 'native' | 'clipboard') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'product_image_share', {
        product_id: productId,
        product_name: productName,
        method,
      });
    }
  };

  return {
    trackImageView,
    trackImageZoom,
    trackImageDownload,
    trackImageShare,
  };
}
