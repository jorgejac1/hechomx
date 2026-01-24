/**
 * @fileoverview Shop card component for displaying shop previews in listings
 * Renders a clickable card showing shop avatar, name, location, description,
 * statistics (rating, products, sales), and specialties. Includes verification
 * badge display with appropriate styling based on badge type.
 * @module components/shop/ShopCard
 */

'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Store,
  MapPin,
  Star,
  CheckCircle2,
  TrendingUp,
  Award,
  Sparkles,
  LucideIcon,
} from 'lucide-react';
import { getShopSlug } from '@/lib/utils/shop-utils';
import type { User } from '@/contexts/AuthContext';

/**
 * Props for the ShopCard component
 * @interface ShopCardProps
 */
interface ShopCardProps {
  /** The shop owner's user data including maker profile */
  shop: User;
}

/**
 * Gets badge display information based on the badge type
 * @param badge - The badge identifier string (optional)
 * @returns Object containing icon component, label text, and color classes, or null if no badge
 */
const getBadgeInfo = (
  badge?: string
): { icon: LucideIcon; label: string; color: string } | null => {
  switch (badge) {
    case 'verified':
      return { icon: CheckCircle2, label: 'Verificado', color: 'text-blue-600 bg-blue-100' };
    case 'top_seller':
      return { icon: TrendingUp, label: 'Top Vendedor', color: 'text-green-600 bg-green-100' };
    case 'artisan_certified':
      return {
        icon: Award,
        label: 'Artesano Certificado',
        color: 'text-purple-600 bg-purple-100',
      };
    case 'eco_friendly':
      return { icon: Sparkles, label: 'Eco-Friendly', color: 'text-emerald-600 bg-emerald-100' };
    default:
      return null;
  }
};

const ShopCard = memo(function ShopCard({ shop }: ShopCardProps) {
  const profile = shop.makerProfile!;
  const badgeInfo = getBadgeInfo(profile.verificationBadge);
  const BadgeIcon = badgeInfo?.icon;

  return (
    <Link
      href={`/tienda/${getShopSlug(profile.shopName)}`}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900/70 transition overflow-hidden group"
    >
      {/* Shop Header with Avatar */}
      <div className="relative h-32 bg-linear-to-br from-primary-100 to-primary-200">
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-700 shadow-lg dark:shadow-gray-900/50 overflow-hidden bg-white dark:bg-gray-800">
            {shop.avatar ? (
              <Image
                src={shop.avatar}
                alt={profile.shopName}
                width={96}
                height={96}
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <Store className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
        </div>
        {badgeInfo && BadgeIcon && (
          <div
            className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 ${badgeInfo.color} rounded-full text-xs font-semibold`}
          >
            <BadgeIcon className="w-3 h-3" />
            {badgeInfo.label}
          </div>
        )}
      </div>

      {/* Shop Info */}
      <div className="pt-14 px-6 pb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">
          {profile.shopName}
        </h3>

        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4 shrink-0" />
          {profile.location}
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{profile.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <p className="font-bold text-gray-900">{profile.stats.rating.toFixed(1)}</p>
            </div>
            <p className="text-xs text-gray-600">{profile.stats.reviewsCount} reseñas</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="font-bold text-gray-900 mb-1">{profile.stats.productsCount}</p>
            <p className="text-xs text-gray-600">Productos</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="font-bold text-gray-900 mb-1">{profile.stats.salesCount}</p>
            <p className="text-xs text-gray-600">Ventas</p>
          </div>
        </div>

        {/* Specialties */}
        {profile.specialties && profile.specialties.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {profile.specialties.slice(0, 2).map((specialty, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-sm"
              >
                {specialty}
              </span>
            ))}
            {profile.specialties.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-sm">
                +{profile.specialties.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
});

export default ShopCard;
