/**
 * @fileoverview Seller banner component for product forms
 * Displays the seller's shop name at the top of the product form
 * to indicate which store the product will be published to.
 * @module components/product/form/SellerBanner
 */

import { Store } from 'lucide-react';

/**
 * Props for the SellerBanner component
 * @interface SellerBannerProps
 */
interface SellerBannerProps {
  /** Name of the seller's shop */
  shopName: string;
}

export default function SellerBanner({ shopName }: SellerBannerProps) {
  return (
    <div className="bg-linear-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 rounded-xl p-4 border-2 border-primary-200 dark:border-primary-700">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-600 rounded-lg">
          <Store className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Publicando producto en:</p>
          <p className="font-bold text-gray-900 dark:text-white">{shopName}</p>
        </div>
      </div>
    </div>
  );
}
