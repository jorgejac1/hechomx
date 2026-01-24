/**
 * @fileoverview Seller/artisan profile section component
 * Displays artisan information, verification status, statistics, and action buttons.
 * Shows trust score, commission rate, and links to artisan story/shop.
 * @module components/product/SellerProfile
 */

'use client';

import { useState } from 'react';
import { CheckCircle, MessageCircle, Store, BookOpen, Sparkles, HelpCircle } from 'lucide-react';
import Button from '@/components/common/Button';
import ContactModal from '@/components/contact/ContactModal';
import Popover from '@/components/common/Popover';
import { VerificationBadgeWithTooltip } from '@/components/common/VerificationBadge';
import type { ExtendedMakerProfile } from '@/lib/types/seller-types';
import { getArtisanIdFromMaker, hasArtisanStory } from '@/lib/utils/artisan';
import { getShopUrlFromMaker, hasShop } from '@/lib/utils/shop-utils';
import { ROUTES } from '@/lib';

/**
 * Props for the SellerProfile component
 * @interface SellerProfileProps
 */
interface SellerProfileProps {
  /** Artisan/maker name */
  maker: string;
  /** Whether the seller is verified */
  verified: boolean;
  /** Seller's state/location */
  state: string;
  /** Extended maker profile with verification details */
  makerProfile?: ExtendedMakerProfile;
}

export default function SellerProfile({
  maker,
  verified,
  state,
  makerProfile,
}: SellerProfileProps) {
  const [showContactModal, setShowContactModal] = useState(false);
  const artisanId = getArtisanIdFromMaker(maker);
  const hasStory = hasArtisanStory(maker);
  const shopUrl = getShopUrlFromMaker(maker);
  const makerHasShop = hasShop(maker);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Conoce al Artesano
        </h2>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {maker.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{maker}</h3>

              {/* Verification Badge - New System */}
              {makerProfile?.verification?.level && (
                <VerificationBadgeWithTooltip level={makerProfile.verification.level} size="md" />
              )}

              {/* Legacy verified checkmark */}
              {verified && !makerProfile?.verification?.level && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}

              {hasStory && (
                <div className="group relative">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    Tiene historia publicada
                  </span>
                </div>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{state}, México</p>

            {/* Trust Score and Commission */}
            {makerProfile?.verification?.level && (
              <div className="flex gap-3 mt-2 text-xs text-gray-600 dark:text-gray-400">
                <span>Comisión: {makerProfile.verification.commissionRate}%</span>
                <Popover
                  trigger="hover"
                  placement="bottom-start"
                  width={280}
                  header="¿Qué es el Trust Score?"
                  content={
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700">
                        El Trust Score indica la confiabilidad del artesano basado en:
                      </p>
                      <ul className="text-gray-600 space-y-1 list-disc list-inside">
                        <li>Historial de ventas completadas</li>
                        <li>Calificaciones de clientes</li>
                        <li>Tiempo de respuesta</li>
                        <li>Verificación de identidad</li>
                      </ul>
                    </div>
                  }
                >
                  <span className="inline-flex items-center gap-1 cursor-help hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                    Trust Score: {makerProfile.verification.trustScore}/100
                    <HelpCircle className="w-3 h-3" />
                  </span>
                </Popover>
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm leading-relaxed">
          Artesanos verificados dedicados a preservar las tradiciones mexicanas mediante la creación
          de piezas únicas hechas a mano con técnicas ancestrales.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">50+</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Productos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">4.8</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Calificación</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">200+</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Ventas</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Story Button - Prominent if available */}
          {hasStory && artisanId && (
            <Button
              variant="primary"
              size="md"
              href={`${ROUTES.ARTISAN}/${artisanId}`}
              icon={<BookOpen className="w-5 h-5" />}
              fullWidth
              className="bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              Ver Historia Completa
            </Button>
          )}

          {/* Other Actions */}
          <div className="flex gap-3">
            {makerHasShop && shopUrl ? (
              <Button
                variant="outline"
                size="md"
                href={shopUrl}
                icon={<Store className="w-5 h-5" />}
                fullWidth
              >
                Ver tienda
              </Button>
            ) : (
              <Button
                variant="outline"
                size="md"
                icon={<Store className="w-5 h-5" />}
                fullWidth
                disabled
              >
                Ver tienda
              </Button>
            )}

            <Button
              variant="outline"
              size="md"
              icon={<MessageCircle className="w-5 h-5" />}
              fullWidth
              onClick={() => setShowContactModal(true)}
            >
              Contactar
            </Button>
          </div>
        </div>

        {/* Story Teaser */}
        {hasStory && (
          <div className="mt-4 p-4 bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-1">
                  Este artesano tiene una historia que contar
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  Descubre su tradición familiar, técnicas ancestrales y el significado detrás de
                  cada pieza que crea.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <ContactModal sellerName={maker} onClose={() => setShowContactModal(false)} />
      )}
    </>
  );
}
