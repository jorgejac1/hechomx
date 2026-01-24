/**
 * @fileoverview User settings page for managing payment methods, addresses, security, and notifications.
 * Provides tabbed interface with full CRUD functionality and localStorage persistence.
 * @module app/configuracion/page
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import Modal from '@/components/common/Modal';
import { useToast } from '@/contexts/ToastContext';
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
  Star,
  X,
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
  cardholderName: string;
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

interface NotificationPreferences {
  orders: boolean;
  promotions: boolean;
  recommendations: boolean;
  reminders: boolean;
}

interface PasswordForm {
  current: string;
  new: string;
  confirm: string;
}

const STORAGE_KEYS = {
  CARDS: 'papalote_saved_cards',
  ADDRESSES: 'papalote_addresses',
  NOTIFICATIONS: 'papalote_notifications',
  TWO_FACTOR: 'papalote_2fa_enabled',
};

const DEFAULT_CARDS: SavedCard[] = [
  {
    id: '1',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: '12',
    expiryYear: '27',
    isDefault: true,
    cardholderName: 'Juan Pérez',
  },
  {
    id: '2',
    last4: '5555',
    brand: 'Mastercard',
    expiryMonth: '06',
    expiryYear: '28',
    isDefault: false,
    cardholderName: 'Juan Pérez',
  },
];

const DEFAULT_ADDRESSES: Address[] = [
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
];

const DEFAULT_NOTIFICATIONS: NotificationPreferences = {
  orders: true,
  promotions: true,
  recommendations: true,
  reminders: true,
};

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
  const { showToast } = useToast();

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password form
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    current: '',
    new: '',
    confirm: '',
  });
  const [passwordErrors, setPasswordErrors] = useState<Partial<PasswordForm>>({});

  // Data states
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [notifications, setNotifications] =
    useState<NotificationPreferences>(DEFAULT_NOTIFICATIONS);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Modal states
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<SavedCard | null>(null);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'card' | 'address'; id: string } | null>(
    null
  );

  // Card form
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    isDefault: false,
  });

  // Address form
  const [addressForm, setAddressForm] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    isDefault: false,
  });

  // Load data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCards = localStorage.getItem(STORAGE_KEYS.CARDS);
      const storedAddresses = localStorage.getItem(STORAGE_KEYS.ADDRESSES);
      const storedNotifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      const stored2FA = localStorage.getItem(STORAGE_KEYS.TWO_FACTOR);

      setSavedCards(storedCards ? JSON.parse(storedCards) : DEFAULT_CARDS);
      setAddresses(storedAddresses ? JSON.parse(storedAddresses) : DEFAULT_ADDRESSES);
      setNotifications(
        storedNotifications ? JSON.parse(storedNotifications) : DEFAULT_NOTIFICATIONS
      );
      setTwoFactorEnabled(stored2FA === 'true');
    }
  }, []);

  // Save cards to localStorage
  const saveCards = (cards: SavedCard[]) => {
    setSavedCards(cards);
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
  };

  // Save addresses to localStorage
  const saveAddresses = (addrs: Address[]) => {
    setAddresses(addrs);
    localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(addrs));
  };

  // Save notifications to localStorage
  const saveNotifications = (prefs: NotificationPreferences) => {
    setNotifications(prefs);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(prefs));
  };

  // Card CRUD operations
  const openAddCard = () => {
    setEditingCard(null);
    setCardForm({
      cardNumber: '',
      cardholderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      isDefault: savedCards.length === 0,
    });
    setIsCardModalOpen(true);
  };

  const openEditCard = (card: SavedCard) => {
    setEditingCard(card);
    setCardForm({
      cardNumber: `•••• •••• •••• ${card.last4}`,
      cardholderName: card.cardholderName,
      expiryMonth: card.expiryMonth,
      expiryYear: card.expiryYear,
      cvv: '',
      isDefault: card.isDefault,
    });
    setIsCardModalOpen(true);
  };

  const handleSaveCard = () => {
    // Validate
    if (!editingCard && cardForm.cardNumber.length < 16) {
      showToast('Ingresa un número de tarjeta válido', 'error');
      return;
    }
    if (!cardForm.cardholderName.trim()) {
      showToast('Ingresa el nombre del titular', 'error');
      return;
    }
    if (!cardForm.expiryMonth || !cardForm.expiryYear) {
      showToast('Ingresa la fecha de vencimiento', 'error');
      return;
    }

    let updatedCards: SavedCard[];

    if (editingCard) {
      // Update existing card
      updatedCards = savedCards.map((c) => {
        if (c.id === editingCard.id) {
          return {
            ...c,
            cardholderName: cardForm.cardholderName,
            expiryMonth: cardForm.expiryMonth,
            expiryYear: cardForm.expiryYear,
            isDefault: cardForm.isDefault,
          };
        }
        // If new card is default, remove default from others
        if (cardForm.isDefault) {
          return { ...c, isDefault: false };
        }
        return c;
      });
      showToast('Tarjeta actualizada correctamente', 'success');
    } else {
      // Add new card
      const cleanNumber = cardForm.cardNumber.replace(/\s/g, '');
      const last4 = cleanNumber.slice(-4);
      const brand = detectCardBrand(cleanNumber);

      const newCard: SavedCard = {
        id: Date.now().toString(),
        last4,
        brand,
        cardholderName: cardForm.cardholderName,
        expiryMonth: cardForm.expiryMonth,
        expiryYear: cardForm.expiryYear,
        isDefault: cardForm.isDefault,
      };

      if (cardForm.isDefault) {
        updatedCards = savedCards.map((c) => ({ ...c, isDefault: false }));
        updatedCards.push(newCard);
      } else {
        updatedCards = [...savedCards, newCard];
      }
      showToast('Tarjeta agregada correctamente', 'success');
    }

    saveCards(updatedCards);
    setIsCardModalOpen(false);
  };

  const setCardAsDefault = (cardId: string) => {
    const updatedCards = savedCards.map((c) => ({
      ...c,
      isDefault: c.id === cardId,
    }));
    saveCards(updatedCards);
    showToast('Tarjeta predeterminada actualizada', 'success');
  };

  // Address CRUD operations
  const openAddAddress = () => {
    setEditingAddress(null);
    setAddressForm({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      isDefault: addresses.length === 0,
    });
    setIsAddressModalOpen(true);
  };

  const openEditAddress = (address: Address) => {
    setEditingAddress(address);
    setAddressForm({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      phone: address.phone,
      isDefault: address.isDefault,
    });
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = () => {
    // Validate
    if (!addressForm.name.trim()) {
      showToast('Ingresa un nombre para la dirección', 'error');
      return;
    }
    if (!addressForm.street.trim()) {
      showToast('Ingresa la calle y número', 'error');
      return;
    }
    if (!addressForm.city.trim() || !addressForm.state.trim()) {
      showToast('Ingresa la ciudad y estado', 'error');
      return;
    }
    if (!addressForm.zipCode.trim()) {
      showToast('Ingresa el código postal', 'error');
      return;
    }

    let updatedAddresses: Address[];

    if (editingAddress) {
      // Update existing address
      updatedAddresses = addresses.map((a) => {
        if (a.id === editingAddress.id) {
          return {
            ...a,
            ...addressForm,
          };
        }
        if (addressForm.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      });
      showToast('Dirección actualizada correctamente', 'success');
    } else {
      // Add new address
      const newAddress: Address = {
        id: Date.now().toString(),
        ...addressForm,
      };

      if (addressForm.isDefault) {
        updatedAddresses = addresses.map((a) => ({ ...a, isDefault: false }));
        updatedAddresses.push(newAddress);
      } else {
        updatedAddresses = [...addresses, newAddress];
      }
      showToast('Dirección agregada correctamente', 'success');
    }

    saveAddresses(updatedAddresses);
    setIsAddressModalOpen(false);
  };

  const setAddressAsDefault = (addressId: string) => {
    const updatedAddresses = addresses.map((a) => ({
      ...a,
      isDefault: a.id === addressId,
    }));
    saveAddresses(updatedAddresses);
    showToast('Dirección predeterminada actualizada', 'success');
  };

  // Delete operations
  const confirmDelete = (type: 'card' | 'address', id: string) => {
    setDeleteTarget({ type, id });
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'card') {
      const card = savedCards.find((c) => c.id === deleteTarget.id);
      const updatedCards = savedCards.filter((c) => c.id !== deleteTarget.id);

      // If deleted card was default, make first remaining card default
      if (card?.isDefault && updatedCards.length > 0) {
        updatedCards[0].isDefault = true;
      }

      saveCards(updatedCards);
      showToast('Tarjeta eliminada correctamente', 'success');
    } else {
      const address = addresses.find((a) => a.id === deleteTarget.id);
      const updatedAddresses = addresses.filter((a) => a.id !== deleteTarget.id);

      // If deleted address was default, make first remaining address default
      if (address?.isDefault && updatedAddresses.length > 0) {
        updatedAddresses[0].isDefault = true;
      }

      saveAddresses(updatedAddresses);
      showToast('Dirección eliminada correctamente', 'success');
    }

    setIsDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  // Password update
  const handlePasswordUpdate = () => {
    const errors: Partial<PasswordForm> = {};

    if (!passwordForm.current) {
      errors.current = 'Ingresa tu contraseña actual';
    }
    if (!passwordForm.new) {
      errors.new = 'Ingresa la nueva contraseña';
    } else if (passwordForm.new.length < 8) {
      errors.new = 'La contraseña debe tener al menos 8 caracteres';
    }
    if (passwordForm.new !== passwordForm.confirm) {
      errors.confirm = 'Las contraseñas no coinciden';
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    // Simulate password update (in real app, this would call an API)
    setPasswordErrors({});
    setPasswordForm({ current: '', new: '', confirm: '' });
    showToast('Contraseña actualizada correctamente', 'success');
  };

  // 2FA toggle
  const toggle2FA = () => {
    const newValue = !twoFactorEnabled;
    setTwoFactorEnabled(newValue);
    localStorage.setItem(STORAGE_KEYS.TWO_FACTOR, String(newValue));
    showToast(
      newValue
        ? 'Autenticación de dos factores activada'
        : 'Autenticación de dos factores desactivada',
      'success'
    );
  };

  // Notification toggle
  const toggleNotification = (key: keyof NotificationPreferences) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    saveNotifications(updated);
  };

  // Utility functions
  const detectCardBrand = (number: string): string => {
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5')) return 'Mastercard';
    if (number.startsWith('3')) return 'American Express';
    return 'Tarjeta';
  };

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const inputClasses =
    'w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={ROUTES.PROFILE}
            className="text-primary-600 hover:text-primary-700 mb-4 flex items-center gap-2"
          >
            ← Volver al Perfil
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Configuración
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Administra tus métodos de pago, direcciones y seguridad
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultTab="cards" className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <Tabs.List tabs={settingsTabs} />

          <Tabs.Panels className="p-6">
            {/* Cards Tab */}
            <Tabs.Panel tabId="cards">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Tarjetas Guardadas
                  </h3>
                  <button
                    onClick={openAddCard}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Tarjeta
                  </button>
                </div>

                {savedCards.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No tienes tarjetas guardadas</p>
                    <button
                      onClick={openAddCard}
                      className="mt-3 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Agregar tu primera tarjeta
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedCards.map((card) => (
                      <div
                        key={card.id}
                        className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 transition"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <CreditCard className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {card.brand} •••• {card.last4}
                              </p>
                              {card.isDefault && (
                                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-sm">
                                  Predeterminada
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {card.cardholderName} • Vence {card.expiryMonth}/{card.expiryYear}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!card.isDefault && (
                            <button
                              onClick={() => setCardAsDefault(card.id)}
                              className="p-2 text-gray-600 dark:text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition cursor-pointer"
                              title="Hacer predeterminada"
                            >
                              <Star className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => openEditCard(card)}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition cursor-pointer"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => confirmDelete('card', card.id)}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition cursor-pointer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

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
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Direcciones de Envío
                  </h3>
                  <button
                    onClick={openAddAddress}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Dirección
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No tienes direcciones guardadas</p>
                    <button
                      onClick={openAddAddress}
                      className="mt-3 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Agregar tu primera dirección
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="flex items-start justify-between p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 transition"
                      >
                        <div className="flex gap-4">
                          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <MapPin className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {address.name}
                              </p>
                              {address.isDefault && (
                                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-sm">
                                  Predeterminada
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {address.street}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {address.phone}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!address.isDefault && (
                            <button
                              onClick={() => setAddressAsDefault(address.id)}
                              className="p-2 text-gray-600 dark:text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition cursor-pointer"
                              title="Hacer predeterminada"
                            >
                              <Star className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => openEditAddress(address)}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition cursor-pointer"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => confirmDelete('address', address.id)}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition cursor-pointer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

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
                    <Lock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Cambiar Contraseña
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Contraseña Actual
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwordForm.current}
                          onChange={(e) =>
                            setPasswordForm({ ...passwordForm, current: e.target.value })
                          }
                          className={`${inputClasses} pr-12`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {passwordErrors.current && (
                        <p className="text-red-500 text-sm mt-1">{passwordErrors.current}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Nueva Contraseña
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordForm.new}
                          onChange={(e) =>
                            setPasswordForm({ ...passwordForm, new: e.target.value })
                          }
                          className={`${inputClasses} pr-12`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {passwordErrors.new && (
                        <p className="text-red-500 text-sm mt-1">{passwordErrors.new}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Confirmar Nueva Contraseña
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={passwordForm.confirm}
                          onChange={(e) =>
                            setPasswordForm({ ...passwordForm, confirm: e.target.value })
                          }
                          className={`${inputClasses} pr-12`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {passwordErrors.confirm && (
                        <p className="text-red-500 text-sm mt-1">{passwordErrors.confirm}</p>
                      )}
                    </div>
                    <button
                      onClick={handlePasswordUpdate}
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
                    >
                      Actualizar Contraseña
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Autenticación de Dos Factores
                    </h3>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        2FA {twoFactorEnabled ? 'Activado' : 'Desactivado'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {twoFactorEnabled
                          ? 'Tu cuenta está protegida con autenticación de dos factores'
                          : 'Aumenta la seguridad de tu cuenta'}
                      </p>
                    </div>
                    <button
                      onClick={toggle2FA}
                      className={`px-4 py-2 rounded-lg transition font-medium text-sm ${
                        twoFactorEnabled
                          ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
                      }`}
                    >
                      {twoFactorEnabled ? 'Desactivar' : 'Activar'}
                    </button>
                  </div>
                </div>
              </div>
            </Tabs.Panel>

            {/* Notifications Tab */}
            <Tabs.Panel tabId="notifications">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Preferencias de Notificación
                  </h3>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      key: 'orders' as const,
                      label: 'Pedidos y Envíos',
                      desc: 'Actualizaciones sobre tus pedidos',
                    },
                    {
                      key: 'promotions' as const,
                      label: 'Promociones y Ofertas',
                      desc: 'Ofertas especiales y descuentos',
                    },
                    {
                      key: 'recommendations' as const,
                      label: 'Recomendaciones',
                      desc: 'Productos que podrían interesarte',
                    },
                    {
                      key: 'reminders' as const,
                      label: 'Recordatorios',
                      desc: 'Carritos abandonados y listas de deseos',
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{item.label}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[item.key]}
                          onChange={() => toggleNotification(item.key)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-hidden peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 dark:peer-checked:bg-primary-500"></div>
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

      {/* Card Modal */}
      <Modal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        title={editingCard ? 'Editar Tarjeta' : 'Agregar Tarjeta'}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Número de Tarjeta
            </label>
            <input
              type="text"
              value={cardForm.cardNumber}
              onChange={(e) =>
                setCardForm({ ...cardForm, cardNumber: formatCardNumber(e.target.value) })
              }
              className={inputClasses}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              disabled={!!editingCard}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Nombre del Titular
            </label>
            <input
              type="text"
              value={cardForm.cardholderName}
              onChange={(e) => setCardForm({ ...cardForm, cardholderName: e.target.value })}
              className={inputClasses}
              placeholder="Juan Pérez"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Mes
              </label>
              <select
                value={cardForm.expiryMonth}
                onChange={(e) => setCardForm({ ...cardForm, expiryMonth: e.target.value })}
                className={inputClasses}
              >
                <option value="">MM</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={String(i + 1).padStart(2, '0')}>
                    {String(i + 1).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Año
              </label>
              <select
                value={cardForm.expiryYear}
                onChange={(e) => setCardForm({ ...cardForm, expiryYear: e.target.value })}
                className={inputClasses}
              >
                <option value="">AA</option>
                {(() => {
                  const currentYear = new Date().getFullYear() - 2000;
                  const startYear = currentYear - 2; // Include 2 years back for existing cards
                  const years = Array.from({ length: 12 }, (_, i) => startYear + i);
                  // Ensure editing card's year is included
                  if (editingCard && !years.includes(Number(cardForm.expiryYear))) {
                    years.unshift(Number(cardForm.expiryYear));
                    years.sort((a, b) => a - b);
                  }
                  return years.map((year) => (
                    <option key={year} value={String(year)}>
                      {year}
                    </option>
                  ));
                })()}
              </select>
            </div>
            {!editingCard && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  CVV
                </label>
                <input
                  type="password"
                  value={cardForm.cvv}
                  onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                  className={inputClasses}
                  placeholder="•••"
                  maxLength={4}
                />
              </div>
            )}
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={cardForm.isDefault}
              onChange={(e) => setCardForm({ ...cardForm, isDefault: e.target.checked })}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Establecer como tarjeta predeterminada
            </span>
          </label>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setIsCardModalOpen(false)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveCard}
              className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
            >
              {editingCard ? 'Guardar Cambios' : 'Agregar Tarjeta'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Address Modal */}
      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title={editingAddress ? 'Editar Dirección' : 'Agregar Dirección'}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Nombre de la Dirección
            </label>
            <input
              type="text"
              value={addressForm.name}
              onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
              className={inputClasses}
              placeholder="Casa, Oficina, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Calle y Número
            </label>
            <input
              type="text"
              value={addressForm.street}
              onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
              className={inputClasses}
              placeholder="Av. Insurgentes Sur 1234, Col. Del Valle"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Ciudad
              </label>
              <input
                type="text"
                value={addressForm.city}
                onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                className={inputClasses}
                placeholder="Ciudad de México"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Estado
              </label>
              <input
                type="text"
                value={addressForm.state}
                onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                className={inputClasses}
                placeholder="CDMX"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Código Postal
              </label>
              <input
                type="text"
                value={addressForm.zipCode}
                onChange={(e) => setAddressForm({ ...addressForm, zipCode: e.target.value })}
                className={inputClasses}
                placeholder="03100"
                maxLength={5}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                value={addressForm.phone}
                onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                className={inputClasses}
                placeholder="+52 55 1234 5678"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={addressForm.isDefault}
              onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Establecer como dirección predeterminada
            </span>
          </label>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setIsAddressModalOpen(false)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveAddress}
              className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
            >
              {editingAddress ? 'Guardar Cambios' : 'Agregar Dirección'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Eliminación"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
              <X className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <p className="text-center text-gray-700 dark:text-gray-300">
            ¿Estás seguro de que deseas eliminar{' '}
            {deleteTarget?.type === 'card' ? 'esta tarjeta' : 'esta dirección'}? Esta acción no se
            puede deshacer.
          </p>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
