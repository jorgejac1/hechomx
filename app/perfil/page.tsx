/**
 * @fileoverview User profile page for managing personal information and seller profile.
 * Displays user info, achievements, quick actions, and allows profile editing.
 * Includes seller profile setup/edit functionality via modal form.
 * @module app/perfil/page
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import { updateProfileSchema, type UpdateProfileInput } from '@/validators';
import { validate } from '@/validators/utils';
import { ROUTES, formatRelativeTime } from '@/lib';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import SellerSetupForm from '@/components/profile/SellerSetupForm';
import { AchievementBadge } from '@/components/achievements';
import { BUYER_ACHIEVEMENTS } from '@/lib/constants/achievements';
import type { Achievement } from '@/lib/types/achievements';
import type { User } from '@/contexts/AuthContext';
import {
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  Camera,
  Edit2,
  Save,
  X,
  LogOut,
  Package,
  Heart,
  Settings,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Store,
  Trophy,
} from 'lucide-react';
import Alert from '@/components/common/Alert';
import Divider from '@/components/common/Divider';

interface MakerProfileData {
  shopName: string;
  location: string;
  description: string;
}

export default function ProfilePage() {
  return (
    <AuthPageWrapper loadingText="Cargando tu perfil...">
      {(user) => <ProfileContent user={user} />}
    </AuthPageWrapper>
  );
}

function ProfileContent({ user }: { user: User }) {
  const { logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showSellerSetup, setShowSellerSetup] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [formData, setFormData] = useState<Omit<UpdateProfileInput, 'avatar'>>({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || undefined,
  });

  // Load user achievements
  useEffect(() => {
    async function loadAchievements() {
      try {
        const response = await fetch('/api/buyer/achievements');
        const result = await response.json();
        if (result.success && result.data) {
          const userData = result.data[user.email];
          if (userData) {
            const mergedAchievements: Achievement[] = BUYER_ACHIEVEMENTS.map((def) => {
              const userProgress = userData.achievements.find(
                (a: { id: string }) => a.id === def.id
              );
              return {
                ...def,
                status: userProgress?.status || 'locked',
                currentValue: userProgress?.currentValue || 0,
                progress: userProgress?.progress || 0,
                unlockedAt: userProgress?.unlockedAt,
              };
            });
            setAchievements(mergedAchievements);
          }
        }
      } catch (error) {
        console.error('[ProfilePage] Error loading achievements:', error);
      }
    }
    loadAchievements();
  }, [user.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || undefined,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    setSuccessMessage('');
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || undefined,
    });
    setIsEditing(false);
    setErrors({});
    setSuccessMessage('');
  };

  const handleSave = async () => {
    setSuccessMessage('');

    const validation = validate(updateProfileSchema, formData);

    if (!validation.success) {
      setErrors(validation.errors || {});
      return;
    }

    setIsSaving(true);
    setErrors({});

    try {
      await updateProfile(formData);
      setIsEditing(false);
      setSuccessMessage('¡Perfil actualizado correctamente!');

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors({
        _form: error instanceof Error ? error.message : 'Error al actualizar el perfil',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSellerProfile = async (data: MakerProfileData) => {
    await (updateProfile as (data: unknown) => Promise<void>)({
      ...formData,
      makerProfile: {
        shopName: data.shopName,
        location: data.location,
        description: data.description,
        verified: false,
        stats: {
          productsCount: 0,
          rating: 0,
          salesCount: 0,
        },
      },
    });
    setShowSellerSetup(false);
    setSuccessMessage('¡Tienda activada correctamente!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleLogout = () => {
    if (confirm('¿Estás seguro que quieres cerrar sesión?')) {
      logout();
    }
  };

  const memberSince = user.createdAt ? formatRelativeTime(user.createdAt) : 'Recientemente';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Mi Perfil
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Administra tu información personal
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <Alert variant="success" layout="bordered" icon={CheckCircle2} className="mb-6">
            <span className="font-medium">{successMessage}</span>
          </Alert>
        )}

        {/* Error Message */}
        {errors._form && (
          <Alert variant="error" layout="bordered" icon={AlertCircle} className="mb-6">
            {errors._form}
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-primary-100 dark:border-primary-900"
                    />
                  ) : (
                    <div className="w-28 h-28 sm:w-32 sm:h-32 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center border-4 border-primary-200 dark:border-primary-800">
                      <UserIcon className="w-12 h-12 sm:w-16 sm:h-16 text-primary-600 dark:text-primary-400" />
                    </div>
                  )}
                  <button
                    className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full shadow-lg hover:bg-primary-700 transition"
                    title="Cambiar foto"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100 text-center">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{user.email}</p>

                <div className="mt-3 px-3 py-1 bg-primary-50 dark:bg-primary-900/20 rounded-full">
                  <p className="text-xs font-medium text-primary-700 dark:text-primary-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Miembro desde {memberSince}
                  </p>
                </div>

                {/* Achievement Badges */}
                {achievements.length > 0 && (
                  <div className="mt-4 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mis Logros
                      </span>
                    </div>
                    <AchievementBadge
                      achievements={achievements}
                      maxDisplay={4}
                      size="sm"
                      userType="buyer"
                    />
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 space-y-2">
                {user.makerProfile && (
                  <>
                    <Link
                      href={ROUTES.DASHBOARD}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition text-left text-primary-700 dark:text-primary-300 font-medium border-2 border-primary-200 dark:border-primary-800"
                    >
                      <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      Dashboard de Ventas
                    </Link>
                    <Link
                      href="/perfil/vendedor"
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left text-gray-700 dark:text-gray-300 font-medium"
                    >
                      <Store className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      Perfil de Vendedor
                    </Link>
                  </>
                )}
                <Link
                  href={ROUTES.ORDERS}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left text-gray-700 dark:text-gray-300 font-medium"
                >
                  <Package className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  Mis Pedidos
                </Link>
                <Link
                  href={ROUTES.WISHLIST}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left text-gray-700 dark:text-gray-300 font-medium"
                >
                  <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  Favoritos
                </Link>
                <Link
                  href="/configuracion"
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left text-gray-700 dark:text-gray-300 font-medium"
                >
                  <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  Configuración
                </Link>
              </div>

              {/* Logout Button */}
              <Divider spacing="md" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition font-medium border-2 border-red-200 dark:border-red-800"
              >
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </div>
          </div>

          {/* Right Column - Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Información Personal
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition font-medium text-sm disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <LoadingSpinner size="sm" color="white" />
                          Guardando...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Guardar
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Nombre completo
                  </label>
                  {isEditing ? (
                    <>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                            errors.name
                              ? 'border-red-300 dark:border-red-600'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <p className="text-gray-900 dark:text-gray-100 font-medium">{user.name}</p>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Correo electrónico
                  </label>
                  {isEditing ? (
                    <>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                            errors.email
                              ? 'border-red-300 dark:border-red-600'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="tu@ejemplo.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <p className="text-gray-900 dark:text-gray-100 font-medium">{user.email}</p>
                    </div>
                  )}
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Teléfono{' '}
                    <span className="text-gray-500 dark:text-gray-400 font-normal">(opcional)</span>
                  </label>
                  {isEditing ? (
                    <>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone || ''}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                            errors.phone
                              ? 'border-red-300 dark:border-red-600'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="55 1234 5678"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <p className="text-gray-900 dark:text-gray-100 font-medium">
                        {user.phone || 'No registrado'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Seller Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Perfil de Vendedor
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Información de tu tienda o taller
                  </p>
                </div>
                {user.makerProfile ? (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-semibold rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Activo
                  </span>
                ) : (
                  <button
                    onClick={() => setShowSellerSetup(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm"
                  >
                    Activar Tienda
                  </button>
                )}
              </div>

              {user.makerProfile ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                        {user.makerProfile.shopName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900 dark:text-gray-100">
                          {user.makerProfile.shopName}
                        </h4>
                        {user.makerProfile.verified && (
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {user.makerProfile.location}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                        {user.makerProfile.description}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {user.makerProfile.stats.productsCount}+
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Productos</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {user.makerProfile.stats.rating}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Calificación</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {user.makerProfile.stats.salesCount}+
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Ventas</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowSellerSetup(true)}
                    className="w-full flex items-center justify-center gap-2 p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar Información de Tienda
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-primary-600 dark:text-primary-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    ¿Quieres vender tus productos?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Activa tu tienda y comienza a vender artesanías mexicanas
                  </p>
                  <button
                    onClick={() => setShowSellerSetup(true)}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
                  >
                    Activar Mi Tienda
                  </button>
                </div>
              )}
            </div>

            {/* Help Card */}
            <Alert variant="info" layout="bordered" title="Ayuda">
              <div className="space-y-2">
                <p>
                  <strong>¿Necesitas cambiar algo?</strong> Haz clic en "Editar" para modificar tu
                  información.
                </p>
                <p>
                  <strong>¿Olvidaste tu contraseña?</strong> Puedes cambiarla desde la
                  configuración.
                </p>
                <p>
                  <strong>¿Tienes problemas?</strong> Contáctanos y te ayudaremos.
                </p>
              </div>
            </Alert>
          </div>
        </div>
      </div>

      {/* Seller Setup Modal */}
      {showSellerSetup && (
        <SellerSetupForm
          onClose={() => setShowSellerSetup(false)}
          onSave={handleSaveSellerProfile}
          initialData={
            user.makerProfile
              ? {
                  shopName: user.makerProfile.shopName,
                  location: user.makerProfile.location,
                  description: user.makerProfile.description,
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
