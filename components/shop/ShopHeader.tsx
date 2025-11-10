'use client';

import Image from 'next/image';
import { User } from '@/contexts/AuthContext';
import { MapPin, MessageCircle, Award, Sparkles, Instagram, Facebook } from 'lucide-react';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import { hasArtisanStory, getArtisanIdFromMaker } from '@/lib/utils/artisan';
import { ROUTES } from '@/lib';

interface ShopHeaderProps {
  shop: User;
}

export default function ShopHeader({ shop }: ShopHeaderProps) {
  const profile = shop.makerProfile!;
  const hasStory = hasArtisanStory(profile.shopName);
  const artisanId = getArtisanIdFromMaker(profile.shopName);

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'verified':
        return 'success';
      case 'top_seller':
        return 'primary';
      case 'artisan_certified':
        return 'warning';
      case 'eco_friendly':
        return 'success';
      default:
        return 'neutral';
    }
  };

  const getBadgeText = (badge: string) => {
    switch (badge) {
      case 'verified':
        return 'Verificado';
      case 'top_seller':
        return 'Vendedor Estrella';
      case 'artisan_certified':
        return 'Artesano Certificado';
      case 'eco_friendly':
        return 'Eco Amigable';
      default:
        return badge;
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white">
              {shop.avatar ? (
                <Image
                  src={shop.avatar}
                  alt={shop.name}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-600">{shop.name.charAt(0)}</span>
                </div>
              )}
            </div>
            {profile.verificationBadge && (
              <div className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-lg">
                <Award className="w-6 h-6 text-amber-500" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-start gap-3 mb-3">
              <h1 className="text-3xl sm:text-4xl font-bold">{profile.shopName}</h1>
              {profile.verificationBadge && (
                <Badge
                  variant={getBadgeVariant(profile.verificationBadge)}
                  size="md"
                  icon={<Award className="w-4 h-4" />}
                >
                  {getBadgeText(profile.verificationBadge)}
                </Badge>
              )}
              {hasStory && (
                <Badge variant="warning" size="md" icon={<Sparkles className="w-4 h-4" />}>
                  Tiene Historia
                </Badge>
              )}
            </div>

            <p className="text-lg text-primary-100 mb-4">{profile.description}</p>

            <div className="flex flex-wrap gap-4 text-sm text-primary-100 mb-4">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {profile.location}
              </span>
              <span>Miembro desde {new Date(profile.memberSince).getFullYear()}</span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {hasStory && artisanId && (
                <Button
                  variant="primary"
                  size="md"
                  href={`${ROUTES.ARTISAN}/${artisanId}`}
                  icon={<Sparkles className="w-5 h-5" />}
                  className="bg-white text-primary-600 hover:bg-gray-100"
                >
                  Ver Historia Completa
                </Button>
              )}

              <Button
                variant="outline"
                size="md"
                icon={<MessageCircle className="w-5 h-5" />}
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Contactar
              </Button>

              {/* Social Media Links */}
              {profile.socialMedia?.instagram && (
                <a
                  href={`https://instagram.com/${profile.socialMedia.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border-2 border-white hover:bg-white hover:text-primary-600 transition"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}

              {profile.socialMedia?.facebook && (
                <a
                  href={`https://facebook.com/${profile.socialMedia.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border-2 border-white hover:bg-white hover:text-primary-600 transition"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
