'use client';

import { useState, useEffect } from 'react';
import { ShippingAddress, SavedAddress } from '@/lib/types/checkout';
import { MEXICAN_STATES } from '@/lib/constants/states';
import { getSavedAddresses, getDefaultAddress } from '@/lib/utils/orders';
import { MapPin, User, Phone, Mail, Home, Building, ChevronDown } from 'lucide-react';

interface ShippingFormProps {
  value: Partial<ShippingAddress>;
  onChange: (address: Partial<ShippingAddress>) => void;
  errors: Record<string, string>;
}

export default function ShippingForm({ value, onChange, errors }: ShippingFormProps) {
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  useEffect(() => {
    const addresses = getSavedAddresses();
    setSavedAddresses(addresses);

    // Auto-fill with default address if no value
    if (!value.firstName) {
      const defaultAddr = getDefaultAddress();
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
        onChange(defaultAddr);
      }
    }
  }, [value.firstName, onChange]);

  const handleSavedAddressSelect = (addressId: string) => {
    const address = savedAddresses.find((a) => a.id === addressId);
    if (address) {
      setSelectedAddressId(addressId);
      onChange(address);
    }
  };

  const handleInputChange = (field: keyof ShippingAddress, fieldValue: string) => {
    setSelectedAddressId(null); // Clear selected when manually editing
    onChange({ ...value, [field]: fieldValue });
  };

  const inputClasses = (field: string) => `
    w-full px-4 py-3 border rounded-lg transition-colors
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
    ${errors[field] ? 'border-red-500 bg-red-50' : 'border-gray-300'}
  `;

  return (
    <div className="space-y-6">
      {/* Saved Addresses */}
      {savedAddresses.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Direcciones guardadas
          </label>
          <div className="space-y-2">
            {savedAddresses.map((address) => (
              <button
                key={address.id}
                type="button"
                onClick={() => handleSavedAddressSelect(address.id)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedAddressId === address.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {address.firstName} {address.lastName}
                      {address.label && (
                        <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {address.label}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      {address.street} {address.streetNumber}
                      {address.apartment && `, Int. ${address.apartment}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      {address.neighborhood}, {address.city}, {address.state} {address.postalCode}
                    </p>
                  </div>
                  {address.isDefault && (
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                      Predeterminada
                    </span>
                  )}
                </div>
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setSelectedAddressId(null);
                onChange({});
              }}
              className="w-full p-3 rounded-lg border-2 border-dashed border-gray-300 text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors text-sm font-medium"
            >
              + Usar una dirección nueva
            </button>
          </div>
        </div>
      )}

      {/* Contact Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <User className="w-5 h-5 text-primary-600" />
          Información de contacto
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              type="text"
              id="firstName"
              value={value.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={inputClasses('firstName')}
              placeholder="Juan"
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Apellidos *
            </label>
            <input
              type="text"
              id="lastName"
              value={value.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={inputClasses('lastName')}
              placeholder="Pérez García"
            />
            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={value.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`${inputClasses('email')} pl-10`}
                placeholder="juan@ejemplo.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                id="phone"
                value={value.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`${inputClasses('phone')} pl-10`}
                placeholder="55 1234 5678"
              />
            </div>
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Home className="w-5 h-5 text-primary-600" />
          Dirección de envío
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
              Calle *
            </label>
            <input
              type="text"
              id="street"
              value={value.street || ''}
              onChange={(e) => handleInputChange('street', e.target.value)}
              className={inputClasses('street')}
              placeholder="Av. Reforma"
            />
            {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street}</p>}
          </div>

          <div>
            <label htmlFor="streetNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Número ext. *
            </label>
            <input
              type="text"
              id="streetNumber"
              value={value.streetNumber || ''}
              onChange={(e) => handleInputChange('streetNumber', e.target.value)}
              className={inputClasses('streetNumber')}
              placeholder="123"
            />
            {errors.streetNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.streetNumber}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
              Número int. / Depto (opcional)
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="apartment"
                value={value.apartment || ''}
                onChange={(e) => handleInputChange('apartment', e.target.value)}
                className={`${inputClasses('apartment')} pl-10`}
                placeholder="4B"
              />
            </div>
          </div>

          <div>
            <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
              Colonia *
            </label>
            <input
              type="text"
              id="neighborhood"
              value={value.neighborhood || ''}
              onChange={(e) => handleInputChange('neighborhood', e.target.value)}
              className={inputClasses('neighborhood')}
              placeholder="Juárez"
            />
            {errors.neighborhood && (
              <p className="mt-1 text-sm text-red-600">{errors.neighborhood}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              Ciudad *
            </label>
            <input
              type="text"
              id="city"
              value={value.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={inputClasses('city')}
              placeholder="Ciudad de México"
            />
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              Estado *
            </label>
            <div className="relative">
              <select
                id="state"
                value={value.state || ''}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className={`${inputClasses('state')} appearance-none cursor-pointer`}
              >
                <option value="">Seleccionar...</option>
                {MEXICAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
              Código Postal *
            </label>
            <input
              type="text"
              id="postalCode"
              value={value.postalCode || ''}
              onChange={(e) => handleInputChange('postalCode', e.target.value.slice(0, 5))}
              className={inputClasses('postalCode')}
              placeholder="06600"
              maxLength={5}
            />
            {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="references" className="block text-sm font-medium text-gray-700 mb-1">
            Referencias de entrega (opcional)
          </label>
          <textarea
            id="references"
            value={value.references || ''}
            onChange={(e) => handleInputChange('references', e.target.value)}
            className={`${inputClasses('references')} resize-none`}
            rows={3}
            placeholder="Ej: Casa color azul, portón negro, entre calles X y Y..."
          />
        </div>
      </div>
    </div>
  );
}
