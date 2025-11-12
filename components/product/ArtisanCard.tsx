'use client';

import { useState } from 'react';
import { MapPin, CheckCircle, MessageCircle, Store } from 'lucide-react';
import Button from '@/components/common/Button';
import ContactModal from '@/components/contact/ContactModal';

interface ArtisanCardProps {
  artisanName: string;
  location: string;
  verified: boolean;
}

export default function ArtisanCard({ artisanName, location, verified }: ArtisanCardProps) {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Conoce al Artesano</h2>

        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {artisanName.charAt(0)}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-gray-900">{artisanName}</h3>
                {verified && (
                  <CheckCircle
                    className="w-5 h-5 text-green-500"
                    aria-label="Artesano verificado"
                  />
                )}
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{location}, México</span>
              </div>
            </div>

            <p className="text-gray-600">
              Artesano {verified ? 'verificado' : ''} dedicado a preservar las tradiciones mexicanas
              mediante la creación de piezas únicas hechas a mano con técnicas ancestrales.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">50+</div>
                <div className="text-xs text-gray-600">Productos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">4.8</div>
                <div className="text-xs text-gray-600">Calificación</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">200+</div>
                <div className="text-xs text-gray-600">Ventas</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="md"
                href={`/artesanos/${artisanName.toLowerCase().replace(/\s+/g, '-')}`}
                icon={<Store className="w-4 h-4" />}
                iconPosition="left"
              >
                Ver tienda
              </Button>

              <Button
                variant="outline"
                size="md"
                icon={<MessageCircle className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => setShowContactModal(true)}
              >
                Contactar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <ContactModal sellerName={artisanName} onClose={() => setShowContactModal(false)} />
      )}
    </>
  );
}
