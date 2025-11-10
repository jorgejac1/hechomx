'use client';

import { CheckCircle, MessageCircle, Store, BookOpen, Sparkles } from 'lucide-react';
import Button from '@/components/common/Button';
import { getArtisanIdFromMaker, hasArtisanStory } from '@/lib/utils/artisan';
import { ROUTES } from '@/lib';

interface SellerProfileProps {
  maker: string;
  verified: boolean;
  state: string;
}

export default function SellerProfile({ maker, verified, state }: SellerProfileProps) {
  const artisanId = getArtisanIdFromMaker(maker);
  const hasStory = hasArtisanStory(maker);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Conoce al Artesano</h2>

      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {maker.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-gray-900">{maker}</h3>
            {verified && <CheckCircle className="w-5 h-5 text-green-600" />}
            {hasStory && (
              <div className="group relative">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Tiene historia publicada
                </span>
              </div>
            )}
          </div>
          <p className="text-gray-600 text-sm">{state}, México</p>
        </div>
      </div>

      <p className="text-gray-700 mb-6 text-sm leading-relaxed">
        Artesanos verificados dedicados a preservar las tradiciones mexicanas mediante la creación
        de piezas únicas hechas a mano con técnicas ancestrales.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">50+</div>
          <div className="text-xs text-gray-600">Productos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">4.8</div>
          <div className="text-xs text-gray-600">Calificación</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">200+</div>
          <div className="text-xs text-gray-600">Ventas</div>
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
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
          >
            Ver Historia Completa
          </Button>
        )}

        {/* Other Actions */}
        <div className="flex gap-3">
          <Button variant="outline" size="md" icon={<Store className="w-5 h-5" />} fullWidth>
            Ver tienda
          </Button>

          <Button
            variant="outline"
            size="md"
            icon={<MessageCircle className="w-5 h-5" />}
            fullWidth
          >
            Contactar
          </Button>
        </div>
      </div>

      {/* Story Teaser */}
      {hasStory && (
        <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-1">
                Este artesano tiene una historia que contar
              </p>
              <p className="text-xs text-amber-700">
                Descubre su tradición familiar, técnicas ancestrales y el significado detrás de cada
                pieza que crea.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
