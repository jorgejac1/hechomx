'use client';

import { useState, useEffect } from 'react';
import { ShippingAddress, SavedAddress } from '@/lib/types/checkout';
import { MEXICAN_STATES } from '@/lib/constants/states';
import { getSavedAddresses, getDefaultAddress } from '@/lib/utils/orders';
import { MapPin, User, Phone, Mail, Home, Building } from 'lucide-react';
import TextInput from '@/components/common/TextInput';
import Select from '@/components/common/Select';
import Textarea from '@/components/common/Textarea';

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
                        <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-sm">
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
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-sm">
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
          <TextInput
            id="firstName"
            label="Nombre"
            value={value.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="Juan"
            error={errors.firstName}
            required
          />

          <TextInput
            id="lastName"
            label="Apellidos"
            value={value.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Pérez García"
            error={errors.lastName}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            type="email"
            id="email"
            label="Correo electrónico"
            value={value.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="juan@ejemplo.com"
            leftIcon={<Mail className="w-5 h-5" />}
            error={errors.email}
            required
          />

          <TextInput
            type="tel"
            id="phone"
            label="Teléfono"
            value={value.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="55 1234 5678"
            leftIcon={<Phone className="w-5 h-5" />}
            error={errors.phone}
            required
          />
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
            <TextInput
              id="street"
              label="Calle"
              value={value.street || ''}
              onChange={(e) => handleInputChange('street', e.target.value)}
              placeholder="Av. Reforma"
              error={errors.street}
              required
            />
          </div>

          <TextInput
            id="streetNumber"
            label="Número ext."
            value={value.streetNumber || ''}
            onChange={(e) => handleInputChange('streetNumber', e.target.value)}
            placeholder="123"
            error={errors.streetNumber}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id="apartment"
            label="Número int. / Depto (opcional)"
            value={value.apartment || ''}
            onChange={(e) => handleInputChange('apartment', e.target.value)}
            placeholder="4B"
            leftIcon={<Building className="w-5 h-5" />}
          />

          <TextInput
            id="neighborhood"
            label="Colonia"
            value={value.neighborhood || ''}
            onChange={(e) => handleInputChange('neighborhood', e.target.value)}
            placeholder="Juárez"
            error={errors.neighborhood}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextInput
            id="city"
            label="Ciudad"
            value={value.city || ''}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="Ciudad de México"
            error={errors.city}
            required
          />

          <Select
            id="state"
            label="Estado"
            value={value.state || ''}
            onChange={(e) => handleInputChange('state', e.target.value)}
            options={MEXICAN_STATES.map((state) => ({
              value: state,
              label: state,
            }))}
            placeholder="Seleccionar..."
            error={errors.state}
            required
          />

          <TextInput
            id="postalCode"
            label="Código Postal"
            value={value.postalCode || ''}
            onChange={(e) => handleInputChange('postalCode', e.target.value.slice(0, 5))}
            placeholder="06600"
            maxLength={5}
            error={errors.postalCode}
            required
          />
        </div>

        <Textarea
          id="references"
          label="Referencias de entrega (opcional)"
          value={value.references || ''}
          onChange={(e) => handleInputChange('references', e.target.value)}
          minRows={3}
          placeholder="Ej: Casa color azul, portón negro, entre calles X y Y..."
        />
      </div>
    </div>
  );
}
