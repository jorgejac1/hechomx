'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import { ROUTES } from '@/lib';
import {
  CreditCard,
  MapPin,
  Lock,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import Alert from '@/components/common/Alert';
import Tabs, { TabItem } from '@/components/common/Tabs';

interface SavedCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export default function SettingsPage() {
  return (
    <AuthPageWrapper loadingText="Cargando configuración...">
      {() => <SettingsContent />}
    </AuthPageWrapper>
  );
}

const settingsTabs: TabItem[] = [
  { id: 'cards', label: 'Tarjetas', icon: CreditCard },
  { id: 'addresses', label: 'Direcciones', icon: MapPin },
  { id: 'security', label: 'Seguridad', icon: Lock },
  { id: 'notifications', label: 'Notificaciones', icon: Bell },
];

function SettingsContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Mock data
  const [savedCards] = useState<SavedCard[]>([
    {
      id: '1',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: '12',
      expiryYear: '25',
      isDefault: true,
    },
    {
      id: '2',
      last4: '5555',
      brand: 'Mastercard',
      expiryMonth: '06',
      expiryYear: '26',
      isDefault: false,
    },
  ]);

  const [addresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Casa',
      street: 'Av. Insurgentes Sur 1234, Col. Del Valle',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '03100',
      phone: '+52 55 1234 5678',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Oficina',
      street: 'Av. Reforma 456, Col. Cuauhtémoc',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '06500',
      phone: '+52 55 9876 5432',
      isDefault: false,
    },
  ]);

  const handlePasswordUpdate = () => {
    setSuccessMessage('Contraseña actualizada correctamente');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={ROUTES.PROFILE}
            className="text-primary-600 hover:text-primary-700 mb-4 flex items-center gap-2"
          >
            ← Volver al Perfil
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Configuración</h1>
          <p className="text-gray-600 mt-1">
            Administra tus métodos de pago, direcciones y seguridad
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <Alert variant="success" layout="bordered" icon={CheckCircle2} className="mb-6">
            <span className="font-medium">{successMessage}</span>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs defaultTab="cards" className="bg-white rounded-xl shadow-md">
          <Tabs.List tabs={settingsTabs} />

          <Tabs.Panels className="p-6">
            {/* Cards Tab */}
            <Tabs.Panel tabId="cards">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Tarjetas Guardadas</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm">
                    <Plus className="w-4 h-4" />
                    Agregar Tarjeta
                  </button>
                </div>

                <div className="space-y-4">
                  {savedCards.map((card) => (
                    <div
                      key={card.id}
                      className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <CreditCard className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900">
                              {card.brand} •••• {card.last4}
                            </p>
                            {card.isDefault && (
                              <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-sm">
                                Predeterminada
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            Vence {card.expiryMonth}/{card.expiryYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-600 hover:text-primary-600 transition">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 transition">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <Alert
                  variant="info"
                  layout="bordered"
                  icon={Shield}
                  title="Tus tarjetas están seguras"
                >
                  Usamos encriptación de nivel bancario para proteger tu información financiera.
                </Alert>
              </div>
            </Tabs.Panel>

            {/* Addresses Tab */}
            <Tabs.Panel tabId="addresses">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Direcciones de Envío</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm">
                    <Plus className="w-4 h-4" />
                    Agregar Dirección
                  </button>
                </div>

                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex items-start justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 transition"
                    >
                      <div className="flex gap-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <MapPin className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900">{address.name}</p>
                            {address.isDefault && (
                              <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-sm">
                                Predeterminada
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-700">{address.street}</p>
                          <p className="text-sm text-gray-700">
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-600 hover:text-primary-600 transition">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 transition">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <Alert
                  variant="warning"
                  layout="bordered"
                  icon={AlertCircle}
                  title="Verifica tus direcciones"
                >
                  Asegúrate de que tus direcciones estén actualizadas para evitar problemas con tus
                  envíos.
                </Alert>
              </div>
            </Tabs.Panel>

            {/* Security Tab */}
            <Tabs.Panel tabId="security">
              <div className="space-y-6">
                <Alert
                  variant="warning"
                  layout="bordered"
                  icon={AlertCircle}
                  title="Usa una contraseña segura"
                >
                  Combina letras mayúsculas, minúsculas, números y símbolos. Mínimo 8 caracteres.
                </Alert>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-bold text-gray-900">Cambiar Contraseña</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Contraseña Actual
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Nueva Contraseña
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Confirmar Nueva Contraseña
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={handlePasswordUpdate}
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
                    >
                      Actualizar Contraseña
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-bold text-gray-900">
                      Autenticación de Dos Factores
                    </h3>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">2FA Desactivado</p>
                      <p className="text-sm text-gray-600">Aumenta la seguridad de tu cuenta</p>
                    </div>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm">
                      Activar
                    </button>
                  </div>
                </div>
              </div>
            </Tabs.Panel>

            {/* Notifications Tab */}
            <Tabs.Panel tabId="notifications">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-bold text-gray-900">Preferencias de Notificación</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Pedidos y Envíos', desc: 'Actualizaciones sobre tus pedidos' },
                    { label: 'Promociones y Ofertas', desc: 'Ofertas especiales y descuentos' },
                    { label: 'Recomendaciones', desc: 'Productos que podrían interesarte' },
                    { label: 'Recordatorios', desc: 'Carritos abandonados y listas de deseos' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <Alert
                  variant="info"
                  layout="bordered"
                  icon={CheckCircle2}
                  title="Mantente informado"
                >
                  Las notificaciones te ayudan a estar al tanto de tus pedidos y ofertas exclusivas.
                </Alert>
              </div>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </div>
    </div>
  );
}
