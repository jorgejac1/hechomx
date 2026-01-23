/**
 * @fileoverview Product gallery trust badges component
 * Displays trust indicators below the product gallery including
 * handmade certification, verified artisan, and national shipping badges.
 * @module components/product/ProductGallery/ProductGalleryBadges
 */

import Badge from '@/components/common/Badge';
import { Sparkles, Shield, Package } from 'lucide-react';

/**
 * Renders trust badges for product gallery
 * @returns Row of badge components with icons
 */
export function ProductGalleryBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-xs" role="list">
      <Badge
        variant="primary"
        size="sm"
        icon={<Sparkles className="w-3 h-3" aria-hidden="true" />}
        className="text-xs"
      >
        100% Hecho a Mano
      </Badge>

      <Badge
        variant="success"
        size="sm"
        icon={<Shield className="w-3 h-3" aria-hidden="true" />}
        className="text-xs"
      >
        Artesano Verificado
      </Badge>

      <Badge
        variant="info"
        size="sm"
        icon={<Package className="w-3 h-3" aria-hidden="true" />}
        className="text-xs"
      >
        Envío Nacional
      </Badge>
    </div>
  );
}
