/**
 * @fileoverview Shop about section component displaying detailed maker information
 * Renders the shop's story, features (custom designs, bulk orders, etc.),
 * certifications, specialties, shipping options, payment methods, and business hours.
 * @module components/shop/ShopAbout
 */

'use client';

import type { ExtendedMakerProfile } from '@/lib/data/mockUsers';
import {
  Award,
  Package,
  Truck,
  CreditCard,
  Clock,
  CheckCircle,
  X,
  Banknote,
  Building2,
  Store,
  CircleDollarSign,
} from 'lucide-react';
import Badge from '@/components/common/Badge';

/**
 * Props for the ShopAbout component
 * @interface ShopAboutProps
 */
interface ShopAboutProps {
  /** Extended maker profile containing all shop information */
  profile: ExtendedMakerProfile;
}

export default function ShopAbout({ profile }: ShopAboutProps) {
  return (
    <div className="space-y-6">
      {/* Story */}
      <div className="bg-white rounded-xl shadow-xs p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Historia</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{profile.story}</p>
      </div>

      {/* Features */}
      <div className="bg-white rounded-xl shadow-xs p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Características</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.features.customDesigns && (
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
              <span className="text-gray-900">Diseños personalizados</span>
            </div>
          )}
          {profile.features.bulkOrders && (
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
              <span className="text-gray-900">Pedidos al mayoreo</span>
            </div>
          )}
          {profile.features.giftWrapping && (
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
              <span className="text-gray-900">Envoltorio para regalo</span>
            </div>
          )}
          {profile.features.expressShipping && (
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
              <span className="text-gray-900">Envío express</span>
            </div>
          )}
        </div>
      </div>

      {/* Certifications & Specialties */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Certifications */}
        {profile.certifications.length > 0 && (
          <div className="bg-white rounded-xl shadow-xs p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-amber-600" />
              <h3 className="text-xl font-bold text-gray-900">Certificaciones</h3>
            </div>
            <div className="space-y-2">
              {profile.certifications.map((cert, index) => (
                <Badge key={index} variant="success" size="md" className="mr-2 mb-2">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Specialties */}
        {profile.specialties.length > 0 && (
          <div className="bg-white rounded-xl shadow-xs p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-6 h-6 text-primary-600" />
              <h3 className="text-xl font-bold text-gray-900">Especialidades</h3>
            </div>
            <div className="space-y-2">
              {profile.specialties.map((specialty, index) => (
                <Badge key={index} variant="primary" size="md" className="mr-2 mb-2">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Shipping & Payment Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping */}
        <div className="bg-white rounded-xl shadow-xs p-6">
          <div className="flex items-center gap-2 mb-4">
            <Truck className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Envíos</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Nacional:</span>
              <span
                className={`font-medium flex items-center gap-1 ${profile.shippingOptions.national ? 'text-green-600' : 'text-gray-500'}`}
              >
                {profile.shippingOptions.national ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Disponible
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4" /> No disponible
                  </>
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Internacional:</span>
              <span
                className={`font-medium flex items-center gap-1 ${profile.shippingOptions.international ? 'text-green-600' : 'text-gray-500'}`}
              >
                {profile.shippingOptions.international ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Disponible
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4" /> No disponible
                  </>
                )}
              </span>
            </div>
            {profile.shippingOptions.freeShippingOver && (
              <div className="flex justify-between">
                <span className="text-gray-600">Envío gratis:</span>
                <span className="font-medium text-gray-900">
                  ${profile.shippingOptions.freeShippingOver} MXN
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Tiempo de proceso:</span>
              <span className="font-medium text-gray-900">
                {profile.shippingOptions.averageProcessingTime}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-xs p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">Formas de Pago</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.paymentMethods.map((method, index) => (
              <Badge key={index} variant="neutral" size="md" className="flex items-center gap-1.5">
                {method === 'card' && (
                  <>
                    <CreditCard className="w-4 h-4" /> Tarjeta
                  </>
                )}
                {method === 'cash' && (
                  <>
                    <Banknote className="w-4 h-4" /> Efectivo
                  </>
                )}
                {method === 'transfer' && (
                  <>
                    <Building2 className="w-4 h-4" /> Transferencia
                  </>
                )}
                {method === 'oxxo' && (
                  <>
                    <Store className="w-4 h-4" /> OXXO
                  </>
                )}
                {method === 'paypal' && (
                  <>
                    <CircleDollarSign className="w-4 h-4" /> PayPal
                  </>
                )}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Business Hours */}
      {profile.businessHours && (
        <div className="bg-white rounded-xl shadow-xs p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-900">Horario de Atención</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.businessHours.map((schedule, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="font-medium text-gray-900">{schedule.day}:</span>
                <span className="text-gray-600">
                  {schedule.closed ? 'Cerrado' : `${schedule.open} - ${schedule.close}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
